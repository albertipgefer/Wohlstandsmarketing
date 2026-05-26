import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "webseiten-relaunch-kosten",
  title: "Webseiten-Relaunch Kosten 2026: Preise + Was du beachten musst",
  highlight: "Relaunch",
  excerpt:
    "Eine alte Webseite kostet dich Monat für Monat verlorene Anfragen. Wann sich ein Relaunch lohnt, was er 2026 kostet — und wie du SEO-Verluste vermeidest.",
  description:
    "Webseiten-Relaunch Kosten 2026: Faire Preise, SEO-Migration, technische Voraussetzungen. Der pragmatische Leitfaden für Mittelstand.",
  date: "2026-05-26",
  readingTime: "7 min",
  category: "Webdesign",
  cover: { from: "#1663de", to: "#0f4cb3", label: "Relaunch" },
  keywords: [
    "Webseiten-Relaunch",
    "Webseite Relaunch Kosten",
    "Webseite neu erstellen",
    "Relaunch SEO",
    "Webseite modernisieren",
    "Relaunch Checkliste",
    "Webseite aktualisieren Kosten",
  ],
  toc: [
    { id: "wann-lohnt", label: "Wann sich ein Relaunch wirklich lohnt" },
    { id: "kosten", label: "Was ein Relaunch 2026 kostet" },
    { id: "seo-migration", label: "Die SEO-Migration: Wo es schiefgehen kann" },
    { id: "ablauf", label: "Der ideale Relaunch-Ablauf" },
    { id: "checkliste", label: "Pre-Relaunch-Checkliste" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Wann sollte ich einen Relaunch machen?",
      a: "Wenn mindestens 2 dieser Punkte zutreffen: 1) Seite ist älter als 4 Jahre, 2) Mobile-Optimierung fehlt oder ist schlecht, 3) Anfragen sind in den letzten 12 Monaten zurückgegangen, 4) Bounce-Rate über 70 %, 5) Performance-Score unter 50, 6) Du schämst dich beim Vorzeigen.",
    },
    {
      q: "Was kostet ein Relaunch 2026?",
      a: "Für deutschen Mittelstand realistisch: 1.500–3.500 €. Darunter wird meist nur ein Theme-Wechsel verkauft. Darüber zahlst du Agentur-Overhead. Bei Komplexitätsfällen (Online-Shop, Multi-Domain, Multi-Sprache) auch deutlich mehr.",
    },
    {
      q: "Verliere ich beim Relaunch mein Google-Ranking?",
      a: "Nur, wenn die SEO-Migration schlecht gemacht wird. Bei sauberer 301-Weiterleitungs-Logik, übertragenen Schema-Daten und identischen URL-Strukturen ist der Ranking-Verlust meist unter 5 % — und nach 4–8 Wochen wieder ausgeglichen.",
    },
    {
      q: "Wie lange dauert ein Relaunch?",
      a: "Für eine Standard-Mittelstand-Webseite mit 5–10 Unterseiten: 14–21 Tage. Bei Multi-Domain oder Online-Shop deutlich länger (4–8 Wochen). Wer 4 Wochen für eine 5-Seiten-Website ankündigt, arbeitet ineffizient.",
    },
    {
      q: "Was muss vor dem Relaunch geklärt sein?",
      a: "1) Inhalts-Audit der bestehenden Seite. 2) Liste der Top-20-URLs nach organischem Traffic. 3) Liste der Top-Keywords. 4) Backlink-Profil (welche Seiten haben externe Verlinkungen). 5) Conversion-Pfade. Ohne diese Daten ist der Relaunch ein Blindflug.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Eine 6 Jahre alte Webseite kostet dich monatlich verlorene Anfragen,
        ohne dass du es siehst. Ein Relaunch ist nicht „Kosmetik" — sondern
        die wichtigste Investition, wenn deine Seite den Punkt erreicht
        hat, an dem sie mehr schadet als nützt. Hier ist alles, was du
        wissen musst.
      </p>

      <h2 id="wann-lohnt">Wann sich ein Relaunch wirklich lohnt</h2>
      <p>
        Sechs Indikatoren zeigen, dass es Zeit ist:
      </p>
      <ul>
        <li>Die Seite ist über 4 Jahre alt</li>
        <li>Mobile-Optimierung fehlt oder ist schlecht (über 60 % deiner Besucher sind mobil)</li>
        <li>Anfragen über die Webseite gehen seit 12+ Monaten zurück</li>
        <li>Bounce-Rate liegt konstant über 70 %</li>
        <li>Performance-Score (Google PageSpeed) unter 50</li>
        <li>Du verlinkst sie nicht stolz im Newsletter</li>
      </ul>
      <p>
        Treffen mindestens zwei zu: Relaunch lohnt sich. Bei vier+ ist es
        bereits ein Notfall — du verlierst gerade aktiv Marktanteile.
      </p>

      <h2 id="kosten">Was ein Relaunch 2026 kostet</h2>
      <ul>
        <li><strong>Mini-Relaunch (Design-Refresh):</strong> 990–1.500 €</li>
        <li><strong>Standard-Relaunch (Mittelstand, 5–10 Seiten):</strong> 1.500–3.500 €</li>
        <li><strong>Komplexer Relaunch (Multi-Sprache, Shop, Custom-Funktionen):</strong> 4.000–10.000 €</li>
        <li><strong>Wartung danach:</strong> ab 150 €/Monat</li>
      </ul>
      <p>
        Was im Preis 2026 enthalten sein muss: SEO-Migration, Schema.org-Setup,
        Performance-Optimierung, KI-Sichtbarkeit (llms.txt, robots.txt für
        KI-Bots), DSGVO-Compliance, sauberes 301-Mapping. Fehlt eines davon,
        wirst du in 6 Monaten Verluste merken.
      </p>

      <h2 id="seo-migration">Die SEO-Migration: Wo es schiefgehen kann</h2>
      <p>
        Drei Fehler ruinieren auch den besten Relaunch:
      </p>
      <ol>
        <li>
          <strong>URL-Struktur ändert sich ohne 301-Mapping:</strong> Google
          versteht nicht, dass deine alte URL jetzt eine neue ist —
          Ranking-Verlust komplett.
        </li>
        <li>
          <strong>Schema-Daten gehen verloren:</strong> Die alten
          Organization-/LocalBusiness-Schemas fehlen plötzlich — Google
          verliert Kontext.
        </li>
        <li>
          <strong>Performance-Regression:</strong> Die neue Seite sieht
          schön aus, lädt aber langsamer als die alte. LCP-Verschlechterung
          = SEO-Penalty.
        </li>
      </ol>
      <p>
        Eine seriöse Agentur macht vor dem Go-Live einen 50-Punkte-Check.
        Frag explizit danach.
      </p>

      <h2 id="ablauf">Der ideale Relaunch-Ablauf</h2>
      <ol>
        <li><strong>Tag 1–3:</strong> Audit der bestehenden Seite (URLs, Keywords, Backlinks, Schema)</li>
        <li><strong>Tag 4–5:</strong> Konzept + Sitemap + URL-Mapping</li>
        <li><strong>Tag 6–10:</strong> Design + Inhaltsübernahme + Optimierung</li>
        <li><strong>Tag 11–13:</strong> Entwicklung + Schema-Setup + KI-Crawler-Konfiguration</li>
        <li><strong>Tag 14–16:</strong> 301-Mapping + Pre-Launch-Tests</li>
        <li><strong>Tag 17:</strong> Go-Live + Google Search Console Re-Submission</li>
        <li><strong>Tag 18–28:</strong> Monitoring + Nachjustierung</li>
      </ol>

      <h2 id="checkliste">Pre-Relaunch-Checkliste</h2>
      <ul>
        <li>Google Analytics + Search Console Daten der letzten 12 Monate exportiert?</li>
        <li>Top-20-URLs nach Traffic dokumentiert?</li>
        <li>Top-Backlinks bekannt (welche externen Seiten verlinken auf welche URLs)?</li>
        <li>Aktuelle Conversion-Pfade dokumentiert?</li>
        <li>Inhalte vollständig (Texte, Bilder, Videos) vorhanden?</li>
        <li>Klares Ziel für den Relaunch definiert (mehr Anfragen, besseres Image, neue Zielgruppe)?</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Ein Relaunch ist kein Luxus, sondern eine Wartungsmaßnahme — wie
        ein Auto-TÜV alle 4 Jahre. Die Kosten zwischen 1.500 € und 3.500 €
        sind nicht der Hebel. Der Hebel ist die Differenz zwischen einer
        Webseite, die monatlich 5 Anfragen bringt, und einer, die 50 bringt.
      </p>
      <p>
        Wer den Relaunch professionell macht, sieht in 90 Tagen messbar
        mehr Conversions. Wer es Stümpern überlässt, verliert SEO-Power
        und braucht 12 Monate Aufholjagd. Investier die 2 Stunden Auswahl.
      </p>
    </>
  );
}
