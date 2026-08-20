# Personal Radar Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Publish one public, mobile-friendly Information Radar page that reads the same daily 30-item Radar result already used by the Markdown reports.

**Architecture:** Serialize the existing in-memory `RadarData` once into a versioned daily JSON artifact, generate a small date manifest, and let a framework-free `radar.html` fetch those static files from GitHub Pages. The page has no backend and makes no LLM call.

**Tech Stack:** TypeScript, Vitest, Node `fs`, vanilla HTML/CSS/JavaScript, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-20-personal-radar-pages-feishu-design.md`

## Global Constraints

- Keep the implementation minimal: no React/Vite/backend/database/new runtime dependency.
- Reuse the single `radarDataPromise` in `src/index.ts`; never call the LLM again for JSON or the page.
- Keep all article strings untrusted: render text with `textContent` and allow only `http:`/`https:` links.
- Do not stage, delete, or rewrite the existing untracked `digests/2026-08-13/` files.
- Do not fabricate a structured backfill from the old Markdown: it lacks complete base/editorial/HN-link fields.
- Testing budget: one focused RED, one focused GREEN per behavior, then one combined final gate. Do not repeat passing suites or add a second review cycle unless a failure requires it.
- If this plan and the Feishu plan run consecutively, defer the full `pnpm test` gate to the end of the Feishu plan so the full suite runs only once.

---

## Task 1: Add the versioned daily Radar JSON artifact

**Files:**

- Create: `src/radar-json.ts`
- Create: `src/__tests__/radar-json.test.ts`
- Modify: `src/index.ts:34-61,488-513`

- [ ] **Step 1: Write the serializer contract test**

Create a two-item `RadarData` fixture and assert the complete public contract, especially stable rank, Top-5 membership, canonical same-day key, bilingual text, score components, and source links:

```ts
import { describe, expect, it } from "vitest";
import { buildRadarJson } from "../radar-json.ts";

describe("buildRadarJson", () => {
  it("serializes ranked RadarData without another editorial call", () => {
    const result = buildRadarJson(radarData, "2026-08-20", "2026-08-20T00:00:00.000Z");

    expect(result.schemaVersion).toBe(1);
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toMatchObject({
      key: "2026-08-20|https://example.com/alpha?a=1",
      rank: 1,
      isTop5: true,
      title: "Alpha",
      url: "https://example.com/alpha?utm_source=hn&a=1",
      hnUrl: "https://news.ycombinator.com/item?id=1",
      totalScore: 88,
      baseScore: 63,
      editorialScore: 25,
      publishedAt: "2026-08-19T23:00:00.000Z",
      summary: { zh: "中文摘要", en: "English summary" },
      reason: { zh: "中文理由", en: "English reason" },
    });
  });
});
```

- [ ] **Step 2: Run the focused test once and confirm RED**

Run: `pnpm vitest run src/__tests__/radar-json.test.ts`

Expected: FAIL because `src/radar-json.ts` does not exist.

- [ ] **Step 3: Implement the smallest typed serializer and saver**

Define these public interfaces and functions in `src/radar-json.ts`:

```ts
export interface RadarJsonItem {
  key: string;
  rank: number;
  isTop5: boolean;
  title: string;
  url: string;
  hnUrl: string;
  totalScore: number;
  baseScore: number;
  editorialScore: number;
  publishedAt: string;
  summary: Record<Lang, string>;
  reason: Record<Lang, string>;
}

export interface RadarJsonDocument {
  schemaVersion: 1;
  date: string;
  generatedAt: string;
  mode: RadarData["mode"];
  scannedCount: number;
  duplicateCount: number;
  items: RadarJsonItem[];
}

export function buildRadarJson(data: RadarData, date: string, generatedAt: string): RadarJsonDocument;
export function saveRadarJson(data: RadarData, date: string, generatedAt: string): string;
```

Implementation rules:

- Preserve the already sorted `data.items` order and derive `rank` from its array index.
- Derive `isTop5` from the IDs in `data.top5`, not from a new sort.
- Build `key` as `${date}|${normalizeUrl(item.story.url)}`.
- Preserve the original article URL in `url`; canonicalization is only for the key.
- Save `JSON.stringify(document, null, 2) + "\n"` with existing `saveFile(..., date, "ai-radar.json")`.

- [ ] **Step 4: Wire the saver to the existing shared Radar result**

Immediately after `const radarData = await radarDataPromise;`, call:

```ts
console.log(`  Saved ${saveRadarJson(radarData, dateStr, now.toISOString())}`);
```

Do not put this in either language loop and do not introduce a new promise or prompt.

- [ ] **Step 5: Run focused GREEN once**

Run: `pnpm vitest run src/__tests__/radar-json.test.ts src/__tests__/radar.test.ts`

Expected: both files pass, including the existing one-editorial-call characterization.

---

## Task 2: Generate a Radar-only date manifest

**Files:**

- Modify: `src/generate-manifest.ts:6-10,43-51,105-124`
- Modify: `src/__tests__/generate-manifest.test.ts:1-10`
- Modify: `.github/workflows/daily-digest.yml:59-69`

- [ ] **Step 1: Add a pure manifest test**

Add a test for a pure exported helper:

```ts
import { buildRadarManifest } from "../generate-manifest.ts";

