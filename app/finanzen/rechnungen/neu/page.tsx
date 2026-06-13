/**
 * /finanzen/rechnungen/neu — Rechnung manuell anlegen (oder ?id=… bearbeiten).
 * Login-geschützt; rendert den Client-Editor in der Finanz-Shell.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getRechnungById } from "@/lib/finanzen/db";
import { listKunden } from "@/lib/finanzen/kunden";
import FinanzShell from "@/components/finanzen/FinanzShell";
import RechnungEditor, { type RechnungInitial, type KundeLite } from "@/components/finanzen/RechnungEditor";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Rechnung erstellen",
  robots: { index: false, follow: false },
};

export default async function RechnungNeuSeite({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const { id } = await searchParams;

  const kundenRaw = await listKunden();
  const kunden: KundeLite[] = kundenRaw.map((k) => ({
    id: k.id, firma: k.firma, ansprech: k.ansprech, strasse: k.strasse, plz_ort: k.plz_ort, land: k.land, email: k.email,
  }));

  let initial: RechnungInitial | undefined;
  if (id) {
    const r = await getRechnungById(id);
    if (r) {
      initial = {
        id: r.id,
        typ: r.typ,
        titel: r.titel || "",
        einleitung: r.einleitung || "",
        kunde_firma: r.kunde_firma || "",
        kunde_ansprech: r.kunde_ansprech || "",
        kunde_strasse: r.kunde_strasse || "",
        kunde_plz_ort: r.kunde_plz_ort || "",
        kunde_land: r.kunde_land || "",
        kunde_email: r.kunde_email || "",
        positionen: r.positionen || [],
        anmerkungen: r.anmerkungen || "",
        bedingungen: r.bedingungen || "",
        rechnungsdatum: r.rechnungsdatum || undefined,
        zahlungsziel_tage: r.zahlungsziel_tage,
      };
    }
  }

  return (
    <FinanzShell section="einnahmen" subTab="rechnungen" title={id ? "Rechnung bearbeiten" : "Rechnung erstellen"}>
      <RechnungEditor initial={initial} kunden={kunden} />
    </FinanzShell>
  );
}
