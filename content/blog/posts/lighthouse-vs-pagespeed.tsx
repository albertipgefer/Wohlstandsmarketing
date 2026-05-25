import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "lighthouse-vs-pagespeed-2026",
  title: "Lighthouse vs PageSpeed: Welcher Score zählt 2026 wirklich?",
  highlight: "Score",
  excerpt:
    "Lighthouse-Scores sind Lab-Tests. PageSpeed Insights zeigt echte Nutzerdaten. Wer 2026 nur Lighthouse optimiert, optimiert am Markt vorbei.",
  description:
    "Lighthouse vs PageSpeed Insights 2026: Was Lab- vs Field-Daten wirklich bedeuten — und welche Werte du priorisieren solltest.",
  date: "2026-02-16",
  readingTime: "6 min",
  category: "Technisches SEO",
  popularity: 60,
  cover: { from: "#0f4cb3", to: "#1663de", label: "Score" },
  keywords: [
    "Lighthouse Score",
    "PageSpeed Insights",
    "Lab Data vs Field Data",
    "CrUX",
    "Real User Metrics",
    "Performance SEO",
  ],
  toc: [
    { id: "unterschied", label: "Lab vs Field — der Hauptunterschied" },
    { id: "lighthouse", label: "Was Lighthouse misst" },
    { id: "pagespeed", label: "Was PageSpeed Insights zeigt" },
    { id: "priorisierung", label: "Worauf du dich konzentrieren solltest" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Reicht ein Lighthouse-Score von 100?",
      a: "Nein. Ein perfekter Lighthouse-Score sagt nichts über echte Nutzer-Performance. Wenn die Field-Daten in PageSpeed Insights schlecht sind, gewinnen klassische Rankings trotzdem nicht.",
    },
    {
      q: "Welche Tools liefern Field-Daten?",
      a: "PageSpeed Insights, Google Search Console (Page Experience), Vercel Speed Insights, Cloudflare Web Analytics. Field-Daten kommen aus dem Chrome User Experience Report (CrUX) oder eigenen RUM-Tools.",
    },
    {
      q: "Wie lange dauert es, bis CrUX-Daten erscheinen?",
      a: "Eine Seite braucht mindestens 28 Tage Datenpunkte für CrUX. Neue Seiten zeigen anfangs keine Field-Daten — bis dahin sind Lab-Tests die einzige Orientierung.",
    },
    {
      q: "Soll ich beide Tools nutzen?",
      a: "Ja. Lighthouse für schnelle Iterationen während der Entwicklung. PageSpeed Insights für die echte Realitätsprüfung. Wer nur Lighthouse nutzt, sieht den Markt nicht.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Lighthouse und PageSpeed Insights sehen ähnlich aus, messen
        aber unterschiedliche Dinge. Wer 2026 die Unterschiede nicht
        versteht, optimiert am Markt vorbei.
      </p>

      <h2 id="unterschied">Lab vs Field — der Hauptunterschied</h2>
      <p>
        <strong>Lab-Daten</strong>: Test in kontrollierter Umgebung mit
        festen Bedingungen. Reproduzierbar, aber nicht repräsentativ
        für echte Nutzer.
      </p>
      <p>
        <strong>Field-Daten</strong>: aggregiert aus echten Nutzer-Sessions
        (Chrome User Experience Report). Repräsentativ, aber mit
        Varianz und Verzögerung.
      </p>

      <h2 id="lighthouse">Was Lighthouse misst</h2>
      <ul>
        <li>Lab-Test mit simuliertem mobilem 4G-Gerät</li>
        <li>Score 0-100 für Performance, Accessibility, SEO, Best Practices</li>
        <li>Direkt im Chrome DevTools verfügbar</li>
        <li>Gut für iterative Optimierung während Entwicklung</li>
      </ul>

      <h2 id="pagespeed">Was PageSpeed Insights zeigt</h2>
      <ul>
        <li>Lab-Daten (Lighthouse-basiert)</li>
        <li><strong>Plus Field-Daten</strong> aus CrUX für reale Nutzer</li>
        <li>Origin Summary über alle Seiten der Domain</li>
        <li>Direkter Bezug zu Google Search Console Page Experience</li>
      </ul>

      <h2 id="priorisierung">Worauf du dich konzentrieren solltest</h2>
      <p>
        Reihenfolge für Mittelstand-Optimierung:
      </p>
      <ol>
        <li>Field-Daten (PageSpeed Insights) sind das, was Google für Rankings nutzt</li>
        <li>Core Web Vitals in den grünen Bereich bringen (LCP, INP, CLS)</li>
        <li>Lighthouse als schnelles Iterations-Tool nutzen</li>
        <li>Monatlich PageSpeed Insights für die wichtigsten URLs prüfen</li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Lighthouse ist dein Werkstatt-Tool, PageSpeed Insights ist die
        Realitätsprüfung. Wer beides klug nutzt, optimiert effizient
        und sieht echte Wirkung in Rankings und Conversion.
      </p>
    </>
  );
}
