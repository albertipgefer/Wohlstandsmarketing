import type { IndustryServiceContent } from "./types";

export type { IndustryServiceContent } from "./types";

/**
 * Kombi-einzigartiger Content je Branche×Service.
 * Key-Format: "{brancheSlug}/{serviceSlug}".
 *
 * Nur Kombis, die hier einen Eintrag haben, gelten als "content-vollständig"
 * und werden in die Sitemap aufgenommen (siehe app/sitemap.ts). Kombis ohne
 * Eintrag rendern den generischen Fallback und bleiben aus dem Index.
 */
const industryServiceContent: Record<string, IndustryServiceContent> = {
  'handwerk/unternehmenswebsite': {
    uniqueAngle: `Als Handwerker hast du vielleicht genug Aufträge — aber kannst du deinen Betrieb auch einem Kunden erklären, der dich nicht kennt? Eine Unternehmenswebsite ist dein digitales Aushängeschild: Sie zeigt deine Gewerke, dein Team, deine Referenz-Projekte und macht sofort klar, warum Kunden in deiner Region zu dir und nicht zum Wettbewerber anrufen. Anfragen kommen über ein klares Formular rein, auch wenn du gerade auf dem Dach oder im Keller bist. Gleichzeitig findest du über eine professionelle Präsenz leichter Auszubildende und Gesellen — denn wer einen Betrieb sucht, googelt ihn zuerst.`,
    deliverables: [
      `Gewerke-Seiten für deine wichtigsten Leistungen (z. B. Heizung, Sanitär, Dach) mit klarer Beschreibung und Anfrage-CTA`,
      `Referenz-Galerie mit abgeschlossenen Projekten und Kundenstimmen aus deiner Region`,
      `Karriere-Bereich für Bewerbungen — strukturierte Anfrage statt E-Mail ins Nirgendwo`,
    ],
    faqs: [
      {
        q: `Brauche ich eine Unternehmenswebsite, wenn mein Auftragsbuch gerade voll ist?`,
        a: `Genau dann ist der richtige Zeitpunkt. Auftragsbücher schwanken — und wer erst eine Webseite baut, wenn es ruhig wird, hat Monate Vorlaufzeit verloren. Außerdem hilft eine professionelle Webseite dir jetzt schon: bei der Mitarbeitersuche, bei der Auswahl der Aufträge (du kannst wählerischer werden) und beim Vertrauen neuer Kunden, die noch nie von dir gehört haben.`,
      },
      {
        q: `Wie zeige ich auf der Webseite, was ich konkret mache?`,
        a: `Wir strukturieren deine Seite nach Gewerken und Leistungen — nicht nach Allgemeinbegriffen. Statt „wir machen alles" bekommt jede Leistung eine eigene Seite mit Beschreibung, Vorher-Nachher-Fotos und einer klaren Anfrage-Möglichkeit. So findet jemand, der gezielt nach „Badsanierung [Stadt]" sucht, direkt das Richtige.`,
      },
    ],
  },

  'handwerk/landingpage': {
    uniqueAngle: `Nicht jeder Handwerksbetrieb braucht sofort eine vollständige Webseite — manchmal reicht eine einzige, klar fokussierte Seite, um ein bestimmtes Gewerk oder eine Kampagne zum Laufen zu bringen. Eine Landingpage konzentriert sich auf genau einen Auftrag: der Besucher kommt, versteht sofort was du anbietest, und trägt sich ein. Kein Klicken durch fünf Unterseiten, kein Suchen nach der Telefonnummer. Das ist ideal, wenn du einen Notdienst anbieten, ein neues Gewerk testen oder in einem neuen Einzugsgebiet Fuß fassen willst — ohne gleich alles neu zu bauen.`,
    deliverables: [
      `Eigenständige Seite ohne Navigation oder weiterführende Links — ausschließlich auf eine einzige Handlung optimiert (z. B. „Rohrreinigung [Stadt]" oder „Heizung Notdienst"): Besucher sehen das Angebot, füllen das Formular aus — fertig. Kein Absprung, kein Suchen. Anfrage-Rate ist direkt messbar.`,
      `Klare Vertrauenssignale: Betriebslogo, Einsatzgebiet, Reaktionszeit, Bewertungen — alles auf einen Blick`,
      `Auf Wunsch ausbaubar zur vollständigen Unternehmenswebsite — kein Wegwerfen, nur Erweitern`,
    ],
    faqs: [
      {
        q: `Wann macht eine Landingpage für meinen Handwerksbetrieb mehr Sinn als eine ganze Webseite?`,
        a: `Immer dann, wenn du schnell und gezielt testen willst: ein neues Einzugsgebiet, einen Notdienst oder ein Gewerk, das du gerade stärker ausbauen möchtest. Eine Landingpage ist günstiger, schneller live und hat oft eine höhere Anfrage-Quote als eine vielgliedrige Webseite — weil sie nichts ablenkt. Später kann sie jederzeit zur vollen Webseite ausgebaut werden.`,
      },
      {
        q: `Hilft eine Landingpage auch dabei, bei Google gefunden zu werden?`,
        a: `Ja — wenn sie sauber auf den richtigen Begriff optimiert ist. Wir bauen die Seite von Anfang an mit dem passenden Keyword im Fokus (z. B. „Elektriker Notdienst [Stadt]") und technisch so, dass Google sie korrekt einordnen kann. Der entscheidende Unterschied zur Unternehmenswebsite: Jeder Besucher, der ankommt, sieht nur ein Ziel — und du siehst direkt, wie viele Anfragen diese eine Seite bringt. Für stark umkämpfte Begriffe ergänzen wir mit SEO — aber für viele Nischen-Anfragen reicht eine saubere Landingpage allein.`,
      },
    ],
  },

  'handwerk/relaunch': {
    uniqueAngle: `Viele Handwerksbetriebe haben eine Webseite — aber sie lädt langsam, sieht auf dem Handy nicht gut aus und hat seit Jahren keinen Auftrag mehr gebracht. Das kostet dich täglich Anfragen, ohne dass du es merkst, weil Besucher einfach weitergehen. Ein Relaunch macht aus dieser Last ein Werkzeug: modernes Design, schnelle Ladezeiten, klare Anfrage-Strecken — und das alles, ohne deine bestehenden Inhalte und Empfehlungslinks ins Leere laufen zu lassen. Wer dich bis jetzt über deine alte Seite gefunden hat, findet dich danach genauso — nur macht die neue Seite deutlich mehr draus.`,
    deliverables: [
      `Audit der alten Seite: Was kostet dich gerade Anfragen — Ladezeit, Struktur, Mobile-Darstellung, fehlende CTAs`,
      `Sauberes Redirect-Konzept, das alle bestehenden Verlinkungen und Google-Rankings auf die neue Seite überträgt`,
      `Modernisiertes Design mit deinen echten Projektfotos und einer klaren Anfrage-Strecke pro Gewerk`,
    ],
    faqs: [
      {
        q: `Verliere ich meine bisherigen Google-Rankings, wenn ich die Seite neu mache?`,
        a: `Nein — vorausgesetzt, der Relaunch wird sauber umgesetzt. Wir setzen ein Redirect-Konzept um, das alle alten URLs auf die neuen weiterleitet, relevante Inhalte übernehmen wir und passen sie auf. Richtig gemacht, verbessert ein Relaunch deine Sichtbarkeit deutlich, statt sie zu gefährden. Wir haben das Ergebnis im Blick, nicht nur das neue Design.`,
      },
      {
        q: `Meine alte Seite hat mir nie viel gebracht — lohnt sich der Aufwand überhaupt?`,
        a: `Genau das ist der Kern: Eine alte Seite, die nicht konvertiert, ist kein Vorteil — sie ist eine Bremse. Wenn Besucher kommen, aber nichts tun, liegt es meist an fehlenden Anfrage-Strecken, unklarer Botschaft oder schlechter Darstellung auf dem Handy. Das beheben wir gezielt. Die Frage ist nicht, ob ein Relaunch lohnt, sondern wie viele Aufträge dir die alte Seite gerade kostet.`,
      },
    ],
  },

  'handwerk/ki-sichtbarkeit': {
    uniqueAngle: `Immer mehr Leute fragen nicht mehr Google, sondern ChatGPT oder Perplexity: „Welcher Dachdecker in Koblenz ist empfehlenswert?" oder „Wer macht Badsanierungen im Raum Bonn?" — und die KI antwortet mit konkreten Betrieben. Wer dort nicht auftaucht, existiert für diese Kunden nicht. KI-Sichtbarkeit für Handwerksbetriebe bedeutet: Wir bauen das digitale Profil deines Betriebs so auf, dass ChatGPT, Perplexity und die Google AI Overviews deinen Betrieb kennen, verstehen und als vertrauenswürdigen Anbieter in deiner Region nennen. Das ist der Kanal, den deine Mitbewerber noch nicht bespielen.`,
    deliverables: [
      `Lokales Entity-Profil für deinen Betrieb: schema.org-Markup für Gewerke, Einsatzgebiet und Kontakt — so lesen KI-Systeme, wer du bist und was du machst`,
      `Answer Engine Optimization für häufige Handwerker-Fragen in deiner Region (z. B. „Heizung reparieren [Stadt]" — als zitierfähige Antwort auf deiner Webseite)`,
      `llms.txt-Konfiguration und KI-Crawler-Freigabe für GPTBot, ClaudeBot und PerplexityBot`,
    ],
    faqs: [
      {
        q: `Fragt wirklich jemand ChatGPT nach einem Handwerker?`,
        a: `Ja — und es wird mehr. Gerade die jüngere Generation greift direkt zur KI, wenn sie einen Handwerker sucht. Die KI-Suche wächst rasant, und wer jetzt sein Profil aufbaut, hat einen Vorsprung vor allen Betrieben, die das verschlafen. Die Anfragen können dabei qualifizierter sein als viele klassische Google-Klicks — weil die KI bereits eine Empfehlung ausspricht und der Nutzer gezielt mit Kaufabsicht klickt, statt noch mehrere Ergebnisse zu vergleichen.`,
      },
      {
        q: `Ist KI-Sichtbarkeit etwas anderes als SEO?`,
        a: `Ja, aber beides greift ineinander. SEO sorgt dafür, dass du bei Google-Suchen gefunden wirst. KI-Sichtbarkeit sorgt dafür, dass ChatGPT, Perplexity und Google AI Overviews deinen Betrieb in ihren Antworten nennen. Viele Signale wirken auf beides: Schema-Markup, saubere Inhalte, klares lokales Profil. Gemeinsam sind sie deutlich stärker als jedes einzeln.`,
      },
    ],
  },

  'handwerk/seo': {
    uniqueAngle: `Wer einen Handwerker braucht, sucht selten nach Markennamen — sondern nach „Heizung reparieren [Stadt]” oder „Dachdecker in der Nähe”. Genau diese lokalen Suchanfragen entscheiden über volle Auftragsbücher. Wir bringen deinen Betrieb für die Leistungen und Orte nach vorn, die wirklich Aufträge bringen, statt für allgemeine Begriffe ohne Kaufabsicht. So kommen Anfragen von Kunden, die jetzt einen Handwerker suchen — nicht erst in einem halben Jahr.`,
    deliverables: [
      `Keyword-Recherche nach Gewerk + Einzugsgebiet (z. B. „Badsanierung [Landkreis]”) statt generischer Begriffe`,
      `Optimiertes Google Business Profile mit Leistungen, Fotos und Bewertungsstrategie für lokale Sichtbarkeit`,
      `Lokale Landingpages für deine wichtigsten Gewerke und Orte`,
    ],
    faqs: [
      {
        q: `Wie schnell ranke ich als Handwerker lokal bei Google?`,
        a: `Für weniger umkämpfte Orts-Leistungs-Kombinationen sind erste Bewegungen oft in wenigen Wochen sichtbar. Stark umkämpfte Begriffe in Großstädten brauchen länger. Wir starten bewusst mit den Suchanfragen, bei denen du am schnellsten Aufträge gewinnst.`,
      },
      {
        q: `Lohnt sich SEO, wenn ich ohnehin über Empfehlungen Aufträge bekomme?`,
        a: `Empfehlungen schwanken und sind nicht planbar. Lokale SEO macht dich unabhängig: Wer dich empfohlen bekommt, googelt dich trotzdem — und wer ohne Empfehlung sucht, findet dich überhaupt erst. Beides zusammen füllt das Auftragsbuch verlässlicher.`,
      },
    ],
  },

  /* ──────────────────── STEUERBERATER × SERVICES ─────────────────── */

  'steuerberater/unternehmenswebsite': {
    uniqueAngle: `Eine Kanzlei-Webseite ist kein digitales Aushängeschild — sie ist die Entscheidungsgrundlage deiner nächsten Mandanten. Wer heute einen Steuerberater sucht, vergleicht online, bevor er anruft, und zieht aus dem Auftritt sofort Rückschlüsse auf Seriosität und Kompetenz. Wir bauen den Fundament-Auftritt, der deine fachlichen Schwerpunkte klar kommuniziert, Vertrauen in den ersten Sekunden schafft und Mandanten- wie Mitarbeiter-Anfragen gleichermaßen anzieht. Denn wer wächst, braucht beides: die richtigen Mandate und die richtigen Kräfte dahinter.`,
    deliverables: [
      `Leistungsseiten je Schwerpunkt (z. B. GmbH-Beratung, Freiberufler, Lohnbuchhaltung) — klar getrennt statt im Einheitsbrei`,
      `Kanzlei-Profil mit Team, Qualifikationen und echten Vertrauenssignalen (Berufszulassung, Fachberater-Titel o. ä.)`,
      `Karriere-Sektion für Initiativbewerbungen und offene Stellen — strukturierter Kanal statt E-Mail-Chaos`,
    ],
    faqs: [
      {
        q: `Darf meine Kanzlei-Webseite Mandanten aktiv ansprechen?`,
        a: `Ja. Sachliche, berufsbezogene Information über deine Leistungen ist nach Berufsrecht ausdrücklich erlaubt. Verboten ist nur irreführende oder reißerische Werbung. Wir bauen deinen Auftritt bewusst seriös und substanzstark — Vertrauen entsteht über klare Kompetenz, nicht über laute Versprechen.`,
      },
      {
        q: `Wie zeige ich auf der Webseite, auf welche Mandate ich spezialisiert bin?`,
        a: `Indem jeder Schwerpunkt eine eigene Seite bekommt: klar beschrieben, mit typischen Fragen deiner Wunsch-Mandanten und einer direkten Anfrage-Möglichkeit. So findet jemand, der gezielt einen Steuerberater für E-Commerce oder für Ärzte sucht, sofort das Richtige — und du bekommst die Anfragen, die wirklich zu dir passen.`,
      },
    ],
  },

  'steuerberater/relaunch': {
    uniqueAngle: `Ein veralteter Kanzlei-Auftritt kostet dich Mandate, bevor das erste Gespräch stattfindet. Wer auf eine langsame, unstrukturierte oder optisch überholte Seite stößt, zweifelt unbewusst an der Kompetenz — und klickt weiter. Ein Relaunch modernisiert nicht nur das Design, sondern macht deine Kanzlei wieder konkurrenzfähig: klarere Positionierung, bessere Lesbarkeit auf dem Smartphone und eine Struktur, die Mandantenanfragen aktiv einsammelt. Dabei gehen keine bestehenden Verlinkungen und Empfehlungs-Flows verloren — denn wer dich bisher kannte, soll dich nach dem Relaunch erst recht finden.`,
    deliverables: [
      `Audit des bestehenden Auftritts: Was kostet gerade Mandate — Ladezeit, Struktur, Mobile-Darstellung, fehlende Kontakt-Strecken`,
      `Modernisierter Auftritt mit klarer Positionierung, deinen Schwerpunkten und DSGVO-konformer Kontaktführung`,
      `Lückenloses Redirect-Konzept, das alle bestehenden Seiten, Verlinkungen und etwaige Rankings überträgt`,
    ],
    faqs: [
      {
        q: `Verliere ich durch den Relaunch meine bisherigen Mandantenanfragen aus dem Web?`,
        a: `Nicht, wenn der Übergang sorgfältig geplant wird. Für Kanzleien ist dabei besonders wichtig: externe Verlinkungen auf dein DATEV-Mandantenportal, Onboarding-Formulare und Anmeldeseiten müssen erreichbar bleiben — ein Redirect auf die falsche Seite kostet echte Mandanten. Wir erfassen alle kritischen Pfade vorab im Audit und leiten sie gezielt um. Gleichzeitig prüfen wir, ob dein Impressum die Pflichtangaben für Berufsträger vollständig enthält (Kammerzulassung, Berufshaftpflicht-Hinweis) — denn ein lückenhaftes Impressum schadet dem Vertrauenseindruck, den ein professioneller Relaunch aufbauen soll.`,
      },
      {
        q: `Meine aktuelle Webseite bringt kaum Anfragen — liegt das wirklich am Design?`,
        a: `Oft nicht nur daran. Häufigere Ursachen sind: fehlende klare Botschaft, keine direkte Anfrage-Möglichkeit, schlechte Darstellung auf dem Smartphone oder unklare Positionierung. Im Audit zeigen wir dir konkret, was Anfragen kostet — und beheben genau das, nicht mehr und nicht weniger.`,
      },
    ],
  },

  'steuerberater/seo': {
    uniqueAngle: `„Steuerberater [Stadt]” — wer bei dieser Suche nicht auf Seite 1 erscheint, existiert für einen Großteil der Suchenden schlicht nicht. Dazu kommen immer mehr Nischen-Suchanfragen: Mandanten suchen gezielt nach Kanzleien für Ärzte, für GmbHs oder für Freiberufler — oft mit deutlich geringerer Konkurrenz als die generische Suche. Wir bringen deine Kanzlei für die lokalen und thematischen Suchanfragen nach vorn, bei denen Interesse und Mandatsbereitschaft direkt zusammenfallen. So kommen Anfragen von Menschen, die genau das suchen, was du anbietest.`,
    deliverables: [
      `Lokales SEO: Google Business Profile, Maps-Präsenz und standortbezogene Optimierung für deine Stadt und Region`,
      `Thematische Keyword-Seiten für deine Mandanten-Nischen (z. B. „Steuerberater für Ärzte [Stadt]” oder „GmbH-Beratung [Region]”)`,
      `On-Page-Optimierung der bestehenden Kanzlei-Seiten für Suchbegriffe mit echter Mandats-Absicht`,
    ],
    faqs: [
      {
        q: `Wie lange dauert es, bis meine Kanzlei bei Google sichtbar wird?`,
        a: `Das hängt stark davon ab, wie du positioniert bist. Wer auf eine thematische Nische setzt — etwa „Steuerberater für Ärzte [Stadt]” oder „Steuerberater E-Commerce [Region]” — trifft auf deutlich weniger Wettbewerb als bei der generischen Suche. Gleichzeitig sind diese Mandanten oft wertvoller und die Abschlussquote höher. In solchen Segmenten entstehen messbare Bewegungen oft schneller, als es bei breiten Keywords der Fall wäre. Und selbst wenn du in einer Großstadt arbeitest, hat die Nischen-Spezialisierung einen klaren Vorteil: Google und deine Wunsch-Mandanten verstehen sofort, wofür du stehst.`,
      },
      {
        q: `Lohnt sich SEO, wenn ich bereits voll ausgelastet bin?`,
        a: `Dann ist es der beste Zeitpunkt. Zum einen kannst du mit mehr Anfragen wählerischer werden und nur die Mandate annehmen, die wirklich passen. Zum anderen schwanken Auslastungen — wer erst optimiert, wenn es ruhiger wird, hat Monate Vorlaufzeit verloren. Sichtbarkeit baut man auf, wenn man Zeit hat, nicht wenn man sie braucht.`,
      },
    ],
  },

  'steuerberater/ki-sichtbarkeit': {
    uniqueAngle: `Mandanten fragen heute nicht mehr nur Google — sie fragen ChatGPT: „Welcher Steuerberater in München ist auf GmbHs spezialisiert?” oder „Gibt es eine Kanzlei in Köln, die sich auf Freiberufler konzentriert?” Die KI antwortet mit Kanzleien, die ihr bekannt sind — und ignoriert alle anderen vollständig. KI-Sichtbarkeit für Steuerberater bedeutet: Wir bauen das Entity-Profil deiner Kanzlei mit schema.org-Markup, E-E-A-T-Signalen und klaren Antwortformaten so auf, dass ChatGPT, Perplexity und die Google AI Overviews deine Kanzlei als vertrauenswürdige Anlaufstelle für Mandanten in deiner Region und deiner Nische kennen und empfehlen.`,
    deliverables: [
      `Vollständiges schema.org-Entity-Profil: Kanzleiname, Standort, Fachberater-Qualifikationen, Leistungsschwerpunkte — strukturiert lesbar für KI-Systeme`,
      `Answer Engine Optimization für typische Mandantenfragen (z. B. „Was kostet ein Steuerberater für eine GmbH?”) — als zitierfähige Antworten auf deiner Webseite`,
      `llms.txt-Konfiguration und Crawler-Freigabe für GPTBot, ClaudeBot, PerplexityBot und OAI-SearchBot`,
    ],
    faqs: [
      {
        q: `Fragt wirklich jemand ChatGPT nach einem Steuerberater?`,
        a: `Ja — und besonders die Zielgruppe, die du als Kanzlei willst: Unternehmer und Freiberufler, die schnell und präzise Empfehlungen suchen, statt zehn Google-Ergebnisse zu vergleichen. Die KI-Suche wächst in diesem Segment rasant, und wer jetzt sein Kanzlei-Profil aufbaut, hat einen konkreten Vorsprung vor Wettbewerbern, die das verschlafen.`,
      },
      {
        q: `Ist KI-Sichtbarkeit vereinbar mit dem Berufsrecht für Steuerberater?`,
        a: `Ja. Wir bauen dein KI-Profil ausschließlich auf sachlichen, belegbaren Aussagen über deine Qualifikationen, Schwerpunkte und Leistungen — keine Superlative, keine Vergleiche, keine Heilsversprechen. Das entspricht dem Berufsrecht und ist gleichzeitig das, was KI-Systeme ohnehin bevorzugen: klare, glaubwürdige Fakten statt Werbesprache.`,
      },
    ],
  },

  'steuerberater/content-marketing': {
    uniqueAngle: `Mandanten vertrauen dem Steuerberater, der komplexe Themen verständlich erklärt — noch bevor sie das erste Gespräch führen. Ratgeber-Artikel zu Themen wie „GmbH gründen: was ist steuerlich zu beachten?” oder „Betriebsausgaben für Freiberufler — was zählt wirklich?” beantworten Fragen, die deine Wunsch-Mandanten ohnehin stellen. Du positionierst dich dabei als Experte, wirst bei Google für diese Suchanfragen gefunden und baust gleichzeitig den Expertenstatus auf, den KI-Systeme als Empfehlungsgrundlage nutzen. Content-Marketing für Kanzleien ist kein Selbstzweck — es ist der verlässlichste Weg, Vertrauen zu skalieren, ohne für jeden Kontakt aktiv Zeit zu investieren.`,
    deliverables: [
      `Mandantenorientierte Themen- und Keyword-Strategie: Welche Fragen stellen deine Wunsch-Mandanten bei Google — und welche beantworten wir als Erste?`,
      `Faktengeprüfte, redaktionell betreute Fachbeiträge mit echter inhaltlicher Tiefe — substanzstarker Inhalt, der Vertrauen schafft und rankt`,
      `Internes Verlinkungskonzept, das Ratgeber-Inhalte auf deine Leistungsseiten lenkt und Anfrage-Impulse setzt`,
    ],
    faqs: [
      {
        q: `Darf ich als Steuerberater Fachthemen auf meiner Webseite publizieren?`,
        a: `Ja. Sachliche, informative Inhalte zu steuerrechtlichen Themen sind ausdrücklich erlaubt — sie gelten als Berufsausübung, nicht als verbotene Werbung. Im Gegenteil: ein gut geführter Ratgeber-Bereich stärkt deinen Ruf als Experte und zieht genau die Mandanten an, die inhaltliche Tiefe schätzen.`,
      },
      {
        q: `Wer schreibt die Inhalte — brauche ich dafür viel Zeit?`,
        a: `Wir schreiben. Du gibst uns deine Schwerpunkte und nimmst dir einmalig kurz Zeit für eine inhaltliche Abstimmung — den Rest übernehmen wir. Jeder Artikel wird vor Veröffentlichung mit dir abgestimmt, damit er fachlich passt und deiner Kanzlei entspricht. Dein Aufwand bleibt minimal.`,
      },
    ],
  },
};

export const getIndustryServiceContent = (
  branche: string,
  service: string,
): IndustryServiceContent | undefined =>
  industryServiceContent[`${branche}/${service}`];

/** True, wenn die Kombi einen einzigartigen Content-Eintrag hat. */
export const hasIndustryServiceContent = (
  branche: string,
  service: string,
): boolean => Boolean(getIndustryServiceContent(branche, service));
