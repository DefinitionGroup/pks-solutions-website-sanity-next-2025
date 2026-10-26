"use client";
import { motion, useScroll } from "framer-motion";
import styles from "./blog.module.css";

// Shows how far the reader is through the page; tied to scroll position, so it needs no reduced-motion variant
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden="true" className={styles.progress} style={{ scaleX: scrollYProgress }} />;
}
