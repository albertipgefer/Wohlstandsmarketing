/**
 * Single Source of Truth für die Service-Hubs (Leistungs-Übersicht).
 * Genutzt von der Homepage-Sektion (LeistungenUebersicht) und der /leistungen-Seite.
 * Reihenfolge = Anzeigereihenfolge. icon referenziert components/preise/ServiceIcon.
 */
export type ServiceHub = {
  label: string;
  href: string;
  desc: string;
  icon: string;
  /** optionaler Badge, z. B. "Neu" oder "Auf Anfrage" */
  tag?: string;
};

export const serviceHubs: ServiceHub[] = [
  {
    label: "Webdesign",
    href: "/webdesign",
    desc: "Unternehmenswebsite, Landingpage & Relaunch — konversionsstark und von Tag 1 auf Google + KI ausgelegt.",
    icon: "building",
  },
  {
    label: "KI-Sichtbarkeit",
    href: "/ki-sichtbarkeit",
    desc: "Von ChatGPT, Perplexity & Claude empfohlen werden — Generative Engine Optimization (GEO).",
    icon: "bolt",
  },
  {
    label: "SEO-Optimierung",
    href: "/seo",
    desc: "Technisches & lokales SEO plus Content-Cluster — nachhaltig oben bei den Money-Keywords.",
    icon: "search",
  },
  {
    label: "Content-Marketing",
    href: "/content-marketing",
    desc: "SEO- & KI-optimierter Content, der rankt und zitiert wird — und dich zur Autorität macht.",
    icon: "pencil",
    tag: "Neu",
  },
  {
    label: "E-Mail-Marketing",
    href: "/e-mail-marketing",
    desc: "Newsletter & automatisierte Verkaufsstrecken — der Kanal, der dir gehört.",
    icon: "mail",
    tag: "Neu",
  },
  {
    label: "KI-Optimierung",
    href: "/ki-optimierung",
    desc: "KI in deine Prozesse: Chatbots, Assistenten und automatisierte Workflows, die Zeit sparen.",
    icon: "cpu",
    tag: "Neu",
  },
  {
    label: "Web-Apps & Automatisierung",
    href: "/web-apps",
    desc: "Individuelle Software, exakt auf deinen Prozess — entwickelt, gehostet, gewartet.",
    icon: "code",
    tag: "Auf Anfrage",
  },
  {
    label: "Webseiten-Relaunch",
    href: "/relaunch",
    desc: "Aus alt mach KI-empfehlbar: moderner Auftritt ohne Ranking-Verlust.",
    icon: "refresh",
  },
];
