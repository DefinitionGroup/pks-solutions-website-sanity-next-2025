import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PKS Solutions | Intelligenter arbeiten statt schneller",
    template: "%s | PKS Solutions",
  },
  description:
    "PKS Solutions liefert Softwarelösungen für Zeiterfassung, Prozessoptimierung und datengetriebene Entscheidungen in Fertigung und Verwaltung.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "PKS Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  if (!children) {
    return null;
  }

  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
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
