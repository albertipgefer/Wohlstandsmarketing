"use client";

/**
 * LocationCheckTool — Conversion-Wizard für die Eventlocation-Kampagne.
 *
 * Flow (ein Feld pro Screen, Hormozi-Stil):
 *   qualify: Location-Name → Website-URL → Fit-Frage (Firmenfeiern Ja/Nein)
 *     → echter Live-KI-Check (/api/ki-check)
 *   score:   geblurter Score als Anreiz (bestehende Mechanik)
 *   contact: Vorname → Nachname → E-Mail → Telefon → Consent + Absenden
 *     → /api/ki-check/report (campaign: "location-check")
 *     → /location-check/danke
 *
 * Bewusst eigenständig (Fork von KiCheckTool), damit der generische
 * /sichtbarkeits-check-Funnel unberührt bleibt.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";
import type { KiCheckResult } from "@/lib/ki-check/types";

type Phase = "qualify" | "loading" | "score" | "contact" | "error";

const LOADING_PHASES = [
  { label: "Webseite wird geladen…", detail: "HTTP-Request + Redirect-Auflösung", duration: 2500 },
  { label: "Sitemap wird analysiert…", detail: "Alle relevanten Unterseiten werden ermittelt", duration: 3000 },
  { label: "robots.txt + llms.txt werden geprüft…", detail: "KI-Crawler-Zugang für GPTBot, ClaudeBot, PerplexityBot …", duration: 3500 },
  { label: "Unterseiten werden parallel gescannt…", detail: "Bis zu 20 Seiten gleichzeitig — kann etwas dauern", duration: 12000 },
  { label: "Schema.org JSON-LD wird ausgewertet…", detail: "Organization, Event, LocalBusiness, FAQ …", duration: 4500 },
  { label: "Meta-Tags & SEO-Basics werden konsolidiert…", detail: "Title, Description, OG, Canonical, Alt-Texte über alle Seiten", duration: 5000 },
  { label: "Lighthouse-Performance wird ermittelt…", detail: "Core Web Vitals für die 3 wichtigsten Seiten via PageSpeed", duration: 14000 },
  { label: "Trust- & E-E-A-T-Signale werden geprüft…", detail: "Impressum, Über-uns, Social-Profile, HTTPS, NAP", duration: 4000 },
  { label: "Aggregierte Statistik wird erstellt…", detail: "Findings über alle Seiten zusammenführen", duration: 3500 },
  { label: "Top-3-Hebel werden priorisiert…", detail: "Gewichtung nach Firmenfeier-Sichtbarkeit", duration: 2500 },
];

// E-Mail/Telefon-Validierung spiegelt die Server-Checks in /api/ki-check/report.
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => /^[+\d][\d\s()/-]{4,}$/.test(v.trim());
const isUrlish = (v: string) => {
  const s = v.trim();
  return s.length >= 4 && /\.[a-z]{2,}/i.test(s);
};

function ScoreRing({ score, blurred }: { score: number; blurred?: boolean }) {
  const radius = 88;
  const stroke = 14;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  const color =
    score >= 80 ? "#16a34a" : score >= 60 ? "#1663DE" : score >= 35 ? "#db6f16" : "#dc2626";
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className={`-rotate-90 ${blurred ? "blur-[3px]" : ""}`}>
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

function LoadingView() {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalDuration = LOADING_PHASES.reduce((s, p) => s + p.duration, 0);

  useEffect(() => {
    let elapsed = 0;
    const timers: number[] = [];
    LOADING_PHASES.forEach((p, idx) => {
      elapsed += p.duration;
      timers.push(window.setTimeout(() => setPhase(idx + 1), elapsed - p.duration + 50));
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
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight md:text-3xl">
            Wir scannen deine Location-Webseite …
          </h2>
          <div className="mt-2 text-[13px] text-[var(--text-subtle)]">
            Schritt {Math.min(phase + 1, LOADING_PHASES.length)} von {LOADING_PHASES.length}
          </div>
        </div>
      </div>

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-out" style={{ width: `${progress}%` }} />
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
          <div className="text-[15px] font-semibold text-[var(--text)]">{current.label}</div>
          <div className="mt-1 text-[12px] text-[var(--text-muted)]">{current.detail}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Wiederverwendbare Eingabe-Schale (ein Feld pro Screen).
function StepShell({
  step,
  total,
  eyebrow,
  title,
  hint,
  children,
  onBack,
  onNext,
  nextLabel = "Weiter",
  nextDisabled,
}: {
  step: number;
  total: number;
  eyebrow: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <motion.div
      key={`${eyebrow}-${step}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-10"
    >
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition ${i <= step ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`} />
        ))}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">{eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black leading-tight tracking-tight md:text-3xl">
        {title}
      </h2>
      {hint && <p className="mt-3 text-[14px] text-[var(--text-muted)]">{hint}</p>}
      <div className="mt-6">{children}</div>
      <div className="mt-8 flex items-center justify-between">
        {onBack ? (
          <button type="button" onClick={onBack} className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]">
            ← Zurück
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          disabled={nextDisabled}
          onClick={onNext}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[var(--accent)] disabled:opacity-30"
        >
          {nextLabel}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </motion.div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-[var(--border-strong)] bg-white px-5 py-4 text-[16px] font-medium text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";

export default function LocationCheckTool() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("qualify");
  const [qStep, setQStep] = useState(0); // 0 Location, 1 URL, 2 Fit
  const [cStep, setCStep] = useState(0); // 0 Vorname, 1 Nachname, 2 Email, 3 Telefon, 4 Consent

  const [locationName, setLocationName] = useState("");
  const [url, setUrl] = useState("");
  const [fit, setFit] = useState<boolean | null>(null);

  const [result, setResult] = useState<KiCheckResult | null>(null);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [mailError, setMailError] = useState("");

  const MIN_LOADING_MS = LOADING_PHASES.reduce((s, p) => s + p.duration, 0);

  async function runCheck() {
    setPhase("loading");
    setError("");
    posthog.capture("location_check_gestartet", { fit });
    const started = Date.now();
    try {
      const apiRes = await fetch("/api/ki-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, goal: "leads" }),
      }).then((r) => r.json().then((d) => ({ ok: r.ok, d })));

      const elapsed = Date.now() - started;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((res) => setTimeout(res, MIN_LOADING_MS - elapsed));
      }
      if (!apiRes.ok) {
        setError(apiRes.d?.error || "Etwas ist schiefgelaufen.");
        setPhase("error");
        return;
      }
      setResult(apiRes.d as KiCheckResult);
      setPhase("score");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } catch {
      setError("Netzwerk-Fehler. Bitte später erneut versuchen.");
      setPhase("error");
    }
  }

  async function submitLead() {
    if (!result || !firstName || !lastName || !isValidEmail(email) || !isValidPhone(phone) || !consent) return;
    setSending(true);
    setMailError("");
    try {
      const res = await fetch("/api/ki-check/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          consent,
          result,
          campaign: "location-check",
          locationName,
          fit: fit === true,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setMailError(d?.error ?? "Versand fehlgeschlagen.");
        setSending(false);
        return;
      }
      posthog.capture("location_check_abgeschlossen", { score: result.score, fit });
      const params = new URLSearchParams({
        name: firstName,
        fit: fit ? "1" : "0",
      });
      router.push(`/location-check/danke?${params.toString()}`);
    } catch {
      setMailError("Netzwerk-Fehler beim Versand.");
      setSending(false);
    }
  }

  return (
    <>
      {/* HERO — nur in der Eingabephase. Ab Score/Kontaktdaten bewusst ausgeblendet. */}
      {phase === "qualify" && (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/80 px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-semibold text-[var(--accent)]">Für Eventlocations</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Fokus Firmenfeiern
          </span>
          <h1
            className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.04] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2rem, 5.2vw, 3.75rem)" }}
          >
            Wird deine Location gefunden, wenn Firmen einen Ort für ihre{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Feier
            </span>{" "}
            suchen?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px]">
            Mach den kostenlosen Check und sieh in unter 24 Stunden, wie sichtbar deine
            Location für ChatGPT, Google und Co. ist. Wenn ihr Firmenfeiern macht, bauen
            wir dir gratis einen Webseiten-Prototyp deiner Location dazu.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> 100 % kostenlos</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Ergebnis in unter 24 h</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Echte Live-Analyse</span>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-2xl">
      {/* QUALIFY — dezenter Korrektheits-Hinweis */}
      {phase === "qualify" && (
        <p className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-center text-[12.5px] leading-relaxed text-[var(--text-muted)]">
          Bitte alles korrekt ausfüllen. Nur mit echten Angaben können wir dir einen
          passenden Webseiten-Prototyp deiner Location erstellen.
        </p>
      )}

      {/* CONTACT — klare Leit-Headline: korrekte Daten sind Voraussetzung für den Versand */}
      {phase === "contact" && (
        <div className="mb-5 text-center">
          <h2
            className="font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.02em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.15rem)" }}
          >
            Wohin dürfen wir deinen{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Check + Prototyp
            </span>{" "}
            schicken?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[13.5px] leading-relaxed text-[var(--text-muted)] md:text-[14.5px]">
            Wir erstellen und versenden deine Auswertung und deinen Webseiten-Prototyp{" "}
            <strong className="font-semibold text-[var(--text)]">nur mit korrekten Angaben</strong>.
            Trag bitte deine echten Kontaktdaten ein, sonst können wir dir beides nicht zustellen.
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* QUALIFY */}
        {phase === "qualify" && qStep === 0 && (
          <StepShell
            key="q0"
            step={0}
            total={3}
            eyebrow="Schritt 1 von 3"
            title="Wie heißt deine Location?"
            hint="Damit wir deinen Prototyp auf den richtigen Namen zuschneiden."
            onNext={() => setQStep(1)}
            nextDisabled={locationName.trim().length < 2}
          >
            <input
              type="text"
              placeholder="z. B. Eventscheune Rheintal"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className={inputCls}
              autoFocus
            />
          </StepShell>
        )}

        {phase === "qualify" && qStep === 1 && (
          <StepShell
            key="q1"
            step={1}
            total={3}
            eyebrow="Schritt 2 von 3"
            title="Wie lautet die Webseite deiner Location?"
            hint="Wichtig: Bei einer falschen oder ungültigen Adresse können wir keinen Prototyp erstellen."
            onBack={() => setQStep(0)}
            onNext={() => setQStep(2)}
            nextDisabled={!isUrlish(url)}
          >
            <input
              type="url"
              inputMode="url"
              placeholder="https://deine-location.de"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={inputCls}
              autoFocus
            />
          </StepShell>
        )}

        {phase === "qualify" && qStep === 2 && (
          <StepShell
            key="q2"
            step={2}
            total={3}
            eyebrow="Schritt 3 von 3"
            title="Vermietet ihr eure Location für Firmenfeiern oder Firmenevents?"
            hint="So wissen wir, ob ein Firmenfeier-Prototyp für dich passt."
            onBack={() => setQStep(1)}
            onNext={runCheck}
            nextLabel="Check starten"
            nextDisabled={fit === null}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { v: true, label: "Ja", hint: "Wir machen Firmenfeiern" },
                { v: false, label: "Nein", hint: "Aktuell nicht" },
              ].map((o) => {
                const active = fit === o.v;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setFit(o.v)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      active ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-[var(--border)] bg-white hover:border-[var(--text)]"
                    }`}
                  >
                    <div className="font-semibold text-[var(--text)]">{o.label}</div>
                    <div className="mt-1 text-[13px] text-[var(--text-muted)]">{o.hint}</div>
                  </button>
                );
              })}
            </div>
          </StepShell>
        )}

        {/* LOADING */}
        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingView />
          </motion.div>
        )}

        {/* ERROR */}
        {phase === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-black text-red-700">Ups — Check fehlgeschlagen</h2>
            <p className="mt-2 text-[14px] text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => {
                setPhase("qualify");
                setQStep(1);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white"
            >
              Erneut versuchen
            </button>
          </motion.div>
        )}

        {/* SCORE — Anreiz */}
        {phase === "score" && result && (
          <motion.div
            key="score"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 text-center shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-10"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(22,99,222,0.10)_0%,rgba(22,99,222,0)_70%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Check abgeschlossen
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.02em] text-[var(--text)]" style={{ fontSize: "clamp(1.85rem, 4.5vw, 2.75rem)" }}>
                Deine Auswertung{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">ist bereit.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] text-[var(--text-muted)] md:text-[15px]">
                Wir haben die Webseite deiner Location auf 20+ Punkten geprüft. Score, Analyse und
                deine 3 wichtigsten Hebel schalten wir gleich kostenlos frei.
              </p>

              <div className="relative mx-auto mt-8 inline-flex">
                <ScoreRing score={result.score} blurred />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">Score</div>
                  <div className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black leading-none blur-sm">{result.score}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)] blur-sm">von 100</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-[var(--text)]/90 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-xl backdrop-blur">🔒 Freischalten</div>
                </div>
              </div>

              <div className="mt-6 text-[12px] text-[var(--text-muted)]">
                Geprüft: <span className="font-mono text-[var(--text)]">{result.normalizedUrl}</span>
              </div>

              {result.score < 80 && (
                <div className="mx-auto mt-7 max-w-xl rounded-2xl border-l-4 border-red-500 bg-red-50 p-5 text-left">
                  <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-red-700">Handlungsbedarf erkannt</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-red-900 md:text-[14px]">
                    Wir haben {result.score < 35 ? "kritische Schwachstellen" : result.score < 60 ? "deutliche Lücken" : "klare Optimierungs-Hebel"} gefunden.
                    Für Firmen, die online nach einer Location suchen, bleibst du dadurch unsichtbar.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setPhase("contact");
                  setCStep(0);
                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-90"
              >
                Auswertung + Prototyp freischalten
                <span>→</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* CONTACT — ein Feld pro Screen */}
        {phase === "contact" && cStep === 0 && (
          <StepShell key="c0" step={0} total={5} eyebrow="Fast geschafft" title="Wie heißt du mit Vornamen?" onNext={() => setCStep(1)} nextDisabled={firstName.trim().length < 2}>
            <input type="text" autoComplete="given-name" placeholder="Max" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} autoFocus />
          </StepShell>
        )}
        {phase === "contact" && cStep === 1 && (
          <StepShell key="c1" step={1} total={5} eyebrow="Fast geschafft" title="Und dein Nachname?" onBack={() => setCStep(0)} onNext={() => setCStep(2)} nextDisabled={lastName.trim().length < 2}>
            <input type="text" autoComplete="family-name" placeholder="Mustermann" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} autoFocus />
          </StepShell>
        )}
        {phase === "contact" && cStep === 2 && (
          <StepShell
            key="c2"
            step={2}
            total={5}
            eyebrow="Fast geschafft"
            title="An welche E-Mail dürfen wir die Auswertung schicken?"
            hint="Hier landet dein KI-Check, und wir melden uns wegen deines Prototyps."
            onBack={() => setCStep(1)}
            onNext={() => setCStep(3)}
            nextDisabled={!isValidEmail(email)}
          >
            <input type="email" autoComplete="email" inputMode="email" placeholder="max@deine-location.de" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoFocus />
          </StepShell>
        )}
        {phase === "contact" && cStep === 3 && (
          <StepShell
            key="c3"
            step={3}
            total={5}
            eyebrow="Fast geschafft"
            title="Unter welcher Nummer erreichen wir dich?"
            hint="Bitte deine echte Telefonnummer, damit wir dich zu deinem Prototyp erreichen können."
            onBack={() => setCStep(2)}
            onNext={() => setCStep(4)}
            nextDisabled={!isValidPhone(phone)}
          >
            <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+49 176 …" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} autoFocus />
          </StepShell>
        )}
        {phase === "contact" && cStep === 4 && (
          <motion.div
            key="c4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-10"
          >
            <div className="mb-8 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-1.5 flex-1 rounded-full bg-[var(--accent)]" />
              ))}
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">Letzter Schritt</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black leading-tight tracking-tight md:text-3xl">
              Auswertung freischalten
            </h2>
            <p className="mt-3 text-[14px] text-[var(--text-muted)]">
              Score, 4-Säulen-Analyse und deine 3 wichtigsten Hebel landen direkt in deinem Postfach. Dein Webseiten-Prototyp folgt in unter 24 Stunden.
            </p>

            <label className="mt-6 flex items-start gap-2.5 text-[12px] leading-relaxed text-[var(--text-muted)]">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--accent)]" />
              <span>
                Ich stimme zu, dass mir die Auswertung per E-Mail zugesendet wird und Wohlstandsmarketing mich zu meiner Anfrage
                telefonisch kontaktieren darf. Keine Newsletter ohne weitere Zustimmung.{" "}
                <a href="/datenschutz" className="underline" target="_blank">Datenschutz</a>
              </span>
            </label>

            <button
              type="button"
              onClick={submitLead}
              disabled={!consent || sending}
              className="group relative mt-6 w-full overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white transition disabled:opacity-40"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[#0a4bb8] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">{sending ? "Wird freigeschaltet …" : "🔓 Auswertung + Prototyp anfordern"}</span>
            </button>

            {mailError && <p className="mt-3 text-center text-[12px] text-red-600">Versand fehlgeschlagen ({mailError}). Bitte später erneut.</p>}

            <button type="button" onClick={() => setCStep(3)} className="mt-4 block w-full text-center text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]">
              ← Zurück
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
