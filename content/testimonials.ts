/**
 * Zentrale Testimonial-Datenquelle.
 *
 * Aufbau:
 * - `short`: gekürztes Zitat für Above-the-Fold / Cards (max ~140 Zeichen)
 * - `full`: kompletter Review-Text (für ausführliche Bewertungs-Sektion)
 * - `featured: true` = wird in der kurzen Variante (Hero/Trust-Row) angezeigt
 * - `source`: "google" oder "trustpilot" — bestimmt Logo, Badge-Label und Link-Ziel
 *
 * Wenn neue Reviews kommen → einfach hier eintragen, Komponenten ziehen
 * sich automatisch die Daten + zeigen das passende Plattform-Badge.
 */

export type TestimonialSource = "google" | "trustpilot";

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO oder freier Text
  short: string;
  full: string;
  source: TestimonialSource;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "dirk-bender",
    name: "Dirk Bender",
    rating: 5,
    date: "2026-06-09",
    short:
      "Vollumfängliche Empfehlung — sowohl im Social-Media-Bereich als auch bei der Erstellung einer hochwertigen Website hat uns Wohlstandsmarketing überzeugt.",
    full: "Wir können die Firma Wohlstandsmarketing vollumfänglich empfehlen. Sowohl im Social Media Bereich als auch bei der Erstellung einer hochwertigen Website, haben Sie uns überzeugt.",
    source: "google",
    featured: false,
  },
  {
    id: "simeon-giesbrecht",
    name: "Simeon Giesbrecht",
    rating: 5,
    date: "2026-06-04",
    short:
      "Den Webseiten-Test von Albert getestet — echt gut und aufschlussreich. Hat mir geholfen, zu sehen, wo noch Verbesserungsbedarf ist.",
    full: "Ich hab den Webseiten-Test von Albert getestet, und der war wirklich echt gut und aufschlussreich und hat mir auch dabei geholfen, zu sehen, wo noch Verbesserungsbedarf ist.",
    source: "trustpilot",
    featured: false,
  },
  {
    id: "maximilian-grabsch",
    name: "Maximilian Grabsch",
    rating: 5,
    date: "2026-05-27",
    short:
      "Innerhalb von 30 Sekunden hatte ich eine ausführliche Auswertung meiner Seite — kann ich jedem für einen kostenlosen Quick-Check empfehlen.",
    full: "Ich habe das Kostenlose Website Tool von Albert getestet und bin überrascht wie gut es mich überzeugt hat.\n\nInnerhalb von 30 Sekunden wurde meine Seite aktualisiert und es wurde mir sofort angezeigt, wo ich Verbesserungspotenzial habe.\n\nKann ich nur jedem empfehlen, der mal einen kurzen kostenlosen Quick-Check möchte.",
    source: "trustpilot",
    featured: true,
  },
  {
    id: "anton-akulenko",
    name: "Anton Akulenko",
    rating: 5,
    date: "2026-05-26",
    short:
      "Die Zusammenarbeit hat mein Unternehmen wirklich nach vorne gebracht — mein Umsatz hat sich spürbar erhöht, klare Weiterempfehlung.",
    full: "Absolute Empfehlung für Albert und Wohlstands-Marketing!\n\nDie Zusammenarbeit mit Albert hat mein Unternehmen wirklich nach vorne gebracht – dafür möchte ich mich an dieser Stelle herzlich bedanken. Man merkt sofort, dass er in Sachen Marketing und SEO-Optimierung richtig tief drinsteckt und weiß, wovon er spricht.\n\nSeit wir zusammenarbeiten, hat sich mein Umsatz spürbar erhöht. Die Webseiten, die Albert erstellt, sehen nicht nur klasse aus, sondern funktionieren auch technisch einwandfrei. Besonders sein Performance-Marketing kann ich uneingeschränkt weiterempfehlen – hier zeigt sich, dass er nicht nur Ahnung hat, sondern auch echte Ergebnisse liefert.\n\nDanke, Albert, für deine Expertise und die super Zusammenarbeit! Klare Weiterempfehlung.",
    source: "trustpilot",
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
    id: "niklas-schwate",
    name: "Niklas Schwate",
    rating: 5,
    date: "2026-05-31",
    short:
      "Echtes Interesse durch Rückfragen und umfangreiche Antworten — sehr viel Mehrwert und Expertise erhalten. Man merkt: Albert weiß, wovon er spricht.",
    full: "Echtes Interesse zeigt sich durch Rückfragen und umfangreiche Antworten. Genau das habe ich hier bekommen.\n\nIch habe sehr viel Mehrwert und Expertise for free erhalten, egal ob im Bereich Ads oder anderen Themen.\n\nMan erkennt direkt, dass Albert weiß wovon er spricht!\n\nDanke nochmal vielmals🙏",
    source: "google",
    featured: false,
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
    featured: false,
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

/**
 * Öffentliche Profil-URLs der Bewertungsplattformen.
 * Werden in Source-Badges und Trust-Headern verlinkt.
 */
export const REVIEW_PROFILE_URLS: Record<TestimonialSource, string> = {
  google:
    "https://www.google.com/search?sca_esv=68cd59949303f16d&q=Wohlstandsmarketing&stick=H4sIAAAAAAAAAONgU1I1qDAxMk9ONU20MDE3TDa0SE6yMqhIS002SklJNk4zTE5KMbNMXMQqHJ6fkVNckpiXUpybWJSdWpKZlw4AkM2PtD8AAAA&mat=Cae5S3-sIDvp&ved=2ahUKEwiD16vGqdaUAxV2ffUHHXyqDGYQrMcEegQIBxAC#mpd=~16806062359705270695/customers/reviews",
  trustpilot: "https://de.trustpilot.com/review/ipgefer-performance.de",
};

export const SOURCE_LABELS: Record<TestimonialSource, string> = {
  google: "Google",
  trustpilot: "Trustpilot",
};
