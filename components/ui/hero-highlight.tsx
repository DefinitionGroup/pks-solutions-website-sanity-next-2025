"use client";
import { cn } from "@/app/lib/utils";
import {
  useMotionValue,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative py-40 flex items-center justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      {/* Background dot patterns - lower z-index */}
      <div className="absolute inset-0 z-0 bg-white dark:bg-black bg-dot-thick-neutral-300/15 dark:bg-dot-thick-neutral-800/15 pointer-events-none" />
      <motion.div
        className="absolute inset-0 z-10 bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseXSpring}px ${mouseYSpring}px,
              black 0%,
              transparent 70%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseXSpring}px ${mouseYSpring}px,
              black 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Content - higher z-index */}
      <div className={cn("relative z-50", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 0.3,
        ease: "linear",
        delay: 0.715,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}>
      {children}
    </motion.span>
  );
};
