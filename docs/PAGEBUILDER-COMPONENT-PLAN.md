# PKS: Pagebuilder-Erweiterungen zur gemeinsamen Abstimmung

Stand: 5. Oktober 2026. Ursprünglicher Abstimmungsplan; Textbasis, FAQ, Text/Bild, statischer Prozessablauf und die zugehörigen Hero-/CTA-Korrekturen wurden anschließend freigegeben und lokal implementiert. Aktueller Umfang, Medienabweichung vom geplanten Produktscreenshot und Prüfgrenzen: [Pilotrecord](PAGEBUILDER-PILOT.md). Die folgenden Befunde beschreiben den Zustand vor der Umsetzung; P2-Vorschläge und die Übertragung auf weitere Seiten bleiben Planung. Keine CMS-Migration und kein Deployment. Grundlage ist [DESIGN.md](../DESIGN.md).

## Befund

Die vier neuen Fachseiten sind redaktionell gegliedert, visuell aber nahezu gleich: `hero → contentSection × 5 → zwischenTitelCta`. Das belegt die lokale Importdatei `outputs/pks-drafts-20261004/drafts.json`; die Auftragszeiterfassungsseite wurde zusätzlich in der öffentlichen Kundenvorschau bei Desktop- und Mobilbreite geprüft. Die lokale Importdatei ist ein Snapshot, keine neue CMS-Abfrage.

Auf dieser Seite ist die Wirkung nicht nur Geschmackssache: Die H2/H3 sind derzeit ebenso groß wie der Fließtext (16 px / 24 px), Absatzabstände fehlen, Links sind kaum hervorgehoben und der Text läuft auf Desktop fast über die ganze Breite. `ContentSection` erwartet `prose`-Styles, deren Typography-Plugin nicht eingerichtet ist. Das muss vor zusätzlichen Gestaltungseffekten korrigiert werden. Der rote Streifen unter der Hero-Headline ist ein weiterer Randfall: Ein leeres Highlight wird trotzdem gerendert.

Die bestehenden Produktseiten besitzen bereits asymmetrische Raster, Medienflächen, Linien-CTAs und Kontrastwechsel. Das neue System soll diesen Charakter nutzen und in besser bedienbare redaktionelle Blöcke übersetzen.

## Gestaltung und Quellen

| Entscheidung | Grundlage | Konsequenz |
|---|---|---|
| Borna, PKS-Logo, neutrale Flächen, roter Highlight-Akzent | Vorhandene Website und ausdrückliche Nutzervorgabe | Keine neue Markenwelt und keine zufällige Font-Auswahl |
| Große reale Bilder, asymmetrisches Raster, feine Linien | Bestehende PSystem-Seite; GridHero-Familie | Neue Inhaltsmodule wirken wie PKS, nicht wie zugekaufte Landingpage-Widgets |
| Sichtbare Überschriftenhierarchie, begrenzte Lesebreite | Browserbefund; Impeccable-Bestandsprüfung | Textbasis vor Interaktion reparieren |
| Unterschiedliche Kompositionen mit klarem Erzählverlauf | GPT-Taste: breite Titel, Abschnittsrhythmus, nachvollziehbarer Weg zum CTA | Keine fünffache Wiederholung eines Text-/Bild-Zickzacks |
| Tastatur, Fokus, stabile Medienabmessungen | Lokale Refero-Craft-Referenz und HTML-Semantik | Bedienung und mobile Fassung gehören zum Block, nicht in eine spätere Nacharbeit |
| Vorhandenes Framer Motion weiterverwenden | Projektabhängigkeiten; Vorrang der bestehenden Website | Keine GSAP-Installation nur zur Erfüllung eines generischen Defaults |

Referos externe Stilsuche war mit `NO_SUBSCRIPTION` nicht verfügbar. Es wurden keine externen Designreferenzen als gesehen oder übernommen behauptet. Der Impeccable-Kontext-Launcher war nicht ausführbar; der Bestand wurde direkt aus Code und Browser untersucht. Keine neuen Bildassets wurden generiert.

## Priorisierte Komponenten

