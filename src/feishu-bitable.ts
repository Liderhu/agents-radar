import "dotenv/config";
import fs from "fs";
import path from "path";
import type { RadarJsonDocument, RadarJsonItem } from "./radar-json.ts";

const FEISHU_API_ROOT = "https://open.feishu.cn/open-apis";
const BATCH_SIZE = 500;
const RADAR_PATH_RE = /(?:^|[\\/])digests[\\/](\d{4}-\d{2}-\d{2})[\\/]ai-radar\.json$/;

export interface FeishuBitableConfig {
  appId: string;
  appSecret: string;
  appToken: string;
  tableId: string;
}

export interface FeishuSyncResult {
  created: number;
  updated: number;
  total: number;
}

interface FeishuResponse {
  code: number;
  msg?: string;
}

interface FeishuTokenResponse extends FeishuResponse {
  tenant_access_token?: string;
}

interface FeishuRecord {
  record_id?: string;
  fields?: Record<string, unknown>;
}

interface FeishuListResponse extends FeishuResponse {
  data?: {
    items?: FeishuRecord[];
    has_more?: boolean;
    page_token?: string;
  };
}

const ENV_FIELDS = {
  FEISHU_APP_ID: "appId",
  FEISHU_APP_SECRET: "appSecret",
  FEISHU_BITABLE_APP_TOKEN: "appToken",
  FEISHU_BITABLE_TABLE_ID: "tableId",
} as const;

export function loadFeishuBitableConfig(env: NodeJS.ProcessEnv = process.env): FeishuBitableConfig | null {
  const values = Object.entries(ENV_FIELDS).map(([name, field]) => [field, env[name]?.trim()] as const);
  if (values.some(([, value]) => !value)) return null;
  return Object.fromEntries(values) as unknown as FeishuBitableConfig;
}

export function buildFeishuFields(document: RadarJsonDocument, item: RadarJsonItem): Record<string, unknown> {
  const date = Date.parse(`${document.date}T00:00:00.000Z`);
  const publishedAt = Date.parse(item.publishedAt);
  if (!Number.isFinite(date) || !Number.isFinite(publishedAt)) {
    throw new Error(`Invalid Radar date for key ${item.key}`);
  }
  return {
    唯一键: item.key,
    日期: date,
    当日排名: item.rank,
    "Top 5": item.isTop5,
    标题: item.title,
    原文链接: { text: item.title, link: item.url },
    HN讨论: { text: "HN", link: item.hnUrl },
    总分: item.totalScore,
    基础分: item.baseScore,
    编辑分: item.editorialScore,
    中文摘要: item.summary.zh,
    推荐理由: item.reason.zh,
    评分模式: document.mode === "deepseek" ? "DeepSeek" : "确定性降级",
    发布时间: publishedAt,
  };
}

function recordText(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const text = value
      .map((part) =>
        typeof part === "object" &&
        part !== null &&
        typeof (part as Record<string, unknown>)["text"] === "string"
          ? String((part as Record<string, unknown>)["text"])
          : "",
      )
      .join("");
    return text || null;
  }
  if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Record<string, unknown>)["text"] === "string"
  ) {
    return String((value as Record<string, unknown>)["text"]);
  }
  return null;
}

async function feishuRequest<T extends FeishuResponse>(
  fetchImpl: typeof fetch,
  url: string,
  init: RequestInit,
  operation: string,
): Promise<T> {
  const response = await fetchImpl(url, init);
  let body: T;
  try {
    body = (await response.json()) as T;
  } catch {
    throw new Error(`Feishu ${operation} returned invalid JSON (HTTP ${response.status})`);
  }
  if (!response.ok || body.code !== 0) {
    throw new Error(`Feishu ${operation} failed (HTTP ${response.status}, code ${String(body.code)})`);
  }
  return body;
}

