import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "page-experience-2026",
  title: "Page Experience 2026: Die neuen Google-Signale für besseres Ranking",
  highlight: "Page Experience",
  excerpt:
    "Google bewertet Page Experience 2026 strenger denn je. Wer technisch sauber arbeitet, gewinnt Ranking-Punkte automatisch — wer nicht, verliert sie schleichend.",
  description:
    "Page Experience 2026: Die neuen Google-Signale für Mittelstand. Core Web Vitals, HTTPS, Mobile-Friendliness, Interstitials.",
  date: "2026-04-09",
  readingTime: "7 min",
  category: "Technisches SEO",
  cover: { from: "#0f4cb3", to: "#1663de", label: "Page Exp." },
  keywords: [
    "Page Experience",
    "Google Page Experience",
    "Core Web Vitals",
    "Mobile Friendly Test",
    "HTTPS SEO",
    "Interstitial Penalty",
    "User Experience SEO",
  ],
  toc: [
    { id: "warum", label: "Warum Page Experience 2026 strenger ist" },
    { id: "signale", label: "Die wichtigsten Signale im Detail" },
    { id: "messen", label: "So misst du Page Experience" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Sind Pop-Ups wirklich schädlich für SEO?",
      a: "Vollbild-Interstitials, die den Hauptinhalt auf Mobile verdecken, sind ein klares Negativsignal. Cookie-Banner sind erlaubt, wenn rechtlich nötig — aber kleine Newsletter-Pop-Ups direkt beim Seitenaufruf kosten Ranking.",
    },
    {
      q: "Brauche ich AMP noch?",
      a: "Nein. Google hat AMP-spezifische Vorteile längst eingestellt. Wer eine schnelle, mobile-optimierte Seite hat, braucht kein AMP mehr — eher im Gegenteil, AMP bringt zusätzliche Wartung ohne klaren Vorteil.",
    },
    {
      q: "Wirkt sich Page Experience direkt auf Rankings aus?",
      a: "Ja, aber abgestuft. Bei zwei vergleichbar relevanten Seiten gewinnt die mit besserer Page Experience. Bei sehr unterschiedlicher Relevanz schlägt Relevanz die Page Experience — aber niemand will sich darauf verlassen müssen.",
    },
    {
      q: "Wie oft prüft Google Page Experience?",
      a: "Kontinuierlich, basierend auf echten Nutzerdaten (CrUX). Anders als manche andere Ranking-Faktoren wird Page Experience laufend gemessen, nicht nur zu einem bestimmten Crawl-Zeitpunkt.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Page Experience ist der Sammelbegriff für alles, was die
        technische Qualität deiner Webseite aus Nutzersicht beschreibt.
        Google misst diese Faktoren über echte Nutzerdaten und gewichtet
        sie 2026 stärker als je zuvor. Was du wissen musst.
      </p>

      <h2 id="warum">Warum Page Experience 2026 strenger ist</h2>
      <p>
        Drei Entwicklungen treiben die strengere Bewertung:
      </p>
      <ul>
        <li>
          <strong>Mobile dominiert.</strong> 65 %+ der Suchanfragen kommen
          mobil. Mobile-Performance ist nicht mehr optional.
        </li>
        <li>
          <strong>KI-Antworten brauchen schnelle Quellen.</strong> Google
          AI Overviews ignorieren langsame Seiten weitgehend.
        </li>
        <li>
          <strong>Nutzererwartungen steigen.</strong> Die Toleranz für
          Ladezeit über 2 s sinkt jährlich messbar.
        </li>
      </ul>

      <h2 id="signale">Die wichtigsten Signale im Detail</h2>

      <h3>1. Core Web Vitals</h3>
      <p>
        LCP &lt; 2.0 s, INP &lt; 200 ms, CLS &lt; 0.1. Das sind 2026 die
        offiziellen Schwellenwerte für „gut".
      </p>

      <h3>2. HTTPS</h3>
      <p>
        Pflicht. Ohne HTTPS keine Top-Rankings — und kein Vertrauen bei
        Nutzern. Let's Encrypt macht es kostenlos.
      </p>

      <h3>3. Mobile-Friendliness</h3>
      <p>
        Responsive Design ist Standard, nicht Bonus. Google's
        Mobile-Friendly-Test zeigt offene Punkte sofort.
      </p>

      <h3>4. Keine störenden Interstitials</h3>
      <p>
        Vollbild-Pop-Ups, die den Hauptinhalt verdecken, sind ein
        klares Negativsignal. Cookie-Banner sind erlaubt, alles andere
        sollte zurückhaltend sein.
      </p>

      <h3>5. Sichere Browsing-Umgebung</h3>
      <p>
        Keine Malware, kein Phishing, keine unsicheren
        Drittanbieter-Scripts. Google Search Console zeigt Probleme
        proaktiv.
      </p>

      <h2 id="messen">So misst du Page Experience</h2>
      <ul>
        <li>
          <strong>Google Search Console</strong> → Page Experience Report
        </li>
        <li>
          <strong>PageSpeed Insights</strong> — Lab + Field-Daten
        </li>
        <li>
          <strong>Lighthouse</strong> — lokal im Chrome DevTools
        </li>
        <li>
          <strong>Real-User-Monitoring</strong> (Vercel Speed Insights,
          Sentry, etc.) — echte Nutzer-Werte
        </li>
      </ul>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>
          <strong>Performance-Optimierung nur einmalig</strong> — sollte
          monatlich überprüft werden
        </li>
        <li>
          <strong>Mobile als Nachsicht</strong> — nicht als Standard
          designed
        </li>
        <li>
          <strong>Schwere Third-Party-Scripts</strong> — kosten massiv INP
        </li>
        <li>
          <strong>Pop-Ups auf Mobile</strong> — direkter Conversion- und
          Ranking-Killer
        </li>
        <li>
          <strong>Nicht in echten Nutzerdaten messen</strong> — nur Lab-Tests
          sind unvollständig
        </li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Page Experience ist 2026 ein direkter Ranking-Hebel — und einer
        der Faktoren, an denen Mittelständler am leichtesten überholt
        werden, weil Konkurrenz mit moderner Tech-Basis (Next.js, Vercel,
        etc.) automatisch besser dasteht.
      </p>
      <p>
        Wer hier nicht in den grünen Bereich kommt, verliert
        systematisch — egal wie gut der Inhalt ist.
      </p>
    </>
  );
}
