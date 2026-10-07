"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";

interface Button2Props {
  text?: string;
  className?: string;
  href?: string;
}

function Button2({ text, className, href }: Button2Props) {
  // Only render when we have meaningful text content
  const label = (text ?? "").trim();
  const hasLabel = label.length > 0;
  if (!hasLabel) return null;

  // Determine link behavior
  const hasHref = Boolean(href && href.trim().length > 0);
  const isExternal = hasHref && (href!.startsWith('http') || href!.startsWith('mailto:') || href!.startsWith('tel:'));
  
  // Shared look of the sizer and both sliding layers
  const layerClass = (extra: string) => cn(
    "flex justify-between border border-gray-300 dark:border-white/20 font-bold w-full min-h-12 sm:min-h-14 p-3 sm:p-4 text-gray-900 dark:text-white tracking-wider",
    extra,
    className
  );
  const topClass = layerClass("pointer-events-auto absolute top-0 left-0 h-full hover:cursor-pointer transition-transform duration-250 ease-in-out group-hover/btn:-translate-y-full group-focus-within/btn:-translate-y-full");
  const bottomClass = layerClass("pointer-events-auto absolute top-0 left-0 h-full hover:cursor-pointer transition-transform duration-250 ease-in-out translate-y-full group-hover/btn:translate-y-0 group-focus-within/btn:translate-y-0");

  // Content for both links
  const content = (isRotated: boolean) => (
    <div className="flex items-center  w-full">
      <p className="box flex-grow pl-4">{label}</p>
      <ArrowRight className={isRotated ? "rotate-45" : ""} size={16} />
    </div>
  );

  // The duplicate hover layer is decorative: hidden from assistive tech and the tab order
  const hiddenLayer = { "aria-hidden": true, tabIndex: -1 } as const;

  return (
    <div className="inline-block relative min-w-full text-xs sm:text-sm overflow-hidden group/btn">
      {/* Invisible in-flow copy gives the button its height, so wrapped labels keep the full border */}
      <div aria-hidden="true" className={layerClass("invisible !m-0")}>{content(false)}</div>
      { !hasHref ? (
        // No link provided: render non-clickable blocks
        <>
          <div className={topClass}>{content(false)}</div>
          <div className={bottomClass} aria-hidden="true">{content(true)}</div>
        </>
      ) : isExternal ? (
        // External links use regular anchor tags
        <>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={topClass}
          >
            {content(false)}
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={bottomClass}
            {...hiddenLayer}
          >
            {content(true)}
          </a>
        </>
      ) : (
        // Internal links use Next.js Link component
        <>
          <Link
            href={(href as string)}
            className={topClass}
          >
            {content(false)}
          </Link>
          <Link
            href={(href as string)}
            className={bottomClass}
            {...hiddenLayer}
          >
            {content(true)}
          </Link>
        </>
      )}
    </div>
  );
}

export default Button2;
