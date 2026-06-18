/**
 * Hero-Bilder pro Leistung (markenkonforme Visuals statt Portrait).
 * Key = Service-Slug. Fehlt ein Eintrag, fällt der Hero auf das Portrait zurück.
 * Bilder liegen als WebP in /public/hero/ (4:5-/quadratische Brand-Visuals).
 * Offen: ki-optimierung + web-apps (Bilder folgen) → bis dahin Portrait.
 */
export const HERO_IMAGES: Record<string, string> = {
  webdesign: "/hero/webdesign.webp",
  relaunch: "/hero/relaunch.webp",
  "ki-sichtbarkeit": "/hero/ki-sichtbarkeit.webp",
  seo: "/hero/seo.webp",
  "content-marketing": "/hero/content-marketing.webp",
  "e-mail-marketing": "/hero/e-mail-marketing.webp",
};

export const getHeroImage = (slug: string): string | undefined =>
  HERO_IMAGES[slug];
