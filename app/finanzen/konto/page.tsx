import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { ANBIETER } from "@/lib/angebot/stammdaten";
import FinanzShell from "@/components/finanzen/FinanzShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Konto", robots: { index: false, follow: false } };

export default async function KontoSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const rows: [string, string][] = [
    ["Name", ANBIETER.name],
    ["Firma", ANBIETER.firma],
    ["Adresse", `${ANBIETER.strasse}, ${ANBIETER.plzOrt}`],
    ["Steuernummer", ANBIETER.steuernummer],
    ["E-Mail", ANBIETER.email],
    ["Telefon", ANBIETER.telefon],
    ["IBAN", ANBIETER.iban],
    ["BIC", ANBIETER.bic],
    ["Kontoinhaber", ANBIETER.kontoinhaber],
  ];
  return (
    <FinanzShell section="start" title="Konto">
      <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "8px 22px", maxWidth: 620 }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: i < rows.length - 1 ? "1px solid #f4f4f5" : "none" }}>
            <span style={{ fontSize: 13.5, color: "#71717a" }}>{k}</span>
            <span style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#a1a1aa", marginTop: 14 }}>
        Diese Stammdaten erscheinen auf allen Angeboten und Rechnungen. Änderungen erfolgen aktuell zentral in <code>lib/angebot/stammdaten.ts</code>.
      </p>
    </FinanzShell>
  );
}
