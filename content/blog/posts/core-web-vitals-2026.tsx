import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "core-web-vitals-2026",
  title: "Core Web Vitals 2026: Wie schnell deine Webseite wirklich sein muss",
  highlight: "Core Web Vitals",
  excerpt:
    "Die Core Web Vitals sind 2026 strikter geworden — und der direkte Hebel für Conversion und Ranking. Hier sind die aktuellen Zielwerte und wie du sie erreichst.",
  description:
    "Core Web Vitals 2026: Aktuelle Zielwerte für LCP, INP, CLS — und konkrete Maßnahmen zur Optimierung. Für Mittelstand und Marketing-Verantwortliche.",
  date: "2026-05-05",
  readingTime: "8 min",
  category: "Technisches SEO",
  cover: {
    from: "#0f4cb3",
    to: "#1663de",
    label: "CWV",
  },
  keywords: [
    "Core Web Vitals 2026",
    "LCP optimieren",
    "INP",
    "CLS",
    "Largest Contentful Paint",
    "Interaction to Next Paint",
    "Cumulative Layout Shift",
    "Page Experience",
    "Lighthouse Score 2026",
    "Web Vitals Mittelstand",
  ],
  toc: [
    { id: "warum", label: "Warum Core Web Vitals 2026 wichtiger sind denn je" },
    { id: "lcp", label: "LCP: Largest Contentful Paint" },
    { id: "inp", label: "INP: Interaction to Next Paint" },
    { id: "cls", label: "CLS: Cumulative Layout Shift" },
    { id: "tools", label: "Tools zum Messen" },
    { id: "umsetzung", label: "Praktische Optimierungs-Schritte" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Sind Core Web Vitals wirklich ein Ranking-Faktor?",
      a: "Ja, seit 2021 offiziell — und das Gewicht ist 2026 deutlich gestiegen. Bei zwei vergleichbar relevanten Seiten entscheidet die schnellere fast immer. Zusätzlich beeinflusst Performance direkt die Conversion-Rate — eine Sekunde mehr Ladezeit kostet rund 7 % Conversion.",
    },
    {
      q: "Was ist 2026 der wichtigste Wert?",
      a: "INP (Interaction to Next Paint) ist 2026 der unterschätzteste, aber wichtigste Wert. Er misst, wie reaktionsschnell deine Seite auf Klicks und Eingaben reagiert. Schlechter INP bedeutet: Nutzer klicken zweimal, brechen ab, sind frustriert.",
    },
    {
      q: "Wie viel kostet eine Performance-Optimierung?",
      a: "Hängt vom Ausgangszustand ab. Bei einer WordPress-Seite mit 30 Plugins kann es Tage dauern, eine moderne Next.js-Seite ist meist schon nahe an den Zielwerten. Wer mit Next.js + Vercel arbeitet, hat 80 % der Optimierungen out of the box.",
    },
    {
      q: "Reicht ein guter Lighthouse-Score?",
      a: "Nein. Lighthouse ist ein Lab-Test mit synthetischen Bedingungen. Was zählt, sind Real-User-Metrics (RUM) — also die echten Werte deiner Besucher. Google Search Console zeigt diese unter Page Experience.",
    },
    {
      q: "Macht ein CDN einen Unterschied?",
      a: "Massiv, besonders bei internationalem Traffic. Aber selbst für rein deutsche Zielgruppen reduziert ein CDN die Time-to-First-Byte um 100–300ms. Vercel bringt CDN standardmäßig mit, ebenso Cloudflare Pages und Netlify.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Performance ist 2026 kein optionales Feature mehr, sondern ein
        direkter Ranking- und Conversion-Hebel. Die Core Web Vitals sind
        die drei Werte, die du als Mittelständler kennen und steuern
        musst. Hier ist die aktuelle Lage.
      </p>

      <h2 id="warum">Warum Core Web Vitals 2026 wichtiger sind denn je</h2>
      <p>
        Drei Entwicklungen haben Performance zur Pflicht gemacht:
      </p>
      <ul>
        <li>
          <strong>Google AI Overviews</strong> bevorzugen schnelle Seiten als
          Quellen — langsame Seiten werden in KI-Antworten seltener zitiert.
        </li>
        <li>
          <strong>Mobile-First Indexing</strong> ist Standard — und Mobile
          ist deutlich anfälliger für Performance-Probleme.
        </li>
        <li>
          <strong>Conversion-Sensitivität</strong> ist gestiegen: Nutzer
          erwarten sub-2-Sekunden-Ladezeiten und brechen sonst ab.
        </li>
      </ul>

      <h2 id="lcp">LCP: Largest Contentful Paint</h2>
      <p>
        <strong>Definition:</strong> Zeit, bis das größte sichtbare Element
        (typischerweise das Hero-Bild oder die Headline) gerendert ist.
      </p>
      <p>
        <strong>Zielwert 2026:</strong>
      </p>
      <ul>
        <li>Gut: &lt; 2.0 s</li>
        <li>Verbesserungswürdig: 2.0 – 4.0 s</li>
        <li>Schlecht: &gt; 4.0 s</li>
      </ul>
      <p>
        <strong>Häufigste Ursachen für schlechtes LCP:</strong> große
        unoptimierte Hero-Bilder, render-blocking JavaScript, langsame
        Server-Antwortzeiten, ungenutzte CSS-Dateien.
      </p>
      <p>
        <strong>Quick Wins:</strong> Hero-Bild mit <code>priority</code>{" "}
        laden, Bilder in WebP/AVIF konvertieren, kritisches CSS inline
        halten, Server-CDN aktivieren.
      </p>

      <h2 id="inp">INP: Interaction to Next Paint</h2>
      <p>
        <strong>Definition:</strong> Misst, wie schnell deine Seite auf
        Nutzer-Interaktionen (Klicks, Taps, Eingaben) reagiert. Hat 2024
        das ältere FID abgelöst und ist 2026 der wichtigste Web-Vital.
      </p>
      <p>
        <strong>Zielwert 2026:</strong>
      </p>
      <ul>
        <li>Gut: &lt; 200 ms</li>
        <li>Verbesserungswürdig: 200 – 500 ms</li>
        <li>Schlecht: &gt; 500 ms</li>
      </ul>
      <p>
        <strong>Häufigste Ursachen für schlechtes INP:</strong> schwere
        JavaScript-Bundles, blockierende Third-Party-Scripts (Tracking,
        Chat-Widgets), uneffiziente Event-Handler.
      </p>
      <p>
        <strong>Quick Wins:</strong> JavaScript-Code-Splitting,
        Third-Party-Scripts mit <code>defer</code> oder erst nach
        Interaktion laden, Event-Handler debouncen, schwere Komponenten
        lazy laden.
      </p>

      <h2 id="cls">CLS: Cumulative Layout Shift</h2>
      <p>
        <strong>Definition:</strong> Misst, wie stark sich das Layout während
        des Ladens verschiebt. Ein Bild, das nach 2 Sekunden auftaucht und
        den Text nach unten schiebt, verursacht hohes CLS.
      </p>
      <p>
        <strong>Zielwert 2026:</strong>
      </p>
      <ul>
        <li>Gut: &lt; 0.1</li>
        <li>Verbesserungswürdig: 0.1 – 0.25</li>
        <li>Schlecht: &gt; 0.25</li>
      </ul>
      <p>
        <strong>Häufigste Ursachen für schlechtes CLS:</strong> Bilder ohne
        Width/Height-Attribute, dynamisch nachgeladene Werbung, Webfonts
        ohne <code>font-display: swap</code>, animierte Layout-Änderungen.
      </p>
      <p>
        <strong>Quick Wins:</strong> Width/Height auf jedem{" "}
        <code>&lt;img&gt;</code>, <code>aspect-ratio</code> auf Containern,
        Webfonts mit <code>next/font</code> oder System-Font-Fallback.
      </p>

      <h2 id="tools">Tools zum Messen</h2>
      <p>
        Drei Tools, die jeder Mittelständler nutzen sollte:
      </p>
      <ul>
        <li>
          <strong>Google PageSpeed Insights</strong> — schneller Lab-Test
          plus Field-Daten aus dem Chrome User Experience Report (CrUX)
        </li>
        <li>
          <strong>Google Search Console → Page Experience</strong> — zeigt
          aggregierte Real-User-Daten und Probleme pro URL-Gruppe
        </li>
        <li>
          <strong>Vercel Speed Insights</strong> oder ähnliche RUM-Tools —
          tracken die Werte deiner echten Besucher in Echtzeit
        </li>
      </ul>

      <h2 id="umsetzung">Praktische Optimierungs-Schritte</h2>
      <p>
        Empfohlene Reihenfolge für Mittelständler ohne Inhouse-Performance-Team:
      </p>
      <ol>
        <li>
          <strong>Hosting prüfen:</strong> Shared-Hosting ist 2026 in den
          meisten Fällen Conversion-Killer. Wechsel zu Vercel, Cloudflare
          Pages oder vergleichbar.
        </li>
        <li>
          <strong>Bilder optimieren:</strong> Alle Hero-Bilder in WebP/AVIF,
          mit <code>next/image</code> oder vergleichbarem Tool ausliefern.
        </li>
        <li>
          <strong>Schriften optimieren:</strong> Maximal 2 Schriftfamilien,
          per <code>next/font</code> oder mit self-hosting plus{" "}
          <code>font-display: swap</code>.
        </li>
        <li>
          <strong>JavaScript reduzieren:</strong> Plugins, die du nicht
          aktiv nutzt, entfernen. Tracking-Skripte erst nach
          Cookie-Consent laden.
        </li>
        <li>
          <strong>Third-Party prüfen:</strong> Chat-Widgets, Pop-Ups,
          Tracking — jeweils die Notwendigkeit kritisch hinterfragen.
        </li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Core Web Vitals sind 2026 keine technische Spielerei mehr, sondern
        ein direkter Conversion- und Ranking-Hebel. Die drei Zielwerte
        (LCP &lt; 2 s, INP &lt; 200 ms, CLS &lt; 0.1) sind erreichbar — mit
        moderner Tech-Basis sogar mit minimalem Aufwand.
      </p>
      <p>
        Wer 2026 nicht in diesem Bereich liegt, verliert systematisch
        gegen Wettbewerb, der es ernst nimmt. Performance ist 2026 keine
        IT-Aufgabe — sondern Geschäftsführungs-Thema.
      </p>
    </>
  );
}
