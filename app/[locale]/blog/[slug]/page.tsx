import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getMenuByType,
  getFooterMenu,
} from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import { VisualEditing } from "next-sanity/visual-editing";
import PreviewBanner from "@/components/PreviewBanner";
import Link from "next/link";
import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  absoluteUrl,
  truncateDescription,
} from "@/lib/seo";
// If your route provides channel in params, include it here:
interface PageProps {
  params: Promise<{ slug: string; locale: string; channel: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale, channel = "pksWeb" } = await params;
  if (locale !== DEFAULT_LOCALE) {
    return { robots: { index: false, follow: false } };
  }

  const post = await getBlogPostBySlug(slug, locale, false, channel);
  if (!post) return { robots: { index: false, follow: false } };

  const title = post.title;
  const description = truncateDescription(post.excerpt);
  const url = absoluteUrl(`/${DEFAULT_LOCALE}/blog/${slug}`);

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale, channel = "pksWeb" } = await params;
  if (locale !== DEFAULT_LOCALE) return notFound();
  const { isEnabled } = await draftMode();

  // Fetch post and menus with channel and locale
  const post = await getBlogPostBySlug(slug, locale, isEnabled, channel);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);

  if (!post) return notFound();

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}
      <div className="container mx-auto px-4 py-40">
        <article className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={post.content} />
          </div>
          <div className="mt-8 mb-16 text-center">
            <Link
              href={`/${locale}/blog`}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 inline-flex items-center gap-2 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {locale === "de" ? "Zurück zum Blog" : "Back to Blog"}
            </Link>
          </div>
        </article>
      </div>
      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}

// Static params: always include channel (or set a default)
export async function generateStaticParams() {
  const localeToFetch = "de";
  const channelToFetch = "pksWeb";
  const posts = await getAllBlogPostSlugs(localeToFetch, channelToFetch);
  return posts.map((post) => ({
    slug: post.slug,
    locale: localeToFetch,
    channel: channelToFetch,
  }));
}
