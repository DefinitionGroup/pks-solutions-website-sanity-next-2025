export const SITE_URL = "https://www.pks-solutions.de";
export const DEFAULT_LOCALE = "de";
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE] as const;

export const HOME_TITLE =
  "PKS Solutions | Prozesskennzahlen und Produktionsoptimierung";
export const DEFAULT_DESCRIPTION =
  "PKS Solutions macht Zeit, Abläufe und Leistung messbar – mit Software für Prozesskennzahlen, Zeiterfassung und effizientere Produktion.";

export const NON_PUBLIC_PAGE_SLUGS = new Set([
  "clients",
  "kontakt",
  "projects",
  "sign-in",
  "sign-up",
  "startseite22",
  "startseitearc",
  "testpage",
  "testuserspage",
]);

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isSupportedLocale(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(
    locale as (typeof SUPPORTED_LOCALES)[number]
  );
}

export function isPublicPageSlug(slug: string): boolean {
  return !NON_PUBLIC_PAGE_SLUGS.has(slug.toLowerCase());
}

export function truncateDescription(
  text: string | undefined | null,
  maxLength = 160
): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}
