import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "perplexity-seo-2026",
  title: "Perplexity-SEO: So wirst du in der KI-Suchmaschine empfohlen",
  highlight: "Perplexity",
  excerpt:
    "Perplexity ist die wachstumsstärkste KI-Suchmaschine 2026 — und der wahrscheinlich unterschätzteste Empfehlungskanal für Mittelstand. So wirst du dort sichtbar.",
  description:
    "Perplexity-SEO 2026: So optimierst du deine Webseite für die KI-Suchmaschine Perplexity. Praktische Hebel für DACH-Mittelstand.",
  date: "2026-05-08",
  readingTime: "8 min",
  category: "KI-Sichtbarkeit",
  cover: {
    from: "#db6f16",
    to: "#a3540f",
    label: "Perplexity",
  },
  keywords: [
    "Perplexity SEO",
    "Perplexity KI Optimierung",
    "Perplexity Search",
    "AI Search Optimization",
    "Perplexity ranken",
    "Perplexity Quellen",
    "Perplexity Citations",
    "KI Suchmaschine SEO",
    "Antwortmaschine SEO",
  ],
  toc: [
    { id: "warum-perplexity", label: "Warum Perplexity unterschätzt wird" },
    { id: "wie-funktioniert", label: "Wie Perplexity Quellen auswählt" },
    { id: "hebel", label: "Die 6 wichtigsten Hebel" },
    { id: "fehler", label: "Häufige Fehler vermeiden" },
    { id: "messen", label: "So misst du deine Perplexity-Sichtbarkeit" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Was unterscheidet Perplexity von ChatGPT?",
      a: "Perplexity ist primär als Echtzeit-Suchmaschine konzipiert — jede Antwort wird mit konkreten Quellen-Links versehen. ChatGPT antwortet auch aus Trainingsdaten ohne Live-Quellen. Für SEO bedeutet das: Perplexity-Empfehlungen sind direkt klickbare Traffic-Quellen.",
    },
    {
      q: "Brauche ich für Perplexity ein extra SEO-Konzept?",
      a: "Nicht komplett extra, aber ja, mit spezifischen Akzenten. Perplexity gewichtet aktuelle, datierte, gut strukturierte Inhalte besonders stark. Wer einen aktuellen Blog mit Frage-Antwort-Format pflegt, hat hier einen klaren Vorteil.",
    },
    {
      q: "Wie schnell sehe ich Ergebnisse?",
      a: "Perplexity indexiert deutlich schneller als ChatGPT — oft bereits innerhalb von 7–14 Tagen nach Veröffentlichung. Erste Erwähnungen sind realistisch nach 30 Tagen, stabile Empfehlungen nach 90 Tagen.",
    },
    {
      q: "Bringt Perplexity-Traffic Conversion?",
      a: "Überdurchschnittlich. Perplexity-Nutzer sind tendenziell informierter und kommen mit klarer Kaufabsicht. Conversion-Raten aus Perplexity liegen in unseren Daten 2–3× über klassischem Google-Traffic.",
    },
    {
      q: "Wie viele Quellen zeigt Perplexity pro Antwort?",
      a: "Typischerweise 5–10 Quellen, von denen 3–5 prominent verlinkt sind. Wer in den Top 3 Quellen einer Antwort steht, bekommt den Großteil der Klicks aus dieser Antwort.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Während alle über ChatGPT reden, baut Perplexity still eine
        Nutzerbasis auf, die 2026 zur ernsthaften Alternative zur
        Google-Suche geworden ist. Für DACH-Mittelstand ist Perplexity der
        derzeit am stärksten unterschätzte Empfehlungskanal. Hier sind die
        Hebel, mit denen du dort sichtbar wirst.
      </p>

      <h2 id="warum-perplexity">Warum Perplexity unterschätzt wird</h2>
      <p>
        Perplexity ist anders als ChatGPT: jede Antwort kommt mit echten,
        klickbaren Quellen. Wer dort empfohlen wird, bekommt nicht nur
        Erwähnung, sondern <strong>direkten Traffic</strong>. Das macht
        Perplexity zu einem der wenigen KI-Kanäle mit klar messbarem ROI.
      </p>
      <p>
        Zudem ist die Konkurrenz in Perplexity-Ergebnissen 2026 noch
        deutlich schwächer als bei Google. Wer hier früh sauber
        optimiert, gewinnt Sichtbarkeit, die sich in den nächsten Jahren
        kaum noch einholen lässt.
      </p>

      <h2 id="wie-funktioniert">Wie Perplexity Quellen auswählt</h2>
      <p>
        Perplexity läuft technisch wie eine moderne Suchmaschine mit
        KI-Layer: für jede Anfrage werden Webseiten gecrawlt oder aus dem
        Index geholt, ein LLM verarbeitet die Inhalte und generiert die
        Antwort mit Zitaten.
      </p>
      <p>
        Die drei stärksten Auswahlkriterien:
      </p>
      <ul>
        <li>
          <strong>Aktualität:</strong> Inhalte unter 12 Monaten werden
          deutlich bevorzugt, vor allem für News- und How-To-Themen.
        </li>
        <li>
          <strong>Klare Struktur:</strong> Frage-Antwort-Inhalte mit
          deutlichen H2/H3-Headlines werden eher zitiert als
          Fließtext-Blöcke.
        </li>
        <li>
          <strong>Domain-Vertrauen:</strong> Etablierte Domains mit
          sauberer technischer Basis und externen Verlinkungen werden
          öfter eingebunden.
        </li>
      </ul>

      <h2 id="hebel">Die 6 wichtigsten Hebel</h2>

      <h3>1. PerplexityBot in robots.txt explizit erlauben</h3>
      <p>
        Pflicht. Ohne <code>User-agent: PerplexityBot Allow: /</code> in
        deiner robots.txt bist du de facto nicht in Perplexity sichtbar.
      </p>

      <h3>2. Frage-Antwort-Struktur konsequent</h3>
      <p>
        H2-Headlines als Fragen formulieren („Wie funktioniert X?", „Was
        kostet Y?"). Direkt darunter eine klare, kompakte Antwort in 2–4
        Sätzen, dann erst die Vertiefung. Perplexity zitiert die ersten
        2–3 Sätze nach einer Frage besonders häufig.
      </p>

      <h3>3. Datierung sichtbar</h3>
      <p>
        Veröffentlichungs- und Aktualisierungsdatum prominent auf jeder
        Inhaltsseite anzeigen. Plus Schema-Markup mit{" "}
        <code>datePublished</code> und <code>dateModified</code>.
      </p>

      <h3>4. Konkrete Zahlen und Belege</h3>
      <p>
        Perplexity liebt prüfbare Fakten. „Über 60 % aller Suchanfragen
        sind 2026 zero-click" wird eher zitiert als „die meisten
        Suchanfragen führen heute zu keinem Klick mehr". Konkretheit
        schlägt Marketing-Sprache.
      </p>

      <h3>5. FAQ-Schemas auf jeder relevanten Seite</h3>
      <p>
        Jeder Service-Seite und jedem Blog-Artikel einen FAQ-Block mit{" "}
        <code>FAQPage</code>-Schema hinzufügen. Diese Blöcke werden von
        Perplexity überproportional oft als Antwortquelle herangezogen.
      </p>

      <h3>6. Externe Erwähnungen aufbauen</h3>
      <p>
        Perplexity gewichtet Co-Citations stark. Wer in Branchen-Blogs,
        lokalen Portalen oder Listicles erwähnt wird, taucht öfter in
        Perplexity-Antworten auf — auch ohne klassische Backlinks.
      </p>

      <h2 id="fehler">Häufige Fehler vermeiden</h2>
      <ul>
        <li>
          <strong>Marketing-Floskeln</strong> statt konkreten Aussagen
        </li>
        <li>
          <strong>Veraltete Inhalte</strong> ohne Aktualisierungsdatum —
          Perplexity wertet sie als Risiko ab
        </li>
        <li>
          <strong>Fehlende Schemas</strong> — die Seite wird nicht
          eindeutig interpretierbar
        </li>
        <li>
          <strong>Zu wenig Struktur</strong>: lange Textblöcke ohne klare
          Hierarchie werden seltener zitiert
        </li>
        <li>
          <strong>PerplexityBot blockiert</strong> — passiert oft
          unbeabsichtigt durch Cloudflare-Bot-Filter
        </li>
      </ul>

      <h2 id="messen">So misst du deine Perplexity-Sichtbarkeit</h2>
      <p>
        Drei Methoden, alle pragmatisch:
      </p>
      <ol>
        <li>
          <strong>Manuelles Testing:</strong> Stelle Perplexity alle 2
          Wochen deine wichtigsten Kundenanfragen. Notiere, ob du genannt
          wirst.
        </li>
        <li>
          <strong>Referrer-Analyse:</strong> In Google Analytics oder
          Plausible nach Referrals von <code>perplexity.ai</code> filtern.
          Wer sichtbar ist, sieht hier wachsenden Traffic.
        </li>
        <li>
          <strong>Server-Logs:</strong> Crawl-Frequenz des PerplexityBot
          tracken. Steigende Crawl-Rate korreliert mit steigender
          Sichtbarkeit in Antworten.
        </li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Perplexity ist 2026 ein unterschätzter Empfehlungskanal mit klarem
        ROI — direkter Traffic plus überdurchschnittliche
        Conversion-Raten. Wer jetzt die richtigen Hebel zieht, baut
        Sichtbarkeit auf, die sich über Jahre auszahlt.
      </p>
      <p>
        Die Maßnahmen sind nicht kompliziert. Frage-Antwort-Struktur,
        Schema-Markup, Aktualität, Konkretheit, saubere robots.txt — das
        ist die ganze Formel. Wer sie diszipliniert anwendet, gewinnt.
      </p>
    </>
  );
}
