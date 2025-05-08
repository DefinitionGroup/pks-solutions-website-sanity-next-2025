"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
  backgroundImage,
  useStarsBackground = false,
}: {
  className?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
  useStarsBackground?: boolean;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const defaultImage =
    "/img/mainframe_ai_gran_canaria_landscape_with_sundown_and_lights_on__90d99f6b-17b9-43f2-b771-b91a948cf5fd (1)-gigapixel-standard-scale-6_00x.jpg";
  
  return (
    <div
      className={cn(
        "bg-transparent p-4 min-h-[20rem] w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600 relative overflow-hidden",
        useStarsBackground ? "bg-black" : "",
        className
      )}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      {/* Background - Either image or stars based on prop */}
      {useStarsBackground ? (
        <div className="absolute inset-0 z-0">
          <Illustration mouseEnter={mouseEnter} />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={backgroundImage || defaultImage}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-transparent bg-opacity-60"></div>
        </div>
      )}

      <div className="flex justify-center items-center relative z-10"></div>
      <div className="px-2 pb-6 relative z-10 h-full">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <p className={cn("text-base text-white", className)}>{children}</p>;
};

export const GlowingStarsTitle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className={cn("font-bold text-2xl text-[#eaeaea]", className)}>
      {children}
    </h2>
  );
};

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const stars = 108;
  const columns = 18;

  const [glowingStars, setGlowingStars] = useState<number[]>([]);

  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-48 p-1 w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        const staticDelay = starIdx * 0.01;
        return (
          <div
            key={`matrix-col-${starIdx}}`}
            className="relative flex items-center justify-center"
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
            />
            {mouseEnter && <Glow delay={staticDelay} />}
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
    ></motion.div>
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
    />
  );
};
