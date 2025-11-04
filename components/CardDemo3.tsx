"use client";
import { cn } from "@/app/lib/utils";
import { CloudinaryAsset } from "@/types/types";
interface CardDemo3Props {
  title: string;
  subtitle: string;
  video: CloudinaryAsset;
}

export function CardDemo3({ title, subtitle, video }: CardDemo3Props) {
  return (
    <div className="w-full h-full min-h-[500px]">
      <div
        className={cn(
          "group w-full cursor-pointer  overflow-hidden relative card h-full shadow-xl mx-auto flex flex-col justify-end p-4  dark:border-neutral-800"
        )}
      >
        {" "}
        <video
          autoPlay
          loop
          muted
          className="bottom-0 absolute border  opacity-100 mt-8 w-full h-full min-h-[500px] scale-125"
        >
          <source src={video.secure_url} type="video/mp4" /> Your browser does
          not support the video tag.
        </video>
        <div className="top-0 z-50 absolute pt-4 text">
          <h1 className="relative font-bold text-gray-50 text-xl md:text-3xl">
            {title}
          </h1>
          <p className="relative font-normal text-base text-gray-50">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
