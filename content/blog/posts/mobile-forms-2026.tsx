import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "mobile-forms-2026",
  title: "Mobile Forms 2026: Wie du Conversion auf dem Handy verdreifachst",
  highlight: "Mobile",
  excerpt:
    "65 % deines Traffics ist mobil — aber 80 % deiner Conversion passiert auf Desktop. Der Hauptgrund: schlechte Mobile Forms. Diese 7 Hebel ändern das.",
  description:
    "Mobile Forms 2026: 7 Hebel für 3× Conversion auf dem Smartphone. Native Inputs, Auto-Fill, Tap-Targets, Single-Field-Logic.",
  date: "2026-03-04",
  readingTime: "6 min",
  category: "Conversion",
  cover: { from: "#1663de", to: "#0f4cb3", label: "Mobile" },
  keywords: [
    "Mobile Forms",
    "Mobile Conversion",
    "Form Optimization",
    "Touch Forms",
    "Single Field Form",
    "Mobile First Forms",
    "Auto Fill Forms",
  ],
  toc: [
    { id: "warum", label: "Warum Mobile Forms scheitern" },
    { id: "hebel", label: "7 Hebel für Mobile-Conversion" },
    { id: "fehler", label: "Häufige Fehler" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wie viele Felder sollte eine Mobile Form maximal haben?",
      a: "So wenig wie möglich. Für Lead-Generation reichen oft Name + E-Mail oder sogar nur Telefonnummer. Jedes zusätzliche Feld halbiert die Conversion ungefähr. Pro Feld kritisch fragen: brauche ich das wirklich?",
    },
    {
      q: "Soll ich Auto-Fill aktivieren?",
      a: "Ja, unbedingt. Mit korrektem autocomplete-Attribut (z. B. ‚email‘, ‚tel‘, ‚name‘) schlägt der Browser passende Werte aus dem Profil vor. Kann Ausfüllzeit um 70 % reduzieren.",
    },
    {
      q: "Was ist die Mindestgröße für Tap-Targets?",
      a: "44 × 44 px nach Apple-Guidelines, idealerweise 48 × 48 px. Buttons darunter sind frustrierend zu treffen — vor allem mit großem Daumen.",
    },
    {
      q: "Sollte ich vertikale oder horizontale Form-Layouts nutzen?",
      a: "Auf Mobile immer vertikal. Felder untereinander, ein Feld pro Zeile. Horizontale Layouts funktionieren auf kleinen Screens nicht und führen zu schlechtem UX.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Über 65 % des Web-Traffics kommt 2026 von mobilen Geräten. Trotzdem
        passieren nur etwa 20 % der Conversions dort. Der größte einzelne
        Grund: schlecht designte Mobile Forms. Hier sind die 7 Hebel,
        die Conversion verdreifachen können.
      </p>

      <h2 id="warum">Warum Mobile Forms scheitern</h2>
      <p>
        Drei Hauptgründe:
      </p>
      <ul>
        <li>
          <strong>Zu viele Felder.</strong> Auf Mobile kostet jedes Feld
          doppelt — Tippen ist anstrengender.
        </li>
        <li>
          <strong>Falsche Input-Typen.</strong> Tel-Felder ohne tel-Input,
          E-Mail-Felder mit Standard-Tastatur — friktionsreich.
        </li>
        <li>
          <strong>Schlechte Tap-Targets.</strong> Buttons zu klein, zu nah
          beieinander, frustrierend zu treffen.
        </li>
      </ul>

      <h2 id="hebel">7 Hebel für Mobile-Conversion</h2>

      <h3>1. Single-Field-First</h3>
      <p>
        Beginne mit einem einzigen Feld (z. B. Telefonnummer oder E-Mail).
        Folgefelder erst zeigen, wenn das erste gefüllt ist (Progressive
        Disclosure).
      </p>

      <h3>2. Native Input-Typen</h3>
      <p>
        <code>type="tel"</code>, <code>type="email"</code>,{" "}
        <code>type="date"</code>, <code>type="number"</code> nutzen — das
        ändert die Tastatur und reduziert Tippfehler massiv.
      </p>

      <h3>3. Auto-Fill aktivieren</h3>
      <p>
        Korrekte <code>autocomplete</code>-Attribute setzen:{" "}
        <code>name</code>, <code>email</code>, <code>tel</code>,{" "}
        <code>address-line1</code>, <code>postal-code</code>. Browser
        füllen automatisch aus.
      </p>

      <h3>4. Tap-Targets ≥ 48 × 48 px</h3>
      <p>
        Buttons groß, Klickflächen ebenfalls. Apple-Guideline: 44 × 44 px
        Minimum, 48 × 48 px besser. Abstand zwischen Buttons mindestens
        8 px.
      </p>

      <h3>5. Inline-Validierung</h3>
      <p>
        Validierung passiert direkt nach Verlassen des Feldes, nicht
        erst beim Submit. Klare Fehlermeldungen, kein generisches
        ‚Fehler‘.
      </p>

      <h3>6. Sticky Submit-Button</h3>
      <p>
        Bei längeren Formularen: Submit-Button am unteren Rand sticky
        machen. Nutzer scrollt nicht weg vom Ziel.
      </p>

      <h3>7. Klickbare Telefonnummer als Backup</h3>
      <p>
        Über oder unter dem Formular eine <code>tel:</code>-Link
        anbieten — wer das Formular nicht ausfüllen will, kann direkt
        anrufen.
      </p>

      <h2 id="fehler">Häufige Fehler</h2>
      <ul>
        <li>Captcha auf Mobile — frustrierend, kostet 30 %+ Conversion</li>
        <li>Drop-Downs mit vielen Optionen — auf Mobile schlecht bedienbar</li>
        <li>Datepicker ohne native API</li>
        <li>Pflichtfelder, die nicht wirklich nötig sind</li>
        <li>Lange Privacy-Disclaimers über dem Submit-Button</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Mobile Forms sind 2026 der größte Hebel, um Mobile-Conversion zu
        steigern. Die richtigen Input-Typen, große Tap-Targets,
        Auto-Fill und reduzierte Feldzahl können Conversion verdreifachen.
        Investitionsaufwand: gering. ROI: massiv.
      </p>
    </>
  );
}
