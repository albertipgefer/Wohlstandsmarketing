/**
 * /finanzen/kunden/neu — Kunde anlegen (oder ?id=… bearbeiten), ohne Angebot.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getKundeById } from "@/lib/finanzen/kunden";
import FinanzShell from "@/components/finanzen/FinanzShell";
import KundeEditor, { type KundeInitial } from "@/components/finanzen/KundeEditor";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Kunde",
  robots: { index: false, follow: false },
};

export default async function KundeNeuSeite({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; firma?: string; email?: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const { id, firma, email } = await searchParams;

  let initial: KundeInitial | undefined;
  if (id) {
    const k = await getKundeById(id);
    if (k) {
      initial = {
        id: k.id,
        firma: k.firma || "",
        ansprech: k.ansprech || "",
        strasse: k.strasse || "",
        plz_ort: k.plz_ort || "",
        land: k.land || "",
        email: k.email || "",
        telefon: k.telefon || "",
        ust_id: k.ust_id || "",
        notiz: k.notiz || "",
        weitere_emails: k.weitere_emails || [],
      };
    }
  } else if (firma || email) {
    // Abgeleiteten Kunden (aus Dokumenten) als Stammkunde vorbefüllen.
    initial = { firma: firma || "", email: email || "" };
  }

  return (
    <FinanzShell section="einnahmen" subTab="kunden" title={id ? "Kunde bearbeiten" : "Neuer Kunde"}>
      <KundeEditor initial={initial} />
    </FinanzShell>
  );
}
