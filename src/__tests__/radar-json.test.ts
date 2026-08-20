import { describe, expect, it } from "vitest";
import type { HnStory } from "../hn.ts";
import { buildRadarJson } from "../radar-json.ts";
import type { RadarData, RadarItem } from "../radar.ts";

function item(id: string, totalScore: number): RadarItem {
  const story: HnStory = {
    id,
    hnRank: Number(id),
    title: id === "1" ? "Alpha" : "Beta",
    url: id === "1" ? "https://EXAMPLE.com/alpha/?utm_source=hn&a=1" : "https://example.com/beta",
    hnUrl: `https://news.ycombinator.com/item?id=${id}`,
    points: 100,
    comments: 20,
    author: "author",
    createdAt: "2026-08-19T23:00:00.000Z",
  };
  return {
    story,
    breakdown: { points: 25, comments: 10, rank: 20, freshness: 8 },
    baseScore: 63,
    editorialScore: 25,
    totalScore,
    summary: { zh: `中文摘要 ${id}`, en: `English summary ${id}` },
    reason: { zh: `中文理由 ${id}`, en: `English reason ${id}` },
  };
}

describe("buildRadarJson", () => {
  it("preserves ranked Radar data in the public daily contract", () => {
    const first = item("1", 88);
    const second = item("2", 80);
    const data: RadarData = {
      items: [first, second],
      top5: [first],
      mode: "deepseek",
      scannedCount: 30,
      duplicateCount: 2,
    };

    const result = buildRadarJson(data, "2026-08-20", "2026-08-20T00:00:00.000Z");

    expect(result).toEqual({
      schemaVersion: 1,
      date: "2026-08-20",
      generatedAt: "2026-08-20T00:00:00.000Z",
      mode: "deepseek",
      scannedCount: 30,
      duplicateCount: 2,
      items: [
        {
          key: "2026-08-20|https://example.com/alpha?a=1",
          rank: 1,
          isTop5: true,
          title: "Alpha",
          url: "https://EXAMPLE.com/alpha/?utm_source=hn&a=1",
          hnUrl: "https://news.ycombinator.com/item?id=1",
          totalScore: 88,
          baseScore: 63,
          editorialScore: 25,
          publishedAt: "2026-08-19T23:00:00.000Z",
          summary: { zh: "中文摘要 1", en: "English summary 1" },
          reason: { zh: "中文理由 1", en: "English reason 1" },
        },
        {
          key: "2026-08-20|https://example.com/beta",
          rank: 2,
          isTop5: false,
          title: "Beta",
          url: "https://example.com/beta",
          hnUrl: "https://news.ycombinator.com/item?id=2",
          totalScore: 80,
          baseScore: 63,
          editorialScore: 25,
          publishedAt: "2026-08-19T23:00:00.000Z",
          summary: { zh: "中文摘要 2", en: "English summary 2" },
          reason: { zh: "中文理由 2", en: "English reason 2" },
        },
      ],
    });
  });
});