async function getTenantToken(config: FeishuBitableConfig, fetchImpl: typeof fetch): Promise<string> {
  const body = await feishuRequest<FeishuTokenResponse>(
    fetchImpl,
    `${FEISHU_API_ROOT}/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ app_id: config.appId, app_secret: config.appSecret }),
    },
    "tenant token",
  );
  if (!body.tenant_access_token) throw new Error("Feishu tenant token response is missing the token");
  return body.tenant_access_token;
}

function recordsBaseUrl(config: FeishuBitableConfig): string {
  return (
    `${FEISHU_API_ROOT}/bitable/v1/apps/${encodeURIComponent(config.appToken)}` +
    `/tables/${encodeURIComponent(config.tableId)}/records`
  );
}

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=utf-8",
  };
}

async function listExistingRecords(
  config: FeishuBitableConfig,
  token: string,
  fetchImpl: typeof fetch,
): Promise<Map<string, string>> {
  const existing = new Map<string, string>();
  let pageToken: string | undefined;
  do {
    const url = new URL(recordsBaseUrl(config));
    url.searchParams.set("page_size", String(BATCH_SIZE));
    if (pageToken) url.searchParams.set("page_token", pageToken);
    const body = await feishuRequest<FeishuListResponse>(
      fetchImpl,
      url.toString(),
      { method: "GET", headers: authHeaders(token) },
      "list records",
    );
    for (const record of body.data?.items ?? []) {
      const key = recordText(record.fields?.["唯一键"]);
      if (key && record.record_id) existing.set(key, record.record_id);
    }
    if (!body.data?.has_more) break;
    pageToken = body.data.page_token;
    if (!pageToken) throw new Error("Feishu list records response is missing page_token");
  } while (pageToken);
  return existing;
}

function batches<T>(items: T[]): T[][] {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += BATCH_SIZE) {
    result.push(items.slice(index, index + BATCH_SIZE));
  }
  return result;
}

export async function syncRadarDocuments(
  documents: RadarJsonDocument[],
  config: FeishuBitableConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<FeishuSyncResult> {
  const total = documents.reduce((sum, document) => sum + document.items.length, 0);
  if (total === 0) return { created: 0, updated: 0, total: 0 };

  const token = await getTenantToken(config, fetchImpl);
  const existing = await listExistingRecords(config, token, fetchImpl);
  const creates: Array<{ fields: Record<string, unknown> }> = [];
  const updates: Array<{ record_id: string; fields: Record<string, unknown> }> = [];
  const inputKeys = new Set<string>();

  for (const document of documents) {
    for (const item of document.items) {
      if (inputKeys.has(item.key)) throw new Error(`Duplicate Radar key in sync input: ${item.key}`);
      inputKeys.add(item.key);
      const fields = buildFeishuFields(document, item);
      const recordId = existing.get(item.key);
      if (recordId) updates.push({ record_id: recordId, fields });
      else creates.push({ fields });
    }
  }

  for (const records of batches(creates)) {
    await feishuRequest<FeishuResponse>(
      fetchImpl,
      `${recordsBaseUrl(config)}/batch_create`,
      { method: "POST", headers: authHeaders(token), body: JSON.stringify({ records }) },
      "batch create records",
    );
  }
  for (const records of batches(updates)) {
    await feishuRequest<FeishuResponse>(
      fetchImpl,
      `${recordsBaseUrl(config)}/batch_update`,
      { method: "POST", headers: authHeaders(token), body: JSON.stringify({ records }) },
      "batch update records",
    );
  }

  return { created: creates.length, updated: updates.length, total };
}

export function syncRadarDocument(
  document: RadarJsonDocument,
  config: FeishuBitableConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<FeishuSyncResult> {
  return syncRadarDocuments([document], config, fetchImpl);
}

export function selectRadarJsonPaths(paths: string[], all: boolean): string[] {
  const valid = paths
    .filter((filePath) => RADAR_PATH_RE.test(filePath))
    .sort((left, right) => left.localeCompare(right, "en"));
  return all ? valid : valid.slice(-1);
}

function discoverRadarJsonPaths(): string[] {
  if (!fs.existsSync("digests")) return [];
  return fs
    .readdirSync("digests", { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join("digests", entry.name, "ai-radar.json"))
    .filter((filePath) => fs.existsSync(filePath));
}

function parseRadarDocument(value: unknown, filePath: string): RadarJsonDocument {
  if (typeof value !== "object" || value === null) throw new Error(`Invalid Radar JSON: ${filePath}`);
  const record = value as Record<string, unknown>;
  if (
    record["schemaVersion"] !== 1 ||
    typeof record["date"] !== "string" ||
    !Array.isArray(record["items"])
  ) {
    throw new Error(`Unsupported Radar JSON contract: ${filePath}`);
  }
  for (const item of record["items"]) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as Record<string, unknown>)["key"] !== "string"
    ) {
      throw new Error(`Invalid Radar item in ${filePath}`);
    }
  }
  return value as RadarJsonDocument;
}

async function main(): Promise<void> {
  const config = loadFeishuBitableConfig();
  if (!config) {
    const missing = Object.keys(ENV_FIELDS).filter((name) => !process.env[name]?.trim());
    console.log(`[feishu-bitable] Skipped; missing ${missing.join(", ")}`);
    return;
  }
  const files = selectRadarJsonPaths(discoverRadarJsonPaths(), process.argv.includes("--all"));
  if (files.length === 0) {
    console.log("[feishu-bitable] Skipped; no ai-radar.json files found");
    return;
  }
  const documents = files.map((filePath) =>
    parseRadarDocument(JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown, filePath),
  );
  const result = await syncRadarDocuments(documents, config);
  console.log(
    `[feishu-bitable] Synced ${documents.length} date(s): ${result.created} created, ${result.updated} updated, ${result.total} total`,
  );
}

const isDirectRun =
  process.argv[1]?.endsWith("feishu-bitable.ts") || process.argv[1]?.endsWith("feishu-bitable.js");
if (isDirectRun) {
  main().catch((error: unknown) => {
    console.error(`[feishu-bitable] ${error instanceof Error ? error.message : "Unknown sync failure"}`);
    process.exitCode = 1;
  });
}
