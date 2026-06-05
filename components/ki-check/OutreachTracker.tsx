"use client";
import { useEffect } from "react";

/**
 * Loggt einen Klick aus der Cold-Outreach-Mail, wenn die Seite mit
 * ?src=outreach&pid=<uuid> aufgerufen wird. Liest rein clientseitig aus der URL
 * (kein dynamic-Rendering der Seite), feuert genau einen Ping. Rendert nichts.
 */
export default function OutreachTracker() {
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("src") !== "outreach") return;
    const pid = p.get("pid");
    if (!pid) return;
    fetch(`/api/outreach/track?pid=${encodeURIComponent(pid)}`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, []);
  return null;
}
