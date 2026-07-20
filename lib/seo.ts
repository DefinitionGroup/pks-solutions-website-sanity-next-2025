export const SITE_URL = "https://www.pks-solutions.de";
export const DEFAULT_LOCALE = "de";
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE] as const;

export const HOME_TITLE =
  "PKS Solutions | Prozesskennzahlen und Produktionsoptimierung";
export const DEFAULT_DESCRIPTION =
  "PKS Solutions macht Zeit, Abläufe und Leistung messbar – mit Software für Prozesskennzahlen, Zeiterfassung und effizientere Produktion.";

export const CANONICAL_PATH_REDIRECTS: Readonly<Record<string, string>> = {
  "/home": "/de",
  "/startseite": "/de",
  "/de/home": "/de",
  "/de/startseite": "/de",
  "/en": "/de",
  "/en/home": "/de",

  "/contact": "/de/kontakt-zu-uns",
  "/kontakt": "/de/kontakt-zu-uns",
  "/de/contact": "/de/kontakt-zu-uns",
  "/de/kontakt": "/de/kontakt-zu-uns",
  "/de/kontakt-zuuns": "/de/kontakt-zu-uns",
  "/en/contact": "/de/kontakt-zu-uns",

  "/about": "/de/ueber-uns",
  "/de/about": "/de/ueber-uns",
  "/de/uber-uns": "/de/ueber-uns",
  "/en/about": "/de/ueber-uns",

  "/solutions": "/de/loesungen",
  "/de/losungen": "/de/loesungen",
  "/de/solutions": "/de/loesungen",
  "/en/solutions": "/de/loesungen",

  "/imprint": "/de/impressum",
  "/en/imprint": "/de/impressum",
  "/en/blog": "/de/blog",
};

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

export const NOINDEX_PAGE_SLUGS = new Set(["blog"]);

export function resolveCanonicalPath(path: string): string {
  const pathWithLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath =
    pathWithLeadingSlash === "/"
      ? pathWithLeadingSlash
      : pathWithLeadingSlash.replace(/\/+$/, "");

  return (
    CANONICAL_PATH_REDIRECTS[normalizedPath.toLowerCase()] ?? normalizedPath
  );
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${resolveCanonicalPath(path)}`;
}

export function isSupportedLocale(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(
    locale as (typeof SUPPORTED_LOCALES)[number]
  );
}

export function isPublicPageSlug(slug: string): boolean {
  return !NON_PUBLIC_PAGE_SLUGS.has(slug.toLowerCase());
}

export function isIndexablePageSlug(slug: string): boolean {
  const normalizedSlug = slug.toLowerCase();
  return (
    !NON_PUBLIC_PAGE_SLUGS.has(normalizedSlug) &&
    !NOINDEX_PAGE_SLUGS.has(normalizedSlug)
  );
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
