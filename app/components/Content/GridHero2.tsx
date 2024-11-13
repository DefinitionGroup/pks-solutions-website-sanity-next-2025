import React from "react";
import Image from "next/image";
import AnimationWrapper from "../ui/anim/AnimationWrapper";
import Button2 from "../Button2";
import { CardDemo } from "../CardDemo";
import { CardDemo2 } from "../CardDemo2";
import { cn } from "@/app/lib/utils";
import { CardDemo3 } from "../CardDemo3";
function GridHero2() {
  return (
    <>
      <div className="z-10 border-white/20 grid grid-cols-1 grid-rows-1 border-t border-r border-b border-l">
        <div className="grid grid-cols-12 col-start-1 row-start-1 w-full">
          <h2 className="col-span-4 col-start-1 p-8 text-6xl text-white">
            Erfahrung
          </h2>
          <div className="col-span-4 col-start-6">
            <h2 className="p-8 text-2xl text-white">
              Mit angewandten Methoden der Statistik in der Arbeitsorganisation
              werden die Anforderungen an die Zeitwirtschaft, bei "Losgröße 1"
              und "Mass Customization" in Produktion und Verwaltung digital
              erfüllt.
            </h2>

            <h4 className="border-white/20 p-8 text-md text-white">
              Für die schlanke Bewirtschaftung von Planzeiten nach dieser
              Methode wird eine Software ("PKS" = Prozess Kennzahlen System)
              angeboten und ständig weiterentwickelt.
            </h4>
          </div>
          <div className="z-10 place-content-start grid grid-cols-2 col-span-4 col-start-10 row-start-1">
            <h2 className="border-white/20 col-span-2 col-start-1 row-start-1 p-8 border-t text-white text-xs">
              Für die schlanke Bewirtschaftung von Planzeiten nach diesssser
              Methode wird eine Software ("PKS" = Prozess Kennzahlen System)
              angeboten und ständig weiterentwickelt.
            </h2>
            <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300">
              <Image
                aria-hidden
                src={"/img/logos/rotpunkt-kuechen-logo.svg"}
                alt="Window icon"
                width={164}
                height={164}
                className="block place-content-center p-4 w-1/1 self-stretch"
              />
            </div>
            <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300">
              <Image
                aria-hidden
                src={"/img/logos/logo_head_stoermer.png"}
                alt="Window icon"
                width={164}
                height={164}
                className="block place-content-center p-4 w-1/1 self-center"
              />
            </div>
            <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300">
              <Image
                aria-hidden
                src={"/img/logos/otten-logo.svg"}
                alt="Window icon"
                width={164}
                height={164}
                className="block p-4 w-1/1 self-stretch"
              />
            </div>
            <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300">
              <Image
                aria-hidden
                src={"/img/logos/otten-logo.svg"}
                alt="Window icon"
                width={164}
                height={164}
                className="block p-4 w-1/1 self-stretch"
              />
            </div>{" "}
            <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300">
              <Image
                aria-hidden
                src={"/img/logos/rotpunkt-kuechen-logo.svg"}
                alt="Window icon"
                width={164}
                height={164}
                className="block place-content-center p-4 w-1/1 self-stretch"
              />
            </div>
            <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300">
              <Image
                aria-hidden
                src={"/img/logos/logo_head_stoermer.png"}
                alt="Window icon"
                width={164}
                height={164}
                className="block place-content-center p-4 w-1/1 self-center"
              />
            </div>{" "}
            <div className="align-items-start grid col-span-2 col-start-1 text-md text-white">
              <Button2 text="Referenzen und Kunden"></Button2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
          <div className="col-span-5"></div>
          <div className="col-span-4"></div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </>
  );
}

export default GridHero2;
