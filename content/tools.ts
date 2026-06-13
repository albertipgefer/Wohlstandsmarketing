/**
 * content/tools.ts — Single Source of Truth für die interne Tool-Übersicht (/tools).
 *
 * Jedes Objekt in TOOLS = eine Kachel. Suche, Filter und Grid leiten sich
 * komplett hieraus ab → Änderungen/Neuzugänge hier erscheinen automatisch.
 *
 * ‼️ SICHERHEIT: Niemals Passwörter/Zugangsdaten hier ablegen — diese Datei
 * wird zu Vercel deployt. Geschützte Tools bekommen nur den Badge access: "geschützt".
 *
 * NEUES TOOL HINZUFÜGEN:
 *   1. Objekt unten ergänzen (richtige category + sichtbare Felder).
 *   2. Commit + Push → Vercel deployt automatisch.
 */

export type ToolCategory = "akquise" | "web" | "ki" | "content";

export type Tool = {
  slug: string;
  name: string;
  description: string; // 1 knapper Satz
  href: string; // interne Route ("/finanzen") oder volle URL
  icon: string; // Emoji
  category: ToolCategory;
  status: "live" | "wip";
  internal: boolean; // true = intern, false = öffentlich
  access?: "geschützt"; // optionaler Badge — KEINE Passwörter speichern
};

export const CATEGORIES: Record<
  ToolCategory,
  { label: string; color: string }
> = {
  akquise: { label: "Akquise & Vertrieb", color: "#1663de" }, // CI-Blau
  web: { label: "Webseiten & SEO", color: "#db6f16" }, // CI-Orange
  ki: { label: "KI & Automatisierung", color: "#0d9488" }, // Teal
  content: { label: "Content", color: "#7c3aed" }, // Violett
};

export const CATEGORY_ORDER: ToolCategory[] = [
  "akquise",
  "web",
  "ki",
  "content",
];

export const TOOLS: Tool[] = [
  // ───────── Akquise & Vertrieb ─────────
  {
    slug: "angebot",
    name: "Angebots-Generator",
    description: "Angebote im Accountable-Stil erstellen, senden und annehmen lassen.",
    href: "/angebot",
    icon: "📝",
    category: "akquise",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "finanzen",
    name: "Finanzen & Rechnungen",
    description: "Übersicht, Forecast, Rechnungen, Mahnläufe und Ausgaben an einem Ort.",
    href: "/finanzen",
    icon: "💶",
    category: "akquise",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "outreach",
    name: "Cold-Outreach-Dashboard",
    description: "Kaltakquise-Kampagnen, Versandstatus und Reports auf einen Blick.",
    href: "/outreach",
    icon: "📨",
    category: "akquise",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "kundenbereich",
    name: "Kunden-Portal",
    description: "SaaS-Portal für Kunden — Projekte, Status und Kommunikation.",
    href: "https://kundenbereich.wohlstandsmarketing.de",
    icon: "🤝",
    category: "akquise",
    status: "live",
    internal: false,
  },
  {
    slug: "partner",
    name: "Partner- & Affiliate-Seite",
    description: "Affiliate-Programm mit Invite-Links für die CopeCart-Produkte.",
    href: "https://start.wohlstandsmarketing.de/partner",
    icon: "🔗",
    category: "akquise",
    status: "live",
    internal: false,
  },
  {
    slug: "start-bio",
    name: "start.wsm — Bio & Treppe",
    description: "Bio-Page mit Einzel-Phasen und Komplettpaket-Bundle.",
    href: "https://start.wohlstandsmarketing.de",
    icon: "🪜",
    category: "akquise",
    status: "live",
    internal: false,
  },
  {
    slug: "betriebssystem",
    name: "Solopreneur OS (LP)",
    description: "Landingpage für das Claude-Code-Skill-Produkt (50 Skills + 5 Agenten).",
    href: "/betriebssystem",
    icon: "🧰",
    category: "akquise",
    status: "live",
    internal: false,
  },

  // ───────── Webseiten & SEO ─────────
  {
    slug: "fabrik",
    name: "Website-Fabrik",
    description: "Autonome Webseiten-Produktion: Intake → KI → Build → Freigabe → Go-Live.",
    href: "https://fabrik.wohlstandsmarketing.de",
    icon: "🏭",
    category: "web",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "audit",
    name: "SEO/KI-Audit-Motor",
    description: "Fremde URL prüfen → Findings, Artefakte und PDF-Report erzeugen.",
    href: "https://fabrik.wohlstandsmarketing.de/audit",
    icon: "🔍",
    category: "web",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "hauptseite",
    name: "WSM-Hauptwebseite",
    description: "wohlstandsmarketing.de — Next.js-Relaunch mit Blog, Branchen & Services.",
    href: "https://wohlstandsmarketing.de",
    icon: "🌐",
    category: "web",
    status: "live",
    internal: false,
  },

  // ───────── KI & Automatisierung ─────────
  {
    slug: "ki-check",
    name: "KI-Sichtbarkeits-Check",
    description: "Gratis-Check als Lead-Magnet: wie sichtbar ist eine Firma in KI & Google.",
    href: "https://wohlstandsmarketing.de/sichtbarkeits-check",
    icon: "🤖",
    category: "ki",
    status: "live",
    internal: false,
  },

  // ───────── Content ─────────
  {
    slug: "smc-cockpit",
    name: "SMC-Cockpit",
    description: "Datenbasiertes Content-System für die Personal Brand journeywithalbert.",
    href: "https://smc.wohlstandsmarketing.de",
    icon: "🎯",
    category: "content",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "analytics",
    name: "KPI-Dashboard",
    description: "SMC-Analytics — Follower, Performance und 100k-Ziel im Blick.",
    href: "https://smc.wohlstandsmarketing.de/analytics",
    icon: "📊",
    category: "content",
    status: "live",
    internal: true,
    access: "geschützt",
  },
  {
    slug: "studio",
    name: "Video Editing Studio",
    description: "Auto-Schnitt in der Cloud: Clips + Voice-Over → fertiges Reel via Telegram.",
    href: "https://smc.wohlstandsmarketing.de/studio",
    icon: "🎬",
    category: "content",
    status: "live",
    internal: true,
    access: "geschützt",
  },
];