it("keeps only dates with a daily Radar JSON in newest-first order", () => {
  expect(buildRadarManifest(["2026-08-19", "junk", "2026-08-20"], "2026-08-20T01:00:00.000Z")).toEqual({
    schemaVersion: 1,
    generatedAt: "2026-08-20T01:00:00.000Z",
    dates: ["2026-08-20", "2026-08-19"],
  });
});
```

- [ ] **Step 2: Run focused RED once**

Run: `pnpm vitest run src/__tests__/generate-manifest.test.ts`

Expected: FAIL because `buildRadarManifest` is missing.

- [ ] **Step 3: Implement manifest discovery and output**

Add:

```ts
export interface RadarManifest {
  schemaVersion: 1;
  generatedAt: string;
  dates: string[];
}

export function buildRadarManifest(dates: string[], generatedAt: string): RadarManifest;
```

In `main()`, discover only `digests/YYYY-MM-DD/ai-radar.json`, pass those dates to the helper, and write `radar-manifest.json` with a final newline. Keep the existing `manifest.json` and `feed.xml` behavior unchanged.

- [ ] **Step 4: Include the new root artifact in the existing workflow commit**

Change the manifest commit step to:

```yaml
git add manifest.json radar-manifest.json feed.xml
```

- [ ] **Step 5: Run focused GREEN once**

Run: `pnpm vitest run src/__tests__/generate-manifest.test.ts`

Expected: PASS.

---

## Task 3: Build the standalone public reader

**Files:**

- Create: `radar.html`
- Modify: `README.md` (add the generic Radar page link and data-file description)

- [ ] **Step 1: Build one self-contained page**

Use only semantic HTML, embedded CSS, and embedded JavaScript. Required regions:

```html
<header><!-- title, selected date, mode, scan/dedupe counts --></header>
<nav aria-label="雷达日期"><!-- previous, select, next --></nav>
<main>
  <section id="top5"><!-- five high-signal cards --></section>
  <section id="all-items"><!-- search plus all 30 compact rows --></section>
</main>
```

Required client flow:

1. Fetch `./radar-manifest.json` with `{ cache: "no-store" }`.
2. Select `?date=YYYY-MM-DD` when valid, otherwise the newest manifest date.
3. Fetch `./digests/${date}/ai-radar.json`.
4. Render Top 5 and all items from that same document.
5. Search title plus Chinese/English summary locally; never make a server request for search.
6. Keep previous/next navigation in manifest order and update the query string.

Safety and states:

- Put user/source strings into `textContent`, never `innerHTML`.
- Use a helper that returns `#` unless `new URL(value).protocol` is `http:` or `https:`.
- Show explicit Chinese messages for empty history, malformed JSON, and network failure.
- Show “确定性降级” when `mode === "deterministic"`; do not imply an LLM result.

Visual direction:

- Deep blue-gray canvas, cyan signal accents, warm yellow reserved for Top 5.
- A restrained radar sweep/rings motif in CSS; respect `prefers-reduced-motion`.
- Use system fonts only, large readable titles, strong keyboard focus, and a one-column mobile layout.
- Scores should be scannable but not chart-heavy; one number and one short bar per item is enough.

- [ ] **Step 2: Document the public data contract**

In README, state that the reader uses `radar-manifest.json` and versioned `digests/<date>/ai-radar.json`; do not promise historical dates before JSON generation begins.

---

## Task 4: Verify once and deploy to the personal fork

**Files:**

- Verify only; no new files unless a defect is found.

- [ ] **Step 1: Run one combined local gate**

If the Feishu plan will run immediately, skip this step now and run the shared gate at the end of that plan. Otherwise run exactly once:

```powershell
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
```

Expected: all commands exit 0. Do not rerun a passing command.

- [ ] **Step 2: Commit the page subsystem**

Stage only the files named in this plan. Confirm `digests/2026-08-13/` remains untracked, then commit:

```bash
git commit -m "feat: publish personal radar page"
```

- [ ] **Step 3: Publish through a fork PR, not a force-push**

Push the feature branch to `fork`, create a PR against `Liderhu/agents-radar:master`, and merge it after the checks pass. Do not modify or close the separate upstream draft PR.

- [ ] **Step 4: Enable GitHub Pages from `master` `/`**

Use GitHub Pages branch deployment for `Liderhu/agents-radar`, with source branch `master` and folder `/`. The expected reader URL is:

`https://liderhu.github.io/agents-radar/radar.html`

- [ ] **Step 5: Produce the first authentic JSON date**

Ensure the fork has `DEEPSEEK_API_KEY`, manually dispatch `Daily Agents Radar` once, and accept `mode: "deterministic"` if editorial generation falls back. Do not invent fields from the older Markdown files.

- [ ] **Step 6: Perform one live smoke check**

Check the deployed page once on the newest real date:

- Top 5 count is 5 when 30 candidates exist.
- All-candidate count matches JSON (target 30).
- Search filters locally.
- Article and HN links open the expected targets.
- Date query/navigation works.
- Mobile width remains readable.

Record this single live result in the implementation handoff; do not request a second review cycle for unchanged code.

