import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "internal-linking-2026",
  title: "Internal Linking 2026: Architektur für Maschinen und Menschen",
  highlight: "Internal Links",
  excerpt:
    "Interne Verlinkung ist 2026 ein massiv unterschätzter SEO-Hebel — und gleichzeitig der einzige, den du komplett selbst kontrollierst. So baust du sie richtig.",
  description:
    "Internal Linking Strategie 2026: Hub-Spoke-Architektur, Anchor-Text-Best-Practices, KI-Crawler-Pfade. Mit konkreten Beispielen.",
  date: "2026-02-13",
  readingTime: "7 min",
  category: "Technisches SEO",
  popularity: 75,
  cover: { from: "#0f4cb3", to: "#1663de", label: "Links" },
  keywords: [
    "Internal Linking",
    "Interne Verlinkung",
    "Hub Spoke",
    "Topical Authority",
    "Anchor Text",
    "Link Architecture",
    "SEO interne Links",
  ],
  toc: [
    { id: "warum", label: "Warum interne Links 2026 wichtiger sind" },
    { id: "architektur", label: "Hub-Spoke-Architektur" },
    { id: "anchor", label: "Anchor-Text-Best-Practices" },
    { id: "tools", label: "Tools zur Analyse" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wie viele interne Links pro Seite sind sinnvoll?",
      a: "Faustregel: 3-10 kontextuelle interne Links plus die navigationalen. Mehr ist nicht schädlich, aber Verwässerung beginnt ab ca. 100 Links pro Seite. Qualität schlägt Quantität.",
    },
    {
      q: "Soll ich Footer-Links zählen?",
      a: "Ja, Google zählt alle internen Links — aber Footer-Links werden weniger gewichtet als kontextuelle Links im Hauptinhalt. Wichtige Seiten sollten beides bekommen.",
    },
    {
      q: "Hilft interne Verlinkung auch für KI-Sichtbarkeit?",
      a: "Sehr stark. KI-Crawler nutzen interne Links zur Topical-Authority-Bewertung. Wer einen klar strukturierten Hub-Spoke-Aufbau hat, signalisiert thematische Tiefe — und wird in KI-Antworten häufiger zitiert.",
    },
    {
      q: "Was ist ein Hub-Spoke-Aufbau?",
      a: "Eine zentrale Pillar-Seite (Hub) verlinkt auf mehrere Detail-Seiten (Spokes), die wiederum zurück auf den Hub verweisen. Das schafft Topical-Cluster, die Google und KI-Modelle als thematische Autorität bewerten.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Interne Verlinkung ist der unterschätzteste SEO-Hebel 2026 — und
        gleichzeitig der einzige, den du komplett selbst kontrollierst.
        Hier ist die Strategie, die wirklich Wirkung zeigt.
      </p>

      <h2 id="warum">Warum interne Links 2026 wichtiger sind</h2>
      <ul>
        <li>Backlinks werden schwieriger zu bekommen — interne Links bleiben unter deiner Kontrolle</li>
        <li>KI-Crawler nutzen interne Links zur Topical-Authority-Bewertung</li>
        <li>Klare Linkarchitektur reduziert Crawl-Budget-Verschwendung</li>
      </ul>

      <h2 id="architektur">Hub-Spoke-Architektur</h2>
      <p>
        Pro Themenbereich eine Hub-Seite (umfassend, übergeordnet), die
        auf 5-15 Spoke-Seiten (Detail-Artikel) verlinkt. Spokes
        verlinken zurück auf den Hub und untereinander.
      </p>
      <p>
        Beispiel: Hub „KI-Sichtbarkeit". Spokes: „ChatGPT-SEO",
        „Perplexity-SEO", „Google AI Overviews", „Schema für KI",
        „robots.txt für KI-Crawler".
      </p>

      <h2 id="anchor">Anchor-Text-Best-Practices</h2>
      <ul>
        <li>Beschreibende Anchor-Texte mit relevanten Keywords</li>
        <li>Variation statt 100x derselbe Anchor</li>
        <li>Vermeide generische Anchor wie „hier klicken" oder „mehr"</li>
        <li>Natürlich in Sätze integriert, nicht aufgepfropft</li>
      </ul>

      <h2 id="tools">Tools zur Analyse</h2>
      <ul>
        <li><strong>Screaming Frog</strong> — komplette Link-Architektur visualisieren</li>
        <li><strong>Sitebulb</strong> — visualisierte Crawl-Berichte</li>
        <li><strong>Google Search Console</strong> — interne Link-Übersicht pro URL</li>
      </ul>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>Wichtige Seiten haben kaum interne Links</li>
        <li>Anchor-Text-Diversität fehlt</li>
        <li>Verwaiste Seiten ohne interne Links</li>
        <li>Übermäßige Footer-Link-Spam</li>
        <li>Broken Internal Links (404er)</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Interne Verlinkung ist 2026 ein Power-Tool für SEO und
        KI-Sichtbarkeit. Wer Hub-Spoke-Architekturen baut, gewinnt
        Topical Authority — der wichtigste Faktor in modernen
        Suchmaschinen-Algorithmen.
      </p>
    </>
  );
}
