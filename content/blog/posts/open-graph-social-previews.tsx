import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "open-graph-social-previews-2026",
  title: "Open Graph &amp; Twitter Cards: Warum Social-Previews 2026 mehr bringen",
  highlight: "Open Graph",
  excerpt:
    "Jeder Link, der geteilt wird, ist eine Mini-Werbung — wenn er richtig aussieht. Open Graph und Twitter Cards entscheiden, ob daraus Klicks werden.",
  description:
    "Open Graph + Twitter Cards 2026: So bekommst du Click-Through-Rates auf jeder Plattform — WhatsApp, LinkedIn, X, iMessage, Slack. Tools inklusive.",
  date: "2026-04-12",
  readingTime: "6 min",
  category: "Technisches SEO",
  cover: { from: "#db6f16", to: "#a3540f", label: "OG" },
  keywords: [
    "Open Graph",
    "Twitter Cards",
    "Social Preview",
    "OG Image",
    "LinkedIn Vorschau",
    "WhatsApp Link Preview",
    "Social Media SEO",
    "og:image generieren",
  ],
  toc: [
    { id: "warum", label: "Warum Social-Previews 2026 wichtiger sind" },
    { id: "pflicht", label: "Die Pflicht-Tags pro Plattform" },
    { id: "image", label: "Das perfekte OG-Image" },
    { id: "dynamisch", label: "Dynamische OG-Images" },
    { id: "testen", label: "So testest du Previews" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Welche Auflösung sollte mein OG-Image haben?",
      a: "1200 × 630 px ist Standard, funktioniert auf allen Plattformen. Für LinkedIn besser 1200 × 627, für X (Twitter) 1200 × 675 — aber 1200 × 630 ist der pragmatische Kompromiss.",
    },
    {
      q: "Brauche ich noch Twitter Cards, wenn ich Open Graph habe?",
      a: "Empfohlen, ja. X (Twitter) fällt zwar auf Open Graph zurück, eigene twitter:card-Tags geben aber mehr Kontrolle und bessere Darstellung im Web-Client und in der App.",
    },
    {
      q: "Wie aktualisiere ich Vorschau-Caches?",
      a: "Facebook: Sharing Debugger (‚Scrape Again‘). LinkedIn: Post Inspector. X: Card Validator. WhatsApp und iMessage cachen aggressiv — manchmal Stunden bis Tage, bis neue Previews durchschlagen.",
    },
    {
      q: "Bringt Open Graph auch SEO-Vorteile?",
      a: "Indirekt ja. Mehr Klicks auf geteilte Links bedeuten mehr Traffic. Plus: Suchmaschinen interpretieren OG-Tags als zusätzliche Metadaten — vor allem Bing nutzt sie aktiv für Snippet-Generierung.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Jeder Link, der über WhatsApp, LinkedIn, X oder Slack geteilt
        wird, bekommt eine Vorschau. Wie diese Vorschau aussieht,
        entscheidet, ob jemand klickt — oder weiterscrollt. Open Graph
        und Twitter Cards sind die unsichtbaren CTAs des Web.
      </p>

      <h2 id="warum">Warum Social-Previews 2026 wichtiger sind</h2>
      <p>
        Drei Entwicklungen erhöhen den Wert guter Previews:
      </p>
      <ul>
        <li>
          <strong>Mehr Sharing über Messenger.</strong> WhatsApp und iMessage
          dominieren — und beide zeigen OG-Previews prominent.
        </li>
        <li>
          <strong>LinkedIn-Wachstum im B2B.</strong> Vorschau-Karten
          entscheiden über Reichweite und Klickrate.
        </li>
        <li>
          <strong>Dark Mode Verbreitung.</strong> Generische Previews mit
          weißem Hintergrund wirken in Dark-Mode-Apps fehl am Platz.
        </li>
      </ul>

      <h2 id="pflicht">Die Pflicht-Tags pro Plattform</h2>
      <p>
        Mindestens diese Tags gehören in den &lt;head&gt; jeder Seite:
      </p>
      <ul>
        <li><code>og:title</code> — Titel (max ~60 Zeichen)</li>
        <li><code>og:description</code> — Beschreibung (max ~155)</li>
        <li><code>og:image</code> — absolute URL zum Bild</li>
        <li><code>og:url</code> — Canonical-URL</li>
        <li><code>og:type</code> — meist ‚website‘ oder ‚article‘</li>
        <li><code>twitter:card</code> — meist ‚summary_large_image‘</li>
      </ul>

      <h2 id="image">Das perfekte OG-Image</h2>
      <p>
        Best Practices 2026:
      </p>
      <ul>
        <li>Auflösung 1200 × 630 px</li>
        <li>Dateigröße &lt; 200 KB</li>
        <li>Format JPG oder PNG (WebP wird noch nicht überall unterstützt)</li>
        <li>Lesbar auch in 600 × 315 px (Thumbnail-Größe)</li>
        <li>
          Titel der Seite groß und lesbar im Bild — keine generische
          Stockillustration
        </li>
        <li>Eigene Marke (Logo) klein in der Ecke</li>
      </ul>

      <h2 id="dynamisch">Dynamische OG-Images</h2>
      <p>
        Statt für jede Seite manuell ein Bild zu designen, lohnt sich
        dynamische Generierung. Next.js bietet mit{" "}
        <code>ImageResponse</code> aus <code>next/og</code> eine
        eingebaute Lösung: pro Seite wird das Bild aus React-Komponenten
        und CSS gerendert.
      </p>
      <p>
        Vorteile: Titel jeder Seite wird automatisch ins Bild eingesetzt,
        konsistente Marke, kein Designer pro Artikel nötig.
      </p>

      <h2 id="testen">So testest du Previews</h2>
      <p>
        Drei Pflicht-Tools:
      </p>
      <ul>
        <li>
          <strong>Facebook Sharing Debugger</strong> — auch für WhatsApp und
          Instagram relevant
        </li>
        <li>
          <strong>LinkedIn Post Inspector</strong> — vor jedem
          Sharing-Aktion einmal durchlaufen lassen
        </li>
        <li>
          <strong>X Card Validator</strong> oder Twitter Cards Tester
        </li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Open Graph und Twitter Cards sind 2026 keine Nice-to-haves mehr —
        sie sind die erste Werbung, die deine Inhalte überall im Web
        machen. Wer hier sauber arbeitet, vervielfacht die Klickrate
        geteilter Links.
      </p>
      <p>
        Aufwand: einmalig 2–4 Stunden Setup mit dynamischer Generierung.
        Wirkung: dauerhafte Steigerung der Share-CTR.
      </p>
    </>
  );
}
