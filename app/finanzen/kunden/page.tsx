/**
 * /finanzen/kunden — Kundenübersicht (login-geschützt, read-only v1).
 * Abgeleitet aus Angeboten + Rechnungen: pro Kunde Anzahl Dokumente + bezahlter
 * Umsatz + offener Betrag. (Eigene Kundenverwaltung folgt als nächster Schritt.)
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote } from "@/lib/angebot/db";
import { listRechnungen } from "@/lib/finanzen/db";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Kunden",
  robots: { index: false, follow: false },
};

type KundeAgg = {
  key: string;
  firma: string;
  email: string;
  angebote: number;
  rechnungen: number;
  bezahltNetto: number;
  offenBrutto: number;
};

export default async function KundenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const [angebote, rechnungen] = await Promise.all([listAngebote(), listRechnungen()]);
  const map = new Map<string, KundeAgg>();

  function get(firma: string | null, email: string | null): KundeAgg {
    const key = (email || firma || "—").toLowerCase().trim();
    let k = map.get(key);
    if (!k) {
      k = { key, firma: firma || email || "—", email: email || "", angebote: 0, rechnungen: 0, bezahltNetto: 0, offenBrutto: 0 };
      map.set(key, k);
    }
    if (!k.firma || k.firma === "—") k.firma = firma || k.firma;
    if (!k.email) k.email = email || "";
    return k;
  }

  for (const a of angebote) get(a.kunde_firma, a.kunde_email).angebote += 1;
  for (const r of rechnungen) {
    const k = get(r.kunde_firma, r.kunde_email);
    k.rechnungen += 1;
    if (r.status === "bezahlt") k.bezahltNetto += r.netto;
    if (r.status === "offen" || r.status === "ueberfaellig") k.offenBrutto += r.brutto;
  }

  const kunden = Array.from(map.values()).sort((a, b) => b.bezahltNetto - a.bezahltNetto);

  return (
    <FinanzShell active="kunden" title="Kunden">
      {kunden.length === 0 ? (
        <div style={S.empty}>Noch keine Kunden.</div>
      ) : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Kunde", "Angebote", "Rechnungen", "Umsatz (netto)", "Offen"].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kunden.map((k) => (
                <tr key={k.key} style={S.tr}>
                  <td style={S.td}>
                    <div style={{ fontWeight: 600 }}>{k.firma}</div>
                    <div style={{ fontSize: 12, color: "#a3a3a3" }}>{k.email}</div>
                  </td>
                  <td style={S.td}>{k.angebote}</td>
                  <td style={S.td}>{k.rechnungen}</td>
                  <td style={S.td}>{eur(k.bezahltNetto)}</td>
                  <td style={S.td}>{k.offenBrutto > 0 ? eur(k.offenBrutto) : "—"}</td>
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
};
