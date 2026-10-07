---
name: PKS Solutions
description: Bestehendes PKS-Webdesign als Grundlage für Pagebuilder-Erweiterungen
colors:
  background: "#ffffff"
  foreground: "#171717"
  background-dark: "#000000"
  foreground-dark: "#ededed"
  highlight-start: "oklch(80.8% 0.114 19.571)"
  highlight-end: "oklch(63.7% 0.237 25.331)"
  border-dark: "rgb(255 255 255 / 0.2)"
  editorial-muted: "#525252"
  editorial-line: "#d4d4d4"
  editorial-surface: "#f5f5f5"
  editorial-muted-dark: "#bdbdbd"
  editorial-line-dark: "#404040"
  editorial-surface-dark: "#141414"
typography:
  display-desktop:
    fontFamily: "Borna, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.625
  body:
    fontFamily: "Borna, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Borna, sans-serif"
    fontSize: "0.875rem"
    lineHeight: "1.25rem"
  editorial-title:
    fontFamily: "Borna, sans-serif"
    fontSize: "clamp(1.8rem, 3.2vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  editorial-body:
    fontFamily: "Borna, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.7
rounded:
  content: "0px"
  navigation: "9999px"
spacing:
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  12: "3rem"
  24: "6rem"
components:
  content-surface:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.content}"
  content-surface-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.content}"
  button2-desktop:
    rounded: "{rounded.content}"
    padding: "1rem"
    height: "3.5rem"
  editorial-section:
    textColor: "{colors.foreground}"
    padding: "clamp(3.5rem, 7vw, 7rem) clamp(1rem, 3vw, 3rem)"
  editorial-prose:
    typography: "{typography.editorial-body}"
  editorial-heading:
    typography: "{typography.editorial-title}"
---

# Design System: PKS Solutions

## Overview

Stand: 5. Oktober 2026. Bestandsaufnahme mit der freigegebenen, lokal implementierten redaktionellen Pagebuilder-Erweiterung; kein Redesign. Die Werte beschreiben die vorhandene Implementierung. Die neuen Editorial-Farbvariablen sind im CSS-Modul gemeinsam implementiert, die übrigen dokumentierten Tokens noch keine zentrale Token-Bibliothek. Produktkontext: `PRODUCT.md`; Pilot, Prüfumfang und Bereitstellungsgrenzen: `docs/PAGEBUILDER-PILOT.md`.

Die ergänzende `.impeccable/design.json` enthält acht dokumentarische Komponentenbeispiele. Diese sind kein Ersatz für die React-Komponenten. Neutrale Tonwertreihen darin sind synthetische Darstellungshilfen; die rote Reihe stammt aus Tailwind. Daraus entstehen keine neuen freigegebenen Farben. Vereinfachte Vorschauzustände sind jeweils gekennzeichnet; eine Darstellung im Impeccable-Panel wurde nicht geprüft.

**Creative North Star: "Präzise Prozesse, sichtbar gemacht"** — vorläufige Beschreibung zur Abstimmung, keine neu beschlossene Markenpositionierung.

PKS verbindet industrielle Bildwelten mit einer sachlichen, geometrischen Typografie. Große Medienflächen, asymmetrische Spalten und feine Rasterlinien tragen die Gestaltung. Inhaltliche Abwechslung entsteht durch den Wechsel von Bild, Erklärung und konkretem Produktbezug, nicht durch zusätzliche Dekoration.

Die vorhandene Identität bleibt verbindlich: PKS-Logo, Borna, monochrome Grundflächen, gezielte rote Hervorhebungen und die bestehende schwebende Navigation. Neue Blöcke sollen diesen Bestand ergänzen. Hell- und Dunkelmodus bleiben gleichwertig.

**Key Characteristics:**

- Borna für Überschriften, Fließtext und Navigation.
- Großflächige reale Medien statt dekorativer Kachelwände.
- Asymmetrisches Zwölfspaltenraster mit feinen Trennlinien.
- Eckige Inhaltsflächen; abgerundete Navigation als bestehende Ausnahme.
- Zurückhaltende, funktionale Bewegung mit der vorhandenen Motion-Bibliothek.

Quellen: `app/globals.css`, `app/[locale]/layout.tsx`, `components/HeroHighLightComponent.tsx`, `components/ui/hero-highlight.tsx`, `components/Content/GridHero*.tsx`, `components/Button2.tsx`, `components/Content/ZwischenTitelCta.tsx`, `components/ui/floating-navbar.tsx`, `components/ContactForm.tsx`. Visuell geprüft: bestehende Produktseite `/de/psystems` und neue Kundenvorschau `/de/auftragszeiterfassung-produktion`, deren Textbereich auch bei 390 px Breite.

