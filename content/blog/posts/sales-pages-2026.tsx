import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "sales-pages-laenge-2026",
  title: "Sales-Pages 2026: Die richtige Länge finden",
  highlight: "Sales-Page",
  excerpt:
    "Kurz oder lang? Beides ist falsch. Die richtige Länge einer Sales-Page hängt vom Produktpreis, der Komplexität und dem Vertrauensbedarf ab. So findest du deine.",
  description:
    "Sales-Pages 2026: Optimale Länge je nach Preis und Branche. Mit Beispielen für niedrigpreisige Produkte, B2B-Beratung und High-Ticket-Programme.",
  date: "2026-01-02",
  readingTime: "6 min",
  category: "Conversion",
  popularity: 65,
  cover: { from: "#1663de", to: "#0f4cb3", label: "Sales" },
  keywords: [
    "Sales Page",
    "Landingpage Länge",
    "Long Form Sales",
    "Short Form Sales",
    "Sales Letter",
    "High Ticket Sales",
  ],
  toc: [
    { id: "warum", label: "Warum die Länge entscheidet" },
    { id: "formel", label: "Die Länge-Formel" },
    { id: "kurz", label: "Wann kurz" },
    { id: "lang", label: "Wann lang" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Gibt es eine universelle Sales-Page-Länge?",
      a: "Nein. Die richtige Länge hängt von Preis, Risiko und Vertrauensbedarf ab. Niedrigpreisige Impulskäufe brauchen wenig, High-Ticket-Beratung viel.",
    },
    {
      q: "Welche Länge funktioniert für 5.000-EUR-Beratung?",
      a: "Lang. 2.000-4.000 Wörter mit klarer Struktur, Cases, FAQ, Garantie. Wer 5k investiert, will alle Einwände vorab geklärt haben.",
    },
    {
      q: "Soll ich Video oben ergänzen?",
      a: "Bei High-Ticket: stark empfehlenswert. Video erhöht Conversion oft um 30-80 %. Bei Low-Ticket: unnötiger Aufwand.",
    },
    {
      q: "Wie schreibe ich eine Sales-Page, die lang aber lesbar ist?",
      a: "Mit klarer Struktur: H2-Abschnitte alle 200-300 Wörter, Listen, Highlights. Wer einen Block-of-Text liefert, verliert egal welche Länge.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Es gibt keine universelle Sales-Page-Länge. Die richtige Länge
        hängt von Preis, Komplexität und Vertrauensbedarf ab. So
        findest du deine.
      </p>

      <h2 id="warum">Warum die Länge entscheidet</h2>
      <p>
        Lange Sales-Pages funktionieren für High-Ticket, weil sie alle
        Einwände vorab beantworten. Kurze Pages funktionieren für
        Low-Ticket, weil Käufer hier schneller entscheiden.
      </p>
      <p>
        Wer 50-EUR-Produkte mit 4.000-Wort-Sales-Page verkauft,
        verschreckt Käufer. Wer 5.000-EUR-Beratung mit 500-Wort-Page
        verkauft, weckt Misstrauen.
      </p>

      <h2 id="formel">Die Länge-Formel</h2>
      <p>
        Pragmatische Faustregel:
      </p>
      <ul>
        <li>Bis 100 EUR: 400-800 Wörter</li>
        <li>100-1.000 EUR: 800-1.500 Wörter</li>
        <li>1.000-5.000 EUR: 1.500-3.000 Wörter</li>
        <li>5.000-20.000 EUR: 3.000-5.000 Wörter plus Video</li>
        <li>Enterprise/Custom: separate Sales-Calls statt Sales-Page</li>
      </ul>

      <h2 id="kurz">Wann kurz</h2>
      <ul>
        <li>Impulskäufe (Konsumprodukte, niedrige Preise)</li>
        <li>Etablierte Marken mit bestehender Awareness</li>
        <li>Standardisierte Services mit klaren Vergleichsmaßstäben</li>
      </ul>

      <h2 id="lang">Wann lang</h2>
      <ul>
        <li>High-Ticket-Beratung und -Programme</li>
        <li>Komplexe Produkte mit Erklärungsbedarf</li>
        <li>Unbekannte Marken, die Vertrauen aufbauen müssen</li>
        <li>Investitionsgüter und langfristige Commitments</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Länge ist kein Selbstzweck. Wer den Vertrauensbedarf seiner
        Zielgruppe versteht, schreibt automatisch die richtige Länge.
        Bei Unsicherheit: A/B-Test mit kurz und lang fahren — die Daten
        zeigen, was funktioniert.
      </p>
    </>
  );
}
