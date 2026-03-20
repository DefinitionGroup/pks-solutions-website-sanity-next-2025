"use client";
import { cn } from "@/app/lib/utils";
import { CloudinaryAsset } from "@/types/types";
import {
  getOptimizedCloudinaryVideoUrl,
  resolveCloudinaryAssetUrl,
} from "@/utils/cloudinary";

export function CardDemo2({ videoSource }: { videoSource?: CloudinaryAsset }) {
  const videoUrl = getOptimizedCloudinaryVideoUrl(
    resolveCloudinaryAssetUrl(videoSource),
    { width: 1280 }
  );

  return (
    <div className="flex-grow">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-full flex-1 shadow-xl mx-auto flex flex-col justify-end p-4  border-transparent dark:border-neutral-800"
        )}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="flex-grow flex-1 mt-8 w-full h-full scale-100"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
