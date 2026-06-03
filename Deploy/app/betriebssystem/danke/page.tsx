import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danke für deinen Kauf",
  robots: { index: false, follow: false },
};

const steps = [
  {
    title: "ZIP herunterladen",
    body: "Den Download-Link findest du in deiner Kauf-E-Mail von CopeCart. Lade die ZIP-Datei herunter und entpacke sie.",
  },
  {
    title: "Installieren (3 Minuten)",
    body: "Öffne den entpackten Ordner und führe `bash install.sh` aus — oder kopiere die Ordner `skills/` und `agents/` manuell nach `~/.claude/`. Die genaue Anleitung liegt als PDF in der ZIP.",
  },
  {
    title: "Claude Code neu starten",
    body: `Starte Claude Code neu, tippe "/" und du siehst deine 50 neuen Skills. Leg los, z. B. mit 'Nutze offer-builder, um mein Angebot zu schärfen'.`,
  },
];

export default function DankePage() {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      <section className="mx-auto w-full max-w-[720px] px-5 pt-12 pb-14 sm:pt-16">
        {/* Erfolgs-Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-center text-[28px] font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
          Danke für deinen Kauf!
        </h1>
        <p className="mx-auto mt-4 max-w-[540px] text-center text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
          Dein <span className="font-semibold text-[var(--text)]">Solopreneur-Betriebssystem für Claude Code</span> ist startklar. Den Download-Link bekommst du zusätzlich per E-Mail von CopeCart.
        </p>

        {/* Quick-Start */}
        <div className="mt-10">
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]">
            In 3 Schritten startklar
          </h2>
          <ol className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1663de] text-sm font-extrabold text-white">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-base font-bold text-[var(--text)]">{s.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Support */}
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#1663de]/[0.06] to-[#db6f16]/[0.06] p-5 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Etwas funktioniert nicht oder du hast eine Frage? Schreib mir einfach:
          </p>
          <a href="mailto:info@wohlstandsmarketing.de" className="mt-1 inline-block text-[15px] font-bold text-[#1663de] hover:underline">
            info@wohlstandsmarketing.de
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[1.5px] text-[var(--text-subtle)] transition hover:text-[#1663de]">
            zurück zur Übersicht
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-[var(--text-subtle)]">
          Die Abbuchung erfolgt durch CopeCart.
        </p>
      </section>
    </main>
  );
}
