"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services, BUNDLE_DISCOUNT } from "@/content/pricing";
import ServiceIcon from "./ServiceIcon";

const CATEGORY_LABELS: Record<string, string> = {
  webdesign: "Webdesign",
  optimierung: "Optimierung",
  wartung: "Wartung",
};

export default function PricingConfigurator() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function calculate() {
    if (selected.length === 0) return;
    setSubmitting(true);
    const params = new URLSearchParams({ items: selected.join(",") });
    router.push(`/preise/angebot?${params.toString()}`);
  }

  // Gruppierung nach Kategorie
  const groups: Record<string, typeof services> = {};
  for (const s of services) {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  }

  return (
    <div>
      <div className="space-y-12">
        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-[var(--text)] md:text-xl">
              {CATEGORY_LABELS[cat]}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {items.map((s) => {
                const active = selected.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggle(s.id)}
                    aria-pressed={active}
                    className={`group relative flex flex-col rounded-3xl border p-6 text-left transition ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_10px_30px_-12px_rgba(22,99,222,0.3)]"
                        : "border-[var(--border)] bg-white hover:border-[var(--text)]"
                    }`}
                  >
                    {/* Checkmark oben rechts */}
                    <span
                      className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-[var(--border)] bg-white"
                      }`}
                      aria-hidden
                    >
                      {active && (
                        <span className="text-[12px] font-bold leading-none">
                          ✓
                        </span>
                      )}
                    </span>

                    {/* Icon */}
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                        active
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg)] text-[var(--text)]"
                      }`}
                    >
                      <ServiceIcon name={s.icon} size={22} />
                    </span>

                    <div className="mt-4 font-[family-name:var(--font-display)] text-[17px] font-bold leading-tight tracking-tight text-[var(--text)] md:text-[18px]">
                      {s.name}
                    </div>
                    <div className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">
                      {s.short}
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {s.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-[12px] text-[var(--text-muted)]"
                        >
                          <span className="mt-0.5 text-emerald-500">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {s.note && (
                      <div className="mt-4 border-t border-[var(--border)] pt-3 text-[11px] text-[var(--gold)]">
                        {s.note}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Action-Bar am unteren Rand */}
      <div className="sticky bottom-4 z-30 mt-14 sm:bottom-6">
        <div className="mx-auto max-w-3xl rounded-full border border-[var(--border)] bg-white px-4 py-3 shadow-[0_14px_40px_-10px_rgba(10,10,10,0.25)] backdrop-blur sm:px-5 sm:py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 text-[13px] sm:text-[14px]">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                  selected.length > 0
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg)] text-[var(--text-subtle)]"
                }`}
              >
                {selected.length}
              </span>
              <span className="text-[var(--text-muted)]">
                {selected.length === 0 ? (
                  <>Wähle deine Leistungen</>
                ) : selected.length === 1 ? (
                  <span>
                    <strong className="text-[var(--text)]">1 Leistung</strong>{" "}
                    ausgewählt
                  </span>
                ) : (
                  <span>
                    <strong className="text-[var(--text)]">
                      {selected.length} Leistungen
                    </strong>{" "}
                    · {Math.round(BUNDLE_DISCOUNT * 100)} % Bundle-Rabatt
                  </span>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={calculate}
              disabled={selected.length === 0 || submitting}
              className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white transition disabled:opacity-30 sm:px-6 sm:py-3 sm:text-[14px]"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">
                {submitting ? "Wird berechnet …" : "Jetzt Preis berechnen"}
              </span>
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
