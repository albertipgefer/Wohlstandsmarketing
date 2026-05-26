"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, calcTotals, BUNDLE_DISCOUNT } from "@/content/pricing";

const TIDYCAL_URL =
  "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";

function formatEuro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const CATEGORY_LABELS: Record<string, string> = {
  webdesign: "Webdesign",
  optimierung: "Optimierung",
  wartung: "Wartung",
};

export default function PricingConfigurator() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const totals = useMemo(() => calcTotals(selected), [selected]);

  // Items gruppiert nach Kategorie für die Anzeige
  const groups = useMemo(() => {
    const g: Record<string, typeof services> = {};
    for (const s of services) {
      if (!g[s.category]) g[s.category] = [];
      g[s.category].push(s);
    }
    return g;
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
      {/* ─── Service-Auswahl ─── */}
      <div className="space-y-10">
        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-[var(--text)] md:text-xl">
              {CATEGORY_LABELS[cat]}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map((s) => {
                const active = selected.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggle(s.id)}
                    aria-pressed={active}
                    className={`group relative rounded-3xl border p-5 text-left transition ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_10px_30px_-12px_rgba(22,99,222,0.3)]"
                        : "border-[var(--border)] bg-white hover:border-[var(--text)]"
                    }`}
                  >
                    {/* Checkmark */}
                    <span
                      className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-[var(--border)] bg-white"
                      }`}
                      aria-hidden
                    >
                      {active && <span className="text-[12px] font-bold">✓</span>}
                    </span>

                    <div className="text-2xl" aria-hidden>
                      {s.icon}
                    </div>
                    <div className="mt-3 font-[family-name:var(--font-display)] text-[17px] font-bold leading-tight tracking-tight text-[var(--text)] md:text-lg">
                      {s.name}
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">
                      {s.short}
                    </div>

                    <ul className="mt-3 space-y-1">
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

                    <div className="mt-4 flex items-baseline justify-between border-t border-[var(--border)] pt-3">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                        {s.monthly ? "monatlich" : "einmalig"}
                      </div>
                      <div className="text-right">
                        <span className="font-[family-name:var(--font-display)] text-xl font-black text-[var(--text)] md:text-2xl">
                          {formatEuro(s.monthly ?? s.oneTime ?? 0)}
                        </span>
                        {s.monthly && (
                          <span className="ml-1 text-[12px] text-[var(--text-subtle)]">
                            /Monat
                          </span>
                        )}
                      </div>
                    </div>

                    {s.durationMonths && (
                      <div className="mt-2 text-[11px] text-[var(--text-subtle)]">
                        Mindestlaufzeit {s.durationMonths} Monate
                      </div>
                    )}
                    {s.note && (
                      <div className="mt-2 text-[11px] text-[var(--gold)]">
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

      {/* ─── Live-Summary (Sticky auf Desktop, am Ende auf Mobile) ─── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight md:text-xl">
              Deine Auswahl
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                totals.selected.length > 0
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "bg-[var(--bg)] text-[var(--text-subtle)]"
              }`}
            >
              {totals.selected.length}{" "}
              {totals.selected.length === 1 ? "Leistung" : "Leistungen"}
            </span>
          </div>

          {/* Empty-State */}
          {totals.selected.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[var(--bg)] p-5 text-center">
              <div className="text-3xl">👉</div>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-muted)]">
                Wähle links die Leistungen aus, die für dich relevant sind.
                Live siehst du hier deine Gesamtinvestition.
              </p>
            </div>
          ) : (
            <>
              {/* Liste der ausgewählten Items */}
              <ul className="mt-5 space-y-3 border-b border-[var(--border)] pb-5">
                <AnimatePresence initial={false}>
                  {totals.selected.map((s) => (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start justify-between gap-3 text-[13px]"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-[var(--text)]">
                          {s.name}
                        </div>
                        {s.durationMonths && (
                          <div className="text-[11px] text-[var(--text-subtle)]">
                            ab {s.durationMonths} Monaten
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 text-right text-[var(--text)]">
                        {formatEuro(s.monthly ?? s.oneTime ?? 0)}
                        {s.monthly && (
                          <span className="text-[11px] text-[var(--text-subtle)]">
                            /Mo
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Totale */}
              <div className="mt-5 space-y-3">
                {totals.oneTimeRaw > 0 && (
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                      Einmalig
                    </span>
                    <div className="text-right">
                      {totals.hasBundle && (
                        <span className="mr-2 text-[12px] text-[var(--text-subtle)] line-through">
                          {formatEuro(totals.oneTimeRaw)}
                        </span>
                      )}
                      <span className="font-[family-name:var(--font-display)] text-xl font-black">
                        {formatEuro(totals.oneTime)}
                      </span>
                    </div>
                  </div>
                )}
                {totals.monthlyRaw > 0 && (
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                      Monatlich
                    </span>
                    <div className="text-right">
                      {totals.hasBundle && (
                        <span className="mr-2 text-[12px] text-[var(--text-subtle)] line-through">
                          {formatEuro(totals.monthlyRaw)}
                        </span>
                      )}
                      <span className="font-[family-name:var(--font-display)] text-xl font-black">
                        {formatEuro(totals.monthly)}
                        <span className="text-[12px] text-[var(--text-subtle)]">
                          /Mo
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bundle-Rabatt Hinweis */}
              {totals.hasBundle && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="text-lg">🎁</div>
                    <div>
                      <div className="text-[13px] font-semibold text-emerald-800">
                        Bundle-Rabatt aktiv
                      </div>
                      <div className="mt-0.5 text-[12px] leading-relaxed text-emerald-700">
                        Du sparst{" "}
                        <strong>{formatEuro(totals.discountAmount)}</strong> ·{" "}
                        {Math.round(BUNDLE_DISCOUNT * 100)} % auf alle Leistungen.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {!totals.hasBundle && totals.selected.length === 1 && (
                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[12px] leading-relaxed text-[var(--text-muted)]">
                  💡 <strong>Tipp:</strong> Wähle eine weitere Leistung und du
                  bekommst automatisch {Math.round(BUNDLE_DISCOUNT * 100)} %
                  Bundle-Rabatt.
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <a
            href={TIDYCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-4 text-[14px] font-semibold transition ${
              totals.selected.length > 0
                ? "bg-[var(--text)] text-white"
                : "border border-[var(--border-strong)] bg-white text-[var(--text)]"
            }`}
          >
            {totals.selected.length > 0 && (
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            )}
            <span className="relative z-10">
              {totals.selected.length > 0
                ? "Erstgespräch mit Auswahl buchen"
                : "Unverbindlich Erstgespräch buchen"}
            </span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <p className="mt-3 text-center text-[11px] text-[var(--text-subtle)]">
            Kostenfrei · 15 Min · Albert persönlich
          </p>
        </div>
      </aside>
    </div>
  );
}
