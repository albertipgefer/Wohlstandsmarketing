import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "javascript-seo-spa-2026",
  title: "JavaScript-SEO 2026: Wie SPAs jetzt richtig ranken",
  highlight: "JS-SEO",
  excerpt:
    "Single-Page-Apps haben jahrelang SEO-Probleme verursacht. 2026 ist das Thema gelöst — wenn man die Architektur richtig wählt.",
  description:
    "JavaScript-SEO 2026: Wie React, Vue, Next.js und andere SPAs heute zuverlässig ranken. Mit konkreten Architektur-Empfehlungen.",
  date: "2026-02-07",
  readingTime: "7 min",
  category: "Technisches SEO",
  popularity: 55,
  cover: { from: "#0f4cb3", to: "#1663de", label: "JS-SEO" },
  keywords: [
    "JavaScript SEO",
    "SPA SEO",
    "React SEO",
    "Next.js SEO",
    "Vue SEO",
    "Server Side Rendering",
    "Static Site Generation",
  ],
  toc: [
    { id: "problem", label: "Das alte JavaScript-SEO-Problem" },
    { id: "loesungen", label: "Die 3 modernen Lösungen" },
    { id: "ssg", label: "Static Site Generation (SSG)" },
    { id: "ssr", label: "Server-Side Rendering (SSR)" },
    { id: "isr", label: "Incremental Static Regeneration (ISR)" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Crawlt Google JavaScript zuverlässig?",
      a: "Inzwischen ja, aber mit Verzögerung. Google verarbeitet JS in einer zweiten Render-Welle — was Tage dauern kann. Für KI-Crawler ist die Lage schlechter: viele lesen reines JS schlecht oder gar nicht. SSR oder SSG ist 2026 die sichere Wahl.",
    },
    {
      q: "Reicht React mit Next.js für gutes SEO?",
      a: "Ja, wenn Next.js richtig genutzt wird. Standard mit App Router + Static Generation liefert HTML, das Crawler ohne JavaScript verstehen. Pures Client-Side React (ohne SSR/SSG) ist 2026 für SEO weiterhin problematisch.",
    },
    {
      q: "Was ist der Unterschied zwischen SSR und SSG?",
      a: "SSR rendert HTML bei jedem Request neu. SSG generiert HTML einmal zum Build-Zeitpunkt. SSG ist schneller und günstiger, SSR ist dynamischer. ISR kombiniert beides — perfekt für viele Mittelstandsprojekte.",
    },
    {
      q: "Brauche ich für ein SaaS-Dashboard SSR?",
      a: "Für die öffentlich crawlbaren Seiten (Marketing, Blog, Pricing) ja, idealerweise SSG. Für das Logged-in-Dashboard ist CSR okay — Google indexiert eh nichts hinter Login.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Vor 5 Jahren war JavaScript-SEO ein Albtraum. 2026 ist das Thema
        gelöst — aber nur, wenn die Architektur richtig gewählt wird.
        Hier sind die drei Lösungen, die wirklich funktionieren.
      </p>

      <h2 id="problem">Das alte JavaScript-SEO-Problem</h2>
      <p>
        Klassische SPAs lieferten initial nur ein leeres HTML-Skelett
        plus JavaScript-Bundle. Suchmaschinen mussten JS ausführen, um
        Inhalte zu sehen — was lange dauerte und unzuverlässig war.
      </p>
      <p>
        Ergebnis: schlechte Rankings, lange Indexierungszeiten,
        komplette Sichtbarkeit-Lücken bei KI-Crawlern, die JS oft gar
        nicht ausführen.
      </p>

      <h2 id="loesungen">Die 3 modernen Lösungen</h2>
      <ul>
        <li><strong>SSG</strong> — Statische HTML-Generierung zum Build</li>
        <li><strong>SSR</strong> — Server rendert HTML bei jedem Request</li>
        <li><strong>ISR</strong> — Hybrid aus beidem mit Cache-Revalidation</li>
      </ul>

      <h2 id="ssg">Static Site Generation (SSG)</h2>
      <p>
        Beste Performance, einfachste Skalierung. Pro URL wird einmal
        beim Build ein HTML generiert und über CDN ausgeliefert.
        Crawler bekommen sofort vollständiges HTML.
      </p>
      <p>
        Perfekt für: Marketing-Seiten, Blogs, Dokumentation, Cases.
        Tools: Next.js (mit App Router default), Astro, Hugo, Jekyll.
      </p>

      <h2 id="ssr">Server-Side Rendering (SSR)</h2>
      <p>
        HTML wird pro Request frisch generiert. Mehr Server-Last als
        SSG, aber notwendig für nutzerspezifische oder hochdynamische
        Inhalte.
      </p>
      <p>
        Perfekt für: Suchergebnis-Seiten, personalisierte Inhalte,
        oft-aktualisierte Daten. Tools: Next.js (mit dynamic params),
        Remix, Nuxt.
      </p>

      <h2 id="isr">Incremental Static Regeneration (ISR)</h2>
      <p>
        Hybrid: Seiten werden statisch generiert, aber automatisch
        regeneriert nach definierten Zeitintervallen oder Events.
        Performance von SSG, Aktualität von SSR.
      </p>
      <p>
        Perfekt für: Blogs, Cases, Produkt-Kataloge mit moderater
        Update-Frequenz. Tools: Next.js (native ISR), Astro mit
        Server-Output.
      </p>

      <h2 id="fazit">Fazit</h2>
      <p>
        JavaScript-SEO ist 2026 kein Problem mehr — wenn man Next.js
        mit SSG, ISR oder SSR statt purem Client-Side-Rendering nutzt.
        Wer 2026 noch reine SPAs ohne Server-Rendering baut, riskiert
        SEO-Sichtbarkeit und KI-Empfehlbarkeit.
      </p>
    </>
  );
}
