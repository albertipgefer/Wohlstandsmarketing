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
      {/* TOOL — Hero-Inhalte (Eyebrow/H1/Subtext/Trust) leben im Tool und werden
          nur in der Eingabephase gezeigt. Ab "Auswertung ist bereit" + Kontaktdaten
          bleibt bewusst nur das Tool sichtbar (auf jedem Gerät). */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
        />
        <div className="relative">
          <LocationCheckTool />
        </div>
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
