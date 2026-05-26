import type { City } from "./types";

export const cities: City[] = [
  {
    slug: "bad-ems",
    name: "Bad Ems",
    state: "Rheinland-Pfalz",
    region: "Rhein-Lahn-Kreis",
    postalCode: "56130",
    geo: { lat: 50.3361, lng: 7.7148 },
    distanceFromHq: 0,
    landmarks: ["Kurpark", "Marmorsaal", "Lahn-Ufer"],
    industries: [
      "Gesundheit & Kur",
      "Tourismus",
      "Handwerk",
      "Hotellerie",
      "Dienstleistung",
    ],
    neighbours: ["koblenz", "montabaur"],
    description:
      "Webdesign + KI-Sichtbarkeit in Bad Ems — direkt aus dem Rhein-Lahn-Kreis. Für lokalen Mittelstand, der auf Google und ChatGPT empfohlen werden will.",
    intro:
      "Wohlstandsmarketing ist hier zu Hause. Unser Sitz liegt direkt in Bad Ems — wir kennen den lokalen Markt, die Kurstadt-Saisonalität und die Bedürfnisse von Gesundheits- und Tourismusbetrieben aus erster Hand.",
  },
  {
    slug: "koblenz",
    name: "Koblenz",
    state: "Rheinland-Pfalz",
    region: "Mittelrhein",
    postalCode: "56068",
    geo: { lat: 50.3569, lng: 7.589 },
    distanceFromHq: 12,
    landmarks: [
      "Deutsches Eck",
      "Festung Ehrenbreitstein",
      "Schloss Stolzenfels",
    ],
    industries: [
      "Handwerk",
      "Tourismus",
      "Maschinenbau",
      "Verwaltung",
      "Logistik",
    ],
    neighbours: ["bad-ems", "montabaur", "bonn"],
    description:
      "Webdesign + KI-Sichtbarkeit in Koblenz — für Mittelstand am Mittelrhein. In 90 Tagen auf Google, ChatGPT und Perplexity empfohlen.",
    intro:
      "Im Schatten der Festung Ehrenbreitstein arbeiten wir für Koblenzer Mittelstand — mit persönlicher Betreuung und tiefem Verständnis für den lokalen Markt.",
  },
  {
    slug: "montabaur",
    name: "Montabaur",
    state: "Rheinland-Pfalz",
    region: "Westerwald",
    postalCode: "56410",
    geo: { lat: 50.4376, lng: 7.8285 },
    distanceFromHq: 35,
    landmarks: ["Schloss Montabaur", "Großer Markt", "Westerwald-Bahn"],
    industries: [
      "Digitalwirtschaft (1&1, IONOS)",
      "Finanzdienstleistung",
      "Handwerk",
      "Verwaltung",
      "Bildung",
    ],
    neighbours: ["bad-ems", "koblenz", "frankfurt"],
    description:
      "Webdesign + KI-Sichtbarkeit in Montabaur — für Westerwälder Mittelstand. 90-Tage-Programm für planbare Sichtbarkeit auf Google und KI.",
    intro:
      "Montabaur ist nicht nur Schloss-Stadt, sondern auch Heimat starker Digital- und Finanzunternehmen. Wir helfen lokalem Mittelstand, neben den großen Marken sichtbar zu bleiben — mit eigenständigem Auftritt und KI-Empfehlbarkeit.",
  },
  {
    slug: "frankfurt",
    name: "Frankfurt",
    state: "Hessen",
    region: "Rhein-Main",
    postalCode: "60311",
    geo: { lat: 50.1109, lng: 8.6821 },
    distanceFromHq: 105,
    landmarks: ["Römerberg", "Mainufer", "Skyline"],
    industries: [
      "Finanzwesen",
      "IT & Beratung",
      "Logistik",
      "Tourismus",
      "Handel",
    ],
    neighbours: ["montabaur", "koblenz", "bonn"],
    description:
      "Webdesign + KI-Sichtbarkeit in Frankfurt — für Rhein-Main-Mittelstand. Webseiten, die auch in ChatGPT und Perplexity empfohlen werden.",
    intro:
      "Im Rhein-Main-Gebiet ist die Konkurrenz dichter als anderswo. Wir bauen für Frankfurter Mittelstand Auftritte, die nicht zwischen Banken-Brands und Großkonzernen untergehen — sondern in der lokalen KI-Antwort genannt werden.",
  },
  {
    slug: "bonn",
    name: "Bonn",
    state: "Nordrhein-Westfalen",
    region: "Rheinland",
    postalCode: "53111",
    geo: { lat: 50.7374, lng: 7.0982 },
    distanceFromHq: 70,
    landmarks: ["Beethoven-Haus", "Rheinaue", "Bonner Münster"],
    industries: [
      "Wissenschaft & UN",
      "IT",
      "Verwaltung",
      "Telekommunikation",
      "Bildung",
    ],
    neighbours: ["koeln", "koblenz", "frankfurt"],
    description:
      "Webdesign + KI-Sichtbarkeit in Bonn — für rheinländischen Mittelstand. KI-empfehlbare Webseiten in 90 Tagen.",
    intro:
      "Bonn ist Wissens- und Wirtschaftsstandort zugleich. Wir arbeiten für Bonner Mittelstand, der in einer Stadt mit Telekom-HQ und UN-Campus sichtbar bleiben will — mit klarem Auftritt und KI-Empfehlbarkeit.",
  },
  {
    slug: "koeln",
    name: "Köln",
    state: "Nordrhein-Westfalen",
    region: "Rheinland",
    postalCode: "50667",
    geo: { lat: 50.9375, lng: 6.9603 },
    distanceFromHq: 95,
    landmarks: ["Kölner Dom", "Hohenzollernbrücke", "Rheinauhafen"],
    industries: [
      "Medien",
      "Versicherungen",
      "IT",
      "Handel",
      "Tourismus",
      "Gastronomie",
    ],
    neighbours: ["bonn", "koblenz", "frankfurt"],
    description:
      "Webdesign + KI-Sichtbarkeit in Köln — für rheinischen Mittelstand. In 90 Tagen sichtbar auf Google, ChatGPT und Perplexity.",
    intro:
      "Köln ist Medien-, Versicherungs- und Handelsmetropole. Wir bauen für Kölner Mittelstand Webseiten, die in einem der dichtesten Werbemärkte Deutschlands nicht untergehen — sondern in KI-Antworten als erste Wahl auftauchen.",
  },
  {
    slug: "mainz",
    name: "Mainz",
    state: "Rheinland-Pfalz",
    region: "Rhein-Main",
    postalCode: "55116",
    geo: { lat: 49.9929, lng: 8.2473 },
    distanceFromHq: 75,
    landmarks: ["Mainzer Dom", "Rheinufer", "Gutenberg-Museum"],
    industries: [
      "Medien (ZDF, SWR)",
      "Wein & Gastronomie",
      "Pharma & Biotech",
      "Verlagswesen",
      "Universität",
    ],
    neighbours: ["wiesbaden", "frankfurt", "koblenz"],
    description:
      "Webdesign + KI-Sichtbarkeit in Mainz — für rheinhessischen Mittelstand. 90 Tage zu Sichtbarkeit auf Google, ChatGPT und Perplexity.",
    intro:
      "Mainz ist Medienstadt, Weinmetropole und Biotech-Hub zugleich. Wir bauen für Mainzer Mittelstand Webseiten, die in diesem dichten Marktumfeld eigenständig wirken — und in KI-Antworten zuerst genannt werden.",
  },
  {
    slug: "wiesbaden",
    name: "Wiesbaden",
    state: "Hessen",
    region: "Rhein-Main",
    postalCode: "65183",
    geo: { lat: 50.0826, lng: 8.2493 },
    distanceFromHq: 78,
    landmarks: ["Kurhaus", "Marktkirche", "Wilhelmstraße"],
    industries: [
      "Versicherungen",
      "IT & Beratung",
      "Tourismus & Kur",
      "Verwaltung",
      "Mittelstand",
    ],
    neighbours: ["mainz", "frankfurt", "koblenz"],
    description:
      "Webdesign + KI-Sichtbarkeit in Wiesbaden — für hessischen Mittelstand. KI-empfehlbare Webseiten in 90 Tagen.",
    intro:
      "Wiesbaden ist hessische Landeshauptstadt mit starker Versicherungs- und IT-Branche. Wir helfen Wiesbadener Mittelstand, in einem stark professionalisierten Markt mit klarem Auftritt und KI-Sichtbarkeit aufzufallen.",
  },
  {
    slug: "duesseldorf",
    name: "Düsseldorf",
    state: "Nordrhein-Westfalen",
    region: "Rheinland",
    postalCode: "40213",
    geo: { lat: 51.2277, lng: 6.7735 },
    distanceFromHq: 130,
    landmarks: ["Königsallee", "Rheinturm", "Altstadt"],
    industries: [
      "Mode & Handel",
      "Beratung",
      "Werbung & Medien",
      "Telekommunikation",
      "Messe & Events",
    ],
    neighbours: ["koeln", "bonn", "aachen"],
    description:
      "Webdesign + KI-Sichtbarkeit in Düsseldorf — für rheinländischen Mittelstand. In 90 Tagen sichtbar auf Google, ChatGPT und Perplexity.",
    intro:
      "Düsseldorf ist Mode-, Werbe- und Messestadt mit hoher Marken-Dichte. Wir bauen für Düsseldorfer Mittelstand Webseiten, die sich vom Marken-Lärm abheben — und in KI-Antworten als Empfehlung herausstechen.",
  },
  {
    slug: "trier",
    name: "Trier",
    state: "Rheinland-Pfalz",
    region: "Mosel",
    postalCode: "54290",
    geo: { lat: 49.7596, lng: 6.6439 },
    distanceFromHq: 95,
    landmarks: ["Porta Nigra", "Hauptmarkt", "Konstantinbasilika"],
    industries: [
      "Tourismus",
      "Weinwirtschaft",
      "Handwerk",
      "Universität",
      "Verwaltung",
    ],
    neighbours: ["saarbruecken", "koblenz", "bad-ems"],
    description:
      "Webdesign + KI-Sichtbarkeit in Trier — für moselländischen Mittelstand. 90 Tage zu planbarer Sichtbarkeit auf Google und KI.",
    intro:
      "Trier ist Deutschlands älteste Stadt mit starker Tourismus- und Weinwirtschaft. Wir helfen Trierer Mittelstand, regionale Stärke mit moderner Sichtbarkeit zu verbinden — von Google Maps bis ChatGPT-Empfehlung.",
  },
  {
    slug: "saarbruecken",
    name: "Saarbrücken",
    state: "Saarland",
    region: "Saarland",
    postalCode: "66111",
    geo: { lat: 49.2401, lng: 6.9969 },
    distanceFromHq: 145,
    landmarks: ["Saarbrücker Schloss", "St. Johanner Markt", "Saarufer"],
    industries: [
      "Automotive",
      "Maschinenbau",
      "IT",
      "Tourismus",
      "Universität",
    ],
    neighbours: ["trier", "mannheim", "koblenz"],
    description:
      "Webdesign + KI-Sichtbarkeit in Saarbrücken — für saarländischen Mittelstand. KI-empfehlbare Webseiten in 90 Tagen.",
    intro:
      "Saarbrücken ist Industrie-, Universitäts- und Grenzstadt zugleich. Wir bauen für saarländischen Mittelstand Webseiten, die regional verankert sind und gleichzeitig im DACH-Markt sichtbar bleiben — auch in KI-Antworten.",
  },
  {
    slug: "mannheim",
    name: "Mannheim",
    state: "Baden-Württemberg",
    region: "Rhein-Neckar",
    postalCode: "68159",
    geo: { lat: 49.4875, lng: 8.466 },
    distanceFromHq: 130,
    landmarks: ["Wasserturm", "Schloss Mannheim", "Quadrate"],
    industries: [
      "Maschinenbau",
      "Chemie & Pharma",
      "Logistik",
      "IT",
      "Mittelstand",
    ],
    neighbours: ["saarbruecken", "frankfurt", "koblenz"],
    description:
      "Webdesign + KI-Sichtbarkeit in Mannheim — für Rhein-Neckar-Mittelstand. In 90 Tagen auf Google, ChatGPT und Perplexity empfohlen.",
    intro:
      "Mannheim ist ein Industrie- und Mittelstands-Schwergewicht in der Rhein-Neckar-Region. Wir bauen für Mannheimer Unternehmen Webseiten, die technisches Können und Sichtbarkeit auf KI-Plattformen vereinen.",
  },
  {
    slug: "aachen",
    name: "Aachen",
    state: "Nordrhein-Westfalen",
    region: "Rheinland",
    postalCode: "52062",
    geo: { lat: 50.7753, lng: 6.0839 },
    distanceFromHq: 140,
    landmarks: ["Aachener Dom", "Rathaus", "Lousberg"],
    industries: [
      "Forschung & RWTH",
      "Maschinenbau",
      "IT & Tech",
      "Gesundheit",
      "Handwerk",
    ],
    neighbours: ["koeln", "duesseldorf", "bonn"],
    description:
      "Webdesign + KI-Sichtbarkeit in Aachen — für Mittelstand im Dreiländereck. 90 Tage zu KI-Empfehlbarkeit auf Google und ChatGPT.",
    intro:
      "Aachen ist Forschungs- und Tech-Standort mit RWTH-Nähe. Wir helfen Aachener Mittelstand, technische Expertise sichtbar zu machen — in lokaler Suche und in KI-Antworten von ChatGPT bis Perplexity.",
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug) ?? null;
}

export function getNeighbourCities(slug: string) {
  const city = getCity(slug);
  if (!city) return [];
  // Definierte Nachbarn zuerst, dann alle übrigen Städte (außer aktueller).
  // Resultat: alle 5 anderen Städte werden auf jeder Stadt-Page verlinkt,
  // mit den direkten Nachbarn vorne — für maximale interne Verlinkung.
  const direct = city.neighbours
    .map((n) => getCity(n))
    .filter((c): c is City => c !== null);
  const directSlugs = new Set(direct.map((c) => c.slug));
  const rest = cities.filter(
    (c) => c.slug !== slug && !directSlugs.has(c.slug),
  );
  return [...direct, ...rest];
}
