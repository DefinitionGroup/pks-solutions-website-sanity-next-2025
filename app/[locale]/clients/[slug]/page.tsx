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
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/types";

// Define the page props interface
interface PageProps {
  params: { slug: string; locale: string };
}

export default async function ClientDetailPage(props: PageProps) {
  // Extract slug and locale from props
  const { slug, locale } = props.params;
  const { isEnabled } = await draftMode();

  // Fetch client and menus with locale support
  const client = await getClientBySlug(slug, locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled),
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

      <div className="container mx-auto px-4 py-30">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{client.name}</h1>

          {/* Display client logo if available */}
          {client.logo && (
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src={client.logo.secure_url}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Display client description */}
          {client.description ? (
            <div className="prose dark:prose-invert max-w-none mt-8">
              <p className="text-lg">{client.description}</p>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none mt-8">
              <p>
                {locale === "de"
                  ? "Keine Beschreibung verfügbar"
                  : "No description available"}
              </p>
            </div>
          )}

          {/* Display client website if available */}
          {client.website && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                {locale === "de" ? "Webseite" : "Website"}
              </h2>
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {client.website}
              </a>
            </div>
          )}

          {/* Display related projects if available */}
          {client.projects && client.projects.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === "de" ? "Projekte" : "Projects"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {client.projects.map((project: Project) => (
                  <Link
                    href={`/${locale}/projects/${project.slug.current}`}
                    key={project._id}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      {project.logo && (
                        <div className="w-12 h-12 relative mr-3">
                          <Image
                            src={project.logo.secure_url}
                            alt={project.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        {project.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
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
