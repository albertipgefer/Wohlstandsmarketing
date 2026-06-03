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
    economy:
      "Bad Ems ist als UNESCO-Welterbe-Kurstadt geprägt von Gesundheits-, Reha- und Tourismusbetrieben, dazu kommt klassischer regionaler Mittelstand und Handwerk im Rhein-Lahn-Kreis. Als Kreisstadt ist die Stadt zugleich Verwaltungssitz. Die Wirtschaft ist kleinteilig und inhabergeführt — viele Betriebe leben von regionaler Stammkundschaft und Empfehlungen statt von planbarer Online-Nachfrage.",
    districts: ["Bad Ems-Spieß", "Nassau", "Lahnstein", "Nievern", "Fachbach", "Dausenau"],
    relatedIndustries: ["arztpraxen", "physiotherapie", "hotel", "handwerk", "pflegedienst"],
    localFaqs: [
      {
        q: "Betreut ihr Kunden in Bad Ems wirklich vor Ort?",
        a: "Ja — unser Firmensitz ist direkt in Bad Ems (Vor der Loos 4e). Kickoff, Strategie-Workshop und Content-Termine machen wir auf Wunsch persönlich vor Ort, die laufende Abstimmung remote. Kürzere Wege als jede Agentur aus Koblenz oder Frankfurt.",
      },
      {
        q: "Reicht der regionale Markt rund um Bad Ems für planbare Anfragen?",
        a: "Für lokal verankerte Betriebe ja. Bad Ems, Nassau, Lahnstein und der Rhein-Lahn-Kreis bilden einen klar abgegrenzten Suchraum — wer dort bei Google, Maps und in KI-Antworten oben steht, deckt die kaufstarke regionale Nachfrage ab, ohne gegen Großstadt-Wettbewerb anrennen zu müssen.",
      },
    ],
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
    economy:
      "Koblenz ist das wirtschaftliche Zentrum am Mittelrhein: ein Mix aus Tourismus rund um Deutsches Eck und Festung, starkem Handwerk, Maschinenbau und einem großen Verwaltungs- und Behördensektor (u.a. Bundeswehr und Wasserstraßenverwaltung). Geprägt ist die Stadt von vielen inhabergeführten Mittelständlern und Familienbetrieben. Der Handel konzentriert sich auf Löhrstraße und Forum Mittelrhein, das kaufkräftige Umland liefert zusätzliche Kundschaft.",
    districts: ["Ehrenbreitstein", "Lützel", "Metternich", "Güls", "Lahnstein", "Vallendar"],
    relatedIndustries: ["handwerk", "maschinenbau", "hotel", "steuerberater", "immobilienmakler", "logistik"],
    localFaqs: [
      {
        q: "Wie stark ist der Online-Wettbewerb für Mittelständler in Koblenz?",
        a: "Spürbar, aber schlagbar. Viele Koblenzer Betriebe haben noch veraltete oder gar keine durchdachte Webseite — wer technisch sauber aufgestellt ist und lokal auf 'Leistung + Koblenz' optimiert, überholt die meisten Wettbewerber am Mittelrhein schneller als in einer Großstadt wie Köln oder Frankfurt.",
      },
      {
        q: "Seid ihr aus der Region Koblenz?",
        a: "Ja, unser Sitz liegt in Bad Ems, rund 12 km von Koblenz. Wir kennen den Mittelrhein-Markt, die lokale Kundschaft und die Saisonalität des Tourismus aus erster Hand — und sind für Termine in Koblenz schnell vor Ort.",
      },
    ],
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
    economy:
      "Montabaur ist trotz überschaubarer Größe ein wirtschaftliches Schwergewicht im Westerwald: Sitz von 1&1 und IONOS, also einem der größten deutschen Digital- und Hosting-Standorte, dazu starke Finanzdienstleister und ein dichtes Handwerks- und Verwaltungsnetz. Der ICE-Halt bindet die Stadt direkt an Köln und Frankfurt an. Der lokale Mittelstand profitiert vom Kaufkraftzufluss, steht aber im Schatten der großen Marken.",
    districts: ["Horressen", "Elgendorf", "Wirzenborn", "Heiligenroth", "Wirges", "Höhr-Grenzhausen"],
    relatedIndustries: ["finanzberater", "steuerberater", "handwerk", "unternehmensberatung", "versicherungsmakler"],
    localFaqs: [
      {
        q: "Wie hebt sich ein lokaler Betrieb in Montabaur neben 1&1 und IONOS ab?",
        a: "Genau das ist der Hebel: Gegen die großen Digitalmarken kann ein lokaler Betrieb nicht über Budget gewinnen, aber über lokale Relevanz. Wer bei 'Leistung + Montabaur / Westerwald' sauber rankt und in KI-Antworten als regionaler Anbieter genannt wird, holt die Anfragen, die die Konzerne gar nicht bedienen.",
      },
      {
        q: "Ist der Westerwald als Markt groß genug?",
        a: "Für regional verankerte Betriebe ja. Montabaur, Wirges, Höhr-Grenzhausen und der Westerwaldkreis bilden einen klaren Einzugsraum mit solider Kaufkraft durch den Digital- und Finanzsektor — lokale Sichtbarkeit zahlt sich hier direkt in Anfragen aus.",
      },
    ],
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
    economy:
      "Frankfurt ist Deutschlands Finanzhauptstadt — Sitz von EZB, Deutscher Börse und zahllosen Banken, dazu starke Beratungs-, IT- und Logistikbranchen rund um den größten deutschen Flughafen und das Messegelände. Der Mittelstand bewegt sich hier in einem extrem dichten, kaufkraftstarken, aber auch teuren und wettbewerbsintensiven Markt. Sichtbarkeit ist Mangelware, weil viele um dieselben Keywords kämpfen.",
    districts: ["Sachsenhausen", "Bornheim", "Nordend", "Bockenheim", "Offenbach", "Bad Homburg"],
    relatedIndustries: ["finanzberater", "unternehmensberatung", "rechtsanwaelte", "steuerberater", "logistik", "hotel"],
    localFaqs: [
      {
        q: "Lohnt sich lokales SEO in einem so umkämpften Markt wie Frankfurt?",
        a: "Ja, aber die Strategie ist anders: In Frankfurt gewinnt man selten über breite Keywords, sondern über spezifische Nischen und Stadtteil-Bezug ('Leistung + Sachsenhausen / Nordend') plus KI-Sichtbarkeit, die kaum ein Wettbewerber bedient. Wer dort früh ist, sichert sich den Vorsprung, bevor der Kanal überlaufen ist.",
      },
      {
        q: "Betreut ihr Frankfurter Kunden remote oder vor Ort?",
        a: "Beides. Unser Sitz ist im Raum Koblenz, gut 100 km von Frankfurt — Kickoff und Strategie gern vor Ort, die laufende Arbeit effizient remote über Google Meet und WhatsApp. Für Frankfurter Mittelstand oft angenehmer und günstiger als eine City-Agentur.",
      },
    ],
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
    economy:
      "Bonn verbindet als ehemalige Bundeshauptstadt Verwaltung, Wissenschaft und Wirtschaft: Sitz von Deutsche Post DHL und Telekom, UN-Campus, zahlreicher Bundesbehörden und einer starken Forschungslandschaft. Daneben besteht ein solider Mittelstand aus IT-, Beratungs- und Gesundheitsbetrieben. Die Kaufkraft ist hoch, die Kundschaft anspruchsvoll und qualitätsbewusst.",
    districts: ["Bad Godesberg", "Beuel", "Poppelsdorf", "Endenich", "Königswinter", "Sankt Augustin"],
    relatedIndustries: ["unternehmensberatung", "rechtsanwaelte", "arztpraxen", "steuerberater", "immobilienmakler"],
    localFaqs: [
      {
        q: "Wie wichtig ist ein seriöser Auftritt für Bonner Unternehmen?",
        a: "Sehr. Bonns Kundschaft aus Verwaltung, Wissenschaft und gehobenem Mittelstand prüft Anbieter gründlich, bevor sie anfragt. Eine technisch saubere, vertrauenswürdige Webseite mit klaren E-E-A-T-Signalen entscheidet hier oft schon vor dem ersten Kontakt über die Anfrage.",
      },
      {
        q: "Seid ihr nah genug an Bonn für eine persönliche Betreuung?",
        a: "Ja, unser Sitz im Raum Koblenz liegt rund 70 km von Bonn entfernt — gut erreichbar für Vor-Ort-Termine im Rheinland, von Bad Godesberg bis Beuel. Die laufende Abstimmung läuft effizient remote.",
      },
    ],
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
    economy:
      "Köln ist Medien- und Versicherungsmetropole — Sitz großer TV- und Produktionsfirmen, führender Versicherer und eines lebendigen Handels-, Gastronomie- und Kreativsektors. Mit über einer Million Einwohnern ist der Markt riesig, aber auch einer der werbedichtesten Deutschlands. Der lokale Mittelstand muss sich gegen enorme Marken-Lautstärke behaupten.",
    districts: ["Ehrenfeld", "Lindenthal", "Nippes", "Deutz", "Mülheim", "Sülz"],
    relatedIndustries: ["versicherungsmakler", "restaurant", "hotel", "immobilienmakler", "rechtsanwaelte", "fitnessstudio"],
    localFaqs: [
      {
        q: "Wie wird ein Betrieb in Köln bei so viel Konkurrenz überhaupt gefunden?",
        a: "Über lokale Präzision statt Gießkanne. In Köln entscheidet der Veedel-Bezug: Wer auf Stadtteile wie Ehrenfeld, Nippes oder Sülz und konkrete Leistungen optimiert — plus KI-Sichtbarkeit, die kaum ein Kölner Wettbewerber bedient — wird gefunden, während andere im Marken-Lärm untergehen.",
      },
      {
        q: "Braucht man für den Kölner Markt eine Agentur vor Ort?",
        a: "Nicht zwingend. Der Großteil der Arbeit — Technik, SEO, KI-Sichtbarkeit, Reporting — läuft remote. Unser Sitz im Raum Koblenz ist rund 90 km entfernt, Vor-Ort-Termine im Rheinland sind problemlos möglich, ohne dass du Großstadt-Agenturpreise zahlst.",
      },
    ],
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
    economy:
      "Mainz hat sich vom Medien- und Weinstandort zum Biotech-Hub gewandelt: Mit BioNTech sitzt hier einer der bekanntesten Pharma-Konzerne der Welt, dazu ZDF und SWR, eine starke Verlagslandschaft und die Johannes-Gutenberg-Universität. Die rheinhessische Weinwirtschaft und Gastronomie prägen das Umland. Der Biotech-Boom hat Kaufkraft und Fachkräftezuzug spürbar erhöht.",
    districts: ["Mainz-Neustadt", "Gonsenheim", "Hechtsheim", "Weisenau", "Bretzenheim", "Ingelheim"],
    relatedIndustries: ["restaurant", "arztpraxen", "steuerberater", "hotel", "unternehmensberatung"],
    localFaqs: [
      {
        q: "Profitiert mein Betrieb vom Mainzer Biotech- und Fachkräftezuzug?",
        a: "Indirekt stark. Der BioNTech-Effekt bringt kaufkräftige Neubürger und Unternehmen nach Mainz und Rheinhessen — die suchen Anbieter fast ausschließlich online. Wer bei Google und in KI-Antworten zu 'Leistung + Mainz' sichtbar ist, fängt genau diese neue, recherchierende Nachfrage ab.",
      },
      {
        q: "Deckt ihr auch das rheinhessische Umland von Mainz ab?",
        a: "Ja. Mainz, Ingelheim, Bretzenheim und die umliegenden Weinorte bilden einen zusammenhängenden Suchraum — wir optimieren so, dass du nicht nur im Stadtkern, sondern in der ganzen Region als regionaler Anbieter erscheinst.",
      },
    ],
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
    economy:
      "Wiesbaden ist hessische Landeshauptstadt und traditionsreicher Versicherungs- und Verwaltungsstandort, ergänzt um IT-, Beratungs- und einen gehobenen Kur- und Tourismussektor. Die Stadt zählt zu den wohlhabendsten Deutschlands, die Kundschaft ist kaufkräftig und qualitätsorientiert. Der Mittelstand bewegt sich in einem professionellen, aber eher konservativ geprägten Marktumfeld.",
    districts: ["Biebrich", "Bierstadt", "Sonnenberg", "Schierstein", "Mainz-Kastel", "Taunusstein"],
    relatedIndustries: ["versicherungsmakler", "unternehmensberatung", "steuerberater", "immobilienmakler", "physiotherapie"],
    localFaqs: [
      {
        q: "Passt ein moderner Online-Auftritt zum eher konservativen Wiesbadener Markt?",
        a: "Gerade hier zahlt er sich aus. Wiesbadens kaufkräftige Kundschaft erwartet Seriosität — aber viele etablierte Betriebe wirken online veraltet. Ein technisch moderner, vertrauensvoller Auftritt hebt dich sofort von der Mehrheit ab, ohne unseriös zu wirken.",
      },
      {
        q: "Bedient ihr auch den Übergang nach Mainz und in den Rheingau?",
        a: "Ja. Wiesbaden, Mainz-Kastel und der Rheingau-Taunus-Kreis hängen wirtschaftlich eng zusammen — wir richten die lokale Sichtbarkeit so aus, dass du den gesamten relevanten Einzugsraum abdeckst, nicht nur die Kernstadt.",
      },
    ],
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
    economy:
      "Düsseldorf ist Mode-, Werbe- und Messestadt mit einer der höchsten Markendichten Deutschlands: internationale Modehäuser, Werbe- und Medienagenturen, Beratungen und ein starker Telekommunikationssektor. Die Königsallee steht für gehobenen Handel, das Messegelände zieht ganzjährig B2B-Publikum an. Der Mittelstand kämpft hier um Aufmerksamkeit in einem extrem designbewussten, kompetitiven Umfeld.",
    districts: ["Oberkassel", "Pempelfort", "Bilk", "Flingern", "Kaiserswerth", "Neuss"],
    relatedIndustries: ["unternehmensberatung", "immobilienmakler", "rechtsanwaelte", "kosmetikstudio", "restaurant"],
    localFaqs: [
      {
        q: "Reicht eine Standard-Webseite im designbewussten Düsseldorf?",
        a: "Nein — hier ist die Messlatte hoch. Düsseldorfer Kundschaft beurteilt Anbieter stark über den ersten optischen Eindruck. Ein hochwertiger, schneller und klar positionierter Auftritt ist die Eintrittskarte; kombiniert mit KI-Sichtbarkeit hebst du dich vom Werbe-Grundrauschen der Stadt ab.",
      },
      {
        q: "Arbeitet ihr für Düsseldorf trotz Sitz im Raum Koblenz?",
        a: "Ja, problemlos. Technik, SEO und KI-Sichtbarkeit laufen remote, für Strategie-Termine sind wir im Rheinland erreichbar. Du bekommst Großstadt-Qualität ohne die Kostenstruktur einer Düsseldorfer Agentur an der Kö.",
      },
    ],
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
    economy:
      "Trier ist Deutschlands älteste Stadt und lebt stark von Tourismus rund um Porta Nigra und Römerbauten, von der Mosel-Weinwirtschaft sowie von Handwerk, Universität und Verwaltung. Die Nähe zu Luxemburg bringt Kaufkraft und Grenzpendler. Der Mittelstand ist kleinteilig, regional verwurzelt und stark auf saisonale Tourismus- und Weinnachfrage ausgerichtet.",
    districts: ["Trier-West", "Ehrang", "Olewig", "Konz", "Schweich", "Saarburg"],
    relatedIndustries: ["hotel", "restaurant", "handwerk", "steuerberater", "immobilienmakler"],
    localFaqs: [
      {
        q: "Wie wichtig ist die Nähe zu Luxemburg für die Online-Sichtbarkeit?",
        a: "Relevant. Trier profitiert von luxemburgischer Kaufkraft und Grenzpendlern, die online nach Anbietern in der Region suchen. Wer für 'Leistung + Trier / Mosel' und im grenznahen Raum sichtbar ist, erreicht eine Nachfrage, die rein lokale Wettbewerber oft übersehen.",
      },
      {
        q: "Berücksichtigt ihr die Tourismus-Saisonalität in Trier?",
        a: "Ja. Gerade Hotellerie, Gastronomie und Weinbetriebe haben starke Saisonschwankungen — wir bauen Sichtbarkeit und Inhalte so auf, dass du in der Hauptsaison oben stehst und in der Nebensaison gezielt regionale Stammkundschaft ansprichst.",
      },
    ],
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
    economy:
      "Saarbrücken ist Industrie-, Universitäts- und Grenzstadt: traditionell geprägt von Automotive, Maschinenbau und Stahl, ergänzt um eine wachsende IT- und Informatik-Szene rund um die Universität und das DFKI. Die Lage an der französischen Grenze bringt grenzüberschreitenden Handel. Der saarländische Mittelstand ist bodenständig und im industriellen Bereich stark exportorientiert.",
    districts: ["St. Johann", "Dudweiler", "Burbach", "Alt-Saarbrücken", "Völklingen", "Sulzbach"],
    relatedIndustries: ["maschinenbau", "autohaus", "handwerk", "steuerberater", "logistik"],
    localFaqs: [
      {
        q: "Lohnt sich KI-Sichtbarkeit für einen Industriebetrieb im Saarland?",
        a: "Im B2B-Maschinenbau besonders. Technische Einkäufer recherchieren zunehmend über KI und Google, bevor sie anfragen — und im Saarland ist dieser Kanal kaum besetzt. Wer als erster sauber strukturiert auftaucht, wird auf die Shortlist gesetzt, während der Wettbewerb noch auf Empfehlungen vertraut.",
      },
      {
        q: "Spielt die Grenznähe zu Frankreich für die Sichtbarkeit eine Rolle?",
        a: "Je nach Geschäftsmodell ja. Saarbrücken, Völklingen und das Umland sind eng mit dem grenznahen Raum verflochten — wir richten die lokale Strategie auf den tatsächlichen Einzugsraum aus, statt nur auf die Stadtgrenze.",
      },
    ],
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
    economy:
      "Mannheim ist ein Industrie- und Mittelstands-Schwergewicht in der Metropolregion Rhein-Neckar: Sitz großer Maschinenbauer und Chemie-/Pharmaunternehmen (u.a. im Umfeld der BASF in Ludwigshafen), dazu starke Logistik dank Rheinhafen und ein dichtes IT- und Gründernetz. Die quadratische Innenstadt bündelt Handel und Dienstleistung. Der Mittelstand ist technisch versiert und B2B-lastig.",
    districts: ["Neckarstadt", "Lindenhof", "Käfertal", "Feudenheim", "Ludwigshafen", "Heidelberg"],
    relatedIndustries: ["maschinenbau", "logistik", "handwerk", "steuerberater", "immobilienmakler"],
    localFaqs: [
      {
        q: "Wie hebt sich ein Rhein-Neckar-Betrieb online ab?",
        a: "Über Spezialisierung und technische Klarheit. Die Region Rhein-Neckar ist B2B- und industriestark — wer seine Nische sauber besetzt, auf 'Leistung + Mannheim / Rhein-Neckar' optimiert und in KI-Antworten als Fachanbieter erscheint, gewinnt qualifizierte Anfragen, die per Empfehlung allein nicht kommen.",
      },
      {
        q: "Deckt ihr die ganze Metropolregion Rhein-Neckar ab?",
        a: "Ja. Mannheim, Ludwigshafen und Heidelberg bilden einen zusammenhängenden Wirtschaftsraum — wir bauen die Sichtbarkeit so, dass du über die Stadtgrenze hinaus in der gesamten Metropolregion gefunden wirst.",
      },
    ],
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
    economy:
      "Aachen ist Forschungs- und Technologiestandort ersten Ranges: Die RWTH und die FH ziehen Hightech-Unternehmen, Ingenieurbüros und Tech-Startups an, der Aachener Raum gilt als einer der innovationsstärksten Deutschlands. Daneben besteht klassischer Mittelstand aus Handwerk, Gesundheit und Handel. Die Lage im Dreiländereck zu Belgien und den Niederlanden prägt Wirtschaft und Kundschaft.",
    districts: ["Burtscheid", "Brand", "Laurensberg", "Haaren", "Würselen", "Herzogenrath"],
    relatedIndustries: ["maschinenbau", "arztpraxen", "handwerk", "ingenieurbuero", "zahnaerzte"],
    localFaqs: [
      {
        q: "Wie relevant ist KI-Sichtbarkeit in einer Tech-Stadt wie Aachen?",
        a: "Sehr — und zugleich überraschend offen. In Aachens RWTH-geprägtem Umfeld nutzen Entscheider und Ingenieure KI-Tools selbstverständlich zur Recherche. Trotzdem ist der Kanal bei lokalen Anbietern kaum besetzt; wer früh strukturiert sichtbar ist, sichert sich einen echten Vorsprung.",
      },
      {
        q: "Spielt das Dreiländereck für die Sichtbarkeit eine Rolle?",
        a: "Je nach Zielgruppe ja. Aachen, Würselen und Herzogenrath grenzen direkt an Belgien und die Niederlande — wir stimmen die lokale Strategie auf deinen tatsächlichen Einzugsraum ab, inklusive des grenznahen Umlands, wo es für dein Geschäft relevant ist.",
      },
    ],
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
