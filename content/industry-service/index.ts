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
