import type { Metadata } from "next";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Danke — Dein Angebot ist unterwegs",
  description:
    "Vielen Dank! Dein individuelles Angebot ist in den nächsten 60 Sekunden in deinem Postfach.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/preise/danke" },
};

type PageProps = {
  searchParams: Promise<{ name?: string }>;
};

export default async function PreiseDankePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawName = (params?.name || "").slice(0, 60);
  const safeName = /^[\p{L}\s'-]+$/u.test(rawName) ? rawName : "";

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      {/* HERO */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[640px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/4 h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl md:h-24 md:w-24">
            <span aria-hidden>✓</span>
          </div>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Angebot freigeschaltet
          </span>

          <h1
            className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {safeName ? (
              <>
                Danke,{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  {safeName}
                </span>
                !
              </>
            ) : (
              <>
                Danke für deine{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  Anfrage
                </span>
                !
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px]">
            Dein individuelles Angebot ist unterwegs. In den nächsten{" "}
            <strong className="text-[var(--text)]">60 Sekunden</strong> findest
            du es in deinem Postfach — mit allen ausgewählten Leistungen,
            Preisen und nächsten Schritten.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[var(--border)] bg-white p-5 text-left shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xl">
                📩
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[var(--text)]">
                  Angebot per E-Mail
                </div>
                <div className="mt-1 text-[12px] leading-relaxed text-[var(--text-muted)]">
                  Falls du nichts findest, schau bitte auch im{" "}
                  <strong>Spam-Ordner</strong> nach. Absender:{" "}
                  <span className="font-mono text-[var(--text)]">
                    Wohlstandsmarketing
                  </span>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HARD-CTA — Erstgespräch */}
      <section className="px-4 pb-16 sm:px-6 md:px-12 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-8 text-center shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] bg-[radial-gradient(circle,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 bottom-0 h-[280px] w-[280px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">
                  Nächster Schritt
                </span>
              </span>

              <h2
                className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              >
                Lass uns dein Angebot{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                    durchsprechen.
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
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                In 15 Minuten klären wir Zeitplan, Umsetzung und alle offenen
                Fragen — persönlich mit Albert.
              </p>

              <a
                href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[14px] font-semibold text-white transition"
              >
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">
                  Erstgespräch buchen → 15 Min mit Albert
                </span>
              </a>

              <div className="mt-4 text-[12px] text-[var(--text-subtle)]">
                Kostenfrei · Unverbindlich · Persönlich
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
