import { BlogPost, BlogList } from "@/types/types";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/sanity/fetchData";
import { draftMode } from "next/headers"; // Import draftMode
import DebugBadge from "@/components/dev/DebugBadge";

interface BlogListComponentProps {
  block: BlogList;
  locale: string;
  channel?: string;
}

export default async function BlogListComponent({
  block,
  locale,
  channel = "pksWeb", // Default channel if not provided
}: BlogListComponentProps) {
  const { isEnabled } = await draftMode();

  // Get the posts, passing the desired number per page, locale, draft mode, and channel
  const posts = await getBlogPosts(
    block.postsPerPage ?? 6,
    locale,
    isEnabled,
    channel
  );

  return (
    <section className="py-12 container mx-auto px-4 mt-20">
      {(block.title || block.subtitle) && (
        <div className="mb-12 text-center">
          {block.title && (
            <DebugBadge name="BlogListTitle">
              <h2 className="text-3xl font-bold mb-4">{block.title}</h2>
            </DebugBadge>
          )}
          {block.subtitle && (
            <DebugBadge name="BlogListSubtitle">
              <p className="text-xl text-gray-600">{block.subtitle}</p>
            </DebugBadge>
          )}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost) => (
          <DebugBadge key={post._id} name="BlogCard">
            <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Link
                href={`/${locale}/blog/${post.slug?.current}`}
                className="block"
              >
                <time className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(post.publishedAt)}
                </time>
                <h2 className="text-xl font-bold mt-2 mb-3">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
                {post.author?.name && (
                  <div className="mt-4 text-sm text-gray-500">
                    By {post.author.name}
                  </div>
                )}
              </Link>
            </article>
          </DebugBadge>
        ))}
      </div>
    </section>
  );
}
