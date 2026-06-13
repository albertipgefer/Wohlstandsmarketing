import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import FinanzShell from "@/components/finanzen/FinanzShell";
import Platzhalter from "@/components/finanzen/Platzhalter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Preisliste", robots: { index: false, follow: false } };

export default async function PreislisteSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  return (
    <FinanzShell section="einnahmen" subTab="preisliste" title="Preisliste">
      <Platzhalter
        titel="Preisliste"
        text="Hinterlege wiederkehrende Leistungen und Preise, die du beim Erstellen von Angeboten und Rechnungen mit einem Klick auswählst."
      />
    </FinanzShell>
  );
}
