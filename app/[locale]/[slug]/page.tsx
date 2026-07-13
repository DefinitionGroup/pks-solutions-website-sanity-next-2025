// app/[slug]/page.tsx

import { notFound, redirect } from "next/navigation";
import { draftMode } from "next/headers";
import { auth } from "@clerk/nextjs/server";

import {
  getPageBySlug,
  getMenuByType,
  getFooterMenu,
  getAllPageSlugsAndLocales,
  getUserGroupByClerkId,
} from "@/sanity/fetchData";

import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import RenderContent from "@/components/RenderContent";
import PreviewBanner from "@/components/PreviewBanner";
import { VisualEditing } from "next-sanity/visual-editing";
import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  absoluteUrl,
  isPublicPageSlug,
  truncateDescription,
} from "@/lib/seo";

// -- Static params for build
export async function generateStaticParams() {
  const pages = await getAllPageSlugsAndLocales();

  return pages
    .filter(
      (page) =>
        page.slug &&
        page.locale === DEFAULT_LOCALE &&
        page.channel === "pksWeb" &&
        !page.isHomepage &&
        !page.protected &&
        !page.excludeFromSearch &&
        isPublicPageSlug(page.slug)
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (locale !== DEFAULT_LOCALE || !isPublicPageSlug(slug)) {
    return { robots: { index: false, follow: false } };
  }

  const page = await getPageBySlug(slug, locale, "pksWeb");
  if (!page || page.protected || page.excludeFromSearch) {
    return { robots: { index: false, follow: false } };
  }

  const title = page.title;
  const description = truncateDescription(page.subtitle);
  const url = absoluteUrl(`/${DEFAULT_LOCALE}/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  if (locale !== DEFAULT_LOCALE || !isPublicPageSlug(slug)) {
    notFound();
  }
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";

  // Fetch everything in parallel
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);

  // Reserved slugs (sign-in, etc)
  const reservedSlugs = ["sign-in", "sign-up"];
  if (reservedSlugs.includes(slug)) return notFound();

  // Page or menu missing? 404
  if (!page) {
    console.error(`Page not found for slug: ${slug}, locale: ${locale}`);
    return notFound();
  }
  if (!navbarMenu) {
    console.warn(`Navbar menu not found for locale: ${locale}`);
  }
  if (!footerMenu) {
    console.warn(`Footer menu not found for locale: ${locale}`);
  }

  // === GROUP PROTECTION LOGIC ===
  if (page.protected) {
    const { userId } = await auth();
    if (!userId) {
      // Not logged in
      redirect("/sign-in");
    }
    // Fetch user's group from Sanity
    const userGroup = await getUserGroupByClerkId(userId);
    const allowedGroupIds =
      page.allowedGroups?.map((g: { _id: string }) => g._id) ?? [];
    if (!userGroup || !allowedGroupIds.includes(userGroup._id)) {
      // Not allowed
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-2">Unauthorized</h1>
          <p className="text-lg">You are not allowed to view this page.</p>
        </div>
      );
    }
  }
  // === END GROUP PROTECTION LOGIC ===

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

      {contentPKS && <RenderContent contentPKS={contentPKS} locale={locale} />}

      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}
