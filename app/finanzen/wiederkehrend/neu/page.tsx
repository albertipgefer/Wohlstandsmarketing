/**
 * /finanzen/wiederkehrend/neu — wiederkehrende Rechnung anlegen (oder ?id=… bearbeiten).
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getWiederkehrendById } from "@/lib/finanzen/recurring";
import FinanzShell from "@/components/finanzen/FinanzShell";
import WiederkehrendEditor, { type WkInitial } from "@/components/finanzen/WiederkehrendEditor";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Wiederkehrend",
  robots: { index: false, follow: false },
};

export default async function WiederkehrendNeuSeite({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const { id } = await searchParams;

  let initial: WkInitial | undefined;
  if (id) {
    const w = await getWiederkehrendById(id);
    if (w) {
      const pos = w.positionen?.[0];
      initial = {
        id: w.id,
        bezeichnung: w.bezeichnung || "",
        kunde_firma: w.kunde_firma || "",
        kunde_ansprech: w.kunde_ansprech || "",
        kunde_strasse: w.kunde_strasse || "",
        kunde_plz_ort: w.kunde_plz_ort || "",
        kunde_email: w.kunde_email || "",
        titel: w.titel || "",
        betragNetto: pos?.preisNetto ?? w.netto,
        ustSatz: pos?.ustSatz ?? 19,
        intervall: w.intervall,
        naechste_faelligkeit: w.naechste_faelligkeit,
        zahlungsziel_tage: w.zahlungsziel_tage,
        aktiv: w.aktiv,
        anmerkungen: w.anmerkungen || "",
      };
    }
  }

  return (
    <FinanzShell section="einnahmen" subTab="wiederkehrend" title={id ? "Vorlage bearbeiten" : "Neue Vorlage"}>
      <WiederkehrendEditor initial={initial} />
    </FinanzShell>
  );
}
