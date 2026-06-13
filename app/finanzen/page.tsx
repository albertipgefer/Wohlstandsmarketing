/**
 * /finanzen — Start-Dashboard im Accountable-Stil (login-geschützt).
 * "Willkommen, Albert!" + To-Do-Liste · Vorschläge · KI-Assistent · Gewinn-Chart.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote, type Angebot } from "@/lib/angebot/db";
import { listRechnungen, type Rechnung } from "@/lib/finanzen/db";
import { listAusgaben, type Ausgabe } from "@/lib/finanzen/ausgaben";
import { computeKpis } from "@/lib/finanzen/forecast";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import KiAssistentCard from "@/components/finanzen/KiAssistentCard";
import GewinnChart from "@/components/finanzen/GewinnChart";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Start",
  robots: { index: false, follow: false },
};

function monatVon(iso: string | null): { jahr: number; monat: number } | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return { jahr: d.getFullYear(), monat: d.getMonth() };
}

/** Monatlicher Gewinn (Einnahmen − Ausgaben, netto) für ein Jahr. */
function monatsGewinn(rechnungen: Rechnung[], ausgaben: Ausgabe[], jahr: number): number[] {
  const ein = Array(12).fill(0);
  const aus = Array(12).fill(0);
  for (const r of rechnungen) {
    if (r.status !== "bezahlt") continue;
    const m = monatVon(r.bezahlt_am || r.rechnungsdatum);
    if (m && m.jahr === jahr) ein[m.monat] += r.netto;
  }
  for (const a of ausgaben) {
    const m = monatVon(a.datum);
    if (m && m.jahr === jahr) aus[m.monat] += a.betrag_netto;
  }
  return ein.map((v, i) => v - aus[i]);
}

