// app/[locale]/[slug]/page.tsx - Updated path
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
// Make sure fetchData functions are updated to accept locale
import {
  getPageBySlug,
  getMenuByType,
  getFooterMenu,
  getAllPageSlugsAndLocales, // Import the new function
} from "@/sanity/fetchData";
import { PageType } from "@/types/types"; // Assuming PageType is correctly defined
import HeroHighlightComponent from "@/components/HeroHighLightComponent";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { draftMode } from "next/headers";
import BlogListComponent from "@/components/BlogListComponent";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner"; // Assuming you have this
import RenderContent from "@/components/RenderContent";

// Generate paths for pages including locale
export async function generateStaticParams() {
  const pages = await getAllPageSlugsAndLocales(); // Use the new fetch function

  // Filter out any potential null/undefined values if necessary
  return pages
    .filter((page) => page.slug && page.locale)
    .map((page) => ({
      slug: page.slug,
      locale: page.locale,
    }));
}

export const revalidate = 10;

interface PageProps {
  params: { slug: string; locale: string }; // Add locale here
}

export default async function Page({ params }: PageProps) {
  // Use updated PageProps
  // Extract locale along with slug
  const { slug, locale } = params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  // Fetch data using updated functions with locale
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);

  // Check if page or navbarMenu for the specific locale exists
  if (!page) {
    console.error(`Page not found for slug: ${slug}, locale: ${locale}`);
    return notFound();
  }
  if (!navbarMenu) {
    console.warn(`Navbar menu not found for locale: ${locale}`); // This logs the warning
    // Decide if this should be a notFound() or if a default/fallback menu is acceptable
    // return notFound();
  }
  // Footer menu might be optional or have a default
  if (!footerMenu) {
    console.warn(`Footer menu not found for locale: ${locale}`); // This logs the warning
  }

  const { title, contentPKS } = page;

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      {/* Use the RenderContent component - Uncommented */}
      {contentPKS && <RenderContent contentPKS={contentPKS} locale={locale} />}

      {/* Remove this testing div */}
      {/* <div className="bg-red-500 text-white p-8 my-4 mx-auto max-w-md">
        Tailwind Test Element - Should be red background, white text.
      </div> */}

      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}
