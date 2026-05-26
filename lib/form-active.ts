/**
 * isFormActive — kleine Hilfsfunktion für Popups.
 *
 * Liefert `true`, wenn der User gerade in einem Eingabefeld tippt
 * (oder anderweitig mit einem Form-Element interagiert). Popups
 * sollen sich in diesem Fall NICHT öffnen, damit der User nicht
 * mitten in einer Anmeldung unterbrochen wird.
 *
 * Erkennt: input, textarea, select, contentEditable.
 */
export function isFormActive(): boolean {
  if (typeof document === "undefined") return false;
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") {
    // Hidden/Honeypot-Inputs ausschließen — diese sind technisch fokussierbar,
    // aber kein echter User-Input
    const type = (el as HTMLInputElement).type;
    if (type === "hidden") return false;
    return true;
  }
  if (el.isContentEditable) return true;
  return false;
}
