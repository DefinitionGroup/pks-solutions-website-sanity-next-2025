"use client";
import React, { useState, useEffect } from "react";
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
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

// Define supported locales (consistent with middleware)
const locales = ["en", "de"];

// Theme Switcher Component using next-themes
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full bg-gray-100  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Sun className="w-5 h-5 text-gray-500" weight="fill" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Moon className="w-5 h-5 text-gray-600" weight="fill" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full opacity-0",
          isDark 
            ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20" 
            : "bg-gradient-to-r from-indigo-400/20 to-purple-400/20"
        )}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.button>
  );
};

// Animated Hamburger Icon Component
const HamburgerIcon = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      className="relative w-12 h-8 flex items-center justify-center focus:outline-none lg:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="relative w-4 h-3 flex flex-col justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 5,x:-5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block h-0.25 w-full bg-gray-900 dark:bg-white origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -0 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="block h-0.25 w-full bg-gray-900 dark:bg-white"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -5,x:-5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block h-0.25 w-full bg-gray-900 dark:bg-white origin-center"
        />
      </div>
    </button>
  );
};

// Mobile Menu Overlay Component
const MobileMenuOverlay = ({
  isOpen,
  onClose,
  menu,
  currentLocale,
  homeSlugForCurrentLocale,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuType;
  currentLocale: string;
  homeSlugForCurrentLocale: string;
}) => {
  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      transition: { duration: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[4999] lg:hidden"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white/90 dark:bg-black/95 "
          />

          {/* Animated gradient accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />

          {/* Menu Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-8 pt-24 pb-12">
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center space-y-2 w-full max-w-sm"
            >
              {menu.menuItems?.map((item, idx) => {
                const isHomePageLink =
                  item.page.slug.current === homeSlugForCurrentLocale;
                const href = isHomePageLink
                  ? `/${currentLocale}`
                  : `/${currentLocale}/${item.page.slug.current}`;

                return (
                  <motion.div
                    key={`mobile-link-${idx}`}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="group relative block w-full py-4 text-center"
                    >
                      <span className="relative z-10 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300 group-hover:text-red-500">
                        {item.displayName}
                      </span>
                      {/* Hover underline effect */}
                      <motion.span
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 origin-center"
                        initial={{ width: 0 }}
                        whileHover={{ width: "60%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                    {/* Divider line */}
                    {idx < (menu.menuItems?.length || 0) - 1 && (
                      <motion.div
                        variants={lineVariants}
                        className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent origin-left"
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom decorative element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute bottom-8 flex flex-col items-center space-y-4"
            >
              {/* Theme Switcher in Mobile Menu */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <ThemeSwitcher />
              </motion.div>
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-purple-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                PKS Solutions
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          // Don't hide navbar if mobile menu is open
          if (!mobileMenuOpen) {
            setVisible(false);
          }
        }
      }
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!menu || !menu.menuItems) return null;

  const getPathWithoutLocale = () => {
    if (pathname.startsWith(`/${currentLocale}`)) {
      return pathname.substring(`/${currentLocale}`.length) || "/";
    }
    return pathname;
  };

  const basePath = getPathWithoutLocale();
  const homeSlugForCurrentLocale =
    currentLocale === "en" ? "home" : "startseite";

  return (
    <>
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menu={menu}
        currentLocale={currentLocale}
        homeSlugForCurrentLocale={homeSlugForCurrentLocale}
      />

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
            "fixed flex max-w-fit top-10 inset-x-0 mx-auto px-4 lg:px-8 border border-gray-200 dark:border-white/[0.2] rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-4 lg:pl-8 py-3 lg:py-4 items-center justify-center space-x-2 lg:space-x-4",
            className
          )}>
          {/* Logo Link */}
          <Link
            href={`/${currentLocale}`}
            className={cn(
              "relative items-center flex space-x-1 text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}>
            <Image
              src={menu.imageCloud?.secure_url || "/img/logopks--outline.svg"}
              alt="logo"
              width={128}
              height={32}
              className="h-5 lg:h-6 w-auto invert dark:invert-0"
            />
          </Link>

          {/* Desktop Menu Items - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-4 px-8">
            {menu.menuItems?.map((item, idx) => {
              const isHomePageLink =
                item.page.slug.current === homeSlugForCurrentLocale;
              const href = isHomePageLink
                ? `/${currentLocale}`
                : `/${currentLocale}/${item.page.slug.current}`;

              return (
                <Link
                  key={`link-${idx}`}
                  href={href}
                  className={cn(
                    "relative items-center flex space-x-1 text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-500"
                  )}>
                  <span className="text-sm">{item.displayName}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Switcher - Desktop */}
          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>

          {/* Hamburger Menu Button - Visible only on mobile */}
          <HamburgerIcon
            isOpen={mobileMenuOpen}
            toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};
