"use client";

/**
 * WhatsApp-Floating-Button — kontextabhängige Pre-Filled-Nachrichten pro Seitentyp.
 *
 * Sitzt **rechts unten direkt über dem KI-Check-Sticky-CTA** (gleiche Spalte,
 * sichtbar gestapelt). Auf Seiten ohne KI-Check-CTA (siehe KI_CHECK_HIDDEN_PATHS)
 * rutscht es auf die Standard-Bodenposition. Verschwindet nach Dismiss bis zur
 * nächsten Session.
 *
 * Nachricht-Logik:
 *   /                       → Startseiten-Frage
 *   /blog                   → Blog-Index-Frage
 *   /blog/[slug]            → mit Artikel-Titel (aus document.title)
 *   /webdesign/[stadt]      → mit Stadt-Name (Lookup über cities)
 *   /preise, /preise/...    → Preise-Frage
 *   /sichtbarkeits-check*   → KI-Check-Frage
 *   /standorte              → Standort-Frage
 *   /bewertungen            → Bewertungs-Frage
 *   sonst                   → Generischer Fallback
 *
 * WhatsApp-Nummer: +49 176 227 87 559 → wa.me/4917622787559
 */

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cities } from "@/content/cities";

const WHATSAPP_NUMBER = "4917622787559"; // ohne + / 00 / Leerzeichen

/** Pfade, auf denen KEIN KI-Check-Sticky-CTA gerendert wird — dort rutscht
 *  WhatsApp auf die Standard-Bodenposition (muss synchron zu StickyKiCheckCTA.tsx). */
const KI_CHECK_HIDDEN_PATHS = [
  "/sichtbarkeits-check",
  "/sichtbarkeits-check/danke",
  "/preise",
];

/** Pfade, auf denen der WhatsApp-Button KOMPLETT ausgeblendet wird (auf allen
 *  Geräten) — auf diesen Seiten will Albert keine WhatsApp-Ablenkung neben
 *  dem dort vorhandenen Hauptangebot (KI-Check-Tool / Preise-CTA). */
const WHATSAPP_HIDDEN_PATHS = [
  "/sichtbarkeits-check",
  "/preise",
];

function buildMessage(pathname: string, articleTitle: string | null): string {
  // City-Pages
  const cityMatch = pathname.match(/^\/webdesign\/([^/]+)/);
  if (cityMatch) {
    const city = cities.find((c) => c.slug === cityMatch[1]);
    const name = city?.name ?? "meiner Region";
    return `Hallo Albert, ich komme aus ${name} bzw. Umgebung und überlege, mit Wohlstandsmarketing zu arbeiten. Hast du kurz Zeit?`;
  }

  // Blog-Artikel (mit dynamischem Titel)
  if (/^\/blog\/[^/]+/.test(pathname)) {
    const title = articleTitle?.trim();
    if (title) {
      return `Hallo Albert, ich habe gerade deinen Artikel „${title}" gelesen und hätte dazu eine kurze Frage.`;
    }
    return `Hallo Albert, ich habe gerade einen Artikel auf eurem Blog gelesen und hätte dazu eine kurze Frage.`;
  }

  // Blog-Index
  if (pathname === "/blog" || pathname.startsWith("/blog?")) {
    return `Hallo Albert, ich bin gerade auf eurem Blog unterwegs und hätte kurz eine Frage zum Thema Marketing.`;
  }

  // Preise
  if (pathname.startsWith("/preise")) {
    return `Hallo Albert, ich habe mir gerade eure Preise angeschaut und hätte dazu eine kurze Frage.`;
  }

  // Sichtbarkeits-Check
  if (pathname.startsWith("/sichtbarkeits-check")) {
    return `Hallo Albert, ich habe gerade den Sichtbarkeits-Check gemacht und würde gerne mit dir über die Ergebnisse sprechen.`;
  }

  // Standorte
  if (pathname.startsWith("/standorte")) {
    return `Hallo Albert, ich überlege, mit Wohlstandsmarketing zu arbeiten, und hätte kurz eine Frage.`;
  }

  // Bewertungen
  if (pathname.startsWith("/bewertungen")) {
    return `Hallo Albert, ich habe mir gerade eure Kundenbewertungen angeschaut und hätte kurz eine Frage.`;
  }

  // Startseite
  if (pathname === "/") {
    return `Hallo Albert, ich bin über deine Webseite gekommen und würde gerne kurz mit dir über Marketing für mein Unternehmen sprechen.`;
  }

  // Fallback
  return `Hallo Albert, ich bin über deine Webseite gekommen und hätte kurz eine Frage.`;
}

