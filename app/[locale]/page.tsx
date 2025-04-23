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

// Define props to receive params
interface HomeProps {
  params: { locale: string };
}

// Update the function signature to accept props
export default async function Home({ params }: HomeProps) {
  const { locale } = params; // Get locale from params
  const { isEnabled } = await draftMode();

  // Determine the correct homepage slug based on the locale
  const homepageSlug = locale === "en" ? "home" : "startseite";

  // Fetch data using the determined slug and the locale from params
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(homepageSlug, locale, isEnabled), // Use dynamic slug and locale
    getMenuByType("Navbar", locale, isEnabled), // Pass locale from params
    getFooterMenu(locale, isEnabled), // Pass locale from params and isEnabled
  ]);

  // Check if page or navbarMenu for the specific locale exists
  if (!page) {
    console.error(`Homepage ('${homepageSlug}') not found for locale: ${locale}`);
    return notFound();
  }
   if (!navbarMenu) {
     console.warn(`Navbar menu not found for locale: ${locale}`); // This logs the warning if 'en' Navbar is missing
     // return notFound(); // Decide if this is critical
   }
   if (!footerMenu) {
     console.warn(`Footer menu not found for locale: ${locale}`); // This logs the warning if 'en' Footer is missing
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
      {/* Pass locale from params as currentLocale */}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      {/* Use RenderContent for page content blocks, passing the locale */}
      {content && <RenderContent content={content} locale={locale} />}

      {/* Other components specific to the homepage */}
      <div className="flex flex-col justify-center items-center w-full">
        <LampDemo />{" "}
      </div>{" "}
      <GetDemoComponent />

      {/* Pass locale from params as currentLocale */}
      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}
