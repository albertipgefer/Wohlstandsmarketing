import type { Metadata } from "next";
import type { City } from "@/content/cities/types";

/**
 * Service-Configs für die Standort-Seiten der NEUEN Leistungen
 * (E-Mail-Marketing, Content-Marketing, KI-Optimierung, Web-Apps).
 * Gerendert über components/standort/ServiceStadtPage.tsx.
 *
 * Hinweis: Der lokale Bezug ist bei diesen Leistungen schwächer als bei SEO —
 * deshalb bewusst „für Unternehmen in {city} und Umgebung" statt erzwungenem
 * „lokales SEO"-Framing. Echte Umlaute, du-Form, keine Emojis.
 */

export type Deliverable = { no: string; title: string; desc: string };
export type MethodStep = { no: string; phase: string; title: string; desc: string };
export type Faq = { q: string; a: string };

export type ServiceStadtConfig = {
  slug: string;
  name: string;
  shortName: string;
  hubHref: string;
  serviceType: string;
  badgeLabel: string;
  /** H1 = `${h1Prefix} {city.name}` (city im Accent-Span) */
  h1Prefix: string;
  preFooterAccent: string;
  meta: (city: City) => Metadata;
  heroSubline: (city: City) => string;
  localTitle: (city: City) => string;
  localBody: (city: City) => string[];
  deliverables: (city: City) => Deliverable[];
  methodSteps: (city: City) => MethodStep[];
  faqs: (city: City) => Faq[];
};

