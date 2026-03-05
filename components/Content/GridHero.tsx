"use client";

import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Button2 from "../Button2";
import { FC, useMemo } from "react";
import { CardDemo2 } from "../CardDemo2";
import AnimationWrapper from "../ui/anim/AnimationWrapper";
import { GridHero as GridHeroProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";
import {
  getOptimizedCloudinaryImageUrl,
  getOptimizedCloudinaryVideoUrl,
  resolveCloudinaryAssetUrl,
} from "@/utils/cloudinary";

const GridHero: FC<GridHeroProps & { locale?: string }> = (props) => {
  const { sectionOne, showSectionTwo, sectionTwo, locale } = props;

  const leftCardMedia = useMemo<
    | { type: "image"; src: string }
    | { type: "video"; src: string }
  >(() => {
    const asset = sectionTwo?.leftCard?.imageCloudinary;
    if (!asset) {
      return { src: "/img/austin-distel-rxpThOwuVgE-unsplash.jpg", type: "image" as const };
    }

    const src = resolveCloudinaryAssetUrl(asset);
    if (!src) {
      return { src: "/img/austin-distel-rxpThOwuVgE-unsplash.jpg", type: "image" as const };
    }

    const format = asset.format?.toLowerCase();
    const resourceType = asset.resource_type?.toLowerCase();
    const isVideo =
      resourceType === "video" ||
      (format ? ["mp4", "webm", "ogg", "mov"].includes(format) : false);

    if (isVideo) {
      return {
        src: getOptimizedCloudinaryVideoUrl(src, { width: 1280 }),
        type: "video" as const,
      };
    }

    return {
      src: getOptimizedCloudinaryImageUrl(src, { width: 1200 }),
      type: "image" as const,
    };
  }, [sectionTwo?.leftCard?.imageCloudinary]);

  const hasSectionOneContent = Boolean(
    sectionOne?.left?.title || sectionOne?.left?.subtitle || sectionOne?.middle?.quote
  );
  const shouldRenderSectionTwo = Boolean(showSectionTwo && sectionTwo);

  if (!hasSectionOneContent && !shouldRenderSectionTwo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("GridHero: received empty content", props);
    }
    return null;
  }

  return (
    <>
      {/* Section One */}
      {hasSectionOneContent && (
        <div className="border-gray-200 dark:border-white/20 md:grid grid-cols-1 grid-rows-1 border-t border-r border-b border-l bg-white dark:bg-black text-gray-900 dark:text-white">
          <div className="place-content-start md:grid grid-cols-12 col-start-1 row-start-1 w-full">
            {/* Left Side */}
            <div className="flex flex-col col-span-4 col-start-1 row-start-1">
              <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
                <h4 className="px-8 pt-8 text-2xl text-gray-900 dark:text-white">
                  {sectionOne?.left?.subtitle}
                </h4>
              </AnimationWrapper>
              <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
                <h2 className="px-8 pb-2 text-6xl text-gray-900 dark:text-white">
                  {sectionOne?.left?.title}
                </h2>
              </AnimationWrapper>
            </div>

            <div className="align-items-start grid col-span-5 col-start-1 mt-16 pt-8 text-base text-gray-900 dark:text-white">
              <AnimationWrapper
                transition={{ duration: 0.6, delay: 0.4 }}
                className="col-start-1 p-8 text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white"
              >
                <h2>{sectionOne?.middle?.quote}</h2>
              </AnimationWrapper>
              <Button2
                className="border-gray-200 dark:border-white/20 px-24 w-full"
                text={sectionOne?.middle?.ctaButton?.name}
                href={resolveSanityLink(sectionOne?.middle?.ctaButton?.link, locale)}
              />
            </div>
            {sectionOne?.right?.videoCloudinary && (
              <AnimationWrapper
                className="flex justify-start items-start place-content-start col-span-7 col-start-6 row-span-2 row-start-1 p-2 w-full h-full text-base text-gray-900 dark:text-white"
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <CardDemo2 videoSource={sectionOne.right.videoCloudinary} />
              </AnimationWrapper>
            )}
          </div>

          <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-200 dark:divide-white/20 w-full min-h-[20rem]">
            <div className="col-span-5"></div>
            <div className="col-span-6"></div>
          </div>
        </div>
      )}

      {/* Section Two */}
      {shouldRenderSectionTwo && (
        <div className="flex-col md:flex md:flex-row justify-between my-24">
          <div className="relative bg-gray-100 dark:bg-black  grid w-full max-w-lg overflow-hidden">
            {leftCardMedia.type === "video" ? (
              <video
                className="top-0 left-0 z-0 absolute opacity-75 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                aria-label="background video"
              >
                <source src={leftCardMedia.src} />
              </video>
            ) : (
              <Image
                className="top-0 left-0 z-0 absolute opacity-75 h-full w-full object-cover"
                alt="background image"
                width={1200}
                height={1200}
                src={leftCardMedia.src}
              />
            )}
            <div
              className={cn(
                "group w-full cursor-pointer  overflow-hidden relative card h-96 shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800"
              )}
            >
              <div className="relative z-50 text">
                <h1 className="relative font-bold text-gray-50 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  {sectionTwo?.leftCard?.title}
                </h1>
                <p className="relative my-4 font-normal text-sm md:text-base text-gray-50">
                  {sectionTwo?.leftCard?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-grow ">
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h4 className="col-span-4 col-start-2 px-8 pt-8 text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white">
                {sectionTwo?.rightSection?.subtitle}
              </h4>
              <h2 className="col-span-4 col-start-2 px-8 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 dark:text-white">
                {sectionTwo?.rightSection?.title}
              </h2>
            </AnimationWrapper>
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.4 }}>
              <p className="col-span-4 col-start-6 p-8 w-3/4 text-sm md:text-base lg:text-lg text-gray-600 dark:text-white">
                {sectionTwo?.rightSection?.description}
              </p>
            </AnimationWrapper>
            <Button2
              className="inline-block ml-8 px-24 border-r border-l max-w-96"
              text={sectionTwo?.rightSection?.ctaButton?.name}
              href={resolveSanityLink(sectionTwo?.rightSection?.ctaButton?.link, locale)}
            ></Button2>
          </div>
        </div>
      )}
    </>
  );
};

export default GridHero;
