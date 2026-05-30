export type Service = {
  slug: string;
  /** Full service name, e.g. "Unternehmenswebsite" */
  name: string;
  /** Short label for breadcrumb/eyebrow */
  shortName: string;
  /** Existing service hub this links back to */
  hub: string;
  /** Tail clause appended after the industry name in the H1 (benefit-driven) */
  h1Tail: string;
  /** Generic explanation of what the service is (1-2 sentences) */
  intro: string;
  /** 4-6 concrete deliverables */
  deliverables: string[];
  /** Meta description template part — combined with industry in the page */
  metaLead: string;
  /** 3 service-specific FAQ items (merged with industry FAQs on the page) */
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "unternehmenswebsite",
    name: "Unternehmenswebsite",
    shortName: "Unternehmenswebsite",
    hub: "/webdesign",
    h1Tail: "die Anfragen bringt",
    intro:
      "Deine Unternehmenswebsite ist das Fundament deiner Sichtbarkeit — der Ort, an dem aus Besuchern Anfragen werden. Wir bauen sie konversionsstark, schnell und von Tag 1 auf Google- und KI-Sichtbarkeit ausgelegt.",
    deliverables: [
      "Individuelles Design auf deine Positionierung zugeschnitten — keine Vorlage von der Stange",
      "Konversionsstarke Struktur mit klaren Anfrage-Strecken",
      "Mobil, Tablet und Desktop perfekt optimiert (Core Web Vitals grün)",
      "Vollständiges schema.org-Markup für Google und KI-Systeme",
      "In der Regel in 7 Tagen live",
    ],
    metaLead: "Unternehmenswebsite",
    faqs: [
      { q: "Wie lange dauert es, bis meine Unternehmenswebsite live ist?", a: "In der Regel geht deine Webseite nach 7 Tagen live. Voraussetzung ist, dass Inhalte und Freigaben zügig kommen — den Rest übernehmen wir. Die volle KI- und Google-Sichtbarkeit baut sich danach über die 90-Tage-Roadmap der WSM-Methode auf." },
      { q: "Kann ich die Webseite später selbst pflegen?", a: "Ja. Auf Wunsch binden wir ein einfaches Redaktionssystem ein, mit dem du Texte und Bilder selbst aktualisierst. Wer lieber nichts anfassen möchte, übergibt die Pflege an unsere Webseiten-Wartung." },
      { q: "Was unterscheidet eure Webseiten von einem Baukasten?", a: "Baukästen sind langsam, austauschbar und für Google wie KI schwer lesbar. Wir bauen mit modernem Stack (Next.js), individuell auf deine Positionierung, mit sauberem schema.org-Markup — damit du nicht nur online bist, sondern auch gefunden und empfohlen wirst." },
    ],
  },
  {
    slug: "landingpage",
    name: "Landingpage",
    shortName: "Landingpage",
    hub: "/webdesign",
    h1Tail: "die konvertiert",
    intro:
      "Eine Landingpage hat genau ein Ziel: aus Besuchern Anfragen machen. Fokussiert, ohne Ablenkung, mit klarer Handlungsaufforderung. Ideal für ein konkretes Angebot, eine Kampagne oder eine einzelne Leistung.",
    deliverables: [
      "Eine klare Botschaft, ein klares Ziel — keine Ablenkung",
      "Conversion-optimierte Struktur (Hero, Nutzen, Beweis, CTA)",
      "Schnelle Ladezeit für maximale Abschlussrate",
      "Anfrage-Formular direkt eingebunden",
      "In wenigen Tagen live",
    ],
    metaLead: "Landingpage",
    faqs: [
      { q: "Wann brauche ich eine Landingpage statt einer ganzen Webseite?", a: "Immer dann, wenn du ein konkretes Angebot oder eine einzelne Leistung in den Fokus stellen willst — fokussiert auf eine einzige Handlung. Eine Landingpage konvertiert oft besser als eine vielseitige Webseite, weil sie nicht ablenkt." },
      { q: "Wie schnell ist eine Landingpage online?", a: "Da der Umfang kleiner ist als bei einer vollen Webseite, geht eine Landingpage meist innerhalb weniger Tage live — sobald Botschaft und Ziel klar sind." },
      { q: "Kann die Landingpage später zur vollen Webseite ausgebaut werden?", a: "Ja. Wir bauen so, dass aus einer Landingpage jederzeit eine vollständige Unternehmenswebsite werden kann, ohne von vorne anzufangen." },
    ],
  },
  {
    slug: "relaunch",
    name: "Webseiten-Relaunch",
    shortName: "Relaunch",
    hub: "/relaunch",
    h1Tail: "der sich auszahlt",
    intro:
      "Eine veraltete Webseite kostet dich täglich Anfragen — sie lädt langsam, wirkt unmodern und wird von Google wie KI schlecht verstanden. Ein Relaunch macht aus deinem Altbestand einen Auftritt, der wieder Anfragen bringt.",
    deliverables: [
      "Analyse: Was an der alten Seite Anfragen kostet",
      "Modernes Design + konversionsstarke Struktur",
      "Übernahme von Rankings und Inhalten ohne Sichtbarkeitsverlust (sauberes Redirect-Konzept)",
      "Technisches Upgrade: Tempo, Mobil, Core Web Vitals",
      "schema.org + KI-Sichtbarkeit von Anfang an mitgedacht",
    ],
    metaLead: "Webseiten-Relaunch",
    faqs: [
      { q: "Verliere ich beim Relaunch meine Google-Rankings?", a: "Nein — vorausgesetzt, der Relaunch wird sauber gemacht. Wir setzen ein durchdachtes Redirect-Konzept (301) um, übernehmen relevante Inhalte und sichern bestehende Rankings ab. Richtig gemacht, verbessert ein Relaunch deine Sichtbarkeit, statt sie zu gefährden." },
      { q: "Woran erkenne ich, dass sich ein Relaunch lohnt?", a: "Typische Anzeichen: lange Ladezeiten, schlechte Darstellung auf dem Handy, veraltetes Design, kaum Anfragen über die Seite oder schlechte Auffindbarkeit bei Google. Im Erstgespräch sagen wir dir ehrlich, ob ein Relaunch oder ein Neubau sinnvoller ist." },
      { q: "Wie lange dauert ein Relaunch?", a: "Wie beim Neubau ist deine neue Seite in der Regel in 7 Tagen live. Die Übernahme von Inhalten und das Redirect-Konzept planen wir so, dass es keine Sichtbarkeitslücke gibt." },
    ],
  },
  {
    slug: "ki-sichtbarkeit",
    name: "KI-Sichtbarkeit",
    shortName: "KI-Sichtbarkeit",
    hub: "/ki-sichtbarkeit",
    h1Tail: "in ChatGPT & Co.",
    intro:
      "Immer mehr Menschen fragen nicht mehr Google, sondern ChatGPT, Perplexity oder Claude nach einem Anbieter. KI-Sichtbarkeit (Generative Engine Optimization) sorgt dafür, dass dein Unternehmen in genau diesen Antworten empfohlen wird.",
    deliverables: [
      "Vollständiges schema.org-Entity-Profil deines Unternehmens",
      "Answer Engine Optimization (AEO): zitierfähige, klar strukturierte Inhalte",
      "llms.txt und KI-Crawler-Freigabe (GPTBot, ClaudeBot, PerplexityBot u. a.)",
      "Monitoring, ob und wie KI-Systeme dich nennen",
      "Einmalig oder als laufender Retainer (3 / 6 / 9 / 12 Monate)",
    ],
    metaLead: "KI-Sichtbarkeit",
    faqs: [
      { q: "Was ist KI-Sichtbarkeit überhaupt?", a: "KI-Sichtbarkeit (Generative Engine Optimization, GEO) bedeutet: Dein Unternehmen wird genannt, wenn jemand ChatGPT, Perplexity, Claude oder die Google AI Overviews nach einem Anbieter fragt. Es ist das, was SEO für Google war — nur für die KI-gestützte Suche, die gerade rasant wächst." },
      { q: "Wie sorgt ihr dafür, dass die KI mein Unternehmen empfiehlt?", a: "Über ein sauberes schema.org-Entity-Profil, Answer Engine Optimization (zitierfähige Inhalte), llms.txt und gezielte Trust-Signale. Diese Signale nutzen die KI-Systeme, um vertrauenswürdige Anbieter zu nennen — wer sie setzt, hat aktuell einen großen Vorsprung." },
      { q: "Kann man KI-Sichtbarkeit messen?", a: "Teilweise — und besser, als die meisten denken. Wir prüfen regelmäßig, ob und wie ChatGPT, Perplexity und Co. dein Unternehmen nennen, und steuern gezielt nach. Komplette Garantien gibt es bei KI nicht, aber die Richtung lässt sich klar belegen." },
    ],
  },
  {
    slug: "seo",
    name: "SEO-Optimierung",
    shortName: "SEO",
    hub: "/seo",
    h1Tail: "die nachhaltig wirkt",
    intro:
      "SEO bringt dir Anfragen, ohne für jeden Klick zu bezahlen — nachhaltig und planbar. Wir optimieren deine Seite technisch, lokal und inhaltlich, damit du bei den Suchanfragen oben stehst, die wirklich Umsatz bringen.",
    deliverables: [
      "Technisches SEO: Core Web Vitals, Indexierung, sauberes internes Linking",
      "Lokales SEO: Google Business Profile, lokale Schema, Maps-Sichtbarkeit",
      "On-Page-SEO: die richtigen Money-Keywords auf den richtigen Seiten",
      "Inhalts-Strategie für nachhaltige Rankings",
      "Einmalig oder als laufender Retainer (6 / 9 / 12 Monate) mit Reporting",
    ],
    metaLead: "SEO-Optimierung",
    faqs: [
      { q: "Wie lange dauert es, bis SEO wirkt?", a: "Erste Effekte siehst du oft nach wenigen Wochen, die volle Wirkung baut sich über Monate auf. SEO ist kein Sprint, sondern ein nachhaltiger Kanal: Einmal aufgebaut, bringt er dir kontinuierlich Anfragen, ohne dass du pro Klick zahlst." },
      { q: "Was ist der Unterschied zwischen SEO und KI-Sichtbarkeit?", a: "SEO sorgt dafür, dass du bei Google gefunden wirst. KI-Sichtbarkeit sorgt dafür, dass dich ChatGPT, Perplexity und Co. empfehlen. Beides greift ineinander — viele Signale (Schema, Inhalte, Trust) wirken auf beide Kanäle. Am stärksten bist du, wenn du beides zusammen aufbaust." },
      { q: "Bietet ihr SEO einmalig oder nur als Abo?", a: "Beides. Du kannst eine einmalige SEO-Optimierung buchen oder einen laufenden Retainer (6 / 9 / 12 Monate) mit kontinuierlicher Arbeit und monatlichem Reporting. Was sinnvoll ist, hängt von deinem Ziel ab — das klären wir ehrlich im Erstgespräch." },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
