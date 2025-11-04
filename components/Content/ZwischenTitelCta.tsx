"use client";
import React, { useRef } from "react";
import Button2 from "../Button2";
import { FC } from "react";
import { ZwischenTitelCta as zwisProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";
import { motion, useInView } from "framer-motion";
import DebugBadge from "@/components/dev/DebugBadge";

const ZwischenTitelCta: FC<zwisProps> = (props) => {
  const { integrationTitle, headline, subHeadline, ctaButton } = props;
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
      className="mx-auto py-64 max-w-2xl text-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h4
        className="font-semibold text-base/7 text-red-500"
        variants={itemVariants}
      >
        {integrationTitle}
      </motion.h4>
      <motion.h3
        className="mt-2 font-semibold text-4xl text-balance text-white sm:text-5xl tracking-tight"
        variants={itemVariants}
      >
        {headline}
      </motion.h3>
      <motion.p
        className="mx-auto mt-6 max-w-xl text-gray-400 text-lg/8 text-pretty"
        variants={itemVariants}
      >
        {subHeadline}
      </motion.p>
      {ctaButton?.name && (ctaButton?.link?.externalUrl || ctaButton?.link?.internalReference) && (
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <div className="flex justify-center mt-8 w-64 text-white">
            <DebugBadge name="Button2">
              <Button2
                className="border-white/20 border-r border-l"
                text={ctaButton.name}
                href={resolveSanityLink(ctaButton.link)}
              ></Button2>
            </DebugBadge>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZwischenTitelCta;
