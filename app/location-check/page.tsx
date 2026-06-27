import type { Metadata } from "next";
import LocationCheckTool from "@/components/ki-check/LocationCheckTool";

export const metadata: Metadata = {
  title: "Gratis Location-Check für Firmenfeiern — Wohlstandsmarketing",
  description:
    "Kostenloser KI-Sichtbarkeits-Check + gratis Webseiten-Prototyp deiner Eventlocation in unter 24 Stunden. Für Locations, die Firmenfeiern und Firmenevents vermieten.",
  alternates: { canonical: "/location-check" },
  // Reine Kampagnen-Landingpage für Ad-Traffic — nicht für die organische Suche.
  robots: { index: false, follow: true },
};

export default function LocationCheckPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-16 pb-10 sm:px-6 md:pt-24 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
        />

        <div className="relative mx-auto max-w-3xl text-center">
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
      </section>

      {/* TOOL */}
      <section className="relative px-4 pb-20 sm:px-6 md:pb-28">
        <LocationCheckTool />
      </section>

      {/* Schlanker Rechts-Footer (Pflicht), keine Ablenkung */}
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
