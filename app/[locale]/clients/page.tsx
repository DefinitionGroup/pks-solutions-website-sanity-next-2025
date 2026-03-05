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
import Image from "next/image";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "@/components/ui/glowing-stars-effect";
import Button3 from "@/components/Button3";
import { VisualEditing } from "next-sanity/visual-editing";
import PreviewBanner from "@/components/PreviewBanner";
import { ClientsList, Client } from "@/types/types";
import { getOptimizedCloudinaryImageUrl } from "@/utils/cloudinary";

// Define the page props interface
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ClientsPage(props: PageProps) {
  // Extract locale from props
  const { locale } = await props.params;
  const { isEnabled } = await draftMode();
  const channel = "pksWeb";
  const slug = "clients";

  // Fetch clients and page data with locale and channel support
  const allClients = await getClients(locale, isEnabled, channel);
  const [page, navbarMenu, footerMenu] = await Promise.all([
    getPageBySlug(slug, locale, channel, isEnabled),
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled, channel),
  ]);

  if (!page) return notFound();

  // Extract clientsList slice
  const clientsSlice = page.contentPKS?.find(
    (slice) => slice._type === "clientsList"
  ) as ClientsList | undefined;

  // All clients are already filtered by channel in fetch
  const clients: Client[] = allClients;

  // Plain-text description
  const description: string | undefined = clientsSlice?.description;

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
        {clientsSlice ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center">
              {clientsSlice.title ||
                (locale === "de" ? "Unsere Kunden" : "Our Clients")}
            </h1>

            {clientsSlice.subtitle && (
              <h2 className="text-2xl mb-8 text-center text-gray-600 dark:text-gray-300">
                {clientsSlice.subtitle}
              </h2>
            )}

            {description && (
              <p className="mb-12 text-center text-gray-700 dark:text-gray-300 text-xl">
                {description}
              </p>
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
                          src={getOptimizedCloudinaryImageUrl(
                            client.logo.secure_url,
                            { width: 256 }
                          )}
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
