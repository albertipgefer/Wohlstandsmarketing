import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import FinanzShell from "@/components/finanzen/FinanzShell";
import Platzhalter from "@/components/finanzen/Platzhalter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Bank", robots: { index: false, follow: false } };

export default async function BankSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  return (
    <FinanzShell section="bank" title="Bank">
      <Platzhalter
        titel="Bank-Synchronisierung"
        text="Hier verbindest du bald dein N26-Konto und gleichst Umsätze automatisch mit Rechnungen und Ausgaben ab."
      />
    </FinanzShell>
  );
}
