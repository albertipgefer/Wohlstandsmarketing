import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "robots-txt-ki-crawler-2026",
  title: "robots.txt 2026: Welche KI-Crawler du erlauben solltest (und welche nicht)",
  highlight: "robots.txt",
  excerpt:
    "Mit einer einzigen Zeile in deiner robots.txt entscheidest du, ob ChatGPT, Perplexity oder Claude dich überhaupt lesen dürfen. Hier ist die richtige Konfiguration für 2026.",
  description:
    "robots.txt 2026: Welche KI-Bots (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) du erlauben solltest, um in KI-Antworten aufzutauchen.",
  date: "2026-05-19",
  readingTime: "5 min",
  category: "Technisches SEO",
  cover: {
    from: "#0f4cb3",
    to: "#1663de",
    label: "robots.txt",
  },
  keywords: [
    "robots.txt",
    "GPTBot",
    "PerplexityBot",
    "ClaudeBot",
    "Google-Extended",
    "KI Crawler erlauben",
    "AI Crawler robots.txt",
    "OpenAI Crawler",
    "User-Agent",
  ],
  toc: [
    { id: "warum-wichtig", label: "Warum die robots.txt 2026 wichtiger ist denn je" },
    { id: "wichtige-bots", label: "Die wichtigsten KI-Bots im Überblick" },
    { id: "konfiguration", label: "Empfohlene Konfiguration" },
  ],
  faq: [
    {
      q: "Was passiert, wenn ich GPTBot blockiere?",
      a: "Deine Inhalte werden nicht ins Trainings- und Live-Datenset von ChatGPT aufgenommen. Du wirst dort dann nicht empfohlen — auch nicht bei Suchanfragen, die exakt zu dir passen würden.",
    },
    {
      q: "Schaden KI-Crawler meiner Server-Performance?",
      a: "In der Regel nein. Seriöse KI-Crawler respektieren Crawl-Delays. Wenn du Probleme siehst, kannst du Crawl-Delay-Direktiven setzen oder nur bestimmte Pfade freigeben.",
    },
    {
      q: "Brauche ich robots.txt überhaupt, wenn ich keinen sensiblen Content habe?",
      a: "Ja. Auch wenn du nichts blockierst, ist eine saubere robots.txt mit allen erlaubten Bots ein positives Signal. Sie zeigt, dass deine Seite professionell gepflegt wird.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Die <code>robots.txt</code> ist der erste Kontakt zwischen deiner
        Webseite und jedem Crawler — auch jedem KI-Crawler. Eine falsche
        Zeile dort und du verschwindest still und leise aus den Antworten
        von ChatGPT, Perplexity oder Claude.
      </p>

      <h2 id="warum-wichtig">Warum die robots.txt 2026 wichtiger ist denn je</h2>
      <p>
        Bis 2023 war die <code>robots.txt</code> für die meisten Webseiten
        kaum relevant — man hat sie einmal eingerichtet und nie wieder
        angefasst. Mit dem Aufkommen generativer KI hat sich das geändert:
        Jeder große KI-Anbieter hat einen eigenen Bot, und jeder dieser
        Bots respektiert (idealerweise) die <code>robots.txt</code>.
      </p>

      <h2 id="wichtige-bots">Die wichtigsten KI-Bots im Überblick</h2>
      <ul>
        <li>
          <strong>GPTBot</strong> — OpenAI, für ChatGPT und Custom GPTs
        </li>
        <li>
          <strong>OAI-SearchBot</strong> — OpenAI, für SearchGPT
        </li>
        <li>
          <strong>ChatGPT-User</strong> — OpenAI, On-Demand-Abrufe durch Nutzer
        </li>
        <li>
          <strong>PerplexityBot</strong> — Perplexity AI
        </li>
        <li>
          <strong>ClaudeBot</strong> &amp; <strong>anthropic-ai</strong> —
          Anthropic, für Claude
        </li>
        <li>
          <strong>Google-Extended</strong> — Google, separater Schalter für
          Bard/Gemini-Training
        </li>
        <li>
          <strong>CCBot</strong> — Common Crawl, Quelle für viele
          Open-Source-Modelle
        </li>
      </ul>

      <h2 id="konfiguration">Empfohlene Konfiguration</h2>
      <p>
        Für die meisten Unternehmen, die in KI-Antworten auftauchen wollen,
        ist die einfachste und beste Konfiguration: alle Bots erlauben.
      </p>
      <pre>
        <code>{`User-agent: *
Allow: /

# KI-Crawler ausdrücklich erlaubt
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://example.com/sitemap.xml`}</code>
      </pre>
      <p>
        Wer einzelne Bereiche (z. B. Kundenbereich, Admin-Panel) ausschließen
        will, ergänzt entsprechende <code>Disallow</code>-Direktiven. Wer
        bestimmte Bots aussperren möchte (z. B. um Training-Daten-Nutzung zu
        verhindern), setzt für diesen User-Agent <code>Disallow: /</code> —
        sollte sich dabei aber bewusst sein, dass damit auch
        KI-Empfehlungen wegfallen.
      </p>
    </>
  );
}
