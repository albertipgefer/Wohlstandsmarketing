"use client";

/**
 * LeadMagnetForm — kompaktes Anmeldeformular für den Lead-Magnet
 * „Die 11 teuersten Marketing-Fehler im Mittelstand".
 *
 * Felder: Vorname + E-Mail (+ Honeypot).
 * Submit ruft POST /api/lead-magnet. Nach Erfolg: Success-State mit
 * Direkt-Download-Link.
 *
 * Wird verwendet:
 *   - Inline auf Blog-Artikeln (statt KI-Check-Banner)
 *   - In ExitIntentPopup
 *   - In LeadMagnetSection auf separater Page (optional, später)
 *
 * Stil-Vertrag: schwarzer Button mit weissem Text, Hover-Gradient blau,
 * Text bleibt weiss. Defensive `!text-white` + `no-underline`.
 */

import { useState } from "react";

const PDF_PATH = "/lead-magnet/11-marketing-fehler-mittelstand.pdf";

interface Props {
  /** Welche Quelle hat den Lead generiert (für Internal Notification) */
  source?: string;
  /** Compact-Variante für Modal (kleinere Headline, kein Eyebrow) */
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
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);
    form.set("source", source);

    try {
      const res = await fetch("/api/lead-magnet", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
      };
      if (res.ok && data.ok) {
        setState("success");
        onSuccess?.();
      } else {
        setState("error");
        setErrorMsg(
          data.reason === "invalid_fields"
            ? "Bitte Vorname und gültige E-Mail eintragen."
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
          ✓
        </div>
        <h4
          className="font-[family-name:var(--font-display)] font-black tracking-tight text-[var(--text)]"
          style={{ fontSize: compact ? "1.25rem" : "1.5rem" }}
        >
          Check deinen Posteingang.
        </h4>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
          Die PDF ist auf dem Weg zu dir — sollte in 1–2 Minuten in deinem Posteingang sein. Falls nicht, schau bitte auch im Spam-Ordner nach.
        </p>
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text)] !text-white px-7 py-3.5 text-[14px] font-semibold no-underline transition hover:bg-[var(--accent)]"
        >
          Oder direkt herunterladen <span className="!text-white">→</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className={compact ? "flex flex-col gap-2" : "grid gap-2 sm:grid-cols-2"}>
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

      <button
        type="submit"
        disabled={state === "loading"}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-7 py-4 text-[15px] font-semibold no-underline shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)] transition hover:shadow-[0_16px_44px_-12px_rgba(22,99,222,0.55)] disabled:cursor-wait disabled:opacity-80"
      >
        <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
        <span className="relative z-10 !text-white">
          {state === "loading" ? "Wird geschickt …" : "PDF jetzt kostenlos holen"}
        </span>
        {state !== "loading" && (
          <span className="relative z-10 !text-white transition-transform group-hover:translate-x-0.5">→</span>
        )}
      </button>

      {errorMsg && (
        <p className="text-center text-[12px] font-medium text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="text-center text-[11px] leading-relaxed text-[var(--text-subtle)]">
        Keine Spam-Garantie · Abmeldung jederzeit per Klick · Deine Daten bleiben bei uns
      </p>
    </form>
  );
}
