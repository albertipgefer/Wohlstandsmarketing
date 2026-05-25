import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "hreflang-dach-2026",
  title: "Hreflang für DACH: Sichtbarkeit in Deutschland, Österreich und der Schweiz",
  highlight: "Hreflang",
  excerpt:
    "Wer im DACH-Raum aktiv ist, läuft Gefahr, dass Google die falsche Länderversion zeigt. Hreflang-Tags lösen das — und gewinnen lokale Sichtbarkeit in allen drei Ländern.",
  description:
    "Hreflang für DACH-Webseiten 2026: Wie du mit hreflang-Tags Deutschland, Österreich und Schweiz separat optimierst. Beispiele inklusive.",
  date: "2026-04-15",
  readingTime: "6 min",
  category: "Technisches SEO",
  cover: { from: "#1663de", to: "#0f4cb3", label: "DACH" },
  keywords: [
    "hreflang",
    "hreflang DACH",
    "Multi Country SEO",
    "Deutschland Österreich Schweiz SEO",
    "International SEO Mittelstand",
    "Geo Targeting Google",
  ],
  toc: [
    { id: "warum", label: "Warum hreflang im DACH wichtig ist" },
    { id: "syntax", label: "Die richtige hreflang-Syntax" },
    { id: "implementation", label: "Implementations-Optionen" },
    { id: "fehler", label: "Typische Fehler" },
    { id: "messen", label: "So prüfst du, ob hreflang funktioniert" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich hreflang, wenn alle drei Länder dieselbe Sprache haben?",
      a: "Ja, gerade dann. Sonst kann Google nicht unterscheiden, welche Seite für welches Land gedacht ist — und zeigt für AT- oder CH-Suchen oft die DE-Version, die mit lokal anderen Begriffen, Preisen oder Telefonnummern unpassend wirkt.",
    },
    {
      q: "Reichen Subdomains oder brauche ich eigene Domains?",
      a: "Beides geht. Subdomains (at.deine-domain.de) sind einfacher zu verwalten, eigene Country-TLDs (deine-domain.at) wirken lokal stärker. Für Mittelstand mit moderatem DACH-Engagement reichen Subdomains in der Regel aus.",
    },
    {
      q: "Wo gehört hreflang hin?",
      a: "Drei Optionen: im &lt;head&gt; jeder Seite als &lt;link rel=\"alternate\" hreflang=\"…\"/&gt;, im HTTP-Header oder in der Sitemap.xml. Für die meisten Mittelständler ist die HTML-Variante am einfachsten zu pflegen.",
    },
    {
      q: "Was passiert ohne hreflang im DACH-Raum?",
      a: "Google rät, welche Version es für welches Land zeigt — meistens falsch. Folge: Schweizer Nutzer landen auf der deutschen Seite mit deutschen Telefonnummern und € statt CHF, brechen ab. Conversion-Verlust ist messbar.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Wer im DACH-Raum aktiv ist, hat ein häufig übersehenes
        SEO-Problem: Google weiß oft nicht, welche Seitenversion für
        welches Land gedacht ist. Das Ergebnis: Schweizer landen auf der
        deutschen Version, Österreicher auch — und die Conversion sinkt.
        Hreflang löst das.
      </p>

      <h2 id="warum">Warum hreflang im DACH wichtig ist</h2>
      <p>
        DACH ist linguistisch nah, kommerziell aber sehr unterschiedlich.
        Andere Preise, andere Telefonvorwahlen, andere Begrifflichkeiten
        (Krankenkasse vs. Versicherung, Apotheker vs. Drogist), andere
        rechtliche Hinweise.
      </p>
      <p>
        Ohne hreflang ranken alle drei Länderversionen in Konkurrenz
        zueinander — und Google entscheidet selbst, welche es zeigt. Mit
        hreflang sagst du Google klar: „Diese URL ist für DE, diese für
        AT, diese für CH."
      </p>

      <h2 id="syntax">Die richtige hreflang-Syntax</h2>
      <p>
        Pflichtangaben pro Sprache+Land:
      </p>
      <ul>
        <li><code>de-DE</code> — Deutsch in Deutschland</li>
        <li><code>de-AT</code> — Deutsch in Österreich</li>
        <li><code>de-CH</code> — Deutsch in der Schweiz</li>
      </ul>
      <p>
        Plus eine <code>x-default</code>-Version für alle anderen Länder
        und Sprachen. Wichtig: jede Seite muss auf alle Sprach-Varianten
        verweisen, auch auf sich selbst (Self-Referencing).
      </p>

      <h2 id="implementation">Implementations-Optionen</h2>
      <p>
        Drei Wege, alle funktional:
      </p>
      <ul>
        <li>
          <strong>HTML im &lt;head&gt;:</strong> einfach, gut für die
          meisten Mittelständler, Pflege per CMS möglich
        </li>
        <li>
          <strong>HTTP-Header:</strong> für PDFs und Nicht-HTML-Ressourcen
        </li>
        <li>
          <strong>Sitemap.xml:</strong> zentral verwaltbar, gut bei
          mehreren hundert URLs
        </li>
      </ul>

      <h2 id="fehler">Typische Fehler</h2>
      <ul>
        <li>
          <strong>Self-Referencing vergessen</strong> — Google erwartet
          immer auch den Verweis auf die eigene Sprachversion
        </li>
        <li>
          <strong>Inkonsistente URLs</strong> — Trailing-Slash hier, kein
          Trailing-Slash dort
        </li>
        <li>
          <strong>Falsche Sprachkürzel</strong> — <code>at</code> statt
          <code>de-AT</code>
        </li>
        <li>
          <strong>404-URLs in hreflang</strong> — Crawler beschweren sich
        </li>
        <li>
          <strong>Asymmetrische Verlinkung</strong> — DE verlinkt auf AT,
          aber AT verlinkt nicht zurück
        </li>
      </ul>

      <h2 id="messen">So prüfst du, ob hreflang funktioniert</h2>
      <p>
        Drei pragmatische Methoden:
      </p>
      <ol>
        <li>
          <strong>Google Search Console</strong> → Internationale
          Ausrichtung — zeigt hreflang-Fehler pro URL-Gruppe
        </li>
        <li>
          <strong>Manuell mit VPN testen:</strong> mit Schweizer IP eine
          Google-Suche machen und prüfen, welche Version gezeigt wird
        </li>
        <li>
          <strong>Hreflang Tag Checker</strong> Tools (z. B. Merkle) für
          die Syntax-Validierung
        </li>
      </ol>

      <h2 id="fazit">Fazit</h2>
      <p>
        Hreflang ist eine der wirkungsvollsten technischen SEO-Maßnahmen
        für DACH-Mittelstand — und gleichzeitig eine der am häufigsten
        falsch umgesetzten. Wer hier sauber arbeitet, gewinnt
        Sichtbarkeit in allen drei Ländern parallel, ohne dass sich die
        eigenen Versionen kannibalisieren.
      </p>
      <p>
        Investitionsaufwand: 2–4 Stunden Setup. Wirkung: dauerhafte
        Conversion-Steigerung in AT und CH.
      </p>
    </>
  );
}
