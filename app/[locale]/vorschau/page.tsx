import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { notFound } from 'next/navigation';
import { customerPreviewGroups, isCustomerPreview } from '@/lib/customer-preview';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: { absolute: 'Redaktionelle Kundenvorschau | PKS Solutions' },
  robots: { index: false, follow: false },
};

export default function CustomerPreview() {
  if (!isCustomerPreview()) notFound();

  return (
    <div className="bg-dot-thick-neutral-300/15 px-6 pb-28 pt-12 sm:px-12 sm:pt-20">
      <div className="mx-auto max-w-5xl">
        <Logo className="mb-12 h-10" priority />
        <h1 className="max-w-3xl text-balance text-4xl leading-tight sm:text-5xl">Die neuen Texte. Alle Seiten im Überblick.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">Prüfen Sie die redaktionellen Entwürfe direkt im Website-Layout. Alle 16 Seiten zeigen automatisch den aktuellen Draft-Stand aus Sanity. Es wurde nichts veröffentlicht.</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-75">Inhaltliche Änderungen erscheinen beim erneuten Laden. Das Kontaktformular versendet in dieser Vorschau keine Nachrichten. Die drei noch nicht freigegebenen Referenzvorlagen sind nicht enthalten.</p>
        <div className="mt-14 space-y-12">
          {customerPreviewGroups.map(group => (
            <section key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-2xl">{group.title}</h2>
              <ul className="divide-y divide-current/15 border-y border-current/15">
                {group.pages.map(([title, href]) => (
                  <li key={href}>
                    <Link href={href} prefetch={false} className="flex min-h-14 items-center justify-between gap-6 py-4 transition-colors hover:text-yellow-700 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-yellow-400">
                      <span>{title}</span><span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
