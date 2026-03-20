import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "../globals.css";

const fontBrandRegular = localFont({
  src: "../fonts/borna-regular-webfont.woff2",
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
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          strategy="beforeInteractive"
          data-cbid="6eb88f68-48a9-4980-98b6-97f74d415df6"
          data-blockingmode="auto"
          type="text/javascript"
        />
      </head>
      <body className={` ${fontBrandRegular.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <div className="justify-items-center items-center grid grid-rows-[1fr_10px] p-0 w-full">
              <main className="items-center sm:items-start gap-8 row-start-1 dark:bg-black w-full">
                {children}
              </main>
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
