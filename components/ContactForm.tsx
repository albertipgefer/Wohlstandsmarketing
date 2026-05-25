"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * ContactForm — sends via /api/contact (Resend). Falls back to a prominent
 * mailto: link if the server route returns 503 (no Resend key configured)
 * or any other failure. The mailto button always stays visible as a
 * second, guaranteed channel.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorReason, setErrorReason] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorReason("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setErrorReason(json.reason || `http_${res.status}`);
      }
    } catch {
      setStatus("error");
      setErrorReason("network");
    }
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(10,10,10,0.15)] sm:p-8"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
        Lieber per E-Mail?
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
        Schreib mir direkt.
      </h3>
      <p className="mt-2 text-[14px] text-[var(--text-muted)]">
        Anfragen landen in meinem Posteingang —{" "}
        <a
          href="mailto:info@wohlstandsmarketing.de"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          info@wohlstandsmarketing.de
        </a>
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Dein Name" required />
        <Field
          name="email"
          type="email"
          label="E-Mail"
          required
          inputMode="email"
        />
        <Field
          name="company"
          label="Unternehmen"
          containerClass="sm:col-span-2"
        />
        <Textarea
          name="message"
          label="Worum geht's?"
          placeholder="Kurz, was du erreichen willst …"
          required
        />
      </div>

      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-[var(--text-subtle)]">
          Mit dem Absenden akzeptierst du die{" "}
          <a href="/datenschutz" className="hover:underline">
            Datenschutzerklärung
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition disabled:opacity-60 sm:w-auto"
        >
          <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative z-10">
            {status === "loading"
              ? "Sende …"
              : status === "success"
                ? "✓ Gesendet"
                : "Anfrage senden"}
          </span>
          {status === "idle" && (
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </div>

      {status === "success" && (
        <div className="mt-5 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] p-4">
          <p className="text-[14px] font-semibold text-[var(--accent)]">
            ✓ Danke — die Mail ist raus.
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-muted)]">
            Ich melde mich innerhalb von 24 Stunden bei dir.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-5 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold-glow-soft)] p-4">
          <p className="text-[14px] font-semibold text-[var(--gold)]">
            Hat nicht funktioniert — schreib uns direkt:
          </p>
          <p className="mt-2 text-[13px] text-[var(--text-muted)]">
            Klick auf den Button unten — er öffnet deinen Mail-Client mit
            deiner Nachricht vorausgefüllt.
          </p>
          <MailtoButton />
        </div>
      )}

      {/* Permanent direct mail option below the form, regardless of status */}
      <div className="mt-6 border-t border-[var(--border)] pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          Lieber direkt schreiben?
        </p>
        <a
          href="mailto:info@wohlstandsmarketing.de?subject=Anfrage%20Wohlstandsmarketing&body=Hi%20Albert%2C%0A%0A"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-2.5 text-[13px] font-semibold text-[var(--text)] transition hover:bg-[var(--text)] hover:text-white"
        >
          E-Mail an info@wohlstandsmarketing.de ↗
        </a>
      </div>
    </motion.form>
  );
}

function MailtoButton() {
  // Build mailto link reading current form values from the closest form
  const buildMailtoFromForm = () => {
    if (typeof document === "undefined") return "mailto:info@wohlstandsmarketing.de";
    const form = document.querySelector("form") as HTMLFormElement | null;
    if (!form) return "mailto:info@wohlstandsmarketing.de";
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const company = String(fd.get("company") || "");
    const message = String(fd.get("message") || "");
    const subject = encodeURIComponent(
      `Anfrage über wohlstandsmarketing.de — ${name || "Kontakt"}`
    );
    const body = encodeURIComponent(
      `Hi Albert,\n\n${message}\n\n--\nName: ${name}\nE-Mail: ${email}${
        company ? `\nUnternehmen: ${company}` : ""
      }`
    );
    return `mailto:info@wohlstandsmarketing.de?subject=${subject}&body=${body}`;
  };

  return (
    <a
      href={buildMailtoFromForm()}
      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent)]"
    >
      Mail-Client jetzt öffnen ↗
    </a>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  inputMode,
  containerClass = "",
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  containerClass?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${containerClass}`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
        {label}
        {required && <span className="ml-1 text-[var(--gold)]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        inputMode={inputMode}
        className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow-soft)] sm:text-[14px]"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  placeholder,
  required = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 sm:col-span-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
        {label}
        {required && <span className="ml-1 text-[var(--gold)]">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={4}
        className="resize-none rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow-soft)] sm:text-[14px]"
      />
    </label>
  );
}
