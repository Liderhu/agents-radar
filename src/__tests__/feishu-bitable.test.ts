import { describe, expect, it } from "vitest";
import {
  buildFeishuFields,
  selectRadarJsonPaths,
  syncRadarDocument,
  type FeishuBitableConfig,
} from "../feishu-bitable.ts";
import type { RadarJsonDocument, RadarJsonItem } from "../radar-json.ts";

const config: FeishuBitableConfig = {
  appId: "cli_test",
  appSecret: "secret_test",
  appToken: "app_test",
  tableId: "tbl_test",
};

function item(key: string, rank: number, url: string): RadarJsonItem {
  return {
    key,
    rank,
    isTop5: rank <= 5,
    title: `Story ${rank}`,
    url,
    hnUrl: `https://news.ycombinator.com/item?id=${rank}`,
    totalScore: 90 - rank,
    baseScore: 60 - rank,
    editorialScore: 30,
    publishedAt: "2026-08-20T12:30:00.000Z",
    summary: { zh: `中文摘要 ${rank}`, en: `English summary ${rank}` },
    reason: { zh: `推荐理由 ${rank}`, en: `Reason ${rank}` },
  };
}

function document(items: RadarJsonItem[]): RadarJsonDocument {
  return {
    schemaVersion: 1,
    date: "2026-08-21",
    generatedAt: "2026-08-21T00:00:00.000Z",
    mode: "deepseek",
    scannedCount: 40,
    duplicateCount: 3,
    items,
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("syncRadarDocument", () => {
  it("updates same-day keys and creates the same URL again on a different date", async () => {
    const sameUrl = "https://example.com/a";
    const daily = document([
      item(`2026-08-21|${sameUrl}`, 1, sameUrl),
      item("2026-08-21|https://example.com/b", 6, "https://example.com/b"),
    ]);
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    const fetchImpl = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url = String(input);
      requests.push({ url, init });
      if (url.endsWith("/auth/v3/tenant_access_token/internal")) {
        return json({ code: 0, msg: "ok", tenant_access_token: "tenant-token", expire: 7200 });
      }
      if (url.includes("/records?page_size=500") && !url.includes("page_token=")) {
        return json({
          code: 0,
          msg: "success",
          data: {
            items: [
              {
                record_id: "old-date",
                fields: { 唯一键: [{ type: "text", text: `2026-08-20|${sameUrl}` }] },
              },
            ],
            has_more: true,
            page_token: "next-page",
            total: 2,
          },
        });
      }
      if (url.includes("page_token=next-page")) {
        return json({
          code: 0,
          msg: "success",
          data: {
            items: [
              {
                record_id: "same-day",
                fields: { 唯一键: "2026-08-21|https://example.com/b" },
              },
            ],
            has_more: false,
            total: 2,
          },
        });
      }
      if (url.endsWith("/batch_create") || url.endsWith("/batch_update")) {
        return json({ code: 0, msg: "success", data: { records: [] } });
      }
      throw new Error(`Unexpected request: ${url}`);
    };

    const result = await syncRadarDocument(daily, config, fetchImpl);

    expect(result).toEqual({ created: 1, updated: 1, total: 2 });
    const create = requests.find((request) => request.url.endsWith("/batch_create"));
    const update = requests.find((request) => request.url.endsWith("/batch_update"));
    expect(JSON.parse(String(create?.init?.body))).toMatchObject({
      records: [{ fields: { 唯一键: `2026-08-21|${sameUrl}`, 当日排名: 1, "Top 5": true } }],
    });
    expect(JSON.parse(String(update?.init?.body))).toMatchObject({
      records: [{ record_id: "same-day", fields: { 唯一键: "2026-08-21|https://example.com/b" } }],
    });
    expect(requests.filter((request) => request.url.includes("/records?")).length).toBe(2);
  });
});

describe("buildFeishuFields", () => {
  it("maps the agreed Chinese archive fields and Feishu URL values", () => {
    const radarItem = item("2026-08-21|https://example.com/a", 1, "https://example.com/a");

    expect(buildFeishuFields(document([radarItem]), radarItem)).toEqual({
      唯一键: "2026-08-21|https://example.com/a",
      日期: Date.parse("2026-08-21T00:00:00.000Z"),
      当日排名: 1,
      "Top 5": true,
      标题: "Story 1",
      原文链接: { text: "Story 1", link: "https://example.com/a" },
      HN讨论: { text: "HN", link: "https://news.ycombinator.com/item?id=1" },
      总分: 89,
      基础分: 59,
      编辑分: 30,
      中文摘要: "中文摘要 1",
      推荐理由: "推荐理由 1",
      评分模式: "DeepSeek",
      发布时间: Date.parse("2026-08-20T12:30:00.000Z"),
    });
  });
});

describe("selectRadarJsonPaths", () => {
  it("selects the newest daily file or every historical file oldest-first", () => {
    const paths = [
      "digests/2026-08-20/ai-radar.json",
      "digests/not-a-date/ai-radar.json",
      "digests/2026-08-19/ai-radar.json",
    ];
    expect(selectRadarJsonPaths(paths, false)).toEqual(["digests/2026-08-20/ai-radar.json"]);
    expect(selectRadarJsonPaths(paths, true)).toEqual([
      "digests/2026-08-19/ai-radar.json",
      "digests/2026-08-20/ai-radar.json",
    ]);
  });
});
