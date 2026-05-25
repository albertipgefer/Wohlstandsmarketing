import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "multilingual-webdesign-2026",
  title: "Multilingual Webdesign 2026: Sprachversionen richtig bauen",
  highlight: "Multilingual",
  excerpt:
    "Mehrere Sprachversionen sind ein SEO- und UX-Hebel — wenn richtig gebaut. Hier ist die Architektur, die 2026 für DACH+ international wirklich funktioniert.",
  description:
    "Multilingual Webdesign 2026: Architektur, hreflang, Übersetzungs-Workflow für DACH und international. Mit konkreten Empfehlungen.",
  date: "2026-01-14",
  readingTime: "6 min",
  category: "Webdesign",
  popularity: 45,
  cover: { from: "#0f4cb3", to: "#1663de", label: "Multi-Lang" },
  keywords: [
    "Multilingual Webdesign",
    "Mehrsprachige Webseite",
    "Internationale Webseite",
    "Sprachversionen SEO",
    "hreflang",
    "Übersetzungs Workflow",
  ],
  toc: [
    { id: "warum", label: "Wann lohnt sich Multilingual?" },
    { id: "architektur", label: "URL-Architektur-Optionen" },
    { id: "uebersetzung", label: "Übersetzung vs Lokalisierung" },
    { id: "tooling", label: "Tools und Workflow" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Subfolder, Subdomain oder eigene TLD?",
      a: "Subfolder (/en/, /fr/) ist meist die beste Wahl. Vererbt Domain-Authority, einfach zu pflegen. Eigene TLDs nur bei sehr starkem Lokalisierungs-Anspruch (.fr, .it). Subdomains nur wenn organisatorisch nötig.",
    },
    {
      q: "Reicht maschinelle Übersetzung?",
      a: "Für SEO und Conversion: nein. Maschinelle Übersetzung als Erstentwurf okay, aber muss von Native-Speakern überarbeitet werden. Sonst wirken Texte unnatürlich und Conversion bricht ein.",
    },
    {
      q: "Brauche ich alle Inhalte in allen Sprachen?",
      a: "Nein. Sinnvoller: zentrale Inhalte (Service-Seiten, About) immer übersetzen, Blog-Artikel selektiv basierend auf Markt-Relevanz. Übersetzung ist teuer — Fokus zahlt sich aus.",
    },
    {
      q: "Wie messe ich Multilingual-Erfolg?",
      a: "Pro Sprache eigene Search Console Property, eigene Analytics Property. Wichtigste Metrik: organischer Traffic pro Sprache, Conversion pro Sprache. Wer die Daten nicht trennt, sieht keine Probleme.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Multilingual ist ein massiver Hebel — wenn richtig gebaut. Wer
        einfach übersetzt und veröffentlicht, verschenkt 70 % des
        Potenzials. Hier ist die Architektur, die wirklich funktioniert.
      </p>

      <h2 id="warum">Wann lohnt sich Multilingual?</h2>
      <ul>
        <li>Internationale Zielgruppe (B2B, E-Commerce, Tourismus)</li>
        <li>DACH-Anbieter mit relevantem CH/AT-Markt</li>
        <li>Premium-Brands mit globalem Anspruch</li>
        <li>Nicht für rein lokal-fokussierte Mittelständler</li>
      </ul>

      <h2 id="architektur">URL-Architektur-Optionen</h2>
      <ul>
        <li><strong>Subfolder</strong> (/en/, /fr/): empfohlen für die meisten Fälle</li>
        <li><strong>Subdomain</strong> (en.example.com): bei stark separaten Inhalten</li>
        <li><strong>Eigene TLD</strong> (example.fr): bei starker lokaler Marken-Strategie</li>
      </ul>
      <p>
        Pro Variante mit hreflang sauber verbinden — damit Google jede
        Version dem richtigen Land zuordnen kann.
      </p>

      <h2 id="uebersetzung">Übersetzung vs Lokalisierung</h2>
      <p>
        Übersetzung = Worte ersetzen. Lokalisierung = Inhalte an
        Kultur, Markt, Zielgruppe anpassen. Für Mittelstand reichen
        oft saubere Übersetzungen mit lokalem Kontext (Preise in
        Lokalwährung, Telefonvorwahlen, Datum-Formate).
      </p>

      <h2 id="tooling">Tools und Workflow</h2>
      <ul>
        <li><strong>DeepL</strong> für Erstübersetzung (Premium-Plan)</li>
        <li><strong>Lokalize</strong> oder <strong>Crowdin</strong> als Translation-Management</li>
        <li><strong>i18n-Bibliotheken</strong> im Code (next-intl für Next.js)</li>
        <li><strong>Native-Speaker-Review</strong> Pflicht vor Live-Gang</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Multilingual ist 2026 keine technische Spielerei mehr —
        sondern strategische Entscheidung. Wer es richtig macht (saubere
        URL-Architektur, hreflang, Native-Speaker-Übersetzung),
        gewinnt mehrere Märkte parallel. Wer es falsch macht, hat nur
        mehr Wartungsaufwand.
      </p>
    </>
  );
}
