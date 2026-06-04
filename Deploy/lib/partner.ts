/**
 * Partner-/Affiliate-Programm — zentrale Daten.
 *
 * Provision: einheitlich 50 % pro Verkauf (in CopeCart pro Produkt entsprechend
 * eingestellt halten, sonst weicht die Anzeige von der echten Auszahlung ab).
 *
 * Die Invite-Links sind CopeCart-Affiliate-Registrierungslinks. Der Parameter
 * `product_ids[]` ist ein Array → mehrere IDs in EINEM Link = Anmeldung für
 * alle Produkte mit einem Klick (siehe ALL_PRODUCTS_INVITE).
 */

export const VENDOR_ID = "621303";
export const COMMISSION_PCT = 50;

export type PartnerProduct = {
  id: string;
  name: string;
  tagline: string;
  price: number; // Brutto in €
  image: string;
  invite: string;
};

const invite = (id: string) =>
  `https://copecart.com/invite?cp=Wohlstandsmarketing&vendor_id=${VENDOR_ID}&product_ids[]=${id}&language=de`;

// Reihenfolge: Solopreneur-Betriebssystem (eigenständig) zuerst,
// danach die 5 Phasen der Treppe in logischer Reihenfolge (Phase 1 → 5).
// Namen + Bilder identisch zu CopeCart.
export const PARTNER_PRODUCTS: PartnerProduct[] = [
  {
    id: "384340",
    name: "Das Solopreneur-Betriebssystem für Claude Code",
    tagline: "50 Skills + 5 KI-Agenten — dein Business auf Autopilot.",
    price: 34,
    image: "/images/mockup-betriebssystem.png",
    invite: invite("384340"),
  },
  {
    id: "383873",
    name: "Dein Wohlstands-Guide 2026",
    tagline: "Phase 1 — Der Fahrplan vom Tagesjob in die ortsunabhängige Selbstständigkeit.",
    price: 5,
    image: "/images/mockup-phase-1.png",
    invite: invite("383873"),
  },
  {
    id: "383941",
    name: "Deine erste KI-Webseite in unter 7 Tagen",
    tagline: "Phase 2 — Eine fertige Kunden-Webseite mit KI bauen, ohne Code.",
    price: 19,
    image: "/images/mockup-phase-2.png",
    invite: invite("383941"),
  },
  {
    id: "383942",
    name: "So gewinnst du deine ersten 3 Testkunden in den nächsten 4 Wochen",
    tagline: "Phase 3 — Deine ersten 3 Referenzen in 4 Wochen.",
    price: 27,
    image: "/images/mockup-phase-3.png",
    invite: invite("383942"),
  },
  {
    id: "383944",
    name: "So gewinnst du deinen ersten 1.000-€-Kunden",
    tagline: "Phase 4 — Vom Testkunden zum ersten echten 1.000-€-Auftrag.",
    price: 49,
    image: "/images/mockup-phase-4.png",
    invite: invite("383944"),
  },
  {
    id: "383945",
    name: "Onboarding, Umsetzung & Delivery",
    tagline: "Phase 5 — Kunden sauber onboarden und liefern, ohne Chaos.",
    price: 97,
    image: "/images/mockup-phase-5.png",
    invite: invite("383945"),
  },
];

/** EIN Link für alle Produkte gleichzeitig (alle product_ids[] gebündelt). */
export const ALL_PRODUCTS_INVITE = `https://copecart.com/invite?cp=Wohlstandsmarketing&vendor_id=${VENDOR_ID}&${PARTNER_PRODUCTS.map(
  (p) => `product_ids[]=${p.id}`
).join("&")}&language=de`;

/** Verdienst pro Verkauf bei 50 % (ca., auf Basis Brutto-Preis). */
export const earningPerSale = (price: number) =>
  (price * COMMISSION_PCT) / 100;

/* ─────────────────── Affiliate-Material-Pack ─────────────────── */

export type SwipeText = {
  label: string;
  context: string;
  body: string;
};

