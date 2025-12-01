///// PageBuilder 1SP Content Map[ping Sanity] ///////

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
  FourColVideoBannerProps,
  ShowcaseTabsProps,
  SciFiBlock as SciFiBlockType,
  GridHero as GridHeroType,
  GridHero2 as GridHero2Type,
  GridHero3 as GridHero3Type,
  ZwischenTitelCta as ZwischenTitelCtaType,
} from "@/types/types";
import ThreeColVideoBanner from "./ThreeColVideoBanner";
import { ShowcaseTabs } from "./ShowCaseTabs";
import SciFiBlock from "@/components/ui/anim/SciFiBlock";
import TripleHero from "@/components/Content/TripleHero";
import GridHero from "@/components/Content/GridHero";
import GridHero2 from "@/components/Content/GridHero2";
import GridHero3 from "@/components/Content/GridHero3";
import ZwischenTitelCta from "@/components/Content/ZwischenTitelCta";
import FourColVideoBanner from "@/components/FourColVideoBanner";
interface RenderContentProps {
  contentPKS: (
    | Hero
    | BlogList
    | ProjectList
    | ClientsList
    | ContactForm
    | ThreeColVideoBannerProps
    | FourColVideoBannerProps
    | ShowcaseTabsProps
    | SciFiBlockType
    | GridHeroType
    | GridHero2Type
    | GridHero3Type
    | ZwischenTitelCtaType
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
              <HeroHighlightComponent key={index} {...(block as Hero)} locale={locale} />
            );
          case "sciFiBlock":
            return (
              <SciFiBlock key={index} className="scifi-border mb-12 mx-4">
                <TripleHero {...(block as SciFiBlockType).tripleHero} locale={locale} />
              </SciFiBlock>
            );
          case "gridHero":
            return (
              <GridHero key={index} {...(block as GridHeroType)} locale={locale} />
            );
          case "gridHero2":
            return (
              <GridHero2 key={index} {...(block as GridHero2Type)} locale={locale} />
            );
          case "gridHero3":
            return (
              <GridHero3 key={index} {...(block as GridHero3Type)} locale={locale} />
            );
          case "zwischenTitelCta":
            return (
              <ZwischenTitelCta key={index} {...(block as ZwischenTitelCtaType)} locale={locale} />
            );
          case "blogList":
            return (
              <BlogListComponent key={index} block={block as BlogList} locale={locale} />
            );
          case "contactForm":
            return (
              <SanityContactForm key={index} value={block} locale={locale} />
            );
          case "threeColumnVideoBanner":
            return (
              <ThreeColVideoBanner key={index} {...(block as ThreeColVideoBannerProps)} locale={locale} />
            );
          case "fourColumnVideoBanner":
            return (
              <FourColVideoBanner key={index} {...(block as FourColVideoBannerProps)} locale={locale} />
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
              <div key={index} className="container mx-auto my-4 p-4 border border-dashed border-red-500">
                <p className="text-red-500 font-bold">
                  Unsupported block type: {(block as any)?._type}
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
