import type { MetadataRoute } from "next";
import {
  getAllBlogPostSlugs,
  getAllPageSlugsAndLocales,
} from "@/sanity/fetchData";
import {
  DEFAULT_LOCALE,
  absoluteUrl,
  isPublicPageSlug,
} from "@/lib/seo";

const CHANNEL = "pksWeb";

// Site-wide SEO revision (metadata, canonicals, redirects) deployed 21 Jul 2026;
// Sanity _updatedAt predates it, so use it as a lastmod floor.
const SEO_REVISION_DATE = new Date("2026-07-21T09:01:00.000Z");

function lastModifiedFor(updatedAt: string | undefined): Date {
  const updated = updatedAt ? new Date(updatedAt) : SEO_REVISION_DATE;
  return updated > SEO_REVISION_DATE ? updated : SEO_REVISION_DATE;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(`/${DEFAULT_LOCALE}`),
      lastModified: lastModifiedFor(undefined),
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
      !isPublicPageSlug(page.slug)
    ) {
      continue;
    }

    entries.push({
      url: absoluteUrl(`/${DEFAULT_LOCALE}/${page.slug}`),
      lastModified: lastModifiedFor(page._updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const posts = await getAllBlogPostSlugs(DEFAULT_LOCALE, CHANNEL);
  for (const post of posts) {
    if (!post.slug || post.excludeFromSearch) continue;
    entries.push({
      url: absoluteUrl(`/${DEFAULT_LOCALE}/blog/${post.slug}`),
      lastModified: lastModifiedFor(post._updatedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}

export const revalidate = 3600;
