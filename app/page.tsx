import { LampDemo } from "./components/ui/lamp";
import { PageType } from "@/types/types";
import { getPageBySlug } from "@/sanity/fetchData";
import HeroHighlightComponent from "./components/HeroHighLightComponent";
export default async function Home() {
  const page: PageType = await getPageBySlug("home");
  //console.log(page);
  const { title, content } = page;

  return (
    <>
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
    </>
  );
}
