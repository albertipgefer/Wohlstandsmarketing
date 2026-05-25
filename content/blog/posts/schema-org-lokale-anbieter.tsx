import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "schema-org-lokale-anbieter-2026",
  title: "Schema.org für lokale Anbieter: 5 Markups, die du 2026 brauchst",
  highlight: "Schema",
  excerpt:
    "Ohne strukturierte Daten ist deine Webseite für ChatGPT und Google fast unsichtbar. Diese 5 Schema-Markups sind 2026 Pflicht — mit Copy-Paste-Beispielen für lokale Anbieter.",
  description:
    "Schema.org für lokale Anbieter: 5 Pflicht-Markups (LocalBusiness, Service, FAQPage, BreadcrumbList, Organization) mit Beispielen. Schritt für Schritt erklärt.",
  date: "2026-05-22",
  readingTime: "6 min",
  category: "Technisches SEO",
  cover: {
    from: "#db6f16",
    to: "#a3540f",
    label: "Schema.org",
  },
  keywords: [
    "Schema.org",
    "strukturierte Daten",
    "LocalBusiness Schema",
    "lokales SEO",
    "Schema Markup Generator",
    "JSON-LD",
    "FAQPage Schema",
    "Service Schema",
    "Mittelstand SEO",
  ],
  toc: [
    { id: "warum", label: "Warum Schema 2026 Pflicht ist" },
    { id: "markups", label: "Die 5 wichtigsten Markups" },
    { id: "testen", label: "So testest du dein Schema" },
  ],
  faq: [
    {
      q: "Brauche ich Schema-Markup, wenn meine Seite schon gut rankt?",
      a: "Ja. Klassische Rankings sind eine Sache — KI-Sichtbarkeit eine andere. Ohne Schema versteht eine KI nicht eindeutig, wer du bist, was du anbietest und wo. Auch gut rankende Seiten verlieren in KI-Empfehlungen, wenn die Struktur fehlt.",
    },
    {
      q: "Reicht das automatische Schema von WordPress-Plugins?",
      a: "Selten. Plugins liefern oft generisches Markup ohne lokale Spezifika. Für lokale Anbieter brauchst du individuell angepasste LocalBusiness-Schemas mit echten Geo-Koordinaten, Öffnungszeiten und Branchen-Kategorien.",
    },
    {
      q: "Was passiert, wenn mein Schema fehlerhaft ist?",
      a: "Im besten Fall ignoriert Google es. Im schlechten Fall bekommst du Manual Actions oder dein Rich-Snippet wird entfernt. Immer mit dem Schema-Markup-Validator von schema.org und dem Rich Results Test von Google prüfen.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Schema.org ist die Sprache, in der deine Webseite KI-Crawlern und
        Suchmaschinen erklärt, worum es geht. Ohne sie sind selbst gute
        Inhalte schwer einzuordnen. Diese 5 Markups solltest du 2026 als
        lokaler Anbieter mindestens haben.
      </p>

      <h2 id="warum">Warum Schema 2026 Pflicht ist</h2>
      <p>
        KI-Suchsysteme wie ChatGPT, Perplexity und Google AI Overviews ziehen
        sich Antworten aus strukturierten Daten. Wer kein Schema-Markup
        hinterlegt, gibt der KI nichts, was sie eindeutig zitieren könnte —
        und wird systematisch übersprungen. Für lokale Anbieter ist die
        Wirkung besonders groß, weil hier Konkurrenz schwächer optimiert ist.
      </p>

      <h2 id="markups">Die 5 wichtigsten Markups</h2>

      <h3>1. LocalBusiness</h3>
      <p>
        Das Herzstück für jeden lokalen Anbieter. Enthält: Name, Adresse,
        Geo-Koordinaten, Öffnungszeiten, Telefonnummer, Bewertungen,
        Bilder. Wähle den spezifischsten Subtyp, den schema.org für deine
        Branche bietet — z. B. <code>Electrician</code>,{" "}
        <code>RealEstateAgent</code>, <code>LimousineService</code>.
      </p>

      <h3>2. Service</h3>
      <p>
        Für jede deiner Kerndienstleistungen ein <code>Service</code>-Schema
        mit Name, Beschreibung, Anbieter (Verweis auf dein LocalBusiness)
        und Versorgungsgebiet (<code>areaServed</code>). Das macht der KI
        klar, was du anbietest — nicht nur dass du existierst.
      </p>

      <h3>3. FAQPage</h3>
      <p>
        Frage-Antwort-Blöcke auf deinen Service- und Blog-Seiten als{" "}
        <code>FAQPage</code> auszeichnen. KI-Systeme bevorzugen diese Form
        massiv, weil sie direkt in Antworten übernommen werden kann.
        Mindestens 5 echte, präzise beantwortete Fragen pro relevanter Seite.
      </p>

      <h3>4. BreadcrumbList</h3>
      <p>
        Hilft Suchmaschinen und KI, die Hierarchie deiner Seite zu
        verstehen. Klein, schnell umgesetzt, oft vergessen. Pflicht auf
        jeder Seite, die nicht die Startseite ist.
      </p>

      <h3>5. Organization</h3>
      <p>
        Auf der Startseite einmal als <code>Organization</code> auszeichnen
        — mit Name, Logo, Social-Profile-URLs (<code>sameAs</code>),
        Gründer, Gründungsjahr. Das ist die Grundlage für das Knowledge
        Panel und für KI-Entitäten-Erkennung.
      </p>

      <h2 id="testen">So testest du dein Schema</h2>
      <p>
        Zwei Tools sind Pflicht: der{" "}
        <strong>Schema-Markup-Validator</strong> von schema.org prüft die
        Syntax. Der <strong>Rich Results Test</strong> von Google zeigt, was
        Google tatsächlich versteht und als Rich Snippet anzeigen würde.
        Beide ergänzen sich — keiner ersetzt den anderen.
      </p>
      <p>
        Wenn beide Tools sauber sind und du in den Server-Logs siehst, dass{" "}
        <code>GPTBot</code> und <code>PerplexityBot</code> regelmäßig
        vorbeikommen, hast du das technische Fundament für KI-Sichtbarkeit
        gelegt.
      </p>
    </>
  );
}
