/**
 * Baustein-Bibliothek für den Angebots-Generator.
 * Vorformulierte Leistungen im WSM-Stil. **Preise kommen aus `content/pricing.ts`**
 * (Single Source of Truth, Stand 26.05.) — so driftet nichts mehr auseinander.
 * Albert kann Preis/Wording pro Angebot trotzdem überschreiben.
 *
 * Reihenfolge der Gruppen = Reihenfolge im Generator.
 * Meta-/Google-Ads stehen unter „Weitere / Bestandskunden" — kein Neukunden-
 * Standard mehr (laut CLAUDE.md), aber für Legacy-Verträge weiter nutzbar.
 */
import { services } from "@/content/pricing";
import { UST_SATZ } from "./stammdaten";

export type Einheit = "einmalig" | "pro Monat";

export type Kategorie =
  | "Webseite"
  | "SEO & KI-Sichtbarkeit"
  | "Marketing"
  | "Wartung"
  | "Weitere / Bestandskunden";

export type Baustein = {
  id: string;
  kategorie: Kategorie;
  titel: string;
  kurz: string; // Ein-Zeiler für die Auswahl
  beschreibung: string; // Lead-Absatz
  leistungen: string[]; // Bullet-Liste
  preisNetto: number;
  einheit: Einheit;
  menge: number; // bei "pro Monat" = Monate, bei "einmalig" = 1
  ustSatz: number;
};

export const KATEGORIEN: Kategorie[] = [
  "Webseite",
  "SEO & KI-Sichtbarkeit",
  "Marketing",
  "Wartung",
  "Weitere / Bestandskunden",
];

/** Kanonischen Preis aus content/pricing.ts ziehen (einmalig ODER monatlich). */
function preis(serviceId: string): number {
  const s = services.find((x) => x.id === serviceId);
  if (!s) return 0;
  return s.oneTime ?? s.monthly ?? 0;
}

