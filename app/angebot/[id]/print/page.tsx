/**
 * /angebot/[id]/print — login-geschützte Druckansicht des Angebots.
 * Rendert dieselbe schöne AngebotDocument-Komponente wie Editor-Vorschau und
 * Kundenansicht (inkl. @media-print-CSS) und löst beim Laden automatisch den
 * Druckdialog aus. Ersetzt den alten schlichten @react-pdf-Download.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getAngebotById } from "@/lib/angebot/db";
import AngebotDocument, { type DocData } from "@/components/angebot/AngebotDocument";
import PrintOnMount from "@/components/angebot/PrintOnMount";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Angebot drucken",
  robots: { index: false, follow: false },
};

export default async function AngebotPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const { id } = await params;
  const a = await getAngebotById(id);
  if (!a) redirect("/angebot");

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
      <div className="ag-doc-wrap" style={{ padding: "clamp(10px, 3vw, 28px)", display: "flex", justifyContent: "center", overflowX: "auto" }}>
        <AngebotDocument data={data} />
      </div>
      <PrintOnMount />
    </main>
  );
}
