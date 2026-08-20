export interface SearchableRadarItem {
  title: string;
  summary: { zh: string; en: string };
}

export function selectRadarDate(dates: string[], requested: string | null): string | null;
export function filterRadarItems<T extends SearchableRadarItem>(items: T[], query: string): T[];
export function safeRadarHref(value: string): string;
export function startRadarPage(options?: Record<string, unknown>): Promise<void>;
