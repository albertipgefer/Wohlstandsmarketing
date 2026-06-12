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
  /** Wenn true: Kunde kann Anzahl wählen, Preis = oneTime × quantity */
  multiplyByQuantity?: boolean;
  /** Bei Services mit Inklusiv-Unterseiten + optionalen Extra-Seiten */
  extraPageOption?: { included: number; pricePerExtra: number };
  /** Wenn gesetzt: Kunde kann zwischen mehreren Laufzeiten wählen (in Monaten) */
  durationOptions?: number[];
};

export type Selection = {
  id: string;
  quantity?: number;       // Multiplikator (Landingpage: 1, 2, 3 …)
  extraPages?: number;     // Zusatz-Unterseiten (Unternehmenswebseite)
  durationMonths?: number; // Gewählte Laufzeit (SEO/KI Retainer)
};

export const BUNDLE_DISCOUNT = 0.05; // 5 % ab 2 ausgewählten Items
export const EXTRA_PAGE_PRICE = 300; // pro zusätzliche Unterseite (Unternehmenswebseite)

export const services: Service[] = [
  {
    id: "unternehmenswebseite",
    name: "Unternehmenswebseite",
    short: "Mehrseitige Webseite mit 5 Unterseiten inklusive",
    description:
      "Eine professionelle Mehrseiten-Webseite mit 5 Unterseiten (z. B. Startseite, Über, Leistungen, Kontakt, Impressum/Datenschutz) — konvertierungsoptimiert, mobil perfekt.",
    benefits: [
      "5 Unterseiten inklusive",
      "Live in 7 Tagen",
      "Mobile + iPad + Desktop optimiert",
      "Schema.org für Google",
    ],
    oneTime: 1490,
    icon: "building",
    category: "webdesign",
    extraPageOption: { included: 5, pricePerExtra: EXTRA_PAGE_PRICE },
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
    icon: "target",
    category: "webdesign",
    multiplyByQuantity: true,
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
    oneTime: 1990,
    icon: "refresh",
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
    icon: "search",
    category: "optimierung",
  },
  {
    id: "seo-laufend",
    name: "SEO-Betreuung",
    short: "Kontinuierliche SEO-Optimierung mit monatlichem Report",
    description:
      "Laufende SEO-Betreuung: Content-Strategie, Keyword-Recherche, technische Optimierung, Reporting, Wettbewerbs-Monitoring.",
    benefits: [
      "Monatlicher Performance-Call",
      "Keyword + Ranking-Tracking",
      "Content-Plan + Umsetzung",
      "Reporting + Anpassung",
    ],
    monthly: 1490,
    durationMonths: 3,
    durationOptions: [3, 6, 9, 12],
    icon: "chart",
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
      "Erste Erwähnungen in 4–8 Wochen",
    ],
    oneTime: 490,
    icon: "bolt",
    category: "optimierung",
  },
  {
    id: "ki-laufend",
    name: "KI-Sichtbarkeits-Betreuung",
    short: "Kontinuierliche KI-Optimierung mit Erfolgs-Tracking",
    description:
      "Laufende KI-Sichtbarkeit-Betreuung: konstante Anpassung an neue KI-Modelle, Monitoring der Erwähnungen in ChatGPT/Perplexity, Content-Tuning.",
    benefits: [
      "Monitoring KI-Erwähnungen",
      "Content + Schema kontinuierlich erweitern",
      "Anpassung an neue Modelle",
      "Monatlicher Report",
    ],
    monthly: 1490,
    durationMonths: 3,
    durationOptions: [3, 6, 9, 12],
    icon: "trending",
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
    icon: "wrench",
    category: "wartung",
  },
];

export interface ResolvedSelection {
  service: Service;
  selection: Selection;
  /** Berechneter Einmalpreis für diese Auswahl (inkl. Quantity/Extras) */
  oneTimeSum: number;
  /** Berechneter Monatspreis für diese Auswahl */
  monthlySum: number;
  /** Effektive Laufzeit, wenn monthly */
  effectiveDuration?: number;
}

function resolveSelection(s: Selection): ResolvedSelection | null {
  const service = services.find((x) => x.id === s.id);
  if (!service) return null;

  let oneTimeSum = 0;
  let monthlySum = 0;

  // Einmal-Preis × Quantity (oder × 1 wenn nicht multipliziert)
  if (service.oneTime != null) {
    const qty = service.multiplyByQuantity ? Math.max(1, s.quantity ?? 1) : 1;
    oneTimeSum = service.oneTime * qty;
    // Extra-Unterseiten
    if (service.extraPageOption && s.extraPages && s.extraPages > 0) {
      oneTimeSum += s.extraPages * service.extraPageOption.pricePerExtra;
    }
  }

  // Monatspreis
  if (service.monthly != null) {
    monthlySum = service.monthly;
  }

  const effectiveDuration =
    service.monthly != null
      ? s.durationMonths ?? service.durationMonths ?? undefined
      : undefined;

  return { service, selection: s, oneTimeSum, monthlySum, effectiveDuration };
}

export function calcTotals(selections: Selection[]) {
  const resolved = selections
    .map(resolveSelection)
    .filter((r): r is ResolvedSelection => r !== null);

  const oneTimeRaw = resolved.reduce((sum, r) => sum + r.oneTimeSum, 0);
  const monthlyRaw = resolved.reduce((sum, r) => sum + r.monthlySum, 0);
  const hasBundle = resolved.length >= 2;
  const discountRate = hasBundle ? BUNDLE_DISCOUNT : 0;
  const oneTime = Math.round(oneTimeRaw * (1 - discountRate));
  const monthly = Math.round(monthlyRaw * (1 - discountRate));
  return {
    selected: resolved,
    oneTimeRaw,
    monthlyRaw,
    oneTime,
    monthly,
    discountRate,
    discountAmount: Math.round((oneTimeRaw + monthlyRaw) * discountRate),
    hasBundle,
  };
}

/**
 * URL-Encoding für Selections: kompakt, sicher, sharable.
 * Format: jeder Eintrag "id" oder "id:qty.extra.dur" — getrennt durch ","
 * Beispiel: "unternehmenswebseite:1.3.0,landingpage:2.0.0,seo-laufend:1.0.6"
 */
export function encodeSelections(sels: Selection[]): string {
  return sels
    .map((s) => {
      const q = s.quantity ?? 1;
      const e = s.extraPages ?? 0;
      const d = s.durationMonths ?? 0;
      // Nur kompaktes Format wenn nötig
      if (q === 1 && e === 0 && d === 0) return s.id;
      return `${s.id}:${q}.${e}.${d}`;
    })
    .join(",");
}

export function decodeSelections(encoded: string): Selection[] {
  if (!encoded) return [];
  const validIds = new Set(services.map((s) => s.id));
  return encoded
    .split(",")
    .map((part) => {
      const [id, opts] = part.split(":");
      if (!validIds.has(id)) return null;
      const sel: Selection = { id };
      if (opts) {
        const [q, e, d] = opts.split(".").map((x) => parseInt(x, 10) || 0);
        if (q > 1 && q < 50) sel.quantity = q;
        if (e > 0 && e < 100) sel.extraPages = e;
        if (d > 0 && d < 60) sel.durationMonths = d;
      }
      return sel;
    })
    .filter((s): s is Selection => s !== null);
}
