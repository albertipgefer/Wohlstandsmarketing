import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "webseite-fuer-hotels",
  title: "Webseite für Hotels: Direktbuchungen statt Portal-Provision",
  highlight: "Hotels",
  excerpt:
    "Jede Buchung über ein Portal kostet bis zu 20 % Provision. Wie eine Hotel-Webseite Gäste zur Direktbuchung bewegt, die Marge sichert und in Google sowie ChatGPT als erste Wahl der Region erscheint.",
  description:
    "Webseite für Hotels & Gastgewerbe 2026: mehr Direktbuchungen ohne Portal-Provision, lokal & in der KI gefunden werden, Atmosphäre vermitteln. Praxis-Leitfaden.",
  date: "2026-06-02",
  readingTime: "7 min",
  category: "Conversion",
  cover: { from: "#1663de", to: "#0f4cb3", label: "Hotels" },
  keywords: [
    "Webseite für Hotel",
    "Direktbuchung Hotel",
    "Hotel Homepage",
    "Hotel Marketing",
    "Booking Provision sparen",
    "Webdesign Gastgewerbe",
    "lokales SEO Hotel",
  ],
  toc: [
    { id: "provision", label: "Was Portal-Provisionen wirklich kosten" },
    { id: "direktbuchung", label: "Warum Gäste trotzdem beim Portal buchen" },
    { id: "elemente", label: "6 Elemente einer buchungsstarken Hotel-Webseite" },
    { id: "lokal", label: "Lokal & in der KI gefunden werden" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wie helfen mir Direktbuchungen gegenüber Booking.com & Co.?",
      a: "Portale kosten bis zu 20 % Provision pro Buchung und geben dir kaum Zugang zum Gast. Jede Direktbuchung über deine Webseite spart diese Provision und schenkt dir die Kundenbeziehung — für Wiederholungsbuchungen und Empfehlungen.",
    },
    {
      q: "Kann ein Buchungssystem eingebunden werden?",
      a: "Ja. Dein bestehendes Buchungssystem oder eine passende Lösung lässt sich DSGVO-konform einbinden — so, dass die Buchung in wenigen Schritten klappt und Gäste nicht zum Portal abwandern.",
    },
    {
      q: "Werde ich bei 'Hotel [Stadt]' gefunden?",
      a: "Mit lokalem SEO, optimiertem Google-Business-Profil und Schema-Markup: ja. Zunehmend wichtig ist KI-Sichtbarkeit — Gäste fragen ChatGPT nach einer passenden Unterkunft in der Region.",
    },
    {
      q: "Lohnt sich das auch für Restaurant, Pension oder Ferienwohnung?",
      a: "Ja. Auch im kleinen Gastgewerbe entscheidet der erste Online-Eindruck: Atmosphäre, Verfügbarkeit, einfache Anfrage. Eine schnelle, gut auffindbare Seite bringt mehr Direktanfragen und entlastet das Telefon.",
    },
    {
      q: "Was kostet eine Hotel-Webseite?",
      a: "Eine professionelle Hotel-Webseite liegt einmalig meist zwischen 4.000 und 9.000 €. Schon wenige zusätzliche Direktbuchungen pro Monat amortisieren die Investition über die gesparte Provision.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Buchungsportale bringen Gäste — aber sie nehmen dafür hohe Provisionen
        und den direkten Draht zum Gast. Eine starke eigene Webseite mit
        einfacher Buchungsmöglichkeit dreht das um: Gäste buchen direkt bei dir,
        du behältst Marge und Kundenbeziehung. Voraussetzung ist ein Auftritt,
        der schnell lädt, Vertrauen schafft und gefunden wird.
      </p>

      <h2 id="provision">Was Portal-Provisionen wirklich kosten</h2>
      <p>
        15–20 % pro Buchung klingt nach wenig — bis man rechnet. Bei 200.000 €
        Übernachtungsumsatz über Portale sind das schnell 30.000–40.000 € im
        Jahr, die direkt von der Marge abgehen. Eine eigene Webseite, die nur
        einen Teil dieser Buchungen auf den Direktweg holt, ist in Monaten
        amortisiert.
      </p>

      <h2 id="direktbuchung">Warum Gäste trotzdem beim Portal buchen</h2>
      <p>
        Gäste buchen beim Portal, weil es einfach und vertrauenswürdig wirkt —
        nicht aus Treue. Die eigene Webseite muss diese beiden Punkte schlagen:
      </p>
      <ul>
        <li>Buchung in wenigen Schritten, ohne Medienbruch</li>
        <li>Sichtbare Vorteile der Direktbuchung (bester Preis, Extras)</li>
        <li>Vertrauenssignale: Bewertungen, echte Fotos, klare Stornobedingungen</li>
        <li>Schnelle, mobile Ladezeit — die meisten buchen am Smartphone</li>
      </ul>

      <h2 id="elemente">6 Elemente einer buchungsstarken Hotel-Webseite</h2>
      <ol>
        <li><strong>Buchungs-CTA über der Falz</strong> — sofort sichtbar, auf jeder Seite.</li>
        <li><strong>Beste-Preis-Versprechen</strong> für die Direktbuchung.</li>
        <li><strong>Hochwertige Bildwelt</strong> — Atmosphäre verkauft die Übernachtung.</li>
        <li><strong>Echte Bewertungen</strong> eingebunden, nicht versteckt.</li>
        <li><strong>Klare Infos</strong> zu Lage, Anreise, Ausstattung, Stornierung.</li>
        <li><strong>Schnelles, mobiles Buchungssystem</strong> ohne Hürden.</li>
      </ol>

      <h2 id="lokal">Lokal &amp; in der KI gefunden werden</h2>
      <p>
        „Hotel [Stadt]", „Übernachtung in der Nähe" — diese Suchen entscheiden
        über Auslastung. Mit lokalem SEO, optimiertem Google-Business-Profil
        und sauberem Schema stehst du oben. Und Gäste fragen zunehmend ChatGPT
        oder Perplexity nach einer Unterkunft — wer mit zitierfähigen Inhalten
        und lokalem Entity-Profil aufgestellt ist, wird empfohlen.
      </p>
      <p>
        Wie wir Webseite, Buchungs-Funnel und Sichtbarkeit für Beherbergung
        verbinden, zeigt unsere Seite zu{" "}
        <a href="/branchen/hotel">Webseiten für Hotels &amp; Gastgewerbe</a>.
      </p>

      <h2 id="fazit">Fazit</h2>
      <p>
        Eine Hotel-Webseite hat ein klares wirtschaftliches Ziel: Buchungen vom
        teuren Portal auf den eigenen Direktweg holen. Wer die Buchung einfach
        macht, Vertrauen schafft und lokal sowie in der KI gefunden wird, spart
        Provision <em>und</em> gewinnt die Gästebeziehung zurück.
      </p>
    </>
  );
}
