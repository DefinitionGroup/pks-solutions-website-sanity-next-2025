// components/FourColVideoBanner.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlight, hasText } from "./ui/hero-highlight";
import Button2 from "./Button2";
import { resolveSanityLink } from "@/utils/linkResolver";
import { easeInOut } from "framer-motion";
import {
  getOptimizedCloudinaryVideoUrl,
  resolveCloudinaryAssetUrl,
} from "@/utils/cloudinary";

export interface FourColVideoBannerProps {
  videoCloudinary: { url?: string; secure_url?: string };
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
  const videoUrl = getOptimizedCloudinaryVideoUrl(
    resolveCloudinaryAssetUrl(videoCloudinary),
    { width: 1920 }
  );

  // The background never sizes the banner: content sets the height
  return (
    <div className="relative justify-center bg-black grid grid-cols-1 grid-rows-1 col-span-12 border-[1px] border-gray-200 dark:border-white/20 w-full overflow-hidden">
      {/* Invisible 16:9 spacer: minimum desktop height without clipping taller content */}
      <div aria-hidden="true" className="hidden lg:block col-start-1 row-start-1 aspect-video" />
      <video
        loop
        autoPlay
        muted
        playsInline
        className="absolute inset-0 opacity-60 w-full h-full object-cover"
        src={videoUrl}
      />

      {/* Content Grid - stacks on mobile, 4 cols on desktop */}
      <div className="flex flex-col lg:grid  lg:grid-cols-12 col-start-1 row-start-1 w-full z-[9999] relative top-0  opacity-100">
        {/* Column 1 - Brand & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={keyframeTransition}
          className="lg:col-span-3 lg:col-start-1 min-w-0 px-6 lg:px-8 pt-12 pb-8 lg:pt-0 lg:pb-24 flex flex-col justify-center lg:mt-24  z-50 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={keyframeTransition}
            className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl leading-[1.1] break-words hyphens-auto text-white font-bold mb-4"
          >
            {brandName}
          </motion.div>
          <h3 className="text-lg sm:text-lg md:text-xl lg:text-2xl text-neutral-100 dark:text-white leading-relaxed lg:leading-snug">
            {headline}
          </h3>
          {hasText(headlineHighlight) && (
            <Highlight className="inline-block mt-2 lg:relative lg:top-16 p-4 lg:p-4 text-lg  sm:text-xl md:text-2xl lg:text-3xl text-white dark:text-white">
              {headlineHighlight}
            </Highlight>
          )}
        </motion.div>

        {/* Column 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.3 }}
          className="flex flex-col justify-end lg:mt-24  lg:col-span-3 lg:col-start-4 min-w-0 px-6 lg:px-8 py-8 lg:py-0 lg:mb-24 w-full border-t border-white/10 lg:border-t-0"
        >
          {column2Title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.4 }}
              className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl leading-[1.1] tracking-[-0.01em] text-balance break-words hyphens-auto text-gray-200 dark:text-white"
            >
              {column2Title}
            </motion.div>
          )}
          {column2Description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.5 }}
              className="mt-4 lg:mt-8 text-sm md:text-base text-gray-300 dark:text-gray-300"
            >
              {column2Description}
            </motion.div>
          )}
        </motion.div>

        {/* Column 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.5 }}
          className="flex flex-col justify-end lg:col-span-3 lg:col-start-7 min-w-0 px-6 lg:px-8 py-8 lg:py-0 lg:mt-24 lg:mb-24 w-full border-t border-white/10 lg:border-t-0"
        >
          {column3Title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.6 }}
              className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl leading-[1.1] tracking-[-0.01em] text-balance break-words hyphens-auto text-gray-300 dark:text-white"
            >
              {column3Title}
            </motion.div>
          )}
          {column3Description && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.7 }}
              className="mt-4 text-sm md:text-base text-gray-300 dark:text-gray-300"
            >
              {column3Description}
            </motion.div>
          )}
        </motion.div>

        {/* Column 4: CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.7 }}
          className="flex flex-col justify-end lg:col-span-3 lg:col-start-10  px-6 lg:px-0 py-8 lg:py-0 lg:mt-72 lg:mb-24 w-full border-t border-white/10 lg:border-t-0 [&>*+*]:-mt-px"
        >
          {/* Stacked buttons share one line; on desktop the column dividers form their sides */}
          {ctaButtons.map((btn, i) => (
            <Button2
              key={i}
              href={resolveSanityLink((btn as any).link, locale)}
              className="border-white/30 dark:border-white/30 lg:border-x-0 px-4 lg:px-4 w-full text-white"
              text={btn.name}
            />
          ))}
        </motion.div>
      </div>

      {/* bottom divider grid - hidden on mobile TEST */}
      <div className="hidden lg:grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-200/20 dark:divide-white/20 w-full min-h-[20rem]">
        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
