// Never enable customer drafts on a production deployment, even if the flag leaks.
export function isCustomerPreview() {
  return process.env.VERCEL_ENV === 'preview' && process.env.PKS_CUSTOMER_PREVIEW === '1';
}

export const customerPreviewGroups = [
  {
    title: 'Neue Themenseiten',
    pages: [
      ['Auftragszeiterfassung', '/de/auftragszeiterfassung-produktion'],
      ['Prozessoptimierung im Mittelstand', '/de/prozessoptimierung-mittelstand'],
      ['Prozesse in Produktion und Verwaltung', '/de/prozesse-produktion-verwaltung'],
      ['Schnittstellen und Einführung', '/de/schnittstellen-und-einfuehrung'],
    ],
  },
  {
    title: 'Neue Wissensartikel',
    pages: [
      ['Prozesskennzahlen sinnvoll einsetzen', '/de/blog/prozesskennzahlen-produktion'],
      ['Planzeitermittlung mit Regressionsanalyse', '/de/blog/planzeitermittlung-regressionsanalyse'],
      ['Auftragszeiten richtig erfassen', '/de/blog/auftragszeiten-richtig-erfassen'],
    ],
  },
  {
    title: 'Überarbeitete Seiten',
    pages: [
      ['Startseite', '/de'],
      ['Lösungen', '/de/loesungen'],
      ['PSystem', '/de/psystems'],
      ['PMobile', '/de/pmobile'],
      ['AVATR', '/de/avatr'],
      ['Über uns', '/de/ueber-uns'],
      ['Kontakt', '/de/kontakt-zu-uns'],
      ['Wissen', '/de/blog'],
      ['Impressum', '/de/impressum'],
    ],
  },
] as const;
