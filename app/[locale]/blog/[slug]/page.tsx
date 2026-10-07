import { notFound } from "next/navigation";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getAllBlogPostSlugs,
  getMenuByType,
  getFooterMenu,
} from "@/sanity/fetchData";
import { getContentPreview as draftMode } from '@/lib/content-preview';
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import { VisualEditing } from "next-sanity/visual-editing";
import PreviewBanner from "@/components/PreviewBanner";
import EditorialText from "@/components/Content/EditorialText";
import Button2 from "@/components/Button2";
import ArticleCard from "@/components/blog/ArticleCard";
import ArticleToc from "@/components/blog/ArticleToc";
import ReadingProgress from "@/components/blog/ReadingProgress";
import styles from "@/components/blog/blog.module.css";
import { articleHeadings, formatDateDe, readingMinutes } from "@/lib/blog";
import { getOptimizedCloudinaryImageUrl, resolveCloudinaryAssetUrl } from "@/utils/cloudinary";
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
  const [post, related, navbarMenu, footerMenu] = await Promise.all([
    getBlogPostBySlug(slug, locale, isEnabled, channel),
    getRelatedBlogPosts(slug, locale, isEnabled, channel),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);

  if (!post) return notFound();

  const headings = articleHeadings(post.content as unknown as PortableTextBlock[]);
  const minutes = readingMinutes(post.wordCount);
  const date = formatDateDe(post.publishedAt);
  const cover = resolveCloudinaryAssetUrl(post.coverImage);
  const coverUrl = cover ? getOptimizedCloudinaryImageUrl(cover, { width: 2200 }) : "";
  const blogHref = `/${locale}/blog`;

  // Structured data uses clean strings: preview content carries invisible editing markers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: stegaClean(post.title),
    description: post.excerpt ? stegaClean(post.excerpt) : undefined,
    inLanguage: "de-DE",
    mainEntityOfPage: absoluteUrl(`/${DEFAULT_LOCALE}/blog/${slug}`),
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || undefined,
    image: coverUrl || undefined,
    author: post.author?.name ? { "@type": "Person", name: stegaClean(post.author.name) } : { "@type": "Organization", name: "PKS Solutions" },
    publisher: { "@type": "Organization", name: "PKS Solutions" },
  };

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}
      <article className={`${styles.blog} w-full`}>
        <ReadingProgress />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

        <header className={`${styles.shell} ${styles.header}`}>
          <nav aria-label="Brotkrumen">
            <ol className={styles.crumbs}>
              <li><Link href={blogHref}>Wissen</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="line-clamp-1">{post.title}</li>
            </ol>
          </nav>
          <h1 className={styles.headline}>{post.title}</h1>
          {post.excerpt && <p className={styles.standfirst}>{post.excerpt}</p>}
          {(minutes || date || post.author?.name) && (
            <div className={styles.meta}>
              {minutes && <span><Clock size={16} aria-hidden="true" />{minutes} Min. Lesezeit</span>}
              {date && <span><time dateTime={post.publishedAt}>{date}</time></span>}
              {post.author?.name && <span>{post.author.name}</span>}
            </div>
          )}
        </header>

        {coverUrl && (
          <figure className={styles.shell}>
            <div className={styles.cover}>
              <Image src={coverUrl} alt={post.coverAlt || ""} width={2200} height={943} sizes="(min-width: 1536px) 1536px, 100vw" priority />
            </div>
          </figure>
        )}

        <div className={`${styles.shell} ${styles.body}`}>
          <aside className={styles.rail}>
            <ArticleToc headings={headings} />
          </aside>
          <div className={styles.reading}>
            <EditorialText content={post.content as unknown as PortableTextBlock[]} />
          </div>
        </div>

        <section aria-labelledby="naechster-schritt" className={`${styles.shell} ${styles.closing}`}>
          <div>
            <h2 id="naechster-schritt" className={styles.closingTitle}>Fragen zu Ihren Prozessdaten?</h2>
            <p className={styles.closingText}>Beschreiben Sie uns Ihre Ausgangslage. Gemeinsam klären wir, welche Erfassung und Auswertung zu Ihrem Betrieb passt.</p>
          </div>
          <div className={styles.closingAction}>
            <Button2 text="Kontakt aufnehmen" href={`/${locale}/kontakt-zu-uns`} />
          </div>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="weiterlesen" className={`${styles.shell} ${styles.continue}`}>
            <h2 id="weiterlesen" className={styles.sectionTitle}>Weiterlesen</h2>
            <div className={styles.cards}>
              {related.map((item) => <ArticleCard key={item._id} post={item} locale={locale} />)}
            </div>
            <p className="mt-12">
              <Link href={blogHref} className={styles.cardMore}>
                Alle Beiträge <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </section>
        )}
      </article>
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
