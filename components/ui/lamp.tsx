"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import { useTheme } from "next-themes";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h2
        initial={{ opacity: 0.1, y: 200, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 180, scale: 1 }}
        transition={{
          type: "spring",
          delay: 0.3,
          damping: 23,
          bounce: 0.2,
        }}
        className="z-10 bg-clip-text bg-gradient-to-br from-red-300 to-red-700 mt-8 py-4 max-w-[50%] font-medium text-4xl text-center text-transparent md:text-6xl leading-none tracking-tight"
      >
        Erfassen Sie Daten in Ihrem Unternehmen. Auf die richtige Art und Weise.
      </motion.h2>{" "}
      <motion.h3
        initial={{ opacity: 0.1, y: 200, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 160, scale: 1 }}
        transition={{
          type: "spring",
          delay: 0.3,
          damping: 23,
          bounce: 0.2,
        }}
        className="z-10 bg-clip-text bg-gradient-to-br from-red-300 to-red-700  mt-8 py-4 max-w-[50%] font-medium text-center text-pink-200xl text-transparent md:text-4xl leading-none tracking-tight"
      >
        Datensicher. Effizient. Einfach.
      </motion.h3>{" "}
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "relative flex pb-96 dark:min-h-[80vh]  flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 w-full rounded-md z-0",
        className
      )} 
    >
      {/* Lamp effect - only renders in dark mode */}
      {isDark && (
        <div className="relative z-0 flex flex-1 justify-center items-center w-full isolate scale-x-150 scale-y-150">
          <motion.div
            initial={{ opacity: 0.55, width: "5rem" }}
            whileInView={{ opacity: 0.7, width: "10rem" }}
            transition={{
              delay: 0.2,
              duration: 1.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="[--conic-position:from_70deg_at_center_top] right-1/2 absolute inset-auto bg-gradient-conic from-red-500 via-transparent to-transparent w-[30rem] h-56 text-white overflow-visible"
          >
            <div className="[mask-image:linear-gradient(to_top,white,transparent)] bottom-0 left-0 z-20 absolute bg-slate-950 w-[100%] h-40" />
            <div className="[mask-image:linear-gradient(to_right,white,transparent)] bottom-0 left-0 z-20 absolute bg-slate-950 w-40 h-[100%]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.5, width: "1rem" }}
            whileInView={{ opacity: 1, width: "2rem" }}
            transition={{
              delay: 1.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="[--conic-position:from_290deg_at_center_top] left-1/2 absolute inset-auto bg-gradient-conic from-transparent via-transparent to-red-500 w-[30rem] h-56 text-white"
          >
            <div className="right-0 bottom-0 [mask-image:linear-gradient(to_left,white,transparent)] z-20 absolute bg-slate-950 w-40 h-[100%]" />
            <div className="[mask-image:linear-gradient(to_top,white,transparent)] right-0 bottom-0 z-20 absolute bg-slate-950 w-[100%] h-40" />
          </motion.div>
          <div className="top-1/2 absolute bg-slate-950 blur-2xl w-full h-48 translate-y-12 scale-x-150"></div>
          <div className="top-1/2 z-50 absolute bg-transparent opacity-10 backdrop-blur-md w-full h-48"></div>
          <div className="z-50 absolute inset-auto bg-red-500 opacity-50 blur-3xl rounded-full w-[28rem] h-36 -translate-y-1/2"></div>
          <motion.div
            initial={{ width: "1rem" }}
            whileInView={{ width: "12rem" }}
            transition={{
              delay: 0.2,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="z-30 absolute inset-auto bg-red-400 blur-3xl rounded-full w-64 h-36 -translate-y-[6rem]"
          ></motion.div>
          <motion.div
            initial={{ width: "1rem" }}
            whileInView={{ width: "32rem" }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="z-50 absolute  bg-red-400 w-[30rem] h-0.25 -translate-y-[7rem]"
          ></motion.div>

          <div className="z-40 absolute inset-auto w-full h-44 -translate-y-[12.5rem]"></div>
        </div>
      )}
      <div className={cn(
        "relative z-50 flex flex-col  items-center px-5 pb-32",
        isDark ? "-translate-y-[34rem]" : ""
      )}>
        {children}
      </div>
    </div>
  );
};
