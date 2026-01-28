"use client";
import React, { useRef } from "react";
import Button2 from "../Button2";
import { FC } from "react";
import { ZwischenTitelCta as zwisProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";
import { motion, useInView } from "framer-motion";

const ZwischenTitelCta: FC<zwisProps & { locale?: string }> = (props) => {
  const { integrationTitle, headline, subHeadline, ctaButton, locale } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      className="mx-auto py-24  bg-white dark:bg-transparent text-center "
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h4
        className="font-semibold text-sm md:text-base text-red-600 dark:text-red-500"
        variants={itemVariants}
      >
        {integrationTitle}
      </motion.h4>
      <motion.h3
        className="mt-2  text-2xl sm:text-3xl md:text-4xl  max-w-3xl mx-auto lg:text-5xl text-balance text-gray-900 dark:text-white tracking-tight"
        variants={itemVariants}
      >
        {headline}
      </motion.h3>
      <motion.p
        className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400 text-base md:text-lg text-pretty"
        variants={itemVariants}
      >
        {subHeadline}
      </motion.p>
      {ctaButton?.name && (ctaButton?.link?.externalUrl || ctaButton?.link?.internalReference) && (
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <div className="flex justify-center mt-8 w-64 text-gray-900 dark:text-white">
            <Button2
                className="border-gray-300  dark:border-white/20 border-r border-l"
                text={ctaButton.name}
                href={resolveSanityLink(ctaButton.link, locale)}
              ></Button2>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZwischenTitelCta;
