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
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug) ?? null;
}

export function getNeighbourCities(slug: string) {
  const city = getCity(slug);
  if (!city) return [];
  return city.neighbours
    .map((n) => getCity(n))
    .filter((c): c is City => c !== null);
}
