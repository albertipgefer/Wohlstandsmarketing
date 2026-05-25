import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "sitemap-xml-2026",
  title: "Sitemap.xml 2026: So baust du sie für Mensch und KI-Crawler",
  highlight: "Sitemap",
  excerpt:
    "Die meisten Sitemaps sind veraltet, falsch oder fehlen ganz. Dabei sind sie 2026 das erste Signal, das jeder Crawler liest — auch KI-Crawler. So baust du sie richtig.",
  description:
    "Sitemap.xml 2026 für Mittelstand: Aufbau, Best Practices, häufige Fehler. Mit Hinweisen für KI-Crawler wie GPTBot und PerplexityBot.",
  date: "2026-04-18",
  readingTime: "7 min",
  category: "Technisches SEO",
  cover: { from: "#0f4cb3", to: "#1663de", label: "Sitemap" },
  keywords: [
    "Sitemap XML",
    "Sitemap erstellen",
    "Sitemap Best Practice",
    "XML Sitemap Mittelstand",
    "Sitemap Index",
    "KI Crawler Sitemap",
    "Bing IndexNow",
    "Google Search Console Sitemap",
  ],
  toc: [
    { id: "warum", label: "Warum die Sitemap 2026 wichtiger ist denn je" },
    { id: "aufbau", label: "Aufbau einer modernen Sitemap" },
    { id: "ki", label: "KI-Crawler und Sitemaps" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "tools", label: "Tools und Generatoren" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich überhaupt eine Sitemap?",
      a: "Ja, fast immer. Auch wenn Crawler theoretisch jede Seite über Links finden können, beschleunigt eine Sitemap die Indexierung erheblich — vor allem bei neuen Seiten, tiefen Strukturen oder seltener verlinkten Inhalten.",
    },
    {
      q: "Wo lege ich die Sitemap ab?",
      a: "Standard ist /sitemap.xml im Root deiner Domain. Falls du mehrere Sitemaps hast (z. B. eine pro Sprache oder Inhaltstyp), verwende einen Sitemap-Index, der auf die einzelnen Sitemaps verweist.",
    },
    {
      q: "Wie reiche ich die Sitemap bei Google ein?",
      a: "Über die Google Search Console unter ‚Sitemaps‘ deine URL einreichen. Für Bing über die Bing Webmaster Tools. Zusätzlich in der robots.txt mit ‚Sitemap: https://…‘ verweisen.",
    },
    {
      q: "Werden KI-Crawler die Sitemap auch lesen?",
      a: "Ja. GPTBot, PerplexityBot, ClaudeBot und CCBot lesen Sitemaps wie klassische Suchmaschinen. Eine gut gepflegte Sitemap beschleunigt deine KI-Sichtbarkeit messbar.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Die Sitemap ist die Inhaltsverzeichnis-Datei deiner Webseite für
        Crawler. 2026 lesen sie nicht mehr nur Google und Bing — auch
        KI-Crawler nutzen sie als Erstes. Wer hier sauber arbeitet,
        bekommt schneller Sichtbarkeit. Wer sie vernachlässigt, verliert
        Tage bis Wochen pro Indexierung.
      </p>

      <h2 id="warum">Warum die Sitemap 2026 wichtiger ist denn je</h2>
      <p>
        Drei Gründe machen die Sitemap zur Pflichtdatei:
      </p>
      <ul>
        <li>
          <strong>KI-Crawler sind effizienzgetrieben.</strong> Sie crawlen
          nicht das ganze Web — sie nutzen Sitemaps gezielt, um relevante
          Inhalte zu finden.
        </li>
        <li>
          <strong>Schnellere Reaktion auf Änderungen.</strong> Mit
          aktualisierten <code>lastmod</code>-Daten signalisierst du frische
          Inhalte direkt.
        </li>
        <li>
          <strong>Saubere Architektur-Signale.</strong> Crawler verstehen
          deine Site-Struktur schneller — und gewichten Inhalte besser.
        </li>
      </ul>

      <h2 id="aufbau">Aufbau einer modernen Sitemap</h2>
      <p>
        Eine saubere Sitemap 2026 enthält mindestens:
      </p>
      <ul>
        <li>
          <code>&lt;loc&gt;</code> — vollständige URL inklusive https://
        </li>
        <li>
          <code>&lt;lastmod&gt;</code> — letzte Änderung im ISO-8601-Format
        </li>
        <li>
          <code>&lt;changefreq&gt;</code> — wie oft sich der Inhalt ändert
          (optional, aber empfohlen)
        </li>
        <li>
          <code>&lt;priority&gt;</code> — Wichtigkeit relativ zu anderen
          Seiten (0.0–1.0)
        </li>
      </ul>
      <p>
        Bei mehr als 500 URLs lohnt sich ein Sitemap-Index, der auf
        einzelne thematische Sitemaps verweist (z. B. <code>/sitemap-blog.xml</code>,{" "}
        <code>/sitemap-cases.xml</code>).
      </p>

      <h2 id="ki">KI-Crawler und Sitemaps</h2>
      <p>
        Die wichtigsten KI-Crawler 2026, die Sitemaps aktiv lesen:
      </p>
      <ul>
        <li><strong>GPTBot</strong> (OpenAI)</li>
        <li><strong>PerplexityBot</strong> (Perplexity)</li>
        <li><strong>ClaudeBot</strong> (Anthropic)</li>
        <li><strong>Google-Extended</strong> (Google Gemini-Training)</li>
        <li><strong>CCBot</strong> (Common Crawl)</li>
      </ul>
      <p>
        Damit diese Crawler die Sitemap finden, gehört der Sitemap-Link in
        die robots.txt: <code>Sitemap: https://deine-domain.de/sitemap.xml</code>
      </p>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>
          <strong>Veraltete URLs:</strong> 404-Seiten in der Sitemap kosten
          Crawl-Budget
        </li>
        <li>
          <strong>Falsche lastmod-Daten:</strong> wenn jede Seite das gleiche
          Datum hat, ignorieren Crawler das Feld
        </li>
        <li>
          <strong>Noindex-Seiten enthalten:</strong> widersprüchliche Signale
        </li>
        <li>
          <strong>Unvollständig:</strong> wichtige Seiten fehlen, Test- oder
          Filter-URLs sind drin
        </li>
        <li>
          <strong>Nicht in robots.txt verlinkt:</strong> Crawler finden sie
          oft erst spät
        </li>
      </ul>

      <h2 id="tools">Tools und Generatoren</h2>
      <p>
        Für moderne Stacks gibt es kaum Aufwand:
      </p>
      <ul>
        <li>
          <strong>Next.js:</strong> <code>app/sitemap.ts</code> generiert
          dynamisch — keine externe Tools nötig
        </li>
        <li>
          <strong>WordPress:</strong> Yoast SEO oder Rank Math generieren
          automatisch
        </li>
        <li>
          <strong>Webflow:</strong> integrierter Generator
        </li>
        <li>
          <strong>Bestehende statische Seiten:</strong> XML-Sitemaps.com als
          Quick-Solution
        </li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Die Sitemap ist eine der unterschätztesten technischen
        SEO-Disziplinen 2026 — gerade weil KI-Crawler sie genauso intensiv
        nutzen wie klassische Suchmaschinen. Wer sie sauber pflegt,
        bekommt schnellere Indexierung und stabilere Sichtbarkeit.
      </p>
      <p>
        Investitionsaufwand: einmalig 30 Minuten Setup, danach
        selbstpflegend bei modernen Stacks. Wirkung: dauerhaft.
      </p>
    </>
  );
}
