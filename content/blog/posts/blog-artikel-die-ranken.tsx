import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "blog-artikel-die-ranken",
  title: "Blog-Artikel, die ranken: Aufbau, Länge, Struktur 2026",
  highlight: "ranken",
  excerpt:
    "Ein Blog-Artikel rankt nicht, weil er lang ist — sondern weil er die Suchintention exakt trifft, sauber strukturiert ist und für Mensch und KI zitierbar bleibt. Hier ist die komplette Anleitung.",
  description:
    "Blog-Artikel, die ranken: Aufbau, Struktur, Länge, interne Verlinkung, Schema, E-E-A-T und GEO-Zitierbarkeit. Praxis-Anleitung inklusive Checkliste 2026.",
  date: "2026-06-18",
  readingTime: "9 min",
  category: "Technisches SEO",
  cover: { from: "#1663de", to: "#0f4cb3", label: "SEO" },
  keywords: [
    "Blog-Artikel die ranken",
    "Blogartikel SEO",
    "rankende Blogartikel schreiben",
    "Blogartikel Aufbau",
    "Blogartikel Länge SEO",
    "Suchintention treffen",
    "interne Verlinkung Blog",
    "E-E-A-T Content",
    "GEO Content schreiben",
  ],
  toc: [
    { id: "suchintention", label: "Suchintention zuerst: das Fundament" },
    { id: "struktur", label: "Struktur & H2-Hierarchie" },
    { id: "laenge", label: "Wie lang muss ein rankender Artikel sein?" },
    { id: "verlinkung-schema", label: "Interne Verlinkung, Schema & E-E-A-T" },
    { id: "geo", label: "GEO: für KI-Antworten zitierbar werden" },
    { id: "checkliste", label: "Checkliste & häufige Fehler" },
  ],
  faq: [
    {
      q: "Wie lang muss ein Blog-Artikel sein, um zu ranken?",
      a: "Es gibt keine Mindestlänge. Entscheidend ist die Suchintention: Eine reine Definitionsfrage ist mit 600 Wörtern besser bedient als mit 3.000. Ratgeber-Themen ranken oft zwischen 1.200 und 2.500 Wörtern — aber nur, wenn jedes Wort einen Mehrwert liefert. Länge ist ein Nebeneffekt vollständiger Themenabdeckung, kein Ziel an sich.",
    },
    {
      q: "Wie viele interne Links gehören in einen Artikel?",
      a: "Als Faustregel 3–8 thematisch passende interne Links pro 1.000 Wörter. Wichtig ist nicht die Zahl, sondern die Relevanz: Verlinke auf die Seiten, die der Leser als logischen nächsten Schritt braucht — etwa von einem Ratgeber auf deine Leistungsseite. Sprechende Ankertexte statt 'hier klicken'.",
    },
    {
      q: "Welches Schema-Markup brauche ich für einen Blog-Artikel?",
      a: "Article (oder BlogPosting) mit Autor, Veröffentlichungs- und Aktualisierungsdatum ist Pflicht. Bei Frage-Antwort-Blöcken ergänzt FAQPage-Schema die Zitierbarkeit. BreadcrumbList hilft bei der Einordnung. Das Markup macht den Artikel für Google und KI-Crawler maschinenlesbar — ohne es bleibst du unsichtbar für Answer Engines.",
    },
    {
      q: "Wie oft sollte ich ein Keyword verwenden?",
      a: "Keyword-Dichte als Prozentwert ist überholt. Verwende das Haupt-Keyword im Titel, in der ersten H2, in der Meta-Description und ein paar Mal natürlich im Fließtext. Wichtiger sind verwandte Begriffe und Fragen, die das Thema vollständig abdecken — moderne Suchmaschinen bewerten Themen-Relevanz, nicht Wortzählung.",
    },
    {
      q: "Wie werde ich in ChatGPT oder Perplexity zitiert?",
      a: "Schreibe in zitierbaren Einheiten: klare Aussagen, datierte Fakten, abgegrenzte Antworten auf konkrete Fragen. FAQ-Blöcke, definierte Begriffe und Listen werden von KI-Modellen bevorzugt extrahiert. Kombiniert mit Schema-Markup, einem erkennbaren Autor und sauberer Crawler-Freigabe wird dein Artikel zur Quelle einer KI-Antwort statt nur zu einem Google-Treffer.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Die meisten Blog-Artikel ranken nicht — nicht weil sie schlecht
        geschrieben sind, sondern weil sie an der Suchintention vorbeischreiben,
        chaotisch strukturiert sind und weder für Google noch für KI-Antworten
        zitierbar bleiben. Diese Anleitung zeigt dir Schritt für Schritt, wie
        ein Artikel aufgebaut sein muss, der 2026 wirklich Sichtbarkeit bringt.
      </p>

      <h2 id="suchintention">Suchintention zuerst: das Fundament</h2>
      <p>
        Bevor du ein einziges Wort schreibst, beantworte eine Frage: Was will
        jemand wirklich, der diese Suchanfrage eingibt? Google rankt nicht den
        längsten oder den am häufigsten optimierten Artikel, sondern den, der
        die Absicht hinter der Suche am vollständigsten erfüllt.
      </p>
      <p>Es gibt vier Grundtypen von Suchintention:</p>
      <ul>
        <li>
          <strong>Informational:</strong> Der Nutzer will etwas verstehen
          („wie funktioniert SEO“). Antwort: erklärender Ratgeber.
        </li>
        <li>
          <strong>Navigational:</strong> Er sucht eine bestimmte Marke oder
          Seite. Hier konkurrierst du selten mit einem Blog-Artikel.
        </li>
        <li>
          <strong>Kommerziell:</strong> Er vergleicht, bevor er kauft
          („beste SEO-Agentur“). Antwort: Vergleich, Kriterien, Belege.
        </li>
        <li>
          <strong>Transaktional:</strong> Er will handeln. Hier gehört eine
          Leistungs- oder Produktseite hin, kein Blog-Artikel.
        </li>
      </ul>
      <p>
        Der schnellste Realitäts-Check: Gib dein Ziel-Keyword bei Google ein
        und schau dir die Top-10 an. Sind das Ratgeber, Vergleiche oder
        Shop-Seiten? Dieses Format erwartet die Suchmaschine — wer dagegen
        anschreibt, rankt nicht, egal wie gut der Text ist.
      </p>

      <h2 id="struktur">Struktur & H2-Hierarchie</h2>
      <p>
        Ein rankender Artikel ist scanbar. Sowohl Leser als auch Crawler lesen
        zuerst die Überschriften — sie sind die Landkarte des Textes. Eine
        saubere Hierarchie sieht so aus:
      </p>
      <ol>
        <li>
          <strong>Genau ein H1</strong> — der Titel, der das Haupt-Keyword
          enthält.
        </li>
        <li>
          <strong>H2 für jeden Hauptabschnitt</strong> — am besten als Frage
          oder klares Versprechen formuliert, weil so reale Suchanfragen
          aussehen.
        </li>
        <li>
          <strong>H3 für Unterpunkte</strong> innerhalb eines H2 — nie eine
          Ebene überspringen.
        </li>
      </ol>
      <p>Bewährter Aufbau eines Ratgeber-Artikels:</p>
      <ul>
        <li>
          <strong>Einleitung (Lead):</strong> Problem benennen, Versprechen
          geben, in 3–4 Sätzen. Die Antwort auf die Kernfrage gehört früh in
          den Text, nicht erst ins Fazit.
        </li>
        <li>
          <strong>Hauptteil in H2-Blöcken:</strong> jeder Block deckt einen
          eigenen Teilaspekt ab und steht für sich.
        </li>
        <li>
          <strong>Listen, Tabellen, kurze Absätze:</strong> maximal 3–4 Zeilen
          pro Absatz. Wände aus Text werden weggescrollt.
        </li>
        <li>
          <strong>FAQ-Block:</strong> die typischen Anschlussfragen, knapp
          beantwortet — gut für Leser und für KI-Extraktion.
        </li>
        <li>
          <strong>Fazit mit klarem nächsten Schritt.</strong>
        </li>
      </ul>

      <h2 id="laenge">Wie lang muss ein rankender Artikel sein?</h2>
      <p>
        Die ehrliche Antwort: so lang wie nötig, um die Suchintention
        vollständig zu erfüllen — und keine Silbe länger. Es gibt keine
        magische Wortzahl. Was zählt, ist die vollständige Abdeckung des
        Themas im Vergleich zu den aktuell rankenden Seiten.
      </p>
      <ul>
        <li>
          <strong>Definitions- und Kurzfragen:</strong> 500–900 Wörter. Wer
          eine simple Frage künstlich auf 2.000 Wörter aufbläht, verschlechtert
          das Ranking.
        </li>
        <li>
          <strong>Ratgeber & How-to:</strong> 1.200–2.000 Wörter, weil hier
          echte Tiefe erwartet wird.
        </li>
        <li>
          <strong>Umfassende Leitfäden & Vergleiche:</strong> 2.000–3.500
          Wörter, wenn das Thema es trägt.
        </li>
      </ul>
      <p>
        Länge ist ein Ergebnis, kein Ziel. Schreib so viel, dass keine
        relevante Frage offen bleibt, und streiche dann jeden Satz, der nur
        Füllmasse ist. Gute Tiefe schlägt jede Wortzahl-Vorgabe — mehr dazu in
        unserem Überblick zum{" "}
        <a href="/content-marketing">Content-Marketing</a>.
      </p>

      <h2 id="verlinkung-schema">Interne Verlinkung, Schema & E-E-A-T</h2>
      <p>
        Ein guter Artikel steht nie allein. Drei technische Hebel entscheiden
        darüber, ob er sein volles Ranking-Potenzial entfaltet.
      </p>
      <p>
        <strong>Interne Verlinkung.</strong> Jeder Artikel sollte auf
        thematisch verwandte Seiten verweisen — vor allem auf die Seiten, mit
        denen du Geld verdienst. Ein Ratgeber zum Thema Sichtbarkeit verlinkt
        logisch auf deine <a href="/seo">SEO-Leistungsseite</a>. Das verteilt
        Linkkraft, hält Leser im Funnel und zeigt Suchmaschinen die thematische
        Struktur deiner Website. Nutze sprechende Ankertexte, die das Ziel
        beschreiben, statt generischer Floskeln.
      </p>
      <p>
        <strong>Schema-Markup.</strong> Hinterlege Article- bzw.
        BlogPosting-Schema mit Autor, Veröffentlichungs- und
        Aktualisierungsdatum. Ergänze FAQPage-Schema für deinen Fragenblock und
        BreadcrumbList für die Einordnung. Erst dieses strukturierte
        Markup macht den Artikel für Google und KI-Crawler eindeutig
        interpretierbar.
      </p>
      <p>
        <strong>E-E-A-T.</strong> Experience, Expertise, Authoritativeness,
        Trust — Google bewertet, wer hinter dem Inhalt steht. Eine echte
        Autoren-Box mit Foto, Qualifikation und Verknüpfung zu Profilen
        (LinkedIn etc.), datierte Fakten und nachvollziehbare Quellen signalisieren
        Vertrauenswürdigkeit. Anonymer Content rankt bei beratungsintensiven
        Themen kaum noch.
      </p>

      <h2 id="geo">GEO: für KI-Antworten zitierbar werden</h2>
      <p>
        2026 startet ein wachsender Teil aller Recherchen nicht mehr bei
        Google, sondern in ChatGPT, Claude, Perplexity oder den Google AI
        Overviews. Wer dort nicht zitiert wird, verliert systematisch
        Reichweite — auch bei gutem klassischen Ranking. Generative Engine
        Optimization sorgt dafür, dass dein Artikel zur Quelle einer KI-Antwort
        wird.
      </p>
      <p>Was Artikel zitierbar macht:</p>
      <ul>
        <li>
          <strong>Antworten in abgegrenzten Einheiten:</strong> Eine klare
          Frage, eine klare Antwort. KI-Modelle extrahieren in sich
          geschlossene Passagen leichter als verschachtelten Fließtext.
        </li>
        <li>
          <strong>Datierte, attributierbare Fakten:</strong> „Stand 2026“ oder
          konkrete Zahlen geben dem Modell etwas, das es belastbar zitieren
          kann.
        </li>
        <li>
          <strong>FAQ- und Definitions-Blöcke:</strong> werden überproportional
          häufig als Antwortquelle herangezogen.
        </li>
        <li>
          <strong>Crawler-Freigabe:</strong> GPTBot, ClaudeBot,
          PerplexityBot und Google-Extended müssen in der robots.txt erlaubt
          sein, sonst bleibt der beste Artikel für KI unsichtbar.
        </li>
      </ul>

      <h2 id="checkliste">Checkliste & häufige Fehler</h2>
      <p>
        Geh diese Punkte vor jeder Veröffentlichung durch — sie fassen die
        ganze Anleitung zusammen:
      </p>
      <ul>
        <li>Suchintention der Top-10 geprüft und Format angepasst</li>
        <li>Haupt-Keyword in Titel, erster H2 und Meta-Description</li>
        <li>Saubere H1/H2/H3-Hierarchie ohne übersprungene Ebenen</li>
        <li>Kernantwort steht früh, nicht erst im Fazit</li>
        <li>Absätze kurz, Listen und Zwischenüberschriften zum Scannen</li>
        <li>3–8 relevante interne Links mit sprechenden Ankertexten</li>
        <li>Article- und FAQPage-Schema hinterlegt</li>
        <li>Echte Autoren-Angabe plus Veröffentlichungs- und Aktualisierungsdatum</li>
        <li>FAQ-Block mit den typischen Anschlussfragen</li>
        <li>Klarer nächster Schritt am Ende (Call-to-Action)</li>
      </ul>
      <p>Die teuersten Fehler, die du dir sparen kannst:</p>
      <ul>
        <li>
          <strong>Am Suchintent vorbeischreiben:</strong> ein Ratgeber, wo
          Google eine Vergleichsseite erwartet.
        </li>
        <li>
          <strong>Künstliche Länge:</strong> Füllsätze und Wiederholungen, nur
          um eine Wortzahl zu treffen.
        </li>
        <li>
          <strong>Keine internen Links:</strong> der Artikel bleibt eine Insel
          und gibt seine Linkkraft nicht weiter.
        </li>
        <li>
          <strong>Fehlendes Schema:</strong> der Inhalt ist für KI-Engines
          nicht eindeutig lesbar.
        </li>
        <li>
          <strong>Anonymer Content:</strong> kein Autor, keine Quellen, kein
          Vertrauen — und damit kaum E-E-A-T.
        </li>
        <li>
          <strong>Veröffentlichen und vergessen:</strong> rankende Artikel
          werden regelmäßig aktualisiert, nicht einmal geschrieben und liegen
          gelassen.
        </li>
      </ul>
      <p>
        Ein rankender Blog-Artikel ist kein Zufall, sondern Handwerk:
        Suchintention treffen, klar strukturieren, vollständig statt lang
        schreiben, technisch sauber verknüpfen und für Mensch und KI zitierbar
        machen. Wer diese Anleitung konsequent abarbeitet, baut Inhalte, die
        nicht nur heute ranken, sondern über Jahre Sichtbarkeit liefern.
      </p>
    </>
  );
}