## Colors

Die Grundpalette ist neutral; Rot markiert einzelne Aussagen. Farben aus Bildmaterial sind keine zusätzlichen UI-Markenfarben.

### Primary

- **Roter Hervorhebungsverlauf:** `highlight-start` bis `highlight-end`, aus den eingesetzten Tailwind-v4-Farben red-300 und red-500. Bestehende Anwendung: Hintergrund einer kurzen hervorgehobenen Hero-Textpassage.
- **Roter CTA-Vorspann:** bestehend red-600 im hellen und red-500 im dunklen Modus. Der eigentliche CTA bleibt ein zurückhaltender Linien-Button.

### Neutral

- `background` / `foreground`: globale helle Oberfläche und Schrift.
- `background-dark` / `foreground-dark`: globale dunkle Oberfläche und Schrift.
- Komponenten verwenden zusätzlich gray-900 für Titel, gray-600 für Fließtext und gray-200/300 für helle Linien; dunkel häufig Weiß und `border-dark`.
- Editorial-Blöcke verwenden gemeinsam die `editorial-muted`, `editorial-line` und `editorial-surface`-Tokens sowie ihre dunklen Varianten. Die Textfarbe folgt `foreground` beziehungsweise `foreground-dark`; diese gekapselte Ergänzung ersetzt keine Bestandsfarben.
- Das Punktraster nutzt neutrale Punkte mit 15 % Deckkraft. Indigo erscheint im bestehenden Maus-Spotlight, nicht als primäre Flächenfarbe.

Die goldene Kundenvorschau-Leiste ist ein Betriebsstatus, kein Markenakzent. Vorhandene lila/blaue Effekte im mobilen Menü werden als Bestand anerkannt, aber nicht ohne Entscheidung auf neue Inhaltsblöcke übertragen.

## Typography

**Display Font / Body Font:** Borna. Lokal eingebunden über `borna-regular-webfont.woff2`, registriert mit Gewicht 500. Next.js erzeugt den tatsächlichen CSS-Familiennamen; `Borna, sans-serif` in den Tokens ist die lesbare Bezeichnung, kein Ersatz für die bestehende Font-Einbindung. Die Arial-Angabe in globals.css ist nicht die tatsächlich gerenderte Markenschrift.

### Hierarchie im Bestand

- Hero: mobil 36 px; je nach Breakpoint 30–48 px. Bei 1280 px wurden 48 px und 78 px Zeilenhöhe gemessen. Einige Komponenten verwenden synthetisches Bold; weitere Font-Dateien sind dadurch nicht belegt.
- Große Abschnittstitel: je nach Block 24–60 px; `GridHero` und `GridHero3` besitzen unterschiedliche Skalen.
- Fließtext: meist 16–18 px; besondere Einleitungen bis 24 px.
- Navigation und CTA: meist 14 px; kleinere CTA-Variante 12 px.

### Implementierte redaktionelle Typografie

`ContentSection` und die neuen redaktionellen Blöcke verwenden `EditorialText` mit explizit gekapselten Regeln aus `components/Content/editorial.module.css`. Sie benötigen kein Typography-Plugin. Die gemeinsame Lesebreite beträgt maximal 68ch; Absatzabstände, Listen, unterstrichene Links und sichtbarer Tastaturfokus sind implementiert. Die Tokens `editorial-title` und `editorial-body` gelten für diese Familie, nicht als neue globale Überschriften- oder Textskala.

Portable-Text-H2/H3 erhalten eigene Größen und Abstände. Eine H1 pro Seite; Unterüberschriften nach Inhalt statt nach gewünschter Schriftgröße wählen. Lange deutsche Titel dürfen mobil sinnvoll umbrechen; niemals abschneiden oder für eine starre Zeilenzahl unlesbar verkleinern. Editorial-Texte verwenden `overflow-wrap: anywhere`; der bestehende Hero unterstützt Wortumbruch und automatische Silbentrennung.

## Layout

