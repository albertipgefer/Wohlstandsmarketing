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

  /* ──────────────────────── ARZTPRAXEN × SERVICES ────────────────── */

  'arztpraxen/unternehmenswebsite': {
    uniqueAngle: `Deine Praxis-Webseite ist mehr als eine digitale Visitenkarte — sie ist die erste Anlaufstelle für Patienten, die sich noch vor der Terminanfrage ein Bild machen wollen: Wer sind die Ärzte? Was sind die Leistungen? Kann ich hier direkt einen Termin anfragen? Wir bauen den Fundament-Auftritt, der Vertrauen schafft, dein Leistungsspektrum klar strukturiert und eine Online-Terminanfrage so einfach macht, dass das Telefon an der Anmeldung spürbar ruhiger wird. Barrierefrei, datenschutzkonform und HWG-konform von Anfang an — damit du nichts riskierst und dein Team entlastet wird.`,
    deliverables: [
      `Leistungsseiten je Fachgebiet und Behandlungsangebot — strukturiert für Neu- und Bestandspatienten, sachlich und HWG-konform formuliert`,
      `Online-Terminanfrage direkt eingebunden — DSGVO-konform, mobil optimiert und so gestaltet, dass das Praxisteam weniger Anrufe bearbeiten muss`,
      `Team- und Praxisprofil mit Qualifikationen, Sprechzeiten und Anfahrt — die Informationen, die Patienten zuerst suchen, sofort sichtbar`,
    ],
    faqs: [
      {
        q: `Darf meine Praxis-Webseite aktiv auf neue Patienten hinweisen?`,
        a: `Ja — sachliche Information über Leistungen, Sprechzeiten und dein Team ist ausdrücklich erlaubt. Das Heilmittelwerbegesetz (HWG) verbietet Heilversprechen und irreführende Aussagen über Behandlungsergebnisse, nicht aber seriöse Praxisdarstellung. Wir formulieren jeden Text bewusst so, dass er informiert und Vertrauen aufbaut — ohne rechtliche Graubereiche.`,
      },
      {
        q: `Muss eine Praxis-Webseite barrierefrei sein?`,
        a: `Das Barrierefreiheitsstärkungsgesetz (BFSG) trifft viele Unternehmen ab 2025 — für Gesundheitsdienstleister empfehlen wir Barrierefreiheit nach WCAG grundsätzlich, unabhängig von der konkreten Pflicht: Sie erleichtert älteren Patienten und Menschen mit Einschränkungen die Nutzung deutlich und senkt die Abbruchrate bei der Terminanfrage. Wir bauen von Anfang an barrierefrei.`,
      },
    ],
  },

  'arztpraxen/landingpage': {
    uniqueAngle: `Nicht jede Praxisleistung gehört auf die allgemeine Webseite — Selbstzahler-Angebote und IGeL-Leistungen wie Stoßwellentherapie, ästhetische Medizin oder präventive Check-ups funktionieren auf einer eigenen Landingpage deutlich besser: klare Leistungsbeschreibung, Nutzenargumente und eine direkte Terminanfrage, ohne dass der Besucher durch Sprechzeiten und Anfahrtsbeschreibungen klicken muss. Das ist besonders wertvoll, wenn du eine Leistung gezielt ausbauen, eine neue Zielgruppe ansprechen oder den Privatpatienten-Anteil erhöhen möchtest — ohne die gesamte Webseite umzubauen.`,
    deliverables: [
      `Eigenständige Seite ohne ablenkende Navigation, vollständig auf eine Leistung oder Zielgruppe ausgerichtet — z. B. „IGeL-Leistungen [Praxis]" oder „Präventions-Check-up ab 40"`,
      `HWG-konforme Leistungsbeschreibung mit klaren Nutzenargumenten — sachlich, vertrauensbildend und ohne unzulässige Wirkungsversprechen`,
      `Terminanfrage-Formular direkt auf der Seite — DSGVO-konform, niedrigschwellig und messbar in der Anfrage-Rate`,
    ],
    faqs: [
      {
        q: `Für welche Praxis-Leistungen eignet sich eine Landingpage besonders?`,
        a: `Vor allem für Selbstzahler-Angebote und IGeL-Leistungen, die nicht durch die Krankenkasse erstattet werden — etwa ästhetische Behandlungen, Sport- oder Reisemedizin, Präventions-Check-ups oder spezielle Diagnostikleistungen. Diese Patienten suchen aktiv und entscheiden selbst: Eine fokussierte Seite, die klar erklärt und direkt zur Terminanfrage führt, holt sie zuverlässig ab.`,
      },
      {
        q: `Wie stellen wir sicher, dass die Landingpage das Heilmittelwerbegesetz einhält?`,
        a: `Das HWG ist bei Landingpages für medizinische Leistungen der wichtigste rechtliche Rahmen. Wir schreiben ausschließlich sachliche, belegbare Aussagen — keine Heilversprechen, keine Vorher-Nachher-Vergleiche ohne ärztliche Grundlage, keine Aussagen über sicher zu erwartende Behandlungsergebnisse. Alle Formulierungen stimmen wir mit dir inhaltlich ab, bevor die Seite live geht.`,
      },
    ],
  },

  'arztpraxen/relaunch': {
    uniqueAngle: `Viele Praxen haben eine Webseite, die vor Jahren jemand gebaut hat — seitdem läuft sie irgendwie, aber bringt nichts mehr: keine Online-Terminanfrage, langsames Laden auf dem Handy, kein strukturiertes Leistungsangebot. Patienten, die sich online vorinformieren, springen ab, bevor sie die Telefonnummer gesucht haben. Ein Relaunch holt diesen Verlust auf: moderne Darstellung, Terminanfrage direkt auf der Startseite und eine Struktur, die Fragen beantwortet, bevor sie jemand stellt — alles ohne dass die Praxis dabei für Suchmaschinen unsichtbar wird.`,
    deliverables: [
      `Audit der bestehenden Seite: Welche Inhalte, Verlinkungen und etwaige Rankings übernommen werden müssen — und was entfernt oder neu strukturiert wird`,
      `Modernisierter Auftritt mit Online-Terminanfrage, klarer Leistungsdarstellung und barrierefreier Bedienung nach WCAG`,
      `Lückenloses Redirect-Konzept für alle bestehenden Seiten-URLs, damit keine Patienten-Verweise ins Leere laufen`,
    ],
    faqs: [
      {
        q: `Was passiert mit dem Kontaktformular und dem Buchungssystem, das unsere Patienten kennen?`,
        a: `Diese Verknüpfungen erfassen wir im Audit als kritische Pfade und überführen sie gezielt in den neuen Auftritt. Patienten-Bookmarks, Links aus Arztbriefen oder Verweise auf dein bestehendes Buchungssystem bleiben funktionsfähig. Gleichzeitig nutzen wir den Relaunch, um das Terminanfrage-Erlebnis zu verbessern — nicht nur zu erhalten.`,
      },
      {
        q: `Unsere Seite ist veraltet, hat aber kaum Anfragen gebracht — warum sollte ein Relaunch daran etwas ändern?`,
        a: `Eine alte Seite, die keine Anfragen bringt, hat meist klare strukturelle Ursachen: keine sichtbare Terminanfrage, schlechte Mobil-Darstellung oder ein Leistungsangebot, das Patienten nicht sofort verstehen. Der Relaunch ist kein kosmetisches Update — wir analysieren zuerst, was Anfragen kostet, und beheben genau das. Ergebnis ist eine Seite, die als aktives Praxiswerkzeug funktioniert, nicht nur als digitale Broschüre.`,
      },
    ],
  },

  'arztpraxen/seo': {
    uniqueAngle: `Wer heute einen Zahnarzt, Orthopäden oder Allgemeinmediziner sucht, tippt selten einen Namen ein — sondern „[Facharzt] [Stadt]" oder „Arzt in der Nähe". Gerade bei Fachärzten kommt hinzu, dass Patienten spezifisch nach einer Spezialisierung suchen: „Sportmediziner [Stadt]" oder „Praxis für Naturheilkunde [Region]". Wir bringen deine Praxis für genau diese Kombis nach vorn, optimieren dein Google Business Profile und Google Maps-Profil und sorgen dafür, dass deine Fachkompetenz lokal gefunden wird — von Patienten, die bereits einen Termin buchen wollen.`,
    deliverables: [
      `Facharzt- und Standort-Keyword-Recherche: Welche Suchbegriffe Patienten in deiner Region tatsächlich verwenden — und wie umkämpft sie sind`,
      `Google Business Profile und Maps vollständig optimiert — mit Öffnungszeiten, Leistungen, Fotos und Bewertungsstrategie`,
      `Lokale Leistungsseiten für deine Fachgebiete und Behandlungsschwerpunkte — auffindbar für Suchende mit konkretem Bedarf`,
    ],
    faqs: [
      {
        q: `Wie unterscheidet sich SEO für Arztpraxen von SEO für andere Branchen?`,
        a: `Zwei Punkte sind entscheidend: Erstens sind die Suchanfragen sehr lokal — Patienten suchen fast ausschließlich in ihrer Nähe, der Radius ist kleiner als in den meisten Branchen. Zweitens gibt es klare HWG-Grenzen bei der inhaltlichen Optimierung: Leistungsseiten müssen sachlich bleiben, keine Wirkungsversprechen enthalten und dürfen Patienten nicht in eine bestimmte Behandlung drängen. Wir kennen diese Grenzen und bauen deine SEO so, dass sie rechtlich sauber und gleichzeitig wirksam ist.`,
      },
      {
        q: `Kann SEO auch dabei helfen, qualifiziertes Praxispersonal (MFAs) zu gewinnen?`,
        a: `Ja — über Karriere-Seiten und gezielte Such-Optimierung für Begriffe wie „MFA Stelle [Stadt]" oder „Arzthelfer/in Job [Region]". Gerade in der Kombination aus Patienten-SEO und Bewerber-SEO lässt sich die Praxisseite als vollständiges Recruiting-Werkzeug nutzen, ohne getrennte Investitionen in Jobbörsen.`,
      },
    ],
  },

  'arztpraxen/ki-sichtbarkeit': {
    uniqueAngle: `Patienten, die umziehen, einen neuen Spezialisten suchen oder nach einer IGeL-Leistung fragen, nutzen immer häufiger ChatGPT oder Perplexity statt nur Google — und fragen direkt: „Welcher Hautarzt in Stuttgart hat gute Bewertungen?" oder „Gibt es einen Internisten in Köln, der auf Diabetes spezialisiert ist?" KI-Systeme antworten mit Praxen, die ihnen bekannt sind, mit klaren Informationen über Fachgebiet, Standort und Spezialisierung — alle anderen bleiben unsichtbar. Mit einem vollständigen schema.org-Entity-Profil, strukturierten Antwortinhalten und KI-Crawler-Freigaben sorgen wir dafür, dass ChatGPT, Perplexity und die Google AI Overviews deine Praxis als Anlaufstelle für Patienten in deiner Region kennen und nennen.`,
    deliverables: [
      `Vollständiges schema.org-Entity-Profil für deine Praxis: Fachgebiet, Spezialisierungen, Standort, Sprechzeiten und Kontaktdaten — strukturiert lesbar für KI-Systeme`,
      `Answer Engine Optimization für häufige Patientenfragen deiner Fachrichtung (z. B. „Was behandelt ein Orthopäde?" oder „Wann brauche ich einen Facharzt für ...?") — als zitierfähige Antworten auf deiner Webseite`,
      `llms.txt-Konfiguration und KI-Crawler-Freigabe für GPTBot, ClaudeBot, PerplexityBot — damit KI-Systeme deine Praxis vollständig einlesen und korrekt einordnen können`,
    ],
    faqs: [
      {
        q: `Welche Patienten nutzen ChatGPT für die Arztsuche?`,
        a: `Vor allem technikaffine Patienten zwischen 25 und 55, die recherchieren statt nur zu googeln — und besonders die, die nach einer Spezialisierung oder einer Selbstzahler-Leistung suchen. Gerade bei IGeL oder Privatleistungen ist die KI-Suche relevant, weil Patienten dort intensiver vergleichen. Für Fachärzte in Nischen mit wenig Wettbewerb kann ein frühes KI-Profil den entscheidenden Unterschied machen.`,
      },
      {
        q: `Ist KI-Sichtbarkeit für Praxen rechtlich unbedenklich?`,
        a: `Ja, wenn die Grundlage stimmt: Wir bauen das Profil ausschließlich auf sachlichen, belegbaren Informationen — Fachgebiet, Qualifikationen, Leistungsangebot, Standort. Keine Behandlungsversprechen, keine Rangvergleiche, keine Superlative. Gerade bei Gesundheitsthemen sind KI-Systeme besonders vorsichtig und stützen sich nur auf überprüfbare, seriöse Angaben — genau dieses verlässliche Praxis-Profil bauen wir auf, vollständig im HWG-konformen Rahmen.`,
      },
    ],
  },

  /* ─────────────────── MASCHINENBAU × SERVICES ──────────────────── */

  'maschinenbau/unternehmenswebsite': {
    uniqueAngle: `Im Maschinenbau entscheidet nicht der Preisvergleich, sondern der Vertrauensaufbau — und der beginnt heute beim ersten Blick auf deine Webseite. Technische Einkäufer und Projektingenieure recherchieren online, bevor sie überhaupt Kontakt aufnehmen: Sie suchen nach Referenzen aus ihrer Branche, nach Zertifizierungen, nach technischen Daten und nach Hinweisen darauf, ob dein Betrieb die nötige Erfahrung mitbringt. Eine Industrie-Webseite, die diese Fragen beantwortet, ist kein Marketingaufwand — sie ist die Vorstufe zum Angebot. Gleichzeitig hilft ein professioneller Auftritt dabei, qualifizierte Ingenieure und Fachkräfte anzusprechen, die sich vor der Bewerbung genau ansehen, wo sie arbeiten werden.`,
    deliverables: [
      `Referenz- und Case-Study-Bereich strukturiert nach Branchen und Anwendungsfall — damit Einkäufer sofort sehen, ob ihr Einsatzfeld abgedeckt ist`,
      `Technische Produkt- und Leistungsseiten mit Download-Datenblättern, Spezifikationstabellen und klarem Anfrage-CTA für Angebotsgespräche`,
      `Karriere-Sektion für Ingenieure und Facharbeiter — strukturierter Bewerbungskanal, der die Arbeitgeber-Qualitäten konkret kommuniziert`,
    ],
    faqs: [
      {
        q: `Wir verkaufen über den Vertrieb — was bringt uns eine aufwendigere Webseite?`,
        a: `Euer Vertrieb und eure Webseite arbeiten parallel: Bevor ein Einkäufer euren Außendienst zurückruft oder zum Messestand kommt, hat er eure Webseite bereits bewertet. Ein unmoderner oder dünn bestückter Auftritt scheidet in dieser Phase stillschweigend aus der Auswahl aus. Ein überzeugender Auftritt hingegen verkürzt die Qualifizierungsphase des Vertriebs, weil Interessenten schon vorinformiert und grundsätzlich überzeugt ankommen.`,
      },
      {
        q: `Wie präsentieren wir Sondermaschinenbau verständlich, wenn jede Anlage ein Unikat ist?`,
        a: `Indem wir nicht die Maschinen beschreiben, sondern die Probleme, die ihr löst — strukturiert nach Branche und Prozess. Technische Tiefe behalten wir in Datenblättern und Downloads; die Seite selbst führt den Entscheider schnell zum Wesentlichen: Wer hat eine ähnliche Anlage bei euch gebaut, was war das Ergebnis, und wie kommt ein Erstgespräch zustande?`,
      },
    ],
  },

  'maschinenbau/relaunch': {
    uniqueAngle: `Ein veralteter Industrie-Auftritt signalisiert technischen Einkäufern unbewusst, dass die Innovationskraft des Unternehmens stagniert — selbst wenn die Maschinen auf dem Hallenfloor Weltklasse sind. Im B2B ist der Relaunch keine kosmetische Maßnahme, sondern ein strategischer Schritt: Produktsortiment und Referenzliste wachsen, Exportmärkte kommen hinzu, neue Ansprechpartner werden gesucht. Der bestehende Auftritt hält damit nicht mehr Schritt und kostet euch aktiv Anfragen, ohne dass ihr es merkt. Wir modernisieren euren Auftritt gezielt für die Zielgruppe der technischen Entscheider — und übertragen dabei alle bestehenden Seiten und Rankings lückenlos, damit der Wechsel keine Sichtbarkeitslücke hinterlässt.`,
    deliverables: [
      `Technischer Audit: Welche bestehenden Seiten, Produktdaten und Rankings erhalten, umstrukturiert oder ersetzt werden — inklusive Redirect-Mapping aller relevanten URLs`,
      `Neuer Auftritt mit klarer Produkt- und Referenzstruktur, die technische Entscheider durch den Sales-Funnel führt — statt generischer Unternehmensbeschreibung`,
      `Internationalisierungs-Check: Ob bestehende englischsprachige Inhalte übernommen oder als eigenständiger Sprachbereich neu aufgebaut werden sollten`,
    ],
    faqs: [
      {
        q: `Unsere Webseite hat kaum externe Verlinkungen — müssen wir das Redirect-Konzept trotzdem aufwendig planen?`,
        a: `Ja, aber aus einem anderen Grund: Im B2B sind oft interne Dokumente, Kataloge, Partner-Intranets oder Messe-Unterlagen direkt auf bestimmte URLs eurer Seite verlinkt. Diese Pfade zu kennen und korrekt zu übergeben ist entscheidend — ein toter Link in einem Einkäufer-Bookmark oder einem digitalen Messekatalog kostet euch eine Anfrage, die ihr nie seht. Wir erfassen diese Pfade im Audit und behandeln sie wie kritische Infrastruktur.`,
      },
      {
        q: `Wie gehen wir mit mehrsprachigen Inhalten um, wenn wir auch ins Ausland exportieren?`,
        a: `Das klären wir im Audit: Haben bestehende englische Seiten organische Sichtbarkeit, behalten wir sie und überführen sie strukturiert. Fehlt ein belastbarer englischer Bereich noch, empfehlen wir, ihn als eigenen Kanal mit dem Relaunch aufzubauen — Exportmärkte und internationale Einkäufer sind oft der wichtigste Wachstumshebel, und eine schlecht gepflegte englische Unterseite schadet mehr als keine.`,
      },
    ],
  },

  'maschinenbau/seo': {
    uniqueAngle: `SEO im Maschinenbau funktioniert grundlegend anders als im Konsumgütermarkt: Die Suchvolumina für spezifische Begriffe wie „Sondermaschine Pharmaindustrie" oder „Prüfstand Antriebsstrang" sind klein, aber wer sucht, ist kurz davor, eine ernsthafte Investitionsentscheidung zu treffen. Gleichzeitig gibt es für viele Nischen-Keywords kaum Wettbewerb, weil die meisten Industrieunternehmen ihre SEO vernachlässigen. Wir identifizieren die Suchbegriffe, mit denen eure Wunschkunden in der Recherchephase unterwegs sind — inklusive internationaler Begriffe, wenn Exportmärkte relevant sind — und bauen dafür thematisch klar positionierte Seiten, die bei exakt diesen Anfragen gefunden werden.`,
    deliverables: [
      `Nischen-Keyword-Recherche für eure Produkte, Technologien und Zielbranchen — auch englischsprachige Begriffe für internationale Suchende`,
      `Produkt- und Anwendungsseiten, die bei technischen Suchanfragen ranken und als Erstkontakt für Einkäufer dienen`,
      `Technisches SEO-Audit: interne Verlinkungsstruktur, Crawlbarkeit und Ladezeiten — Faktoren, die bei größeren Industrie-Webseiten oft der eigentliche Engpass sind`,
    ],
    faqs: [
      {
        q: `Lohnt sich SEO überhaupt, wenn unser Produkt nur von einer Handvoll Unternehmen gesucht wird?`,
        a: `Gerade dann. Wer eine Sondermaschine oder ein Spezialbauteil benötigt, sucht aktiv und hat eine klare Kaufabsicht — das Suchvolumen ist gering, aber der Auftragswert dahinter ist hoch. Wenn ihr die einzigen seid, die für diesen Begriff auffindbar sind, habt ihr keinen Wettbewerb zu schlagen. SEO-Dominanz in einer kleinen Nische ist einfacher zu erreichen und langfristig stabiler als in breiten Märkten.`,
      },
      {
        q: `Wie lange dauert es, bis erste Anfragen über SEO reinkommen?`,
        a: `In Nischen mit wenig Wettbewerb entstehen messbare Rankingbewegungen oft deutlich früher als in umkämpften Consumer-Märkten. Wie schnell das zu konkreten Anfragen führt, hängt auch vom Sales-Zyklus ab — im Maschinenbau können zwischen erster Recherche und Anfrage Wochen bis Monate liegen. Das bedeutet: Wer früh sichtbar ist, ist auch früh in der Recherchephase präsent, lange bevor die Entscheidung fällt.`,
      },
    ],
  },

  'maschinenbau/ki-sichtbarkeit': {
    uniqueAngle: `Technische Einkäufer und Projektingenieure nutzen ChatGPT und Perplexity zunehmend als Recherche-Tool: „Welche Anbieter für Vakuumhandling in der Automobilindustrie gibt es?" oder „Wer baut Sondermaschinen für die Lebensmittelverarbeitung?" — die KI antwortet mit konkreten Unternehmen. Wer dort nicht auftaucht, ist in dieser Recherchephase schlicht nicht existent. KI-Sichtbarkeit im Maschinenbau bedeutet, das Entity-Profil eures Unternehmens mit schema.org-Markup, strukturierten Produkt- und Referenzdaten sowie zitierfähigen Fachartikeln so aufzubauen, dass KI-Systeme euch nicht nur kennen, sondern als kompetente Quelle für eure Technologienische einordnen und nennen.`,
    deliverables: [
      `Vollständiges schema.org-Entity-Profil: Unternehmensname, Technologieschwerpunkte, Zielbranchen, Zertifizierungen, Standort und internationale Präsenz — strukturiert lesbar für KI-Systeme`,
      `Answer Engine Optimization für technische Recherchefragen eurer Einkäufer (z. B. „Was ist der Unterschied zwischen Portalmessmaschine und KMG?" oder „Wann lohnt sich Sondermaschinen statt Standardautomatisierung?") — als zitierfähige Fachinhalte auf eurer Webseite`,
      `llms.txt-Konfiguration und KI-Crawler-Freigabe für GPTBot, ClaudeBot, PerplexityBot und OAI-SearchBot`,
    ],
    faqs: [
      {
        q: `Suchen technische Einkäufer wirklich in ChatGPT nach Maschinenlieferanten?`,
        a: `Noch nicht flächendeckend — aber die Adoption wächst schnell, besonders bei jüngeren Ingenieuren und bei frühen Recherchephasen, in denen man noch nicht genau weiß, wie die Lösung aussehen soll. Gerade für euch als Nischenanbieter ist der Zeitpunkt jetzt günstig: Eure Wettbewerber haben kaum ein strukturiertes KI-Profil. Wer jetzt sein Entity aufbaut, hat einen Vorsprung, der sich in einem B2B-Markt mit langen Sales-Zyklen über Monate und Jahre auszahlt.`,
      },
      {
        q: `Unterscheidet sich KI-Sichtbarkeit für B2B-Anbieter von der für lokale Dienstleister?`,
        a: `Ja, erheblich. Lokale Dienstleister profitieren vor allem von geo-bezogenen KI-Antworten. Im Maschinenbau sind die Fragen technischer Natur und thematisch: Welche Technologie löst Problem X, welche Unternehmen sind in Nische Y etabliert, wer hat Referenzen in Branche Z. Wir bauen das KI-Profil deshalb entlang eurer Technologiethemen und Zielbranchen auf — nicht primär regional, sondern inhaltlich positioniert.`,
      },
    ],
  },

  'maschinenbau/content-marketing': {
    uniqueAngle: `Im langen B2B-Sales-Zyklus des Maschinenbaus fallen Entscheidungen nicht nach einem Webseitenbesuch — sie reifen über Wochen und Monate, in denen Einkäufer und Ingenieure recherchieren, vergleichen und intern abstimmen. Fachartikel, Case Studies und technische Ratgeber sind in dieser Phase der verlässlichste Hebel: Sie zeigen Kompetenz, bevor ein Angebot auf dem Tisch liegt, und halten euer Unternehmen im Kopf der Entscheider, auch wenn der konkrete Projektbedarf noch nicht akut ist. Gleichzeitig sind technisch fundierte Inhalte das stärkste Signal für Google und KI-Systeme, dass ihr die Experten in eurer Technologienische seid — was direkt in Rankings und KI-Nennungen fließt.`,
    deliverables: [
      `Technische Content-Strategie: Welche Themen, Anwendungsfälle und Branchen eure Wunschkunden in der Recherchephase beschäftigen — und für welche Begriffe ihr mit Fachartikeln ranken könnt`,
      `Fachartikel, Anwendungsberichte und Case Studies mit echter technischer Tiefe — recherchiert mit eurem Team, redaktionell aufbereitet und SEO-optimiert`,
      `Content-Distribution: Verlinkung von Artikeln auf Produkt- und Referenzseiten sowie Formatierung für maximale Zitierbarkeit durch KI-Systeme`,
    ],
    faqs: [
      {
        q: `Unsere Produkte sind erklärungsbedürftig — können externe Texter das wirklich abbilden?`,
        a: `Technische Tiefe bringt ihr; den redaktionellen Aufbau übernehmen wir. Der Prozess ist kollaborativ: Wir führen ein strukturiertes Briefing-Gespräch mit eurem Fachteam, schreiben den Artikel daraus auf und stimmen ihn inhaltlich mit euch ab, bevor er online geht. Das Ergebnis ist ein Text, der eure Fachkenntnis authentisch wiedergibt und trotzdem so aufgebaut ist, dass ihn auch Entscheider ohne Detailwissen schnell einordnen können.`,
      },
      {
        q: `Was ist der Unterschied zu den technischen Texten, die wir schon auf der Webseite haben?`,
        a: `Produktbeschreibungen und Datenblätter beschreiben, was ihr macht. Content Marketing erklärt, warum das für einen konkreten Anwendungsfall die beste Lösung ist — mit Kontext, Problemstellung, Vergleich zu Alternativen und einem nachvollziehbaren Ergebnis. Dieser Unterschied entscheidet darüber, ob ein Artikel bei Google für Recherchefragen rankt, ob er als Quelle von KI-Systemen zitiert wird und ob ein Einkäufer ihn bis zum Ende liest und danach eine Anfrage stellt.`,
      },
    ],
  },

  /* ─────────────────── IMMOBILIENMAKLER × SERVICES ──────────────── */

  'immobilienmakler/unternehmenswebsite': {
    uniqueAngle: `Als Immobilienmakler gewinnst du Mandate nicht durch Inserate, sondern durch Vertrauen — und das beginnt heute, bevor ein Eigentümer die Telefonnummer wählt. Wer sein Haus oder seine Eigentumswohnung verkaufen möchte, sucht online nach dem Makler, der in der Region als Platzhirsch gilt, und bewertet dessen Professionalität am Auftritt. Eine starke Makler-Webseite zeigt deine verkauften Objekte, deine Marktkenntnis und dein Bewertungsangebot — und macht Eigentümern klar, warum gerade du ihr Mandat bekommen solltest. Wer diesen ersten Eindruck nicht beherrscht, verliert das Mandat, noch bevor der erste Besichtigungstermin je stattgefunden hat.`,
    deliverables: [
      `Referenz-Galerie mit verkauften Objekten (Erzielter Preis, Verkaufszeit, Stadtbezirk) — konkrete Beweise für deine Marktleistung, nicht leere Versprechen`,
      `Integriertes Immobilienbewertungs-Tool oder Bewertungsanfrage — der stärkste Lead-Magnet für Eigentümer, direkt auf der Startseite sichtbar`,
      `Über-dich-Seite mit regionaler Spezialisierung, Transaktionshistorie und persönlichem Vertrauensaufbau — denn Eigentümer vergeben Mandate an Menschen, nicht an Logos`,
    ],
    faqs: [
      {
        q: `Reicht nicht ein Profil auf ImmoScout oder Immowelt für meine Sichtbarkeit?`,
        a: `Portale helfen dir, vorhandene Objekte an Käufer zu bringen — aber sie helfen dir nicht dabei, neue Mandate von Eigentümern zu gewinnen. Ein Eigentümer, der seinen Hausverkauf plant, googelt nicht nach einem Portal, sondern nach dem besten Makler in seiner Stadt. Dort braucht du eine eigene Webseite, die dich als Experten positioniert. Wer kein eigenes Fundament hat, steht auf dem Boden der Plattform und zahlt deren Regeln.`,
      },
      {
        q: `Wie zeige ich meine bisherigen Verkaufserfolge, ohne Datenschutzprobleme zu bekommen?`,
        a: `Referenzen veröffentlichst du auf Stadtbezirk- oder Straßennamen-Ebene, nicht mit vollständiger Adresse. Angaben wie „4-Zimmer-Wohnung in Köln-Lindenthal, verkauft in 3 Wochen, 8 % über Angebotspreis" sind aussagekräftig und problemlos datenschutzkonform. Wir formulieren deine Referenzen so, dass sie maximale Überzeugungskraft haben — und rechtlich sauber bleiben.`,
      },
    ],
  },

  'immobilienmakler/landingpage': {
    uniqueAngle: `Der rentabelste Lead, den ein Immobilienmakler gewinnen kann, ist ein Eigentümer, der eine kostenlose Immobilienbewertung anfragt — denn dahinter steckt in den meisten Fällen ein konkreter Verkaufswunsch. Eine fokussierte Bewertungs-Landingpage hat genau dieses eine Ziel: Eigentümer, die „Haus verkaufen [Stadt]" oder „Immobilienbewertung [Stadt]" suchen, landen auf einer Seite ohne Ablenkungen, verstehen sofort den Mehrwert und tragen sich ein. Statt einer langen Makler-Webseite, die viele Themen gleichzeitig bedient, bündelt diese Seite die gesamte Conversion-Kraft auf den einen Einstieg in deine Eigentümer-Akquise.`,
    deliverables: [
      `Bewertungsanfrage-Formular als zentrales Conversion-Element — mehrstufig, niedrigschwellig und auf Eigentümer-Psychologie ausgelegt (Immobilientyp, Lage, Kontaktdaten in sinnvoller Reihenfolge)`,
      `Vertrauenssignale speziell für Eigentümer: Anzahl erfolgreicher Verkäufe, durchschnittliche Verkaufszeit, Kundenstimmen von Verkäufern — kein allgemeines Makler-Marketing`,
      `Suchbegriff-Fokus auf Eigentümer-Suchanfragen wie „Immobilienbewertung [Stadt]" oder „Haus verkaufen [Stadt]" — technisch und inhaltlich darauf ausgerichtet`,
    ],
    faqs: [
      {
        q: `Warum eine eigene Landingpage für die Bewertung, wenn das auch auf meiner Hauptseite stehen kann?`,
        a: `Eine Webseite bedient viele Besucher gleichzeitig — Käufer, Mieter, Eigentümer. Wer eine Bewertungsanfrage auf der Startseite unterbringt, konkurriert dort mit Objektinseraten, dem Über-uns-Link und allem anderen. Eine dedizierte Landingpage lenkt jeden Eigentümer, der von einer Anzeige oder aus der Suche kommt, auf exakt eine Entscheidung: Bewertung anfragen — ja oder nein. Diese Klarheit erhöht die Anfrage-Rate messbar.`,
      },
      {
        q: `Funktioniert die Landingpage auch ohne geschaltete Anzeigen?`,
        a: `Ja — wenn sie sauber auf Eigentümer-Suchbegriffe optimiert ist. „Immobilienbewertung kostenlos [Stadt]" oder „Haus verkaufen ohne Makler Kosten [Stadt]" sind Suchanfragen mit klarer Kaufbereitschaft und vergleichsweise wenig Wettbewerb unter regionalen Maklern. Wir bauen die Seite so, dass sie sowohl aus der organischen Suche als auch aus bezahlten Kampagnen heraus konvertiert — du kannst mit dem organischen Kanal starten und später skalieren.`,
      },
    ],
  },

  'immobilienmakler/relaunch': {
    uniqueAngle: `Eigentümer, die ein Objekt im Wert von mehreren hunderttausend Euro verkaufen wollen, wählen ihren Makler mit höchster Sorgfalt — und ein veralteter Webauftritt ist das erste, das sie rausfallen lässt. Ein Makler mit einer Webseite aus 2016 wirkt nicht etabliert, sondern überholt — selbst wenn hinter dem Logo jahrelange Marktkenntnis steckt. Ein Relaunch modernisiert nicht nur das Erscheinungsbild, sondern macht aus einer digitalen Bürde ein aktives Akquise-Werkzeug: Bewertungsanfrage prominent platziert, verkaufte Objekte als Beweis inszeniert, Ladezeiten auf Smartphone-Level — und das alles, ohne dass bisherige Seitenstrukturen und Verlinkungen verloren gehen.`,
    deliverables: [
      `Audit des bestehenden Auftritts mit Fokus auf Eigentümer-Conversion: Wo verlässt dich ein verkaufswilliger Eigentümer gerade wieder, bevor er eine Anfrage stellt?`,
      `Modernisierter Auftritt mit Objekt-Referenzen, Markt-Positionierung und prominent gesetzter Bewertungsanfrage — visuell auf Premium-Anspruch der Eigentümer abgestimmt`,
      `Vollständiges Redirect-Konzept, das alle bestehenden URLs, Portals-Verlinkungen und bisherige SEO-Signale auf den neuen Auftritt überträgt`,
    ],
    faqs: [
      {
        q: `Kann ich beim Relaunch meine bestehenden Objekt-Listings und Exposé-Links erhalten?`,
        a: `Ja — und genau das ist beim Makler-Relaunch besonders wichtig. Objekt-URLs sind oft auf externen Portalen, in E-Mails an Interessenten oder in Exposés verlinkt. Diese Pfade erfassen wir im Audit vollständig und stellen sicher, dass Interessenten nicht auf eine Fehlerseite stoßen, sondern auf das aktualisierte Objekt oder eine sinnvolle Weiterleitung. Ein abgebrochener Aufruf bei einem hochpreisigen Objekt ist ein verlorener Lead.`,
      },
      {
        q: `Mein bisheriger Auftritt hat funktioniert — was bringt ein Relaunch wirklich?`,
        a: `Die Frage ist nicht, ob dein Auftritt „funktioniert", sondern wie viele Eigentümer du verlierst, bevor sie dich je kontaktieren. Ein potenzieller Auftraggeber mit einem Objekt für 600.000 € schaut sich online 3–5 Makler an und entscheidet dann. Wenn dein Auftritt bei diesem Vergleich nicht überzeugt, bekommst du die Anfrage gar nicht erst — und weißt es nie. Ein Relaunch ist also kein Reparieren von Sichtbarem, sondern das Schließen einer unsichtbaren Lücke in deiner Eigentümer-Pipeline.`,
      },
    ],
  },

  'immobilienmakler/seo': {
    uniqueAngle: `Für Immobilienmakler gibt es zwei grundlegend verschiedene SEO-Ziele: Käufer finden Objekte über Portale — aber Eigentümer, die verkaufen wollen, suchen aktiv nach dem richtigen Makler oder nach einer Immobilienbewertung. Genau diese zweite Gruppe ist die, die über SEO den höchsten Provisionswert pro Anfrage bringt. Wer bei „Immobilienmakler [Stadt]", „Haus verkaufen [Stadt]" oder „Immobilienbewertung [Stadtbezirk]" auf Seite 1 erscheint, erreicht Eigentümer im Moment ihrer höchsten Kaufbereitschaft — und wird in deren Shortlist aufgenommen, bevor der erste Anruf getätigt wird.`,
    deliverables: [
      `Eigentümer-orientierte Keyword-Strategie: „Haus verkaufen [Stadt]", „Immobilienbewertung [Bezirk]", „Wohnung verkaufen [Region]" — Suchanfragen mit direktem Mandat-Potenzial`,
      `Stadtteil- und Objekt-Seiten für dein Einzugsgebiet: Marktberichte, lokale Preisentwicklung und Verkaufs-Expertise nach Bezirk — die Suchanfragen verkaufswilliger Eigentümer gezielt abdecken`,
      `Google Business Profile vollständig optimiert als lokale Vertrauensanker — mit Transaktionsnachweisen, Bewertungen und Spezialgebieten`,
    ],
    faqs: [
      {
        q: `Wie unterscheidet sich SEO für Makler von SEO für andere lokale Dienstleister?`,
        a: `Der entscheidende Unterschied liegt im Ziel: Makler müssen primär Eigentümer ansprechen, nicht Käufer. Käufer kommen über Portale — das ist ein Kanal, der bereits besetzt ist. Eigentümer hingegen suchen aktiv nach dem besten Ansprechpartner in ihrer Region und bewerten dabei Marktkenntnis, Reputation und Professionalität. Die richtigen Keywords, Landingpages und Marktberichte für dieses Segment werden von den meisten Maklern nicht besetzt — obwohl genau hier die Mandats-Entscheidung fällt.`,
      },
      {
        q: `Bringt lokales SEO auch Vorteile in benachbarten Stadtteilen oder Gemeinden?`,
        a: `Ja, wenn du es gezielt aufbaust. Ein Makler, der für „Immobilienmakler Bonn-Bad Godesberg", „Immobilienmakler Bonn-Beuel" und „Haus verkaufen Bonn" gleichzeitig sichtbar ist, dominiert die Region flächendeckend — während Wettbewerber nur im Stadtzentrum präsent sind. Wir planen den Seitenaufbau so, dass du Schritt für Schritt dein Einzugsgebiet digital als Territorium markierst.`,
      },
    ],
  },

  'immobilienmakler/ki-sichtbarkeit': {
    uniqueAngle: `Wer heute in ChatGPT oder Perplexity fragt „Welcher Immobilienmakler ist der beste in München-Schwabing?" oder „Wer kennt sich mit Eigentumswohnungen in Düsseldorf aus?", bekommt eine Empfehlung — oder gar keine. Makler, die in KI-Antworten auftauchen, werden als Marktautoritäten wahrgenommen, noch bevor ein erstes Gespräch stattfindet. Das ist besonders wertvoll in einer Branche, in der Vertrauen und regionaler Ruf die Mandat-Entscheidung treffen. Wir bauen dein Entity-Profil mit vollständigem schema.org-Markup, Answer Engine Optimization und strukturierten Marktberichten so auf, dass ChatGPT, Perplexity und Google AI Overviews dich als Anlaufstelle für Eigentümer in deiner Region kennen und empfehlen.`,
    deliverables: [
      `Vollständiges schema.org-Entity-Profil: Maklerbezeichnung, Standort, Spezialisierungen (z. B. Wohnimmobilien, Gewerbe, Luxussegment), Einzugsgebiet und Kontakt — strukturiert für KI-Lesbarkeit`,
      `Answer Engine Optimization für typische Eigentümer-Fragen: „Was kostet ein Makler beim Hausverkauf?", „Wie läuft ein Immobilienverkauf ab?", „Wann ist der beste Zeitpunkt zum Verkaufen?" — als zitierfähige Antworten mit deiner Expertise hinterlegt`,
      `llms.txt-Konfiguration und Crawler-Freigabe für GPTBot, ClaudeBot, PerplexityBot und OAI-SearchBot`,
    ],
    faqs: [
      {
        q: `Nutzen Eigentümer wirklich ChatGPT für die Makler-Auswahl?`,
        a: `Noch ist es eine Minderheit — aber genau diese Minderheit besteht aus digitalaffinen Eigentümern, die recherchieren statt nur zu googeln. In einer Branche, in der ein einziges gewonnenes Mandat 10.000–30.000 € Provision bedeuten kann, lohnt sich der Aufbau dieses Kanals auch dann, wenn er dir pro Monat nur eine oder zwei Anfragen zusätzlich bringt. Und der Zeitpunkt ist günstig: Die meisten Maklerhäuser haben kein strukturiertes KI-Profil.`,
      },
      {
        q: `Was unterscheidet KI-Sichtbarkeit für Makler von klassischer Online-Reputation?`,
        a: `Online-Reputation sind Bewertungen auf Google oder Immobilienportalen — extern, wenig steuerbar. KI-Sichtbarkeit bedeutet, dass dein Wissen, deine Marktexpertise und dein Einzugsgebiet so strukturiert auf deiner eigenen Webseite hinterlegt sind, dass KI-Systeme daraus eine klare Empfehlung ableiten können. Du baust damit ein digitales Autoritätsprofil auf deiner eigenen Infrastruktur auf — unabhängig davon, ob jemand eine Bewertung hinterlassen hat oder nicht.`,
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
