"use client";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
export function CardDemo(props) {
  return (
    <div className="relative bg-black w-full max-w-lg overflow-hidden">
      <Image
        className="top-0 left-0 z-0 absolute opacity-75 w-full"
        alt="background image"
        width={1200}
        height={1200}
        src={
          "/img/mainframe_ai_gran_canaria_landscape_with_sundown_and_lights_on__90d99f6b-17b9-43f2-b771-b91a948cf5fd (1)-gigapixel-standard-scale-6_00x.jpg"
        }
      />
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800"
        )}
      >
        <div className="relative z-50 text">
          <h1 className="relative font-bold text-gray-50 text-xl md:text-3xl">
            Background Overlays
          </h1>
          <p className="relative my-4 font-normal text-base text-gray-50">
            This card is for some special elements, like displaying background
            gifs on hover only.
          </p>
        </div>
      </div>
    </div>
  );
}
