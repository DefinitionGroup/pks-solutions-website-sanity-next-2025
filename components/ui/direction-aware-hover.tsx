"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
  fixedContent,
}: {
  imageUrl: any;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
  fixedContent: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    console.log("direction", direction);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  // Resolve a usable URL from Cloudinary asset or string
  const resolveSrc = (input: any): string => {
    if (!input) return "";
    if (typeof input === "string") return input;
    if (typeof input === "object" && input.secure_url) return input.secure_url as string;
    return "";
  };

  const src = resolveSrc(imageUrl);

  const isVideoUrl = (u: string): boolean => {
    if (!u) return false;
    // Heuristics for Cloudinary/video URLs
    if (u.includes("/video/upload")) return true;
    return /\.(mp4|webm|ogg)(\?|#|$)/i.test(u);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "md:h-96 w-full   h-full   md:w-196 bg-transparent rounded-noone overflow-hidden group/card relative",
        className
      )}
    >
      <div className="top-4 left-4 z-50 absolute p-4">{fixedContent}</div>
      <AnimatePresence mode="wait">
        <motion.div
          className="relative w-full h-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          <motion.div className="group-hover/card:block z-10 absolute inset-0 hidden bg-black/40 w-full h-full transition duration-500" />
          <motion.div
            variants={variants}
            className="relative w-full h-full"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {isVideoUrl(src) ? (
              <video
                className={cn(
                  "h-full w-full object-cover scale-[1.15]",
                  imageClassName
                )}
                src={src}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                alt="image"
                className={cn(
                  "h-full w-full object-cover scale-[1.15]",
                  imageClassName
                )}
                width="1000"
                height="1000"
                src={src || "/images/placeholder.jpg"}
              />
            )}
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={cn(
              "text-white absolute bottom-4 left-4 z-40",
              childrenClassName
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const variants = {
  initial: {
    x: 0,
  },

  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 0,
  },
  bottom: {
    y: 0,
  },
  left: {
    x: 0,
  },
  right: {
    x: 0,
  },
};

const textVariants = {
  initial: {
    y: 48,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 48,
    x: 0,
    opacity: 0,
  },
  top: {
    y: 48,
    opacity: 1,
  },
  bottom: {
    y: 48,
    opacity: 1,
  },
  left: {
    y: 48,

    x: 0,
    opacity: 1,
  },
  right: {
    y: 48,

    x: 0,
    opacity: 1,
  },
};
