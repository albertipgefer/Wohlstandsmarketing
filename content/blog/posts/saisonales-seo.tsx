import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "saisonales-seo-2026",
  title: "Saisonales SEO 2026: So erwischst du saisonale Anfragen rechtzeitig",
  highlight: "Saisonal",
  excerpt:
    "Saisonale Anfragen folgen festen Mustern. Wer sie 8 Wochen vor Peak optimiert, fängt den Traffic ab. Wer am Peak optimiert, ist zu spät.",
  description:
    "Saisonales SEO 2026: Wann du für Weihnachten, Sommer, Eventsaison optimieren musst. Mit Beispielen für Gastronomie, Handwerk, Einzelhandel.",
  date: "2026-01-26",
  readingTime: "6 min",
  category: "Lokales SEO",
  popularity: 55,
  cover: { from: "#db6f16", to: "#a3540f", label: "Saison" },
  keywords: [
    "Saisonales SEO",
    "Seasonal SEO",
    "Saisonale Keywords",
    "Weihnachten SEO",
    "Eventsaison SEO",
    "Google Trends",
  ],
  toc: [
    { id: "warum", label: "Warum Timing alles ist" },
    { id: "branchen", label: "Branchen mit starkem Saison-Effekt" },
    { id: "vorlauf", label: "Wie viel Vorlauf brauchst du?" },
    { id: "umsetzung", label: "Praktische Umsetzung" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wie früh muss ich saisonal optimieren?",
      a: "Mindestens 8 Wochen vor Peak. Google braucht Zeit, neue Inhalte zu indexieren und Rankings aufzubauen. Wer am 1. Dezember Weihnachts-Content publiziert, ist zu spät.",
    },
    {
      q: "Soll ich saisonale Seiten löschen oder behalten?",
      a: "Behalten und jährlich aktualisieren. Eine Seite, die seit 5 Jahren existiert und jährlich aktualisiert wird, rankt deutlich besser als jährlich neue Seiten. Pflege schlägt Neustart.",
    },
    {
      q: "Wie finde ich saisonale Keywords?",
      a: "Google Trends ist Pflicht. Plus: eigene historische Daten (Google Search Console) auswerten — welche Anfragen kamen letztes Jahr zur gleichen Zeit?",
    },
    {
      q: "Was ist mit saisonalen Sales-Aktionen?",
      a: "Schema-Markup Offer mit validFrom/validThrough nutzen. Plus Strukturierte Daten Event für zeitlich begrenzte Aktionen. Google zeigt diese prominent in Suchergebnissen.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Saisonale Anfragen folgen festen Mustern — und wer Timing
        beherrscht, fängt sie ab. Hier ist die Strategie für 2026, die
        wirklich funktioniert.
      </p>

      <h2 id="warum">Warum Timing alles ist</h2>
      <p>
        Saisonale Inhalte brauchen Zeit, um zu ranken:
      </p>
      <ul>
        <li>2-4 Wochen für Indexierung</li>
        <li>4-8 Wochen für stabile Top-Positionen</li>
        <li>Plus Pflege nach Peak für nächstes Jahr</li>
      </ul>
      <p>
        Wer am Peak optimiert, ist zu spät. Wer 8 Wochen vorher
        publiziert, gewinnt.
      </p>

      <h2 id="branchen">Branchen mit starkem Saison-Effekt</h2>
      <ul>
        <li><strong>Gastronomie</strong>: Hochzeitssaison (April-Oktober), Weihnachtsfeiern (Oktober-Dezember)</li>
        <li><strong>Handwerk</strong>: Heizung (Herbst), Garten (Frühjahr), Klima (Sommer)</li>
        <li><strong>Einzelhandel</strong>: Weihnachten, Schulanfang, Sommer</li>
        <li><strong>Event-Branche</strong>: Hochzeiten, Firmenevents, Festivals</li>
        <li><strong>Reise/Tourismus</strong>: Saison-Buchungen 6+ Monate vorher</li>
      </ul>

      <h2 id="vorlauf">Wie viel Vorlauf brauchst du?</h2>
      <ul>
        <li><strong>Weihnachten</strong>: ab Oktober optimieren</li>
        <li><strong>Sommer</strong>: ab März-April</li>
        <li><strong>Hochzeitssaison</strong>: ab Januar-Februar</li>
        <li><strong>Black Friday</strong>: ab Oktober</li>
        <li><strong>Schulanfang</strong>: ab Juni-Juli</li>
      </ul>

      <h2 id="umsetzung">Praktische Umsetzung</h2>
      <ol>
        <li>Google Trends für relevante Begriffe analysieren</li>
        <li>Eigene historische Daten aus Search Console auswerten</li>
        <li>8 Wochen vor Peak: Landing Pages publizieren oder aktualisieren</li>
        <li>Pro saisonalen Begriff eine eigene Seite (nicht eine Universal-Seite)</li>
        <li>Schema mit validFrom/validThrough für Aktionen</li>
        <li>Nach Peak: Seite behalten, Datum aktualisieren für nächstes Jahr</li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Saisonales SEO ist 2026 ein direkter Umsatz-Hebel — aber nur
        mit dem richtigen Timing. Wer 8 Wochen vor Peak systematisch
        optimiert und Seiten jährlich pflegt, baut nachhaltige
        Saison-Rankings auf.
      </p>
    </>
  );
}
