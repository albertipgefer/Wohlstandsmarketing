"use client";

import { useEffect } from "react";

/**
 * Löst nach dem Mount automatisch den Druckdialog aus (für /angebot/[id]/print).
 * Kleiner Timeout, damit Fonts/Bilder geladen sind, bevor gedruckt wird.
 */
export default function PrintOnMount() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);
  return null;
}
