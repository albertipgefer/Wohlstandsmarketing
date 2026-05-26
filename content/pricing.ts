/**
 * Service-Katalog für den Pricing-Konfigurator (/preise).
 * Quelle: Albert Ipgefer, Stand 26.05.2026.
 */

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  benefits: string[];
  /** Einmal-Preis in € */
  oneTime?: number;
  /** Monatlicher Preis in € */
  monthly?: number;
  /** Mindestlaufzeit in Monaten (nur wenn monthly gesetzt) */
  durationMonths?: number;
  /** Footnote für besondere Bedingungen */
  note?: string;
  icon: string;
  category: "webdesign" | "optimierung" | "wartung";
};

export const BUNDLE_DISCOUNT = 0.15; // 15 % ab 2 ausgewählten Items

export const services: Service[] = [
  {
    id: "unternehmenswebseite",
    name: "Unternehmenswebseite",
    short: "Mehrseitige Webseite mit allem, was Mittelstand braucht",
    description:
      "Eine professionelle Mehrseiten-Webseite (Startseite, Über, Leistungen, Kontakt, Impressum, Datenschutz) — konvertierungsoptimiert, mobil perfekt, KI-ready.",
    benefits: [
      "Live in 7 Tagen",
      "Mobile + iPad + Desktop optimiert",
      "Mit Kontaktformular + DSGVO-konform",
      "Schema.org für Google + KI",
    ],
    oneTime: 1490,
    icon: "🏢",
    category: "webdesign",
  },
  {
    id: "landingpage",
    name: "Landingpage-Erstellung",
    short: "Eine fokussierte One-Pager-Seite mit klarem Ziel",
    description:
      "Eine einzelne, hochkonvertierende Landingpage — perfekt für Meta-Ads, Google-Ads oder ein konkretes Angebot. Speed-optimiert mit klarem CTA.",
    benefits: [
      "1 Seite, 1 klares Ziel",
      "Für bezahlte Werbung optimiert",
      "Mobile-First",
      "Schnelle Ladezeit",
    ],
    oneTime: 490,
    icon: "🎯",
    category: "webdesign",
  },
  {
    id: "relaunch",
    name: "Webseiten-Relaunch",
    short: "Bestehende Seite komplett überarbeiten",
    description:
      "Deine aktuelle Webseite wird auf modernen Stand gehoben — neues Design, neue Struktur, neue Performance. Domain + Inhalte bleiben, alles andere wird neu gebaut.",
    benefits: [
      "Komplettes Re-Design",
      "Performance-Sprung",
      "SEO-Migration ohne Ranking-Verlust",
      "Live in 7–14 Tagen",
    ],
    oneTime: 990,
    icon: "🔁",
    category: "webdesign",
  },
  {
    id: "seo-einmalig",
    name: "SEO-Optimierung (einmalig)",
    short: "Basic-Audit + Umsetzung der wichtigsten Hebel",
    description:
      "Einmaliger SEO-Boost: technisches Audit, Meta-Tags, Schema.org, Sitemap, Onpage-Optimierung der wichtigsten Seiten. Ideal als Erstmaßnahme.",
    benefits: [
      "Technisches SEO-Audit",
      "Meta + Schema + Sitemap",
      "Onpage für Top-Seiten",
      "Übergabe-Report",
    ],
    oneTime: 490,
    icon: "🔍",
    category: "optimierung",
  },
  {
    id: "seo-laufend",
    name: "SEO-Betreuung (3 Monate)",
    short: "Kontinuierliche SEO-Optimierung mit monatlichem Report",
    description:
      "Laufende SEO-Betreuung über mindestens 3 Monate: Content-Strategie, Keyword-Recherche, technische Optimierung, Reporting, Wettbewerbs-Monitoring.",
    benefits: [
      "Monatlicher Performance-Call",
      "Keyword + Ranking-Tracking",
      "Content-Plan + Umsetzung",
      "Reporting + Anpassung",
    ],
    monthly: 990,
    durationMonths: 3,
    icon: "📈",
    category: "optimierung",
  },
  {
    id: "ki-einmalig",
    name: "KI-Sichtbarkeit (einmalig)",
    short: "Deine Seite für ChatGPT, Claude und Perplexity vorbereiten",
    description:
      "Einmalige KI-Sichtbarkeit-Optimierung: llms.txt, robots.txt für KI-Crawler, Schema.org-Anreicherung, Author-Entity, sameAs-Verknüpfungen — damit dich KI versteht und empfiehlt.",
    benefits: [
      "llms.txt + robots.txt für KI-Bots",
      "Schema.org für KI-Verständnis",
      "Author-Entity + E-E-A-T-Signale",
      "Erste KI-Erwähnungen in 4–8 Wochen",
    ],
    oneTime: 490,
    icon: "🤖",
    category: "optimierung",
  },
  {
    id: "ki-laufend",
    name: "KI-Sichtbarkeit (3 Monate)",
    short: "Kontinuierliche KI-Optimierung mit Erfolgs-Tracking",
    description:
      "Laufende KI-Sichtbarkeit-Betreuung über 3 Monate: konstante Anpassung an neue KI-Modelle, Monitoring der Erwähnungen in ChatGPT/Perplexity, Content-Tuning.",
    benefits: [
      "Monitoring KI-Erwähnungen",
      "Content + Schema kontinuierlich erweitern",
      "Anpassung an neue KI-Modelle",
      "Monatlicher Report",
    ],
    monthly: 990,
    durationMonths: 3,
    icon: "✨",
    category: "optimierung",
  },
  {
    id: "wartung",
    name: "Webseiten-Wartung",
    short: "Pflege, Backups und Anpassungen",
    description:
      "Monatliche Wartung deiner Webseite: technische Pflege, Updates, Backups, kleinere Inhalts-Anpassungen, Performance-Monitoring. Mindestlaufzeit 12 Monate.",
    benefits: [
      "Tech-Updates + Backups",
      "Inhalts-Anpassungen inklusive",
      "Performance-Monitoring",
      "Support per E-Mail/WhatsApp",
    ],
    monthly: 149,
    durationMonths: 12,
    note: "In Kombination mit einer Webseite buchbar",
    icon: "🛠️",
    category: "wartung",
  },
];

export function calcTotals(selectedIds: string[]) {
  const selected = services.filter((s) => selectedIds.includes(s.id));
  const oneTimeRaw = selected.reduce((sum, s) => sum + (s.oneTime ?? 0), 0);
  const monthlyRaw = selected.reduce((sum, s) => sum + (s.monthly ?? 0), 0);
  const hasBundle = selected.length >= 2;
  const discountRate = hasBundle ? BUNDLE_DISCOUNT : 0;
  const oneTime = Math.round(oneTimeRaw * (1 - discountRate));
  const monthly = Math.round(monthlyRaw * (1 - discountRate));
  return {
    selected,
    oneTimeRaw,
    monthlyRaw,
    oneTime,
    monthly,
    discountRate,
    discountAmount: Math.round((oneTimeRaw + monthlyRaw) * discountRate),
    hasBundle,
  };
}