### 0. Redaktioneller Textblock — bestehendes `contentSection` reparieren

**Aufgabe:** Gute Lesbarkeit für Erklärungen, Artikel und Pflichttexte. Nicht jede Passage benötigt Interaktion oder ein Bild.

**Gestaltung:** Klarer H2-Einstieg, lesbare Textspalte, echte Absätze, hervorgehobene Links und Listen. Optional Einleitung links und Text rechts im bestehenden Raster. Keine Box um den Fließtext.

**Schema:** Bestand `content` erhalten. Optional `layout: reading | introColumns` ergänzen. `containerClass` aus Kompatibilitätsgründen weiter lesen, für neue redaktionelle Eingaben nicht mehr als Standard anbieten.

**Priorität:** P0. Portable-Text-Komponenten explizit formatieren; alternativ gezielt Typography-Plugin integrieren. Erst Auswirkungen auf andere `prose`-Verwendungen prüfen. Nicht durch globale H2-Regeln alle vorhandenen Komponenten verändern.

### 1. FAQ-Accordion — neu: `faqSection`

**Aufgabe:** Konkrete Einwände beantworten und lange Fragelisten übersichtlich machen.

**Komposition:** Links ein kurzer Abschnittstitel; rechts breite Fragezeilen mit feinen Trennlinien. Plus/Minus rechts, Antwort ohne zusätzliche Karte. Mobil steht der Titel über den Fragen. Keine horizontale Hover-Akkordeonlösung.

**Sanity-Felder:** `anchorId`, `title`, optional `intro`, `items[] { _key, question, answer (Portable Text) }`. Frage und Antwort erforderlich; leere Einträge verhindern. Im Studio Vorschau über die erste Frage und Anzahl der Einträge.

**Bedienung:** Bevorzugt native `details/summary`; mehrere Fragen dürfen offen bleiben. Inhalt schon im HTML, nicht erst nach Klick laden. Bei eigener Button-Lösung `aria-expanded`, `aria-controls`, eindeutige IDs und vollständige Tastaturbedienung. Antworten inklusive Links fokussierbar. Bewegung kurz und optional; native Variante darf ohne Höhenanimation auskommen.

**SEO/Redaktion:** Fragen aus dem freigegebenen Text übernehmen. Keine Keyword-Varianten als künstliche Fragen. Kein Ranking- oder Rich-Result-Versprechen. Strukturierte Daten sind eine separate Entscheidung, nicht Voraussetzung für diesen Block.

**Priorität:** P1. Pilot Auftragszeiterfassung: die zwei bereits vorhandenen Fragen, nicht auf eine künstliche Mindestanzahl auffüllen.

### 2. Redaktionelles Text-/Bild-Modul — neu: `editorialMedia`

**Aufgabe:** Eine Erklärung unmittelbar mit einem echten Produkt- oder Anwendungsausschnitt verbinden.

**Warum ein neuer Block:** GridHero liefert die visuelle Grammatik, aber komplexe verschachtelte Felder und teilweise feste Höhen. Ein kleiner, eng geführter Inhaltsblock ist redaktionell klarer als ein weiterer GridHero mit vielen Sonderfällen.

**Komposition:** Text über fünf, Medium über sieben Spalten; Spiegelung als Variante. Große rechteckige Medienfläche ohne Kartenrahmen. Zusätzlich eine Variante `mediaWide`, bei der das Medium über der schmaleren Erläuterung steht. Kein frei konfigurierbarer Spaltenbaukasten.

**Sanity-Felder:** `anchorId`, `title`, `body (Portable Text)`, `media (cloudinary.asset)`, `mediaAlt`, optional `caption`, `layout: mediaRight | mediaLeft | mediaWide`, `mediaFit: contain | cover`, optional `cta { name, link }`. Bildbeschreibung bei informativen Bildern erforderlich; Video optional mit Poster und zugänglicher Alternative. Bestehenden `link`-Typ verwenden.