- Der globale Container hat eine maximale Breite von 96 rem. Medien können innerhalb der bestehenden Gesamtkomposition die volle verfügbare Breite einnehmen.
- Vorhandene Inhaltsraster arbeiten mit zwölf Spalten und asymmetrischen Teilungen, etwa Text über fünf und Medium über sieben Spalten.
- Übliche Innenabstände: 16 px mobil, 24–32 px auf größeren Flächen. Größere Kapitel verwenden unter anderem 96 px vertikalen Abstand.
- Responsive Schwellen aus den verwendeten Tailwind-Klassen: 640, 768, 1024, 1280 und 1536 px. Mehrspaltige Inhalte werden auf kleinen Geräten gestapelt; das Desktop-Menü beginnt bei 1024 px.
- Der bestehende HeroWrapper reserviert oben Platz für die Navigation: 80 / 112 / 160 px nach Breakpoint.
- Das neutrale Punktraster hat 24 px Abstand und 1 px Punktradius. Es ist Hintergrundatmosphäre, kein Ersatz für reales Bildmaterial.
- Die Editorial-Familie übernimmt die Containerbreite und verwendet den gemeinsamen Abstand aus `editorial-section`. Ab 768 px teilen Einleitung, FAQ und Text/Bild die verfügbare Breite im Verhältnis 5:7; mobil stehen sie untereinander. Prozessschritte nutzen ein offenes, automatisch umbrechendes Raster mit mindestens 18 rem pro Spalte.

Für Erweiterungen: ein inhaltlicher Zweck pro Abschnitt. Abfolge von Erklärung, Medium, Ablauf und Entscheidung; nicht jede Seite mit identischen Abschnitten füllen. Text/Bild darf gespiegelt werden, aber keine endlose Links-rechts-Zickzackfolge. Die erste Ansicht bleibt eine zusammenhängende, bildgeführte PKS-Komposition ohne zusätzliche Badge-, Statistik- oder Kartenansammlungen.

## Elevation & Depth

Inhalte sind überwiegend flach. Tiefe entsteht über Medien, Kontrast und Linien. Die Navigation ist die bewusste Ausnahme: transparente Oberfläche mit Blur und einem weichen mehrteiligen Schatten. Einzelne bestehende Medienkarten besitzen Schatten; daraus folgt keine allgemeine Schattenpflicht für neue Blöcke.

Der vorhandene Navigationsschatten lautet `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`.

## Shapes

Inhaltsraster, Medienflächen und Linien-CTAs haben überwiegend gerade Kanten und 1-px-Linien. Die schwebende Navigation und der Theme-Schalter sind vollständig gerundet. Diese Ausnahme nicht auf jede Sektion übertragen. Bestehende SciFi-Rahmen können gezielt technische Struktur vermitteln; nicht jedes neue Modul damit einrahmen.

## Components

### Hero / HeroHighlight

Großflächiges Video, weiße Headline, kurze Beschreibung, Linien-CTA. Rote Hervorhebung als bestehendes Signaturdetail. Der Inhalt liegt über dem Medium; keine zusätzlichen schwebenden Werbeelemente. Ein nach Bereinigung leerer `highlightText` rendert weder Hervorhebung noch zusätzlichen Zeilenumbruch. Lange Titel können umbrechen.

### Button2 / Button3

Eckiger Linien-Link mit Pfeil, Desktop-Höhe 56 px, bei Button2 mobil 48 px. Beim Hover gleitet die zweite Darstellung nach oben. Bestehende Implementierungen duplizieren den Link im DOM; neue Varianten sollen diese Optik erhalten, aber nur ein fokussierbares Link-Ziel besitzen. Fokus sichtbar und Bewegung bei reduzierter Animation deaktivierbar machen; nicht als bereits vorhanden voraussetzen.

### GridHero / GridHero2 / GridHero3

Vorhandene Text-/Medien-Kompositionen, kein Bedarf für einen zweiten generischen Grid-Baukasten. GridHero kombiniert große Typografie mit einem Medium; GridHero2 enthält Text und Logos; GridHero3 ordnet Erklärung um eine zentrale Medienfläche an. Für verständliche redaktionelle Bedienung sind enger geführte Varianten sinnvoll. Einzelne feste Höhen, Spaltenpositionen und Überschriftenebenen sind vor Wiederverwendung zu prüfen.

### ShowcaseTabs

Bereits vorhanden in Schema und Renderer. Aktuell Tabs mit `card3`-Modulen, gestapelter Medienoptik und festen Höhen. Für Produktdetails gezielt erweitern, nicht parallel ein identisches Tab-System bauen. Tastatursteuerung, Lesereihenfolge, geringe Bildschirmhöhe und flexible Textlängen sind vor Übernahme zu prüfen.

### ContentSection

Explizit formatierter Portable Text mit `reading` als zentrierter Lesespalte und `introColumns` als zweispaltiger Einleitung, wenn der erste Block eine H2 ist. Ohne diese H2 fällt die Ausgabe auf die Lesespalte zurück. Alte `containerClass`-Werte bleiben kompatibel; neue redaktionelle Eingaben verwenden benannte Varianten.

