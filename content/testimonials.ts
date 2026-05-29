/**
 * Zentrale Testimonial-Datenquelle.
 *
 * Aufbau:
 * - `short`: gekürztes Zitat für Above-the-Fold / Cards (max ~140 Zeichen)
 * - `full`: kompletter Review-Text (für ausführliche Bewertungs-Sektion)
 * - `featured: true` = wird in der kurzen Variante (Hero/Trust-Row) angezeigt
 *
 * Wenn neue Google-Reviews kommen → einfach hier eintragen, Komponenten ziehen
 * sich automatisch die Daten.
 */

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO oder freier Text
  short: string;
  full: string;
  source: "google";
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "anton-akulenko",
    name: "Anton Akulenko",
    rating: 5,
    date: "2026-05-26",
    short:
      "Top Zusammenarbeit – Albert weiß, was er tut. Komplettes Paket auf hohem Niveau. Mein Umsatz ist seit der Zusammenarbeit deutlich gestiegen.",
    full: "Top Zusammenarbeit – danke, Albert!\n\nWenn ich eines über Albert sagen kann, dann: Der Mann weiß, was er tut. Von SEO über Webdesign bis hin zum Performance-Marketing – bei ihm bekommt man das komplette Paket, und zwar auf einem richtig hohen Niveau.\n\nWas mich besonders überzeugt hat: Es bleibt nicht bei schönen Worten oder hübschen Webseiten (die übrigens wirklich gut aussehen und einwandfrei laufen). Die Ergebnisse sprechen für sich – mein Umsatz ist seit der Zusammenarbeit deutlich gestiegen, und gerade das Performance-Marketing hat sich für mich richtig ausgezahlt.\n\nDanke dir, Albert, für dein Know-how, dein Engagement und die angenehme Zusammenarbeit. Wer einen Marketing-Profi sucht, der nicht nur redet, sondern liefert, ist bei dir und Wohlstandsmarketing genau richtig!",
    source: "google",
    featured: true,
  },
  {
    id: "leon-wilhelm",
    name: "Leon Wilhelm",
    rating: 5,
    date: "2026-05-26",
    short:
      "Innerhalb von 60 Sekunden eine echte Live-Auswertung meiner Webseite – kein 0815-Report, sondern konkrete Hebel zum Sofort-Umsetzen. Klare Empfehlung.",
    full: "Am meisten überzeugt hat mich, wie schnell und unkompliziert das Ganze abläuft. Innerhalb von 60 Sekunden hatte ich eine wirklich ausführliche Analyse meiner Webseite – und zwar nicht irgendein 0815-SEO-Report, sondern eine echte Live-Auswertung mit Score und 20+ konkreten Prüfpunkten. Besonders spannend fand ich den Fokus auf KI-Crawler wie GPTBot, ClaudeBot und PerplexityBot. Dass meine Seite überhaupt von ChatGPT & Co. „verstanden\" werden muss, war mir vorher in der Tiefe gar nicht so klar. Die drei konkreten Hebel zum Sofort-Umsetzen am Ende waren das Sahnehäubchen – kein leeres Marketing-Blabla, sondern Punkte, die ich direkt anpacken konnte.\n\nIch würde das ganze definitiv weiterempfehlen, weil das Tool kostenlos ist, keine nervige Anmeldung verlangt und trotzdem echten Mehrwert liefert. Man merkt, dass hier jemand am Werk ist, der sein Handwerk versteht und nicht nur Leads sammeln will. Gerade für kleine und mittelständische Unternehmen, die wissen wollen, wo sie in Sachen KI-Sichtbarkeit stehen, ist der Check Gold wert. Albert und sein Team von Wohlstandsmarketing denken die Zukunft des Marketings konsequent mit – nämlich, dass nicht mehr nur Google entscheidet, sondern zunehmend auch KI-Assistenten.\n\nWer im Jahr 2026 noch nicht weiß, ob seine Webseite von ChatGPT, Claude und Perplexity gefunden und empfohlen wird, sollte den Check unbedingt machen. 60 Sekunden investiert, viel gelernt – besser geht's eigentlich nicht. Danke für das tolle kostenlose Tool!",
    source: "google",
    featured: true,
  },
  {
    id: "robin-schaefer",
    name: "Robin Schäfer",
    rating: 5,
    date: "2026-01-26",
    short:
      "Klare, praxisnahe Tipps ohne Technik-Gelaber. 1–2 Wochen nach Fertigstellung deutlich mehr qualifizierte Leads, Umsatz spürbar gestiegen.",
    full: "Ich hab mich bei Albert von Wohlstandsmarketing beraten lassen, weil mein Marketing ausbaufähig war. Er hat mir in 2 Calls klare, praxisnahe Tipps gegeben ohne kompliziertes Technik Gelaber. 1-2 Wochen nach Fertigstellung seiner Arbeit hab ich deutlich mehr qualifizierte Leads gekriegt, und der Umsatz ist spürbar gestiegen. Die Kommunikation war locker und unkompliziert, er ist genau auf meine Situation eingegangen. Kein Verkaufsdruck, nur echte Hilfe. Kann ich jedem Selbstständigen empfehlen, der sein Online-Marketing pushen will. Danke, Albert!",
    source: "google",
    featured: true,
  },
  {
    id: "ernest-weber",
    name: "Ernest Weber",
    rating: 5,
    date: "2025-08-08",
    short: "Bin mehr als zufrieden mit seiner Arbeit. Unsere Zusammenarbeit war einwandfrei – klare Weiterempfehlung.",
    full: "Bin mehr als Zufrieden mit seiner Arbeit. Unsere Zusammenarbeit war einwandfrei! Kann ich nur weiterempfehlen!",
    source: "google",
    featured: false,
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);
