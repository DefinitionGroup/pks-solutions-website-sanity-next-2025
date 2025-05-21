import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getMenuByType,
  getFooterMenu,
} from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner";
import { MenuType } from "@/types/types"; // Assuming MenuType is defined here or imported

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage(props: PageProps) {
  // Extract locale along with slug
  const { slug, locale } = await props.params; // Destructure locale
  const { isEnabled } = await draftMode();

  // Pass locale to fetch functions
  const post = await getBlogPostBySlug(slug, locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, "pksWeb"),
  ]);

  // Check if post exists for the given slug (locale might be relevant here too)
  if (!post) return notFound();
  // Navbar and Footer menus might be optional depending on requirements
  if (!navbarMenu) {
    console.warn(`Navbar menu not found for locale: ${locale}`);
  }
  if (!footerMenu) {
    console.warn(`Footer menu not found for locale: ${locale}`);
  }

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {/* Pass locale to FloatingNav */}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      <div className="py-12 container mx-auto px-4 py-40">
        <article className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={post.content} />
          </div>
        </article>
      </div>
      {/* Pass locale to Footer */}
      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}

// generateStaticParams needs to generate paths for all locales.
// This might require fetching slugs for each supported locale.
// Passing a single locale here might be incorrect depending on the i18n strategy.
// TODO: Review i18n strategy for static param generation.
export async function generateStaticParams() {
  // Assuming 'de' as a default or primary locale for now to fix the TS error.
  // Ideally, fetch slugs for all supported locales.
  const localeToFetch = "de"; // Placeholder: Adjust based on actual i18n setup
  const posts = await getAllBlogPostSlugs(localeToFetch); // Pass locale
  return posts.map((post) => ({ slug: post.slug, locale: localeToFetch })); // Include locale in returned params
}
