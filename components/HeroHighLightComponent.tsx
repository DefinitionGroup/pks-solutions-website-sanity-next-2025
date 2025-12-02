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
        <div className="justify-center border-gray-200 dark:border-white/20 bg-black grid grid-cols-1 grid-rows-1 col-span-12 border-t border-r border-b border-l w-full ">
          {" "}
          <video
            loop
            autoPlay
            muted
            playsInline
            className="col-start-1 row-start-1 w-full h-full min-h-full object-cover row-span-2 opacity-75 z-[1]"
          src={videoCloudinary?.secure_url}
          />
          <div className="grid md:grid md:grid-cols-12 col-start-1 row-start-1 py-16 sm:py-24 md:py-32 w-full z-[2] overflow-hidden">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              // Remove type: "spring" if you want to keep the [20, -5, 0] animation
              transition={{ duration: 0.5 }} // Example: Use duration or other tween options
              className="md:col-span-9 md:col-start-1 px-4 sm:px-6 md:px-8 pt-8 sm:pt-16 md:pt-32 w-full max-w-3xl font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-100 dark:text-white leading-tight sm:leading-relaxed lg:leading-snug">
              {headline}
              <br />
              <Highlight className="text-white  dark:text-white">
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
              // Remove type: "spring"
              transition={{ delay: 0.3, duration: 0.5 }} // Example: Use duration or other tween options
              className=" md:col-span-4 md:col-start-1 px-4  sm:px-6 md:px-8 mt-4 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
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
              // Remove type: "spring"
              transition={{ delay: 0.6, duration: 0.5 }} // Example: Use duration or other tween options
              className="flex flex-col justify-center md:col-span-3 md:col-start-10 w-full mt-8 md:mt-0">
              <p className="p-4 sm:p-6 md:p-8 w-full text-xs sm:text-sm md:text-sm leading-normal text-white/80">
                {rightDescription}
              </p>
              <Button2
                  className="border-white/50 text-white px-8 sm:px-6 md:px-6 w-full [&_*]:!text-white"
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