/* ─────────────────────────── E-MAIL-MARKETING ─────────────────────────── */
export const emailMarketingStadt: ServiceStadtConfig = {
  slug: "e-mail-marketing",
  name: "E-Mail-Marketing",
  shortName: "E-Mail-Marketing",
  hubHref: "/e-mail-marketing",
  serviceType: "E-Mail-Marketing — Newsletter & Automationen",
  badgeLabel: "E-Mail-Marketing",
  h1Prefix: "E-Mail-Marketing für Unternehmen in",
  preFooterAccent: "Umsatzkanal",
  meta: (city) => ({
    title: `E-Mail-Marketing ${city.name} · Newsletter & Automationen`,
    description: `E-Mail-Marketing für Unternehmen in ${city.name} und ${city.region}: Listenaufbau (DSGVO-konform), automatisierte Verkaufsstrecken und Newsletter — der Kanal, der dir gehört. Mehr Umsatz aus bestehenden Kontakten.`,
    keywords: [
      `E-Mail-Marketing ${city.name}`,
      `Newsletter ${city.name}`,
      `E-Mail Automatisierung ${city.region}`,
      `E-Mail-Marketing Mittelstand ${city.name}`,
    ],
    alternates: { canonical: `/e-mail-marketing/${city.slug}` },
    openGraph: {
      title: `E-Mail-Marketing ${city.name} · Newsletter & Automationen`,
      description: `Aus Kontakten planbar Umsatz machen — für Unternehmen in ${city.name} und Umgebung.`,
      type: "website",
    },
  }),
  heroSubline: (city) =>
    `Für Unternehmen aus ${city.region}. Wir machen aus deinen Kontakten planbar Anfragen und Wiederkäufe — mit Newslettern und automatisierten Strecken, die rund um die Uhr arbeiten.`,
  localTitle: (city) => `E-Mail-Marketing für Unternehmen aus ${city.region}`,
  localBody: (city) => [
    city.intro,
    `Gerade im ${city.region}er Mittelstand entstehen die meisten Aufträge über Vertrauen und Wiederkäufe — und genau da ist E-Mail unschlagbar: Du erreichst Menschen, die dich bereits kennen, ohne für jeden Kontakt neu zu zahlen.`,
    `Eine eigene E-Mail-Liste gehört dir — anders als Reichweite auf Social Media, die dir jederzeit gedrosselt werden kann. Wir bauen sie DSGVO-konform auf und richten die Automationen ein, die im Hintergrund verkaufen, während du arbeitest.`,
  ],
  deliverables: (city) => [
    { no: "01", title: "Listenaufbau (DSGVO)", desc: `Double-Opt-in, Anmeldeformulare und ein nützlicher Lead-Magnet, der dir in ${city.name} echte Kontakte einsammelt — rechtssicher.` },
    { no: "02", title: "Willkommens-Strecke", desc: "Neue Kontakte werden automatisch aufgewärmt: wer du bist, warum du, klarer erster Handlungsschritt." },
    { no: "03", title: "Verkaufs-Automationen", desc: "Strecken, die rund um die Uhr verkaufen — vom Interessenten zum Kunden, ohne dass du manuell nachfasst." },
    { no: "04", title: "Newsletter im Marken-Look", desc: "Geplanter, wiedererkennbarer Newsletter statt Versand nach Lust und Laune — im Design deiner Marke." },
    { no: "05", title: "Betreff- & Inhalts-Optimierung", desc: "Getestete Betreffzeilen und klare Inhalte für hohe Öffnungs- und Klickraten." },
    { no: "06", title: "Reporting & Optimierung", desc: "Öffnungen, Klicks, Umsatz pro Kampagne — transparent, mit klaren nächsten Schritten." },
  ],
  methodSteps: () => [
    { no: "01", phase: "Woche 1", title: "Setup & Strategie", desc: "Tool-Setup, DSGVO-konforme Anmeldung, Lead-Magnet-Konzept und ein Plan, welche Strecken zuerst Umsatz bringen." },
    { no: "02", phase: "Woche 2 – 3", title: "Automationen live", desc: "Willkommens- und Verkaufs-Strecken werden aufgebaut, getextet und scharf geschaltet — sie arbeiten ab sofort." },
    { no: "03", phase: "Laufend", title: "Newsletter & Optimierung", desc: "Regelmäßiger Newsletter, A/B-Tests, Reporting — wir drehen kontinuierlich an Öffnung, Klick und Umsatz." },
  ],
  faqs: (city) => [
    ...city.localFaqs,
    { q: `Lohnt sich E-Mail-Marketing für ein Unternehmen aus ${city.name}?`, a: `Fast immer. E-Mail ist der einzige Kanal, der dir wirklich gehört — und gerade bei lokalem, empfehlungsgetriebenem Geschäft in ${city.region} bringt das systematische Nachfassen bei bestehenden Kontakten oft mehr als jede neue Anzeige.` },
    { q: "Ich habe noch keine E-Mail-Liste — ist das ein Problem?", a: "Nein. Genau da fangen wir an: Liste DSGVO-konform über deine Webseite aufbauen (z. B. mit einem Lead-Magneten) und von Beginn an die Automationen einrichten, die neue Kontakte aufwärmen. So wächst die Liste, während sie schon verkauft." },
    { q: "Wer schreibt die E-Mails — ich oder ihr?", a: "Wir. Du gibst die Eckpunkte, wir übernehmen Konzept, Text, Aufbau und Versand. Auf Wunsch stimmen wir jede Kampagne vorher mit dir ab." },
    { q: "Ist das alles DSGVO-konform?", a: "Ja, das hat Priorität: Double-Opt-in, saubere Einwilligungs-Dokumentation und ein Anbieter, der DSGVO-konform betrieben werden kann." },
  ],
};