**Medienregel:** Echte Softwareansichten mit `contain`, damit Bedienoberfläche und Beschriftungen nicht abgeschnitten werden. Kontextfotografie mit kontrolliertem `cover`. Keine vertraulichen Kundendaten; für die Vorschau freigegebene Screens verwenden. Ohne geeignetes Asset Textblock verwenden, keinen beliebigen Stock-Fallback veröffentlichen.

**Mobil/Motion:** Titel → Text → Medium als sinnvolle DOM-Reihenfolge; Bilddimensionen vorab reservieren. Maximal ein sanfter Medienauftritt, keine Parallaxe als Pflicht. Text immer unabhängig von Scrollanimation lesbar.

**Priorität:** P1. Pilot: „Auftragszeiten mit PSystem erfassen“ plus echte Erfassungsansicht.

### 3. Prozessablauf — neu: `processSteps`

**Aufgabe:** Aus abstrakten Begriffen einen nachvollziehbaren Ablauf machen: Auftrag zuordnen → Tätigkeit erfassen → Zeiten auswerten, sofern durch den redaktionellen Text gedeckt.

**Komposition:** Eine zusammenhängende, offene Linienstruktur statt drei Karten. Desktop kompakte Erklärung neben den Schritten; mobil geordnete vertikale Liste. Schrittzahlen sind funktionale Reihenfolge, keine dekorativen „SECTION 01“-Labels.

**Sanity-Felder:** `anchorId`, `title`, optional `intro`, `steps[] { _key, title, body, optional media, mediaAlt }`. Empfehlung drei bis fünf kurze Schritte; keine leeren Platzhalter. Erste Version statisch und vollständig lesbar. Ein aktiv wechselndes Begleitbild erst bei tatsächlichem Erklärbedarf und passenden Assets.

**Bedienung/Motion:** In Version 1 keine Interaktion nötig, eine semantische `ol`. Falls eine interaktive Variante folgt: echte Buttons, Fokus sichtbar, kein automatischer Wechsel, keine erzwungene Scroll-Sperre. Reduced Motion zeigt den Endzustand direkt.

**SEO/Redaktion:** Jeder Schritt als kurze H3 unter einer H2. Keine erfundenen Implementierungsfristen, automatischen Integrationen oder Ergebnisgarantien.

**Priorität:** P1 nach Text/Bild und FAQ; besonders wichtig für Schnittstellen & Einführung.

### 4. Produktansichten — vorhandenes `showcaseTabs` erweitern

**Aufgabe:** Wenige zusammengehörige Ansichten eines Produkts zeigen, beispielsweise Erfassung und Auswertung, soweit echte Screens vorliegen.

**Komposition:** Ruhige Text-Tabs über einer dominanten Produktansicht. Bestehende gestapelte Kartenoptik nur als Legacy-Variante erhalten. Kein automatisches Karussell und keine versteckten Kernargumente.

**Schema-Erweiterung:** `presentation: legacyStack | productDetail` mit unverändertem Legacy-Default. Neue Tab-Felder für kurze Erklärung, Medium, Alt-Text und Caption; Bestandsdaten `modules[]` bleiben gültig. Optional Abschnittstitel ergänzen.

**Bedienung:** Tablist-/Tabpanel-Semantik, Pfeiltasten und sichtbarer Fokus. Kleine Bildschirme erhalten bedienbare, nicht abgeschnittene Tab-Auswahl; Layout wächst mit dem Inhalt statt fester Höhe. Alle Textinhalte serverseitig liefern; ein No-JS-Fallback darf Inhalte nicht unzugänglich machen.

**Priorität:** P2. Erst einsetzen, wenn mindestens zwei sinnvolle Produktansichten verfügbar sind.

### 5. Problem und Lösungsansatz — neu: `comparisonSection`

**Aufgabe:** Unterschied zwischen heutigem Ablauf und vorgeschlagenem Vorgehen verständlich machen, ohne unbewiesene Vorher-/Nachher-Erfolge zu behaupten.

**Komposition:** Offene, zeilenweise Gegenüberstellung mit zwei klar benannten Spalten und Trennlinien. Mobil bleibt jedes Paar zusammen. Keine grün-roten Häkchenwände und keine KPI-Kacheln.

