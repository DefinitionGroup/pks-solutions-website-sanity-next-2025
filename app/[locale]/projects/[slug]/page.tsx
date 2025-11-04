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
import { VisualEditing } from "next-sanity/visual-editing";
import PreviewBanner from "@/components/PreviewBanner";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

// Define the page props interface
interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProjectDetailPage(props: PageProps) {
  // Extract slug and locale from props
  const { slug, locale } = await props.params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  // Fetch project and menus with locale support
  const project = await getProjectBySlug(slug, locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, "pksWeb"),
  ]);

  // Handle case where project is not found
  if (!project) return notFound();

  // Default image for projects without a header image
  const defaultHeaderImage =
    "/img/mainframe_ai_gran_canaria_landscape_with_sundown_and_lights_on__90d99f6b-17b9-43f2-b771-b91a948cf5fd (1)-gigapixel-standard-scale-6_00x.jpg";
  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      {/* Hero section with image and content overlay */}
      <div className="relative w-full h-[60vh] min-h-[500px] max-w-screen-2xl mx-auto overflow-hidden mt-[8rem] rounded-xl border border-white/20">
        <Image
          src={project.headerImage?.secure_url || defaultHeaderImage}
          alt={project.title || "Project image"}
          fill
          priority
          className="object-cover"
        />
        {/* Blur overlay for better text readability */}
        <div className="absolute inset-0  bg-black/50" />

        <div className="absolute inset-0 flex flex-col p-8 md:p-12">
          {/* Top left - Title and categories */}
          <div className="max-w-2xl mt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {project.title}
            </h1>

            {/* Categories */}
            {project.categories &&
              Array.isArray(project.categories) &&
              project.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.categories.map((category: any, index: number) => (
                    <span
                      key={category._id || index}
                      className="bg-white/20 px-3 py-1 rounded-full text-sm text-white"
                    >
                      {category.title || "Category"}
                    </span>
                  ))}
                </div>
              )}

            {/* Description below title */}
            <div className="mt-6 text-white/90">
              {project.excerpt && (
                <p className="text-xl mb-4 font-medium">{project.excerpt}</p>
              )}

              {project.description && (
                <div className="prose prose-lg prose-invert max-w-none">
                  {typeof project.description === "string" ? (
                    <p className="leading-relaxed">{project.description}</p>
                  ) : (
                    <PortableText
                      value={project.description}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="leading-relaxed mb-4">{children}</p>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-bold mt-8 mb-4">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-bold mt-6 mb-3">
                              {children}
                            </h3>
                          ),
                        },
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom right - Client information */}
          <div className="mt-auto ml-auto max-w-sm">
            {project.client && (
              <div className=" border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <Link
                  href={`/${locale}/clients/${project.client.slug.current}`}
                  className="flex items-center group  p-4 rounded-lg "
                >
                  {project.client.logo ? (
                    <div className="w-16 h-16 relative mr-4">
                      <Image
                        src={project.client.logo.secure_url}
                        alt={project.client.name}
                        fill
                        className="object-contain rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full mr-4">
                      <span className="text-xl font-bold text-white">
                        {project.client.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-lg text-white group-hover:text-blue-300 transition-colors">
                      {project.client.name}
                    </p>
                    <p className="text-white/80 text-sm">
                      {locale === "de"
                        ? "Mehr über diesen Kunden erfahren"
                        : "Learn more about this client"}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project logo if available */}
      {project.logo && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="w-32 h-32 relative mx-auto">
              <Image
                src={project.logo.secure_url}
                alt={`${project.title} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Back to projects button */}
      <div className="mt-8 mb-16 text-center">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {locale === "de"
            ? "Zurück zu allen Projekten"
            : "Back to all projects"}
        </Link>
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