/* ─────────────────────────── CONTENT-MARKETING ────────────────────────── */
export const contentMarketingStadt: ServiceStadtConfig = {
  slug: "content-marketing",
  name: "Content-Marketing",
  shortName: "Content-Marketing",
  hubHref: "/content-marketing",
  serviceType: "Content-Marketing — SEO- & KI-optimierter Content",
  badgeLabel: "Content-Marketing",
  h1Prefix: "Content-Marketing für Unternehmen in",
  preFooterAccent: "Autorität",
  meta: (city) => ({
    title: `Content-Marketing ${city.name} · Content, der gefunden wird`,
    description: `Content-Marketing für Unternehmen in ${city.name} und ${city.region}: SEO- & KI-optimierte Artikel, die bei Google ranken und von ChatGPT & Co. zitiert werden — und dich zur Autorität in deinem Markt machen.`,
    keywords: [
      `Content-Marketing ${city.name}`,
      `Content-Erstellung ${city.name}`,
      `Blog-Artikel ${city.region}`,
      `SEO-Content ${city.name}`,
    ],
    alternates: { canonical: `/content-marketing/${city.slug}` },
    openGraph: {
      title: `Content-Marketing ${city.name}`,
      description: `Content, der rankt und zitiert wird — für Unternehmen in ${city.name} und Umgebung.`,
      type: "website",
    },
  }),
  heroSubline: (city) =>
    `Für Unternehmen aus ${city.region}. Inhalte, die bei Google ranken und von ChatGPT, Perplexity & Co. zitiert werden — und dich zur Autorität in deinem Markt machen.`,
  localTitle: (city) => `Content-Marketing für Unternehmen aus ${city.region}`,
  localBody: (city) => [
    city.intro,
    `Guter Content ist ein Vermögenswert: Ein einmal geschriebener Artikel bringt dir dauerhaft Anfragen aus ${city.region}, ohne dass du pro Klick zahlst — und positioniert dich als Experte, dem man vertraut.`,
    `Wir denken Content von Anfang an SEO- und KI-optimiert: Themen entlang der Fragen deiner Kunden, sauber strukturiert, intern verlinkt auf deine wichtigsten Seiten. So wird aus Inhalt planbarer Traffic statt Text, den niemand findet.`,
  ],
  deliverables: () => [
    { no: "01", title: "Themen- & Keyword-Strategie", desc: "Themenplan entlang der Customer Journey (ToFu / MoFu / BoFu) — wir schreiben über das, wonach deine Kunden wirklich suchen." },
    { no: "02", title: "Redaktionelle Artikel", desc: "Hochwertige Artikel, SEO- und GEO-optimiert — mit echtem Fachwissen angereichert, nicht generischer KI-Massentext." },
    { no: "03", title: "Interne Verlinkung", desc: "Saubere Verlinkung, die Autorität gezielt auf deine Money-Pages und Leistungen lenkt." },
    { no: "04", title: "Schema & Struktur", desc: "Schema.org, klare Überschriften und Antwort-Format — damit Google und KI deine Inhalte verstehen und zitieren." },
    { no: "05", title: "Themen-Cluster", desc: "Pillar + Cluster für Topical Authority — du wirst zur sichtbaren Autorität für dein Kernthema." },
    { no: "06", title: "Redaktionsplan & Reporting", desc: "Planbarer Rhythmus statt Content nach Lust und Laune — mit Reporting zu Rankings und Traffic." },
  ],
  methodSteps: (city) => [
    { no: "01", phase: "Woche 1", title: "Strategie & Themenplan", desc: `Keyword- und Themenrecherche für ${city.name} und deine Branche, Cluster-Plan, Prioritäten — eine klare Roadmap.` },
    { no: "02", phase: "Woche 2 – 4", title: "Produktion", desc: "Die ersten Artikel gehen live — recherchiert, redaktionell geprüft, SEO- und KI-optimiert, intern verlinkt." },
    { no: "03", phase: "Laufend", title: "Cluster ausbauen & messen", desc: "Wir bauen das Themen-Cluster kontinuierlich aus und messen Rankings und Traffic — Content wird zum Wachstumskanal." },
  ],
  faqs: (city) => [
    ...city.localFaqs,
    { q: "Wie schnell bringt Content-Marketing Ergebnisse?", a: `Content ist ein Vermögenswert, kein Strohfeuer: Erste Rankings oft nach einigen Wochen, die volle Wirkung über Monate. Dafür arbeitet ein einmal geschriebener Artikel danach dauerhaft für dich — auch für Anfragen aus ${city.region}.` },
    { q: "Was ist der Unterschied zu klassischem SEO?", a: "SEO ist das Fundament (Technik, Struktur, Keywords), Content-Marketing der Inhalt, der darauf rankt und Vertrauen aufbaut. Wir denken Content von Anfang an SEO- und KI-optimiert — beides greift ineinander." },
    { q: "Schreibt ihr den Content mit KI?", a: "Wir nutzen KI für Tempo und Recherche, aber jeder Artikel wird redaktionell geprüft, mit echtem Fachwissen angereichert und auf deine Marke abgestimmt. Reiner KI-Massentext rankt nicht und schadet dem Vertrauen." },
    { q: "Über welche Themen schreibt ihr?", a: "Über die, nach denen deine Kunden suchen und die zu deinen Leistungen führen — abgeleitet aus Keyword-Recherche und deiner Zielgruppe, sortiert nach ToFu/MoFu/BoFu." },
  ],
};

