import { describe, expect, it } from "vitest";
import { filterRadarItems, safeRadarHref, selectRadarDate } from "../../radar-page.js";

const items = [
  {
    title: "Alpha agents",
    summary: { zh: "自动化研究", en: "Automation research" },
  },
  {
    title: "Beta model",
    summary: { zh: "本地模型", en: "Local inference" },
  },
];

describe("Radar page data behavior", () => {
  it("uses a requested available date and otherwise falls back to the newest", () => {
    const dates = ["2026-08-20", "2026-08-19"];
    expect(selectRadarDate(dates, "2026-08-19")).toBe("2026-08-19");
    expect(selectRadarDate(dates, "2026-01-01")).toBe("2026-08-20");
    expect(selectRadarDate([], null)).toBeNull();
  });

  it("filters titles and bilingual summaries locally", () => {
    expect(filterRadarItems(items, "agents")).toEqual([items[0]]);
    expect(filterRadarItems(items, "本地")).toEqual([items[1]]);
    expect(filterRadarItems(items, "INFERENCE")).toEqual([items[1]]);
    expect(filterRadarItems(items, "")).toEqual(items);
  });

  it("allows public web links and blocks executable or malformed links", () => {
    expect(safeRadarHref("https://example.com/article")).toBe("https://example.com/article");
    expect(safeRadarHref("http://example.com/article")).toBe("http://example.com/article");
    expect(safeRadarHref("javascript:alert(1)")).toBe("#");
    expect(safeRadarHref("not a url")).toBe("#");
  });
});
