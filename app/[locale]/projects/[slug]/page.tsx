import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAllProjectSlugs,
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

// Define the page props interface
interface PageProps {
  params: { slug: string; locale: string };
}

export default async function ProjectDetailPage(props: PageProps) {
  // Extract slug and locale from props
  const { slug, locale } = props.params;
  const { isEnabled } = await draftMode();

  // Fetch project and menus with locale support
  const project = await getProjectBySlug(slug, locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled),
  ]);

  // Handle case where project is not found
  if (!project) return notFound();

  // Debug the project structure
  console.log("Project structure:", JSON.stringify(project, null, 2));

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
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

          {/* Display project logo if available */}
          {project.logo && (
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src={project.logo.secure_url}
                  alt={`${project.title} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Display header image if available */}
          {project.headerImage && (
            <div className="relative h-96 w-full mb-8">
              <Image
                src={project.headerImage.secure_url}
                alt={project.title || "Project image"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* Handle categories safely */}
          {project.categories &&
            Array.isArray(project.categories) &&
            project.categories.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {locale === "de" ? "Kategorien" : "Categories"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category: any, index: number) => (
                    <span
                      key={category._id || index}
                      className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category.title || "Category"}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Display project description */}
          {project.description ? (
            <div className="prose dark:prose-invert max-w-none mt-8">
              <p className="text-lg">{project.description}</p>
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
          
          {/* Handle client reference properly with link to client page */}
          {project.client && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                {locale === "de" ? "Kunde" : "Client"}
              </h2>
              <Link 
                href={`/${locale}/clients/${project.client.slug.current}`}
                className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
              >
                {project.client.logo && (
                  <div className="w-10 h-10 relative mr-3">
                    <Image
                      src={project.client.logo.secure_url}
                      alt={project.client.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                )}
                <p className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {project.client.name}
                </p>
              </Link>
            </div>
          )}
        </article>
      </div>

      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}

// Generate static params for all project slugs
export async function generateStaticParams() {
  // You might want to adjust this based on your i18n strategy
  const localeToFetch = "de"; // Default locale
  const projects = await getAllProjectSlugs(localeToFetch);
  return projects.map((project) => ({
    slug: project.slug,
    locale: localeToFetch,
  }));
}
