"use client";

export default function SectionEyebrow({
  index,
  label,
  accent = "blue",
}: {
  index: string;
  label: string;
  accent?: "blue" | "orange";
}) {
  const isBlue = accent === "blue";
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
      <span
        className={`h-2 w-2 rounded-full ${
          isBlue ? "bg-[var(--accent)]" : "bg-[var(--gold)]"
        }`}
      />
      <span className="text-[11px] font-medium tracking-[0.18em] text-[var(--text-muted)] uppercase">
        <span
          className={
            isBlue
              ? "font-semibold text-[var(--accent)]"
              : "font-semibold text-[var(--gold)]"
          }
        >
          {index}
        </span>
        <span className="mx-2 text-[var(--text-subtle)]">·</span>
        {label}
      </span>
    </div>
  );
}
