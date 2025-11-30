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
import DebugBadge from "@/components/dev/DebugBadge";

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
        <div className="justify-center border-white/20 grid grid-cols-1 grid-rows-1 col-span-12 border-t border-r border-b border-l w-full bg-black">
          {" "}
          <video
            loop
            autoPlay
            muted
            playsInline
            className="col-start-1 row-start-1 w-full h-full min-h-full object-cover row-span-2 opacity-50 z-[1]"
            src={videoCloudinary?.secure_url}
          />
          <div className="flex flex-col md:grid md:grid-cols-12 col-start-1 row-start-1 py-16 sm:py-24 md:py-32 w-full z-[2] overflow-hidden">
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
              className="md:col-span-6 md:col-start-1 px-4 sm:px-6 md:px-8 mt-4 md:mt-0 text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
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
              <DebugBadge name="Button2">
                <Button2
                  className="border-white/50 px-8 sm:px-12 md:px-24 w-full"
                  text={ctaButton?.name || ""}
                  href={resolveSanityLink(ctaButton?.link, locale)}
                />
              </DebugBadge>
            </motion.div>
          </div>
          <div className="hidden md:grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/20 w-full min-h-[20rem]">
            <div className="col-span-9"></div>
            <div className="col-span-2"></div>
          </div>
        </div>
      )}
      {modules?.map((block: any, index: number) => {
        switch (block._type) {
          case "sciFiBlock":
            return (
              <DebugBadge key={`sciFiBlock-${index}`} name="SciFiBlock">
                <SciFiBlock className={"scifi-border mb-12 mx-4"}>
                  <DebugBadge name="TripleHero">
                    <TripleHero {...block.tripleHero} locale={locale} />
                  </DebugBadge>
                </SciFiBlock>
              </DebugBadge>
            );
          case "gridHero":
            return (
              <DebugBadge key={`gridHero-${index}`} name="GridHero">
                <GridHero {...block} locale={locale} />
              </DebugBadge>
            );
          case "gridHero2": 
            return (
              <DebugBadge key={`gridHero2-${index}`} name="GridHero2">
                <GridHero2 {...block} locale={locale} />
              </DebugBadge>
            );
          case "zwischenTitelCta":
            return (
              <DebugBadge key={`zwischenTitelCta-${index}`} name="ZwischenTitelCta">
                <ZwischenTitelCta {...block} locale={locale} />
              </DebugBadge>
            );
          case "gridHero3":
            return (
              <DebugBadge key={`gridHero3-${index}`} name="GridHero3">
                <GridHero3 {...block} locale={locale} />
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
                <FourColVideoBanner {...(block as any)} locale={locale} />
              </DebugBadge>
            );

          default:
            return null;
        }
      })}
    </HeroHighlight>
  );
};

export default HeroHighlightComponent;
