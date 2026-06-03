/**
 * Produktdaten für „Das Solopreneur-Betriebssystem für Claude Code".
 * Eigenständiges Produkt (kein Teil der 5-Phasen-Treppe) — eigene Landingpage /betriebssystem.
 *
 * `checkoutUrl`: bleibt null, bis das CopeCart-Produkt angelegt ist. Sobald die
 * Checkout-URL eingetragen ist, werden die CTAs automatisch scharf.
 */

export type BskSkill = { name: string; label: string };
export type BskCategory = {
  key: string;
  title: string;
  desc: string;
  skills: BskSkill[];
};
export type BskAgent = { name: string; title: string; body: string };

export const BETRIEBSSYSTEM = {
  slug: "betriebssystem",
  name: "Das Solopreneur-Betriebssystem für Claude Code",
  eyebrow: "Neu · Für Claude Code",
  h1: "Das Solopreneur-Betriebssystem für Claude Code",
  subtitle:
    "50 einsatzbereite Experten-Skills in 5 Kategorien. 5 KI-Agenten. Marketing, Sales, SEO, Social Media & Business — verwandle Claude Code in deinen Mitarbeiter. Einmal kaufen, für immer nutzen.",
  priceNow: "34 €",
  priceStrike: "97 €",
  savingsPercent: "-65 %",
  checkoutUrl: "https://copecart.com/products/84e131da/checkout" as string | null,

  // Terminal-Demo (Hero) — Zeilen werden nacheinander angezeigt
  terminal: [
    "$ bash install.sh",
    "✓ 50 Skills geladen",
    "✓ 5 Agenten aktiviert",
    "✓ 5 Kategorien registriert",
    "✓ Betriebssystem einsatzbereit 🚀",
    "",
    "$ Nutze offer-builder, um mein Angebot zu schärfen",
    "→ Claude arbeitet wie ein Marketing-Profi …",
  ],

  // Problem-Sektion
  pains: [
    {
      title: "Claude startet bei null",
      body: "Jede Session fängt von vorne an — du erklärst dein Business immer wieder neu.",
    },
    {
      title: "Das leere Eingabefeld",
      body: "Du weißt, dass KI dir Arbeit abnehmen könnte — aber nicht, was du eingeben sollst, damit etwas Brauchbares rauskommt.",
    },
    {
      title: "Generische Prompt-Listen",
      body: "Zusammenkopierte Prompts bringen generischen Output. Kein System, keine Struktur, keine Qualität.",
    },
  ],

  stats: [
    { value: "50", label: "Experten-Skills" },
    { value: "5", label: "KI-Agenten" },
    { value: "5", label: "Kategorien" },
    { value: "100 %", label: "auf Deutsch" },
  ],

  categories: [
    {
      key: "solopreneur",
      title: "Solopreneur & Business",
      desc: "Angebot, Preise, Positionierung, Onboarding, Rechnungen, Reviews, SOPs, Referenzen, Kennzahlen.",
      skills: [
        { name: "offer-builder", label: "Unwiderstehliches Angebot bauen" },
        { name: "pricing-calculator", label: "Preise & Pakete kalkulieren" },
        { name: "positioning-statement", label: "Positionierung & USP schärfen" },
        { name: "client-onboarding", label: "Onboarding + Willkommensmails" },
        { name: "proposal-writer", label: "Angebots-Dokument schreiben" },
        { name: "invoice-followup", label: "Zahlungserinnerungs-Sequenz" },
        { name: "weekly-review", label: "Wöchentliches Business-Review" },
        { name: "sop-writer", label: "Prozesse/SOPs dokumentieren" },
        { name: "testimonial-collector", label: "Kundenstimmen einsammeln" },
        { name: "business-dashboard", label: "Kern-Kennzahlen tracken" },
      ],
    },
    {
      key: "marketing",
      title: "Marketing",
      desc: "Nutzenversprechen, Landingpages, Newsletter, Lead-Magneten, Avatar, Funnel, Ad-Copy, Markenstimme, Content-Plan, Case Studies.",
      skills: [
        { name: "value-proposition", label: "Klares Nutzenversprechen" },
        { name: "landing-page-copy", label: "Konvertierende LP-Texte" },
        { name: "email-newsletter", label: "Newsletter & Kampagnen" },
        { name: "lead-magnet-creator", label: "Lead-Magnet entwickeln" },
        { name: "customer-avatar", label: "Ideal-Kunden / ICP definieren" },
        { name: "marketing-funnel", label: "Funnel planen (TOFU/MOFU/BOFU)" },
        { name: "ad-copy-writer", label: "Werbeanzeigen-Texte" },
        { name: "brand-voice", label: "Markenstimme & Tonalität" },
        { name: "content-calendar", label: "Marketing-Content-Plan" },
        { name: "case-study-writer", label: "Erfolgsgeschichte schreiben" },
      ],
    },
    {
      key: "sales",
      title: "Sales & Vertrieb",
      desc: "Setting- & Closing-Calls, Einwandbehandlung, Follow-up-Mails, Lead-Qualifizierung, Upsell, Pipeline, Empfehlungen.",
      skills: [
        { name: "discovery-call-script", label: "Qualifizierungs-Call führen" },
        { name: "closing-call-framework", label: "Strukturiertes Verkaufsgespräch" },
        { name: "objection-handling", label: "Einwandbehandlung" },
        { name: "sales-email-sequence", label: "Nachfass-Mail-Sequenz" },
        { name: "lead-qualification", label: "Leads bewerten & priorisieren" },
        { name: "upsell-crosssell", label: "Bestandskunden mehr verkaufen" },
        { name: "proposal-pitch", label: "Angebot überzeugend präsentieren" },
        { name: "crm-pipeline-setup", label: "Sales-Pipeline aufsetzen" },
        { name: "referral-system", label: "Empfehlungen generieren" },
        { name: "win-loss-analysis", label: "Deals auswerten" },
      ],
    },
    {
      key: "seo",
      title: "SEO & KI-Sichtbarkeit",
      desc: "Keyword-Recherche, Geld-Seiten, On-Page-Audit, Local SEO, Briefings, Schema, Meta-Tags, Verlinkung, Backlinks, GEO.",
      skills: [
        { name: "keyword-research", label: "Keywords recherchieren & clustern" },
        { name: "money-keyword-pages", label: "Geld-Seiten strukturieren" },
        { name: "onpage-audit", label: "On-Page-SEO prüfen" },
        { name: "local-seo", label: "Local SEO & Google Business" },
        { name: "content-brief", label: "SEO-Content-Briefing" },
        { name: "schema-markup", label: "Schema.org / JSON-LD" },
        { name: "meta-tags", label: "Title & Meta-Description" },
        { name: "internal-linking", label: "Interne Verlinkung" },
        { name: "backlink-strategy", label: "Backlinks & Citations" },
        { name: "geo-aeo", label: "KI-Sichtbarkeit (ChatGPT, Perplexity)" },
      ],
    },
    {
      key: "social-media",
      title: "Social Media",
      desc: "Hooks, Skripte, Karussells, Content-Säulen, Posting-Plan, Profil, Engagement, Trends, Captions, UGC.",
      skills: [
        { name: "hook-generator", label: "Hooks für Reels/TikTok" },
        { name: "short-form-script", label: "30-Sek-Talking-Head-Skript" },
        { name: "carousel-builder", label: "Karussell-Post aufbauen" },
        { name: "content-pillars", label: "Content-Säulen definieren" },
        { name: "posting-calendar", label: "Posting-Plan erstellen" },
        { name: "profile-optimization", label: "Bio/Profil für Conversions" },
        { name: "engagement-strategy", label: "Community & Engagement" },
        { name: "trend-analysis", label: "Trends auf die Nische adaptieren" },
        { name: "caption-writer", label: "Captions (Hook + Wert + CTA)" },
        { name: "ugc-brief", label: "UGC-Creator-Briefing" },
      ],
    },
  ] as BskCategory[],

  agents: [
    {
      name: "marketing-stratege",
      title: "Marketing-Stratege",
      body: "Entwickelt deine komplette Marketing-Strategie — von Positionierung über Funnel bis Content.",
    },
    {
      name: "sales-closer",
      title: "Sales-Closer",
      body: "Begleitet dich von der Lead-Qualifizierung über Calls und Einwände bis zum Abschluss.",
    },
    {
      name: "seo-auditor",
      title: "SEO-Auditor",
      body: "Analysiert deine Webseite und erstellt einen priorisierten SEO-Maßnahmenplan.",
    },
    {
      name: "content-maschine",
      title: "Content-Maschine",
      body: "Verwandelt eine Idee in fertige Social-Media-Pakete: Hook, Skript und Caption.",
    },
    {
      name: "solopreneur-cockpit",
      title: "Solopreneur-Cockpit",
      body: "Dein operativer Business-Partner für Wochensteuerung, Priorisierung und Koordination.",
    },
  ] as BskAgent[],

  comparisonBad: [
    "Lose Prompt-Sammlung zum Copy-Pasten",
    "Generischer Output, jedes Mal anders",
    "Keine Struktur, keine Qualitätssicherung",
    "Du musst selbst wissen, was du eingibst",
    "Veraltet, niemand pflegt sie",
  ],
  comparisonGood: [
    "50 strukturierte Skills mit Inputs, Schritten & Qualitäts-Check",
    "Konsistente, durchdachte Ergebnisse",
    "5 Agenten, die Skills zu Abläufen verketten",
    "Du sagst, was du brauchst — der Skill führt dich",
    "Auf den Stand 2026 geschrieben (GEO, E-E-A-T & mehr)",
  ],

  steps: [
    {
      title: "Kaufen & herunterladen",
      body: "Du zahlst 34 € über CopeCart und bekommst sofort die ZIP-Datei mit allen Skills, Agenten und der Anleitung.",
    },
    {
      title: "In 3 Minuten einrichten",
      body: "ZIP entpacken, install.sh ausführen (oder Ordner kopieren) — fertig. Keine Programmierkenntnisse nötig.",
    },
    {
      title: "In Claude Code nutzen",
      body: `Claude Code neu starten und einen Skill aufrufen, z. B. 'Nutze hook-generator für meine Nische'.`,
    },
  ],

  included: [
    "50 Experten-Skills in 5 Kategorien (Solopreneur, Marketing, Sales, SEO, Social Media)",
    "5 KI-Agenten, die mehrere Skills zu einem Ablauf verketten",
    "Komplett auf Deutsch, einsatzbereit ab Tag 1",
    "Ein-Klick-Installation (install.sh) + bebilderte Anleitung als PDF",
    "Funktioniert in deinen eigenen Projekten — privat & für Kunden",
    "Lebenslanger Zugang, kein Abo, einmal zahlen",
  ],

  faq: [
    {
      q: "Ist das ein Abo?",
      a: "Nein. Du zahlst einmal 34 € und nutzt das Betriebssystem für immer, in beliebig vielen Projekten.",
    },
    {
      q: "Brauche ich Programmierkenntnisse?",
      a: "Nein. Wenn du Claude Code starten und E-Mails schreiben kannst, kannst du die Skills nutzen. Die Installation ist ein einziger Befehl oder das Kopieren eines Ordners.",
    },
    {
      q: "Was genau bekomme ich nach dem Kauf?",
      a: "Sofort eine ZIP-Datei mit allen 50 Skills, 5 Agenten, der Installations-Anleitung als PDF und einem install.sh-Skript.",
    },
    {
      q: "Macht das mein bestehendes Claude-Code-Setup kaputt?",
      a: "Nein. Die Skills und Agenten werden zusätzlich installiert und überschreiben nichts. Du kannst sie jederzeit wieder entfernen.",
    },
    {
      q: "Brauche ich Claude Code dafür?",
      a: "Ja. Du brauchst Zugang zu Claude Code (im Claude-Pro-/Max-Abo enthalten). Das Betriebssystem selbst hat keine laufenden Kosten.",
    },
    {
      q: "Für wen ist das gedacht?",
      a: "Für Selbstständige, Freelancer, Agentur-Gründer und kleine Dienstleister, die ihr Marketing, ihren Vertrieb und ihre Sichtbarkeit ohne großes Team auf die Reihe bekommen wollen.",
    },
    {
      q: "Bekomme ich eine Rechnung?",
      a: "Ja. Die Abwicklung läuft über CopeCart, die Mehrwertsteuer und Rechnung werden automatisch erstellt.",
    },
  ],
};

export type Betriebssystem = typeof BETRIEBSSYSTEM;
