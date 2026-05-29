/**
 * Vereinfachte ReviewBadges-Komponente — 1:1 Stil aus wohlstandsmarketing.de.
 * 5,0 Sterne auf Google + Trustpilot Pills.
 */

const GOOGLE_URL =
  "https://www.google.com/search?sca_esv=68cd59949303f16d&q=Wohlstandsmarketing&stick=H4sIAAAAAAAAAONgU1I1qDAxMk9ONU20MDE3TDa0SE6yMqhIS002SklJNk4zTE5KMbNMXMQqHJ6fkVNckpiXUpybWJSdWpKZlw4AkM2PtD8AAAA&mat=Cae5S3-sIDvp&ved=2ahUKEwiD16vGqdaUAxV2ffUHHXyqDGYQrMcEegQIBxAC#mpd=~16806062359705270695/customers/reviews";
const TRUSTPILOT_URL = "https://de.trustpilot.com/review/ipgefer-performance.de";

function Stars({ size = 12 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#db6f16">
          <path d="M10 1.5l2.7 5.47 6.05.88-4.38 4.27 1.04 6.03L10 15.27l-5.41 2.84 1.04-6.03L1.25 7.85l6.05-.88L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

const GOOGLE_LOGO = (
  <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden>
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.62z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.95-2.18l-2.9-2.26c-.81.54-1.83.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z" />
    <path fill="#FBBC04" d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z" />
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.57-2.57A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
  </svg>
);

const TRUSTPILOT_LOGO = (
  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
    <rect width="20" height="20" rx="3" fill="#00B67A" />
    <path d="M10 3.2l1.92 3.89 4.3.62-3.11 3.03.73 4.28L10 13l-3.84 2.02.73-4.28-3.11-3.03 4.3-.62L10 3.2z" fill="#fff" />
  </svg>
);

function Pill({ source }: { source: "google" | "trustpilot" }) {
  const href = source === "google" ? GOOGLE_URL : TRUSTPILOT_URL;
  const name = source === "google" ? "Google" : "Trustpilot";
  const logo = source === "google" ? GOOGLE_LOGO : TRUSTPILOT_LOGO;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`5,0 auf ${name}`}
      className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-[12px] font-medium text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
    >
      {logo}
      <Stars />
      <span className="font-semibold text-[var(--text)]">{name}</span>
    </a>
  );
}

export default function ReviewBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2.5 ${className}`}>
      <Pill source="google" />
      <Pill source="trustpilot" />
    </div>
  );
}
