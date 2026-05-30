/**
 * Zentrale Produkt-Daten.
 *
 * Bullets sind im Baulig-Stil verfasst:
 *   "Erhalte X, mit dem du Y" oder "Wie du Z" — psychologisch wirksam,
 *   beschreibend, mit klarem Nutzen-Verweis.
 *
 * `digistoreUrl` ist aktuell null — wird gefüllt, sobald CopeCart-Setup steht.
 */

export type Product = {
  slug: string;
  phase: string;
  shortName: string;
  longTitle: string;
  subtitle: string;
  priceNow: string;
  priceStrike: string;
  cover: string;
  mockup: string;
  bullets: string[];
  forWhom: string[];
  steps: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  digistoreUrl: string | null;
};

export const PRODUCTS: Product[] = [
  {
    slug: "wohlstands-guide",
    phase: "Phase 1",
    shortName: "Dein Wohlstands-Guide 2026",
    longTitle:
      "So würde ich im Jahr 2026 starten, wenn ich heute wieder bei 0 wäre",
    subtitle:
      "Der vollständige Weg vom Tagesjob zur ersten ortsunabhängigen Selbstständigkeit — als 18-Seiten-PDF zum Lesen, Wiederlesen und Umsetzen.",
    priceNow: "5 €",
    priceStrike: "19 €",
    cover: "/images/cover-phase-1-wohlstands-guide.png",
    mockup: "/images/mockup-phase-1.png",
    bullets: [
      "Erhalte das vollständige 18-Seiten-PDF, in dem ich dir exakt den Weg zeige, den ich heute gehen würde, wenn ich nochmal bei Null wäre — ohne Geheimformel, ohne Hochglanz-Versprechen.",
      "Wie du die 10 typischen Sackgassen erkennst, in denen 95 % aller Anfänger landen und ihre Zeit verbrennen — bevor du auch nur einen Euro investierst.",
      "Wie du in 8 klaren Stationen vom ersten Schritt bis zum ersten zahlenden Kunden kommst — als Roadmap mit klaren Ergebnis-Erwartungen pro Station.",
      "Erfahre die ehrliche Wahrheit zu Zeit, Geld und Schwierigkeitsgrad — damit du weißt, worauf du dich einlässt, bevor du startest.",
      "Lebenslanger Zugang zum PDF — du kannst es jederzeit wieder öffnen, wenn du im Prozess feststeckst.",
    ],
    forWhom: [
      "Du bist unzufrieden mit deinem Job und willst raus — aber weißt nicht, wo du anfangen sollst.",
      "Du hast bereits Dropshipping, Print-on-Demand oder Affiliate ausprobiert und nichts hat funktioniert.",
      "Du suchst einen ehrlichen Plan, der wirklich funktioniert — kein Make-Money-Geschwafel, kein „passives Einkommen in 7 Tagen“.",
      "Du bist bereit, 6–12 Monate ehrlich zu arbeiten, um danach ortsunabhängig zu leben.",
    ],
    steps: [
      { title: "Kauf", body: "Du zahlst 5 € via CopeCart (Kreditkarte, PayPal, SEPA)." },
      { title: "Mail", body: "Du bekommst sofort dein PDF zum Download." },
      { title: "Lesen", body: "Du nimmst dir ca. 45 Min Zeit und gehst den Plan einmal durch." },
      { title: "Umsetzen", body: "Du entscheidest, ob dieser Weg deiner ist — und gehst den ersten Schritt." },
    ],
    faq: [
      {
        q: "Wer sollte das kaufen?",
        a: "Jeder, der online selbstständig werden will und einen klaren Fahrplan sucht — ohne Marketing-Bullshit, ohne Geheimformel.",
      },
      {
        q: "Bekomme ich nur ein PDF?",
        a: "Ja. Ein ehrliches, 18-Seiten-PDF. Keine Video-Module, kein E-Learning, kein aufgeblähter Kurs — sondern auf den Punkt.",
      },
      {
        q: "Wie lange habe ich Zugang?",
        a: "Lebenslang. Du lädst das PDF herunter und es gehört dir.",
      },
      {
        q: "Brauche ich Vorerfahrung?",
        a: "Nein. Das PDF ist explizit für Anfänger geschrieben, die noch ganz am Anfang stehen oder schon ein paar gescheiterte Versuche hinter sich haben.",
      },
      {
        q: "Geld-zurück-Garantie?",
        a: "Bei 5 € erübrigt sich das ehrlich gesagt. Wenn dir das PDF nichts bringt — schreib mir eine DM und ich überweise dir die 5 € zurück. Versprochen.",
      },
    ],
    digistoreUrl: null,
  },
  {
    slug: "ki-webseite",
    phase: "Phase 2",
    shortName: "Deine erste KI-Webseite in unter 7 Tagen",
    longTitle: "Deine erste KI-Webseite in unter 7 Tagen",
    subtitle:
      "Vom leeren Laptop bis zur ersten Webseite, die im Internet erreichbar ist — Schritt für Schritt, ohne eine Zeile Code zu lernen.",
    priceNow: "19 €",
    priceStrike: "49 €",
    cover: "/images/cover-phase-2-erste-ki-webseite.png",
    mockup: "/images/mockup-phase-2.png",
    bullets: [
      "Erhalte den kompletten Notion-Workspace zum Duplizieren — landet in 3 Klicks in deinem eigenen Notion und gehört dir lebenslang.",
      "Wie du in 7 klaren Schritten vom leeren Laptop bis zur live geschalteten Webseite kommst — Claude Code, GitHub, Vercel und SEO inklusive.",
      "Wie du mit KI Webseiten baust, die professioneller aussehen und schneller laden als 95 % aller lokalen Anbieter — ohne eine Zeile Code zu schreiben.",
      "Erhalte den SEO-Mega-Prompt, der deine Webseite mit einem einzigen Copy-Paste komplett für Google + KI-Sichtbarkeit optimiert.",
      "Wie du die typischen Anfänger-Fallen meidest — komplettes Fehler-Lexikon mit den 20 häufigsten Stolpersteinen.",
      "Erhalte das Cheat-Sheet mit allen wichtigen Befehlen + Copy-Paste-Prompts auf einer Seite — du sparst dir stundenlanges Suchen.",
    ],
    forWhom: [
      "Du hast den Wohlstands-Guide gelesen und willst endlich loslegen — nicht mehr nur planen.",
      "Du hast 0 Programmier-Erfahrung — aber bist bereit, mit Künstlicher Intelligenz zu arbeiten.",
      "Du willst in 7–14 Tagen deine erste echte Webseite live im Internet haben.",
      "Du willst keine Wix-/Squarespace-Baukasten-Optik, sondern professionellen Code, der skaliert.",
    ],
    steps: [
      { title: "Kauf", body: "Du zahlst 19 € via CopeCart." },
      { title: "Mail", body: "Du bekommst sofort den Notion-Workspace-Link." },
      { title: "Duplizieren", body: "Ein Klick — der Workspace landet in deinem eigenen Notion." },
      { title: "Arbeiten", body: "Du gehst die 7 Schritte durch, in deinem Tempo." },
    ],
    faq: [
      {
        q: "Brauche ich technische Vorkenntnisse?",
        a: "Nein. Wenn du E-Mails schreiben kannst, kannst du diesen Workspace nutzen. Alle Befehle sind Copy-Paste.",
      },
      {
        q: "Brauche ich ein Notion-Konto?",
        a: "Ja, das ist kostenlos. Du kannst es in 2 Minuten anlegen unter notion.so.",
      },
      {
        q: "Was kostet mich der Bau einer Webseite zusätzlich?",
        a: "~20 € einmalig (Claude Code Pro-Abo + eine Domain). Hosting auf Vercel ist kostenlos.",
      },
      {
        q: "Wie lange dauert das wirklich?",
        a: "Bei 2–3 Stunden pro Tag: 7–14 Tage bis zur ersten live geschalteten Webseite. Vollzeit-Sprint: 3–5 Tage.",
      },
      {
        q: "Wie lange habe ich Zugang?",
        a: "Lebenslang. Der Workspace gehört dir nach dem Duplizieren komplett.",
      },
    ],
    digistoreUrl: null,
  },
  {
    slug: "3-testkunden",
    phase: "Phase 3",
    shortName: "So gewinnst du deine ersten 3 Testkunden in den nächsten 4 Wochen",
    longTitle:
      "So gewinnst du deine ersten 3 Testkunden in den nächsten 4 Wochen",
    subtitle:
      "Ohne Testkunden sagt dir niemand 1.000 € für eine Webseite zu. Mit drei in der Hand kippt das Gespräch — und du wirst nie wieder als Anfänger wahrgenommen.",
    priceNow: "27 €",
    priceStrike: "67 €",
    cover: "/images/cover-phase-3-erste-3-testkunden.png",
    mockup: "/images/mockup-phase-3.png",
    bullets: [
      "Erhalte die komplette PDF-Strategie + Notion-Workspace mit 6 Copy-Paste-Assets — dein 4-Wochen-Plan zum ersten Beweis-Stack.",
      "Wie du die richtige Branche für deinen Start auswählst — mit 3 konkreten Empfehlungen + 10er-Liste, ohne Branchen-Hopping.",
      "Erhalte das wortwörtliche Vor-Ort-Skript zum Copy-Paste — ich sage dir Satz für Satz, was du beim Inhaber sagst, ohne wie ein Vertreter zu wirken.",
      "Wie du eine unterschriftsreife Testkunden-Vereinbarung in 5 Minuten ausgefüllt hast — Vorlage liegt im Workspace.",
      "Wie du auch nach 5 Neins standhaft bleibst und beim 6. Geschäft den Deal machst — komplette Mindset-Sektion gegen das Aufgeben.",
      "Erhalte die Portfolio-Seiten-Anleitung, damit du nach diesem Schritt nie wieder als Anfänger wahrgenommen wirst.",
    ],
    forWhom: [
      "Du hast Phase 2 absolviert und kannst Webseiten bauen — hast aber noch keinen echten Case in der Hand.",
      "Du willst die ersten 3 Testkunden sauber aufbauen, ohne Vertretermasche.",
      "Du bist bereit, 2–3 Wochen vor Ort zu gehen und ehrlich zu sprechen.",
      "Du willst nie wieder als Anfänger durchgehen, wenn du den nächsten Inhaber ansprichst.",
    ],
    steps: [
      { title: "Kauf", body: "27 € via CopeCart." },
      { title: "Mail", body: "Sofort PDF + Notion-Link in deiner Mailbox." },
      { title: "Vorbereiten", body: "Branche wählen, 3 Geschäfte recherchieren, Webseiten vorab bauen." },
      { title: "Vor Ort", body: "Skript anwenden, Deal machen, Hand schütteln." },
      { title: "Liefern", body: "Webseite live schalten, Referenz einsammeln." },
    ],
    faq: [
      {
        q: "Brauche ich Phase 2 vorher?",
        a: "Ja. Du musst Webseiten bauen können, bevor du Testkunden ansprichst. Ohne fertige Vorab-Webseite funktioniert das Skript nicht.",
      },
      {
        q: "Muss ich wirklich vor Ort gehen?",
        a: "Ja. Vor Ort ist der Mechanismus, der bei den ersten Testkunden funktioniert. Telefon und Mail bringen ohne Beweis-Stack fast keine Termine.",
      },
      {
        q: "Was, wenn niemand Ja sagt?",
        a: "Du brauchst typisch 5–10 Anläufe für 3 Testkunden. Das ist normal. Im PDF gehe ich genau auf den Mindset-Aspekt und das Standhalten gegenüber Neins ein.",
      },
      {
        q: "Verlangst du wirklich, dass ich gratis arbeite?",
        a: "Ja, für die ersten drei. Du tauschst Arbeit gegen Beweise — und ohne Beweise sagt dir niemand 1.000 € zu. Diese 3 Webseiten sind dein Verkaufs-Asset für die nächsten 30 zahlenden Kunden.",
      },
      {
        q: "Wie lange habe ich Zugang?",
        a: "Lebenslang.",
      },
    ],
    digistoreUrl: null,
  },
  {
    slug: "1000-euro-kunde",
    phase: "Phase 4",
    shortName: "So gewinnst du deinen ersten 1.000-€-Kunden",
    longTitle:
      "So gewinnst du deinen ersten 1.000-€-Kunden",
    subtitle:
      "Vom Testkunden zum zahlenden Auftrag — der vollständige Akquise- und Sales-Stack mit Skripten, die ich täglich nutze, um selbst zu verkaufen.",
    priceNow: "49 €",
    priceStrike: "99 €",
    cover: "/images/cover-phase-4-erster-1000-kunde.png",
    mockup: "/images/mockup-phase-4.png",
    bullets: [
      "Erhalte den vollständigen Akquise- und Sales-Stack als PDF + Notion-Workspace — 8 Copy-Paste-Assets, die ich selbst täglich einsetze.",
      "Wie du in 30 Minuten 100+ qualifizierte Leads aus Google Maps ziehst — mit Apify + Claude Code, ohne manuelle Recherche.",
      "Erhalte das Cold-Call-Framework mit Füllfeldern für deine Zielgruppe — kein Wort-für-Wort-Skript, sondern ein anpassbares System.",
      "Wie du im 15-Min-Setting-Call sauber qualifizierst und nur die richtigen Leads zum 60-Min-Closing einlädst — komplettes Framework 1:1 aus meiner Praxis.",
      "Wie du im 60-Min-Closing-Call mit den 11-Schritten-Frameworks deinen Sales-Prozess vom Opening bis After-Sales sauber durchziehst.",
      "Erhalte das Einwand-Cheat-Sheet mit ABC-Technik, 4 Top-Einwand-Antworten und Reframes — du wirst nie wieder ohne Antwort dastehen.",
      "Wie du in Accountable ein steuersicheres Angebot in 5 Minuten erstellst und digital unterschreiben lässt — Vorlage inklusive.",
    ],
    forWhom: [
      "Du hast Phase 3 absolviert und 3 Testkunden + Portfolio-Seite in der Hand.",
      "Du willst den Sprung vom Anfänger zum zahlenden Profi.",
      "Du brauchst Skripte, die in der Praxis funktionieren — nicht aus dem Internet zusammenkopiert.",
      "Du bist bereit, 2–3 Stunden täglich Akquise zu machen.",
    ],
    steps: [
      { title: "Kauf", body: "49 € via CopeCart." },
      { title: "Mail", body: "Sofort PDF + Notion-Link." },
      { title: "Lead-Liste", body: "100+ Leads in 30 Min mit Apify aufgebaut." },
      { title: "Akquise", body: "Telefon, E-Mail, LinkedIn oder Vor Ort — du wählst." },
      { title: "Closing", body: "Skripte anwenden, Vertrag unterschreiben." },
    ],
    faq: [
      {
        q: "Brauche ich Phase 2 + 3 vorher?",
        a: "Ja. Du musst bauen können und Testkunden-Referenzen haben, bevor zahlende Kunden Ja sagen.",
      },
      {
        q: "Funktioniert das wirklich für Anfänger?",
        a: "Ja, wenn du die Skripte ehrlich übst und Volumen machst. Erwartung: 2–6 Wochen bis zum ersten Kunden bei Vollzeit, 6–12 Wochen bei Teilzeit.",
      },
      {
        q: "Wie viele Anrufe brauche ich?",
        a: "Erwartung: 100 Calls → 2–3 Kunden. Volumen ist alles. Wer 10 Calls macht und aufgibt, gewinnt nie.",
      },
      {
        q: "Welche Tools brauche ich zusätzlich?",
        a: "Apify (kostenloses Free-Tier reicht für die ersten 100–200 Leads) + Accountable für die Rechnungsstellung. Mehr nicht.",
      },
      {
        q: "Wie lange habe ich Zugang?",
        a: "Lebenslang.",
      },
    ],
    digistoreUrl: null,
  },
  {
    slug: "onboarding-delivery",
    phase: "Phase 5",
    shortName: "Onboarding, Umsetzung & Delivery",
    longTitle: "Onboarding, Umsetzung & Delivery",
    subtitle:
      "Mit System sauber liefern, Referenz einsammeln und den Upsell auf KI-Sichtbarkeit + SEO landen — der komplette Delivery-Prozess in einem Workspace.",
    priceNow: "97 €",
    priceStrike: "197 €",
    cover: "/images/cover-phase-5-onboarding-delivery.png",
    mockup: "/images/mockup-phase-5.png",
    bullets: [
      "Erhalte das vollständige 14-Tage-Liefer-Playbook als PDF + Notion-Workspace mit 8 Copy-Paste-Assets — vom Vertragsabschluss bis zur Live-Schaltung.",
      "Wie du am Tag 0 die richtige Onboarding-Mail rausschickst und sofort Standing aufbaust — Template steht im Workspace.",
      "Erhalte den 30-Min-Kick-Off-Call-Leitfaden mit 7 Punkten — du gehst nie wieder unvorbereitet in ein Erstgespräch.",
      "Wie du mit dem 7-Tage-Bau-Tracker tagesgenau lieferst, ohne dass etwas durchrutscht.",
      "Wie du standhaft bleibst, wenn der Kunde 30 Änderungen wünscht — Skripte für jede typische Feedback-Situation.",
      "Erhalte die unterschriftsreife Aufstockungs-Angebots-Vorlage für KI-Sichtbarkeit + SEO — als einmalige Optimierung (500 €) oder Retainer (500 €/Monat).",
      "Wie du im selben Übergabe-Call die Referenz einsammelst UND den Upsell auf 500 €/Monat MRR sicher landest — Pitch zum Copy-Paste.",
    ],
    forWhom: [
      "Du hast Phase 4 absolviert und deinen ersten zahlenden Kunden.",
      "Du willst sauber liefern, nicht improvisieren.",
      "Du willst aus 1 zahlenden Kunden einen weiterempfehlenden Kunden machen.",
      "Du willst den Upsell auf KI-Sichtbarkeit + SEO sicher landen — und damit deinen ersten monatlich wiederkehrenden Umsatz aufbauen.",
    ],
    steps: [
      { title: "Kauf", body: "97 € via CopeCart." },
      { title: "Mail", body: "Sofort PDF + Notion-Link." },
      { title: "Onboarding", body: "Mail-Template raus, Standing aufbauen." },
      { title: "Kick-Off", body: "30-Min-Call, Inhalte einsammeln." },
      { title: "Bauen + Übergabe", body: "7 Tage liefern, Referenz einsammeln, Upsell pitchen." },
    ],
    faq: [
      {
        q: "Brauche ich Phase 2 + 3 + 4 vorher?",
        a: "Ja. Du musst bauen, Testkunden haben und verkauft haben, bevor du das hier brauchst.",
      },
      {
        q: "Wie schnell amortisiert sich das?",
        a: "Bereits mit einem einzigen Upsell auf den KI/SEO-Retainer (500 €/Monat × 3 Monate = 1.500 € Mindestumsatz) machst du das 15-fache des Investments zurück.",
      },
      {
        q: "Bekomme ich auch das Aufstockungs-Angebots-PDF?",
        a: "Ja. Komplettes Vorlage-PDF mit beiden Varianten (Einmalig 500 € oder Retainer 500 €/Monat) zum Anpassen.",
      },
      {
        q: "Was, wenn mein Kunde den Upsell nicht will?",
        a: "Auch okay. Dann hast du trotzdem einen sauber gelieferten 1.000-€-Kunden mit Referenz und Empfehlungspotenzial. Der Upsell ist die Sahnehaube, kein Muss.",
      },
      {
        q: "Wie lange habe ich Zugang?",
        a: "Lebenslang.",
      },
    ],
    digistoreUrl: null,
  },
];

