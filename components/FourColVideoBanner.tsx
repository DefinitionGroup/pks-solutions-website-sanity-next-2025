// components/FourColVideoBanner.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlight } from "./ui/hero-highlight";
import Button2 from "./Button2";
import { resolveSanityLink } from "@/utils/linkResolver";
import { easeInOut } from "framer-motion";
import DebugBadge from "@/components/dev/DebugBadge";

export interface FourColVideoBannerProps {
  videoCloudinary: { url: string };
  brandName: string;
  headline: string;
  headlineHighlight?: string;
  column2Title?: string;
  column2Description?: string;
  column3Title?: string;
  column3Description?: string;
  ctaButtons: Array<{
    name: string;
    link: any;
  }>;
}

export default function FourColVideoBanner({
  videoCloudinary,
  brandName,
  headline,
  headlineHighlight,
  column2Title,
  column2Description,
  column3Title,
  column3Description,
  ctaButtons,
  locale,
}: FourColVideoBannerProps & { locale?: string }) {

  // a single tween config for all 3-step keyframe animations
  const keyframeTransition = {
    type: "tween" as const,
    ease: [easeInOut, easeInOut],
    duration: 0.8,
    times: [0, 0.5, 1],
  };

  return (
    <div className="justify-center grid grid-cols-1 grid-rows-1 col-span-12 border-[1px] border-gray-200 dark:border-white/20 w-full overflow-hidden">
      <video
        loop
        autoPlay
        muted
        className="col-start-1 row-start-1 opacity-30 w-full h-full object-cover"
        src={videoCloudinary.url}
      />

      <div className="grid grid-cols-12 col-start-1 row-start-1 py-32 w-full">
        {/* Column 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={keyframeTransition}
          className="col-span-3 col-start-1 mb-8 px-8 py-32 pb-0 w-full max-w-3xl font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-100 dark:text-white leading-relaxed lg:leading-snug"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={keyframeTransition}
            className="col-span-3 col-start-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white"
          >
            {brandName}
          </motion.div>
          {headline}
          <br />
          {headlineHighlight && (
            <Highlight className="relative top-16 mt-8 p-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white dark:text-white">
              {headlineHighlight}
            </Highlight>
          )}
        </motion.h1>

        {/* Column 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.6 }}
          className="flex flex-col justify-center border-white col-span-3 col-start-4 mt-24 mb-24 w-full text-gray-900 dark:text-white"
        >
          {column2Title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-3 col-start-1 mt-16 px-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white"
            >
              {column2Title}
            </motion.div>
          )}
          {column2Description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 mt-8 px-8 text-sm md:text-base text-gray-600 dark:text-gray-300"
            >
              {column2Description}
            </motion.div>
          )}
        </motion.div>

        {/* Column 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.6 }}
          className="flex flex-col justify-center border-white col-span-3 col-start-7 mt-24 mb-24 w-full text-gray-900 dark:text-white"
        >
          {column3Title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-3 col-start-1 mt-16 px-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white"
            >
              {column3Title}
            </motion.div>
          )}
          {column3Description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 mt-44 px-8 text-sm md:text-base text-gray-600 dark:text-gray-300"
            >
              {column3Description}
            </motion.div>
          )}
        </motion.div>

        {/* Column 4: CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.69 }}
          className="flex flex-col justify-center border-white col-span-3 col-start-10 mt-72 mb-24 w-full text-gray-900 dark:text-white"
        >
          {ctaButtons.map((btn, i) => (
            <DebugBadge key={i} name="Button2">
              <Button2
                href={resolveSanityLink((btn as any).link, locale)}
                className="border-gray-200 dark:border-white/20 px-24 w-full mb-4"
                text={btn.name}
              />
            </DebugBadge>
          ))}
        </motion.div>
      </div>

      {/* bottom divider grid */}
      <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-200 dark:divide-white/20 w-full min-h-[20rem]">
        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
