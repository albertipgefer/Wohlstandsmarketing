import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Paradigmenwechsel from "@/components/sections/Paradigmenwechsel";
import Problem from "@/components/sections/Problem";
import Angebot from "@/components/sections/Angebot";
import Methode from "@/components/sections/Methode";
import VorherNachher from "@/components/sections/VorherNachher";
import WasDuBekommst from "@/components/sections/WasDuBekommst";
import LeistungenUebersicht from "@/components/sections/LeistungenUebersicht";
import UeberAlbert from "@/components/sections/UeberAlbert";
import Vergleich from "@/components/sections/Vergleich";
import FAQ from "@/components/sections/FAQ";
import CTABlock from "@/components/sections/CTABlock";
import BlogTeaser from "@/components/sections/BlogTeaser";
import StandorteSektion from "@/components/sections/StandorteSektion";
import BranchenSektion from "@/components/sections/BranchenSektion";
import KiCheckCTA from "@/components/sections/KiCheckCTA";
import Testimonials from "@/components/sections/Testimonials";
import LeadMagnetSection from "@/components/sections/LeadMagnetSection";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  // Eigene Startseiten-Metadata mit lokalem Money-Keyword (Title < 60 Zeichen).
  // Ohne diesen Export erbt die Startseite nur den ortlosen Marken-Default aus layout.tsx.
  title: "Webdesign- & SEO-Agentur Raum Koblenz | Wohlstandsmarketing",
  description:
    "Webdesign + KI-Sichtbarkeit für Mittelstand im Raum Koblenz, Bad Ems & Rhein-Lahn. In 90 Tagen auf Google, ChatGPT, Perplexity & Claude empfohlen.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Webdesign- & SEO-Agentur Raum Koblenz | Wohlstandsmarketing",
    description:
      "Webdesign + KI-Sichtbarkeit für Mittelstand im Raum Koblenz, Bad Ems & Rhein-Lahn. In 90 Tagen auf Google & ChatGPT empfohlen.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="bg-white text-[var(--text)]">
      <Hero />
      <Paradigmenwechsel />
      <Problem />
      <Angebot />
      <Methode />
      <VorherNachher />
      <WasDuBekommst />
      <LeistungenUebersicht />
      <UeberAlbert />
      <Testimonials variant="compact" />
      <Vergleich />
      <CTABlock />
      <KiCheckCTA />
      <BranchenSektion />
      <StandorteSektion />
      <BlogTeaser />
      <LeadMagnetSection />
      <FAQ />
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Bereit für deine <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">KI-Sichtbarkeit</span>?
          </>
        }
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, ehrlich, mit konkretem Plan — auch wenn wir nicht zusammenarbeiten."
      />
      <Footer />
    </main>
  );
}
