# Pilot: Auftragszeiterfassung

Freigegeben zur lokalen Umsetzung durch „ok machen wir es so“ am 5. Oktober 2026. Referenz: DESIGN.md und PAGEBUILDER-COMPONENT-PLAN.md. Keine CMS-Mutation und kein Deployment in diesem Schritt.

## Direction contract

THESIS: Die bestehende Fachseite wird lesbar und anschaulich: Problem verstehen, Erfassungsregeln nachvollziehen, Produktbezug sehen, Fragen klären. Keine wiederholte Textwand und kein neuer Markenauftritt.

OWN-WORLD: Borna, Schwarz/Weiß, schmale neutrale Linien, rote Akzente ausschließlich in bestehender Rolle. Asymmetrische zwölfspaltige Kompositionen, eckige Medienflächen, vorhandene Navigation.

STORY: Redaktionelle Aussagen bleiben erhalten. FAQ wird nativ bedienbar, Regeln werden als zwei vorhandene inhaltliche Schritte gegliedert. Fehlende echte Produktansichten werden nicht erfunden.

FIRST VIEWPORT: Bestehender vollflächiger Video-Hero mit originaler H1 und CTA; leeres Highlight entfällt. Die neue Gestaltung beginnt mit einer großzügigen zweispaltigen Einleitung. Kein neues Hero-Layout außerhalb der Freigabe.

FORM: Lokale Erweiterung eines bestätigten Systems; kein Concept-Seed erforderlich. Code-native Komponenten, keine generierten Bild-Comps. FAQ-Indikator, Medien-Hover und Fokus/Link-Bewegung reagieren auf echte Interaktion und respektieren Reduced Motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Grenze

Die lokale Pilotkomposition ist ausschließlich in development verfügbar. Damit kann das bisher deployte Frontend die unveränderten Sanity-Drafts weiterhin lesen. Für die spätere Übernahme braucht es ein kompatibles Preview-Deployment und einen revision-gesicherten Draft-Import. Ein echter Erfassungs-Screenshot bleibt ein Asset-Bedarf; bereits verwendete PKS-Medien dürfen nur mit zutreffender Beschreibung übernommen werden.

## Implementierter Stand und Herkunft

Lokaler Pilot: `http://localhost:3110/de/entwurf-auftragszeiterfassung`. Die Development-Prüfung erfolgt vor dem Datenabruf. `ContentSection` verwendet gekapselte Portable-Text-Typografie; FAQ, Text/Bild und statische Prozessschritte sind in Sanity-Schemas, Seiteninhalt, Types, Projektionen und Renderer registriert. Leere Hero-Hervorhebungen entfallen, lange Hero-Wörter umbrechen, der Abschluss-CTA verwendet H2 und Absatz. Kein CMS-Import und kein Deployment wurden ausgeführt.

`lib/pagebuilder-pilot.ts` ordnet den vorhandenen Draft verlustfrei um. Die zwei Prozessschritte und zwei Fragen stammen aus diesem Text; keine zusätzliche Mindestanzahl wurde erfunden. Das Bild ist ein Standbild des vorhandenen PKS-Industrievideos: [Cloudinary-Quelle](https://res.cloudinary.com/dghsgqy88/video/upload/so_1,w_1280,f_jpg/v1762375642/585853_Manufacture_Machines_Helmet_Man_By_Pressmaster_Artlist_HD-mp41280_an56fj.jpg), Asset-ID `585853_Manufacture_Machines_Helmet_Man_By_Pressmaster_Artlist_HD-mp41280_an56fj`, Sekunde 1. Herkunft: bestehende Website; keine Generierung, kein neuer Download und kein Beleg einer PSystem-Oberfläche. Caption und Alt-Text beschreiben die Produktionsumgebung. Der bestehende Hero verwendet weiterhin sein vorhandenes Websitevideo.

## Validierungsrecord vom 5. Oktober 2026

Die folgenden Laufzeitprüfungen wurden im Implementierungslauf protokolliert; die Dokumentationsübergabe hat Komponenten, CSS und Registrierung dagegen abgeglichen:

- Desktop 1440 px und Mobil 390 px visuell geprüft; bei 320 px per DOM kein horizontaler Overflow. Alle Bilder geladen, keine Browser-Konsolenfehler.
- Native FAQ mit Enter und Leertaste bedient. HTTP 200, beide `details` und Antworttext im serverseitigen HTML vorhanden; Route liefert `noindex`.
- Rezeptabgleich: alle 18 ursprünglichen Textspans und beide Links erhalten.
- `npm run typecheck`, `npm run lint` und `git diff --check` erfolgreich.
- Dark-Mode-CSS und Reduced-Motion-Regeln sind implementiert. Dark Mode ist nicht visuell abgenommen; daraus folgt keine umfassende Motion-Prüfung des Bestands.
- Kein Produktionsbuild und keine Sanity-Studio-GUI-Prüfung in diesem Lauf. Keine Aussage über live bereitgestellte Komponenten, CMS-Veröffentlichung oder Live-SEO-Abnahme.

Die Finish-Review verlangte als Dokumentationskorrekturen den Produktkontext und die Aktualisierung des veralteten Designstatus. `PRODUCT.md` liegt vor; `DESIGN.md` und `.impeccable/design.json` dokumentieren die implementierte Erweiterung unter Beibehaltung der bisherigen Identität. Der abschließende Reviewer-Verdikt lautet **ship**: beide Dokumentationskorrekturen wurden als **resolved** bewertet. Dieser gezielte Verdikt gilt nicht für Deployment, CMS-Veröffentlichung oder die nicht visuell geprüfte Dunkelansicht.
