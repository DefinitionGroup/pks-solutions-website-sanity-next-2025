import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BlogPost } from "@/types/types";
import { formatDateDe, readingMinutes } from "@/lib/blog";
import { getOptimizedCloudinaryImageUrl, resolveCloudinaryAssetUrl } from "@/utils/cloudinary";
import styles from "./blog.module.css";

interface ArticleCardProps {
  post: BlogPost;
  locale: string;
  variant?: "feature" | "compact";
  headingLevel?: "h2" | "h3";
}

export default function ArticleCard({ post, locale, variant = "compact", headingLevel = "h3" }: ArticleCardProps) {
  const href = `/${locale}/blog/${post.slug?.current}`;
  const cover = resolveCloudinaryAssetUrl(post.coverImage);
  const image = cover ? getOptimizedCloudinaryImageUrl(cover, { width: variant === "feature" ? 1600 : 1000 }) : "";
  const minutes = readingMinutes(post.wordCount);
  const date = formatDateDe(post.publishedAt);
  const Heading = headingLevel;

  const meta = (minutes || date) && (
    <p className={styles.cardMeta}>
      {minutes && <span>{minutes} Min. Lesezeit</span>}
      {date && <time dateTime={post.publishedAt}>{date}</time>}
    </p>
  );

  const media = image && (
    <div className={styles.cardMedia}>
      <Image src={image} alt={post.coverAlt || ""} width={1600} height={1000} sizes={variant === "feature" ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"} />
    </div>
  );

  if (variant === "feature") {
    return (
      <Link href={href} className={styles.feature}>
        {media}
        <div className={styles.featureBody}>
          {meta}
          <Heading className={styles.cardTitle}><span>{post.title}</span></Heading>
          {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
          <span className={styles.cardMore}>Beitrag lesen <ArrowRight size={16} aria-hidden="true" /></span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={styles.card}>
      {media}
      {meta}
      <Heading className={styles.cardTitle}><span>{post.title}</span></Heading>
      {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
    </Link>
  );
}
