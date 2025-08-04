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

import { FC } from "react";
import ThreeColVideoBanner from "./ThreeColVideoBanner";
import FourColVideoBanner from "./FourColVideoBanner";

const HeroHighlightComponent: FC<HeroType> = (props) => {
  const {
    showTopHero,
    videoCloudinary,
    headline,
    highlightText,
    leftDescription,
    rightDescription,
    ctaButton,
    modules,
  } = props;
  const getButtonHref = (button: any) => {
    if (!button?.link) return "/";

    if (button.link.linkType === "external") {
      return button.link.externalUrl || "/";
    }

    // For internal links, use the slug
    if (
      button.link.linkType === "internal" &&
      button.link.internalReference?.slug?.current
    ) {
      return `/${button.link.internalReference.slug.current}`;
    }

    return "/";
  };
  console.log(ctaButton);
  return (
    <HeroHighlight className="container">
      {showTopHero && (
        <div className="justify-center border-white/20 grid grid-cols-1 grid-rows-1 col-span-12 border-t border-r border-b border-l w-full bg-black">
          {" "}
          <video
            loop
            autoPlay
            muted
            className="col-start-1 row-start-1 opacity-50"
            width="2000"
            height="2000"
            src={videoCloudinary?.secure_url}
          />
          <div className="grid grid-cols-12 col-start-1 row-start-1 py-32 w-full">
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
              className="col-span-9 col-start-1 px-8 py-32 pb-8 w-full max-w-3xl font-bold text-4xl text-neutral-100 md:text-4xl lg:text-5xl dark:text-white leading-relaxed lg:leading-snug"
            >
              {headline}
              <br />
              <Highlight className="text-white dark:text-white">
                {highlightText}
              </Highlight>
            </motion.h1>
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
              transition={{ delay: 0.3, duration: 0.5 }} // Example: Use duration or other tween options
              className="col-span-6 col-start-1 px-8 text-white lg:text-xl"
            >
              {leftDescription}
            </motion.div>
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
              className="flex flex-col justify-center border-white col-span-3 col-start-10 w-full text-white"
            >
              <p className="flex flex-col justify-center border-white p-8 w-full text-sm text-white">
                {rightDescription}
              </p>
              <Button2
                className="border-white/20 px-24 w-full"
                text={ctaButton?.name || ""}
                href={getButtonHref(ctaButton)}
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
            <div className="col-span-9"></div>
            <div className="col-span-2"></div>
          </div>
        </div>
      )}
      {modules?.map((block: any, index: number) => {
        switch (block._type) {
          case "sciFiBlock":
            return (
              <SciFiBlock
                key={`sciFiBlock-${index}`}
                className={"scifi-border mb-12 mx-4"}
              >
                <TripleHero {...block.tripleHero} />
              </SciFiBlock>
            );
          case "gridHero":
            return <GridHero key={`gridHero-${index}`} {...block} />;
          case "gridHero2":
            return <GridHero2 {...block} key={`gridHero2-${index}`} />;
          case "zwischenTitelCta":
            return (
              <ZwischenTitelCta {...block} key={`zwischenTitelCta-${index}`} />
            );
          case "gridHero3":
            return <GridHero3 {...block} key={`gridHero3-${index}`} />;
          case "threeColumnVideoBanner":
            return (
              <ThreeColVideoBanner
                key={index}
                {...(block as ThreeColVideoBannerProps)}
              />
            );
          case "fourColumnVideoBanner":
            return <FourColVideoBanner key={index} {...(block as any)} />;

          default:
            return null;
        }
      })}
    </HeroHighlight>
  );
};

export default HeroHighlightComponent;
