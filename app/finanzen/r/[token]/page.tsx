/**
 * /finanzen/r/[token] — öffentliche Kundenansicht einer Rechnung (kein Login).
 * Eckdaten + Bankverbindung + echter PDF-Download. Markiert Entwürfe als nicht verfügbar.
 */
import type { Metadata } from "next";
import { getRechnungByToken } from "@/lib/finanzen/db";
import { ANBIETER } from "@/lib/angebot/stammdaten";
import { eur, deDate } from "@/lib/angebot/format";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Ihre Rechnung — Wohlstandsmarketing",
  robots: { index: false, follow: false },
};

export default async function PublicRechnungPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const r = await getRechnungByToken(token);

  if (!r || r.status === "entwurf") {
    return (
      <Shell>
        <p style={S.msg}>Diese Rechnung ist nicht (mehr) verfügbar. Bitte wenden Sie sich an Wohlstandsmarketing.</p>
      </Shell>
    );
  }

  const pdfUrl = `/api/finanzen/pdf?rechnungToken=${encodeURIComponent(token)}`;
  const offen = r.status === "offen" || r.status === "ueberfaellig";

  return (
    <Shell>
      <h1 style={S.h1}>Rechnung {r.nummer || ""}</h1>
      <div style={S.amount}>{eur(r.brutto)}</div>
      <div style={S.meta}>
        Rechnungsdatum: {deDate(r.rechnungsdatum)} · Fällig: {deDate(r.faellig_am)}
        {r.status === "bezahlt" ? " · ✅ bezahlt" : ""}
      </div>

      <a href={pdfUrl} target="_blank" rel="noreferrer" style={S.pdfBtn}>PDF herunterladen</a>

      {offen && (
        <div style={S.payBox}>
          <div style={S.payTitle}>Zahlung</div>
          <div style={S.paySmall}>
            Bitte überweisen Sie {eur(r.brutto)} bis {deDate(r.faellig_am)} auf:<br />
            {ANBIETER.kontoinhaber}<br />
            IBAN {ANBIETER.iban} · BIC {ANBIETER.bic}<br />
            Verwendungszweck: {r.nummer}
          </div>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={S.page}>
      <div style={S.card}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" width={40} height={40} alt="Wohlstandsmarketing" style={{ borderRadius: 9, marginBottom: 18, display: "block" }} />
        {children}
      </div>
    </main>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#e9eaee", fontFamily: "var(--font-inter), system-ui, sans-serif", padding: "40px 20px" },
  card: { background: "#fff", border: "1px solid #e4e4e7", borderRadius: 16, padding: "32px 30px", maxWidth: 460, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" },
  brand: { fontSize: 14, fontWeight: 700, marginBottom: 18 },
  h1: { fontSize: 22, fontWeight: 800, margin: "0 0 6px" },
  amount: { fontSize: 30, fontWeight: 800, color: "#1663de", margin: "4px 0" },
  meta: { fontSize: 13, color: "#71717a", marginBottom: 22 },
  pdfBtn: { display: "inline-block", background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "12px 22px", fontSize: 15, fontWeight: 700 },
  payBox: { marginTop: 22, padding: "16px 18px", background: "#f4f7fc", borderRadius: 10 },
  payTitle: { fontSize: 13, fontWeight: 700, marginBottom: 6 },
  paySmall: { fontSize: 13, color: "#52525b", lineHeight: 1.6 },
  msg: { fontSize: 15, color: "#52525b", lineHeight: 1.5 },
};
