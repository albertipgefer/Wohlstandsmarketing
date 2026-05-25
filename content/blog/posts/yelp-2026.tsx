import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "yelp-2026-lohnt-es-sich",
  title: "Yelp 2026: Lohnt es sich noch für DACH-Mittelstand?",
  highlight: "Yelp",
  excerpt:
    "Yelp hat im DACH-Raum verloren. Trotzdem ist es 2026 noch ein KI-Signal, das oft unterschätzt wird. Hier ist die ehrliche Einschätzung.",
  description:
    "Yelp 2026 für DACH-Mittelstand: Lohnt sich noch ein Eintrag? Wie nutzt Apple Maps Yelp-Daten? Bewertungs-Strategie.",
  date: "2026-02-04",
  readingTime: "5 min",
  category: "Lokales SEO",
  popularity: 40,
  cover: { from: "#db6f16", to: "#a3540f", label: "Yelp" },
  keywords: [
    "Yelp DACH",
    "Yelp lokales SEO",
    "Yelp Apple Maps",
    "Bewertungen Plattformen",
    "Lokales SEO Plattformen",
  ],
  toc: [
    { id: "stand", label: "Der aktuelle Stand 2026" },
    { id: "warum", label: "Warum Yelp trotzdem wichtig bleibt" },
    { id: "wie", label: "So nutzt du Yelp pragmatisch" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Hat Yelp im DACH-Raum noch Nutzer?",
      a: "Direkte Nutzerzahlen sind klein. Aber Yelp-Bewertungen werden von Apple Maps und einigen KI-Modellen weiterhin als Datenquelle genutzt. Indirekte Wirkung schlägt direkte Nutzung.",
    },
    {
      q: "Soll ich Bewertungen aktiv auf Yelp anfragen?",
      a: "Eher nein. Yelp filtert aktiv angefragte Bewertungen oft heraus. Wer auf Yelp Bewertungen will, sollte organisch wachsen lassen oder den Schwerpunkt auf Google verschieben.",
    },
    {
      q: "Was kostet ein Yelp-Account?",
      a: "Basis-Listing kostenfrei. Premium-Features (Werbung, erweitertes Profil) ab ca. 200 EUR/Monat. Für DACH-Mittelstand selten lohnenswert.",
    },
    {
      q: "Reicht Google Business Profile als Alternative?",
      a: "Für 95 % der lokalen Anbieter ja. GBP ist 2026 die mit Abstand wichtigste Plattform. Yelp als sekundäre Quelle kann ergänzen, ist aber kein Pflicht-Investment.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Yelp ist im DACH-Raum nicht mehr das, was es 2018 war. Trotzdem
        hat es 2026 noch eine versteckte Rolle — vor allem für Apple
        Maps und einige KI-Modelle.
      </p>

      <h2 id="stand">Der aktuelle Stand 2026</h2>
      <p>
        Yelp ist im DACH-Raum eine Nischen-Plattform geworden.
        Konkurrenz von Google, TripAdvisor und Branchen-Portalen hat
        die direkten Nutzerzahlen massiv reduziert.
      </p>
      <p>
        Trotzdem nutzen Apple Maps und einige KI-Modelle Yelp-Daten
        weiterhin als Vertrauenssignal. Wer komplett auf Yelp
        verzichtet, fehlt in diesen indirekten Quellen.
      </p>

      <h2 id="warum">Warum Yelp trotzdem wichtig bleibt</h2>
      <ul>
        <li>Apple Maps zieht Bewertungen aus Yelp</li>
        <li>Siri nutzt Yelp-Daten für lokale Empfehlungen</li>
        <li>Einige KI-Modelle gewichten Yelp als Trust-Signal</li>
        <li>NAP-Konsistenz: ein weiteres Profil mit den richtigen Daten</li>
      </ul>

      <h2 id="wie">So nutzt du Yelp pragmatisch</h2>
      <ol>
        <li>Kostenfreies Profil einrichten</li>
        <li>NAP-Daten exakt wie auf GBP eintragen</li>
        <li>Bilder und Beschreibung pflegen</li>
        <li>Bewertungen organisch wachsen lassen (nicht aktiv anfragen)</li>
        <li>Premium-Features ignorieren (selten lohnend)</li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Yelp ist 2026 kein Wachstumskanal mehr, aber ein
        Hygiene-Signal. Wer ein vollständiges Profil pflegt, gewinnt
        indirekte Sichtbarkeit in Apple Maps und einigen KI-Systemen —
        ohne nennenswertes Investment.
      </p>
    </>
  );
}
