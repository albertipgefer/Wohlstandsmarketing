/**
 * GET /api/finanzen/steuern/export?jahr=YYYY — CSV-Export der Steuer-Kennzahlen
 * (USt-VA je Quartal + EÜR + Rücklage) zum manuellen Übertragen ins ELSTER-Portal
 * bzw. zur Ablage. Login-geschützt.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listRechnungen } from "@/lib/finanzen/db";
import { listAusgaben } from "@/lib/finanzen/ausgaben";
import { ustVoranmeldung, euer, ruecklageEmpfehlung, zeitraum } from "@/lib/finanzen/steuern";

function n(v: number): string {
  return v.toFixed(2).replace(".", ",");
}

export async function GET(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const jahr = Number(req.nextUrl.searchParams.get("jahr")) || new Date().getFullYear();
  const [rechnungen, ausgaben] = await Promise.all([listRechnungen(), listAusgaben()]);

  const lines: string[] = [];
  lines.push(`Steuer-Report ${jahr};;;`);
  lines.push("");
  lines.push("USt-Voranmeldung;Umsatz netto;Umsatzsteuer;Vorsteuer;Zahllast");
  for (const q of ["q1", "q2", "q3", "q4"]) {
    const zr = zeitraum(jahr, q);
    const u = ustVoranmeldung(rechnungen, ausgaben, zr.von, zr.bis);
    lines.push(`${zr.label};${n(u.umsatzNetto)};${n(u.ustEingenommen)};${n(u.vorsteuer)};${n(u.zahllast)}`);
  }
  const jahrU = ustVoranmeldung(rechnungen, ausgaben, `${jahr}-01-01`, `${jahr}-12-31`);
  lines.push(`Gesamt ${jahr};${n(jahrU.umsatzNetto)};${n(jahrU.ustEingenommen)};${n(jahrU.vorsteuer)};${n(jahrU.zahllast)}`);
  lines.push("");

  const e = euer(rechnungen, ausgaben, jahr);
  const rl = ruecklageEmpfehlung(e.gewinn);
  lines.push("EÜR / Gewinnermittlung;Betrag");
  lines.push(`Betriebseinnahmen netto;${n(e.einnahmenNetto)}`);
  lines.push(`Betriebsausgaben netto;${n(e.ausgabenNetto)}`);
  lines.push(`Gewinn vor Steuern;${n(e.gewinn)}`);
  lines.push("");
  lines.push("Steuer-Rücklage;Betrag");
  lines.push(`geschätzte Einkommensteuer;${n(rl.einkommensteuerSchaetzung)}`);
  lines.push(`empfohlene Rücklage;${n(rl.empfohleneRuecklage)}`);

  const csv = "﻿" + lines.join("\n"); // BOM für Excel/Umlaute
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="steuer-report-${jahr}.csv"`,
    },
  });
}
