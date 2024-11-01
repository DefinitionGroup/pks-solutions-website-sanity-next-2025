"use client";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { ParallaxScroll } from "./components/ui/parallax-scroll";
import { LampDemo } from "./components/ui/lamp";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/app/components/ui/hero-highlight";
import { DirectionAwareHover } from "./components/ui/direction-aware-hover";
import { FloatingNav } from "./components/ui/floating-navbar";
import Button from "./components/Button";
import Button2 from "./components/Button2";
import AnimationWrapper from "./components/ui/anim/AnimationWrapper";

import Footer from "./components/Footer";
import img1 from "../public/img/mainframe_ai_german_northseacoast_beach_with_polestar_3_electri_a81296f4-8931-4f10-b9a5-152686f8e27b-gigapixel-standard-scale-6_00x.jpg";
import imgL1 from "../public/img/pks1-v.svg";
import imgL2 from "../public/img/pks2-v.svg";
import imgL3 from "../public/img/pks3av-v.svg";

import imgBack1 from "public/img/mainframe_ai_polestar_3_black_car_on_lanzarote_desert_an_sunset_020c936a-6ebc-4315-84f2-4f506b1f0586-gigapixel-standard-scale-6_00x.jpg";
import imgBack2 from "../public/img/mainframe_ai_german_northseacoast_beach_with_polestar_3_electri_a81296f4-8931-4f10-b9a5-152686f8e27b-gigapixel-standard-scale-6_00x.jpg";
import { Container } from "postcss";
import { TabsDemo } from "./components/TabsDemo";
import { CardDemo } from "./components/CardDemo";
export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="w-4 h-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  const imageUrl =
    "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
      <main className="flex flex-col items-center sm:items-start gap-8 row-start-2 w-full">
        <HeroHighlight className="container">
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
            className="mx-auto px-4 max-w-3xl font-bold text-4xl text-center text-neutral-100 md:text-4xl lg:text-5xl dark:text-white leading-relaxed lg:leading-snug"
          >
            Ihr Unternehmen fährt gelassen
            <br />
            <Highlight className="text-white dark:text-white">
              in die Zukunft.
            </Highlight>
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
              className="px-48 py-24"
            >
              <Button2
                variant="10"
                className="inline-block border-white/20 border-x px-24"
                text="mehr erfahren"
              />
            </motion.div>
          </motion.h1>
          <div className="border-white/20 grid grid-cols-1 grid-rows-1 border-t border-r border-l">
            <div className="place-content-start grid grid-cols-12 col-start-1 row-start-1 w-full">
              <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
                <h2 className="col-span-5 col-start-1 p-4 text-6xl text-white">
                  Mission:
                </h2>
              </AnimationWrapper>
              <AnimationWrapper
                transition={{ duration: 0.6, delay: 0.4 }}
                className="col-span-5 col-start-1 p-4 text-2xl text-white"
              >
                <h2>
                  "Software für die Ermittlung von Prozesskennzahlen in
                  Produktion und Verwaltung von Industriebetrieben einführen und
                  pflegen."
                </h2>
              </AnimationWrapper>
              <AnimationWrapper
                className="col-span-5 col-start-6 p-4 text-md text-white"
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2>
                  Die PKS GmbH berät Unternehmen der Möbelindustrie und sonstige
                  industrielle Produktionsbetriebe bei der Optimierung von
                  Verwaltungs- und Produktionsprozessen mit einem innovativen
                  Ansatz in der Zeitwirtschaft.
                </h2>{" "}
              </AnimationWrapper>
              <div className="align-items-start grid col-span-2 col-start-11 text-md text-white">
                <Button2 text="Mehr erfahren"></Button2>
              </div>
            </div>

            <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
              <div className="col-span-5"></div>
              <div className="col-span-5"></div>
              <div className="col-span-2"></div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <CardDemo />
            <CardDemo />
            <CardDemo />
          </div>
          <div className="z-10 border-white/20 grid grid-cols-1 grid-rows-1 pb-8 border-t border-r border-b border-l">
            <div className="grid grid-cols-12 col-start-1 row-start-1 w-full">
              <h2 className="col-span-4 col-start-1 p-4 text-6xl text-white">
                Erfahrung
              </h2>
              <h2 className="col-span-4 col-start-5 row-start-1 p-4 text-2xl text-white">
                Mit angewandten Methoden der Statistik in der
                Arbeitsorganisation werden die Anforderungen an die
                Zeitwirtschaft, bei "Losgröße 1" und "Mass Customization" in
                Produktion und Verwaltung digital erfüllt.
              </h2>

              <h2 className="border-white/20 col-span-4 col-start-5 row-start-2 p-4 border-t text-md text-white">
                Für die schlanke Bewirtschaftung von Planzeiten nach dieser
                Methode wird eine Software ("PKS" = Prozess Kennzahlen System)
                angeboten und ständig weiterentwickelt.
              </h2>
              <div className="align-items-start grid col-span-4 col-start-5 text-md text-white">
                <Button2 text="Mehr erfahren"></Button2>
              </div>

              <div className="z-10 place-content-stretch grid grid-cols-2 grid-rows-2 col-span-4 col-start-9 row-start-1">
                <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border transition duration-300">
                  <Image
                    aria-hidden
                    src={"/img/logos/rotpunkt-kuechen-logo.svg"}
                    alt="Window icon"
                    width={164}
                    height={164}
                    className="block place-content-center p-4 w-1/1 self-stretch"
                  />
                </div>
                <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border transition duration-300">
                  <Image
                    aria-hidden
                    src={"/img/logos/logo_head_stoermer.png"}
                    alt="Window icon"
                    width={164}
                    height={164}
                    className="block place-content-center p-4 w-1/1 self-center"
                  />
                </div>
                <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border transition duration-300">
                  <Image
                    aria-hidden
                    src={"/img/logos/otten-logo.svg"}
                    alt="Window icon"
                    width={164}
                    height={164}
                    className="block p-4 w-1/1 self-stretch"
                  />
                </div>
                <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border transition duration-300">
                  <Image
                    aria-hidden
                    src={"/img/logos/otten-logo.svg"}
                    alt="Window icon"
                    width={164}
                    height={164}
                    className="block p-4 w-1/1 self-stretch"
                  />
                </div>{" "}
                <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border transition duration-300">
                  <Image
                    aria-hidden
                    src={"/img/logos/rotpunkt-kuechen-logo.svg"}
                    alt="Window icon"
                    width={164}
                    height={164}
                    className="block place-content-center p-4 w-1/1 self-stretch"
                  />
                </div>
                <div className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border transition duration-300">
                  <Image
                    aria-hidden
                    src={"/img/logos/logo_head_stoermer.png"}
                    alt="Window icon"
                    width={164}
                    height={164}
                    className="block place-content-center p-4 w-1/1 self-center"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
              <div className="col-span-4"> </div>
              <div className="col-span-4"> </div>
              <div className="col-span-4"> </div>
            </div>
          </div>
        </HeroHighlight>
        <TabsDemo className="relative z-30 flex justify-center items-center gap-4 w-full h-[40rem]" />
        <div className="relative flex justify-center items-center gap-4 w-full h-[40rem]">
          <DirectionAwareHover
            imageUrl={imgBack1}
            className="bg-black"
            fixedContent={
              <>
                <p className="font-bold text-5xl">PSYSTEM</p>
                <Image
                  className="py-3 w-1/4 h-1/4 object-cover"
                  aria-hidden
                  src={imgL1}
                  alt="Window icon"
                  width={64}
                  height={64}
                />
              </>
            }
          >
            <p className="font-bold text-xl">In the mountains</p>
            <p className="font-normal text-sm">$1299 / night</p>

            <div className="py-12">
              <Button2
                text="Button"
                className={"border-x border-white/20"}
              ></Button2>
            </div>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl={imgBack2}
            fixedContent={
              <>
                {" "}
                <Image
                  className="py-3 w-1/4 h-1/4 object-cover"
                  aria-hidden
                  src={imgL2}
                  alt="Window icon"
                  width={64}
                  height={64}
                />
                <p className="font-bold text-5xl">PMOBILE</p>
              </>
            }
          >
            <p className="font-normal text-sm">$1299 / night</p>
            <p className="font-bold text-xl">In tshe mountains</p>

            <div className="py-12">
              <Button className="inline-block redalert" text="Button"></Button>
            </div>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl={images[2]}
            fixedContent={
              <>
                {" "}
                <p className="font-bold text-5xl">AVATR</p>
                <p className="font-normal text-sm">coming Soon.</p>
                <Image
                  className="py-3 w-1/5 h-1/4 object-cover"
                  aria-hidden
                  src={imgL3}
                  alt="Window icon"
                  width={64}
                  height={64}
                />
              </>
            }
          >
            <p className="font-bold text-xl">In the mountains</p>
            <p className="font-normal text-sm">$1299 / night</p>
            <div className="py-12">
              <Button text="Button"></Button>
            </div>
          </DirectionAwareHover>
        </div>
        <div className="flex flex-col justify-center items-center p-12 w-full">
          <LampDemo />
        </div>
        {/* <ParallaxScroll images={images} />;  */}
        <Footer />
      </main>
    </div>
  );
}
