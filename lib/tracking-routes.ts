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
