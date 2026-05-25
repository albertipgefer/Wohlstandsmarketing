import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "ki-sichtbarkeit-messen-tools-2026",
  title: "KI-Sichtbarkeit messen: 5 Tools, die 2026 wirklich helfen",
  highlight: "Messen",
  excerpt:
    "Was nicht gemessen wird, wird nicht verbessert. Diese 5 Tools zeigen dir 2026, wie oft du in ChatGPT, Perplexity und Co. genannt wirst — und warum.",
  description:
    "5 Tools zur Messung der KI-Sichtbarkeit 2026: Otterly, Profound, Peec, plus pragmatische manuelle Methoden. Mit konkreten Setup-Tipps.",
  date: "2026-02-26",
  readingTime: "7 min",
  category: "KI-Sichtbarkeit",
  popularity: 78,
  cover: { from: "#1663de", to: "#0f4cb3", label: "Metrics" },
  keywords: [
    "KI Sichtbarkeit messen",
    "AI Visibility Tracking",
    "Otterly",
    "Profound",
    "Peec AI",
    "ChatGPT Tracking",
    "Citation Tracking",
    "AI Search Analytics",
  ],
  toc: [
    { id: "warum", label: "Warum Messung 2026 Pflicht ist" },
    { id: "tools", label: "Die 5 wichtigsten Tools" },
    { id: "manuell", label: "Manuelle Methoden (kostenlos)" },
    { id: "kpis", label: "Welche KPIs zählen" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wie oft sollte ich KI-Sichtbarkeit messen?",
      a: "Mindestens monatlich, idealerweise alle 2 Wochen. KI-Modelle aktualisieren ihren Index regelmäßig — wer nicht misst, merkt erst nach Wochen, wenn etwas kippt.",
    },
    {
      q: "Sind die Tools ihr Geld wert?",
      a: "Ab einem gewissen Volumen ja. Für Mittelstand mit 5-10 wichtigen Suchanfragen reicht oft manuelles Testing. Für Marken mit 50+ relevanten Queries lohnen sich spezialisierte Tools schnell.",
    },
    {
      q: "Was kostet ein KI-Visibility-Tool?",
      a: "Einstieg meist 50-150 EUR/Monat. Enterprise-Tools mit Konkurrenz-Tracking und API ab 500 EUR/Monat. Für die meisten Mittelständler reicht der mittlere Bereich.",
    },
    {
      q: "Kann ich KI-Sichtbarkeit in Google Analytics sehen?",
      a: "Indirekt. Referral-Traffic von Perplexity ist klar zuzuordnen. ChatGPT- und Claude-Traffic ist schwer zu attribuieren, weil oft als Direct-Traffic oder Brand-Search erscheint.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        KI-Sichtbarkeit ist 2026 ein eigenständiger Marketing-Kanal — mit
        eigenem Tooling. Hier sind die 5 Tools, die wirklich helfen, plus
        kostenlose Methoden, mit denen jeder Mittelständler heute starten
        kann.
      </p>

      <h2 id="warum">Warum Messung 2026 Pflicht ist</h2>
      <p>
        Was du nicht misst, kannst du nicht verbessern. KI-Empfehlungen
        sind kein Zufall: sie folgen Mustern, die sich beobachten und
        beeinflussen lassen. Wer regelmäßig prüft, sieht Veränderungen
        sofort — und kann gegensteuern, bevor Konkurrenz nachzieht.
      </p>

      <h2 id="tools">Die 5 wichtigsten Tools</h2>

      <h3>1. Otterly</h3>
      <p>
        Spezialisiert auf AI-Visibility. Trackt Erwähnungen in ChatGPT,
        Perplexity, Gemini und Claude pro Suchanfrage. Übersichtliches
        Dashboard, gute Konkurrenz-Vergleichs-Features.
      </p>

      <h3>2. Profound</h3>
      <p>
        Enterprise-fokussiert. Granulare Filter, Sentiment-Analyse,
        API-Zugang. Lohnt sich ab Marken mit hohem Budget und
        komplexem Tracking-Bedarf.
      </p>

      <h3>3. Peec AI</h3>
      <p>
        Europäischer Anbieter, DSGVO-konform. Stark im
        DACH-Markt-Fokus. Gut für Mittelständler, die EU-Hosting
        bevorzugen.
      </p>

      <h3>4. Semrush AI Search Optimizer</h3>
      <p>
        Add-on zum bestehenden Semrush-Account. Praktisch, wenn man
        Semrush ohnehin nutzt — nicht so tiefgehend wie spezialisierte
        Tools.
      </p>

      <h3>5. AlsoAsked &amp; AnswerThePublic</h3>
      <p>
        Indirekte Tools: zeigen, welche Fragen Nutzer rund um dein
        Thema stellen. Hilft, AEO-Content gezielt zu produzieren.
      </p>

      <h2 id="manuell">Manuelle Methoden (kostenlos)</h2>
      <p>
        Wer ohne Budget starten will, kann monatlich folgendes
        durchgehen:
      </p>
      <ol>
        <li>10-15 wichtigste Kundenanfragen definieren</li>
        <li>Jede in ChatGPT, Perplexity, Claude eingeben</li>
        <li>Notieren: Wirst du genannt? Position? Wie?</li>
        <li>Tabelle führen (Datum, Plattform, Query, Ergebnis)</li>
        <li>Monatlich vergleichen, Trends ableiten</li>
      </ol>

      <h2 id="kpis">Welche KPIs zählen</h2>
      <ul>
        <li><strong>Mention Rate</strong>: in wie viel % der Anfragen wirst du genannt?</li>
        <li><strong>Position</strong>: an wievielter Stelle in der Antwort?</li>
        <li><strong>Sentiment</strong>: positiv, neutral, negativ?</li>
        <li><strong>Co-Mentions</strong>: mit welchen Wettbewerbern wirst du genannt?</li>
        <li><strong>Referral Traffic</strong>: wie viele Klicks aus KI-Plattformen?</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        KI-Sichtbarkeit ohne Messung ist Blindflug. Wer monatlich
        prüft — egal ob mit Tool oder manuell — gewinnt
        Wettbewerbsvorteil. Wer es nicht tut, merkt zu spät, wenn die
        Konkurrenz vorbeizieht.
      </p>
    </>
  );
}
