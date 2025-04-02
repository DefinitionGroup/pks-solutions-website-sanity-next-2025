import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getMenuByType,
  getFooterMenu,
} from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/app/components/ui/floating-navbar";
import Footer from "@/app/components/Footer";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/app/components/PreviewBanner";
interface PageProps {
  params: { slug: string };
}
export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  const { isEnabled } = await draftMode();

  const post = await getBlogPostBySlug(slug, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", isEnabled),
    getFooterMenu(),
  ]);
  if (!post || !navbarMenu) return notFound();

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      <FloatingNav menu={navbarMenu} />

      <div className="py-12 container mx-auto px-4 py-40">
        <article className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={post.content} />
          </div>
        </article>
      </div>
      <Footer menu={footerMenu} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getAllBlogPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}
