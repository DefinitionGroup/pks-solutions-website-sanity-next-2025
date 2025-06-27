import { notFound } from "next/navigation";
import {
  getPageBySlug,
  getMenuByType,
  getFooterMenu,
  getAllPageSlugsAndLocales,
} from "@/sanity/fetchData";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner";
import RenderContent from "@/components/RenderContent";

// Generate paths for pages including locale
export async function generateStaticParams() {
  const RESERVED_SLUGS = ["projects", "clients"];
  const pages = await getAllPageSlugsAndLocales();

  return pages
    .filter(
      (page) => page.slug && page.locale && !RESERVED_SLUGS.includes(page.slug) // Exclude reserved
    )
    .map((page) => ({
      slug: page.slug,
      locale: page.locale,
    }));
}

export const revalidate = 10;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function Page({ params }: PageProps) {
  // Extract locale along with slug
  const { slug, locale } = await params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  // Fetch data using updated functions with locale
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);
  const reservedSlugs = ["sign-in", "sign-up"];
  if (reservedSlugs.includes(slug)) {
    return notFound();
  }
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

  const { contentPKS } = page;

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
