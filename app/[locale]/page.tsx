import { LampDemo } from "@/components/ui/lamp";
import { PageType } from "@/types/types";
import { getFooterMenu, getPageBySlug, getMenuByType } from "@/sanity/fetchData"; // Correct order
import HeroHighlightComponent from "@/components/HeroHighLightComponent";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner";
import { notFound } from "next/navigation";
import GetDemoComponent from "@/components/GetDemoComponent";
import RenderContent from "@/components/RenderContent"; // Import RenderContent

// Define the default locale
const defaultLocale = "de";

export default async function Home() {
  const { isEnabled } = await draftMode();

  // Fetch data using the default locale 'de'
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug("home", defaultLocale, isEnabled), // Pass defaultLocale
    getMenuByType("Navbar", defaultLocale, isEnabled), // Pass defaultLocale
    getFooterMenu(defaultLocale, isEnabled), // Pass defaultLocale and isEnabled
  ]);

  // Check if page or navbarMenu for the default locale exists
  if (!page) {
    console.error(`Homepage ('home') not found for default locale: ${defaultLocale}`);
    return notFound();
  }
   if (!navbarMenu) {
     console.warn(`Navbar menu not found for default locale: ${defaultLocale}`);
     // return notFound(); // Decide if this is critical
   }
   if (!footerMenu) {
     console.warn(`Footer menu not found for default locale: ${defaultLocale}`);
   }

  const { title, content } = page;

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {/* Pass defaultLocale as currentLocale */}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={defaultLocale} />}

      {/* Use RenderContent for page content blocks */}
      {content && <RenderContent content={content} locale={defaultLocale} />}

      {/* Remove the old mapping logic */}
      {/* {content.map((block, index) => { ... })} */}

      {/* Other components specific to the homepage */}
      <div className="flex flex-col justify-center items-center w-full">
        <LampDemo />{" "}
      </div>{" "}
      <GetDemoComponent />

      {/* Pass defaultLocale as currentLocale */}
      {footerMenu && <Footer menu={footerMenu} currentLocale={defaultLocale} />}
    </>
  );
}
