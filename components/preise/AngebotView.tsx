"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  calcTotals,
  decodeSelections,
  BUNDLE_DISCOUNT,
  type ResolvedSelection,
} from "@/content/pricing";
import ServiceIcon from "./ServiceIcon";

const TIDYCAL_URL =
  "https://tidycal.com/albertipgefer/strategiegespraech-mit-wohlstandsmarketing";

function formatEuro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function describeSelection(r: ResolvedSelection): string {
  if (r.service.onRequest) return "individuell · auf Anfrage";
  const parts: string[] = [];
  if (r.service.multiplyByQuantity && r.selection.quantity && r.selection.quantity > 1) {
    parts.push(`${r.selection.quantity}× Landingpage`);
  }
  if (r.service.extraPageOption) {
    const inc = r.service.extraPageOption.included;
    const extra = r.selection.extraPages ?? 0;
    parts.push(extra > 0 ? `${inc} inkl. + ${extra} Extra-Seiten` : `${inc} Unterseiten inkl.`);
  }
  if (r.service.monthly && r.effectiveDuration) {
    parts.push(`${r.effectiveDuration} Monate Laufzeit`);
  } else if (r.service.monthly) {
    parts.push("monatlich");
  } else if (!r.service.multiplyByQuantity && !r.service.extraPageOption) {
    parts.push("einmalig");
  }
  return parts.join(" · ");
}

// Loading-Phasen — ~7 s
const LOADING_PHASES = [
  { label: "Wir prüfen deine Auswahl …", detail: "Leistungen werden analysiert", duration: 1500 },
  { label: "Investitions-Plan wird zusammengestellt …", detail: "Einmalige + monatliche Kosten", duration: 1800 },
  { label: "Paket-Rabatt wird berechnet …", detail: "10 % bei 3+ Leistungen", duration: 1500 },
  { label: "Dein individuelles Angebot wird vorbereitet …", detail: "Finale Übersicht generieren", duration: 2200 },
];

