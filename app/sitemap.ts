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
      !isPublicPageSlug(page.slug)
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

  const posts = await getAllBlogPostSlugs(DEFAULT_LOCALE, CHANNEL);
  for (const post of posts) {
    if (!post.slug) continue;
    entries.push({
      url: absoluteUrl(`/${DEFAULT_LOCALE}/blog/${post.slug}`),
      lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}

export const revalidate = 3600;