export const BAUSTEINE: Baustein[] = [
  // ─── Webseite ───────────────────────────────────────────────
  {
    id: "web-unternehmenswebsite",
    kategorie: "Webseite",
    titel: "Unternehmenswebsite",
    kurz: "Mehrseitige Website, 5 Unterseiten inkl. — live in 7 Tagen",
    beschreibung:
      "Eine professionelle, mobil-optimierte Mehrseiten-Website (5 Unterseiten inklusive) — gebaut, um Besucher in Anfragen zu verwandeln und auf Google sowie in KI-Systemen gefunden zu werden.",
    leistungen: [
      "5 Unterseiten inklusive (z. B. Start, Über, Leistungen, Kontakt, Impressum/Datenschutz)",
      "Hero mit klarer Botschaft und Call-to-Action, Anfrage-Formular",
      "Mobil-, iPad- und Desktop-optimiert, schnelle Ladezeiten",
      "Vollständiges Schema.org-Markup für Google",
      "Impressum + Datenschutzerklärung nach DSGVO",
      "Live in 7 Tagen, Übergabe inkl. Kurz-Einweisung",
    ],
    preisNetto: preis("unternehmenswebseite"),
    einheit: "einmalig",
    menge: 1,
    ustSatz: UST_SATZ,
  },
  {
    id: "web-landingpage",
    kategorie: "Webseite",
    titel: "Landingpage",
    kurz: "Fokussierte One-Pager-Seite mit einem klaren Ziel",
    beschreibung:
      "Eine einzelne, hochkonvertierende Landingpage — fokussiert auf genau eine gewünschte Handlung. Ideal für eine Kampagne oder ein konkretes Angebot.",
    leistungen: [
      "1 Seite, 1 klares Ziel (Hero, Nutzen, Social Proof, CTA)",
      "Für bezahlte Werbung optimiert",
      "Mobile-First, schnelle Ladezeit",
      "Anbindung Anfrage-/Lead-Formular",
    ],
    preisNetto: preis("landingpage"),
    einheit: "einmalig",
    menge: 1,
    ustSatz: UST_SATZ,
  },
  {
    id: "web-relaunch",
    kategorie: "Webseite",
    titel: "Webseiten-Relaunch",
    kurz: "Bestehende Seite komplett modernisieren",
    beschreibung:
      "Deine bestehende Website wird auf modernen Stand gehoben — neues Design, neue Struktur, neue Performance. Domain und Inhalte bleiben, alles andere wird neu gebaut.",
    leistungen: [
      "Komplettes Re-Design auf Basis deiner Marke",
      "Technischer Neuaufbau, deutlicher Performance-Sprung",
      "SEO-Migration ohne Ranking-Verlust (sauberes Redirect-Konzept)",
      "Vollständiges Schema.org-Markup, Impressum & Datenschutz geprüft",
      "Live in 7–14 Tagen, Übergabe inkl. Kurz-Einweisung",
    ],
    preisNetto: preis("relaunch"),
    einheit: "einmalig",
    menge: 1,
    ustSatz: UST_SATZ,
  },

  // ─── SEO & KI-Sichtbarkeit ──────────────────────────────────
  {
    id: "ki-einmalig",
    kategorie: "SEO & KI-Sichtbarkeit",
    titel: "KI-Sichtbarkeit (einmalig)",
    kurz: "Seite für ChatGPT, Claude & Perplexity vorbereiten",
    beschreibung:
      "Einmalige KI-Sichtbarkeits-Optimierung — damit KI-Systeme dein Unternehmen verstehen und empfehlen.",
    leistungen: [
      "llms.txt + robots.txt für KI-Crawler (GPTBot, ClaudeBot, PerplexityBot)",
      "Schema.org-Anreicherung für KI-Verständnis",
      "Author-Entity + E-E-A-T-Signale, sameAs-Verknüpfungen",
      "Erste Erwähnungen typischerweise in 4–8 Wochen",
    ],
    preisNetto: preis("ki-einmalig"),
    einheit: "einmalig",
    menge: 1,
    ustSatz: UST_SATZ,
  },
  {
    id: "ki-laufend",
    kategorie: "SEO & KI-Sichtbarkeit",
    titel: "KI-Sichtbarkeits-Betreuung",
    kurz: "Laufende KI-Optimierung mit monatlichem Report",
    beschreibung:
      "Laufende KI-Sichtbarkeit: konstante Anpassung an neue KI-Modelle, Monitoring der Erwähnungen in ChatGPT/Perplexity/Claude, Content-Tuning. Mindestlaufzeit 3 Monate (3/6/9/12 wählbar).",
    leistungen: [
      "Monitoring der KI-Erwähnungen in den führenden Systemen",
      "Content & Schema kontinuierlich erweitern",
      "Anpassung an neue KI-Modelle",
      "Monatlicher Report mit Prompt-Tests und Maßnahmen",
    ],
    preisNetto: preis("ki-laufend"),
    einheit: "pro Monat",
    menge: 3,
    ustSatz: UST_SATZ,
  },
  {
    id: "seo-einmalig",
    kategorie: "SEO & KI-Sichtbarkeit",
    titel: "SEO-Optimierung (einmalig)",
    kurz: "Basis-Audit + Umsetzung der wichtigsten Hebel",
    beschreibung:
      "Einmaliger SEO-Boost: technisches Audit, Meta-Tags, Schema.org, Sitemap, Onpage-Optimierung der wichtigsten Seiten. Ideal als Erstmaßnahme.",
    leistungen: [
      "Technisches SEO-Audit",
      "Meta-Tags, Schema.org, Sitemap",
      "Onpage-Optimierung der Top-Seiten",
      "Übergabe-Report mit Empfehlungen",
    ],
    preisNetto: preis("seo-einmalig"),
    einheit: "einmalig",
    menge: 1,
    ustSatz: UST_SATZ,
  },
  {
    id: "seo-laufend",
    kategorie: "SEO & KI-Sichtbarkeit",
    titel: "SEO-Betreuung",
    kurz: "Laufende SEO-Optimierung mit monatlichem Call",
    beschreibung:
      "Laufende SEO-Betreuung: Content-Strategie, Keyword-Recherche, technische Optimierung, Reporting und Wettbewerbs-Monitoring. Mindestlaufzeit 3 Monate (3/6/9/12 wählbar).",
    leistungen: [
      "Monatlicher Performance-Call",
      "Keyword- & Ranking-Tracking",
      "Content-Plan + Umsetzung",
      "Technisches SEO + Reporting",
    ],
    preisNetto: preis("seo-laufend"),
    einheit: "pro Monat",
    menge: 3,
    ustSatz: UST_SATZ,
  },

  // ─── Marketing ──────────────────────────────────────────────
  {
    id: "content-marketing",
    kategorie: "Marketing",
    titel: "Content-Marketing",
    kurz: "SEO- & KI-optimierter Content, der gefunden wird",
    beschreibung:
      "Redaktioneller Content, der bei Google rankt und von ChatGPT & Co. zitiert wird: Themen-/Keyword-Strategie entlang der Customer Journey, hochwertige Artikel, interne Verlinkung auf deine Money-Pages. Mindestlaufzeit 3 Monate (3/6/9/12 wählbar).",
    leistungen: [
      "Themen- & Keyword-Strategie (ToFu/MoFu/BoFu)",
      "SEO- & GEO-optimierte Artikel",
      "Interne Verlinkung auf Money-Pages",
      "Planbarer Redaktionsrhythmus + Reporting",
    ],
    preisNetto: preis("content-marketing"),
    einheit: "pro Monat",
    menge: 3,
    ustSatz: UST_SATZ,
  },
  {
    id: "email-marketing",
    kategorie: "Marketing",
    titel: "E-Mail-Marketing",
    kurz: "Newsletter & automatisierte Verkaufsstrecken",
    beschreibung:
      "E-Mail-Marketing, das aus Kontakten Umsatz macht: DSGVO-konformer Listenaufbau, automatisierte Willkommens- und Verkaufsstrecken, Newsletter im Look deiner Marke — inkl. Reporting. Mindestlaufzeit 3 Monate (3/6/9/12 wählbar).",
    leistungen: [
      "Liste + Automationen DSGVO-konform aufgebaut",
      "Verkaufsstrecken, die rund um die Uhr arbeiten",
      "Newsletter im Look deiner Marke",
      "Reporting: Öffnungen, Klicks, Umsatz",
    ],
    preisNetto: preis("email-marketing"),
    einheit: "pro Monat",
    menge: 3,
    ustSatz: UST_SATZ,
  },

  // ─── Wartung ────────────────────────────────────────────────
  {
    id: "wartung",
    kategorie: "Wartung",
    titel: "Webseiten-Wartung",
    kurz: "Pflege, Backups & Anpassungen — mind. 12 Monate",
    beschreibung:
      "Monatliche Wartung deiner Website: technische Pflege, Updates, Backups, kleinere Inhalts-Anpassungen, Performance-Monitoring. Mindestlaufzeit 12 Monate.",
    leistungen: [
      "Technische Updates + regelmäßige Backups",
      "Kleinere Inhalts-Anpassungen inklusive",
      "Performance-Monitoring",
      "Support per E-Mail/WhatsApp",
    ],
    preisNetto: preis("wartung"),
    einheit: "pro Monat",
    menge: 12,
    ustSatz: UST_SATZ,
  },

  // ─── Weitere / Bestandskunden (Ads — kein Neukunden-Standard) ─
  {
    id: "ads-setup",
    kategorie: "Weitere / Bestandskunden",
    titel: "Technisches Setup · Meta, Google & Tracking",
    kurz: "Einmalige Einrichtung der Werbe-Infrastruktur (Legacy)",
    beschreibung:
      "Einmalige technische Einrichtung der gesamten Werbe-Infrastruktur — sauberes Tracking als Fundament, bevor Kampagnen live gehen. Fällig bei Auftragserteilung.",
    leistungen: [
      "Meta Business Manager & Werbekonto, Pixel + Conversion API + Event-Tracking",
      "Google Ads-Konto inkl. Kampagnenstruktur, Tag Manager + GA4",
      "Google Search Console einrichten & verifizieren",
      "Conversion-Tracking inkl. Zielvorhaben, Endtest vor Go-Live",
    ],
    preisNetto: 3499,
    einheit: "einmalig",
    menge: 1,
    ustSatz: UST_SATZ,
  },
  {
    id: "ads-growth",
    kategorie: "Weitere / Bestandskunden",
    titel: "Growth-Paket · Meta + Google + KI-Sichtbarkeit",
    kurz: "Laufende Betreuung aller Kanäle im Paket (Legacy)",
    beschreibung:
      "Laufende Betreuung im Paket: Meta Ads, Google Ads und KI-Optimierung (GEO) aus einer Hand. Werbebudget wird zusätzlich direkt an die Plattformen gezahlt.",
    leistungen: [
      "Meta Ads: bis zu 10 Creatives/Monat, laufende Hook- & Angle-Tests",
      "Google Ads: Keyword-Recherche, Suchkampagnen, Gebots-Optimierung",
      "KI-Optimierung (GEO) für ChatGPT, Perplexity, Claude & Gemini",
      "Bis zu 2 Strategie-Meetings/Monat, WhatsApp-Support, monatliches Reporting",
    ],
    preisNetto: 2999,
    einheit: "pro Monat",
    menge: 6,
    ustSatz: UST_SATZ,
  },
  {
    id: "ads-meta",
    kategorie: "Weitere / Bestandskunden",
    titel: "Meta Ads (Facebook + Instagram) — Betreuung",
    kurz: "Laufende Kampagnen zur Neukundengewinnung (Legacy)",
    beschreibung:
      "Laufende Werbekampagnen auf Facebook und Instagram. Werbebudget wird zusätzlich direkt an Meta gezahlt.",
    leistungen: [
      "Bis zu 10 Creatives pro Monat (nicht genutzte verfallen)",
      "Laufende Creative-Tests mit verschiedenen Hooks und Angles",
      "Abstimmung zu Creatives und Tonalität",
      "WhatsApp-Support, monatliches Reporting",
    ],
    preisNetto: 1500,
    einheit: "pro Monat",
    menge: 6,
    ustSatz: UST_SATZ,
  },
  {
    id: "ads-google",
    kategorie: "Weitere / Bestandskunden",
    titel: "Google Ads (Search) — Betreuung",
    kurz: "Suchkampagnen mit regionalem Fokus (Legacy)",
    beschreibung:
      "Laufende Google-Suchkampagnen zur Gewinnung neuer Anfragen mit regionalem Fokus. Werbebudget wird zusätzlich direkt an Google gezahlt.",
    leistungen: [
      "Keyword-Recherche & laufende Kampagnenstruktur",
      "Such-Kampagnen mit regionalem Fokus",
      "Gebotsstrategie, Suchbegriffs-Reports, negative Keywords",
      "Anzeigentext-Tests, monatliches Reporting",
    ],
    preisNetto: 1500,
    einheit: "pro Monat",
    menge: 6,
    ustSatz: UST_SATZ,
  },
];
