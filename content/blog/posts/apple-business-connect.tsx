import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "apple-business-connect-2026",
  title: "Apple Business Connect: Der vergessene Apple-Maps-Hebel für lokale Anbieter",
  highlight: "Apple Maps",
  excerpt:
    "Apple-Nutzer suchen in Apple Maps — nicht in Google Maps. Apple Business Connect ist 2026 der unterschätzteste lokale Sichtbarkeitskanal mit fast keiner Konkurrenz.",
  description:
    "Apple Business Connect 2026: So optimierst du dich für Apple Maps und Siri. Setup, Best Practices, häufige Fehler.",
  date: "2026-03-31",
  readingTime: "6 min",
  category: "Lokales SEO",
  cover: { from: "#db6f16", to: "#a3540f", label: "Apple Maps" },
  keywords: [
    "Apple Business Connect",
    "Apple Maps",
    "Apple Maps SEO",
    "Siri lokale Suche",
    "iPhone Suche",
    "Apple Maps Listing",
    "lokales SEO Apple",
  ],
  toc: [
    { id: "warum", label: "Warum Apple Business Connect 2026 wichtig ist" },
    { id: "setup", label: "Setup-Schritte" },
    { id: "best-practices", label: "Best Practices" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich ein Apple-ID-Konto?",
      a: "Ja. Apple Business Connect ist an eine Apple-ID gekoppelt. Idealerweise wird dafür ein dediziertes Business-Apple-ID-Konto angelegt, damit Zugriff übergebbar bleibt.",
    },
    {
      q: "Wie wird mein Eintrag verifiziert?",
      a: "Apple verifiziert per Telefon, Brief oder Domain-Verification. Der Prozess dauert üblicherweise 3–10 Tage. Bei korrekt eingerichteten NAP-Daten und Domain-Verification meistens reibungslos.",
    },
    {
      q: "Wie wichtig ist Apple Maps in Deutschland 2026?",
      a: "iPhone-Marktanteil liegt im DACH-Raum bei rund 38 %. Davon nutzen viele Apple Maps als Standard. Bei Premium- oder B2B-Zielgruppen ist der Anteil noch höher. Wer fehlt, verliert systematisch diese Zielgruppe.",
    },
    {
      q: "Brauche ich für Apple Maps separate SEO?",
      a: "Im Kern reicht ein vollständiges Apple Business Connect Profil. Apple Maps nutzt vor allem die direkten Profil-Daten plus externe Signale (Yelp, TripAdvisor, eigene Webseite). Wer dort sauber aufgestellt ist, ist auch auf Apple sichtbar.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Während sich alle auf Google Business Profile konzentrieren, ist
        Apple Business Connect der vergessene Kanal mit fast keiner
        Konkurrenz. Wer 2026 lokal sichtbar sein will, sollte beide
        Plattformen sauber pflegen — vor allem für Premium- und
        B2B-Zielgruppen.
      </p>

      <h2 id="warum">Warum Apple Business Connect 2026 wichtig ist</h2>
      <p>
        Drei Gründe machen Apple Business Connect zur Pflicht:
      </p>
      <ul>
        <li>
          <strong>iPhone-Dominanz im Premium-Segment:</strong> Wer
          Premium- oder B2B-Kunden anvisiert, erreicht überproportional
          viele Apple-Nutzer.
        </li>
        <li>
          <strong>Siri-Empfehlungen:</strong> Siri zieht lokale Empfehlungen
          fast vollständig aus Apple Maps. Wer nicht dort ist, wird nicht
          empfohlen.
        </li>
        <li>
          <strong>CarPlay-Integration:</strong> Suchen im Auto laufen über
          Apple Maps, nicht über Google Maps.
        </li>
      </ul>

      <h2 id="setup">Setup-Schritte</h2>
      <ol>
        <li>
          <strong>Apple-ID anlegen</strong> — idealerweise dediziert fürs
          Business
        </li>
        <li>
          <strong>businessconnect.apple.com</strong> aufrufen und Profil
          einrichten
        </li>
        <li>
          <strong>NAP-Daten exakt</strong> wie im GBP eintragen
          (Konsistenz!)
        </li>
        <li>
          <strong>Kategorien wählen</strong> — Apple-Kategorien sind enger
          als bei Google, spezifisch auswählen
        </li>
        <li>
          <strong>Verifizierung durchführen</strong> per Telefon, Brief
          oder Domain
        </li>
        <li>
          <strong>Showcases aktivieren</strong> — Apple-spezifische
          Highlight-Karten (Promotionen, Events, Updates)
        </li>
      </ol>

      <h2 id="best-practices">Best Practices</h2>
      <ul>
        <li>
          <strong>Hochauflösende Fotos</strong> — Apple bevorzugt hochwertige
          Bilder
        </li>
        <li>
          <strong>Logo professionell</strong> — SVG-Qualität, einheitlich
          mit Webseite und GBP
        </li>
        <li>
          <strong>Öffnungszeiten und Feiertage</strong> immer aktuell
          halten
        </li>
        <li>
          <strong>Action-Buttons</strong> aktivieren (Anrufen, Webseite,
          Wegbeschreibung)
        </li>
        <li>
          <strong>Yelp-Integration</strong> — Bewertungen aus Yelp werden
          in Apple Maps angezeigt
        </li>
      </ul>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>NAP-Daten weichen von GBP ab — Inkonsistenz schadet beiden</li>
        <li>Eintrag nicht verifiziert — Profil bleibt eingeschränkt sichtbar</li>
        <li>Showcases werden nicht gepflegt</li>
        <li>Kategorien zu generisch gewählt</li>
        <li>Foto-Pflege vergessen</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Apple Business Connect ist 2026 ein massiv unterschätzter Hebel.
        Setup-Aufwand: 2 Stunden. Wirkung: dauerhafte Sichtbarkeit in
        Apple Maps und Siri — ein Kanal, der gerade bei kaufkräftigen
        Zielgruppen entscheidend ist.
      </p>
    </>
  );
}