/* ─────────────────────────── KI-OPTIMIERUNG ───────────────────────────── */
export const kiOptimierungStadt: ServiceStadtConfig = {
  slug: "ki-optimierung",
  name: "KI-Optimierung",
  shortName: "KI-Optimierung",
  hubHref: "/ki-optimierung",
  serviceType: "KI-Beratung & Prozessautomatisierung",
  badgeLabel: "KI-Optimierung",
  h1Prefix: "KI-Optimierung für Unternehmen in",
  preFooterAccent: "Zeit",
  meta: (city) => ({
    title: `KI-Optimierung ${city.name} · Prozesse automatisieren`,
    description: `KI-Optimierung für Unternehmen in ${city.name} und ${city.region}: KI in deine Prozesse — Chatbots, KI-Assistenten und automatisierte Workflows, die echte Zeit sparen. Nicht zu verwechseln mit KI-Sichtbarkeit.`,
    keywords: [
      `KI-Optimierung ${city.name}`,
      `Prozessautomatisierung ${city.name}`,
      `KI Automatisierung ${city.region}`,
      `KI für Unternehmen ${city.name}`,
    ],
    alternates: { canonical: `/ki-optimierung/${city.slug}` },
    openGraph: {
      title: `KI-Optimierung ${city.name}`,
      description: `KI, die in deinen Abläufen arbeitet — für Unternehmen in ${city.name} und Umgebung.`,
      type: "website",
    },
  }),
  heroSubline: (city) =>
    `Für Unternehmen aus ${city.region}. KI, die in deinen Abläufen arbeitet — Chatbots, Assistenten und automatisierte Workflows, die dir echte Zeit sparen. (Nicht zu verwechseln mit KI-Sichtbarkeit.)`,
  localTitle: (city) => `KI-Optimierung für Unternehmen aus ${city.region}`,
  localBody: (city) => [
    city.intro,
    `Im Mittelstand aus ${city.region} steckt viel Zeit in wiederkehrenden Aufgaben: Anfragen beantworten, Angebote vorbereiten, Daten pflegen. Genau hier setzt KI-Optimierung an — sie übernimmt die Routine, damit du dich auf das Geschäft konzentrierst.`,
    `Wichtig zur Abgrenzung: KI-Optimierung bringt KI in deine internen Abläufe (nach innen, spart Zeit). KI-Sichtbarkeit sorgt dafür, dass dich ChatGPT & Co. empfehlen (nach außen, bringt Anfragen). Beides bauen wir — hier geht es um die Effizienz nach innen.`,
  ],
  deliverables: () => [
    { no: "01", title: "Prozess-Analyse", desc: "Wir schauen, wo KI dir echte Zeit und Kosten spart — und wo sie sich nicht lohnt. Ehrliche Priorisierung nach Hebelwirkung." },
    { no: "02", title: "KI-Chatbots", desc: "Chatbots für Webseite und Support, die Anfragen rund um die Uhr beantworten und qualifizieren." },
    { no: "03", title: "KI-Assistenten", desc: "Assistenten für interne Aufgaben: Texte, Recherche, Zusammenfassungen, Vorbereitung — auf deine Daten abgestimmt." },
    { no: "04", title: "Workflow-Automatisierung", desc: "Automatisierte Abläufe für Anfragen, Angebote, Datenpflege — manuelle Schritte fallen weg." },
    { no: "05", title: "Tool-Einbindung", desc: "Einbindung in deine bestehenden Tools statt teurer Insellösungen — KI dort, wo du ohnehin arbeitest." },
    { no: "06", title: "Team-Schulung", desc: "Damit die KI im Alltag auch wirklich genutzt wird — verständlich, ohne Technik-Studium." },
  ],
  methodSteps: () => [
    { no: "01", phase: "Woche 1", title: "Analyse & Potenzial", desc: "Wir identifizieren die Abläufe mit dem größten Hebel und rechnen ehrlich durch, was sich lohnt." },
    { no: "02", phase: "Woche 2 – 4", title: "Erste Automation live", desc: "Die wirkungsvollste Lösung wird umgesetzt und eingebunden — du siehst früh einen konkreten Nutzen." },
    { no: "03", phase: "Laufend", title: "Ausbauen & optimieren", desc: "Weitere Prozesse, Feintuning, Anpassung an neue Modelle — KI wird Schritt für Schritt zum Effizienz-Hebel." },
  ],
  faqs: (city) => [
    ...city.localFaqs,
    { q: "Was ist der Unterschied zwischen KI-Optimierung und KI-Sichtbarkeit?", a: "KI-Sichtbarkeit sorgt dafür, dass dein Unternehmen von ChatGPT & Co. empfohlen wird (nach außen). KI-Optimierung bringt KI in deine internen Abläufe (nach innen) — sie automatisiert Aufgaben und spart Zeit. Das eine bringt Anfragen, das andere Effizienz." },
    { q: `Ist KI nicht zu kompliziert für ein kleines Unternehmen aus ${city.name}?`, a: "Genau deshalb begleiten wir dich. Du brauchst kein technisches Wissen — wir analysieren deine Abläufe, setzen die passende Lösung um und schulen dein Team. Maßstab: Spart es dir spürbar Zeit oder Geld? Wenn nicht, machen wir es nicht." },
    { q: "Was kann KI in meinem Betrieb konkret übernehmen?", a: "Typisch: Anfragen automatisch beantworten und qualifizieren, Angebote vorbereiten, Daten zwischen Tools synchronisieren, Texte und Reportings erstellen, einen Chatbot auf der Webseite betreiben. Wir starten dort, wo der Hebel am größten ist." },
    { q: "Wie steht es um Datenschutz und Datensicherheit?", a: "Das klären wir vor jeder Umsetzung: Welche Daten sind im Spiel, wo werden sie verarbeitet, welcher Anbieter passt. Wir wählen Lösungen, die sich DSGVO-konform betreiben lassen." },
  ],
};

