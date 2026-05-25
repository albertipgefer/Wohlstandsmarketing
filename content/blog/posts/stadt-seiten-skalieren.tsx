import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "stadt-seiten-skalieren-2026",
  title: "Stadt-Seiten: Wie du 10 Städte gleichzeitig dominierst",
  highlight: "Stadt-Seiten",
  excerpt:
    "Eine eigene Landing-Page pro Stadt ist der schnellste Weg zu lokaler Sichtbarkeit in mehreren Regionen — wenn man die Stolperfallen vermeidet.",
  description:
    "Stadt-Seiten 2026: So skalierst du lokale Sichtbarkeit auf 10+ Städte ohne Duplicate-Content-Probleme. Mit Vorlage und Beispielen.",
  date: "2026-03-28",
  readingTime: "7 min",
  category: "Lokales SEO",
  cover: { from: "#0f4cb3", to: "#1663de", label: "Cities" },
  keywords: [
    "Stadt Landingpage",
    "lokales SEO Skalierung",
    "Multi City SEO",
    "Landing Page pro Stadt",
    "Local Landing Pages",
    "Duplicate Content vermeiden",
    "lokale Sichtbarkeit",
  ],
  toc: [
    { id: "warum", label: "Warum eigene Stadt-Seiten?" },
    { id: "struktur", label: "Die richtige Seiten-Struktur" },
    { id: "duplicate", label: "Duplicate Content vermeiden" },
    { id: "skalieren", label: "Wie du auf 10+ Städte skalierst" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich für jede Stadt eine eigene Seite?",
      a: "Ja, wenn du dort wirklich sichtbar sein willst. Eine generische ‚Wir sind im ganzen Rhein-Main-Gebiet aktiv‘-Seite rankt für keine einzelne Stadt vernünftig. Pro Stadt eine eigene optimierte Landing-Page bringt deutlich mehr Sichtbarkeit.",
    },
    {
      q: "Wie viele Wörter pro Stadt-Seite?",
      a: "Mindestens 600–800 Wörter mit echtem lokalem Bezug. Weniger riskiert Duplicate-Content-Bewertung. Mehr lohnt sich nur, wenn der zusätzliche Inhalt echten Mehrwert bringt — Stadt-spezifische Cases, Anfahrt, lokale FAQ.",
    },
    {
      q: "Reicht es, einfach die Stadt im Titel zu tauschen?",
      a: "Nein. Google erkennt Doorway-Pages und entwertet sie. Jede Stadt-Seite braucht echte Stadt-spezifische Elemente: Bezug zu lokalen Wahrzeichen, lokale Kundenstimmen, Verweise auf lokale Stadtteile oder Branchencluster.",
    },
    {
      q: "Soll ich URL-Struktur /webdesign-koblenz oder /koblenz/webdesign nutzen?",
      a: "Für Mittelstand mit überschaubarer Stadtanzahl ist /leistung-stadt einfacher zu pflegen. Bei vielen Städten und Leistungen lohnt sich /stadt/leistung. Wichtig: konsistente Logik, von Anfang an festgelegt.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Eine Stadt-Seite ist gut. Zehn Stadt-Seiten — sauber gebaut —
        sind ein echter Wettbewerbsvorteil. Hier ist die Anleitung, wie
        Mittelstand auf 10+ Städte skaliert, ohne in die typischen
        Stolperfallen zu treten.
      </p>

      <h2 id="warum">Warum eigene Stadt-Seiten?</h2>
      <p>
        Eine generische ‚Wir arbeiten im ganzen DACH-Raum‘-Seite rankt
        für keine einzelne Stadt richtig stark. Eigene Stadt-Seiten:
      </p>
      <ul>
        <li>Ranken für lokale Suchanfragen direkter</li>
        <li>Erhalten lokales Vertrauen durch echte lokale Bezüge</li>
        <li>Konvertieren besser, weil sie Stadt-spezifisch ansprechen</li>
        <li>Bieten Anker für lokale Backlinks und Citations</li>
      </ul>

      <h2 id="struktur">Die richtige Seiten-Struktur</h2>
      <p>
        Jede Stadt-Seite sollte folgende Elemente enthalten:
      </p>
      <ol>
        <li>
          <strong>H1 mit Leistung + Stadt:</strong> ‚Webdesign in Koblenz
          für Mittelstand"
        </li>
        <li>
          <strong>Lokaler Hero-Hook:</strong> Bezug zu Stadt, Region,
          lokalen Eigenheiten
        </li>
        <li>
          <strong>Service-Beschreibung mit lokalen Beispielen</strong>
        </li>
        <li>
          <strong>Lokaler Sozialer Beweis:</strong> Stadt-spezifische
          Kundenstimmen, Cases, Bewertungs-Auszüge
        </li>
        <li>
          <strong>Lokale FAQ:</strong> ‚Wie lange dauert ein Projekt in
          [Stadt]?", ‚Bist du auch im Umland aktiv?‘
        </li>
        <li>
          <strong>Anfahrtsinformation</strong> mit eingebetteter Map
        </li>
        <li>
          <strong>Klare CTAs:</strong> Termin in der Stadt, Anruf, Mail
        </li>
        <li>
          <strong>Schema-Markup:</strong> LocalBusiness mit Stadt-spezifischen
          Geo-Daten oder Service mit areaServed
        </li>
      </ol>

      <h2 id="duplicate">Duplicate Content vermeiden</h2>
      <p>
        Die größte Gefahr bei Stadt-Seiten ist Duplicate Content. Drei
        Regeln:
      </p>
      <ul>
        <li>
          <strong>Mindestens 50 % einzigartiger Inhalt</strong> pro Stadt
        </li>
        <li>
          <strong>Echte Stadt-Referenzen:</strong> Bezirke,
          Stadtteile, Wahrzeichen
        </li>
        <li>
          <strong>Kunden-Cases aus der Stadt</strong> oder unmittelbarer
          Umgebung
        </li>
      </ul>

      <h2 id="skalieren">Wie du auf 10+ Städte skalierst</h2>
      <p>
        Empfohlener Workflow:
      </p>
      <ol>
        <li>
          <strong>Eine Mustervorlage</strong> mit klarer Struktur und
          Platzhaltern erstellen
        </li>
        <li>
          <strong>Pro Stadt Recherche:</strong> Wahrzeichen, Stadtteile,
          Branchen, lokale Konkurrenz
        </li>
        <li>
          <strong>Inhalt anpassen</strong> mit individuellen Texten,
          lokalen Fotos, echten Cases
        </li>
        <li>
          <strong>Schema und URL</strong> sauber pro Stadt setzen
        </li>
        <li>
          <strong>Interne Verlinkung:</strong> Stadt-Seiten von zentralen
          Service-Seiten verlinken, untereinander cross-verlinken
        </li>
      </ol>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>Reine Doorway-Pages mit ausgetauschter Stadt</li>
        <li>Keine echten lokalen Bezüge</li>
        <li>Schema-Daten kopiert ohne Geo-Update</li>
        <li>Fehlende interne Verlinkung — Seiten bleiben isoliert</li>
        <li>Übertreibung: 100 Stadt-Seiten ohne echten lokalen Bezug</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Stadt-Seiten sind 2026 weiterhin ein extrem starker Hebel für
        lokales SEO — vorausgesetzt sie werden sauber gebaut. Wer 10–15
        ehrlich lokal optimierte Seiten hat, dominiert seine Region.
        Wer 50 Doorway-Pages produziert, wird abgestraft.
      </p>
    </>
  );
}
