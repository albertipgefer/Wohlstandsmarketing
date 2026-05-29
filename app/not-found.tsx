import Link from "next/link";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Seite nicht gefunden · Wohlstandsmarketing",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--gold-text)]">404</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Seite nicht gefunden
          </span>

          <h1
            className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.04em] text-[var(--text)]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Diese Seite ist{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                unsichtbar
              </span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                height="14"
                viewBox="0 0 300 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 9C 60 2, 130 12, 200 6 S 290 8, 298 5"
                  stroke="#db6f16"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-7 mx-auto max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Die gesuchte URL existiert nicht (mehr). Vielleicht findest du was du suchst auf einer dieser Seiten:
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="group flex flex-col items-start gap-1 rounded-2xl border border-[var(--border)] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Startseite
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)]">
                Zur WSM-Methode →
              </span>
            </Link>
            <Link
              href="/blog"
              className="group flex flex-col items-start gap-1 rounded-2xl border border-[var(--border)] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Blog
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)]">
                50+ Artikel zu KI-SEO →
              </span>
            </Link>
            <Link
              href="/standorte"
              className="group flex flex-col items-start gap-1 rounded-2xl border border-[var(--border)] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Standorte
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)]">
                Bad Ems · Koblenz · Frankfurt … →
              </span>
            </Link>
            <Link
              href="/#strategie"
              className="group flex flex-col items-start gap-1 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.4)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Direkt loslegen
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)]">
                15-Min Erstgespräch →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
