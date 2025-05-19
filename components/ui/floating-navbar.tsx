"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { MenuType } from "@/types/types";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

// Define supported locales (consistent with middleware)
const locales = ["en", "de"];

export const FloatingNav = ({
  menu,
  className,
  currentLocale,
}: {
  menu: MenuType;
  className?: string;
  currentLocale: string;
}) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname(); // Get current pathname
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  if (!menu || !menu.menuItems) return null; // Check if menu and menuItems exist

  // Function to get the path without the current locale prefix
  const getPathWithoutLocale = () => {
    if (pathname.startsWith(`/${currentLocale}`)) {
      // Remove locale prefix and ensure root path is "/"
      return pathname.substring(`/${currentLocale}`.length) || "/";
    }
    // Fallback if middleware didn't prefix (shouldn't normally happen)
    return pathname;
  };

  const basePath = getPathWithoutLocale();

  // Determine the correct homepage slug for the current locale
  const homeSlugForCurrentLocale =
    currentLocale === "en" ? "home" : "startseite";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring" }}
        className={cn(
          // Adjusted padding/spacing for language switcher
          "fixed flex max-w-fit top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-4 items-center justify-center space-x-4",
          className
        )}
      >
        {/* Logo Link - points to the root of the current locale */}
        <Link
          href={`/${currentLocale}`} // Link to the locale's root
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <Image
            src={menu.imageCloud?.secure_url || "/img/logopks--outline.svg"}
            alt="logo"
            width={128}
            height={32}
            className="h-6 w-auto"
          />
        </Link>

        {/* Menu Items */}
        <div className="flex items-center space-x-4">
          {" "}
          {/* Group menu items */}
          {menu.menuItems?.map((item, idx) => {
            // Determine href based on slug and currentLocale
            // Check against the correct home slug for the *current* locale
            const isHomePageLink =
              item.page.slug.current === homeSlugForCurrentLocale;
            const href = isHomePageLink
              ? `/${currentLocale}` // Link to locale root for the homepage slug
              : `/${currentLocale}/${item.page.slug.current}`; // Prepend locale for other slugs

            return (
              <Link
                key={`link-${idx}`}
                href={href} // Use the generated href
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-500"
                )}
              >
                <span className="sm:block hidden text-sm">
                  {item.displayName}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Language Switcher - ADDED BACK */}
        <div className="flex items-center space-x-2 border-l border-neutral-700 pl-4 ml-4">
          {" "}
          {/* Separator and spacing */}
          {locales.map((locale) => {
            const isActive = locale === currentLocale;
            // Construct the path for the other locale using the basePath
            const href = `/${locale}${basePath}`;

            return (
              <Link
                key={locale}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "bg-neutral-700 text-white" // Style for active locale
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800" // Style for inactive locale
                )}
              >
                {locale.toUpperCase()}
              </Link>
            );
          })}
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-2 border-l border-neutral-700 pl-4 ml-4 mr-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-3 py-1 rounded-full text-sm border border-transparent font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                {currentLocale === "en" ? "Sign In" : "Anmelden"}
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-transparent hover:text-white text-black transition-colors border border-transparent hover:border-white">
                {currentLocale === "en" ? "Sign Up" : "Registrieren"}
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
