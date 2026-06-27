import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termin bestätigt — so bereitest du dich vor",
  robots: { index: false, follow: false },
};

const VORAUSSETZUNGEN = [
  { t: "Stabile Internetverbindung", d: "Damit Bild und Ton ohne Aussetzer laufen." },
  { t: "Google Meet", d: "Unser Gespräch findet per Google Meet statt, den Link bekommst du mit der Termin-Mail." },
  { t: "Laptop mit Kamera", d: "Am Laptop sehen wir deinen Prototyp gemeinsam in Ruhe an. Kamera bitte an." },
  { t: "Ruhige Umgebung", d: "Ein ungestörter Ort, damit wir uns voll auf deine Location konzentrieren können." },
];

const AUFGABEN = [
  {
    t: "Dein Ziel für die nächsten 6 bis 12 Monate",
    d: "Schreib kurz auf, wo deine Location in 6 bis 12 Monaten stehen soll, und bring es ins Gespräch mit. Je klarer dein Ziel, desto konkreter wird unser Fahrplan.",
  },
  {
    t: "Deine Fragen",
    d: "Notiere dir alle Fragen, die du hast. Wir gehen im Gespräch alles in Ruhe und gründlich durch.",
  },
];

export default function TerminBestaetigtPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <section className="relative overflow-hidden px-4 pt-16 pb-10 sm:px-6 md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.13)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Termin bestätigt
          </span>
          <h1
            className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.9rem, 4.8vw, 3rem)" }}
          >
            Dein Termin steht.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
            Die Bestätigung mit allen Details und dem Google-Meet-Link liegt in deinem Postfach. Damit
            unser Gespräch für dich richtig viel bringt, hier kurz, was du vorbereitest.
          </p>
        </div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Voraussetzungen */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-9">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight md:text-2xl">
              Voraussetzungen für unser Gespräch
            </h2>
            <ul className="mt-5 space-y-4">
              {VORAUSSETZUNGEN.map((v, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--accent)]/[0.1] text-[13px] text-[var(--accent)]">✓</span>
                  <div>
                    <div className="text-[14.5px] font-semibold text-[var(--text)]">{v.t}</div>
                    <div className="mt-0.5 text-[13px] leading-relaxed text-[var(--text-muted)]">{v.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Aufgaben */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-9">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight md:text-2xl">
              Zwei kleine Aufgaben bis dahin
            </h2>
            <p className="mt-2 text-[13.5px] text-[var(--text-muted)]">
              Fünf Minuten, die unser Gespräch deutlich wertvoller für dich machen.
            </p>
            <ol className="mt-5 space-y-5">
              {AUFGABEN.map((a, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--text)] font-[family-name:var(--font-display)] text-[15px] font-black text-white">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-[var(--text)]">{a.t}</div>
                    <div className="mt-1 text-[13.5px] leading-relaxed text-[var(--text-muted)]">{a.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="px-2 text-center text-[14px] font-medium text-[var(--text)]">
            Ich freue mich auf unser Gespräch und darauf, dir deinen Prototyp zu zeigen.
          </p>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-4 py-8 text-center text-[12px] text-[var(--text-subtle)]">
        <p>Wohlstandsmarketing · Albert Ipgefer · Vor der Loos 4e, 56130 Bad Ems</p>
        <p className="mt-2 flex items-center justify-center gap-4">
          <a href="/impressum" className="hover:text-[var(--text)]">Impressum</a>
          <a href="/datenschutz" className="hover:text-[var(--text)]">Datenschutz</a>
        </p>
      </footer>
    </main>
  );
}
