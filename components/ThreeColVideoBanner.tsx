// components/ThreeColVideoBanner.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlight } from "./ui/hero-highlight";
import Button2 from "./Button2";
import { ThreeColVideoBannerProps } from "@/types/types";
import { easeInOut } from "framer-motion";

export default function ThreeColVideoBanner({
  videoCloudinary,
  title,
  highlight,
  primaryDescription,
  secondaryDescription,
  ctaButtons,
}: ThreeColVideoBannerProps) {
  const resolveLink = (link: any): string => {
    if (link?.href) return link.href;
    if (link?.reference?.slug?.current)
      return `/${link.reference.slug.current}`;
    return "#";
  };

  // a single tween config for all 3-step keyframe animations
  const keyframeTransition = {
    type: "tween" as const,
    ease: [easeInOut, easeInOut],
    duration: 0.8,
    times: [0, 0.5, 1],
  };

  return (
    <div className="justify-center grid grid-cols-1 grid-rows-1 col-span-12 border-[1px] border-white/20 w-full overflow-hidden">
      <video
        loop
        autoPlay
        muted
        className="col-start-1 row-start-1 opacity-30 w-full h-full object-cover"
        src={videoCloudinary.url}
      />

      <div className="grid grid-cols-12 col-start-1 row-start-1 py-32 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={keyframeTransition}
          className="col-span-4 col-start-1 px-8 py-32 pb-0 w-full max-w-3xl font-bold text-4xl text-neutral-100 md:text-4xl lg:text-5xl dark:text-white leading-relaxed lg:leading-snug"
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
          className="flex flex-col justify-center border-white col-span-5 col-start-5 mt-24 mb-24 w-full text-white"
        >
          {primaryDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 px-8 text-white"
            >
              {primaryDescription}
            </motion.div>
          )}

          {secondaryDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ ...keyframeTransition, delay: 0.3 }}
              className="col-span-4 col-start-1 mt-8 px-8 text-gray-300 text-sm"
            >
              {secondaryDescription}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ ...keyframeTransition, delay: 0.69 }}
          className="flex flex-col justify-center border-white col-span-3 col-start-10 mt-24 mb-24 w-full text-white"
        >
          {ctaButtons.map((btn, i) => (
            <Button2
              key={i}
              href={resolveLink(btn.link)}
              className="border-white/20 px-24 w-full mb-4"
              text={btn.name}
            />
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
        <div className="col-span-4" />
        <div className="col-span-5" />
        <div className="col-span-3" />
      </div>
    </div>
  );
}
