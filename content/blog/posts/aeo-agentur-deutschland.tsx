import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "aeo-agentur-deutschland",
  title: "AEO-Agentur Deutschland: Worauf 2026 wirklich achten",
  highlight: "AEO",
  excerpt:
    "Answer Engine Optimization ist der wichtigste neue Marketing-Hebel 2026 — und in Deutschland gibt es bisher unter 30 echte Anbieter. Hier ist, wie du den richtigen findest.",
  description:
    "AEO-Agentur Deutschland 2026: Echte Anbieter erkennen, Kosten verstehen, Erfolgs-Hebel nutzen. Praxis-Leitfaden für deutschen Mittelstand.",
  date: "2026-05-26",
  readingTime: "8 min",
  category: "KI-Sichtbarkeit",
  cover: { from: "#1663de", to: "#0f4cb3", label: "AEO" },
  keywords: [
    "AEO Agentur Deutschland",
    "AEO Agentur",
    "Answer Engine Optimization",
    "AEO Beratung",
    "AEO Deutschland",
    "AEO vs SEO Agentur",
    "Generative Engine Optimization",
    "KI-Sichtbarkeit Beratung",
  ],
  toc: [
    { id: "was-ist-aeo", label: "Was ist AEO konkret?" },
    { id: "marktlage", label: "Marktlage 2026: Wer in Deutschland AEO wirklich kann" },
    { id: "leistung", label: "Was eine AEO-Agentur konkret macht" },
    { id: "kosten", label: "Was es kostet" },
    { id: "auswahl", label: "Worauf bei der Auswahl achten" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Was ist der Unterschied zwischen AEO und SEO?",
      a: "SEO optimiert für Suchmaschinen-Trefferlisten (Google, Bing). AEO (Answer Engine Optimization) optimiert für Antwort-Engines: Featured Snippets, Google AI Overviews, ChatGPT, Perplexity, Claude. Ziel ist nicht Platz 1 der Treffer, sondern die zitierte Antwort zu sein.",
    },
    {
      q: "Brauche ich AEO, wenn ich gutes SEO habe?",
      a: "Ja, zunehmend. 2026 starten 35–50 % aller Recherchen in KI-Tools statt in Google. Wer dort nicht zitiert wird, verliert systematisch Traffic — auch wenn das Google-Ranking gut ist. AEO ist die nächste Ebene über SEO, nicht der Ersatz.",
    },
    {
      q: "Was kostet eine AEO-Agentur 2026?",
      a: "Realistisch: 800–2.500 €/Monat für laufende Betreuung. Einmalige Initial-Optimierung: 500–1.500 €. Wer dir AEO-Pakete unter 200 €/Monat anbietet, hat den Markt nicht verstanden — AEO erfordert tiefes technisches Setup, das nicht automatisierbar ist.",
    },
    {
      q: "Wie messe ich AEO-Erfolg?",
      a: "Direkt: monatliches Tracking von KI-Antworten zu deinen wichtigsten Branchen-Fragen. Wirst du in ChatGPT, Claude, Perplexity, Gemini namentlich genannt? Indirekt: Direct-Traffic-Wachstum (Menschen suchen dich, nachdem sie deine Marke in einer KI-Antwort gesehen haben).",
    },
    {
      q: "Wie unterscheide ich echte AEO-Anbieter von SEO-Agenturen mit AEO-Label?",
      a: "Drei Tests: 1) Können sie Screenshots zeigen, in denen Kunden konkret in ChatGPT-Antworten genannt werden? 2) Kennen sie die llms.txt-Spec? 3) Können sie konkrete Schema.org-Strategien für deine Branche erklären? Wer ausweicht, hat das AEO-Label nur draufgeklebt.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        AEO (Answer Engine Optimization) ist 2026 der wichtigste neue
        Marketing-Hebel — und in Deutschland gibt es weniger als 30 Anbieter,
        die ihn wirklich beherrschen. Hier ist, wie du diese 30 von den
        300 Trittbrettfahrern unterscheidest, was es kostet und warum es
        sich lohnt.
      </p>

      <h2 id="was-ist-aeo">Was ist AEO konkret?</h2>
      <p>
        Answer Engine Optimization ist die systematische Optimierung deiner
        Webseite und deiner Marke, um in Antwort-Engines zitiert zu werden.
        Zu den relevanten Antwort-Engines gehören:
      </p>
      <ul>
        <li>ChatGPT (OpenAI) — 600+ Mio. wöchentliche Nutzer</li>
        <li>Claude (Anthropic) — Wachstums-Champion 2026</li>
        <li>Perplexity — quellen-orientiertes Such-LLM</li>
        <li>Google AI Overviews — KI-Antworten in Google-Suche</li>
        <li>Microsoft Copilot — Bing + ChatGPT integriert</li>
        <li>Voice-Assistants (Alexa, Siri, Google Assistant)</li>
      </ul>
      <p>
        AEO ist nicht „SEO 2.0" — es ist ein eigenes Disziplin mit eigenen
        Mechaniken: Schema.org-Maximierung, llms.txt-Aufbau, Crawler-Strategie
        für GPTBot/ClaudeBot/PerplexityBot, Citation-fähiger Content,
        Author-Entity-Aufbau.
      </p>

      <h2 id="marktlage">Marktlage 2026: Wer in Deutschland AEO wirklich kann</h2>
      <p>
        Drei Kategorien teilen den deutschen Markt:
      </p>
      <ul>
        <li>
          <strong>SEO-Agenturen mit AEO-Label (~75 % des Markts):</strong>
          Verkaufen klassisches SEO unter neuem Buzzword. Kennen meist weder
          llms.txt noch GPTBot-Konfiguration.
        </li>
        <li>
          <strong>Tech-affine Spezialisten (~20 %):</strong> Verstehen die
          Technik, aber meist ohne Branchenkenntnis oder DACH-Fokus.
        </li>
        <li>
          <strong>Echte AEO-Profis (~5 %):</strong> Verbinden Tech + Content
          + Branche. Diese sind 2026 die richtigen Partner — aber rar.
        </li>
      </ul>

      <h2 id="leistung">Was eine AEO-Agentur konkret macht</h2>
      <ol>
        <li>
          <strong>Crawler-Konfiguration:</strong> robots.txt für GPTBot,
          OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended.
        </li>
        <li>
          <strong>llms.txt-Aufbau:</strong> Strukturierte
          Selbstbeschreibung deines Unternehmens, die KI-Crawler lesen können.
        </li>
        <li>
          <strong>Schema.org-Maximierung:</strong> Organization, Person,
          FAQPage, Service, Article, BreadcrumbList — abgedeckt mit
          sameAs-Verknüpfungen.
        </li>
        <li>
          <strong>Author-Entity-Aufbau:</strong> Echter Mensch hinter dem
          Unternehmen, klar verknüpft mit LinkedIn, Wikipedia (falls relevant),
          Branchenmedien.
        </li>
        <li>
          <strong>Citation-Content:</strong> Datierte Fakten, attributierbare
          Aussagen, FAQ-Cluster — alles formuliert, dass KI es zitieren kann.
        </li>
        <li>
          <strong>Multi-LLM-Monitoring:</strong> Monatliches Tracking, in
          welchen KI-Antworten du genannt wirst — für deine Top-Branchenfragen.
        </li>
      </ol>

      <h2 id="kosten">Was es kostet</h2>
      <ul>
        <li><strong>Einmalige Initial-Optimierung:</strong> 500–1.500 €</li>
        <li><strong>Laufende AEO-Betreuung:</strong> 800–2.500 €/Monat</li>
        <li><strong>Integriertes Paket (Webdesign + AEO):</strong> ab 2.500 € einmalig + 1.500 €/Monat</li>
        <li><strong>Premium-AEO (mit Content-Produktion + Multi-LLM-Tracking):</strong> 2.500–4.500 €/Monat</li>
      </ul>
      <p>
        Wer dir AEO unter 200 €/Monat verspricht, betreibt entweder
        Schein-Marketing oder automatisiert mit ChatGPT-Generated-Content —
        was wiederum von KI-Crawlern abgewertet wird.
      </p>

      <h2 id="auswahl">Worauf bei der Auswahl achten</h2>
      <ol>
        <li>
          <strong>Konkrete KI-Erwähnungen vorzeigen können.</strong>
          Screenshots aus ChatGPT, Claude, Perplexity, wo Kunden namentlich
          genannt werden.
        </li>
        <li>
          <strong>Technisches Verständnis demonstrieren.</strong> Kann die
          Agentur dir die llms.txt eines Kunden zeigen? Erklärt sie
          robots.txt-Strategien für KI-Bots?
        </li>
        <li>
          <strong>Reporting auf KI-Ebene.</strong> Monatlich konkrete
          Erwähnungs-Zahlen — nicht „Sichtbarkeits-Indizes".
        </li>
        <li>
          <strong>Aktualität.</strong> Wer 2026 mit „GPT-3-Strategien"
          arbeitet, ist nicht up-to-date. Die LLM-Landschaft ändert sich
          quartalsweise.
        </li>
        <li>
          <strong>Klare Erfolgs-Garantie.</strong> „Erste KI-Erwähnungen
          innerhalb 90 Tagen" ist eine seriöse Zusage.
        </li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Eine AEO-Agentur in Deutschland 2026 zu finden ist wie ein Solar-
        Installateur 2010: 5 % der Anbieter können es wirklich, 95 % haben
        das Buzzword aufgeschnappt. Wer früh den richtigen Partner findet,
        baut Sichtbarkeit auf, die in 2–5 Jahren Standard wird.
      </p>
      <p>
        Investier 90 Minuten in 3 Anbieter-Gespräche. Stell die 5 Fragen
        aus diesem Artikel. Die richtige Agentur entlarvt sich in 15
        Minuten — durch konkrete Antworten statt Marketing-Sprache.
      </p>
    </>
  );
}
