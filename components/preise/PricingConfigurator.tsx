"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  services,
  BUNDLE_DISCOUNT,
  encodeSelections,
  type Selection,
} from "@/content/pricing";
import ServiceIcon from "./ServiceIcon";

const CATEGORY_LABELS: Record<string, string> = {
  webdesign: "Webdesign",
  optimierung: "Optimierung",
  wartung: "Wartung",
};

export default function PricingConfigurator() {
  const router = useRouter();
  /** Selections gemappt nach Service-ID für schnelles Lookup */
  const [selections, setSelections] = useState<Record<string, Selection>>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedCount = Object.keys(selections).length;

  function toggle(id: string) {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        const svc = services.find((s) => s.id === id);
        next[id] = {
          id,
          // Defaults setzen
          ...(svc?.multiplyByQuantity ? { quantity: 1 } : {}),
          ...(svc?.extraPageOption ? { extraPages: 0 } : {}),
          ...(svc?.durationOptions ? { durationMonths: svc.durationMonths } : {}),
        };
      }
      return next;
    });
  }

  function updateSelection(id: string, patch: Partial<Selection>) {
    setSelections((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], ...patch } };
    });
  }

  function calculate() {
    if (selectedCount === 0) return;
    setSubmitting(true);
    const encoded = encodeSelections(Object.values(selections));
    router.push(`/preise/angebot?s=${encodeURIComponent(encoded)}`);
  }

  // Gruppierung
  const groups: Record<string, typeof services> = {};
  for (const s of services) {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  }

  return (
    <div>
      <div className="space-y-12 pb-32 md:pb-28">
        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-[var(--text)] md:text-xl">
              {CATEGORY_LABELS[cat]}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {items.map((s) => {
                const active = !!selections[s.id];
                const sel = selections[s.id];
                return (
                  <div
                    key={s.id}
                    className={`group relative flex flex-col rounded-3xl border p-6 text-left transition ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_10px_30px_-12px_rgba(22,99,222,0.3)]"
                        : "border-[var(--border)] bg-white hover:border-[var(--text)]"
                    }`}
                  >
                    {/* Toggle-Button überlagert die Karte (außer Quantity/Dur-Bereiche) */}
                    <button
                      type="button"
                      onClick={() => toggle(s.id)}
                      aria-pressed={active}
                      aria-label={`${s.name} ${active ? "abwählen" : "wählen"}`}
                      className="absolute inset-0 z-0 cursor-pointer rounded-3xl"
                    />

                    {/* Checkmark oben rechts */}
                    <span
                      className={`pointer-events-none absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
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
                      className={`pointer-events-none relative z-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                        active
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg)] text-[var(--text)]"
                      }`}
                    >
                      <ServiceIcon name={s.icon} size={22} />
                    </span>

                    <div className="pointer-events-none relative z-0 mt-4 font-[family-name:var(--font-display)] text-[17px] font-bold leading-tight tracking-tight text-[var(--text)] md:text-[18px]">
                      {s.name}
                    </div>
                    <div className="pointer-events-none relative z-0 mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">
                      {s.short}
                    </div>

                    <ul className="pointer-events-none relative z-0 mt-4 space-y-1.5">
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

                    {/* Option-Bereich (Quantity / Extra Pages / Duration) — nur wenn aktiv */}
                    {active && (
                      <div
                        className="relative z-10 mt-5 space-y-3 border-t border-[var(--border)] pt-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Quantity-Picker (Landingpage) */}
                        {s.multiplyByQuantity && (
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                              Anzahl Landingpages
                            </div>
                            <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white p-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const q = Math.max(1, (sel.quantity ?? 1) - 1);
                                  updateSelection(s.id, { quantity: q });
                                }}
                                disabled={(sel.quantity ?? 1) <= 1}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)] text-[16px] font-bold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-white disabled:opacity-30"
                                aria-label="Anzahl verringern"
                              >
                                −
                              </button>
                              <span className="min-w-[24px] text-center font-[family-name:var(--font-display)] text-[16px] font-black">
                                {sel.quantity ?? 1}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const q = Math.min(20, (sel.quantity ?? 1) + 1);
                                  updateSelection(s.id, { quantity: q });
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)] text-[16px] font-bold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-white"
                                aria-label="Anzahl erhöhen"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Unterseiten-Picker (Unternehmenswebseite) — zeigt Gesamtzahl, Untergrenze = inkludierte */}
                        {s.extraPageOption && (
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                              Anzahl Unterseiten ({s.extraPageOption.included} inklusive)
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white p-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const v = Math.max(0, (sel.extraPages ?? 0) - 1);
                                    updateSelection(s.id, { extraPages: v });
                                  }}
                                  disabled={(sel.extraPages ?? 0) <= 0}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)] text-[16px] font-bold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-white disabled:opacity-30"
                                  aria-label="Unterseiten verringern"
                                >
                                  −
                                </button>
                                <span className="min-w-[24px] text-center font-[family-name:var(--font-display)] text-[16px] font-black">
                                  {s.extraPageOption.included + (sel.extraPages ?? 0)}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const v = Math.min(50, (sel.extraPages ?? 0) + 1);
                                    updateSelection(s.id, { extraPages: v });
                                  }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)] text-[16px] font-bold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-white"
                                  aria-label="Unterseiten erhöhen"
                                >
                                  +
                                </button>
                              </div>
                              {(sel.extraPages ?? 0) > 0 && (
                                <span className="text-[12px] text-[var(--text-muted)]">
                                  +{sel.extraPages} extra · {sel.extraPages! * s.extraPageOption.pricePerExtra} € zusätzlich
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Duration-Selector (SEO / KI Retainer) */}
                        {s.durationOptions && (
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                              Laufzeit
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {s.durationOptions.map((months) => {
                                const isActive =
                                  (sel.durationMonths ?? s.durationMonths) === months;
                                return (
                                  <button
                                    key={months}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateSelection(s.id, {
                                        durationMonths: months,
                                      });
                                    }}
                                    className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
                                      isActive
                                        ? "bg-[var(--accent)] text-white"
                                        : "border border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--text)]"
                                    }`}
                                  >
                                    {months} Monate
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {s.note && !active && (
                      <div className="pointer-events-none relative z-0 mt-4 border-t border-[var(--border)] pt-3 text-[11px] text-[var(--gold-text)]">
                        {s.note}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Action-Bar — mit Card-Radius + größerem Mobile-Margin */}
      <div className="sticky bottom-4 z-30 -mt-24 sm:bottom-6 sm:-mt-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-white p-3 shadow-[0_14px_40px_-10px_rgba(10,10,10,0.25)] backdrop-blur sm:p-3.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            <div className="flex min-w-0 items-center gap-2.5 pl-2 text-[13px] sm:pl-3 sm:text-[14px]">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                  selectedCount > 0
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg)] text-[var(--text-subtle)]"
                }`}
              >
                {selectedCount}
              </span>
              <span className="text-[var(--text-muted)]">
                {selectedCount === 0 ? (
                  <>Wähle deine Leistungen</>
                ) : selectedCount === 1 ? (
                  <span>
                    <strong className="text-[var(--text)]">1 Leistung</strong>{" "}
                    <span className="hidden sm:inline">ausgewählt</span>
                  </span>
                ) : (
                  <span>
                    <strong className="text-[var(--text)]">
                      {selectedCount} Leistungen
                    </strong>{" "}
                    <span className="hidden sm:inline">·</span>{" "}
                    <span className="hidden sm:inline">
                      {Math.round(BUNDLE_DISCOUNT * 100)} % Bundle-Rabatt
                    </span>
                  </span>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={calculate}
              disabled={selectedCount === 0 || submitting}
              className="group relative inline-flex w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white transition disabled:opacity-30 sm:w-auto sm:px-6 sm:py-3 sm:text-[14px]"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">
                {submitting ? "Wird berechnet …" : "Preis berechnen"}
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
