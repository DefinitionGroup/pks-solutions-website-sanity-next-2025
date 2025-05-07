import { getClients, getMenuByType, getFooterMenu } from "@/sanity/fetchData";
import { draftMode } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import { VisualEditing } from "next-sanity";
import PreviewBanner from "@/components/PreviewBanner";
import Image from "next/image";
import Link from "next/link";

// Define the page props interface
interface PageProps {
  params: { locale: string };
}

export default async function ClientsPage(props: PageProps) {
  // Extract locale from props
  const { locale } = props.params;
  const { isEnabled } = await draftMode();

  // Fetch clients and menus with locale support
  const clients = await getClients(locale, isEnabled);
  const [navbarMenu, footerMenu] = await Promise.all([
    getMenuByType("Navbar", locale, isEnabled),
    getFooterMenu(locale, isEnabled),
  ]);

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center">
            {locale === "de" ? "Unsere Kunden" : "Our Clients"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client) => (
              <Link
                href={`/${locale}/clients/${client.slug.current}`}
                key={client._id}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center">
                  {client.logo && (
                    <div className="w-24 h-24 relative mb-4">
                      <Image
                        src={client.logo.secure_url}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-center mb-2">{client.name}</h2>
                  {client.description && (
                    <p className="text-center text-gray-600 dark:text-gray-300 line-clamp-3">
                      {client.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {footerMenu && <Footer menu={footerMenu} currentLocale={locale} />}
    </>
  );
}