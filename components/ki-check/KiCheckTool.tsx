"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KiCheckResult, UserAnswers, PillarResult } from "@/lib/ki-check/types";

type Step = "wizard" | "loading" | "result" | "error";

const GOAL_OPTIONS: Array<{ value: NonNullable<UserAnswers["goal"]>; label: string; hint: string }> = [
  { value: "leads", label: "Mehr Leads", hint: "Anfragen + Buchungen über die Webseite" },
  { value: "lokal", label: "Lokale Sichtbarkeit", hint: "In Google Maps + lokal gefunden werden" },
  { value: "ki", label: "KI-Empfehlung", hint: "Von ChatGPT, Claude, Perplexity empfohlen werden" },
  { value: "alle", label: "Alles zusammen", hint: "Das volle Programm" },
];

function StatusDot({ status }: { status: "pass" | "warn" | "fail" }) {
  const color =
    status === "pass" ? "bg-emerald-500" : status === "warn" ? "bg-amber-500" : "bg-red-500";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 88;
  const stroke = 14;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  const color =
    score >= 80
      ? "#16a34a"
      : score >= 60
        ? "#1663DE"
        : score >= 35
          ? "#db6f16"
          : "#dc2626";
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
      <circle cx="110" cy="110" r={radius} stroke="#f0f0f0" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx="110"
        cy="110"
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function KiCheckTool() {
  const [step, setStep] = useState<Step>("wizard");
  const [wizardStep, setWizardStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({ url: "" });
  const [result, setResult] = useState<KiCheckResult | null>(null);
  const [error, setError] = useState<string>("");

  // Lead-Capture-State
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [mailState, setMailState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function runCheck() {
    setStep("loading");
    setError("");
    try {
      const res = await fetch("/api/ki-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Etwas ist schiefgelaufen.");
        setStep("error");
        return;
      }
      setResult(data as KiCheckResult);
      setStep("result");
    } catch {
      setError("Netzwerk-Fehler. Bitte später erneut versuchen.");
      setStep("error");
    }
  }

  async function sendReport(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !email || !consent) return;
    setMailState("sending");
    try {
      const res = await fetch("/api/ki-check/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId: result.id, email, consent }),
      });
      if (!res.ok) {
        setMailState("error");
        return;
      }
      setMailState("sent");
    } catch {
      setMailState("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <AnimatePresence mode="wait">
        {/* WIZARD */}
        {step === "wizard" && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-10"
          >
            {/* Progress */}
            <div className="mb-8 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition ${i <= wizardStep ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`}
                />
              ))}
            </div>

            {wizardStep === 0 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">Schritt 1 von 3</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black leading-tight tracking-tight md:text-3xl">
                  Welche Webseite sollen wir prüfen?
                </h2>
                <p className="mt-3 text-[14px] text-[var(--text-muted)]">
                  Wir checken automatisch 20+ Punkte — KI-Crawler, Schema, SEO, Performance, Trust.
                </p>
                <input
                  type="url"
                  inputMode="url"
                  placeholder="https://deine-webseite.de"
                  value={answers.url}
                  onChange={(e) => setAnswers({ ...answers, url: e.target.value })}
                  className="mt-6 w-full rounded-2xl border border-[var(--border-strong)] bg-white px-5 py-4 text-[16px] font-medium text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                  autoFocus
                />
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={!answers.url || answers.url.length < 4}
                    onClick={() => setWizardStep(1)}
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[var(--accent)] disabled:opacity-30"
                  >
                    Weiter
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 1 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">Schritt 2 von 3</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black leading-tight tracking-tight md:text-3xl">
                  In welcher Stadt / Region bist du aktiv?
                </h2>
                <p className="mt-3 text-[14px] text-[var(--text-muted)]">
                  Hilft uns, lokale Empfehlungen für dich zu personalisieren.
                </p>
                <input
                  type="text"
                  placeholder="z. B. Koblenz, Frankfurt, Bad Ems …"
                  value={answers.city || ""}
                  onChange={(e) => setAnswers({ ...answers, city: e.target.value })}
                  className="mt-6 w-full rounded-2xl border border-[var(--border-strong)] bg-white px-5 py-4 text-[16px] font-medium text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                  autoFocus
                />
                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(0)}
                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    ← Zurück
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[var(--accent)]"
                  >
                    Weiter
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">Schritt 3 von 3</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black leading-tight tracking-tight md:text-3xl">
                  Was ist dein Hauptziel?
                </h2>
                <p className="mt-3 text-[14px] text-[var(--text-muted)]">
                  Wir gewichten die Empfehlungen passend zu deinem Ziel.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {GOAL_OPTIONS.map((g) => {
                    const active = answers.goal === g.value;
                    return (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setAnswers({ ...answers, goal: g.value })}
                        className={`group rounded-2xl border p-5 text-left transition ${
                          active
                            ? "border-[var(--accent)] bg-[var(--accent)]/5"
                            : "border-[var(--border)] bg-white hover:border-[var(--text)]"
                        }`}
                      >
                        <div className="font-semibold text-[var(--text)]">{g.label}</div>
                        <div className="mt-1 text-[13px] text-[var(--text-muted)]">{g.hint}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    ← Zurück
                  </button>
                  <button
                    type="button"
                    disabled={!answers.goal}
                    onClick={runCheck}
                    className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-7 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[var(--accent-dark,_#0a4bb8)] disabled:opacity-30"
                  >
                    Check starten
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-3xl border border-[var(--border)] bg-white p-10 text-center shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)]"
          >
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight">
                Wir prüfen deine Seite …
              </h2>
              <p className="mt-2 text-[14px] text-[var(--text-muted)]">
                robots.txt · llms.txt · Schema.org · Meta · Sitemap · Performance · E-E-A-T
                <br />
                Das dauert 10–25 Sekunden — wir checken auch echte Lighthouse-Werte.
              </p>
            </div>
          </motion.div>
        )}

        {/* ERROR */}
        {step === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl font-black text-red-700">
              Ups — Check fehlgeschlagen
            </h2>
            <p className="mt-2 text-[14px] text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => {
                setStep("wizard");
                setWizardStep(0);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white"
            >
              Erneut versuchen
            </button>
          </motion.div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Score-Hero */}
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-8 text-center shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Dein KI-Sichtbarkeits-Score
              </p>
              <div className="relative mx-auto mt-6 inline-flex">
                <ScoreRing score={result.score} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-[family-name:var(--font-display)] text-6xl font-black leading-none">
                    {result.score}
                  </div>
                  <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                    von 100
                  </div>
                </div>
              </div>
              <div className="mt-5 text-[15px] font-semibold capitalize text-[var(--text)]">
                Status: {result.scoreLabel === "ausbaufaehig" ? "ausbaufähig" : result.scoreLabel}
              </div>
              <div className="mt-3 text-[13px] text-[var(--text-muted)]">
                Geprüft: <span className="font-mono text-[var(--text)]">{result.normalizedUrl}</span>
              </div>
            </div>

            {/* 4 Säulen */}
            <div className="grid gap-4 md:grid-cols-2">
              {result.pillars.map((p: PillarResult) => (
                <div
                  key={p.id}
                  className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-semibold text-[var(--text)]">{p.title}</div>
                    <div
                      className={`text-[18px] font-black ${
                        p.score >= 19
                          ? "text-emerald-600"
                          : p.score >= 10
                            ? "text-[var(--gold)]"
                            : "text-red-600"
                      }`}
                    >
                      {p.score}/25
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">{p.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {p.items.map((it) => (
                      <li key={it.id} className="flex items-start gap-2.5 text-[13px]">
                        <span className="mt-1.5">
                          <StatusDot status={it.status} />
                        </span>
                        <span className="text-[var(--text)]">
                          <span className="font-medium">{it.label}</span>
                          <span className="block text-[12px] text-[var(--text-muted)]">{it.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Top-Empfehlungen */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-10">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight md:text-2xl">
                Deine 3 wichtigsten Hebel
              </h3>
              <div className="mt-5 space-y-3">
                {result.topRecommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border-l-4 border-[var(--accent)] bg-[var(--bg)] p-4"
                  >
                    <div className="text-[14px] font-semibold text-[var(--text)]">
                      #{i + 1} — {rec.title}
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">
                      {rec.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hard CTA */}
            <div className="overflow-hidden rounded-3xl bg-[var(--text)] p-8 text-center text-white md:p-12">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight md:text-3xl">
                Du willst diese Hebel <span className="font-[family-name:var(--font-serif)] italic text-[var(--gold)]">umgesetzt</span> sehen?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-[14px] text-white/70 md:text-[15px]">
                In 15 Minuten zeige ich dir persönlich, wie wir deine Webseite in 90 Tagen
                auf Google, ChatGPT und Perplexity nach vorne bringen.
              </p>
              <a
                href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-white"
              >
                Erstgespräch buchen → 15 Min mit Albert
              </a>
            </div>

            {/* Soft-Gate: PDF-/Mail-Report */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 md:p-10">
              <div className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    📩 Kostenlos
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-black leading-tight tracking-tight md:text-2xl">
                    Hol dir den ausführlichen Bericht per E-Mail — kostenlos.
                  </h3>
                  <p className="mt-2 text-[13px] text-[var(--text-muted)]">
                    Wir schicken dir alle Findings + konkrete Umsetzungs-Tipps direkt ins Postfach.
                  </p>
                </div>
                {mailState === "sent" ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                    <div className="text-2xl">✅</div>
                    <div className="mt-2 font-semibold text-emerald-800">
                      Check dein Postfach!
                    </div>
                    <div className="mt-1 text-[13px] text-emerald-700">
                      Der Bericht ist unterwegs zu {email}.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={sendReport} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="deine@e-mail.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-strong)] bg-white px-5 py-3.5 text-[15px] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                    <label className="flex items-start gap-2.5 text-[12px] leading-relaxed text-[var(--text-muted)]">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
                      />
                      <span>
                        Ich stimme zu, dass mir der Bericht per E-Mail zugesendet wird. Keine Newsletter ohne weitere Zustimmung.{" "}
                        <a href="/datenschutz" className="underline" target="_blank">
                          Datenschutz
                        </a>
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={!email || !consent || mailState === "sending"}
                      className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
                    >
                      {mailState === "sending" ? "Wird versendet …" : "Bericht jetzt zusenden"}
                    </button>
                    {mailState === "error" && (
                      <p className="text-[12px] text-red-600">
                        Versand fehlgeschlagen. Bitte später erneut.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Neuen Check */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setStep("wizard");
                  setWizardStep(0);
                  setAnswers({ url: "" });
                  setResult(null);
                  setEmail("");
                  setConsent(false);
                  setMailState("idle");
                }}
                className="text-[13px] font-medium text-[var(--text-muted)] underline hover:text-[var(--text)]"
              >
                Weitere Webseite checken
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
