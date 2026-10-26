import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { isCustomerPreview } from '@/lib/customer-preview';

export default function robots(): MetadataRoute.Robots {
  if (isCustomerPreview()) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
