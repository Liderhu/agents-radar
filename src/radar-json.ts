import type { Lang } from "./i18n.ts";
import { normalizeUrl } from "./link-utils.ts";
import type { RadarData } from "./radar.ts";
import { saveFile } from "./report.ts";

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

export function buildRadarJson(data: RadarData, date: string, generatedAt: string): RadarJsonDocument {
  const top5Ids = new Set(data.top5.map((item) => item.story.id));
  return {
    schemaVersion: 1,
    date,
    generatedAt,
    mode: data.mode,
    scannedCount: data.scannedCount,
    duplicateCount: data.duplicateCount,
    items: data.items.map((item, index) => ({
      key: `${date}|${normalizeUrl(item.story.url)}`,
      rank: index + 1,
      isTop5: top5Ids.has(item.story.id),
      title: item.story.title,
      url: item.story.url,
      hnUrl: item.story.hnUrl,
      totalScore: item.totalScore,
      baseScore: item.baseScore,
      editorialScore: item.editorialScore,
      publishedAt: item.story.createdAt,
      summary: item.summary,
      reason: item.reason,
    })),
  };
}

export function saveRadarJson(data: RadarData, date: string, generatedAt: string): string {
  const content = JSON.stringify(buildRadarJson(data, date, generatedAt), null, 2) + "\n";
  return saveFile(content, date, "ai-radar.json");
}
