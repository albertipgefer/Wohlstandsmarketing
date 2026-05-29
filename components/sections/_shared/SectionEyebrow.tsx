"use client";

export default function SectionEyebrow({
  index,
  label,
  accent = "blue",
  compact = false,
}: {
  index: string;
  label: string;
  accent?: "blue" | "orange";
  /** Kleinere Variante (Schrift/Padding/Tracking reduziert) — passt sicher in eine Zeile. */
  compact?: boolean;
}) {
  const isBlue = accent === "blue";
  return (
    <div
      className={`inline-flex items-center rounded-full border border-[var(--border)] bg-white shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] ${
        compact ? "gap-2 px-3 py-1" : "gap-2.5 px-4 py-1.5"
      }`}
    >
      <span
        className={`${compact ? "h-1.5 w-1.5" : "h-2 w-2"} rounded-full ${
          isBlue ? "bg-[var(--accent)]" : "bg-[var(--gold)]"
        }`}
      />
      <span
        className={`font-medium text-[var(--text-muted)] uppercase ${
          compact ? "text-[10px] tracking-[0.12em]" : "text-[11px] tracking-[0.18em]"
        }`}
      >
        <span
          className={
            isBlue
              ? "font-semibold text-[var(--accent)]"
              : "font-semibold text-[var(--gold-text)]"
          }
        >
          {index}
        </span>
        <span className={`text-[var(--text-subtle)] ${compact ? "mx-1.5" : "mx-2"}`}>·</span>
        {label}
      </span>
    </div>
  );
}
