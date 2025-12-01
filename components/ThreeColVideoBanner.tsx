// components/ThreeColVideoBanner.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlight } from "./ui/hero-highlight";
import Button2 from "./Button2";
import { ThreeColVideoBannerProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";
import { easeInOut } from "framer-motion";
import DebugBadge from "@/components/dev/DebugBadge";

export default function ThreeColVideoBanner({
  videoCloudinary,
  title,
  highlight,
  primaryDescription,
  secondaryDescription,
  ctaButtons,
  locale,
}: ThreeColVideoBannerProps & { locale?: string }) {

  // a single tween config for all 3-step keyframe animations
  const keyframeTransition = {
    type: "tween" as const,
    ease: [easeInOut, easeInOut],
    duration: 0.8,
    times: [0, 0.5, 1],
  };

  return (
    <div className="justify-center container bg-black mx-auto md:grid grid-cols-1 grid-rows-1 col-span-12 border-[1px] border-gray-200 dark:border-white/20 w-full overflow-hidden">
      <video
        loop
        autoPlay
        muted
        className="col-start-1 row-start-1 opacity-30 w-full h-full object-cover"
        src={videoCloudinary.url}
      />

      <div className="md:grid grid-cols-12 col-start-1 row-start-1 py-32 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={keyframeTransition}
          className="col-span-4 col-start-1 px-8 py-32 pb-0 w-full max-w-3xl font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-100 dark:text-white leading-relaxed lg:leading-snug"
        >
          {title}
          {highlight && (
            <>
              <br />
              <Highlight className="text-white dark:text-white">
                {highlight}
              </Highlight>
            </>
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.6 }}
          className="flex flex-col justify-center border-white col-span-5 col-start-5 mt-24 mb-24 w-full text-gray-900 dark:text-white"
        >
          {primaryDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 px-8 text-sm sm:text-base md:text-lg text-gray-100 dark:text-white"
            >
              {primaryDescription}
            </motion.div>
          )}

          {secondaryDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 mt-8 px-8 text-gray-100 dark:text-gray-100 text-xs sm:text-sm"
            >
              {secondaryDescription}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.69 }}
          className="flex flex-col justify-center border-white col-span-3 col-start-10 mt-24 mb-24 w-full text-gray-100 dark:text-white"
        >
          {ctaButtons.map((btn, i) => (
            <DebugBadge key={i} name="Button2">
              <Button2
                href={resolveSanityLink((btn as any).link, locale)}
                className="border-gray-200 text-white dark:border-white/20 px-24 w-full mb-4"
                text={btn.name}
              />
            </DebugBadge>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-200 dark:divide-white/20 w-full min-h-[20rem]">
        <div className="col-span-4" />
        <div className="col-span-5" />
        <div className="col-span-3" />
      </div>
    </div>
  );
}
