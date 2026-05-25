import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "multi-location-seo-2026",
  title: "Multi-Location-SEO 2026: Wenn du mehrere Filialen hast",
  highlight: "Multi-Location",
  excerpt:
    "Eine Filiale ist einfach. Fünf Filialen sind eine Architektur-Entscheidung. So baust du Multi-Location-SEO so, dass jede Filiale in ihrer Region dominiert.",
  description:
    "Multi-Location-SEO 2026 für Filialnetzwerke: Architektur, GBP pro Standort, lokale Inhalte. Mit Beispielen aus dem DACH-Raum.",
  date: "2026-01-29",
  readingTime: "7 min",
  category: "Lokales SEO",
  popularity: 50,
  cover: { from: "#db6f16", to: "#a3540f", label: "Multi-Loc" },
  keywords: [
    "Multi Location SEO",
    "Filial SEO",
    "Standort SEO",
    "Mehrere Filialen Google",
    "GBP pro Filiale",
    "Lokale Sichtbarkeit Filialnetz",
  ],
  toc: [
    { id: "warum", label: "Warum Multi-Location anders ist" },
    { id: "architektur", label: "Die richtige URL-Architektur" },
    { id: "gbp", label: "GBP pro Standort" },
    { id: "content", label: "Lokale Inhalte pro Filiale" },
    { id: "duplicate", label: "Duplicate Content vermeiden" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich pro Filiale ein eigenes Google Business Profile?",
      a: "Ja, unbedingt. Jeder Standort braucht sein eigenes verifiziertes GBP mit eigenen Bewertungen, Bildern und Öffnungszeiten. Mit Google Business Profile Locations Group lassen sich mehrere Profile zentral verwalten.",
    },
    {
      q: "Wie strukturiere ich die URLs?",
      a: "Üblich ist /standorte/[stadt] oder /[stadt]/[leistung]. Für reine Filialnetze ist /standorte sauberer. Bei stark service-orientierten Geschäften lohnt /[stadt]/[leistung]-Struktur.",
    },
    {
      q: "Kann ich die gleiche Service-Beschreibung auf allen Standort-Seiten nutzen?",
      a: "Nein. Jede Standort-Seite braucht mindestens 50 % einzigartigen Inhalt — sonst Duplicate-Content-Bewertung. Pro Standort: lokale Cases, lokale Mitarbeiter, lokale Anfahrtsbeschreibung.",
    },
    {
      q: "Wie wichtig sind lokale Bewertungen pro Standort?",
      a: "Sehr wichtig. Jede Filiale braucht ihre eigenen Bewertungen — zentrale Bewertungen am Hauptstandort helfen den Filialen nicht. Pro Standort 10+ echte lokale Bewertungen aufbauen.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        Eine Filiale ist einfach. Fünf Filialen sind eine
        Architektur-Entscheidung. Wer Multi-Location-SEO richtig
        aufsetzt, gewinnt in jeder Region — wer Standard-Tipps
        überträgt, kannibalisiert sich selbst.
      </p>

      <h2 id="warum">Warum Multi-Location anders ist</h2>
      <p>
        Drei spezifische Herausforderungen:
      </p>
      <ul>
        <li>Standorte konkurrieren intern um Rankings</li>
        <li>Duplicate-Content-Risiko ist hoch</li>
        <li>Lokale Signale müssen pro Standort separat aufgebaut werden</li>
      </ul>

      <h2 id="architektur">Die richtige URL-Architektur</h2>
      <p>
        Empfohlen für die meisten Filialnetze:
      </p>
      <ul>
        <li><code>/standorte/koblenz</code> — Filial-Übersichts-Seite</li>
        <li><code>/standorte/koblenz/bewertungen</code> — lokale Reviews</li>
        <li><code>/standorte/koblenz/leistungen</code> — lokale Services</li>
      </ul>
      <p>
        Sauberer Hub-Spoke-Aufbau: Hauptseite verlinkt auf alle
        Standorte, Standorte verlinken auf Hauptseite und untereinander.
      </p>

      <h2 id="gbp">GBP pro Standort</h2>
      <ul>
        <li>Jeder Standort eigenes verifiziertes Google Business Profile</li>
        <li>Konsistente NAP-Daten zwischen GBP und Standort-Seite</li>
        <li>Eigene Telefonnummer pro Standort (idealerweise mit lokaler Vorwahl)</li>
        <li>Lokale Mitarbeiter-Fotos statt zentraler Marketing-Bilder</li>
        <li>Pro Standort eigene Bewertungs-Strategie</li>
      </ul>

      <h2 id="content">Lokale Inhalte pro Filiale</h2>
      <ul>
        <li>Lokale Cases mit Stadt-Bezug</li>
        <li>Mitarbeiter-Vorstellung dieser Filiale</li>
        <li>Lokale Anfahrtsbeschreibung mit ÖPNV-Hinweisen</li>
        <li>Bezug zu lokalen Stadtteilen oder Wahrzeichen</li>
        <li>Lokale Branchen-Cluster-Erwähnungen</li>
      </ul>

      <h2 id="duplicate">Duplicate Content vermeiden</h2>
      <ul>
        <li>Mindestens 50 % einzigartiger Inhalt pro Standort-Seite</li>
        <li>Schema mit Standort-spezifischen Geo-Daten</li>
        <li>Unterschiedliche H1 und Meta-Description pro Standort</li>
        <li>Canonical-Tags korrekt setzen (jede Standort-Seite ist eigene Entität)</li>
      </ul>

      <h2 id="fazit">Fazit</h2>
      <p>
        Multi-Location-SEO ist 2026 ein eigenes Handwerk. Wer es sauber
        umsetzt, dominiert mehrere Regionen parallel. Wer Standard-Tipps
        überträgt, kannibalisiert die eigenen Standorte und verschwendet
        SEO-Potenzial.
      </p>
    </>
  );
}
