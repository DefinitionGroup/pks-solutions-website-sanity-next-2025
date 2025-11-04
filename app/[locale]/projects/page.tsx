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

import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "@/components/ui/glowing-stars-effect";
import Button3 from "@/components/Button3";
import { PortableText } from "@portabletext/react";
import { VisualEditing } from "next-sanity/visual-editing";
import PreviewBanner from "@/components/PreviewBanner";
import { Project, ProjectList } from "@/types/types";

// Define the page props interface
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage(props: PageProps) {
  // Extract locale from props
  const { locale } = await props.params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  const slug = "projects";

  // Fetch projects and page data with locale support
  const allProjects = await getProjects(locale, isEnabled, channel);

  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled),
  ]);

  if (!page) {
    return notFound();
  }

  // Extract the projectList slice
  const projectList = page.contentPKS?.find(
    (slice) => slice._type === "projectList"
  ) as ProjectList | undefined;

  // All projects are already filtered by channel in fetch
  const projects: Project[] = allProjects;

  // Plain text description
  const description = projectList?.description;
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
        {projectList ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center">
              {projectList.title ||
                (locale === "de" ? "Unsere Projekte" : "Our Projects")}
            </h1>

            {projectList.subtitle && (
              <h2 className="text-2xl mb-8 text-center text-gray-600 dark:text-gray-300 hidden">
                {projectList.subtitle}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="mb-12 text-center text-gray-700 dark:text-gray-300 text-xl">
                {description}
              </p>
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
