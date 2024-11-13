import React from "react";
import Image from "next/image";
import AnimationWrapper from "../ui/anim/AnimationWrapper";
import Button2 from "../Button2";
import { CardDemo } from "../CardDemo";
import { CardDemo2 } from "../CardDemo2";
import { cn } from "@/app/lib/utils";
import { CardDemo3 } from "../CardDemo3";
function GridHero() {
  return (
    <>
      <div className="border-white/20 grid grid-cols-1 grid-rows-1 border-t border-r border-b border-l">
        <div className="place-content-start grid grid-cols-12 col-start-1 row-start-1 w-full">
          <div className="flex flex-col col-span-4 col-start-1 row-start-1">
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h4 className="px-8 pt-8 text-2xl text-white">
                Das ganze Unternehmen.
              </h4>
            </AnimationWrapper>
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="px-8 pb-2 text-6xl text-white">Mobil dabei.</h2>
            </AnimationWrapper>
          </div>

          <div className="align-items-start grid col-span-5 col-start-1 mt-16 pt-8 text-md text-white">
            <AnimationWrapper
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-start-1 p-8 text-2xl text-white"
            >
              <h2>
                "Software für die Ermittlung von Prozesskennzahlen in Produktion
                und Verwaltung von Industriebetrieben einführen und pflegen."
              </h2>
            </AnimationWrapper>{" "}
            <Button2
              className="border-white/20 px-24 w-full"
              text="mehr erfahren"
            />
          </div>
          <AnimationWrapper
            className="flex justify-start items-start place-content-start col-span-7 col-start-6 row-span-2 row-start-1 p-2 w-full h-full text-md text-white"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <CardDemo2 />
          </AnimationWrapper>
        </div>

        <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
          <div className="col-span-5"></div>
          <div className="col-span-6"></div>
        </div>
      </div>
      <div className="flex justify-between gap-32 my-24">
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
                Wir brauchen Bilder
              </h1>
              <p className="relative my-4 font-normal text-base text-gray-50">
                This card is for some special elements, like displaying
                background gifs on hover only.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="col-span-4 col-start-2 px-8 pt-8 text-2xl text-white">
              Unsere
            </h4>
            <h2 className="col-span-4 col-start-2 px-8 text-6xl text-white">
              Mission:
            </h2>
          </AnimationWrapper>
          <AnimationWrapper transition={{ duration: 0.6, delay: 0.4 }}>
            <h2 className="col-span-4 col-start-6 p-8 w-3/4 text-md text-white">
              Mit angewandten Methoden der Statistik in der Arbeitsorganisation
              werden die Anforderungen an die Zeitwirtschaft, bei "Losgröße 1"
              und "Mass Customization" in Produktion und Verwaltung digital
              erfüllt.
            </h2>
          </AnimationWrapper>
          <Button2
            className="inline-block ml-8 px-24 border-r border-l max-w-96"
            text="Mehr erfahren"
          ></Button2>
        </div>
      </div>
    </>
  );
}

export default GridHero;
