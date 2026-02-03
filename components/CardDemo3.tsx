"use client";
import { cn } from "@/app/lib/utils";
import { CloudinaryAsset } from "@/types/types";
import Image from "next/image";

interface CardDemo3Props {
  title: string;
  subtitle: string;
  media: CloudinaryAsset;
}

export function CardDemo3({ title, subtitle, media }: CardDemo3Props) {
  const isVideo = media.resource_type === "video";

  return (
    <div className="w-full h-full min-h-full">
      <div
        className={cn(
          "group w-full min-h-full bg-black cursor-pointer min-h-[24rem] overflow-hidden relative card h-full shadow-xl mx-auto flex flex-col justify-end p-4  dark:border-neutral-800"
        )}
      >
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            className="bottom-0 absolute border object-cover opacity-70 mt-8 w-full h-full min-h-full scale-125"
          >
            <source src={media.secure_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={media.secure_url}
            alt={title}
            fill
            className="bottom-0 absolute border object-cover opacity-70 mt-8 scale-125"
          />
        )}
        <div className="top-0 z-50 absolute pt-12 text">
          <h3 className="relative font-bold text-gray-50 text-xl pr-24 md:text-3xl">
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
