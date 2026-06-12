/**
 * /angebot/neu — Editor (login-geschützt). Neu oder ?id=… zum Bearbeiten.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getAngebotById } from "@/lib/angebot/db";
import AngebotGenerator, { type EditorInitial } from "../AngebotGenerator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Angebot erstellen",
  robots: { index: false, follow: false },
};

export default async function NeuPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const { id } = await searchParams;

  let initial: EditorInitial | undefined;
  if (id) {
    const a = await getAngebotById(id);
    if (a) {
      initial = {
        id: a.id,
        nummer: a.nummer || undefined,
        titel: a.titel || undefined,
        untertitel: a.untertitel || undefined,
        kundeFirma: a.kunde_firma || undefined,
        kundeAnsprech: a.kunde_ansprech || undefined,
        kundeStrasse: a.kunde_strasse || undefined,
        kundePlzOrt: a.kunde_plz_ort || undefined,
        kundeLand: a.kunde_land || undefined,
        kundeEmail: a.kunde_email || undefined,
        einleitung: a.einleitung || undefined,
        positionen: a.positionen || undefined,
        anmerkungen: a.anmerkungen ?? undefined,
        bedingungen: a.bedingungen ?? undefined,
        erstellt: a.created_at?.slice(0, 10),
        gueltigBis: a.gueltig_bis || undefined,
        status: a.status,
      };
    }
  }

  return <AngebotGenerator initial={initial} />;
}
