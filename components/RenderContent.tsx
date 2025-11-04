///// PageBuilder 1SP Content Map[ping Sanity] ///////

import React from "react";
import DebugBadge from "@/components/dev/DebugBadge";
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
            return (
              <DebugBadge key={index} name="HeroHighlightComponent">
                <HeroHighlightComponent {...(block as Hero)} />
              </DebugBadge>
            );
          case "blogList":
            return (
              <DebugBadge key={index} name="BlogListComponent">
                <BlogListComponent block={block as BlogList} locale={locale} />
              </DebugBadge>
            );
          case "contactForm":
            return (
              <DebugBadge key={index} name="SanityContactForm">
                <SanityContactForm value={block} locale={locale} />
              </DebugBadge>
            );
          case "threeColumnVideoBanner":
            return (
              <DebugBadge key={index} name="ThreeColVideoBanner">
                <ThreeColVideoBanner {...(block as ThreeColVideoBannerProps)} />
              </DebugBadge>
            );
          case "showcaseTabs":
            return (
              <DebugBadge key={index} name="ShowcaseTabs">
                <ShowcaseTabs
                  className="relative z-30 flex justify-center items-center gap-4 w-full h-[40rem]"
                  // block.tabs comes straight from your Sanity document
                  tabs={(block as any).tabs}
                />
              </DebugBadge>
            );
          default:
            console.warn(`Unsupported block type: ${block}`);
            return (
              <DebugBadge key={index} name={`Unsupported: ${String((block as any)?._type ?? "unknown")}`}>
                <div className="container mx-auto my-4 p-4 border border-dashed border-red-500">
                  <p className="text-red-500 font-bold">
                    Unsupported block type: {(block as any)?._type}
                  </p>
                  <pre className="text-xs text-gray-400">
                    {JSON.stringify(block, null, 2)}
                  </pre>
                </div>
              </DebugBadge>
            );
        }
      })}
    </>
  );
};

export default RenderContent;
