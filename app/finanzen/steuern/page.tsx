import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import FinanzShell from "@/components/finanzen/FinanzShell";
import Platzhalter from "@/components/finanzen/Platzhalter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Steuern", robots: { index: false, follow: false } };

export default async function SteuernSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  return (
    <FinanzShell section="steuern" title="Steuern">
      <Platzhalter
        titel="Steuern"
        text="USt-Voranmeldung, EÜR, Gewinnermittlung und Steuer-Rücklagen — bald direkt hier berechnet und als Report exportierbar."
      />
    </FinanzShell>
  );
}
