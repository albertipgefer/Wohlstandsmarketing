/**
 * /finanzen/kunden — Kundenverwaltung. Eigene Stammkunden (anlegen/bearbeiten/
 * löschen) werden mit den aus Angeboten/Rechnungen abgeleiteten Umsätzen
 * synchron zusammengeführt (Abgleich per E-Mail bzw. Firma).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote } from "@/lib/angebot/db";
import { listRechnungen } from "@/lib/finanzen/db";
import { listKunden } from "@/lib/finanzen/kunden";
import { umsatzKpis, quartalLabel, bannerAction } from "@/lib/finanzen/einnahmen-kpis";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import EinnahmenBanner from "@/components/finanzen/EinnahmenBanner";
import KundeDeleteButton from "@/components/finanzen/KundeDeleteButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Kunden",
  robots: { index: false, follow: false },
};

type Zeile = {
  key: string;
  id: string | null; // managed-id, falls Stammkunde
  firma: string;
  email: string;
  stadt: string;
  ustId: string;
  angebote: number;
  rechnungen: number;
  bezahltNetto: number;
  offenBrutto: number;
};

function stadtAus(plzOrt: string | null): string {
  return (plzOrt || "").replace(/^\s*\d{4,5}\s*/, "").trim();
}

function keyOf(firma: string | null, email: string | null): string {
  return (email || firma || "—").toLowerCase().trim();
}

export default async function KundenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const [angebote, rechnungen, kunden] = await Promise.all([
    listAngebote(),
    listRechnungen(),
    listKunden(),
  ]);

  const map = new Map<string, Zeile>();
  function get(firma: string | null, email: string | null): Zeile {
    const key = keyOf(firma, email);
    let z = map.get(key);
    if (!z) {
      z = { key, id: null, firma: firma || email || "—", email: email || "", stadt: "", ustId: "", angebote: 0, rechnungen: 0, bezahltNetto: 0, offenBrutto: 0 };
      map.set(key, z);
    }
    return z;
  }

  // Stammkunden zuerst (damit sie die Identität + ID bekommen)
  for (const k of kunden) {
    const z = get(k.firma, k.email);
    z.id = k.id;
    if (k.firma) z.firma = k.firma;
    if (k.email) z.email = k.email;
    z.stadt = stadtAus(k.plz_ort);
    z.ustId = k.ust_id || "";
  }
  // Abgeleitete Umsätze drauflegen
  for (const a of angebote) get(a.kunde_firma, a.kunde_email).angebote += 1;
  for (const r of rechnungen) {
    const z = get(r.kunde_firma, r.kunde_email);
    z.rechnungen += 1;
    if (r.status === "bezahlt") z.bezahltNetto += r.netto;
    if (r.status === "offen" || r.status === "ueberfaellig") z.offenBrutto += r.brutto;
  }

  const zeilen = Array.from(map.values()).sort((a, b) => {
    if (!!b.id !== !!a.id) return b.id ? 1 : -1; // Stammkunden zuerst
    return b.bezahltNetto - a.bezahltNetto;
  });

  const now = new Date();
  const kpi = umsatzKpis(rechnungen, now);
  const banner = (
    <EinnahmenBanner
      title="Kunden"
      jahr={now.getFullYear()}
      quartalLabel={quartalLabel(now)}
      umsatzJahrNetto={kpi.jahr}
      umsatzQuartalNetto={kpi.quartal}
      action={<Link href="/finanzen/kunden/neu" style={bannerAction}>+ Kunde hinzufügen</Link>}
    />
  );

  return (
    <FinanzShell section="einnahmen" subTab="kunden" title="Kunden" banner={banner}>
      {zeilen.length === 0 ? (
        <div style={S.empty}>Noch keine Kunden. Lege deinen ersten Kunden an — auch ohne Angebot.</div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead>
              <tr>{["Name", "Stadt", "USt-IdNr.", "Umsatz (netto)", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {zeilen.map((z) => (
                <tr key={z.key} style={S.tr}>
                  <td style={S.td}>
                    <div style={{ fontWeight: 600 }}>{z.firma}</div>
                    <div style={{ fontSize: 12, color: "#a3a3a3" }}>{z.email}</div>
                  </td>
                  <td style={S.td}>{z.stadt || "—"}</td>
                  <td style={S.td}>{z.ustId || "—"}</td>
                  <td style={S.td}>{eur(z.bezahltNetto)}</td>
                  <td style={{ ...S.td, textAlign: "right", whiteSpace: "nowrap" }}>
                    {z.id ? (
                      <>
                        <Link href={`/finanzen/kunden/neu?id=${z.id}`} style={S.link}>Bearbeiten</Link>
                        <span style={{ marginLeft: 12 }}><KundeDeleteButton id={z.id} name={z.firma} /></span>
                      </>
                    ) : (
                      <span style={{ fontSize: 12, color: "#c4c4c4" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </FinanzShell>
  );
}

const S: Record<string, React.CSSProperties> = {
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15 },
  tableWrap: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "2px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
  newBtn: { background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700 },
};
