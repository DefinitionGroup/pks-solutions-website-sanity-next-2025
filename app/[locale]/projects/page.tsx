import { notFound } from "next/navigation";
import {
  getProjects,
  getMenuByType,
  getFooterMenu,
  getPageBySlug,
} from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "@/components/ui/glowing-stars-effect";
import Button3 from "@/components/Button3";
import { PortableText } from "@portabletext/react";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner";
import { BlogList, ClientsList, Hero, ProjectList } from "@/types/types";

// Define the page props interface
interface PageProps {
  params: { locale: string };
}

export default async function ProjectsPage(props: PageProps) {
  // Extract locale from props
  const { locale } = props.params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  const slug = "projects";

  // Fetch projects and page data with locale support
  const allProjects = await getProjects(locale, isEnabled);

  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled),
  ]);

  // Extract projectList component from page content
  const projectListComponent = page?.contentPKS?.find(
    (content: ProjectList | Hero | BlogList | ClientsList) =>
      content._type === "projectList"
  );
  // Filter projects to only show those specified in the projectList component
  let projects = allProjects;
  if (
    projectListComponent &&
    projectListComponent.projects &&
    projectListComponent.projects.length > 0
  ) {
    // Get the list of project IDs from the projectList component
    const projectIds = projectListComponent.projects.map(
      (project: any) => project._ref
    );

    // Filter the projects to only include those in the projectList
    projects = allProjects.filter((project: any) =>
      projectIds.includes(project._id)
    );

    console.log(
      `Filtered to ${projects.length} specific projects out of ${allProjects.length} total`
    );
  } else {
    console.log(
      "Using all projects as no specific projects were defined in the projectList"
    );
  }
  // Handle case where no projects are found
  if (!projects || projects.length === 0) {
    console.warn(`No projects found for locale: ${locale}`);
  }

  if (!page) {
    return notFound();
  }
  console.log(projectListComponent);
  return (
    <>
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {navbarMenu && <FloatingNav menu={navbarMenu} currentLocale={locale} />}

      <div className="container mx-auto px-4 py-40">
        {projectListComponent ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center">
              {projectListComponent.title ||
                (locale === "de" ? "Unsere Projekte" : "Our Projects")}
            </h1>

            {projectListComponent.subtitle && (
              <h2 className="text-2xl mb-8 text-center text-gray-600 dark:text-gray-300 hidden">
                {projectListComponent.subtitle}
              </h2>
            )}

            {projectListComponent.description && (
              <div className="prose dark:prose-invert mx-auto mb-12 max-w-4xl text-center">
                <PortableText
                  value={projectListComponent.description}
                  components={{
                    block: {
                      // Different styles for different block types
                      normal: ({ children }) => (
                        <p className="mb-4 text-gray-700 dark:text-gray-300 text-xl">
                          {children}
                        </p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mb-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mb-3">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold mb-2">{children}</h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                          {children}
                        </blockquote>
                      ),
                    },
                    marks: {
                      // Custom rendering for marks
                      link: ({ children, value }) => {
                        const rel = value.href.startsWith("/")
                          ? undefined
                          : "noreferrer noopener";
                        return (
                          <a
                            href={value.href}
                            rel={rel}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                          >
                            {children}
                          </a>
                        );
                      },
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                    },
                    list: {
                      // Custom rendering for lists
                      bullet: ({ children }) => (
                        <ul className="list-disc pl-5 mb-4">{children}</ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal pl-5 mb-4">{children}</ol>
                      ),
                    },
                    listItem: {
                      // Custom rendering for list items
                      bullet: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                      number: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                    },
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <h1 className="text-4xl font-bold mb-12 text-center">
            {locale === "de" ? "Unsere Projekte" : "Our Projects"}
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <GlowingStarsBackgroundCard
                key={project._id}
                className="h-full"
                backgroundImage={project.headerImage?.secure_url}
              >
                <div className="p-2 flex flex-col h-full">
                  <div className="flex-1">
                    <GlowingStarsTitle className="mb-2">
                      {project.title}
                    </GlowingStarsTitle>
                    <GlowingStarsDescription className="mb-4">
                      {project.excerpt}
                    </GlowingStarsDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories?.map((category: any) => (
                        <span
                          key={category._id}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Button3
                      text={locale === "de" ? "Mehr erfahren" : "Learn more"}
                      className="border-white/20 border-r border-l"
                      href={`/${locale}/projects/${project.slug.current}`}
                    />
                  </div>
                </div>
              </GlowingStarsBackgroundCard>
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
