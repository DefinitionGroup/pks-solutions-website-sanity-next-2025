import { LampDemo } from "./components/ui/lamp";
import { PageType } from "@/types/types";
import { getPageBySlug } from "@/sanity/fetchData";
import HeroHighlightComponent from "./components/HeroHighLightComponent";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "./components/ui/floating-navbar";
import Footer from "./components/Footer";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "./components/PreviewBanner";

export default async function Home() {
  const { isEnabled } = await draftMode();
  const page: PageType = await getPageBySlug("home", isEnabled);
  //console.log(page);
  const { title, content } = page;
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
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
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
      {/* <TabsDemo className="relative z-30 flex justify-center items-center gap-4 w-full h-[40rem]" /> */}
      <div className="flex flex-col justify-center items-center w-full">
        <LampDemo />{" "}
      </div>{" "}
      {/* <ParallaxScroll images={images} />;  */}
      <Footer />
    </>
  );
}
