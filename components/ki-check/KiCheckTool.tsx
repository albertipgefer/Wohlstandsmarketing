"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KiCheckResult, UserAnswers, PillarResult } from "@/lib/ki-check/types";

type Step = "wizard" | "loading" | "result" | "error";

const GOAL_OPTIONS: Array<{ value: NonNullable<UserAnswers["goal"]>; label: string; hint: string }> = [
  { value: "leads", label: "Mehr Leads", hint: "Anfragen + Buchungen über die Webseite" },
  { value: "lokal", label: "Lokale Sichtbarkeit", hint: "In Google Maps + lokal gefunden werden" },
  { value: "ki", label: "KI-Empfehlung", hint: "Von ChatGPT, Claude, Perplexity empfohlen werden" },
  { value: "alle", label: "Alles zusammen", hint: "Das volle Programm" },
];

// Loading-Phasen — laufen mind. ~12s damit der Check seriös wirkt
const LOADING_PHASES = [
  { label: "Webseite wird geladen…", detail: "HTTP-Request + Redirect-Auflösung", duration: 2200 },
  { label: "robots.txt + llms.txt werden geprüft…", detail: "KI-Crawler-Zugang analysieren", duration: 2400 },
  { label: "Schema.org JSON-LD wird ausgewertet…", detail: "Organization, Person, FAQ, Article …", duration: 2400 },
  { label: "Meta-Tags & SEO-Basics werden gescannt…", detail: "Title, Description, OG, Canonical, Sitemap", duration: 2200 },
  { label: "Lighthouse-Performance wird ermittelt…", detail: "Core Web Vitals via Google PageSpeed Insights", duration: 3400 },
  { label: "Trust-Signale werden geprüft…", detail: "Impressum, About, Social-Profile, HTTPS", duration: 1800 },
  { label: "Score wird berechnet…", detail: "Gewichtung über 4 Säulen", duration: 1400 },
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
        transition={{ duration: 1.4, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Loading-View mit echten Phasen + Progress-Bar
// ─────────────────────────────────────────────────────────────
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
    // Progress-Bar smooth über totalDuration
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
    <div className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-12">
      {/* Spinner + Phase-Label */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight md:text-3xl">
            Wir scannen deine Seite …
          </h2>
          <div className="mt-2 text-[13px] text-[var(--text-subtle)]">
            Schritt {Math.min(phase + 1, LOADING_PHASES.length)} von {LOADING_PHASES.length}
          </div>
        </div>
      </div>

      {/* Progress-Bar */}
      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Aktuelle Phase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-center"
        >
          <div className="text-[15px] font-semibold text-[var(--text)]">{current.label}</div>
          <div className="mt-1 text-[12px] text-[var(--text-muted)]">{current.detail}</div>
        </motion.div>
      </AnimatePresence>

      {/* Mini-Checkliste */}
      <ul className="mt-6 space-y-2">
        {LOADING_PHASES.map((p, i) => {
          const done = i < phase;
          const active = i === phase;
          return (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[12px] transition ${
                active ? "bg-[var(--accent)]/5" : ""
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {done ? (
                  <span className="text-emerald-500">✓</span>
                ) : active ? (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[var(--border)]" />
                )}
              </span>
              <span className={done ? "text-[var(--text-muted)] line-through" : active ? "font-medium text-[var(--text)]" : "text-[var(--text-subtle)]"}>
                {p.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Hauptkomponente
// ─────────────────────────────────────────────────────────────
export default function KiCheckTool() {
  const [step, setStep] = useState<Step>("wizard");
  const [wizardStep, setWizardStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({ url: "" });
  const [result, setResult] = useState<KiCheckResult | null>(null);
  const [error, setError] = useState<string>("");

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [mailState, setMailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [mailError, setMailError] = useState<string>("");

  const resultRef = useRef<HTMLDivElement>(null);

  // Min-Loading-Zeit für Glaubwürdigkeit
  const MIN_LOADING_MS = LOADING_PHASES.reduce((s, p) => s + p.duration, 0);

  async function runCheck() {
    setStep("loading");
    setError("");
    const started = Date.now();
    try {
      const apiPromise = fetch("/api/ki-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      }).then((r) => r.json().then((d) => ({ ok: r.ok, d })));

      const [apiRes] = await Promise.all([apiPromise]);
      // Warten bis die Loading-Animation fertig ist
      const elapsed = Date.now() - started;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((res) => setTimeout(res, MIN_LOADING_MS - elapsed));
      }
      if (!apiRes.ok) {
        setError(apiRes.d?.error || "Etwas ist schiefgelaufen.");
        setStep("error");
        return;
      }
      setResult(apiRes.d as KiCheckResult);
      setStep("result");
    } catch {
      setError("Netzwerk-Fehler. Bitte später erneut versuchen.");
      setStep("error");
    }
  }

  // Auto-scroll zum Result wenn fertig
  useEffect(() => {
    if (step === "result" && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [step]);

  async function sendReport(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !email || !consent) return;
    setMailState("sending");
    setMailError("");
    try {
      const res = await fetch("/api/ki-check/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result, email, consent }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setMailError(d?.error ?? "Versand fehlgeschlagen.");
        setMailState("error");
        return;
      }
      setMailState("sent");
    } catch {
      setMailError("Netzwerk-Fehler beim Versand.");
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
                    className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-7 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-90 disabled:opacity-30"
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
          >
            <LoadingView />
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

        {/* RESULT — Reihenfolge: Score → Säulen → Top-3 → Mail-Soft-Gate → Hard-CTA */}
        {step === "result" && result && (
          <motion.div
            ref={resultRef}
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* ─── 1. SCORE-HERO ─── */}
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

            {/* ─── 2. 4 SÄULEN ─── */}
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

            {/* ─── 3. TOP-3 HEBEL ─── */}
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

            {/* ─── 4. SOFT-GATE: MAIL-REPORT ─── */}
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
                        Versand fehlgeschlagen{mailError ? ` (${mailError})` : ""}. Bitte später erneut.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* ─── 5. HARD CTA — CI-Design ─── */}
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-8 text-center md:p-14">
              {/* Atmosphäre */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] bg-[radial-gradient(circle,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 bottom-0 h-[280px] w-[280px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="font-semibold text-[var(--accent)]">Nächster Schritt</span>
                </span>

                <h3
                  className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
                  style={{ fontSize: "clamp(1.85rem, 4.2vw, 3rem)" }}
                >
                  Du willst diese Hebel{" "}
                  <span className="relative inline-block">
                    <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                      umgesetzt
                    </span>
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      height="12"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M2 8C 50 2, 100 10, 150 5 S 195 7, 198 4"
                        stroke="#db6f16"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    </svg>
                  </span>{" "}
                  sehen?
                </h3>

                <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  In 15 Minuten zeige ich dir persönlich, wie wir deine Webseite in 90 Tagen
                  auf Google, ChatGPT und Perplexity nach vorne bringen.
                </p>

                <a
                  href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[14px] font-semibold text-white transition"
                >
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Erstgespräch buchen → 15 Min mit Albert</span>
                </a>

                <div className="mt-4 text-[12px] text-[var(--text-subtle)]">
                  Kostenfrei · Unverbindlich · Persönlich
                </div>
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
                  setMailError("");
                }}
                className="text-[13px] font-medium text-[var(--text-muted)] underline hover:text-[var(--text)]"
              >
                Weitere Webseite checken
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HOW IT WORKS — nur sichtbar, solange noch kein Ergebnis da ist */}
      {(step === "wizard" || step === "error") && (
        <section className="mt-24 border-t border-[var(--border)] pt-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              So funktioniert der Check
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight md:text-4xl">
              4 Säulen · 20+ Prüfpunkte · 1 Score
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "KI-Crawler & Auffindbarkeit",
                body: "Dürfen GPTBot, ClaudeBot, PerplexityBot deine Seite lesen? Gibt es eine llms.txt mit Hints?",
              },
              {
                title: "Schema.org",
                body: "Strukturierte Daten (Organization, Person, FAQ, Article) — die KI versteht, was du bist.",
              },
              {
                title: "SEO-Fundament",
                body: "Title, Meta, OG-Image, Canonical, Sitemap — die Grundlage, damit du überhaupt indexiert wirst.",
              },
              {
                title: "Performance & Trust",
                body: "Core Web Vitals via Lighthouse, Impressum, About-Seite, Social-Profile (E-E-A-T).",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6"
              >
                <div className="font-[family-name:var(--font-display)] text-[28px] font-black text-[var(--accent)]">
                  0{i + 1}
                </div>
                <div className="mt-3 font-semibold text-[var(--text)]">{p.title}</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
                  {p.body}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
