import { notFound } from "next/navigation";
import {
  getClientBySlug,
  getAllClientSlugs,
  getMenuByType,
  getFooterMenu,
} from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import { VisualEditing } from "next-sanity/visual-editing";
import PreviewBanner from "@/components/PreviewBanner";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/types";
import { getOptimizedCloudinaryImageUrl } from "@/utils/cloudinary";
import type { Metadata } from "next";
import { absoluteUrl, truncateDescription } from "@/lib/seo";

// Define the page props interface
interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const client = await getClientBySlug(slug, locale);

  if (!client) return {};

  const title = client.name;
  const description = truncateDescription(client.description);
  const url = absoluteUrl(`/${locale}/clients/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ClientDetailPage(props: PageProps) {
  // Extract slug and locale from props
  const { slug, locale } = await props.params;
  const { isEnabled } = await draftMode();

  // Fetch client and menus with locale support
  const client = await getClientBySlug(slug, locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, "pksWeb"),
  ]);

  // Handle case where client is not found
  if (!client) return notFound();

  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      {/* Hero section with client info */}
      <div className="relative w-full min-h-[40vh] max-w-screen-2xl mx-auto mt-[8rem] mb-12 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/80" />

        <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 text-center">
          {/* Client logo */}
          {client.logo && (
            <div className="mb-8 w-40 h-40 relative bg-white/10 rounded-full p-2 backdrop-blur-sm border border-white/20 shadow-xl overflow-hidden">
              <Image
                src={getOptimizedCloudinaryImageUrl(client.logo.secure_url, {
                  width: 320,
                })}
                alt={`${client.name} logo`}
                fill
                className="object-contain "
              />
            </div>
          )}

          {/* Client name */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            {client.name}
          </h1>

          {/* Client description */}
          {client.description ? (
            <div className="prose dark:prose-invert max-w-2xl mx-auto">
              <p className="text-xl text-white/90 leading-relaxed">
                {client.description}
              </p>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-2xl mx-auto">
              <p className="text-xl text-white/70">
                {locale === "de"
                  ? "Keine Beschreibung verfügbar"
                  : "No description available"}
              </p>
            </div>
          )}

          {/* Client website */}
          {client.website && (
            <div className="mt-8">
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {locale === "de" ? "Webseite besuchen" : "Visit Website"}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Projects section */}
      {client.projects && client.projects.length > 0 && (
        <div className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === "de" ? "Projekte" : "Projects"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {client.projects.map((project: Project) => (
              <Link
                href={`/${locale}/projects/${project.slug.current}`}
                key={project._id}
                className="group relative h-[300px] overflow-hidden rounded-xl border border-white/20 bg-gray-900 transition-all duration-300 hover:shadow-xl"
              >
                {/* Card background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/90 z-10" />

                {/* Project logo */}
                <div className="absolute top-4 left-4 z-20 w-16 h-16 bg-white/10 rounded-full p-2 backdrop-blur-sm border border-white/20">
                  {project.logo ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={getOptimizedCloudinaryImageUrl(
                          project.logo.secure_url,
                          { width: 180 }
                        )}
                        alt={project.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
                      <span className="text-xl font-bold text-white">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-white/80 line-clamp-2 mb-4">
                      {project.description}
                    </p>
                  )}

                  {/* View project button */}
                  <div className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                    {locale === "de" ? "Projekt ansehen" : "View project"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 animate-spin-slow [animation-duration:4s]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Back to clients button */}
      <div className="mt-8 mb-16 text-center">
        <Link
          href={`/${locale}/clients`}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 inline-flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {locale === "de" ? "Zurück zu Kunden" : "Back to Clients"}
        </Link>
      </div>
      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}

// Generate static params for all client slugs
export async function generateStaticParams() {
  // You might want to adjust this based on your i18n strategy
  const localeToFetch = "de"; // Default locale
  const clients = await getAllClientSlugs(localeToFetch);
  return clients.map((client) => ({
    slug: client.slug,
    locale: localeToFetch,
  }));
}
