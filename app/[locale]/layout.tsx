import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import {
  DEFAULT_DESCRIPTION,
  HOME_TITLE,
  SITE_URL,
  absoluteUrl,
  isSupportedLocale,
} from "@/lib/seo";
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
    default: HOME_TITLE,
    template: "%s | PKS Solutions",
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "PKS Solutions",
    locale: "de_DE",
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
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "PKS Solutions",
        url: SITE_URL,
        logo: absoluteUrl("/img/logopks--outline.svg"),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "PKS Solutions",
        inLanguage: "de-DE",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
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
          <div className="justify-items-center items-center grid grid-rows-[1fr_10px] p-0 w-full">
            <main className="items-center sm:items-start gap-8 row-start-1 dark:bg-black w-full">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
