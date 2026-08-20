# Feishu Bitable Radar Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Save every daily Radar candidate to a China Feishu Bitable, keeping the same URL on different dates as separate history rows while same-day reruns update instead of duplicate.

**Architecture:** Read the versioned daily `ai-radar.json` produced by the page subsystem, exchange the Feishu app credentials for a tenant token, list existing record keys, then batch-create missing rows and batch-update matching rows. The daily GitHub Action treats Feishu as a non-blocking secondary sink; a CLI `--all` mode performs the first historical import.

**Tech Stack:** TypeScript, Vitest, native `fetch`, Feishu Open Platform REST API, GitHub Actions, Feishu Bitable.

**Spec:** `docs/superpowers/specs/2026-08-20-personal-radar-pages-feishu-design.md`

## Global Constraints

- Prerequisite: complete the JSON contract in `2026-08-20-personal-radar-page.md` first.
- Use China Feishu endpoints under `https://open.feishu.cn/open-apis/`; do not use Lark endpoints.
- Use native `fetch`; add no Feishu SDK or new runtime dependency.
- `RadarJsonItem.key` is the only upsert key. Same date + canonical URL updates; a different date creates a separate row.
- Sync all items in the document (target 30), not only Top 5.
- Sync Chinese summary/reason to Bitable; keep English in JSON/Markdown only.
- Never print App Secret, access token, GitHub secret values, or full response headers.
- Missing Feishu configuration must skip cleanly. Feishu API failure must fail only the sync step, while `continue-on-error` keeps the digest/page deployment healthy.
- Do not attempt to automate enterprise creation, app publication, administrator approval, Base creation, field creation, or adding the app as a collaborator.
- Testing budget: one focused RED, one focused GREEN per behavior, then one combined final gate. Do not repeat passing suites or add another review cycle unless a failure requires it.

---

## Task 1: Implement the typed Feishu Bitable upsert client

**Files:**

- Create: `src/feishu-bitable.ts`
- Create: `src/__tests__/feishu-bitable.test.ts`

- [ ] **Step 1: Write one behavior-focused fake-fetch test group**

Cover these behaviors without live network calls:

1. Token request uses the China Feishu internal tenant-token endpoint.
2. Existing record with the same `唯一键` goes to batch update.
3. Missing key goes to batch create.
4. The same article URL with a different date/key is created as a separate row.
5. All document items are mapped, including non-Top-5 items.
6. Paginated list responses are followed until `has_more` is false.

Core test shape:

```ts
import { describe, expect, it, vi } from "vitest";
import { syncRadarDocument } from "../feishu-bitable.ts";

it("updates same-day keys and creates cross-date history", async () => {
  const fetchImpl = vi.fn()
    .mockResolvedValueOnce(json({ code: 0, tenant_access_token: "token", expire: 7200 }))
    .mockResolvedValueOnce(json({
      code: 0,
      data: {
        items: [{ record_id: "rec1", fields: { "唯一键": "2026-08-20|https://example.com/a" } }],
        has_more: false,
      },
    }))
    .mockResolvedValueOnce(json({ code: 0, data: {} }))
    .mockResolvedValueOnce(json({ code: 0, data: {} }));

  const result = await syncRadarDocument(document, config, fetchImpl);

  expect(result).toEqual({ created: 1, updated: 1, total: 2 });
  expect(requestBody(fetchImpl, "/batch_update").records[0].record_id).toBe("rec1");
  expect(requestBody(fetchImpl, "/batch_create").records[0].fields["唯一键"])
    .toBe("2026-08-21|https://example.com/a");
});
```

- [ ] **Step 2: Run focused RED once**

Run: `pnpm vitest run src/__tests__/feishu-bitable.test.ts`

Expected: FAIL because `src/feishu-bitable.ts` is missing.

- [ ] **Step 3: Define the public client boundary**

Implement:

```ts
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

export function loadFeishuBitableConfig(env?: NodeJS.ProcessEnv): FeishuBitableConfig | null;
export function buildFeishuFields(document: RadarJsonDocument, item: RadarJsonItem): Record<string, unknown>;
export async function syncRadarDocument(
  document: RadarJsonDocument,
  config: FeishuBitableConfig,
  fetchImpl?: typeof fetch,
): Promise<FeishuSyncResult>;
```

Use exactly these environment names:

- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`
- `FEISHU_BITABLE_APP_TOKEN`
- `FEISHU_BITABLE_TABLE_ID`

- [ ] **Step 4: Implement token and record API calls**

Endpoints:

```text
POST /auth/v3/tenant_access_token/internal
GET  /bitable/v1/apps/{appToken}/tables/{tableId}/records?page_size=500
POST /bitable/v1/apps/{appToken}/tables/{tableId}/records/batch_create
POST /bitable/v1/apps/{appToken}/tables/{tableId}/records/batch_update
```

Minimal upsert algorithm:

1. Fetch one tenant access token.
2. List current table records page by page and map the text value of `唯一键` to `record_id`.
3. Partition the document into create/update arrays by exact key.
4. Send at most 500 records per batch request.
5. Require HTTP success and Feishu JSON `code === 0`; throw a redacted error otherwise.

Listing the table is deliberately chosen for first-release reliability over Feishu filter-expression complexity. At 30 rows/day it remains acceptable for an initial personal archive; optimize only after real scale data shows a need.

- [ ] **Step 5: Map the agreed Bitable fields**

`buildFeishuFields` must emit:

```ts
{
  "唯一键": item.key,
  "日期": Date.parse(`${document.date}T00:00:00.000Z`),
  "当日排名": item.rank,
  "Top 5": item.isTop5,
  "标题": item.title,
  "原文链接": { text: item.title, link: item.url },
  "HN讨论": { text: "HN", link: item.hnUrl },
  "总分": item.totalScore,
  "基础分": item.baseScore,
  "编辑分": item.editorialScore,
  "中文摘要": item.summary.zh,
  "推荐理由": item.reason.zh,
  "评分模式": document.mode === "deepseek" ? "DeepSeek" : "确定性降级",
  "发布时间": Date.parse(item.publishedAt),
}
```

Reject non-finite date values before making a write request.

- [ ] **Step 6: Run focused GREEN once**

Run: `pnpm vitest run src/__tests__/feishu-bitable.test.ts`

Expected: PASS with no live HTTP call.

---

## Task 2: Add latest-date and historical CLI modes

**Files:**

- Modify: `src/feishu-bitable.ts`
- Modify: `src/__tests__/feishu-bitable.test.ts`
- Modify: `package.json:6-21`

- [ ] **Step 1: Add a pure discovery test**

Test a helper that selects only valid Radar JSON paths and sorts oldest-first for a predictable backfill:

```ts
expect(selectRadarJsonPaths([
  "digests/2026-08-20/ai-radar.json",
  "digests/not-a-date/ai-radar.json",
  "digests/2026-08-19/ai-radar.json",
], true)).toEqual([
  "digests/2026-08-19/ai-radar.json",
  "digests/2026-08-20/ai-radar.json",
]);
```

Without `--all`, return only the newest valid JSON path.

- [ ] **Step 2: Run the focused test once and confirm RED**

Run: `pnpm vitest run src/__tests__/feishu-bitable.test.ts`

Expected: the new discovery assertion fails because the helper is missing.

- [ ] **Step 3: Implement the CLI entry point**

When executed directly:

1. Load the four environment values.
2. If any are absent, log one skip line naming only the missing variable names and exit 0.
3. Discover `digests/YYYY-MM-DD/ai-radar.json`.
4. Default to the newest file; when `--all` is present, process all files oldest-first.
5. Validate `schemaVersion === 1`, date, items, and required key strings before syncing.
6. Log per-date and final created/updated/total counts only.

Add package scripts:

```json
"sync:feishu-bitable": "tsx src/feishu-bitable.ts",
"sync:feishu-bitable:all": "tsx src/feishu-bitable.ts --all"
```

- [ ] **Step 4: Run focused GREEN once**

Run: `pnpm vitest run src/__tests__/feishu-bitable.test.ts`

Expected: PASS.

---

## Task 3: Wire non-blocking daily sync and document manual setup

**Files:**

- Modify: `.github/workflows/daily-digest.yml:36-57`
- Modify: `.env.example`
- Create: `docs/feishu-bitable-setup.md`
- Modify: `README.md`

- [ ] **Step 1: Add the GitHub Actions sync step**

Place it immediately after `Run daily digest`, while the new JSON is already present locally:

```yaml
- name: Sync Radar to Feishu Bitable
  continue-on-error: true
  env:
    FEISHU_APP_ID: ${{ secrets.FEISHU_APP_ID }}
    FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
    FEISHU_BITABLE_APP_TOKEN: ${{ secrets.FEISHU_BITABLE_APP_TOKEN }}
    FEISHU_BITABLE_TABLE_ID: ${{ secrets.FEISHU_BITABLE_TABLE_ID }}
  run: pnpm sync:feishu-bitable
