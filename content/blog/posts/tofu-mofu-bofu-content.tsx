import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "tofu-mofu-bofu-content",
  title: "ToFu, MoFu, BoFu: Content entlang der Customer Journey erklärt",
  highlight: "Customer Journey",
  excerpt:
    "Nicht jeder Inhalt passt zu jeder Phase. Wer ToFu, MoFu und BoFu versteht, produziert Content, der Interessenten Schritt für Schritt zum Auftrag führt — statt ins Leere zu schreiben.",
  description:
    "ToFu, MoFu, BoFu einfach erklärt: Welcher Content in welche Funnel-Stufe gehört, wie du die Phasen verzahnst und intern verlinkst. Praxis-Leitfaden für den Mittelstand.",
  date: "2026-06-18",
  readingTime: "8 min",
  category: "Conversion",
  cover: { from: "#7c3aed", to: "#5b21b6", label: "Content-Strategie" },
  keywords: [
    "ToFu MoFu BoFu",
    "Content Customer Journey",
    "Funnel Content",
    "Top of Funnel Content",
    "Middle of Funnel",
    "Bottom of Funnel",
    "Content-Strategie Mittelstand",
    "Content-Marketing Funnel",
    "Buyer Journey Content",
    "interne Verlinkung Funnel",
  ],
  toc: [
    { id: "warum-funnel", label: "Warum Content eine Funnel-Logik braucht" },
    { id: "tofu", label: "ToFu: Aufmerksamkeit gewinnen" },
    { id: "mofu", label: "MoFu: Vertrauen und Vergleich" },
    { id: "bofu", label: "BoFu: Die Kaufentscheidung" },
    { id: "verzahnen", label: "Stufen verzahnen und intern verlinken" },
    { id: "fehler", label: "Typische Fehler im Mittelstand" },
  ],
  faq: [
    {
      q: "Was bedeuten ToFu, MoFu und BoFu?",
      a: "ToFu (Top of Funnel) ist die Aufmerksamkeitsphase: Der Interessent hat ein Problem, kennt aber noch keine Lösung. MoFu (Middle of Funnel) ist die Abwägungsphase: Er vergleicht Lösungswege und Anbieter. BoFu (Bottom of Funnel) ist die Entscheidungsphase: Er ist kaufbereit und braucht den letzten Anstoß.",
    },
    {
      q: "Welcher Content gehört in welche Funnel-Stufe?",
      a: "ToFu: Ratgeber, Blogartikel, Checklisten, Erklärungen zu Symptomen. MoFu: Vergleiche, Case Studies, Webinare, Whitepaper, Anbieter-Kriterien. BoFu: Leistungsseiten, Preise, Demos, Beratungsgespräche, Referenzen und Garantien.",
    },
    {
      q: "Wie viel Content brauche ich pro Stufe?",
      a: "Im Mittelstand bewährt sich ein Verhältnis von etwa 60 Prozent ToFu, 25 Prozent MoFu, 15 Prozent BoFu. Viele Betriebe drehen das versehentlich um — sie haben nur Verkaufsseiten und nichts, was oben im Funnel Aufmerksamkeit erzeugt.",
    },
    {
      q: "Wie verbinde ich die Funnel-Stufen miteinander?",
      a: "Über interne Verlinkung und klare nächste Schritte. Jeder ToFu-Artikel verweist auf einen passenden MoFu-Inhalt, jeder MoFu-Inhalt führt zu einer BoFu-Seite. So entsteht ein Pfad statt einzelner Sackgassen.",
    },
    {
      q: "Brauche ich als kleines Unternehmen wirklich einen Content-Funnel?",
      a: "Ja. Auch ein Handwerksbetrieb oder eine Kanzlei hat eine Customer Journey. Der Funnel muss nicht groß sein — schon drei ToFu-Artikel, eine Vergleichsseite und eine starke Leistungsseite mit Referenzen bilden einen funktionierenden Funnel ab.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Du schreibst Inhalte, aber es kommen keine Anfragen? Oft liegt es
        nicht an der Qualität, sondern an der Phase: Ein kaufbereiter
        Interessent braucht etwas anderes als jemand, der gerade erst sein
        Problem erkennt. ToFu, MoFu und BoFu ordnen genau das — und machen
        aus zufälligem Content einen Pfad, der zum Auftrag führt.
      </p>

      <h2 id="warum-funnel">Warum Content eine Funnel-Logik braucht</h2>
      <p>
        Ein Interessent durchläuft drei grobe Phasen, bevor er kauft. Anfangs
        spürt er nur ein Problem. Dann vergleicht er Lösungswege und Anbieter.
        Erst zum Schluss trifft er die Entscheidung. Diese drei Phasen heißen
        im Marketing ToFu, MoFu und BoFu — Top, Middle und Bottom of Funnel.
      </p>
      <p>
        Der Fehler vieler Betriebe: Sie schreiben Inhalte, die nur zur
        letzten Phase passen — Leistungsseiten und Preise. Wer aber sein
        Problem noch gar nicht eingeordnet hat, ist für diese Seiten nicht
        bereit. Er springt ab. Content entlang der Customer Journey holt
        Menschen dort ab, wo sie gerade stehen, und begleitet sie Stufe für
        Stufe nach unten.
      </p>

      <h2 id="tofu">ToFu: Aufmerksamkeit gewinnen</h2>
      <p>
        Top of Funnel ist die breiteste Stufe. Hier hat dein Wunschkunde ein
        Problem, sucht aber noch keine konkrete Lösung — geschweige denn dich.
        Dein Ziel ist nicht der Verkauf, sondern dass er dich überhaupt findet
        und als hilfreich wahrnimmt.
      </p>
      <p>Passende Inhalte für diese Stufe:</p>
      <ul>
        <li>Ratgeber-Blogartikel, die typische Fragen deiner Branche beantworten</li>
        <li>Checklisten und einfache Anleitungen zum Mitnehmen</li>
        <li>Erklärungen zu Symptomen und Ursachen („Warum bekomme ich keine Anfragen?“)</li>
        <li>Begriffs-Erklärungen wie dieser Artikel hier</li>
      </ul>
      <p>
        Beispiel Handwerk: Ein Artikel „5 Anzeichen, dass deine Heizung
        getauscht werden sollte" erreicht Menschen, die noch gar nicht nach
        einem Installateur suchen — aber bald suchen werden. Du bist dann
        schon präsent. ToFu-Content darf großzügig informieren, ohne hart zu
        verkaufen.
      </p>

      <h2 id="mofu">MoFu: Vertrauen und Vergleich</h2>
      <p>
        Middle of Funnel ist die Abwägungsphase. Der Interessent kennt jetzt
        sein Problem und mögliche Lösungswege. Er vergleicht Ansätze, Methoden
        und Anbieter. Hier entscheidet sich, ob du in seine engere Auswahl
        kommst.
      </p>
      <p>Passende Inhalte für diese Stufe:</p>
      <ul>
        <li>Vergleiche zwischen Lösungswegen („Eigenbau vs. Agentur“)</li>
        <li>Case Studies und Vorher-Nachher-Beispiele</li>
        <li>Anbieter-Kriterien („Worauf du bei der Auswahl achten solltest“)</li>
        <li>Webinare, Whitepaper oder ausführliche Leitfäden im Tausch gegen die E-Mail-Adresse</li>
      </ul>
      <p>
        MoFu-Content darf Position beziehen. Zeig, warum dein Weg funktioniert,
        belege es mit Ergebnissen und nimm typische Bedenken vorweg. Wer hier
        Vertrauen aufbaut, gewinnt den späteren Vergleich fast automatisch.
      </p>

      <h2 id="bofu">BoFu: Die Kaufentscheidung</h2>
      <p>
        Bottom of Funnel ist die schmalste, aber wertvollste Stufe. Der
        Interessent ist kaufbereit und prüft nur noch, ob du der richtige
        Partner bist. Jetzt darfst — und sollst — du konkret werden.
      </p>
      <p>Passende Inhalte für diese Stufe:</p>
      <ul>
        <li>Leistungs- und Angebotsseiten mit klarem Nutzen</li>
        <li>Preise, Pakete und transparente Konditionen</li>
        <li>Referenzen, Kundenstimmen und Garantien</li>
        <li>Klare Handlungsaufforderung: Beratungsgespräch, Demo, Anfrageformular</li>
      </ul>
      <p>
        Hier zahlt sich aus, dass du vorher in ToFu und MoFu investiert hast:
        Der Interessent kommt vorgewärmt an. Deine{" "}
        <a href="/leistungen">Leistungsseiten</a> müssen jetzt nur noch
        Sicherheit geben und die Hürde zur Kontaktaufnahme so niedrig wie
        möglich halten.
      </p>

      <h2 id="verzahnen">Stufen verzahnen und intern verlinken</h2>
      <p>
        Einzelne Inhalte pro Stufe reichen nicht — sie müssen ineinander
        greifen. Der entscheidende Hebel ist die interne Verlinkung: Jeder
        Inhalt zeigt den logischen nächsten Schritt.
      </p>
      <ol>
        <li>
          <strong>ToFu → MoFu:</strong> Am Ende eines Ratgeber-Artikels
          verlinkst du auf einen Vergleich oder eine Case Study. Wer das
          Problem verstanden hat, will als Nächstes Lösungen abwägen.
        </li>
        <li>
          <strong>MoFu → BoFu:</strong> Aus dem Vergleich führst du auf deine{" "}
          <a href="/leistungen">Leistungsseite</a> — dorthin, wo der Interessent
          buchen oder anfragen kann.
        </li>
        <li>
          <strong>Querverweise:</strong> Themenverwandte Artikel verlinken sich
          gegenseitig. Das hält Besucher länger und stärkt nebenbei das SEO.
        </li>
      </ol>
      <p>
        Wer das systematisch aufbauen will, plant Content nicht als lose
        Artikel, sondern als zusammenhängendes Netz. Wie das im{" "}
        <a href="/content-marketing">Content-Marketing</a> strukturiert
        funktioniert, lohnt sich vorab durchzudenken — sonst entstehen viele
        Inhalte ohne Pfad. Faustregel fürs Verhältnis: etwa 60 Prozent ToFu,
        25 Prozent MoFu, 15 Prozent BoFu.
      </p>

      <h2 id="fehler">Typische Fehler im Mittelstand</h2>
      <ul>
        <li>
          <strong>Nur BoFu-Content:</strong> Die Website besteht aus
          Leistungsseiten und Preisen — aber nichts erzeugt oben im Funnel
          Aufmerksamkeit. Es kommt schlicht niemand an.
        </li>
        <li>
          <strong>Sackgassen ohne nächsten Schritt:</strong> Gute Artikel ohne
          Verlinkung und ohne Handlungsaufforderung. Der Leser ist überzeugt —
          und weiß nicht, wohin.
        </li>
        <li>
          <strong>Verkaufen in der falschen Phase:</strong> Im ToFu-Artikel
          schon hart zum Kauf drängen. Das verschreckt Menschen, die gerade
          erst recherchieren.
        </li>
        <li>
          <strong>Kein Plan, nur Output:</strong> Inhalte werden produziert,
          weil „man Content braucht“ — ohne zu wissen, welche Stufe sie bedienen.
          Ergebnis: viel Aufwand, kein System.
        </li>
        <li>
          <strong>MoFu komplett ausgelassen:</strong> Es gibt Aufmerksamkeit
          (ToFu) und Angebote (BoFu), aber nichts dazwischen, das Vertrauen
          aufbaut. Genau hier kippen die meisten Entscheidungen.
        </li>
      </ul>
      <p>
        Der Funnel muss nicht groß sein. Schon drei gute ToFu-Artikel, eine
        ehrliche Vergleichsseite und eine starke Leistungsseite mit Referenzen
        ergeben einen funktionierenden Pfad. Entscheidend ist nicht die Menge,
        sondern dass jede Phase abgedeckt ist — und die Stufen sauber
        ineinandergreifen.
      </p>
    </>
  );
}
