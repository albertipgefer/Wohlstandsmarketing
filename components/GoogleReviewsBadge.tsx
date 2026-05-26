/**
 * Trust-Badge mit Google-Bewertungen-Verweis.
 * Konfigurierbar — sobald echte Reviews da sind, einfach `rating` + `count` setzen.
 *
 * Aktueller Stand: Modus "passive" (kein rating/count) — zeigt Sterne + Link
 * zum öffentlichen GBP-Review-Eintrag. Sobald GBP-Reviews einlaufen:
 *   <GoogleReviewsBadge rating={4.9} count={12} />
 * → schaltet automatisch in "active"-Modus mit Zahl.
 */

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=68cd59949303f16d&q=Wohlstandsmarketing&stick=H4sIAAAAAAAAAONgU1I1qDAxMk9ONU20MDE3TDa0SE6yMqhIS002SklJNk4zTE5KMbNMXMQqHJ6fkVNckpiXUpybWJSdWpKZlw4AkM2PtD8AAAA&mat=Cae5S3-sIDvp&ved=2ahUKEwiD16vGqdaUAxV2ffUHHXyqDGYQrMcEegQIBxAC#mpd=~16806062359705270695/customers/reviews";

interface Props {
  rating?: number;
  count?: number;
  variant?: "pill" | "inline" | "light";
  className?: string;
}

function Stars({ filled = 5, light = false }: { filled?: number; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill={i < filled ? "#db6f16" : light ? "rgba(255,255,255,0.3)" : "#e5e5e5"}
        >
          <path d="M10 1.5l2.7 5.47 6.05.88-4.38 4.27 1.04 6.03L10 15.27l-5.41 2.84 1.04-6.03L1.25 7.85l6.05-.88L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function GoogleReviewsBadge({
  rating,
  count,
  variant = "pill",
  className = "",
}: Props) {
  const hasRating = typeof rating === "number" && typeof count === "number" && count > 0;
  const label = hasRating
    ? `${rating.toFixed(1).replace(".", ",")} · ${count} Google-Bewertungen`
    : "Auf Google bewertet";
  const a11y = hasRating
    ? `${rating.toFixed(1)} von 5 Sternen auf Google, ${count} Bewertungen`
    : "Wohlstandsmarketing auf Google ansehen";

  if (variant === "inline") {
    return (
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={a11y}
        className={`group inline-flex items-center gap-2 text-[12px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text)] ${className}`}
      >
        <Stars filled={hasRating ? Math.round(rating!) : 5} />
        <span>{label}</span>
        <span aria-hidden className="text-[10px] opacity-60 transition group-hover:opacity-100">↗</span>
      </a>
    );
  }

  if (variant === "light") {
    return (
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={a11y}
        className={`group inline-flex items-center gap-2 text-[12px] font-medium text-white/70 transition hover:text-white ${className}`}
      >
        <Stars filled={hasRating ? Math.round(rating!) : 5} light />
        <span>{label}</span>
        <span aria-hidden className="text-[10px] opacity-60 transition group-hover:opacity-100">↗</span>
      </a>
    );
  }

  // Default: Pill
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={a11y}
      className={`group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] transition hover:border-[var(--accent)] hover:text-[var(--text)] ${className}`}
    >
      <Stars filled={hasRating ? Math.round(rating!) : 5} />
      <span className="font-semibold text-[var(--text)]">{label}</span>
      <span aria-hidden className="text-[10px] opacity-60 transition group-hover:opacity-100">↗</span>
    </a>
  );
}
