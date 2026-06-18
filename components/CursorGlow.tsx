"use client";

import { useEffect, useState } from "react";

/**
 * Dezenter, dem Cursor folgender Glow (Desktop, nur feine Zeigereingabe).
 * Global über GlobalOverlays auf allen öffentlichen Seiten gemountet — damit
 * der Effekt überall existiert, nicht nur auf der Startseite.
 *
 * ‼️ REGEL: Dieser Cursor-Glow gehört auf JEDE öffentliche Seite. Er ist hier
 * zentral gemountet — also automatisch auf neuen Seiten vorhanden. Nicht pro
 * Seite duplizieren.
 *
 * Performance: mousemove per requestAnimationFrame gedrosselt (kein Re-Render
 * pro Pixel → INP-freundlich); respektiert prefers-reduced-motion.
 */
export default function CursorGlow() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
      return;
    }
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setCursor({ x: e.clientX, y: e.clientY, visible: true });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!cursor.visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,99,222,0.10)_0%,rgba(22,99,222,0)_70%)] blur-2xl lg:block"
      style={{ left: cursor.x, top: cursor.y }}
    />
  );
}
