"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface SciFiBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function SciFiBlock({ children, className }: SciFiBlockProps) {
  const parentRef = useRef(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Function to calculate the child's height and set the parent height
    const updateHeight = () => {
      if (childRef.current) {
        const childHeight = childRef.current.offsetHeight;
        setHeight(childHeight);
      }
    };

    // Call this function initially
    updateHeight();

    // You can also set up a ResizeObserver to monitor changes in the child's size
    const resizeObserver = new ResizeObserver(() => updateHeight());
    if (childRef.current) {
      resizeObserver.observe(childRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (childRef.current) {
        resizeObserver.unobserve(childRef.current);
      }
    };
  }, [children]);

  return (
    <motion.section
      ref={parentRef}
      style={{ overflow: "hidden" }}
      className={className}
      initial={{ height: 1, opacity: 0 }}
      animate={{
        opacity: [0, 1, 0, 1, 0, 1], // Flicker effect, switching between 0 and 1 rapidly
        height: height || "auto",
      }}
      transition={{
        opacity: {
          duration: 0.4, // Total time for the flicker effect
          times: [0, 0.2, 0.4, 0.6, 0.8, 1], // Timing for each opacity keyframe
          ease: "easeInOut",
        },
        height: {
          duration: 0.5, // Time for the expansion
          ease: [0.85, 0, 0.2, 1], // Extreme easing for the height animation
          delay: 0.4, // Delay the height expansion until the flicker completes
        },
      }}
      exit={{ height: 0 }}
    >
      {/* Child element whose height we want to track */}
      <div className="p-8" ref={childRef}>
        {children}
      </div>
    </motion.section>
  );
}
