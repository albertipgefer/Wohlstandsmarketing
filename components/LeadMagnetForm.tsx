"use client";

/**
 * LeadMagnetForm — Anmeldeformular für den Lead-Magnet
 * „Die 11 teuersten Marketing-Fehler im Mittelstand".
 *
 * Flow (Double-Opt-In):
 *   1. User trägt Vorname + E-Mail ein
 *   2. Optional: Newsletter-Checkbox (default OFF)
 *   3. Submit → POST /api/lead-magnet
 *   4. Backend schickt Bestätigungs-Mail (kein PDF, kein Audience-Push)
 *   5. Success-State zeigt „Bitte E-Mail bestätigen"-Hinweis
 *   6. User klickt Bestätigungs-Link → kommt auf /lead-magnet/danke
 *
 * Stil-Vertrag des Buttons:
 *   Default schwarz mit weißem Text · Hover-Gradient blau · Text bleibt weiß
 *   Defensive `!text-white` + `no-underline` (gegen prose-blog-Override).
 */

import { useState } from "react";

interface Props {
  /** Welche Quelle hat den Lead generiert (Tracking in Internal Notification) */
  source?: string;
  /** Compact-Variante für Modal */
  compact?: boolean;
  /** Optional: Callback nach erfolgreichem Submit */
  onSuccess?: () => void;
}

export default function LeadMagnetForm({
  source = "inline",
  compact = false,
  onSuccess,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);
    form.set("source", source);
    if (newsletter) form.set("newsletter", "on");

    try {
      const res = await fetch("/api/lead-magnet", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
      };
      if (res.ok && data.ok) {
        setSubmittedEmail(email);
        setState("success");
        onSuccess?.();
      } else {
        setState("error");
        setErrorMsg(
          data.reason === "invalid_fields"
            ? "Bitte Vorname und gültige E-Mail eintragen."
            : data.reason === "missing_env"
              ? "Mail-Versand ist gerade nicht verfügbar — bitte später erneut versuchen."
              : "Da ist etwas schiefgelaufen — bitte später erneut versuchen."
        );
      }
    } catch {
      setState("error");
      setErrorMsg("Netzwerkfehler — bitte erneut versuchen.");
    }
  }

  if (state === "success") {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--accent)]/30 bg-gradient-to-br from-white to-[var(--accent-glow-soft)] p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-2xl text-white">
          ✉
        </div>
        <h4
          className="font-[family-name:var(--font-display)] font-black tracking-tight text-[var(--text)]"
          style={{ fontSize: compact ? "1.25rem" : "1.5rem" }}
        >
          Check deinen Posteingang.
        </h4>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
          Ich habe dir eine Bestätigungs-Mail an <strong className="text-[var(--text)] break-all">{submittedEmail}</strong> geschickt. Klicke einmal auf den Button darin, dann ist deine PDF freigeschaltet.
        </p>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--text-subtle)]">
          Mail nicht angekommen? Schau auch im Spam-Ordner — der Bestätigungs-Link ist 7 Tage gültig.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className={compact ? "flex flex-col gap-2.5" : "grid gap-2.5 sm:grid-cols-2"}>
        <label className="sr-only" htmlFor="lm-firstname">Vorname</label>
        <input
          id="lm-firstname"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder="Vorname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-full border border-[var(--border)] bg-white px-5 py-3.5 text-[14px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
        />
        <label className="sr-only" htmlFor="lm-email">E-Mail</label>
        <input
          id="lm-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-[var(--border)] bg-white px-5 py-3.5 text-[14px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
        />
      </div>

      {/* Newsletter-Opt-In — separat von PDF-Anforderung */}
      <label
        htmlFor="lm-newsletter"
        className="flex cursor-pointer items-start gap-2.5 rounded-2xl border border-[var(--border)] bg-white/60 p-3.5 text-left transition hover:border-[var(--accent)]/40 hover:bg-white"
      >
        <input
          id="lm-newsletter"
          name="newsletter"
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--accent)]"
        />
        <span className="text-[12.5px] leading-relaxed text-[var(--text)]">
          Ja, ich möchte zusätzlich <strong>Marketing-Mails von Albert</strong> erhalten — mit Vertiefungen zu den 11 Fehlern, Beispielen aus dem Mittelstand und konkreten Hebeln. Abmelden jederzeit per Klick.
        </span>
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-7 py-4 text-[15px] font-semibold no-underline shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)] transition hover:shadow-[0_16px_44px_-12px_rgba(22,99,222,0.55)] disabled:cursor-wait disabled:opacity-80"
      >
        <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
        <span className="relative z-10 !text-white">
          {state === "loading" ? "Wird geschickt …" : "PDF kostenlos anfordern"}
        </span>
        {state !== "loading" && (
          <span className="relative z-10 !text-white transition-transform group-hover:translate-x-0.5">→</span>
        )}
      </button>

      {errorMsg && (
        <p className="text-center text-[12.5px] font-semibold text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      {/* Datenschutz-Hinweis — sichtbarer Kontrast */}
      <p className="text-center text-[12px] leading-relaxed text-[var(--text-muted)]">
        Mit dem Absenden erhältst du eine Bestätigungs-Mail. Deine Daten verarbeiten wir gemäß unserer{" "}
        <a
          href="/datenschutz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-dark)]"
        >
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}
