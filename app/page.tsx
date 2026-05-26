import Hero from "@/components/sections/Hero";
import Paradigmenwechsel from "@/components/sections/Paradigmenwechsel";
import Problem from "@/components/sections/Problem";
import Angebot from "@/components/sections/Angebot";
import Methode from "@/components/sections/Methode";
import VorherNachher from "@/components/sections/VorherNachher";
import WasDuBekommst from "@/components/sections/WasDuBekommst";
import UeberAlbert from "@/components/sections/UeberAlbert";
import Vergleich from "@/components/sections/Vergleich";
import FAQ from "@/components/sections/FAQ";
import CTABlock from "@/components/sections/CTABlock";
import BlogTeaser from "@/components/sections/BlogTeaser";
import StandorteSektion from "@/components/sections/StandorteSektion";
import KiCheckCTA from "@/components/sections/KiCheckCTA";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

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
      <UeberAlbert />
      <Testimonials variant="compact" />
      <Vergleich />
      <FAQ />
      <CTABlock />
      <KiCheckCTA />
      <StandorteSektion />
      <BlogTeaser />
      <Footer />
    </main>
  );
}