```

Do not reuse `FEISHU_WEBHOOK_URLS`; webhook notifications and Bitable app credentials are different systems.

- [ ] **Step 2: Add configuration names without values**

Add the four variable names to `.env.example`. Never add real IDs, secrets, access tokens, or the user’s Base URL.

- [ ] **Step 3: Write the China Feishu setup checklist**

`docs/feishu-bitable-setup.md` must tell the user to do these manual steps in order:

1. Create an enterprise custom app at China Feishu Open Platform.
2. Copy App ID and App Secret.
3. Request Bitable read/edit/manage permissions for app identity and publish an app version; obtain administrator approval if the tenant requires it.
4. Create one Base and one table.
5. Create fields with exactly these names/types:
   - `唯一键` — single-line text, primary field
   - `日期` — date
   - `当日排名` — number
   - `Top 5` — checkbox
   - `标题` — single-line text
   - `原文链接` — URL
   - `HN讨论` — URL
   - `总分` / `基础分` / `编辑分` — number
   - `中文摘要` / `推荐理由` — multi-line text
   - `评分模式` — single select with `DeepSeek` and `确定性降级`
   - `发布时间` — date-time
6. Read `app_token` from the Base URL/API name and `table_id` from the table URL/API name.
7. Add the custom app as an editable collaborator on the Base.
8. Add the four values as GitHub Actions repository secrets.

Link only official China Feishu documentation already cited in the approved spec.

- [ ] **Step 4: Explain daily and one-time modes in README**

Document:

- Daily Actions runs `pnpm sync:feishu-bitable` for the newest JSON.
- First import runs `pnpm sync:feishu-bitable:all` once after the app/table exists.
- Same-day reruns update by `唯一键`; cross-date repeats remain separate history rows.
- Feishu failure does not block Markdown/JSON/page output.

---

## Task 4: Verify once, deploy, and perform one idempotency acceptance

**Files:**

- Verify/deploy only; no code changes unless a real defect is found.

- [ ] **Step 1: Run the single combined repository gate**

This is the only full gate when both implementation plans are executed together:

```powershell
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
```

Expected: all exit 0. Do not rerun any passing command.

- [ ] **Step 2: Commit the Feishu subsystem**

Stage only files named in this plan, verify no secret-like values are staged, and commit:

```bash
git commit -m "feat: sync radar history to feishu bitable"
```

- [ ] **Step 3: Deploy with the page subsystem through the fork PR**

Push to `fork`, update/create the PR targeting `Liderhu/agents-radar:master`, and merge without changing the upstream draft PR.

- [ ] **Step 4: Pause for the unavoidable user-owned Feishu setup**

Because no Feishu app or Base exists yet, open the official setup pages and guide the user through creation. Do not ask them to paste App Secret into chat. Continue only after the user confirms the app version, table fields, collaborator, and permissions are ready.

- [ ] **Step 5: Store four GitHub repository secrets securely**

Use `gh secret set` interactive/stdin input for `Liderhu/agents-radar`; never put secret values in command arguments, logs, commits, or reports.

- [ ] **Step 6: Run the one-time historical import**

Run `pnpm sync:feishu-bitable:all` once against every available JSON artifact. Expected result: every stored date contributes all its items.

- [ ] **Step 7: Run exactly one necessary same-day rerun**

Run the newest-date sync once more to prove idempotency. This is not a redundant test: it is the acceptance behavior requested by the user.

Expected:

- Bitable row count does not increase on the second same-day sync.
- Existing newest-date rows are reported as updated.
- A repeated article URL from another date, when present, has a distinct `唯一键` and row.

- [ ] **Step 8: Hand off the two daily reading surfaces**

Return:

- Public reader: `https://liderhu.github.io/agents-radar/radar.html`
- The user’s Feishu Base URL (do not publish it in README or logs)
- Latest Action run URL and concise sync counts

Do not schedule a duplicate review or another full test pass after these acceptance checks unless code changed.