**Sanity-Felder:** `title`, `leftLabel`, `rightLabel`, `rows[] { _key, topic, currentState, approach }`. Formulierungen als illustrative Situationen kennzeichnen, wenn kein konkreter Kundenfall belegt ist.

**SEO/Redaktion:** Fachbegriffe im Kontext erklären. Keine Zusatzbehauptungen wie „30 % schneller“ ohne belastbare Quelle und Freigabe.

**Priorität:** P2. Passend für Prozessoptimierung und Produktion & Verwaltung, nicht automatisch für jede Seite.

### 6. Aussage / Beleg — bestehenden `zwischenTitelCta` nutzen; Zitat später

Den vorhandenen Abschluss-CTA typografisch und semantisch konsistent einsetzen. Für eine fachliche Kernaussage genügt häufig der korrigierte Textblock mit einer hervorgehobenen Passage. Ein zusätzlicher Kundenstimmen-Block ist erst sinnvoll, wenn freigegebene Zitate, Personen und Unternehmen vorliegen. Die aktuell zurückgehaltenen Referenzvorlagen bleiben zurückgehalten.

**Priorität:** CTA P1 als Wiederverwendung; Kundenstimmen bewusst außerhalb der ersten Runde.

## Pilotseite: Auftragszeiterfassung

Empfohlene Reihenfolge, keine Freigabe zur Migration:

```text
Bestehende PKS-Navigation
    ↓
Hero: Thema + kurze Nutzenklärung + ein klarer CTA
    ↓
Redaktioneller Einstieg: Warum Auftragszeiten schwer vergleichbar sind
    ↓
Prozessablauf: Zuordnung und Buchungsregeln verständlich erklären
    ↓
Text/Bild: Auftragszeiten mit PSystem — echte Produktansicht
    ↓
Lesetext: Auswertung / Nachkalkulation und ihre fachlichen Grenzen
    ↓
FAQ: die zwei vorhandenen Fragen als Accordion
    ↓
Bestehender Abschluss-CTA → Kontakt
```

Das ist ein Wechsel zwischen Kontext, Mechanismus, Beleg und Entscheidung. Keine sechs gleichgewichteten Layout-Module. Alle bestehenden Aussagen bleiben erhalten; Kürzungen oder Änderungen der Hero-Headline werden separat redaktionell freigegeben. Die Zuordnung des Prozessablaufs aus bestehendem Text wird vor dem CMS-Umbau kontrolliert.

## Einsatzübersicht der Kundenvorschau

| Seite / Gruppe | Empfohlene Behandlung |
|---|---|
| Startseite `/de` | Bestehende Bildkomposition erhalten; ergänzten Fließtext formatieren, keine komplette Neuanordnung in Runde 1 |
| Lösungen `/de/loesungen` | Redaktioneller Einstieg plus vorhandene Produktmedien-/Linkblöcke; Textwand auflösen |
| PSystem `/de/psystems` | Text/Bild; später Produktansichten; FAQ nur mit vorhandenem, freigegebenem Inhalt |
| PMobile `/de/pmobile` | Mobiles Produktmedium im Text-/Bild-Block; bestehende Medienblöcke nicht doppeln |
| AVATR `/de/avatr` | Vorhandene Raster konsolidieren; reale Analyseansicht; keine erfundenen KI-Ergebnisversprechen |
| Über uns `/de/ueber-uns` | Bestehende Komposition; gegebenenfalls echtes Team-/Arbeitsbild statt neuer Feature-Module |
| Kontakt `/de/kontakt-zu-uns` | Bestehendes Formular; gut formatierte Kontaktinformationen; keine Effekterweiterung |
| Impressum `/de/impressum` | Nur lesbare redaktionelle Typografie, keine Marketingblöcke |
| Auftragszeiterfassung `/de/auftragszeiterfassung-produktion` | Pilot mit Text/Bild, Prozessablauf, FAQ und bestehendem CTA |
| Prozessoptimierung `/de/prozessoptimierung-mittelstand` | Vergleich Problem/Lösungsansatz, Text/Bild, FAQ aus vorhandenem Text |
| Produktion & Verwaltung `/de/prozesse-produktion-verwaltung` | Zwei nachvollziehbare Anwendungsbereiche; Text/Bild oder paarweise Gegenüberstellung, nicht dieselbe Pilotdramaturgie kopieren |
| Schnittstellen & Einführung `/de/schnittstellen-und-einfuehrung` | Prozessablauf als Hauptmodul, ein fachliches Medium, FAQ |
| Wissen `/de/blog` | Lesbarer Einstieg und vorhandene `blogList` prüfen/nutzen statt einer reinen Link-Textwand |
| Drei Wissensartikel: Prozesskennzahlen, Planzeitermittlung, Auftragszeiten | Gemeinsame Artikeltypografie; passende Abbildung bei vorhandenen Assets; die Artikel nutzen einen eigenen Renderer und erben Pagebuilder-Änderungen nicht automatisch |