export const STRATEGIEGESPRAECH_URL =
  "https://tidycal.com/albertipgefer/90min-strategiegespraech-mit-albert-ipgefer";

export const SKALIERUNGS_ERSTGESPRAECH_URL =
  "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";

// ───────────── BUNDLE — KOMPLETTPAKET (alle 5 Phasen) ─────────────

export type BundleIncludedPhase = {
  phase: string;
  shortName: string;
  originalPrice: string;
  cover: string;
  mockup: string;
  bullets: string[];
};

export type Bundle = {
  slug: string;
  shortName: string;
  longTitle: string;
  subtitle: string;
  priceNow: string;
  priceStrike: string;
  savings: string;
  savingsPercent: string;
  cover: string;
  mockup: string;
  includedPhases: BundleIncludedPhase[];
  bullets: string[];
  forWhom: string[];
  forWhomNot: string[];
  steps: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  digistoreUrl: string | null;
};

export const BUNDLE: Bundle = {
  slug: "komplettpaket",
  shortName: "Komplettpaket — Die ganze Treppe",
  longTitle: "Der gesamte Weg von 0 bis zum ersten Retainer-Kunden — alle 5 Phasen in einem Paket",
  subtitle:
    "Alle 5 Phasen der Wohlstandsmarketing-Treppe in einem Schlag. Statt 431 € einzeln zahlst du nur 197 € — und hast sofort den kompletten Fahrplan vom ersten Tag bis zum ersten monatlich wiederkehrenden Retainer-Umsatz.",
  priceNow: "197 €",
  priceStrike: "431 €",
  savings: "234 €",
  savingsPercent: "-54 %",
  cover: "/images/cover-bundle-komplettpaket.png",
  mockup: "/images/mockup-bundle-komplettpaket.png",
  includedPhases: [
    {
      phase: "Phase 1",
      shortName: "Dein Wohlstands-Guide 2026",
      originalPrice: "19 €",
      cover: "/images/cover-phase-1-wohlstands-guide.png",
      mockup: "/images/mockup-phase-1.png",
      bullets: [
        "18-Seiten-PDF mit dem kompletten Fahrplan, den ich heute gehen würde, wenn ich bei Null wäre",
        "Die 10 typischen Sackgassen, in denen 95 % aller Anfänger landen — und wie du sie meidest",
        "8 klare Stationen vom ersten Schritt bis zum ersten zahlenden Kunden",
      ],
    },
    {
      phase: "Phase 2",
      shortName: "Deine erste KI-Webseite in unter 7 Tagen",
      originalPrice: "49 €",
      cover: "/images/cover-phase-2-erste-ki-webseite.png",
      mockup: "/images/mockup-phase-2.png",
      bullets: [
        "Kompletter Notion-Workspace zum Duplizieren — landet in 3 Klicks in deinem eigenen Notion",
        "7 klare Schritte vom leeren Laptop bis zur live geschalteten Webseite (Claude Code, GitHub, Vercel, SEO)",
        "SEO-Mega-Prompt + Cheat-Sheet mit allen Befehlen + Fehler-Lexikon mit 20 Stolpersteinen",
      ],
    },
    {
      phase: "Phase 3",
      shortName: "So gewinnst du deine ersten 3 Testkunden in den nächsten 4 Wochen",
      originalPrice: "67 €",
      cover: "/images/cover-phase-3-erste-3-testkunden.png",
      mockup: "/images/mockup-phase-3.png",
      bullets: [
        "PDF-Strategie + Notion-Workspace mit 6 Copy-Paste-Assets für deinen Beweis-Stack",
        "Wortwörtliches Vor-Ort-Skript zum Copy-Paste — Satz für Satz, was du beim Inhaber sagst",
        "Unterschriftsreife Testkunden-Vereinbarung + Portfolio-Seiten-Anleitung",
      ],
    },
    {
      phase: "Phase 4",
      shortName: "So gewinnst du deinen ersten 1.000-€-Kunden",
      originalPrice: "99 €",
      cover: "/images/cover-phase-4-erster-1000-kunde.png",
      mockup: "/images/mockup-phase-4.png",
      bullets: [
        "Akquise- und Sales-Stack als PDF + Notion-Workspace mit 8 Copy-Paste-Assets",
        "100+ qualifizierte Leads aus Google Maps in 30 Min (Apify + Claude Code)",
        "Setting + Closing-Frameworks 1:1 aus meiner Praxis + Einwand-Cheat-Sheet (ABC-Technik)",
      ],
    },
    {
      phase: "Phase 5",
      shortName: "Onboarding, Umsetzung & Delivery",
      originalPrice: "197 €",
      cover: "/images/cover-phase-5-onboarding-delivery.png",
      mockup: "/images/mockup-phase-5.png",
      bullets: [
        "14-Tage-Liefer-Playbook als PDF + Notion-Workspace mit 8 Copy-Paste-Assets",
        "Aufstockungs-Angebots-Vorlage für KI-Sichtbarkeit + SEO (500 € einmalig oder 500 €/Monat Retainer)",
        "Übergabe-Pitch zum Copy-Paste — Referenz UND Upsell auf monatlich wiederkehrenden Umsatz in einem Call",
      ],
    },
  ],
  bullets: [
    "Erhalte alle 5 Phasen sofort nach Kauf — keine Drip-Kampagne, keine Wartezeit. Du bekommst den kompletten Fahrplan auf einmal.",
    "Spare 234 € (-54 %) gegenüber dem Einzelkauf der 5 Phasen.",
    "5 PDFs + 4 Notion-Workspaces + über 25 Copy-Paste-Assets (Skripte, Vorlagen, Vereinbarungen, Cheat-Sheets) — direkt einsetzbar.",
    "Lebenslanger Zugang zu allen Inhalten. Updates der Notion-Workspaces bekommst du automatisch mit, ohne nachzukaufen.",
    "Du sparst dir Wochen an Recherche, Google-Suchen und Fehlentscheidungen — der Plan ist erprobt, jeder Schritt sitzt.",
  ],
  forWhom: [
    "Du willst nicht in Häppchen kaufen, sondern den kompletten Fahrplan auf einmal — und sofort loslegen.",
    "Du bist bereit, in den nächsten 3–6 Monaten ehrlich zu arbeiten, um danach ortsunabhängig zu leben.",
    "Du hast 0 Programmier-Erfahrung — aber bist bereit, mit KI zu arbeiten.",
    `Du willst nicht 5× separat denken („soll ich jetzt Phase 3 kaufen?"), sondern den Weg in der Hand haben.`,
  ],
  forWhomNot: [
    `Du suchst eine Geheimformel oder „passives Einkommen in 7 Tagen". Den Weg gibt's nicht — hier auch nicht.`,
    "Du willst nur Theorie konsumieren, aber nichts umsetzen. Dann brauchst du das Paket nicht.",
    "Du bist nicht bereit, in den ersten Monaten 2–3 Stunden pro Tag zu investieren.",
  ],
  steps: [
    { title: "Kauf", body: "Du zahlst 197 € via CopeCart (Kreditkarte, PayPal, SEPA, Klarna)." },
    { title: "Mail", body: "Du bekommst sofort eine E-Mail mit allen 5 Phasen-Links (PDFs + Notion-Duplicate-Links)." },
    { title: "Loslegen", body: "Du startest mit Phase 1 (45 Min Lesen), gehst dann in deinem Tempo durch Phase 2–5." },
    { title: "Umsetzen", body: "Du baust deine Webseite, sammelst Testkunden, gewinnst deinen ersten zahlenden Kunden, lieferst sauber — und landest den ersten Retainer-Upsell." },
  ],
  faq: [
    {
      q: "Warum so günstig? 197 € statt 431 € klingt fast zu gut.",
      a: "Weil ich will, dass du dich für den kompletten Weg entscheidest — nicht nur die ersten 1–2 Phasen kaufst und dann steckenbleibst. Mein Ziel: dass du nach 6 Monaten deinen ersten 1.000-€-Kunden hast UND den 500 €/Monat-Retainer landest. Dafür brauchst du alle 5 Phasen — nicht 2. Der Bundle-Rabatt ist mein Anreiz, damit du den ganzen Weg gehst.",
    },
    {
      q: "Was unterscheidet das Paket vom Einzelkauf?",
      a: `Inhaltlich nichts — du bekommst genau dieselben PDFs + Notion-Workspaces. Der Unterschied: 234 € Ersparnis und eine einzige E-Mail mit allen 5 Links. Kein „später nachkaufen", kein Suchen, keine Entscheidung mehr.`,
    },
    {
      q: "Wie schnell sollte ich das durcharbeiten?",
      a: "Realistisch 3–6 Monate, wenn du 2–3 Stunden pro Tag investierst. Vollzeit-Sprint: 6–8 Wochen. Du hast lebenslangen Zugang, also kein Zeitdruck.",
    },
    {
      q: "Brauche ich Vorerfahrung?",
      a: "Nein. Das Paket ist explizit für Anfänger geschrieben. Wenn du E-Mails schreiben kannst und bereit bist, mit KI zu arbeiten, kannst du loslegen.",
    },
    {
      q: "Was kostet mich der Bau einer Webseite zusätzlich?",
      a: "~20 € einmalig (Claude Code Pro-Abo + eine Domain). Hosting auf Vercel ist kostenlos. Mehr Tool-Kosten kommen erst in Phase 4 dazu (Apify Free-Tier reicht für die ersten 100–200 Leads).",
    },
    {
      q: "Wie lange habe ich Zugang?",
      a: "Lebenslang. PDFs lädst du runter und sie gehören dir. Notion-Workspaces duplizierst du in deinen eigenen Account und sie gehören dir komplett — auch wenn ich morgen die Original-Workspaces lösche.",
    },
    {
      q: "Bekomme ich auch das 49-€-Strategiegespräch oder das kostenlose Skalierungs-Erstgespräch?",
      a: "Beide Termine kannst du jederzeit zusätzlich buchen — die sind nicht im Paket enthalten. Aber: ehrlich gesagt, wenn du das Paket durcharbeitest, brauchst du das 49-€-Strategiegespräch wahrscheinlich nicht. Das kostenlose Skalierungs-Gespräch macht erst Sinn, wenn du Phase 4 + 5 abgeschlossen hast und konkret skalieren willst.",
    },
  ],
  digistoreUrl: null,
};
