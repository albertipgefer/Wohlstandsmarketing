/**
 * Zentrale Cookie-/Consent-Verwaltung (Single Source of Truth).
 * - Speichert die Entscheidung im bestehenden Key `wsm-cookie-consent`.
 * - Meldet Änderungen via CustomEvent an alle Tracking-Tools (kein Reload nötig).
 * - `openCookieSettings()` blendet den Banner zum Widerruf erneut ein.
 */
export type ConsentDecision = "accept" | "decline";

const STORAGE_KEY = "wsm-cookie-consent";
const CHANGE_EVENT = "wsm-consent-change";
const OPEN_EVENT = "wsm-open-cookie-settings";

export function getConsent(): ConsentDecision | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { decision?: unknown };
    return parsed?.decision === "accept" || parsed?.decision === "decline"
      ? (parsed.decision as ConsentDecision)
      : null;
  } catch {
    return null;
  }
}

export function setConsent(decision: ConsentDecision): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ decision, at: new Date().toISOString() })
    );
  } catch {
    /* localStorage blockiert → trotzdem Event feuern, damit die Session reagiert */
  }
  window.dispatchEvent(new CustomEvent<ConsentDecision>(CHANGE_EVENT, { detail: decision }));
}

export function subscribeConsent(cb: (d: ConsentDecision) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<ConsentDecision>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeOpenSettings(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
