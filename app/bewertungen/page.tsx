import type { Metadata } from "next";
import BlogNav from "@/components/blog/BlogNav";
import Testimonials from "@/components/sections/Testimonials";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Kundenbewertungen · Wohlstandsmarketing",
  description:
    "Alle Bewertungen für Wohlstandsmarketing — verifiziert und ungekürzt aus Google und Trustpilot. Erfahrungen mit der WSM-Methode aus Webdesign, KI-Sichtbarkeit und Performance-Marketing.",
  alternates: { canonical: "/bewertungen" },
};

export default function BewertungenPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />
      <div className="pt-24 sm:pt-28">
        <Testimonials
          variant="full"
          eyebrow="Bewertungen"
          heading="Was unsere Kunden über Wohlstandsmarketing sagen."
          subline="Alle Bewertungen — ungekürzt, verifiziert, direkt aus dem Google Business Profile und Trustpilot. Lies dir in Ruhe durch, was unsere Kunden über die Zusammenarbeit, die Ergebnisse und die WSM-Methode schreiben."
        />
      </div>
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Klingt das nach jemandem, mit dem du <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">arbeiten</span> willst?
          </>
        }
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, ehrlich, mit konkretem nächsten Schritt — auch wenn wir nicht zusammenarbeiten."
      />
      <Footer />
    </main>
  );
}
