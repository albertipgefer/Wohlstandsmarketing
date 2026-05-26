import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "webseite-erstellen-lassen-mittelstand",
  title: "Webseite erstellen lassen: Was Mittelstand 2026 beachten muss",
  highlight: "erstellen lassen",
  excerpt:
    "Wer 2026 eine Webseite erstellen lassen will, hat 100+ Anbieter zur Auswahl — und keine Orientierung. Der pragmatische Leitfaden für Mittelstand mit klarem Auswahl-Prozess.",
  description:
    "Webseite erstellen lassen 2026: Anbieter-Auswahl, Kosten, Vertrag — der pragmatische Leitfaden für deutschen Mittelstand mit Conversion-Fokus.",
  date: "2026-05-26",
  readingTime: "8 min",
  category: "Webdesign",
  cover: { from: "#db6f16", to: "#a85011", label: "Mittelstand" },
  keywords: [
    "Webseite erstellen lassen",
    "Webdesign Mittelstand",
    "Webdesigner finden",
    "Webagentur auswählen",
    "Webseite beauftragen",
    "Webdesign Vertrag",
    "Webdesigner Auswahl",
  ],
  toc: [
    { id: "ausgangslage", label: "Ausgangslage 2026: Warum die Auswahl schwierig ist" },
    { id: "auswahl", label: "5 Kriterien für die richtige Anbieter-Auswahl" },
    { id: "vertrag", label: "Worauf im Vertrag zu achten ist" },
    { id: "ablauf", label: "Der ideale Ablauf: Von Briefing bis Live" },
    { id: "fehler", label: "Die 5 häufigsten Fehler beim Beauftragen" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wo finde ich seriöse Webdesigner?",
      a: "Drei Quellen funktionieren 2026 am besten: 1) Google-Suche mit Stadt + 'Webdesign' und Bewertungen prüfen, 2) Empfehlungen aus deinem Branchen-Netzwerk, 3) ProvenExpert/OMR Reviews. Vermeide Listings-Portale, die Anbieter nach Provision sortieren.",
    },
    {
      q: "Wie lange dauert die Erstellung einer Webseite?",
      a: "Eine Landingpage 5–7 Tage, eine Unternehmenswebseite 10–14 Tage, ein Komplett-Relaunch 14–21 Tage. Wer mehr als 6 Wochen veranschlagt, hat unklare Prozesse.",
    },
    {
      q: "Brauche ich vorher ein Briefing?",
      a: "Ja. Ein gutes Briefing umfasst: Zielgruppe (ICP), 3 Hauptbotschaften, Conversion-Ziel, Marken-Look, 3 Referenz-Webseiten die dir gefallen. Ohne Briefing baut der Designer im Blindflug.",
    },
    {
      q: "Sollte ich eine lokale oder Online-Agentur nehmen?",
      a: "Online-Anbieter sind 2026 meist günstiger, schneller und genauso professionell. Lokale Agenturen lohnen sich nur, wenn du mehrere persönliche Vor-Ort-Termine brauchst. Für 90 % aller Mittelstand-Webseiten reicht eine Online-Zusammenarbeit.",
    },
    {
      q: "Was kostet das Hosting?",
      a: "Bei modernen Anbietern (Vercel, Netlify, Cloudflare) für kleine bis mittlere Mittelstand-Seiten oft unter 20 €/Monat, häufig sogar 0 €. WordPress-Hosting kostet 5–30 €/Monat. Wer dir 100 €/Monat fürs Hosting verkauft, schlägt auf.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Eine Webseite erstellen zu lassen klingt einfach — bis du auf
        Google nach „Webdesigner" suchst und mit 1.200 Treffern erschlagen
        wirst. Hier ist der pragmatische Leitfaden für deutschen Mittelstand:
        Wie du in 90 Minuten den richtigen Anbieter findest und das Projekt
        nicht aus dem Ruder läuft.
      </p>

      <h2 id="ausgangslage">Ausgangslage 2026: Warum die Auswahl schwierig ist</h2>
      <p>
        Drei Entwicklungen machen 2026 die Anbieter-Auswahl komplizierter
        als noch 2020:
      </p>
      <ul>
        <li>
          <strong>Markt-Sättigung:</strong> Über 100.000 Webdesigner in DACH —
          vom Studenten bis zur 50-Mann-Agentur. Spreu vom Weizen zu trennen
          braucht klare Kriterien.
        </li>
        <li>
          <strong>KI-Tools verschleiern Qualität:</strong> Jeder kann mit
          ChatGPT + Webflow in 4 Stunden eine Seite zusammenklicken. Ob sie
          konvertiert, ist eine andere Frage.
        </li>
        <li>
          <strong>SEO + KI-Sichtbarkeit:</strong> Eine 2026-Webseite muss
          nicht nur in Google ranken, sondern auch in ChatGPT, Perplexity und
          Claude. Nicht jeder Anbieter weiß, wie das geht.
        </li>
      </ul>

      <h2 id="auswahl">5 Kriterien für die richtige Anbieter-Auswahl</h2>
      <ol>
        <li>
          <strong>Echte Referenzen, nicht nur Mockups.</strong> Frag nach
          3 live laufenden Webseiten aus deiner Branche oder einer
          vergleichbaren. Schau dir Performance + Mobile-Optimierung selbst an.
        </li>
        <li>
          <strong>Conversion-Verständnis.</strong> Der Anbieter sollte nicht
          fragen „Was soll alles drauf?", sondern „Welche Aktion soll der
          Besucher ausführen?".
        </li>
        <li>
          <strong>SEO + KI-Sichtbarkeit im Angebot.</strong> Schema.org,
          llms.txt, sauberes Title/Meta-Setup — wer das nicht erwähnt, baut
          für 2020.
        </li>
        <li>
          <strong>Klarer Liefer-Prozess.</strong> Briefing → Konzept →
          Design → Entwicklung → Test → Live. Wer das nicht erklären kann,
          arbeitet chaotisch.
        </li>
        <li>
          <strong>Wartung + Folgekosten transparent.</strong> Wer nach dem
          Launch verschwindet, lässt dich mit kaputter Seite zurück.
        </li>
      </ol>

      <h2 id="vertrag">Worauf im Vertrag zu achten ist</h2>
      <p>
        Drei Klauseln, die in jedem Webdesign-Vertrag stehen müssen:
      </p>
      <ul>
        <li>
          <strong>Liefer-Definition:</strong> Genaue Anzahl Seiten, Funktionen,
          Inhalte. „Komplette Webseite" reicht nicht — wie viele Unterseiten?
        </li>
        <li>
          <strong>Eigentumsübertragung:</strong> Designs, Code und Texte
          gehen nach Bezahlung in dein Eigentum über. Sonst bist du an den
          Anbieter gebunden.
        </li>
        <li>
          <strong>Revisions-Runden:</strong> Mindestens 2 Korrekturschleifen
          inklusive. Sonst eskalieren die Zusatzkosten.
        </li>
      </ul>

      <h2 id="ablauf">Der ideale Ablauf: Von Briefing bis Live</h2>
      <ol>
        <li><strong>Tag 1–2:</strong> Kick-Off + Briefing (ICP, Ziel, Botschaften)</li>
        <li><strong>Tag 3–4:</strong> Konzept + Wireframe-Freigabe</li>
        <li><strong>Tag 5–8:</strong> Design + Inhalte</li>
        <li><strong>Tag 9–11:</strong> Entwicklung + Performance-Optimierung</li>
        <li><strong>Tag 12–13:</strong> Tests (Mobile, SEO, Schema, Speed)</li>
        <li><strong>Tag 14:</strong> Go-Live + Übergabe</li>
      </ol>

      <h2 id="fehler">Die 5 häufigsten Fehler beim Beauftragen</h2>
      <ol>
        <li><strong>Kein klares Conversion-Ziel</strong> — die Seite wird hübsch, aber bringt keine Anfragen.</li>
        <li><strong>Auf den günstigsten Anbieter setzen</strong> — du sparst 1.500 €, verlierst 12.000 € in entgangenen Leads.</li>
        <li><strong>SEO als Add-On verstehen</strong> — SEO muss von Anfang an mitgedacht werden, nicht im Nachgang aufgepfropft.</li>
        <li><strong>Keine Wartung einplanen</strong> — nach 18 Monaten ist die Seite kaputt oder ein Sicherheitsrisiko.</li>
        <li><strong>Inhalte erst nach Design liefern</strong> — Verzögerungen sind vorprogrammiert.</li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Eine Webseite erstellen zu lassen ist 2026 kein Risiko mehr —
        wenn du die richtigen Fragen stellst. Such nicht den günstigsten
        Anbieter, sondern den mit klarem Conversion-Verständnis, sauberem
        SEO-Fundament und transparenten Folgekosten.
      </p>
      <p>
        Investiere 90 Minuten in die Auswahl. Es ist die Stunde, die dich
        in den nächsten 5 Jahren am meisten ROI bringt.
      </p>
    </>
  );
}
