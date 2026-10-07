"use client";
import { cn } from "@/app/lib/utils";
import { CloudinaryAsset } from "@/types/types";
import Image from "next/image";
import {
  getOptimizedCloudinaryImageUrl,
  getOptimizedCloudinaryVideoUrl,
  resolveCloudinaryAssetUrl,
} from "@/utils/cloudinary";

interface CardDemo3Props {
  title: string;
  subtitle: string;
  media: CloudinaryAsset;
}

export function CardDemo3({ title, subtitle, media }: CardDemo3Props) {
  const isVideo = media.resource_type === "video";
  const sourceUrl = resolveCloudinaryAssetUrl(media);
  const optimizedVideoUrl = getOptimizedCloudinaryVideoUrl(sourceUrl, {
    width: 1280,
  });
  const optimizedImageUrl = getOptimizedCloudinaryImageUrl(sourceUrl, {
    width: 1200,
  });
  // Still frame shown until the video plays, or instead of it when a phone blocks autoplay
  const posterUrl =
    isVideo && sourceUrl?.includes("/video/upload/")
      ? sourceUrl.replace("/video/upload/", "/video/upload/so_3,w_1280,f_jpg,q_auto/").replace(/\.(mp4|mov|webm)$/i, ".jpg")
      : undefined;

  return (
    <div className="w-full h-full min-h-full">
      <div
        className={cn(
          "group w-full min-h-full bg-black cursor-pointer min-h-[18rem] sm:min-h-[22rem] md:min-h-[24rem] overflow-hidden relative card h-full shadow-xl mx-auto flex flex-col justify-end p-4  dark:border-neutral-800"
        )}
      >
        {isVideo ? (
          <video
            autoPlay
            loop
            muted playsInline
            poster={posterUrl}
            className="bottom-0 absolute border object-cover opacity-70 mt-8 w-full h-full min-h-full scale-125"
            src={optimizedVideoUrl}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={optimizedImageUrl || "/images/placeholder.jpg"}
            alt={title}
            fill
            className="bottom-0 absolute border object-cover opacity-70 mt-8 scale-125"
          />
        )}
        <div className="top-0 inset-x-0 z-50 absolute px-6 md:px-4 pt-8 md:pt-12 text">
          <h3 className="relative font-bold text-gray-50 text-2xl md:pr-24 md:text-3xl text-balance">
            {title}
          </h3>
          <p className="relative font-normal text-base text-gray-50">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
