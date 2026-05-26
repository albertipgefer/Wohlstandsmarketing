import type { Metadata } from "next";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";
import AngebotView from "@/components/preise/AngebotView";

export const metadata: Metadata = {
  title: "Dein individuelles Angebot — Wohlstandsmarketing",
  description:
    "Dein individuelles Wohlstandsmarketing-Angebot basierend auf deiner Auswahl.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/preise/angebot" },
};

type PageProps = {
  searchParams: Promise<{ s?: string; items?: string }>;
};

export default async function AngebotPage({ searchParams }: PageProps) {
  const params = await searchParams;
  // Neues Format: s=encoded selections; Fallback auf altes items=
  const encoded = params.s || params.items || "";

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      <section className="relative overflow-hidden pb-12 pt-32 md:pb-20 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <AngebotView encoded={encoded} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
