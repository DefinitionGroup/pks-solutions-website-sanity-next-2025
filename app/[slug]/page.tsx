// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { getPageBySlug } from "@/sanity/fetchData";
import { PageType } from "@/types/types";
import HeroHighlightComponent from "../components/HeroHighLightComponent";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Footer from "../components/Footer";
import { FloatingNav } from "../components/ui/floating-navbar";
import { draftMode } from "next/headers";
import { getMenuByType } from "@/sanity/fetchData";
import { getFooterMenu } from "@/sanity/fetchData";
// Generate paths for pages (excluding "home")
export async function generateStaticParams() {
  const query = groq`*[_type == "page" && slug.current != "home"]{"slug": slug.current}`;
  const pages: { slug: string }[] = await client.fetch(query);
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export const revalidate = 10;

interface PageProps {
  params: { slug: string };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  const { isEnabled } = await draftMode();

 
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, isEnabled),
    getMenuByType('Navbar', isEnabled),
    getFooterMenu()

  ]);
  const { title, content } = page;
  if (!page || !navbarMenu) return notFound();

  

  return (
    <>
      <FloatingNav menu={navbarMenu} />

      {content.map((block, index) => {
        //console.log(block);
        switch (block._type) {
          case "hero":
            return <HeroHighlightComponent key={index} {...block} />;
          default:
            return null;
        }
      })}
      <Footer menu={footerMenu} />
    </>
  );
}
