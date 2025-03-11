import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!children) {
    return null;
  }

  return (
    <html lang="de">
      <body className={` ${fontBrandRegular.className} antialiased`}>
        <div className="justify-items-center items-center grid grid-rows-[20px_1fr_10px] p-0 w-full">
          <main className="items-center sm:items-start gap-8 row-start-2 bg-black w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
