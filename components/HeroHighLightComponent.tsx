"use client";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";
import Button2 from "./Button2";
import SciFiBlock from "./ui/anim/SciFiBlock";
import TripleHero from "./Content/TripleHero";
import GridHero from "./Content/GridHero";
import GridHero2 from "./Content/GridHero2";
import ZwischenTitelCta from "./Content/ZwischenTitelCta";
import GridHero3 from "./Content/GridHero3";
import { Hero as HeroType, ThreeColVideoBannerProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";

import { FC } from "react";
import ThreeColVideoBanner from "./ThreeColVideoBanner";
import FourColVideoBanner from "./FourColVideoBanner";

const HeroHighlightComponent: FC<HeroType & { locale?: string }> = (props) => {
  const {
    showTopHero,
    videoCloudinary,
    headline,
    highlightText,
    leftDescription,
    rightDescription,
    ctaButton,
    modules,
    locale,
  } = props;
  return (
    <HeroHighlight className="container ">
      {showTopHero && (
        <div className="justify-center border border-gray-200 dark:border-white/20 bg-black md:grid grid-cols-1 grid-rows-1 col-span-12 w-full">
          <video
            loop
            autoPlay
            muted
            playsInline
            className="col-start-1 row-start-1 w-full h-full min-h-[50vh] sm:min-h-[60vh] md:min-h-full object-cover row-span-2 opacity-75 z-[1]"
            src={videoCloudinary?.secure_url}
          />
          <div className="grid grid-cols-1 md:grid-cols-12 col-start-1 row-start-1 py-8 sm:py-16 md:py-24 lg:py-32 w-full z-[2] overflow-hidden">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-9 md:col-start-1 px-4 sm:px-6 md:px-8 pt-4 sm:pt-8 md:pt-16 lg:pt-32 w-full max-w-3xl font-bold text-4xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl text-neutral-100 dark:text-white leading-tight sm:leading-snug md:leading-relaxed">
              {headline}
              <br />
              <Highlight className="text-white dark:text-white">
                {highlightText}
              </Highlight>
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="col-span-1 text-lg md:col-span-4 md:col-start-1 px-4 sm:px-6 md:px-8 mt-3 sm:mt-4 md:mt-8 sm:text-base md:text-lg text-white/90">
              {leftDescription}
            </motion.p>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col justify-center col-span-1 md:col-span-3 md:col-start-10 w-full mt-6 sm:mt-8 md:mt-0 px-4 md:px-0">
              <p className="py-3 sm:py-4 md:p-6 lg:p-8 w-full text sm:text-lg leading-relaxed text-white/80">
                {rightDescription}
              </p>
              <Button2
                className="border-white/50 text-white w-full [&_*]:!text-white"
                text={ctaButton?.name || ""}
                href={resolveSanityLink(ctaButton?.link, locale)}
              />
            </motion.div>
          </div>
          <div className="hidden md:grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-100 dark:divide-white w-full min-h-[20rem]">
            <div className="col-span-9"></div>
            <div className="col-span-2"></div>
          </div>
        </div>
      )}
    {modules?.map((block: any, index: number) => {
        switch (block._type) {
          case "sciFiBlock":
            return (
              <SciFiBlock key={`sciFiBlock-${index}`} className={"scifi-border mb-12 mx-4"}>
                <TripleHero {...block.tripleHero} locale={locale} />
              </SciFiBlock>
            );
          case "gridHero":
            return (
              <GridHero key={`gridHero-${index}`} {...block} locale={locale} />
            );
          case "gridHero2": 
            return (
              <GridHero2 key={`gridHero2-${index}`} {...block} locale={locale} />
            );
          case "zwischenTitelCta":
            return (
              <ZwischenTitelCta key={`zwischenTitelCta-${index}`} {...block} locale={locale} />
            );
          case "gridHero3":
            return (
              <GridHero3 key={`gridHero3-${index}`} {...block} locale={locale} />
            );
          case "threeColumnVideoBanner":
            return (
              <ThreeColVideoBanner key={index} {...(block as ThreeColVideoBannerProps)} locale={locale} />
            );
          case "fourColumnVideoBanner":
            return (
              <FourColVideoBanner key={index} {...(block as any)} locale={locale} />
            );

          default:
            return null;
        }
      })}
    </HeroHighlight>
  );
};

export default HeroHighlightComponent;
