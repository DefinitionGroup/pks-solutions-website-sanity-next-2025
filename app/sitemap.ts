import type { MetadataRoute } from "next";
import {
  getAllPageSlugsAndLocales,
  getAllBlogPostSlugs,
} from "@/sanity/fetchData";
import { LOCALES, absoluteUrl } from "@/lib/seo";

const RESERVED_SLUGS = ["projects", "clients", "sign-in", "sign-up"];
const CHANNEL = "pksWeb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: absoluteUrl(`/${locale}`),
      changeFrequency: "weekly",
      priority: 1,
    });
    entries.push({
      url: absoluteUrl(`/${locale}/projects`),
      changeFrequency: "weekly",
      priority: 0.6,
    });
    entries.push({
      url: absoluteUrl(`/${locale}/clients`),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  const pages = await getAllPageSlugsAndLocales();
  for (const page of pages) {
    if (
      !page.slug ||
      !page.locale ||
      page.channel !== CHANNEL ||
      page.isHomepage ||
      RESERVED_SLUGS.includes(page.slug)
    ) {
      continue;
    }
    entries.push({
      url: absoluteUrl(`/${page.locale}/${page.slug}`),
      lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const locale of LOCALES) {
    const posts = await getAllBlogPostSlugs(locale, CHANNEL);
    for (const post of posts) {
      if (!post.slug) continue;
      entries.push({
        url: absoluteUrl(`/${locale}/blog/${post.slug}`),
        lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}

export const revalidate = 3600;
