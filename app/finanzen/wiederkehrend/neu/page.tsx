/**
 * /finanzen/wiederkehrend/neu — wiederkehrende Rechnung anlegen (oder ?id=… bearbeiten).
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getWiederkehrendById } from "@/lib/finanzen/recurring";
import { listKunden } from "@/lib/finanzen/kunden";
import { listPreisliste } from "@/lib/finanzen/preisliste";
import FinanzShell from "@/components/finanzen/FinanzShell";
import WiederkehrendEditor, { type WkInitial } from "@/components/finanzen/WiederkehrendEditor";
import type { KundeLite, PreisLite } from "@/components/finanzen/RechnungEditor";

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

  const [kundenRaw, preisRaw] = await Promise.all([listKunden(), listPreisliste(true)]);
  const kunden: KundeLite[] = kundenRaw.map((k) => ({ id: k.id, firma: k.firma, ansprech: k.ansprech, strasse: k.strasse, plz_ort: k.plz_ort, land: k.land, email: k.email }));
  const preisliste: PreisLite[] = preisRaw.map((p) => ({ id: p.id, bezeichnung: p.bezeichnung, beschreibung: p.beschreibung, preis_netto: p.preis_netto, ust_satz: p.ust_satz, einheit: p.einheit }));

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
        enddatum: w.enddatum || "",
        aktiv: w.aktiv,
        anmerkungen: w.anmerkungen || "",
      };
    }
  }

  return (
    <FinanzShell section="einnahmen" subTab="wiederkehrend" title={id ? "Vorlage bearbeiten" : "Neue Vorlage"}>
      <WiederkehrendEditor initial={initial} kunden={kunden} preisliste={preisliste} />
    </FinanzShell>
  );
}
