import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface AnimationWrapperProps {
  children: React.ReactNode;
  variants?: Variants;
  initial?: "hidden" | "visible" | Variants;
  animate?: "hidden" | "visible" | Variants;
  exit?: "hidden" | "visible" | Variants;
  transition?: any;
  className: string;
  threshold?: number; // Viewport visibility threshold
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  variants,
  initial = "hidden",
  animate = "visible",
  exit = "visible",
  className = "h-full",
  transition = { duration: 0.6, ease: "easeOut" },
  threshold = 0.5, // Default to 50% visibility
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Tracks if animation has played
  const elementRef = useRef<HTMLDivElement>(null);
  const classes = className;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true); // Animation triggered once
        }
      },
      {
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated, threshold]);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={elementRef}
      className={classes}
      variants={variants || defaultVariants}
      initial={initial}
      animate={isInView ? animate : initial}
      exit={exit}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
