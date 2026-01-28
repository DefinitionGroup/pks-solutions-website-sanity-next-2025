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
              <DebugBadge key={index} name="HeroHighlightComponent">
                <HeroHighlightComponent {...(block as Hero)} locale={locale} />
              </DebugBadge>
            );
          case "sciFiBlock":
            return (
              <DebugBadge key={index} name="SciFiBlock">
                <SciFiBlock className="scifi-border mb-12 mx-4">
                  <TripleHero {...(block as SciFiBlockType).tripleHero} locale={locale} />
                </SciFiBlock>
              </DebugBadge>
            );
          case "gridHero":
            return (
              <DebugBadge key={index} name="GridHero">
                <GridHero {...(block as GridHeroType)} locale={locale} />
              </DebugBadge>
            );
          case "gridHero2":
            return (
              <DebugBadge key={index} name="GridHero2">
                <GridHero2 {...(block as GridHero2Type)} locale={locale} />
              </DebugBadge>
            );
          case "gridHero3":
            return (
              <DebugBadge key={index} name="GridHero3">
                <GridHero3 {...(block as GridHero3Type)} locale={locale} />
              </DebugBadge>
            );
          case "zwischenTitelCta":
            return (
              <DebugBadge key={index} name="ZwischenTitelCta">
                <ZwischenTitelCta {...(block as ZwischenTitelCtaType)} locale={locale} />
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
                <ThreeColVideoBanner {...(block as ThreeColVideoBannerProps)} locale={locale} />
              </DebugBadge>
            );
          case "fourColumnVideoBanner":
            return (
              <DebugBadge key={index} name="FourColVideoBanner">
                <FourColVideoBanner {...(block as FourColVideoBannerProps)} locale={locale} />
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
