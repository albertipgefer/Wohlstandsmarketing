/**
 * GET /api/cron/outreach-inbox — Reply-/Bounce-Erkennung + Befund-Freigabe-Loop.
 *
 * Läuft via launchd-Pinger (~alle 30 Min). Pro Lauf:
 *   1) genehmigte Befund-Entwürfe versenden, deren 5-Minuten-Fenster erreicht ist
 *   2) jede Postfach-INBOX per IMAP auf neue Nachrichten (~2 h) pollen:
 *        - Bounce → status=bounced
 *        - negative Antwort → auto-abmelden
 *        - positive Antwort → Close-Lead + HOT-Task, Befund-Entwurf, Telegram-Freigabe
 *
 * Auth: Authorization: Bearer ${CRON_SECRET}
 * Required ENV: CRON_SECRET, SUPABASE_*, OUTBOUND_INBOXES (JSON), TELEGRAM_* bzw. OUTREACH_*
 */
import { NextRequest, NextResponse } from "next/server";
import { ImapFlow } from "imapflow";
import nodemailer from "nodemailer";
import { simpleParser } from "mailparser";
import {
  getProspectByEmail, getProspectById, setStatusByEmail, logEvent,
  insertPendingReply, getApprovedDuePending, updatePendingReply,
} from "@/lib/outreach-db";
import {
  sendOutreachTelegram, sendOutreachTelegramButtons,
} from "@/lib/telegram";
import { buildBefund, befundButtons, befundPreview } from "@/lib/outreach-befund";
import { syncLeadToClose } from "@/lib/close";
import { claudeText } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Inbox = {
  host: string; port: number; user: string; pass: string;
  imapHost?: string; fromName?: string; fromEmail?: string;
};

function loadInboxes(): Inbox[] {
  try {
    return JSON.parse(process.env.OUTBOUND_INBOXES || "[]");
  } catch {
    return [];
  }
}

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

/** Grobe Extraktion des eigentlichen Antworttextes (Zitate/Header raus). */
function extractReplyText(raw: string): string {
  const out: string[] = [];
  for (const line of raw.split(/\r?\n/)) {
    if (/^>/.test(line)) continue;
    if (/^(From|To|Subject|Date|Content-|MIME|Return-Path|Received|DKIM|Authentication-Results|Message-ID|References|In-Reply-To|X-[\w-]+):/i.test(line)) continue;
    if (/^--/.test(line)) continue;
    if (/^(Am .* schrieb|On .* wrote|Von:|Gesendet:|-----Urspr)/i.test(line)) break;
    const t = line.replace(/=$/, "").trim();
    if (t) out.push(t);
    if (out.length >= 12) break;
  }
  return out.join(" ").replace(/\s{2,}/g, " ").slice(0, 600);
}

/**
 * Klartext-Body aus einer geparsten Mail, Zitate/Signatur-Reste raus.
 * Stoppt an der zitierten Originalmail ("Am ... schrieb", "Von:", Trennlinien),
 * damit unser eigener Footer (enthält "Abmelden") die Bewertung nicht verfälscht.
 */
