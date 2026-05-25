import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "lokale-schema-tricks-2026",
  title: "Lokale Schema-Tricks 2026: Was über LocalBusiness hinaus geht",
  highlight: "Schema-Tricks",
  excerpt:
    "Jeder kennt LocalBusiness. Aber diese 5 erweiterten Schema-Markups sind 2026 die echten Geheimwaffen für lokale Sichtbarkeit.",
  description:
    "Lokale Schema-Tricks 2026: 5 erweiterte Markups jenseits von LocalBusiness — Service, GeoCoordinates, OpeningHoursSpecification, areaServed, Event.",
  date: "2026-02-01",
  readingTime: "6 min",
  category: "Lokales SEO",
  popularity: 70,
  cover: { from: "#db6f16", to: "#a3540f", label: "Schema+" },
  keywords: [
    "Schema Markup lokal",
    "LocalBusiness Schema",
    "Service Schema",
    "OpeningHoursSpecification",
    "GeoCoordinates",
    "areaServed Schema",
  ],
  toc: [
    { id: "basis", label: "Die Basis: LocalBusiness" },
    { id: "tricks", label: "Die 5 erweiterten Markups" },
    { id: "kombinieren", label: "Markups richtig kombinieren" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wie viele Schemas können auf einer Seite sein?",
      a: "So viele, wie sinnvoll sind. Mehrere Schemas in einem JSON-LD-Block oder als separate Scripts — beides funktioniert. Wichtig: nur Inhalte beschreiben, die tatsächlich auf der Seite sind.",
    },
    {
      q: "Welches Schema ist für Service-Area-Businesses am wichtigsten?",
      a: "Service mit areaServed. Damit zeigst du, welche Regionen du bedienst — auch ohne physisches Ladengeschäft. Pflicht für Handwerker, Fahrtendienste, mobile Dienstleister.",
    },
    {
      q: "Brauche ich auch Event-Schema?",
      a: "Wenn du Events veranstaltest: ja. Event-Schema mit Datum, Ort, Preis erscheint oft prominent in lokalen Suchergebnissen und in Google Events.",
    },
    {
      q: "Wie validiere ich komplexes Schema?",
      a: "Mit dem Rich Results Test von Google plus dem Schema Markup Validator von schema.org. Beide ergänzen sich — keiner ersetzt den anderen.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        LocalBusiness allein ist 2026 die Pflichtbasis. Wer wirklich
        lokal dominieren will, ergänzt mit erweiterten Markups, die nur
        wenige Mitbewerber nutzen.
      </p>

      <h2 id="basis">Die Basis: LocalBusiness</h2>
      <p>
        Pflicht für jeden lokalen Anbieter: name, address, telephone,
        openingHoursSpecification, geo (mit latitude/longitude). Plus
        passenden Subtyp wählen (Electrician, Restaurant, Lawyer, etc.).
      </p>

      <h2 id="tricks">Die 5 erweiterten Markups</h2>

      <h3>1. Service mit areaServed</h3>
      <p>
        Jede Hauptleistung als Service-Schema mit areaServed-Property.
        Ermöglicht KI-Modellen, dich genau für die richtigen Regionen
        zu empfehlen.
      </p>

      <h3>2. GeoCoordinates präzise</h3>
      <p>
        Statt nur Adresse: latitude + longitude in GeoCoordinates.
        Erlaubt Maps-Diensten und KI exakte Distanz-Berechnungen für
        lokale Empfehlungen.
      </p>

      <h3>3. OpeningHoursSpecification granular</h3>
      <p>
        Pro Wochentag eigene OpeningHoursSpecification mit opens und
        closes. Plus validFrom/validThrough für Sonderöffnungszeiten
        (Feiertage, Urlaub).
      </p>

      <h3>4. AggregateRating mit Quelle</h3>
      <p>
        Bewertungs-Schnitt prominent als AggregateRating-Schema. Mit
        Verweis auf die Quelle (Google, ProvenExpert, Yelp). Erscheint
        oft als Rich Snippet.
      </p>

      <h3>5. PriceRange + acceptedPaymentMethod</h3>
      <p>
        Preisbereich (€, €€, €€€, €€€€) plus akzeptierte
        Zahlungsmethoden. Hilft KI-Modellen, dich für die richtige
        Preisklasse zu empfehlen.
      </p>

      <h2 id="kombinieren">Markups richtig kombinieren</h2>
      <ul>
        <li>Alle Schemas in einem JSON-LD-Block bündeln (sauberer)</li>
        <li>@id-References nutzen, um auf zentrale Entitäten zu verweisen</li>
        <li>Nur beschreiben, was tatsächlich auf der Seite sichtbar ist</li>
        <li>Mit Validator-Tools prüfen vor Live-Gang</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Wer 2026 lokal dominieren will, geht über LocalBusiness hinaus.
        Diese 5 erweiterten Markups sind weniger bekannt — und genau
        deshalb ein echter Wettbewerbsvorteil. Setup-Aufwand 2 Stunden,
        Wirkung dauerhaft.
      </p>
    </>
  );
}
