// components/ThreeColVideoBanner.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlight, hasText } from "./ui/hero-highlight";
import Button2 from "./Button2";
import { ThreeColVideoBannerProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";
import { easeInOut } from "framer-motion";
import Image from "next/image";
import {
  getOptimizedCloudinaryImageUrl,
  getOptimizedCloudinaryVideoUrl,
  resolveCloudinaryAssetUrl,
} from "@/utils/cloudinary";

export default function ThreeColVideoBanner({
  videoCloudinary,
  imageCloudinary,
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

  // Determine background URL - prefer video, fallback to image
  const videoUrl = getOptimizedCloudinaryVideoUrl(
    resolveCloudinaryAssetUrl(videoCloudinary),
    { width: 1920 }
  );
  const imageUrl = getOptimizedCloudinaryImageUrl(
    resolveCloudinaryAssetUrl(imageCloudinary),
    { width: 1920 }
  );
  const backgroundUrl = videoUrl || imageUrl;
  const isVideo = !!videoUrl;

  // The background never sizes the banner: content sets the height
  return (
    <div className="relative justify-center container bg-black mx-auto md:grid grid-cols-1 grid-rows-1 col-span-12 border-[1px] border-gray-200 dark:border-white/20 w-full overflow-hidden">
      {/* Invisible 16:9 spacer: minimum desktop height without clipping taller content */}
      <div aria-hidden="true" className="hidden md:block col-start-1 row-start-1 aspect-video" />
      {isVideo ? (
        <video
          loop
          autoPlay
          muted playsInline

          className="absolute inset-0 opacity-60 w-full h-full object-cover"
          src={backgroundUrl}
        />
      ) : backgroundUrl ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundUrl}
            alt=""
            fill
            sizes="100vw"
            className="opacity-60 w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className="relative md:grid grid-cols-12 col-start-1 z-50 row-start-1 py-16 md:py-32 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={keyframeTransition}
          className="col-span-4 col-start-1 px-8 pt-0 md:pt-24 pb-0 w-full min-w-0 max-w-3xl break-words hyphens-auto text-balance font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-neutral-100 dark:text-white leading-[1.1] tracking-[-0.02em]"
        >
          {title}
          {hasText(highlight) && (
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
          className="flex flex-col  justify-start border-white col-span-5 col-start-5 mt-8 md:mt-24 md:mb-24 w-full text-gray-900 dark:text-white"
        >
          {primaryDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 px-8 md:pr-24 text-sm sm:text-base md:text-xl text-gray-100 dark:text-white"
            >
              {primaryDescription}
            </motion.div>
          )}

          {secondaryDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 mt-8 px-8 md:pr-24 text-white/75 leading-relaxed dark:text-white/75 text-sm sm:text-base [text-shadow:0_1px_12px_rgb(0_0_0/0.6)]"
            >
              {secondaryDescription}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.69 }}
          className="flex flex-col justify-center border-white col-span-3 col-start-10 mt-10 px-8 md:px-0 md:mt-24 md:mb-24 w-full [&>*+*]:-mt-px text-gray-100 dark:text-white"
        >
          {ctaButtons.map((btn, i) => (
            <Button2
              key={i}
              href={resolveSanityLink((btn as any).link, locale)}
              className="border-white/30 dark:border-white/30 text-white w-full"
              text={btn.name}
            />
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-200/50 dark:divide-white/50 w-full min-h-[20rem]">
        <div className="col-span-4" />
        <div className="col-span-5" />
        <div className="col-span-3" />
      </div>
    </div>
  );
}
