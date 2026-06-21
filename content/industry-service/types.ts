export type IndustryServiceContent = {
  /** Ein einzigartiger Problem→Lösung-Absatz für genau diese Branche×Service-Kombi (3-5 Sätze) */
  uniqueAngle: string;
  /** 2-3 kombinations-spezifische, branchenkonkrete Deliverables */
  deliverables: string[];
  /** 2 kombinations-spezifische FAQ-Items */
  faqs: { q: string; a: string }[];
};
