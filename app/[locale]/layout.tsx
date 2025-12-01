import type { Metadata } from "next";
import localFont from "next/font/local";
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
      <head />
      <body className={` ${fontBrandRegular.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