function cleanBody(text: string): string {
  const out: string[] = [];
  for (const line of (text || "").split(/\r?\n/)) {
    if (/^\s*>/.test(line)) continue;
    if (/^\s*(Am .*schrieb|On .*wrote|Von:|Gesendet:|-{3,}\s*Urspr|_{5,})/i.test(line)) break;
    out.push(line);
  }
  return out.join("\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Harte Header-Signale für automatische Antworten (RFC 3834 u. a.). Wenn eines
 * davon gesetzt ist, ist es sicher eine Maschine, keine echte Person — dann
 * sparen wir uns die KI-Klassifizierung.
 */
function isAutoHeader(raw: string): boolean {
  return (
    /(^|\n)auto-submitted:\s*auto-(replied|generated|notified)/i.test(raw) ||
    /(^|\n)x-autoreply:/i.test(raw) ||
    /(^|\n)x-autorespond:/i.test(raw) ||
    /(^|\n)x-auto-response-suppress:/i.test(raw) ||
    /(^|\n)precedence:\s*(auto_reply|bulk|junk)/i.test(raw) ||
    /(^|\n)return-path:\s*<>\s*$/im.test(raw)
  );
}

/** Keyword-Fallback (nur falls die KI nicht verfügbar ist). */
function looksNegativeKw(body: string): boolean {
  return /(kein(en)? interesse|nicht interessiert|kein(en)? bedarf|bitte keine|keine weiteren|bitte.{0,12}(abmelden|austragen)|nehmen sie mich (raus|heraus)|entfernen sie|streichen sie|nein\s*,?\s*danke|kein\s*danke|nicht kontaktieren|unsubscribe|abbestellen)/.test(body.toLowerCase());
}
function looksAutoKw(subject: string, body: string): boolean {
  const s = (subject || "").toLowerCase();
  const b = (body || "").toLowerCase();
  const re = /(abwesen|out[\s-]?of[\s-]?office|automatische?\s+(antwort|benachrichtigung)|automatic\s+reply|auto[-\s]?reply|betriebsferien|urlaub|ferien|nicht\s+im\s+büro|außer\s+haus|wieder\s+(für\s+sie\s+)?(da|erreichbar)\s+ab|erreichen\s+sie\s+uns\s+wieder)/i;
  return re.test(s) || re.test(b);
}

type Intent = "positive" | "negative" | "auto" | "irrelevant";

/**
 * Bestimmt die Absicht einer Antwort. Generalisiert (kein starres Muster):
 *   1) Harte Auto-Header  -> "auto" (sicher, ohne KI)
 *   2) KI-Klassifizierung des echten Body-Textes (Haiku)
 *   3) Keyword-Fallback, falls die KI nicht erreichbar ist
 * Nur "positive" löst Lead + Befund aus.
 */
async function classifyIntent(subject: string, body: string, raw: string): Promise<Intent> {
  if (isAutoHeader(raw)) return "auto";

  const prompt =
    `Eine Person hat auf eine geschäftliche Akquise-Mail geantwortet. ` +
    `Klassifiziere ihre Absicht in GENAU EIN Wort:\n` +
    `- positive: echte, persönliche Antwort mit Interesse, Rückfrage oder Gesprächsbereitschaft\n` +
    `- negative: Absage, kein Interesse, Bitte um Abmeldung\n` +
    `- auto: automatische Antwort (Abwesenheit, Urlaub, Out of Office, Eingangsbestätigung, automatische Weiterleitung), also nichts, was inhaltlich auf unsere Mail eingeht\n` +
    `- irrelevant: themenfremd, leer, unverständlich oder eine technische Benachrichtigung\n\n` +
    `Betreff: ${subject || "(kein)"}\n` +
    `Nachricht: ${(body || "(leer)").slice(0, 1200)}\n\n` +
    `Antworte nur mit einem Wort: positive, negative, auto oder irrelevant.`;
  const out = (await claudeText(prompt, { maxTokens: 8 }))?.toLowerCase() || "";
  if (out.includes("positive")) return "positive";
  if (out.includes("negative")) return "negative";
  if (out.includes("auto")) return "auto";
  if (out.includes("irrelevant")) return "irrelevant";

  // Fallback ohne KI
  if (looksNegativeKw(body)) return "negative";
  if (looksAutoKw(subject, body)) return "auto";
  return "positive";
}

/** Versendet genehmigte Befund-Entwürfe (status=approved, send_at erreicht) als Thread-Antwort. */
async function sendApprovedBefunde(inboxes: Inbox[]): Promise<number> {
  // Sicherheits-Gate wie beim Kaltversand: Befunde gehen erst nach Go-Live raus.
  if (process.env.OUTREACH_SEND_ENABLED !== "1") return 0;
  const pendings = await getApprovedDuePending();
  let sent = 0;
  for (const pr of pendings) {
    const p = pr.prospect_id ? await getProspectById(pr.prospect_id) : null;
    if (!p || !pr.draft_body) { await updatePendingReply(pr.id, { status: "rejected" }); continue; }
    const ib = inboxes.find((x) => x.user === p.sent_from_inbox) || inboxes[0];
    if (!ib) continue;
    try {
      const tx = nodemailer.createTransport({
        host: ib.host, port: ib.port, secure: ib.port === 465,
        auth: { user: ib.user, pass: ib.pass },
      });
      await tx.sendMail({
        from: `"${ib.fromName || "Albert Ipgefer"}" <${ib.fromEmail || ib.user}>`,
        to: p.email,
        subject: pr.draft_subject || `Re: ${p.mail1_subject || ""}`,
        text: pr.draft_body,
        ...(pr.thread_message_id
          ? { inReplyTo: pr.thread_message_id, references: pr.thread_message_id }
          : {}),
      });
      await updatePendingReply(pr.id, { status: "sent" });
      sent++;
      await sendOutreachTelegram(`📤 Befund-Mail an ${p.company || p.email} ist raus.`);
    } catch (e) {
      console.warn("Befund-Send-Fehler", p.email, e instanceof Error ? e.message : e);
    }
  }
  return sent;
}

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const inboxes = loadInboxes();
  if (inboxes.length === 0) return NextResponse.json({ ok: false, error: "no_inboxes" });

  // 1) genehmigte Befunde versenden
  const befundeSent = await sendApprovedBefunde(inboxes);

  // 2) Postfächer pollen (Fenster knapp über dem 30-Min-Pinger -> wenig Überlappung)
  const since = new Date(Date.now() - 50 * 60 * 1000);
  let replies = 0, bounces = 0, scanned = 0, autoReplies = 0;

  for (const ib of inboxes) {
    const client = new ImapFlow({
      host: ib.imapHost || ib.host.replace(/^smtp\./, "imap."),
      port: 993, secure: true,
      auth: { user: ib.user, pass: ib.pass }, logger: false,
    });
    try {
      await client.connect();
      const lock = await client.getMailboxLock("INBOX");
      try {
        for await (const msg of client.fetch({ since }, { envelope: true, source: true })) {
          scanned++;
          const from = (msg.envelope?.from?.[0]?.address || "").toLowerCase();
          const subject = msg.envelope?.subject || "";
          const raw = msg.source?.toString("utf8") || "";
          const isBounce = /mailer-daemon|postmaster|mail delivery/i.test(from) ||
            /undeliver|delivery (has )?failed|returned mail|zustellung fehlgeschlagen/i.test(subject);

          if (isBounce) {
            const candidates = [...new Set((raw.match(EMAIL_RE) || []).map((e) => e.toLowerCase()))];
            for (const cand of candidates) {
              if (cand.endsWith("@" + (ib.user.split("@")[1] || ""))) continue;
              const p = await getProspectByEmail(cand);
              if (p && p.status !== "bounced") {
                await setStatusByEmail(cand, "bounced");
                await logEvent(p.id, "bounce", { meta: { kind: "hard", inbox: ib.user } });
                bounces++;
                break;
              }
            }
            continue;
          }

          const p = from ? await getProspectByEmail(from) : null;
          if (p && !["replied", "converted", "unsubscribed", "bounced"].includes(p.status)) {
            // Echten Klartext-Body holen (mailparser); Fallback auf den groben
            // Header-Filter, falls das Parsen scheitert. Vorher kam hier teils
            // reiner Header-Müll an, wodurch jede Bewertung des Inhalts versagte.
            let replyText = "";
            try {
              if (msg.source) {
                const parsed = await simpleParser(msg.source);
                replyText = cleanBody(parsed.text || "");
              }
            } catch { /* Fallback unten */ }
            if (!replyText) replyText = extractReplyText(raw);
            replyText = replyText.slice(0, 600);

            // Absicht generalisiert bestimmen: Auto-Header -> KI (Haiku) -> Keyword-Fallback.
            const intent = await classifyIntent(subject, replyText, raw);

            // Automatische/themenfremde Antwort: NICHT als positive Antwort werten.
            // Kein Statuswechsel (Sequenz läuft normal weiter), kein Lead, kein
            // Befund, keine Task. Nur eine ruhige Telegram-Info, und die nur für
            // frische Mails (Anti-Spam: dieselbe Mail wird im 50-Min-Scanfenster
            // sonst mehrfach getroffen, weil der Status unverändert bleibt).
            if (intent === "auto" || intent === "irrelevant") {
              const msgTs = msg.envelope?.date ? new Date(msg.envelope.date).getTime() : 0;
              const fresh = msgTs > 0 && Date.now() - msgTs < 15 * 60 * 1000;
              if (fresh) {
                autoReplies++;
                await sendOutreachTelegram(
                  `ℹ️ <b>Automatische Antwort</b> von ${p.company || from}\n` +
                  `Nicht als Antwort gewertet, die Sequenz läuft normal weiter.`,
                );
              }
              continue;
            }

            if (intent === "negative") {
              await setStatusByEmail(from, "unsubscribed");
              await logEvent(p.id, "unsubscribe", { meta: { via: "reply_negative" } });
              await sendOutreachTelegram(
                `🚫 <b>Negative Antwort</b> — automatisch abgemeldet.\n${p.company || from} · ${from}`,
              );
            } else {
              await setStatusByEmail(from, "replied");
              await logEvent(p.id, "reply", { ab_arm: p.ab_arm, sequence_step: p.sequence_step });
              replies++;

              // Lead sofort in Close (HOT-Task + Telefon + Notiz)
              try {
                await syncLeadToClose({
                  source: "cold-outreach",
                  fullName: p.salutation?.replace(/^(Herr|Frau)\s+/, "") || undefined,
                  email: from,
                  phone: p.phone || undefined,
                  company: p.company || undefined,
                  noteLines: [
                    `Positive Antwort auf Cold-Outreach (Bucket ${p.bucket || "—"}).`,
                    replyText ? `Antwort: ${replyText.slice(0, 400)}` : null,
                  ],
                });
              } catch (e) {
                console.warn("Close-Sync (reply)", e instanceof Error ? e.message : e);
              }

              // Befund-Entwurf + Freigabe-Loop
              const draft = await buildBefund(p, replyText);
              const pendingId = await insertPendingReply({
                prospect_id: p.id, reply_text: replyText,
                draft_subject: draft.subject, draft_body: draft.body,
                thread_message_id: p.thread_message_id || msg.envelope?.messageId || null,
              });
              const head =
                `✉️ <b>Positive Antwort!</b>  ${p.company || from}\n` +
                `📞 ${p.phone || "keine Nummer gefunden"}\n` +
                (replyText ? `<i>${replyText.slice(0, 200)}</i>\n\n` : `\n`);
              if (pendingId) {
                await sendOutreachTelegramButtons(
                  head + befundPreview(p.company || from, draft.subject, draft.body),
                  befundButtons(pendingId),
                );
              } else {
                await sendOutreachTelegram(head + "Entwurf konnte nicht gespeichert werden, bitte manuell antworten.");
              }
            }
          }
        }
      } finally {
        lock.release();
      }
      await client.logout();
    } catch (e) {
      console.warn("IMAP-Fehler", ib.user, e instanceof Error ? e.message : e);
      try { await client.close(); } catch { /* ignore */ }
    }
  }

  return NextResponse.json({ ok: true, scanned, replies, autoReplies, bounces, befundeSent });
}
