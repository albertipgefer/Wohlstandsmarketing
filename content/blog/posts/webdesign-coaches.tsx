import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "webdesign-coaches-personal-brand-2026",
  title: "Webdesign für Coaches: Personal Brand sichtbar machen",
  highlight: "Personal Brand",
  excerpt:
    "Coaches verkaufen ihre Person. Eine Webseite, die das nicht widerspiegelt, ist eine verschenkte Chance. So baust du Personal-Brand-Webdesign.",
  description:
    "Webdesign für Coaches und Personal Brands 2026: 7 Elemente für sichtbare Persönlichkeit, Authority und Conversion.",
  date: "2026-01-17",
  readingTime: "6 min",
  category: "Webdesign",
  popularity: 60,
  cover: { from: "#0f4cb3", to: "#1663de", label: "Brand" },
  keywords: [
    "Webdesign Coach",
    "Personal Brand Webseite",
    "Coach Marketing",
    "Coaching Webseite",
    "Mentor Webseite",
    "Expertise sichtbar",
  ],
  toc: [
    { id: "warum", label: "Warum Personal-Brand-Webseiten anders sind" },
    { id: "elemente", label: "Die 7 Pflicht-Elemente" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich für Personal Branding einen Blog?",
      a: "Sehr empfehlenswert. Blog ist das stärkste Tool, um Expertise sichtbar zu machen — über SEO, Social-Sharing und KI-Empfehlungen. Mindestens 1-2 Artikel pro Monat aufbauen.",
    },
    {
      q: "Soll mein Foto im Hero sein?",
      a: "Ja. Personal Brand ohne sichtbares Gesicht funktioniert selten. Idealerweise ein authentisches Foto in passendem Setting — kein Standard-Bewerbungsfoto.",
    },
    {
      q: "Wie wichtig sind Video-Inhalte?",
      a: "Massiv. Coaches sind Verkäufer ihrer Persönlichkeit — Video überträgt das am stärksten. Ein Hero-Video oder eingebettetes Vorstell-Video erhöht Conversion oft deutlich.",
    },
    {
      q: "Soll ich Preise nennen?",
      a: "Bei Coaching meist nein. Coaching-Investments sind individuell — Preisansage suggeriert Vergleichbarkeit, was das Premium-Positioning untergräbt. Stattdessen: Investitions-Rahmen oder Erstgespräch.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Coaches verkaufen ihre Person. Eine Webseite, die das nicht
        widerspiegelt, ist eine verschenkte Chance. Hier sind die 7
        Elemente, die für Personal Brands wirklich funktionieren.
      </p>

      <h2 id="warum">Warum Personal-Brand-Webseiten anders sind</h2>
      <ul>
        <li>Du verkaufst dich, nicht ein Produkt</li>
        <li>Vertrauen entsteht über Persönlichkeit, nicht über Logos</li>
        <li>Inhalte (Blog, Video, Newsletter) sind dein Marketing-Kanal</li>
        <li>Premium-Positionierung verlangt Premium-Optik</li>
      </ul>

      <h2 id="elemente">Die 7 Pflicht-Elemente</h2>

      <h3>1. Großes authentisches Foto</h3>
      <p>
        Im Hero, in jeder Sektion. Echte Fotos in passendem Setting —
        Speaking-Auftritt, Outdoor, persönliches Büro.
      </p>

      <h3>2. Klare Positionierung</h3>
      <p>
        In einem Satz: für wen, welches Ergebnis, welche Methode. Keine
        Floskeln wie „ganzheitliches Coaching für alle". Konkret.
      </p>

      <h3>3. Über-mich mit echter Story</h3>
      <p>
        Persönlicher Werdegang, eigene Transformation, was dich
        antreibt. Menschen kaufen Geschichten, nicht Lebensläufe.
      </p>

      <h3>4. Eigener Blog mit Expertise</h3>
      <p>
        Regelmäßiger Content zu deinen Kernthemen. Beweist Expertise,
        bringt SEO-Traffic, baut Personal-Brand-Suchvolumen auf.
      </p>

      <h3>5. Video prominent</h3>
      <p>
        Hero-Video oder eingebettetes Vorstell-Video. Video überträgt
        Persönlichkeit stärker als jedes Foto.
      </p>

      <h3>6. Klare CTA-Hierarchie</h3>
      <p>
        Ein Haupt-CTA (Erstgespräch oder Kurs-Buchung). Klar
        priorisiert, mehrfach auf der Seite.
      </p>

      <h3>7. Echte Kundenstimmen</h3>
      <p>
        Mit Foto, Name, idealerweise Video-Testimonials. Personal
        Brands brauchen Personal-Trust-Signale — anonyme Bewertungen
        wirken hier besonders schwach.
      </p>

      <h2 id="fazit">Fazit</h2>
      <p>
        Personal-Brand-Webdesign 2026 ist die Kunst, Persönlichkeit
        sichtbar zu machen — ohne unprofessionell zu wirken. Wer die
        Balance findet, baut eine Webseite, die Kunden anzieht, weil
        sie zur Person passt.
      </p>
    </>
  );
}