/* ─────────────────────── WEB-APPS & AUTOMATISIERUNG ───────────────────── */
export const webAppsStadt: ServiceStadtConfig = {
  slug: "web-apps",
  name: "Web-Apps & Automatisierung",
  shortName: "Web-Apps",
  hubHref: "/web-apps",
  serviceType: "Individuelle Softwareentwicklung",
  badgeLabel: "Web-Apps",
  h1Prefix: "Web-Apps & Automatisierung für Unternehmen in",
  preFooterAccent: "Engpass",
  meta: (city) => ({
    title: `Web-Apps & Automatisierung ${city.name} · Individuelle Software`,
    description: `Individuelle Web-Apps und Automatisierungen für Unternehmen in ${city.name} und ${city.region}: maßgeschneiderte Software auf deinen Prozess — entwickelt, gehostet, gewartet. Umsetzung individuell auf Anfrage.`,
    keywords: [
      `Web-App Entwicklung ${city.name}`,
      `Software Entwicklung ${city.name}`,
      `Prozessautomatisierung ${city.region}`,
      `individuelle Software ${city.name}`,
    ],
    alternates: { canonical: `/web-apps/${city.slug}` },
    openGraph: {
      title: `Web-Apps & Automatisierung ${city.name}`,
      description: `Maßgeschneiderte Software auf deinen Prozess — für Unternehmen in ${city.name} und Umgebung, auf Anfrage.`,
      type: "website",
    },
  }),
  heroSubline: (city) =>
    `Für Unternehmen aus ${city.region}. Wenn Standard-Software nicht passt: maßgeschneiderte Web-Apps und Automatisierungen, exakt auf deinen Prozess — individuell auf Anfrage.`,
  localTitle: (city) => `Individuelle Web-Apps für Unternehmen aus ${city.region}`,
  localBody: (city) => [
    city.intro,
    `Viele Betriebe aus ${city.region} arbeiten mit Software, die nur zu 80 % passt — der Rest wird mühsam mit Excel und Handarbeit überbrückt. Genau diese Lücke schließen wir mit einer Lösung, die exakt auf deinen Prozess zugeschnitten ist.`,
    `Wir starten bewusst klein: Statt monatelang ins Blaue zu entwickeln, definieren wir den kleinstmöglichen sinnvollen ersten Schritt — damit du früh einen Nutzen siehst. Umfang und Investition klären wir individuell, deshalb arbeiten wir hier mit einem Angebot auf Anfrage.`,
  ],
  deliverables: () => [
    { no: "01", title: "Discovery & Konzept", desc: "Wir verstehen deinen Prozess und definieren den kleinstmöglichen sinnvollen ersten Schritt — ehrlich gerechnet, ob es sich lohnt." },
    { no: "02", title: "Individuelle Web-App", desc: "Maßgeschneiderte Anwendung, exakt auf deinen Ablauf zugeschnitten — kein Kompromiss von der Stange." },
    { no: "03", title: "Prozess-Automatisierung", desc: "Manuelle, wiederkehrende Abläufe werden abgelöst — weniger Handarbeit, weniger Fehler." },
    { no: "04", title: "System-Anbindung", desc: "Anbindung an deine bestehenden Systeme und Schnittstellen statt neuer Insel." },
    { no: "05", title: "Hosting & Wartung", desc: "Auf Wunsch übernehmen wir Betrieb und Wartung — du musst dich um nichts kümmern." },
    { no: "06", title: "Skalierbarer Stack", desc: "Moderner, schneller Stack (Next.js), wartbar und skalierbar — und die Lösung gehört dir." },
  ],
  methodSteps: () => [
    { no: "01", phase: "Schritt 1", title: "Konzept & Scope", desc: "Prozess verstehen, kleinsten sinnvollen Schritt definieren, ehrlich rechnen, ob sich die Entwicklung lohnt." },
    { no: "02", phase: "Schritt 2", title: "Entwicklung & Launch", desc: "Wir bauen zuerst ein funktionierendes MVP, das du früh nutzt — statt monatelang ins Blaue zu entwickeln." },
    { no: "03", phase: "Laufend", title: "Betrieb & Ausbau", desc: "Hosting, Wartung und schrittweiser Ausbau — die Lösung wächst mit deinem Bedarf." },
  ],
  faqs: (city) => [
    ...city.localFaqs,
    { q: `Woran erkenne ich, ob sich eine Web-App für mein Unternehmen aus ${city.name} lohnt?`, a: "Immer dann, wenn dich ein manueller Prozess regelmäßig Zeit kostet oder Standard-Software an deine Grenzen stößt. Im Erstgespräch rechnen wir ehrlich durch, ob sich die Entwicklung lohnt — wenn nicht, sagen wir es dir." },
    { q: "Was kostet eine individuelle Web-App?", a: "Das hängt vom Umfang ab — deshalb arbeiten wir mit einem individuellen Angebot auf Anfrage. Wir definieren den kleinstmöglichen sinnvollen ersten Schritt, damit du früh einen Nutzen siehst, statt monatelang ins Blaue zu entwickeln." },
    { q: "Wem gehört die fertige Lösung?", a: "Dir. Du bekommst eine saubere, wartbare Lösung auf modernem Stack — ohne Abhängigkeit von intransparenten Baukästen. Auf Wunsch übernehmen wir Hosting und Wartung." },
    { q: "Bindet ihr bestehende Systeme an?", a: "Ja, wo es geht. Wir verbinden die Lösung mit deinen vorhandenen Tools und Schnittstellen, damit keine neue Dateninsel entsteht." },
  ],
};

export const standortServices: ServiceStadtConfig[] = [
  emailMarketingStadt,
  contentMarketingStadt,
  kiOptimierungStadt,
  webAppsStadt,
];
