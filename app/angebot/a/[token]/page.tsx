/**
 * /angebot/a/[token] — öffentliche Kundenansicht des Angebots (kein Login).
 * Zeigt das Angebot im WSM-Look, PDF-Download, „Annehmen". Markiert beim ersten
 * Aufruf 'gesendet' → 'angesehen'.
 */
import type { Metadata } from "next";
import { getAngebotByToken, updateAngebot } from "@/lib/angebot/db";
import AngebotDocument, { type DocData } from "@/components/angebot/AngebotDocument";
import AcceptBar from "@/components/angebot/AcceptBar";
import PrintButton from "@/components/angebot/PrintButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Ihr Angebot — Wohlstandsmarketing",
  robots: { index: false, follow: false },
};

/** Markenzeichen wie in der Dokument-Ansicht: Icon + „Wohlstandsmarketing". */
function Brand() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon.png" alt="Wohlstandsmarketing" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 6, flexShrink: 0 }} />
      <span>Wohlstands<span style={{ color: "#1663de" }}>marketing</span></span>
    </span>
  );
}

function ErrorView({ msg }: { msg: string }) {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#e9eaee", fontFamily: "var(--font-inter), system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 16, padding: "32px 28px", maxWidth: 420, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}><Brand /></div>
        <p style={{ fontSize: 15, color: "#52525b", marginTop: 16, lineHeight: 1.5 }}>{msg}</p>
      </div>
    </main>
  );
}

export default async function PublicAngebotPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const a = await getAngebotByToken(token);

  if (!a || a.status === "entwurf") {
    return <ErrorView msg="Dieses Angebot ist nicht (mehr) verfügbar. Bitte wenden Sie sich an Wohlstandsmarketing." />;
  }

  // Erstaufruf: gesendet → angesehen (nur dieser Übergang).
  if (a.status === "gesendet") {
    try {
      await updateAngebot(a.id, { status: "angesehen", viewed_at: new Date().toISOString() });
    } catch {
      /* nicht blockierend */
    }
  }

  const data: DocData = {
    nummer: a.nummer || "",
    titel: a.titel || "Ihr Angebot",
    untertitel: a.untertitel || "Ein individuelles Angebot von Wohlstandsmarketing.",
    kundeFirma: a.kunde_firma || "",
    kundeAnsprech: a.kunde_ansprech || "",
    kundeStrasse: a.kunde_strasse || "",
    kundePlzOrt: a.kunde_plz_ort || "",
    kundeLand: a.kunde_land || "",
    einleitung: a.einleitung || "",
    positionen: a.positionen || [],
    anmerkungen: a.anmerkungen || "",
    bedingungen: a.bedingungen || "",
    erstellt: (a.created_at || "").slice(0, 10),
    gueltigBis: a.gueltig_bis || "",
  };

  return (
    <main className="ag-page" style={{ background: "#e9eaee", minHeight: "100vh", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <div className="ag-no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: "#fff", borderBottom: "1px solid #e4e4e7", position: "sticky", top: 0, zIndex: 10 }}>
        <Brand />
        <PrintButton />
      </div>

      <div className="ag-doc-wrap" style={{ padding: "clamp(10px, 3vw, 28px)", display: "flex", justifyContent: "center", overflowX: "auto" }}>
        <AngebotDocument data={data} />
      </div>

      <div className="ag-no-print" style={{ padding: "0 clamp(10px, 3vw, 28px) 40px" }}>
        <AcceptBar token={token} accepted={a.status === "angenommen"} acceptName={a.accept_name} />
      </div>
    </main>
  );
}
