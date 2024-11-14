"use client";
import Button2 from "@/app/components//Button2";
import Footer from "@/app/components//Footer";
import SciFiBlock from "@/app/components//ui/anim/SciFiBlock";
import { FloatingNav } from "@/app/components//ui/floating-navbar";
import GridHero3 from "@/app/components/Content/GridHero3";
import TripleHero from "@/app/components/Content/TripleHero";
import ZwischenTitelAboutUs from "@/app/components/Content/ZwischenTitelAboutUs";
import { HeroHighlight, Highlight } from "@/app/components/ui/hero-highlight";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TabsDemo } from "../components/TabsDemo";

export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Lösungen",
      link: "/solutions",
      icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Über uns",
      link: "/about",
      icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Kontakt",
      link: "/contact",
      icon: (
        <IconMessage className="w-4 h-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  const images = [
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  ];
  return (
    <div className="justify-items-center items-center grid grid-rows-[20px_1fr_10px] p-0 w-full">
      <FloatingNav navItems={navItems} />
      <main className="items-center sm:items-start gap-8 row-start-2 bg-black w-full">
        <HeroHighlight className="container">
          <div className="justify-center border-white/20 grid grid-cols-1 grid-rows-1 col-span-12 border-t border-r border-b border-l w-full">
            <Image
              alt="background Visual"
              className="col-start-1 row-start-1 opacity-30"
              width="2000"
              height="2000"
              src="/img/austin-distel-rxpThOwuVgE-unsplash.jpg"
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
                className="col-span-4 col-start-1 px-8 py-32 pb-0 w-full max-w-3xl font-bold text-4xl text-neutral-100 md:text-4xl lg:text-5xl dark:text-white leading-relaxed lg:leading-snug"
              >
                PKS Solutions.
                <br />
                <Highlight className="text-white dark:text-white">
                  Für den Mittelstand.
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
                transition={{ type: "spring", delay: 0.6 }}
                className="flex flex-col justify-center border-white col-span-5 col-start-5 mt-24 mb-24 w-full text-white"
              >
                {" "}
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
                  className="col-span-4 col-start-1 px-8 text-white"
                >
                  Die PKS GmbH berät Unternehmen der Möbelindustrie und sonstige
                  industrielle Produktionsbetriebe bei der Optimierung von
                  Verwaltungs- und Produktionsprozessen mit einem innovativen
                  Ansatz in der Zeitwirtschaft.
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
                  transition={{ type: "spring", delay: 0.3 }}
                  className="col-span-4 col-start-1 mt-8 px-8 text-gray-300 text-sm"
                >
                  Die PKS GmbH berät Unternehmen der Möbelindustrie und sonstige
                  industrielle Produktionsbetriebe bei der Optimierung von
                </motion.div>
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
                transition={{ type: "spring", delay: 0.69 }}
                className="flex flex-col justify-center border-white col-span-3 col-start-10 mt-24 mb-24 w-full text-white"
              >
                <Button2
                  className="border-white/20 px-24 w-full"
                  text="Demo anfordern"
                />
                <br />
                <Button2
                  className="border-white/20 px-24 w-full"
                  text="Kontakt aufnehmen"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
              <div className="col-span-4"></div>
              <div className="col-span-5"></div>

              <div className="col-span-3"></div>
            </div>
          </div>
          <ZwischenTitelAboutUs />
          <SciFiBlock key="login" className={"scifi-border mb-12 mx-4"}>
            <TripleHero strings={images} />
          </SciFiBlock>

          <GridHero3 />
        </HeroHighlight>
        <TabsDemo className="relative z-30 flex justify-center items-center gap-4 w-full h-[40rem]" />
        {/* <ParallaxScroll images={images} /> */}
        <Footer />
      </main>
    </div>
  );
}
