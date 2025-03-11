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
  const page: PageType = await getPageBySlug(slug);
  const { title, content } = page;

  if (!page) {
    return notFound();
  }
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Lösungen",
      link: "/solutions",
      icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Über uns",
      link: "/about",
      icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Kontakt",
      link: "/contact",
      icon: (
        <IconMessage className="w-4 h-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <>
      <FloatingNav navItems={navItems} />

      {content.map((block, index) => {
        //console.log(block);
        switch (block._type) {
          case "hero":
            return <HeroHighlightComponent key={index} {...block} />;
          default:
            return null;
        }
      })}
      <Footer />
    </>
  );
}
