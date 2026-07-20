import type { MetadataRoute } from "next";
import { getAllPageSlugsAndLocales } from "@/sanity/fetchData";
import {
  DEFAULT_LOCALE,
  absoluteUrl,
  isIndexablePageSlug,
} from "@/lib/seo";

const CHANNEL = "pksWeb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(`/${DEFAULT_LOCALE}`),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const pages = await getAllPageSlugsAndLocales();
  for (const page of pages) {
    if (
      !page.slug ||
      page.locale !== DEFAULT_LOCALE ||
      page.channel !== CHANNEL ||
      page.isHomepage ||
      page.protected ||
      page.excludeFromSearch ||
      !isIndexablePageSlug(page.slug)
    ) {
      continue;
    }

    entries.push({
      url: absoluteUrl(`/${DEFAULT_LOCALE}/${page.slug}`),
      lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}

export const revalidate = 3600;