export default async function FinanzStart() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const now = new Date();
  const jahr = now.getFullYear();
  const [angebote, rechnungen, ausgaben] = await Promise.all([
    listAngebote(),
    listRechnungen(),
    listAusgaben(),
  ]);
  const k = computeKpis(angebote, rechnungen, now);

  const heute = now.toISOString().slice(0, 10);
  const entwuerfe = rechnungen.filter((r) => r.status === "entwurf");
  const ueberfaellig = rechnungen.filter(
    (r) => r.status === "ueberfaellig" || (r.status === "offen" && r.faellig_am && r.faellig_am < heute),
  );
  const angebotIdsMitRechnung = new Set(rechnungen.map((r) => r.angebot_id).filter(Boolean));
  const angenommeneOhneRechnung = angebote.filter(
    (a) => a.status === "angenommen" && !angebotIdsMitRechnung.has(a.id),
  );

  const todos = buildTodos({ entwuerfe, ueberfaellig, angenommeneOhneRechnung });
  const vorschlaege = buildVorschlaege({ k, ausgaben, jahr, ueberfaellig, angenommeneOhneRechnung });

  return (
    <FinanzShell section="start" title="Start" banner={<h1 className="fin-h1">Willkommen, Albert! 🐷</h1>}>
      <div className="fin-dash">
        {/* To-Do-Liste */}
        <div className="fin-dash-todo" style={S.card}>
          <div style={S.cardHead}>📋 Deine To-Do-Liste</div>
          {todos.length === 0 ? (
            <p style={S.empty}>Alles erledigt. 🎉</p>
          ) : (
            <ul style={S.list}>
              {todos.map((t) => (
                <li key={t.href + t.title} style={S.todoItem}>
                  <Link href={t.href} style={S.todoLink}>
                    <span style={{ ...S.todoCount, background: t.urgent ? "#fef3f2" : "#eef3fd", color: t.urgent ? "#b42318" : "#1663de" }}>{t.count}</span>
                    <span>
                      <span style={S.todoTitle}>{t.title}</span>
                      <span style={S.todoSub}>{t.sub}</span>
                    </span>
                    <span style={S.todoArrow}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vorschläge */}
        <div className="fin-dash-vorschlaege" style={S.card}>
          <div style={S.cardHead}>💡 Vorschläge</div>
          <ul style={{ ...S.list, gap: 12 }}>
            {vorschlaege.map((v, i) => (
              <li key={i} style={S.vItem}>
                <span style={S.vIcon}>{v.icon}</span>
                <span style={S.vText}>{v.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* KI-Assistent */}
        <div className="fin-dash-ki">
          <KiAssistentCard />
        </div>

        {/* Gewinn-Chart */}
        <div className="fin-dash-chart">
          <GewinnChart
            jahr={jahr}
            aktuell={monatsGewinn(rechnungen, ausgaben, jahr)}
            vorjahr={monatsGewinn(rechnungen, ausgaben, jahr - 1)}
          />
        </div>
      </div>
    </FinanzShell>
  );
}

type Todo = { title: string; sub: string; count: number; href: string; urgent?: boolean };

function buildTodos({
  entwuerfe,
  ueberfaellig,
  angenommeneOhneRechnung,
}: {
  entwuerfe: Rechnung[];
  ueberfaellig: Rechnung[];
  angenommeneOhneRechnung: Angebot[];
}): Todo[] {
  const out: Todo[] = [];
  if (ueberfaellig.length > 0)
    out.push({ title: "Überfällige Rechnungen", sub: "Mahnung senden", count: ueberfaellig.length, href: "/finanzen/rechnungen", urgent: true });
  if (entwuerfe.length > 0)
    out.push({ title: "Rechnungs-Entwürfe", sub: "prüfen & versenden", count: entwuerfe.length, href: "/finanzen/rechnungen" });
  if (angenommeneOhneRechnung.length > 0)
    out.push({ title: "Angenommene Angebote", sub: "abrechnen", count: angenommeneOhneRechnung.length, href: "/angebot" });
  return out;
}

function buildVorschlaege({
  k,
  ausgaben,
  jahr,
  ueberfaellig,
  angenommeneOhneRechnung,
}: {
  k: ReturnType<typeof computeKpis>;
  ausgaben: Ausgabe[];
  jahr: number;
  ueberfaellig: Rechnung[];
  angenommeneOhneRechnung: Angebot[];
}): { icon: string; text: string }[] {
  const out: { icon: string; text: string }[] = [];
  if (ueberfaellig.length > 0)
    out.push({ icon: "⏰", text: `${ueberfaellig.length} Rechnung(en) sind überfällig — sende eine Mahnung, um schneller bezahlt zu werden.` });
  if (angenommeneOhneRechnung.length > 0)
    out.push({ icon: "🧾", text: `${angenommeneOhneRechnung.length} angenommene(s) Angebot(e) ist/sind noch nicht abgerechnet.` });
  const ohneBeleg = ausgaben.filter((a) => !a.notiz).length;
  if (ohneBeleg > 0)
    out.push({ icon: "📎", text: `Du hast Ausgaben ohne hinterlegten Beleg. Lade Belege hoch, damit bei einer Prüfung alles vollständig ist.` });
  out.push({ icon: "📈", text: `Dein Umsatz ${jahr} liegt bei ${eur(k.umsatzJahrNetto)} (netto). Nächster erwarteter Umsatz: ${eur(k.naechsterUmsatzNetto)}.` });
  return out.slice(0, 4);
}

const S: Record<string, React.CSSProperties> = {
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 16, padding: 18 },
  cardHead: { fontSize: 14, fontWeight: 700, color: "#27272a", marginBottom: 14 },
  empty: { fontSize: 13.5, color: "#71717a", margin: "6px 0" },
  list: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 },
  todoItem: {},
  todoLink: { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit", padding: "8px 6px", borderRadius: 10 },
  todoCount: { minWidth: 30, height: 30, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, padding: "0 6px" },
  todoTitle: { display: "block", fontSize: 14, fontWeight: 600 },
  todoSub: { display: "block", fontSize: 12, color: "#a1a1aa" },
  todoArrow: { marginLeft: "auto", color: "#c4c4c4" },
  vItem: { display: "flex", gap: 10, alignItems: "flex-start" },
  vIcon: { fontSize: 16, lineHeight: "20px" },
  vText: { fontSize: 13.5, color: "#3f3f46", lineHeight: 1.5 },
};