function cleanArticleTitle(raw: string): string {
  // " · WSM Blog" und ähnliche Suffixe abschneiden
  return raw
    .replace(/\s*·\s*WSM Blog\s*$/i, "")
    .replace(/\s*·\s*Wohlstandsmarketing\s*$/i, "")
    .replace(/\s*\|\s*Wohlstandsmarketing\s*$/i, "")
    .trim();
}

export default function WhatsAppButton() {
  const pathname = usePathname() ?? "/";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [articleTitle, setArticleTitle] = useState<string | null>(null);

  // Erst nach Scroll erscheinen lassen (Hero ungestört)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("wa-cta-dismissed") === "1") setDismissed(true);
    // Gleicher Scroll-Trigger wie StickyKiCheckCTA, damit beide synchron erscheinen
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Artikel-Titel nach Mount aus document.title ziehen
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (/^\/blog\/[^/]+/.test(pathname)) {
      setArticleTitle(cleanArticleTitle(document.title));
    } else {
      setArticleTitle(null);
    }
  }, [pathname]);

  const href = useMemo(() => {
    const text = buildMessage(pathname, articleTitle);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [pathname, articleTitle]);

  // Komplettes Ausblenden auf bestimmten Pfaden (alle Geräte)
  if (WHATSAPP_HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;
  if (dismissed) return null;

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem("wa-cta-dismissed", "1");
    setDismissed(true);
  }

  // Position: direkt über dem KI-Check-Sticky-CTA (gleiche Spalte rechts unten).
  // Auf Pfaden ohne KI-Check rutscht es auf die Standard-Bodenposition.
  const kiCheckHidden = KI_CHECK_HIDDEN_PATHS.some((p) => pathname.startsWith(p));
  // Vertikaler Abstand zum KI-Check-Button: ~14px (mobile) / 16px (desktop)
  const positionCls = kiCheckHidden
    ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
    : "bottom-[80px] right-4 sm:bottom-[98px] sm:right-6";

  return (
    <div
      inert={!visible}
      className={`pointer-events-none fixed z-40 transition-all duration-500 ${positionCls} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Albert auf WhatsApp schreiben"
        className="pointer-events-auto group relative flex w-[232px] items-center gap-3 rounded-full border border-[var(--border)] bg-white py-2 pl-2 pr-3 shadow-[0_14px_40px_-10px_rgba(10,10,10,0.25)] backdrop-blur sm:w-[262px] sm:py-2.5 sm:pl-2.5 sm:pr-4"
      >
        {/* WhatsApp-Icon-Bubble */}
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white sm:h-10 sm:w-10">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
          <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden>
            <path d="M16 .5C7.45.5.5 7.45.5 16c0 2.82.74 5.46 2.02 7.74L.5 31.5l7.93-2.05A15.45 15.45 0 0 0 16 31.5c8.55 0 15.5-6.95 15.5-15.5S24.55.5 16 .5zm0 28.2a12.6 12.6 0 0 1-6.43-1.76l-.46-.28-4.7 1.22 1.25-4.58-.3-.47A12.7 12.7 0 1 1 28.7 16c0 7-5.7 12.7-12.7 12.7zm6.97-9.5c-.38-.2-2.26-1.12-2.6-1.25-.35-.13-.6-.2-.86.2-.25.38-.98 1.24-1.2 1.5-.22.25-.44.27-.82.07-.38-.19-1.6-.6-3.05-1.88-1.13-1-1.9-2.25-2.12-2.63-.22-.38-.02-.6.16-.78.17-.17.38-.45.57-.67.18-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.2-.85-2.06-1.17-2.83-.31-.74-.62-.63-.85-.64h-.73c-.25 0-.66.1-1 .47-.34.38-1.3 1.27-1.3 3.1 0 1.84 1.34 3.6 1.52 3.85.19.25 2.63 4.02 6.37 5.64.89.38 1.58.6 2.13.78.89.28 1.7.24 2.34.15.71-.1 2.26-.92 2.58-1.82.32-.9.32-1.66.22-1.82-.1-.16-.34-.25-.72-.45z" />
          </svg>
        </span>

        <span className="flex flex-col leading-tight">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1FA952] sm:text-[12px]">
            WhatsApp
          </span>
          <span className="text-[13px] font-semibold text-[var(--text)] group-hover:underline sm:text-[14px]">
            Frag mich kurz →
          </span>
        </span>

        <button
          type="button"
          aria-label="Hinweis schließen"
          onClick={dismiss}
          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--text-subtle)] transition hover:bg-[var(--bg)] hover:text-[var(--text)]"
        >
          <span className="text-base leading-none">×</span>
        </button>
      </a>
    </div>
  );
}
