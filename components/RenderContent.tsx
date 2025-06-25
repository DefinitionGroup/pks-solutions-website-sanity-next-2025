import React from "react";
import HeroHighlightComponent from "@/components/HeroHighLightComponent";
import BlogListComponent from "@/components/BlogListComponent";
import SanityContactForm from "@/components/SanityContactForm";
import {
  BlogList,
  ClientsList,
  Hero,
  ProjectList,
  ContactForm,
  ThreeColVideoBannerProps,
  ShowcaseTabsProps,
} from "@/types/types";
import ThreeColVideoBanner from "./ThreeColVideoBanner";
import { ShowcaseTabs } from "./ShowCaseTabs";
interface RenderContentProps {
  contentPKS: (
    | Hero
    | BlogList
    | ProjectList
    | ClientsList
    | ContactForm
    | ThreeColVideoBannerProps
    | ShowcaseTabsProps
  )[];
  locale: string;
}

const RenderContent: React.FC<RenderContentProps> = ({
  contentPKS,
  locale,
}) => {
  if (!contentPKS) {
    return null;
  }

  return (
    <>
      {contentPKS.map((block, index) => {
        switch (block._type) {
          case "hero":
            return <HeroHighlightComponent key={index} {...block} />;
          case "blogList":
            return (
              <BlogListComponent
                key={index}
                block={block as BlogList}
                locale={locale}
              />
            );
          case "contactForm":
            return (
              <SanityContactForm key={index} value={block} locale={locale} />
            );
          case "threeColumnVideoBanner":
            return (
              <ThreeColVideoBanner
                key={index}
                {...(block as ThreeColVideoBannerProps)}
              />
            );
          case "showcaseTabs":
            return (
              <ShowcaseTabs
                key={index}
                className="relative z-30 flex justify-center items-center gap-4 w-full h-[40rem]"
                // block.tabs comes straight from your Sanity document
                tabs={(block as any).tabs}
              />
            );
          default:
            console.warn(`Unsupported block type: ${block}`);
            return (
              <div
                key={index}
                className="container mx-auto my-4 p-4 border border-dashed border-red-500"
              >
                <p className="text-red-500 font-bold">
                  Unsupported block type: {block._type}
                </p>
                <pre className="text-xs text-gray-400">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            );
        }
      })}
    </>
  );
};

export default RenderContent;