## Sanity- und Implementierungsgrenzen

- Neue Blöcke nur im PKS-Kanal registrieren: Schema-Index, `page.contentPKS`, Types, GROQ-Projektionen und `RenderContent` zusammen prüfen.
- Bestehende Hero-Unterblöcke besitzen einen eigenen Switch. Neue redaktionelle Blöcke zunächst nur auf Seitenebene anbieten, nicht ohne Bedarf zusätzlich dort verschachteln.
- Vorhandene `_type`, Dokument-IDs, Slugs, Links und Block-Keys nicht unkontrolliert ersetzen. Neue Felder optional oder mit abwärtskompatiblem Default.
- Interne Links über vorhandenen `link`-Typ und `resolveSanityLink`; Bild-/Videodaten über vorhandene Cloudinary-Helfer. Keine zusätzlichen Asset-Systeme.
- Redaktionsfreundliche deutsche Namen, Feldbeschreibungen, Varianten-Auswahl und aussagekräftige Block-Vorschau. Keine freien CSS-Eingaben für neue Blöcke.
- Bei späterer Migration: Backup, Dry-Run mit Absatz-/Link-Abgleich, Review einer Pilotseite, Revision-Guard, nur Drafts. Veröffentlichung und neues Deployment sind getrennte Freigaben.
- Nicht nebenbei vorhandene AVTR-Blöcke, Authentifizierung, Vercel-Projekte oder öffentliche Navigation verändern.

## Abnahme der späteren Umsetzung

1. H1/H2/H3, Absätze und Links unterscheiden sich sichtbar; Hauptinhalt bleibt ohne Animation lesbar.
2. Desktop (1280/1440 px), mobile Breite (390 px) und enger Grenzfall (320 px): kein abgeschnittener Text, kein versteckter horizontaler Overflow.
3. Hell/Dunkel, Tastatur, sichtbarer Fokus, reduzierte Bewegung und lange echte deutsche Inhalte geprüft.
4. Medien zeigen echte, freigegebene Inhalte; keine unabsichtlichen Zuschnitte oder Layoutsprünge.
5. FAQ-Inhalte sind bereits im HTML; Interaktion funktioniert ohne Maus. Produkt-Tabs nur mit vollständiger Bedienung.
6. Bestehende Seiten und Legacy-Varianten unverändert; Typecheck, Lint und relevante Renderer-/Schema-Prüfungen bestehen.
7. Keine Aussage über SEO-Rankinggewinne aus einer reinen Layoutänderung ableiten. Vorschau bleibt nicht indexierbar; Live-SEO wird erst für eine freigegebene Veröffentlichung geprüft.

## Gemeinsame Entscheidung als nächster Schritt

Empfehlung: Zuerst Textbasis, FAQ und Text/Bild als kleine Familie abstimmen. Danach den Prozessablauf auf der Pilotseite ergänzen. Erst nach Sichtprüfung dieser einen Seite auf weitere Fachseiten übertragen. Benötigt werden ein freigegebener PSystem-Screenshot und die Bestätigung der Pilotseite. Ohne Screenshot können Textbasis und FAQ dennoch gestaltet werden.

Diese Planung verändert weder die redaktionellen Texte noch Sanity-Drafts oder die veröffentlichte Website.
