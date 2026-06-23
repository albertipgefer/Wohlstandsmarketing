"use client";
/**
 * Footer-/Datenschutz-Link zum erneuten Öffnen des Cookie-Banners (Widerruf).
 * DSGVO: Einwilligung muss jederzeit so einfach widerrufbar sein wie erteilt.
 */
import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
