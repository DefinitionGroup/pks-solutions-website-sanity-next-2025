import { notFound } from "next/navigation";
import { getProjects, getMenuByType, getFooterMenu } from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

// Define the page props interface
interface PageProps {
  params: { locale: string };
}

export default async function ProjectsPage(props: PageProps) {
  // Extract locale from props
  const { locale } = props.params;
  const { isEnabled } = await draftMode();

  // Fetch projects and menus with locale support
  const projects = await getProjects(locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled),
  ]);

  // Handle case where no projects are found
  if (!projects || projects.length === 0) {
    console.warn(`No projects found for locale: ${locale}`);
  }

  return (
    <>
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      <div className="container mx-auto px-4 py-40">
        <h1 className="text-4xl font-bold mb-12 text-center">
          {locale === "de" ? "Unsere Projekte" : "Our Projects"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                {project.mainImage && (
                  <div className="relative h-48 w-full">
                    {/* <Image
                      src={urlForImage(project.mainImage).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories?.map((category: any) => (
                      <span
                        key={category._id}
                        className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/projects/${project.slug.current}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {locale === "de" ? "Mehr erfahren" : "Learn more"}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              {locale === "de"
                ? "Keine Projekte gefunden."
                : "No projects found."}
            </div>
          )}
        </div>
      </div>

      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}
