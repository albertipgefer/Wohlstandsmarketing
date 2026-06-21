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
