export type IndustryUSP = {
  /** Card title — short, benefit-driven */
  title: string;
  /** 1-2 sentences explaining the benefit for this industry */
  desc: string;
};

export type IndustryBullet = {
  /** Bold lead-in (verb phrase) */
  strong: string;
  /** Rest of the sentence */
  rest: string;
};

export type IndustryFAQ = {
  q: string;
  a: string;
};

export type Industry = {
  slug: string;
  /** Full audience name, e.g. "Handwerksbetriebe" */
  name: string;
  /** Short label for eyebrow/breadcrumb, e.g. "Handwerk" */
  shortName: string;
  /** Hero H1 split into three parts; middle part is rendered as the italic accent. */
  h1Lead: string;
  h1Accent: string;
  h1Tail: string;
  /** Hero subline (plain text, ~2 sentences) */
  heroSubline: string;
  /** SEO <title> (30-65 chars) */
  title: string;
  /** SEO meta description (120-170 chars) */
  description: string;
  /** SEO keywords */
  keywords: string[];
  /** Intro paragraph for the "Warum [Branche]" section */
  intro: string;
  /** 3 industry-specific USPs ("Was anders ist") */
  usps: IndustryUSP[];
  /** 4 mobile/iPad hero bullets */
  bullets: IndustryBullet[];
  /** 6-8 industry-specific FAQ items (rendered + FAQPage schema) */
  faqs: IndustryFAQ[];
};

export const getIndustry = (slug: string, list: Industry[]) =>
  list.find((i) => i.slug === slug);
