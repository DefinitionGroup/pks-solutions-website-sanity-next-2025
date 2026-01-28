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
  
  // Common props for both links
  const linkProps = {
    className: (isTop: boolean) => cn(
      isTop 
        ? "pointer-events-auto absolute top-0 left-0 border justify-between border-gray-300 dark:border-white/20 font-bold flex w-full p-3 sm:p-4 text-gray-900 dark:text-white hover:cursor-pointer tracking-wider group-hover/btn:-top-14 sm:group-hover/btn:-top-16 transition-all duration-250 ease-in-out"
        : "pointer-events-auto border absolute font-bold left-0 flex justify-between top-[100%] w-full group-hover/btn:top-0 text-gray-900 dark:text-white transition-all duration-250 ease-in-out p-3 sm:p-4 hover:cursor-pointer tracking-wider",
      className
    ),
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
  };

  // Content for both links
  const content = (isRotated: boolean) => (
    <div className="flex items-center  w-full">
      <p className="box flex-grow pl-4">{label}</p>
      <ArrowRight className={isRotated ? "rotate-45" : ""} size={16} />
    </div>
  );

  return (
    <div className={`inline-block relative top-0 left-0 min-w-full h-12 sm:h-14 text-xs sm:text-sm overflow-hidden group/btn min-h-6`}>
      { !hasHref ? (
        // No link provided: render non-clickable blocks
        <>
          <div className={linkProps.className(true)}>{content(false)}</div>
          <div className={linkProps.className(false)}>{content(true)}</div>
        </>
      ) : isExternal ? (
        // External links use regular anchor tags
        <>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkProps.className(true)}
          >
            {content(false)} 
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkProps.className(false)}
          >
            {content(true)}
          </a>
        </>
      ) : (
        // Internal links use Next.js Link component
        <>
          <Link
            href={(href as string)}
            className={linkProps.className(true)} 
          >
            {content(false)} 
          </Link>
          <Link
            href={(href as string)}
            className={linkProps.className(false)}
          >
            {content(true)} 
          </Link>
        </>
      )}
    </div>
  );
}

export default Button2;