### FaqSection

Native `details/summary` unter einer H2, jede Frage als H3. Links Abschnittstitel und optionaler Einstieg, rechts offene Fragezeilen mit dünnen Trennlinien; mobil gestapelt. Mehrere Antworten können geöffnet bleiben und stehen bereits im HTML. Plus/Minus zeigt den Zustand an, Fokus ist sichtbar. Keine Kartenhülle und keine Höhenanimation.

### EditorialMedia

Text und rechteckiges Cloudinary-Bild als `mediaRight`, `mediaLeft` oder `mediaWide`. Echte Softwareansichten mit `contain`, Kontextfotografie bei Bedarf mit `cover` im Verhältnis 4:3. Semantische `figure` mit optionaler Caption und ein einzelner Linien-CTA; mobile DOM-Reihenfolge: Text, dann Medium. Ohne gültiges Bild bleibt eine Textspalte. Video wird in dieser Version nicht als Bild gerendert. Kein erfundenes Ersatzasset.

### ProcessSteps

Statische geordnete Liste mit H3-Schritten unter einer H2. Zweistellige Zahlen, dünne Linien und eine neutral getönte gemeinsame Fläche vermitteln die Reihenfolge ohne Einzelkarten. Die Anzahl folgt dem Inhalt; der Pilot enthält zwei Schritte. Kein aktiver Schrittwechsel oder Begleitmedium in dieser Version.

Die drei neuen Blocktypen sind lokal in Sanity-Schemas, `page.contentPKS`, Types, Projektionen und Seitenrenderer angeschlossen. Diese Registrierung belegt weder ein Deployment noch einen Import in Sanity. Hero-Unterblöcke bleiben ein eigener, unveränderter Katalog.

### ZwischenTitelCta

Zentrierter Abschluss mit optionalem rotem Vorspann, großer H2, Erläuterung als Absatz und einem Linien-CTA. Wiederverwenden; nicht noch einen Abschlussblock entwickeln. Der Inhalt bleibt während des Auftritts sichtbar; Reduced Motion deaktiviert den vertikalen Versatz.

### Navigation und Formular

Navigation: schwebende, helle/dunkle Glaspille mit PKS-Logo und mobilen Menü-Overlay. Formular: eckige, leicht getönte Felder, dünne Rahmen, klarer Fokus-Ring. Beide bleiben außerhalb des aktuellen Komponentenentwurfs funktional unverändert.

### Bewegung

Bestand: `framer-motion`, Hero-Auftritt 0,5 s, Abschnitts-Reveals häufig 0,6 s mit 20 px Versatz, CTA-Gleitbewegung 0,25 s. Die Editorial-Familie ergänzt gezielte Interaktionen: FAQ-Plus/Minus, leichter Hover-Zoom ausschließlich auf zugeschnittenen Kontextbildern sowie Link-Unterstreichung und CTA-Pfeil. Alle Editorial-Transitions sind bei Reduced Motion abgeschaltet; Texte sind ohne Auftrittsanimation sichtbar. Kein GSAP-Zweitstack und kein Scroll-Pinning. Das belegt keine vollständige Reduced-Motion-Prüfung der unveränderten Bestandskomponenten.

## Do's and Don'ts

### Do:

- Do: Borna, PKS-Logo, vorhandene Rasterlogik und beide Farbmodi bewahren.
- Do: Reale Produktansichten und passende betriebliche Situationen als visuelle Belege einsetzen.
- Do: Vorhandene Blöcke erweitern, bevor ähnliche neue Blöcke entstehen.
- Do: Typografie, Lesereihenfolge, Tastaturbedienung und reduzierte Bewegung gemeinsam prüfen.
- Do: Bestandsbefund, vorgeschlagene Verbesserung und umgesetzten Zustand klar trennen.

### Don't:

- Don't: Eine neue Schrift, Farbwelt oder Animationsbibliothek allein wegen eines Skill-Defaults einführen.
- Don't: Textflächen in dekorative Cards verpacken oder jede Seite gleich komponieren.
- Don't: Zufallsbilder, erfundene Produkt-Screenshots, Kundenstimmen oder Kennzahlen als echte Belege ausgeben.
- Don't: Die goldene Vorschauleiste oder lokale Hover-Farben zu neuen Markenfarben erklären.
- Don't: Redaktionelle Texte, Live-Seiten oder CMS-Dokumente im Zuge dieser Bestandsdokumentation verändern.
