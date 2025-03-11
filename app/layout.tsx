import type { Metadata } from "next";
import localFont from "next/font/local";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

import "./globals.css";
import { FloatingNav } from "./components/ui/floating-navbar";
import Footer from "./components/Footer";

const fontBrandRegular = localFont({
  src: "./fonts/borna-regular-webfont.woff2",
  variable: "--font-brand-regular",
  weight: "500",
});
// const fontBrandSemi = localFont({
//   src: "./fonts/borna-semibold-webfont.woff2",
//   variable: "--font-brand-semi",
//   weight: "500",
// });

export const metadata: Metadata = {
  title: "PKS Solutions Website",
  description: "Welcome to PKS Solutions, your partner in innovation.",
};
const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="w-4 h-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Lösungen",
    link: "/solutions",
    icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Über uns",
    link: "/about",
    icon: <IconUser className="w-4 h-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Kontakt",
    link: "/contact",
    icon: <IconMessage className="w-4 h-4 text-neutral-500 dark:text-white" />,
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={` ${fontBrandRegular.className} antialiased`}>
        <div className="justify-items-center items-center grid grid-rows-[20px_1fr_10px] p-0 w-full">
          <main className="items-center sm:items-start gap-8 row-start-2 bg-black w-full">
            <FloatingNav navItems={navItems} />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