function LoadingView() {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalDuration = LOADING_PHASES.reduce((s, p) => s + p.duration, 0);

  useEffect(() => {
    let elapsed = 0;
    const timers: number[] = [];
    LOADING_PHASES.forEach((p, idx) => {
      elapsed += p.duration;
      timers.push(
        window.setTimeout(() => setPhase(idx + 1), elapsed - p.duration + 50),
      );
    });
    const start = performance.now();
    const tick = () => {
      const t = performance.now() - start;
      const pct = Math.min(99, (t / totalDuration) * 100);
      setProgress(pct);
      if (pct < 99) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => timers.forEach(clearTimeout);
  }, [totalDuration]);

  const current = LOADING_PHASES[Math.min(phase, LOADING_PHASES.length - 1)];

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight md:text-3xl">
            Wir stellen dein Angebot zusammen …
          </h2>
          <div className="mt-2 text-[13px] text-[var(--text-subtle)]">
            Schritt {Math.min(phase + 1, LOADING_PHASES.length)} von{" "}
            {LOADING_PHASES.length}
          </div>
        </div>
      </div>

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-center"
        >
          <div className="text-[15px] font-semibold text-[var(--text)]">
            {current.label}
          </div>
          <div className="mt-1 text-[12px] text-[var(--text-muted)]">
            {current.detail}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function AngebotView({ encoded }: { encoded: string }) {
  const router = useRouter();
  const selections = decodeSelections(encoded);
  const totals = calcTotals(selections);

  const [step, setStep] = useState<"loading" | "gate">("loading");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const MIN_LOADING_MS = LOADING_PHASES.reduce((s, p) => s + p.duration, 0);

  useEffect(() => {
    if (selections.length === 0) return;
    const t = setTimeout(() => {
      setStep("gate");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }, MIN_LOADING_MS);
    return () => clearTimeout(t);
  }, [selections.length, MIN_LOADING_MS]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !consent) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/angebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          consent,
          selections: encoded,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setError(d?.error ?? "Versand fehlgeschlagen.");
        setSending(false);
        return;
      }
      const params = new URLSearchParams({ name: firstName });
      router.push(`/preise/danke?${params.toString()}`);
    } catch {
      setError("Netzwerk-Fehler. Bitte später erneut versuchen.");
      setSending(false);
    }
  }

  if (selections.length === 0 || totals.selected.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-white p-8 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-black">
          Keine Leistungen ausgewählt
        </h2>
        <p className="mt-3 text-[14px] text-[var(--text-muted)]">
          Bitte gehe zurück zur Preise-Seite und wähle deine Leistungen aus.
        </p>
        <button
          type="button"
          onClick={() => router.push("/preise")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[var(--accent)]"
        >
          ← Zurück zur Auswahl
        </button>
      </div>
    );
  }

  if (step === "loading") return <LoadingView />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      {/* ─── BLURRED PREIS-GATE ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Ausgewählte Leistungen */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Angebot bereit
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-black tracking-tight md:text-2xl">
            Deine Auswahl ist zusammengestellt
          </h2>
          <p className="mt-1 text-[13px] text-[var(--text-muted)]">
            {totals.selected.length}{" "}
            {totals.selected.length === 1 ? "Leistung" : "Leistungen"}
            {totals.hasBundle &&
              ` · ${Math.round(BUNDLE_DISCOUNT * 100)} % Paket-Rabatt aktiv`}
          </p>

          <ul className="mt-5 space-y-3">
            {totals.selected.map((r) => (
              <li
                key={r.service.id}
                className="flex items-start gap-3 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--bg)] text-[var(--text)]">
                  <ServiceIcon name={r.service.icon} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[var(--text)]">
                    {r.service.name}
                  </div>
                  <div className="text-[12px] text-[var(--text-muted)]">
                    {describeSelection(r)}
                  </div>
                </div>
                <span className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
                  ✓
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Blurred Preis-Box */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-12 h-[260px] w-[260px] bg-[radial-gradient(circle,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
          />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Dein Preis
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight md:text-3xl">
              Investitions-Übersicht
            </h2>

            <div className="relative mt-6">
              <div className="space-y-4 select-none blur-[8px]">
                {totals.oneTimeRaw === 0 && totals.monthlyRaw === 0 && (
                  <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
                    <div className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                      Investition
                    </div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-black md:text-3xl">
                      auf Anfrage
                    </div>
                  </div>
                )}
                {totals.oneTimeRaw > 0 && (
                  <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
                    <div className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                      Einmalig
                    </div>
                    <div className="font-[family-name:var(--font-display)] text-3xl font-black md:text-4xl">
                      {formatEuro(totals.oneTime)}
                    </div>
                  </div>
                )}
                {totals.monthlyRaw > 0 && (
                  <div className="flex items-baseline justify-between">
                    <div className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                      Monatlich
                    </div>
                    <div>
                      <span className="font-[family-name:var(--font-display)] text-3xl font-black md:text-4xl">
                        {formatEuro(totals.monthly)}
                      </span>
                      <span className="text-[14px] text-[var(--text-subtle)]">
                        /Mo
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-xl">
                  🔒 Preis freischalten
                </div>
                <div className="max-w-xs text-center text-[12px] leading-relaxed text-[var(--text-muted)]">
                  Trage rechts deine Kontaktdaten ein — du erhältst dein Angebot
                  sofort per E-Mail.
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/preise")}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          ← Auswahl ändern
        </button>
      </motion.div>

      {/* ─── LEAD-FORM ─── */}
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-8 lg:sticky lg:top-24 lg:self-start"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          📩 100 % kostenlos
        </span>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-black leading-tight tracking-tight md:text-2xl">
          Angebot freischalten &amp; per E-Mail erhalten
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
          Du bekommst dein individuelles Angebot inkl. Preisen, Leistungen und
          nächsten Schritten direkt in dein Postfach.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">
              Vorname *
            </label>
            <input
              type="text"
              required
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Max"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border-strong)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">
              Nachname *
            </label>
            <input
              type="text"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Mustermann"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border-strong)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">
              E-Mail *
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="max@firma.de"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border-strong)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">
              Telefon *
            </label>
            <input
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+49 176 …"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border-strong)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
        </div>

        <label className="mt-5 flex items-start gap-2.5 text-[12px] leading-relaxed text-[var(--text-muted)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
          />
          <span>
            Ich stimme zu, dass mir das Angebot per E-Mail zugesendet wird und
            Wohlstandsmarketing mich telefonisch zur Anfrage kontaktieren darf.{" "}
            <a href="/datenschutz" className="underline" target="_blank">
              Datenschutz
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={
            !firstName || !lastName || !email || !phone || !consent || sending
          }
          className="group relative mt-6 w-full overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white transition disabled:opacity-40"
        >
          <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative z-10">
            {sending ? "Wird freigeschaltet …" : "🔓 Angebot jetzt freischalten"}
          </span>
        </button>

        {error && (
          <p className="mt-3 text-center text-[12px] text-red-600">
            {error}. Alternativ direkt buchen:{" "}
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              TidyCal
            </a>
          </p>
        )}

        <p className="mt-4 text-center text-[11px] text-[var(--text-subtle)]">
          Keine Spam-Mails. Wir nutzen deine Daten nur für den Angebots-Versand
          und eine persönliche Rückmeldung.
        </p>
      </motion.form>
    </div>
  );
}
