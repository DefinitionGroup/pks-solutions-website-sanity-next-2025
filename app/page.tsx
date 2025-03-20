import { LampDemo } from "./components/ui/lamp";
import { PageType } from "@/types/types";
import { getFooterMenu, getPageBySlug } from "@/sanity/fetchData";
import HeroHighlightComponent from "./components/HeroHighLightComponent";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "./components/ui/floating-navbar";
import Footer from "./components/Footer";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "./components/PreviewBanner";
import { getMenuByType } from "@/sanity/fetchData";
import { notFound } from "next/navigation";
import GetDemoComponent from "./components/GetDemoComponent";
//import Footer from "@/components/Footer";
export default async function Home() {
  const { isEnabled } = await draftMode();
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug("home", isEnabled),
    getMenuByType('Navbar', isEnabled),
    getFooterMenu()
  ]);
  const { title, content } = page;


  if (!page || !navbarMenu) return notFound();
  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
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
      {/* <TabsDemo className="relative z-30 flex justify-center items-center gap-4 w-full h-[40rem]" /> */}
      <div className="flex flex-col justify-center items-center w-full">
        <LampDemo />{" "}
      </div>{" "}
      {/* <ParallaxScroll images={images} />;  */}
      {/* <Footer /> */}
      <GetDemoComponent/>
      <Footer menu={footerMenu}/>

    </>
  );
}
