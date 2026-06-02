export type City = {
  slug: string;
  name: string;
  state: string;
  region: string;
  postalCode: string;
  geo: { lat: number; lng: number };
  /** Distance from Bad Ems (HQ) in km — used in copy */
  distanceFromHq: number;
  /** 2-3 well-known landmarks for atmospheric copy */
  landmarks: string[];
  /** 3-5 industry clusters typical for the city */
  industries: string[];
  /** Neighbouring cities for cross-linking */
  neighbours: string[];
  /** SEO description (max ~160 chars) */
  description: string;
  /** Personal hook — 1-2 sentences for the local intro */
  intro: string;
  /** 3-4 sentences on the real local economy — unique per city, kills thin/duplicate content */
  economy: string;
  /** 4-6 districts / surrounding towns for local long-tail relevance */
  districts: string[];
  /** 4-6 industry slugs (from content/industries) — links the city + industry silos */
  relatedIndustries: string[];
  /** Exactly 2 city-specific FAQ pairs — substantively unique, not just name-swapped */
  localFaqs: { q: string; a: string }[];
};
