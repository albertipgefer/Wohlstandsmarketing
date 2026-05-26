import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "webdesigner-fuer-caterer",
  title: "Webdesigner für Catering-Unternehmen: Was 2026 Aufträge bringt",
  highlight: "Catering",
  excerpt:
    "Catering-Kunden buchen mit dem Bauchgefühl. Welche Webseite Hochzeits-, Firmen- und Event-Caterer 2026 wirklich brauchen — und woran du am Anbieter siehst, ob er die Branche kennt.",
  description:
    "Webdesigner für Catering 2026: Auswahl, Kosten, Conversion-Hebel. Für Hochzeitscatering, Firmencatering, Event-Caterer und Foodtrucks.",
  date: "2026-05-26",
  readingTime: "7 min",
  category: "Webdesign",
  cover: { from: "#1663de", to: "#0f4cb3", label: "Catering" },
  keywords: [
    "Webdesigner Catering",
    "Catering Webseite",
    "Catering Marketing",
    "Webseite für Catering-Unternehmen",
    "Hochzeitscatering Webseite",
    "Firmencatering online",
    "Caterer Webdesign",
  ],
  toc: [
    { id: "warum-anders", label: "Warum Catering-Webseiten anders konvertieren" },
    { id: "elemente", label: "Pflicht-Elemente 2026" },
    { id: "kosten", label: "Was es kostet" },
    { id: "lokal", label: "Lokales SEO + KI-Sichtbarkeit" },
    { id: "fehler", label: "Die 5 häufigsten Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich als Caterer eine professionelle Webseite?",
      a: "Ja. 75 % aller Catering-Anfragen 2026 entscheiden über die Webseite, ob es überhaupt zum Telefonat kommt. Wer hier nicht überzeugt (Fotos der Speisen, klare Preisranges, Anfrage-Formular), verliert vor dem ersten Kontakt.",
    },
    {
      q: "Was kostet eine Catering-Webseite?",
      a: "Realistisch: 1.500–3.000 € für solides Mittelstands-Catering. Bei Hochzeitscatering mit Premium-Anspruch eher 2.500–4.500 €. Plus Fotografie-Investition (1.000–2.500 €) — eigene Food-Fotos sind nicht optional.",
    },
    {
      q: "Lohnt sich ein Online-Bestellsystem?",
      a: "Bei Firmen-Lunch-Catering: Ja, klare Ja. Bei Event-Catering: Nein — hier braucht es individuelle Angebote. Lieber ein gutes Anfrage-Formular als ein schlechtes Bestell-System.",
    },
    {
      q: "Brauche ich Speisekarten als PDF auf der Webseite?",
      a: "Klares Nein. PDF-Speisekarten sind 2026 SEO-Tot, lädt schlecht auf Mobile und können nicht von KI-Crawlern gelesen werden. Lieber HTML-Speisekarten mit Schema.org-Recipe-Markup — die kann ChatGPT zitieren.",
    },
    {
      q: "Wie wichtig sind professionelle Food-Fotos?",
      a: "Extrem wichtig. Catering ist visuelles Marketing pur. Smartphone-Fotos wirken amateurhaft und reduzieren die Buchungsbereitschaft um 40 %+. Pro-Fotos kosten 1.000–2.500 € — beste Investition deines Jahres.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Ein Catering-Unternehmen verkauft Vertrauen — die Garantie, dass
        80 Hochzeitsgäste oder 200 Firmenleute zufrieden satt werden. Die
        Webseite ist dabei der Vor-Test: Wer hier nicht professionell
        wirkt, bekommt erst gar keine Anfrage. Hier ist, was 2026 zählt.
      </p>

      <h2 id="warum-anders">Warum Catering-Webseiten anders konvertieren</h2>
      <p>
        Drei Spezifika:
      </p>
      <ul>
        <li>
          <strong>Visuell vor textlich.</strong> Speisen verkaufen sich
          durch Bilder — nicht durch Beschreibungen. „Mediterrane Vorspeise"
          wirkt nichts. Ein professionelles Foto eines Antipasti-Tellers
          verkauft.
        </li>
        <li>
          <strong>Vertrauen vor Preis.</strong> Catering ist Vertrauenssache —
          niemand bucht 80 Hochzeitsgäste bei einem Anbieter ohne Bewertungen.
          Trust-Signale (Bewertungen, Cases, Referenzen) sind wichtiger als
          Preise.
        </li>
        <li>
          <strong>Multi-Anlass.</strong> Die meisten Caterer bedienen
          Hochzeit + Firmenevent + Privat + Foodtruck. Die Webseite muss
          klar trennen, ohne zu überladen.
        </li>
      </ul>

      <h2 id="elemente">Pflicht-Elemente 2026</h2>
      <ol>
        <li>
          <strong>Hero mit appetitlichem Food-Foto:</strong> Idealerweise
          Bewegtbild (Schnitt, Anrichten, Servieren).
        </li>
        <li>
          <strong>Anlass-Sektionen separat:</strong> Hochzeit, Firmenevent,
          Privat — jeder Anlass mit eigener Galerie + Use-Case-Beschreibung.
        </li>
        <li>
          <strong>Beispiel-Menüs:</strong> 3–5 Beispiel-Menüs mit Bildern,
          Beschreibung, Preisrange pro Person.
        </li>
        <li>
          <strong>Klare Preisorientierung:</strong> „ab 35 € pro Person"
          reicht für Range. Detail-Preise kommen im Angebot.
        </li>
        <li>
          <strong>Trust-Sektion:</strong> Mindestens 8 echte Bewertungen,
          idealerweise mit Anlass + Datum + Personenanzahl.
        </li>
        <li>
          <strong>Anfrage-Formular:</strong> Name, Email, Telefon, Anlass,
          Datum, Personenanzahl — fertig. Keine 12 Pflichtfelder.
        </li>
      </ol>

      <h2 id="kosten">Was es kostet</h2>
      <ul>
        <li><strong>Standard Catering-Webseite:</strong> 1.500–2.500 €</li>
        <li><strong>Hochzeitscatering Premium (mit Multi-Anlass + Online-Buchung):</strong> 2.500–4.500 €</li>
        <li><strong>Catering-Kette (mehrere Standorte):</strong> 4.000–8.000 €</li>
        <li><strong>Pro-Food-Fotografie:</strong> 1.000–2.500 € einmalig</li>
        <li><strong>Wartung + saisonale Menü-Updates:</strong> 100–200 €/Monat</li>
      </ul>

      <h2 id="lokal">Lokales SEO + KI-Sichtbarkeit</h2>
      <p>
        85 % aller Catering-Anfragen sind lokal: „Catering Frankfurt",
        „Hochzeitscatering Köln". Zusätzlich gewinnen KI-Anfragen wie
        „Bestes Catering für 80 Gäste in [Region]" an Bedeutung.
      </p>
      <p>
        Was du brauchst:
      </p>
      <ul>
        <li>Google Business Profile mit 30+ Food-Fotos + Posts</li>
        <li>Schema.org LocalBusiness + Service-Markup</li>
        <li>Stadt-Landingpages für deine Hauptregionen</li>
        <li>20+ Google-Bewertungen (mit Foto der Veranstaltung idealerweise)</li>
        <li>llms.txt + robots.txt für KI-Crawler (GPTBot, ClaudeBot, PerplexityBot)</li>
        <li>FAQ-Cluster mit typischen Catering-Fragen</li>
      </ul>

      <h2 id="fehler">Die 5 häufigsten Fehler</h2>
      <ol>
        <li>
          <strong>Stockfotos statt eigener Food-Bilder.</strong> Sofort
          unprofessionell. Investier in 1 Foto-Shooting mit deinen Gerichten.
        </li>
        <li>
          <strong>PDF-Speisekarten.</strong> SEO-tot, mobil schlecht. Lieber
          HTML mit Schema.
        </li>
        <li>
          <strong>Keine Preisorientierung.</strong> „Auf Anfrage" verliert
          70 % der Interessenten. Lieber Range zeigen.
        </li>
        <li>
          <strong>Keine Trennung nach Anlass.</strong> Wer Hochzeit + Firma
          + Privat in einen Topf wirft, spricht niemanden gezielt an.
        </li>
        <li>
          <strong>Keine Bewertungen oder veraltete.</strong> 8+ aktuelle
          echte Bewertungen sind Pflicht. Stock-Testimonials sind Gift.
        </li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Eine Catering-Webseite ist 2026 ein visuelles Trust-Building-Tool.
        Wer mit Smartphone-Fotos und Standard-Templates antritt, verliert
        Aufträge an die Konkurrenz mit Pro-Setup.
      </p>
      <p>
        Investier 2.000–3.000 € in eine professionelle Webseite plus
        1.500–2.000 € in einmalige Food-Fotos. Bei einem durchschnittlichen
        Hochzeits-Catering-Auftrag von 4.000–8.000 € hast du die Investition
        mit dem ersten Auftrag mehr als zurück.
      </p>
    </>
  );
}
