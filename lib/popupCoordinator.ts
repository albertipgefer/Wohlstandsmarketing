/**
 * Popup-Coordinator — globale Mechanik damit niemals zwei Popups gleichzeitig
 * offen sind und zwischen zwei Popup-Anzeigen mindestens 15 Sekunden Pause
 * liegen. Verhindert Spam-Eindruck.
 *
 * Cookie-Banner zählt nicht als „Popup" (DSGVO-Pflicht, eigene Mechanik).
 *
 * Verwendung:
 *   import { tryOpenPopup, markPopupClosed } from "@/lib/popupCoordinator";
 *
 *   if (tryOpenPopup("ki-check-teaser")) {
 *     setOpen(true);
 *   }
 *   // beim Schließen:
 *   markPopupClosed("ki-check-teaser");
 */

const COOLDOWN_MS = 15_000;
const CURRENT_KEY = "popup:current";
const LAST_CLOSED_KEY = "popup:lastClosedAt";

/**
 * Prüft ob ein neues Popup geöffnet werden darf.
 * Returns false wenn:
 *   - bereits ein anderes Popup offen ist
 *   - der letzte Popup-Close < 15 Sekunden her ist
 */
export function canOpenPopup(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = sessionStorage.getItem(CURRENT_KEY);
    if (current) return false;
    const last = parseInt(sessionStorage.getItem(LAST_CLOSED_KEY) || "0", 10);
    if (Date.now() - last < COOLDOWN_MS) return false;
    return true;
  } catch {
    return true;
  }
}

/**
 * Versucht ein Popup zu öffnen. Liefert true wenn erlaubt.
 * Bei true: registriert das Popup als „aktuell offen".
 */
export function tryOpenPopup(id: string): boolean {
  if (!canOpenPopup()) return false;
  try {
    sessionStorage.setItem(CURRENT_KEY, id);
  } catch {
    /* noop */
  }
  return true;
}

/**
 * Markiert ein Popup als geschlossen — startet 15-Sek-Cooldown für andere.
 */
export function markPopupClosed(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = sessionStorage.getItem(CURRENT_KEY);
    if (current === id || current === null) {
      sessionStorage.removeItem(CURRENT_KEY);
      sessionStorage.setItem(LAST_CLOSED_KEY, Date.now().toString());
    }
  } catch {
    /* noop */
  }
}

/** Hilfsfunktion: gibt verbleibende Cooldown-Zeit in ms zurück (oder 0). */
export function remainingCooldownMs(): number {
  if (typeof window === "undefined") return 0;
  try {
    const last = parseInt(sessionStorage.getItem(LAST_CLOSED_KEY) || "0", 10);
    const remaining = COOLDOWN_MS - (Date.now() - last);
    return remaining > 0 ? remaining : 0;
  } catch {
    return 0;
  }
}
