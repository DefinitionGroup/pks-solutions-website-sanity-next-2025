import { BlogPost, BlogList } from "@/types/types";
import { getBlogPosts } from "@/sanity/fetchData";
import { getContentPreview as draftMode } from "@/lib/content-preview";
import ArticleCard from "@/components/blog/ArticleCard";
import styles from "@/components/blog/blog.module.css";

interface BlogListComponentProps {
  block: Omit<BlogList, "selectedPosts"> & { selectedPosts?: { _ref?: string }[] };
  locale: string;
  channel?: string;
}

export default async function BlogListComponent({
  block,
  locale,
  channel = "pksWeb", // Default channel if not provided
}: BlogListComponentProps) {
  const { isEnabled } = await draftMode();

  // A hand-picked selection keeps its order; otherwise the newest posts of the channel appear
  const selectedIds = (block.selectedPosts ?? [])
    .map((reference) => reference?._ref?.replace(/^drafts\./, ""))
    .filter((id): id is string => Boolean(id));
  const posts = await getBlogPosts(block.postsPerPage ?? 6, locale, isEnabled, channel, selectedIds);
  const [featured, ...rest] = posts;

  return (
    <section className={`${styles.blog} ${styles.shell} w-full py-12 md:py-20`}>
      {(block.title || block.subtitle) && (
        <header className={styles.indexHeader}>
          {block.title && <h2 className={styles.indexTitle}>{block.title}</h2>}
          {block.subtitle && <p className={styles.indexLead}>{block.subtitle}</p>}
        </header>
      )}
      {!featured ? (
        <p className={styles.empty}>Derzeit sind keine Beiträge veröffentlicht.</p>
      ) : (
        <>
          <ArticleCard post={featured} locale={locale} variant="feature" />
          {rest.length > 0 && (
            <div className={styles.cards}>
              {rest.map((post: BlogPost) => <ArticleCard key={post._id} post={post} locale={locale} />)}
            </div>
          )}
        </>
      )}
    </section>
  );
}
