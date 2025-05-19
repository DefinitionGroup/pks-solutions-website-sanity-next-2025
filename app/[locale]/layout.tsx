import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="de">
        <head>
          {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
        </head>
        <body className={` ${fontBrandRegular.className} antialiased`}>
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
          <div className="justify-items-center items-center grid grid-rows-[1fr_10px] p-0 w-full">
            <main className="items-center sm:items-start gap-8 row-start-1 bg-black w-full">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
