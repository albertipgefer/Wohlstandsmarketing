import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "webdesign-fuer-restaurants-2026",
  title: "Webdesign für Restaurants 2026: Was wirklich Reservierungen bringt",
  highlight: "Restaurant",
  excerpt:
    "Restaurants haben spezifische Webdesign-Anforderungen. Diese 7 Elemente entscheiden 2026, ob Gäste reservieren — oder weiterscrollen.",
  description:
    "Webdesign für Restaurants 2026: 7 Elemente für mehr Reservierungen — Hero, Speisekarte, Reservierung, Lokale Sichtbarkeit.",
  date: "2026-01-23",
  readingTime: "6 min",
  category: "Webdesign",
  popularity: 50,
  cover: { from: "#0f4cb3", to: "#1663de", label: "Restaurant" },
  keywords: [
    "Webdesign Restaurant",
    "Restaurant Webseite",
    "Online Reservierung",
    "Gastronomie SEO",
    "Restaurant Marketing",
    "Speisekarte Online",
  ],
  toc: [
    { id: "warum", label: "Warum Restaurant-Webseiten anders sind" },
    { id: "elemente", label: "Die 7 Pflicht-Elemente" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich eine eigene Webseite oder reicht Instagram?",
      a: "Beides ist Pflicht. Instagram ist Reichweite, eigene Webseite ist Conversion und SEO-Asset. Restaurants ohne eigene Webseite verlieren systematisch Reservierungen aus Google-Suche.",
    },
    {
      q: "Wie wichtig ist eine Online-Reservierung?",
      a: "2026 erwarten 75 % der Gäste Online-Reservierung. Wer nur Telefon anbietet, verliert vor allem die jüngere Zielgruppe. Tools wie OpenTable, Bookatable oder Resmio integrieren sich nahtlos.",
    },
    {
      q: "Soll die Speisekarte als PDF oder HTML sein?",
      a: "HTML. PDFs ranken schlechter und sind mobil schwer zu lesen. Eine HTML-Speisekarte mit Schema-Markup Menu wird in Suchergebnissen prominent angezeigt.",
    },
    {
      q: "Wie wichtig sind professionelle Fotos?",
      a: "Massiv. 80 % der Reservierungs-Entscheidung läuft visuell. Investiere in einen Foodfotografen — 1.000-2.000 EUR für einen Tag, Wirkung über Jahre.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Restaurant-Webseiten haben eigene Regeln. Wer Standard-Tipps
        überträgt, verliert Reservierungen. Hier sind die 7 Elemente,
        die wirklich Gäste bringen.
      </p>

      <h2 id="warum">Warum Restaurant-Webseiten anders sind</h2>
      <ul>
        <li>Sehr visuelle Entscheidung (Fotos sind alles)</li>
        <li>Hyper-lokale Zielgruppe (10-15 km Umkreis)</li>
        <li>Hohe Erwartung an Online-Reservierung</li>
        <li>Speisekarte ist Hauptinhalt</li>
      </ul>

      <h2 id="elemente">Die 7 Pflicht-Elemente</h2>

      <h3>1. Hero mit professionellem Foto</h3>
      <p>
        Innen- oder Küchen-Atmosphäre, kein Stockfoto. Foto bestimmt
        zu 70 %, ob jemand reserviert.
      </p>

      <h3>2. Reservierungs-Button prominent</h3>
      <p>
        Im Hero, in der Navigation, auf jeder Seite. Direkter Link zur
        Reservierungsmaske, nicht Umweg über Kontaktformular.
      </p>

      <h3>3. HTML-Speisekarte mit Bildern</h3>
      <p>
        Pro Gericht: Beschreibung, Preis, idealerweise Foto.
        Schema-Markup Menu für Google-Sichtbarkeit.
      </p>

      <h3>4. Telefonnummer + WhatsApp prominent</h3>
      <p>
        Auf Mobile als tel:-Link. Plus WhatsApp für niederschwellige
        Anfragen.
      </p>

      <h3>5. Anfahrt + Parkmöglichkeiten</h3>
      <p>
        Eingebettete Google Map plus Beschreibung der Anfahrt mit ÖPNV
        und Parken. Pflicht für lokale Anbieter.
      </p>

      <h3>6. Öffnungszeiten klar sichtbar</h3>
      <p>
        Wochenplan, Sonderöffnungszeiten, Ruhetage. Mit
        OpeningHoursSpecification-Schema.
      </p>

      <h3>7. Echte Bewertungen sichtbar</h3>
      <p>
        Bewertungen aus Google direkt einbinden oder zumindest
        Bewertungs-Score mit Stern und Verlinkung anzeigen.
      </p>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>Speisekarte nur als PDF</li>
        <li>Stockfotos statt echter Restaurant-Aufnahmen</li>
        <li>Reservierung nur über Kontaktformular</li>
        <li>Keine Mobile-Optimierung der Speisekarte</li>
        <li>Veraltete Öffnungszeiten</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Restaurant-Webdesign 2026 ist visuell, lokal und
        reservierungs-fokussiert. Wer auf diese 7 Elemente optimiert,
        baut eine Reservierungs-Maschine — auch ohne großes Marketing-Budget.
      </p>
    </>
  );
}
