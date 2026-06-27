/**
 * Interne, passwortgeschützte Routen, auf denen KEIN öffentliches Tracking
 * läuft. Single Source of Truth für GlobalOverlays, PostHog und GA4 (DRY).
 */
export const BARE_PREFIXES = [
  "/tools",
  "/rechner",
  "/outreach",
  "/analytics",
  "/finanzen",
  "/angebot",
] as const;

export function isInternalRoute(path: string | null | undefined): boolean {
  return !!path && BARE_PREFIXES.some((p) => path.startsWith(p));
}

/**
 * Öffentliche Conversion-Landingpages (Ad-Traffic): werden getrackt und zeigen
 * den Cookie-Banner, aber KEINE Marketing-Overlays (Exit-Popups, Sticky-CTAs,
 * WhatsApp-Badge) — maximale Fokussierung auf das eine Formular.
 */
export const LANDING_PREFIXES = ["/location-check"] as const;

export function isBareLandingRoute(path: string | null | undefined): boolean {
  return !!path && LANDING_PREFIXES.some((p) => path.startsWith(p));
}
