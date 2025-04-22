import { client } from "@/sanity/lib/client";
import { BlogPost, BlogList } from "@/types/types";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/sanity/fetchData";
import { draftMode } from "next/headers"; // Import draftMode

// Update props type to include locale
interface BlogListComponentProps {
  block: BlogList;
  locale: string; // Add locale prop
}

// In the component function:
export default async function BlogListComponent({ block, locale }: BlogListComponentProps) { // Use updated props type
  const { isEnabled } = await draftMode(); // Check draft mode status
  // Pass locale and draft status to getBlogPosts
  const posts = await getBlogPosts(block, locale, isEnabled);

  return (
    <section className="py-12 container mx-auto px-4"> {/* Removed py-40 for potential overlap */}
      {(block.title || block.subtitle) && (
        <div className="mb-12 text-center">
          {block.title && (
            <h2 className="text-3xl font-bold mb-4">{block.title}</h2>
          )}
          {block.subtitle && (
            <p className="text-xl text-gray-600">{block.subtitle}</p>
          )}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost) => (
          <article
            key={post._id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            {/* Update Link href to include locale */}
            <Link
              href={`/${locale}/blog/${post.slug?.current}`} // Add locale prefix
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
        ))}
      </div>
    </section>
  );
}
