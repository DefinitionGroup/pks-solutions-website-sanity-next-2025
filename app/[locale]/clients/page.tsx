import { notFound } from "next/navigation";
import {
  getClients,
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
import {
  BlogList,
  Hero,
  ClientsList,
  ProjectList,
  ContactForm,
} from "@/types/types";

// Define the page props interface
interface PageProps {
  params: { locale: string };
}

export default async function ClientsPage(props: PageProps) {
  // Extract locale from props
  const { locale } = props.params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  const slug = "clients";

  // Fetch clients and page data with locale and channel support
  const clients = await getClients(locale, isEnabled, channel);
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);

  // Extract clientsList component from page content
  const clientsListComponent = page?.contentPKS?.find(
    (content: ClientsList | Hero | BlogList | ProjectList | ContactForm) =>
      content._type === "clientsList"
  );

  // Handle case where no clients are found
  if (!clients || clients.length === 0) {
    console.warn(
      `No clients found for locale: ${locale} and channel: ${channel}`
    );
  }

  if (!page) {
    return notFound();
  }

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
        {clientsListComponent ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center">
              {clientsListComponent.title ||
                (locale === "de" ? "Unsere Kunden" : "Our Clients")}
            </h1>

            {clientsListComponent.subtitle && (
              <h2 className="text-2xl mb-8 text-center text-gray-600 dark:text-gray-300">
                {clientsListComponent.subtitle}
              </h2>
            )}

            {clientsListComponent.description && (
              <div className="prose dark:prose-invert mx-auto mb-12 max-w-4xl text-center">
                <PortableText
                  value={clientsListComponent.description}
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
            {locale === "de" ? "Unsere Kunden" : "Our Clients"}
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <GlowingStarsBackgroundCard
                key={client._id}
                className="h-full"
                useStarsBackground={true}
              >
                <div className="p-2 flex flex-col h-full">
                  <div className="flex-1">
                    {client.logo && (
                      <div className="w-24 h-24 relative mx-auto mb-4 bg-white/10 rounded-full overflow-hidden flex items-center justify-center p-2">
                        <Image
                          src={client.logo.secure_url}
                          alt={client.name}
                          fill
                          className="object-contain "
                        />
                      </div>
                    )}
                    <GlowingStarsTitle className="mb-2 text-center">
                      {client.name}
                    </GlowingStarsTitle>
                    {client.description && (
                      <GlowingStarsDescription className="mb-4 text-center hidden">
                        {client.description}
                      </GlowingStarsDescription>
                    )}
                    {client.website && (
                      <div className="flex justify-center mb-4 hidden">
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          {client.website.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Button3
                      text={locale === "de" ? "Mehr erfahren" : "Learn more"}
                      className="border-white/20 border-r border-l"
                      href={`/${locale}/clients/${client.slug.current}`}
                    />
                  </div>
                </div>
              </GlowingStarsBackgroundCard>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              {locale === "de" ? "Keine Kunden gefunden." : "No clients found."}
            </div>
          )}
        </div>
      </div>

      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}
