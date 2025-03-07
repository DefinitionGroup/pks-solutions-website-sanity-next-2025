import { HeroHighlight, Highlight } from "@/app/components/ui/hero-highlight";
import { motion } from "framer-motion";
import Button2 from "./Button2";
import SciFiBlock from "./ui/anim/SciFiBlock";
import TripleHero from "./Content/TripleHero";
import GridHero from "./Content/GridHero";
import GridHero2 from "./Content/GridHero2";
import ZwischenTitelCta from "./Content/ZwischenTitelCta";
import GridHero3 from "./Content/GridHero3";
import { Hero as HeroType } from "@/types/types";

import { FC, ReactNode } from "react";

const HeroHighlightComponent: FC<HeroType> = (props) => {
  const { className } = props;

  return (
    <HeroHighlight className="container">
      <div className="justify-center border-white/20 grid grid-cols-1 grid-rows-1 col-span-12 border-t border-r border-b border-l w-full">
        {" "}
        <video
          loop
          autoPlay
          muted
          className="col-start-1 row-start-1 opacity-50"
          width="2000"
          height="2000"
          src="videos/2.mp4"
        />
        <div className="grid grid-cols-12 col-start-1 row-start-1 py-32 w-full">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{ type: "spring" }}
            className="col-span-9 col-start-1 px-8 py-32 pb-8 w-full max-w-3xl font-bold text-4xl text-neutral-100 md:text-4xl lg:text-5xl dark:text-white leading-relaxed lg:leading-snug"
          >
            Ihr Unternehmen fährt gelassen
            <br />
            <Highlight className="text-white dark:text-white">
              in die Zukunft.
            </Highlight>
          </motion.h1>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{ type: "spring", delay: 0.3 }}
            className="col-span-6 col-start-1 px-8 text-white lg:text-xl"
          >
            Die PKS GmbH berät Unternehmen der Möbelindustrie und sonstige
            industrielle Produktionsbetriebe bei der Optimierung von
            Verwaltungs- und Produktionsprozessen mit einem innovativen Ansatz
            in der Zeitwirtschaft.{" "}
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{ type: "spring", delay: 0.6 }}
            className="flex flex-col justify-center border-white col-span-3 col-start-10 w-full text-white"
          >
            <p className="flex flex-col justify-center border-white p-8 w-full text-sm text-white">
              Die PKS GmbH berät Unternehmen der Möbelindustrie und sonstige
              industrielle Produktionsbetriebe bei der Optimierung von
              Verwaltungs- und Produktionsprozessen mit einem innovativen Ansatz
              in der Zeitwirtschaft.
            </p>
            <Button2
              className="border-white/20 px-24 w-full"
              text="mehr erfahren"
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
          <div className="col-span-9"></div>
          <div className="col-span-2"></div>
        </div>
      </div>
      <SciFiBlock key="login" className={"scifi-border mb-12 mx-4"}>
        <TripleHero strings={images} />
      </SciFiBlock>
      <GridHero />
      <GridHero2 />

      <ZwischenTitelCta />
      <GridHero3 />
    </HeroHighlight>
  );
};

export default HeroHighlightComponent;