export const SWIPE_TEXTS: SwipeText[] = [
  {
    label: "DM / Kurznachricht — Selbstständigkeit",
    context: "Für Stories, DMs oder kurze Posts an eine Gründer-/Side-Hustle-Zielgruppe.",
    body: `Kurzer Tipp, falls du raus aus dem Job willst: Albert Ipgefer (@journeywithalbert) hat genau den Weg dokumentiert, den er heute gehen würde, wenn er nochmal bei 0 starten müsste — vom ersten Schritt bis zum ersten zahlenden Kunden. Kein „passives Einkommen in 7 Tagen"-Geschwafel, sondern ein ehrlicher Fahrplan. Schon ab 5 € zum Reinschnuppern: [DEIN-LINK]`,
  },
  {
    label: "E-Mail / Newsletter — Die ganze Treppe",
    context: "Für einen Newsletter an Menschen, die mit dem eigenen Business anfangen wollen.",
    body: `Betreff: Der ehrlichste Plan vom Job zur Selbstständigkeit, den ich kenne

die meisten „Mach-dich-selbstständig"-Programme verkaufen dir einen Traum und lassen dich danach allein.

Albert Ipgefer macht es anders: Er hat seinen kompletten Weg in einzelne, aufeinander aufbauende Schritte zerlegt — von der ersten Idee über die erste KI-Webseite und die ersten 3 Testkunden bis zum ersten 1.000-€-Kunden.

Du musst nicht alles auf einmal kaufen. Du steigst da ein, wo du gerade stehst — und jeder Schritt ist einzeln machbar.

Schau es dir an, der Einstieg kostet weniger als ein Mittagessen: [DEIN-LINK]`,
  },
  {
    label: "Post — Solopreneur-Betriebssystem (KI-Tools)",
    context: "Für eine Tech-/KI-affine Zielgruppe, die mit Claude Code oder KI-Tools arbeitet.",
    body: `Wenn du als Solopreneur mit KI arbeitest, ist das hier ein Gamechanger: Das Solopreneur-Betriebssystem von Albert Ipgefer — 50 fertige Skills + 5 KI-Agenten für Claude Code, mit denen du Marketing, Sales und Delivery quasi auf Autopilot stellst. Einmal einrichten, dauerhaft nutzen. Für 34 € faktisch geschenkt: [DEIN-LINK]`,
  },
];

export const ANGLES: string[] = [
  "Ehrlichkeit statt Hype — „kein passives Einkommen in 7 Tagen“, sondern ein realistischer Plan.",
  "Niedrige Einstiegshürde — der Start kostet nur 5 €, kein Risiko für deine Community.",
  "Treppe statt Sprung — jeder Schritt ist einzeln machbar, niemand muss alles auf einmal kaufen.",
  "KI als Hebel — das Betriebssystem zeigt, wie man als Einzelperson mit KI arbeitet wie ein Team.",
  "Aus der Praxis — Albert dokumentiert seinen echten Weg, keine Theorie aus dem Lehrbuch.",
];

export const BENEFITS: string[] = [
  "50 % Provision auf jeden Verkauf — eine der höchsten Quoten im Markt.",
  "Automatisches Tracking über CopeCart — jeder Klick, jeder Sale wird sauber zugeordnet.",
  "Pünktliche Auszahlung über CopeCart — du musst nichts manuell nachrechnen.",
  "Produkte von 5 € bis 197 € — für jede Zielgruppe und jedes Budget etwas dabei.",
  "Kein Vertrag, kein Risiko — CopeCart regelt die Bedingungen, du meldest dich mit einem Klick an.",
];

export type PartnerFaq = { q: string; a: string };

export const PARTNER_FAQ: PartnerFaq[] = [
  {
    q: "Wie viel Provision bekomme ich?",
    a: "50 % auf jeden vermittelten Verkauf — über alle Produkte hinweg. CopeCart rechnet automatisch ab und zahlt pünktlich aus.",
  },
  {
    q: "Wie funktioniert das Tracking?",
    a: "Komplett automatisch über CopeCart. Sobald du dich angemeldet hast, bekommst du deinen persönlichen Link. Jeder Klick und jeder Sale darüber wird dir eindeutig zugeordnet — du musst nichts selbst tracken.",
  },
  {
    q: "Brauche ich einen Vertrag?",
    a: "Nein. CopeCart regelt die Geschäftsbedingungen automatisch. Du akzeptierst sie bei der Anmeldung — fertig.",
  },
  {
    q: "Muss ich mich für jedes Produkt einzeln anmelden?",
    a: "Nein. Über den Button „Alle Produkte auf einmal“ oben meldest du dich mit einem Klick für alle Produkte gleichzeitig an. Du kannst dich aber auch nur für einzelne Produkte registrieren, die zu deiner Zielgruppe passen.",
  },
  {
    q: "Was kostet mich die Teilnahme?",
    a: "Nichts. Keine Vorabkosten, keine Fixkosten. Du verdienst rein erfolgsbasiert pro Verkauf.",
  },
];
