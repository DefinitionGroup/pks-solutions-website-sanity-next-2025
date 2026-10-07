import { notFound } from 'next/navigation';
import { stegaClean } from 'next-sanity';
import type { Metadata } from 'next';
import { getPageBySlug, getMenuByType, getFooterMenu } from '@/sanity/fetchData';
import { composePagebuilderPilot } from '@/lib/pagebuilder-pilot';
import RenderContent from '@/components/RenderContent';
import { FloatingNav } from '@/components/ui/floating-navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Lokaler Pagebuilder-Entwurf | PKS', robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Never expose this composition or fetch drafts from it in deployed builds.
  if (process.env.NODE_ENV !== 'development' || locale !== 'de') notFound();
  const [page, navigation, footer] = await Promise.all([
    getPageBySlug('auftragszeiterfassung-produktion', locale, 'pksWeb', true),
    getMenuByType('Navbar', locale, true),
    getFooterMenu(locale, true, 'pksWeb'),
  ]);
  if (!page || page.protected) notFound();
  const content = composePagebuilderPilot(stegaClean(page.contentPKS));
  return <>
    {navigation && <FloatingNav menu={navigation} currentLocale={locale} />}
    <RenderContent contentPKS={content} locale={locale} />
    {footer && <Footer menu={footer} currentLocale={locale} />}
  </>;
}
