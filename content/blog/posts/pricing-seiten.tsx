import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "pricing-seiten-2026",
  title: "Pricing-Seiten 2026: Wie du Preise klug präsentierst",
  highlight: "Pricing",
  excerpt:
    "Pricing-Seiten entscheiden über Conversion und positionierung. 2026 sind 3 Prinzipien wirksamer als alle Pricing-Tricks zusammen.",
  description:
    "Pricing-Seiten 2026: 6 Hebel für conversionsstarke Preisseiten. Tiered Pricing, Anker-Effekte, Preispsychologie für B2B und SaaS.",
  date: "2026-01-08",
  readingTime: "6 min",
  category: "Conversion",
  popularity: 70,
  cover: { from: "#1663de", to: "#0f4cb3", label: "Pricing" },
  keywords: [
    "Pricing Seite",
    "Preisstrategie",
    "Tiered Pricing",
    "Preispsychologie",
    "B2B Pricing",
    "SaaS Pricing",
  ],
  toc: [
    { id: "warum", label: "Warum Pricing-Seiten Conversion machen" },
    { id: "hebel", label: "Die 6 Hebel" },
    { id: "preis-nicht-nennen", label: "Wann du keinen Preis nennen solltest" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Soll ich überhaupt Preise online zeigen?",
      a: "Bei Produkten und standardisierten Services: ja. Bei individueller Beratung mit großer Preisspanne: nein. Preisnennung schafft Vergleichbarkeit, was bei Premium-Positionierung schadet.",
    },
    {
      q: "Drei oder vier Pakete?",
      a: "Drei ist klassisch und funktioniert gut. Vier verwirrt schon. Bei drei Paketen wählt die Mehrheit das mittlere — bewusst als Anker designed.",
    },
    {
      q: "Sollte ich Jährlich oder Monatlich als Default zeigen?",
      a: "Jährlich mit Rabatt — schafft höheren AOV. Plus Toggle zu Monatlich für Kunden, die kürzeres Commitment wollen.",
    },
    {
      q: "Wo gehören Pricing-FAQ hin?",
      a: "Direkt unter die Tarife, vor dem Footer. Die häufigsten Einwände (Vertragslaufzeit, Kündigung, was ist inkludiert) präemptiv beantworten.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Pricing-Seiten entscheiden über Conversion und Positionierung —
        oft mehr als jede andere Seite. Hier sind die 6 Hebel, die 2026
        wirklich Umsatz machen.
      </p>

      <h2 id="warum">Warum Pricing-Seiten Conversion machen</h2>
      <ul>
        <li>Kaufentscheidungen werden hier final</li>
        <li>Kleine Änderungen haben große AOV-Wirkung</li>
        <li>Klare Pricing-Seiten schaffen Vertrauen</li>
      </ul>

      <h2 id="hebel">Die 6 Hebel</h2>

      <h3>1. Drei Pakete mit Anker-Effekt</h3>
      <p>
        Drei Tarife: Starter, Pro, Enterprise. Pro ist
        Standard-Empfehlung, visuell hervorgehoben.
      </p>

      <h3>2. Pro-Tarif visuell heben</h3>
      <p>
        Farbe, Border, Badge „Beliebteste Wahl" — das mittlere Paket
        bekommt 60-70 % der Conversions.
      </p>

      <h3>3. Jahresrabatt sichtbar</h3>
      <p>
        „Spare 20 % bei Jahreszahlung" — Toggle zwischen monatlich und
        jährlich. Jährlich erhöht AOV deutlich.
      </p>

      <h3>4. Features pro Paket klar</h3>
      <p>
        Vergleichstabelle mit allen Features, häkchen-basiert. Was ist
        inkludiert, was nicht.
      </p>

      <h3>5. Trust-Signale neben dem Preis</h3>
      <p>
        „14 Tage Geld zurück", „Keine Kreditkarte nötig", „Jederzeit
        kündbar" — reduzieren Friction.
      </p>

      <h3>6. FAQ unter den Tarifen</h3>
      <p>
        Die häufigsten Einwände direkt beantworten. Vertragslaufzeit,
        Kündigung, Daten-Migration.
      </p>

      <h2 id="preis-nicht-nennen">Wann du keinen Preis nennen solltest</h2>
      <ul>
        <li>Premium-Beratung mit individuellem Angebot</li>
        <li>Enterprise-Verkäufe (Custom-Pricing als Standard)</li>
        <li>Stark individualisierte Projekte (Webdesign, Bau)</li>
      </ul>
      <p>
        Stattdessen: Investitions-Rahmen oder Hinweis auf
        Erstgespräch. Wichtig: Erklärung, warum kein Preis genannt
        wird.
      </p>

      <h2 id="fazit">Fazit</h2>
      <p>
        Pricing-Seiten sind 2026 mehr Psychologie als Mathematik. Drei
        klar strukturierte Pakete mit klarem Anker, Jährlich-Rabatt
        und Trust-Signalen schlagen jede komplizierte Pricing-Tabelle.
      </p>
    </>
  );
}
