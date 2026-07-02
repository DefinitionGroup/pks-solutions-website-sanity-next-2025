export const SITE_URL = "https://www.pks-solutions.de";
export const LOCALES = ["en", "de"] as const;
export const DEFAULT_LOCALE = "de";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localeAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = absoluteUrl(`/${locale}${path}`);
  }
  alternates["x-default"] = absoluteUrl(`/${DEFAULT_LOCALE}${path}`);
  return alternates;
}

export function truncateDescription(text: string | undefined | null, maxLength = 160): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}
