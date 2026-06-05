/**
 * GET /api/cron/outreach-inbox — Reply-/Bounce-Erkennung (Sequenz-Stopp).
 *
 * Läuft als Vercel-Cron (~alle 30 Min). Pollt jede Postfach-INBOX per IMAP auf
 * neue Nachrichten der letzten ~2 h:
 *   - Bounce (mailer-daemon/postmaster) → betroffene Adresse(n) → status=bounced
 *   - echte Antwort eines Prospects → status=replied + Telegram (Albert übernimmt)
 *
 * Idempotent über den Status-Check (bereits replied/bounced → kein Doppel-Event).
 * Auth: Authorization: Bearer ${CRON_SECRET}
 * Required ENV: CRON_SECRET, SUPABASE_*, OUTBOUND_INBOXES (JSON), TELEGRAM_* (opt.)
 *
 * Feinschliff (mit echten Antworten): positiv/negativ-Klassifizierung + Entwurf
 * mit Check-Link automatisch anlegen. v1 alarmiert Albert, der manuell antwortet.
 */
import { NextRequest, NextResponse } from "next/server";
import { ImapFlow } from "imapflow";
import MailComposer from "nodemailer/lib/mail-composer/index.js";
import { getProspectByEmail, setStatusByEmail, logEvent } from "@/lib/outreach-db";
import { sendOutreachTelegram } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://wohlstandsmarketing.de";
const TERMIN = "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";

type Inbox = { host: string; port: number; user: string; pass: string; imapHost?: string };

/** Legt einen fertigen Antwort-Entwurf (Re:) im Drafts-Ordner an. Albert sendet nur noch. */
async function createDraft(
  client: ImapFlow, ib: Inbox, to: string, subject: string,
  salutation: string | null | undefined, checkLink: string, msgId?: string,
): Promise<boolean> {
  const text =
    `${salutation ? `Hallo ${salutation}` : "Guten Tag"},\n\n` +
    `danke für Ihre Antwort! Hier der Link zum kostenlosen KI-Sichtbarkeitscheck — ` +
    `das Ergebnis kommt in wenigen Minuten direkt per Mail:\n${checkLink}\n\n` +
    `Wenn Sie lieber kurz sprechen, finden wir hier in 15 Minuten einen Slot:\n${TERMIN}\n\n` +
    `Beste Grüße\nAlbert Ipgefer · Wohlstandsmarketing`;
  try {
    const raw: Buffer = await new MailComposer({
      from: ib.user, to, subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
      text, inReplyTo: msgId, references: msgId,
    }).compile().build();
    // Drafts-Ordnername ist providerabhängig (Gmail: "[Gmail]/Drafts") → Feinschliff
    for (const box of ["Drafts", "[Gmail]/Drafts", "Entwürfe"]) {
      try { await client.append(box, raw, ["\\Draft"]); return true; } catch { /* nächster */ }
    }
  } catch { /* ignore */ }
  return false;
}

function loadInboxes(): Inbox[] {
  try {
    return JSON.parse(process.env.OUTBOUND_INBOXES || "[]");
  } catch {
    return [];
  }
}

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const inboxes = loadInboxes();
  if (inboxes.length === 0) return NextResponse.json({ ok: false, error: "no_inboxes" });

  const since = new Date(Date.now() - 2 * 3600 * 1000);
  let replies = 0, bounces = 0, scanned = 0;

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
          const isBounce = /mailer-daemon|postmaster|mail delivery/i.test(from) ||
            /undeliver|delivery (has )?failed|returned mail|zustellung fehlgeschlagen/i.test(subject);

          if (isBounce) {
            // betroffene Adresse(n) aus dem Quelltext extrahieren und gegen DB prüfen
            const raw = msg.source?.toString("utf8") || "";
            const candidates = [...new Set((raw.match(EMAIL_RE) || []).map((e) => e.toLowerCase()))];
            for (const cand of candidates) {
              if (cand.endsWith("@" + (ib.user.split("@")[1] || ""))) continue; // eigene Adresse
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

          // echte Antwort eines Prospects?
          const p = from ? await getProspectByEmail(from) : null;
          if (p && !["replied", "converted", "unsubscribed", "bounced"].includes(p.status)) {
            const bodyLower = (msg.source?.toString("utf8") || "").toLowerCase();
            const isNegative =
              /(kein interesse|nicht interessiert|kein bedarf|bitte keine|keine weiteren|abmelden|austragen|unsubscribe|nehmen sie mich (raus|heraus)|entfernen sie|streichen sie|kein\s*danke|nicht kontaktieren)/.test(bodyLower);

            if (isNegative) {
              // höfliches Nein → automatisch abmelden, KEIN Entwurf
              await setStatusByEmail(from, "unsubscribed");
              await logEvent(p.id, "unsubscribe", { meta: { via: "reply_negative" } });
              await sendOutreachTelegram(
                `🚫 <b>Negative Antwort</b> — automatisch abgemeldet.\n` +
                  `${p.company || from} · ${from}\nBetreff: ${subject}`,
              );
            } else {
              await setStatusByEmail(from, "replied");
              await logEvent(p.id, "reply", { ab_arm: p.ab_arm, sequence_step: p.sequence_step });
              replies++;
              const checkLink = `${SITE}/sichtbarkeits-check?src=outreach&pid=${p.id}`;
              const drafted = await createDraft(
                client, ib, from, subject, p.salutation, checkLink, msg.envelope?.messageId,
              );
              await sendOutreachTelegram(
                `✉️ <b>Antwort auf Cold-Outreach!</b>\n\n` +
                  `👤 ${p.company || from}\n✉️ ${from}\n📞 ${p.phone || "—"}\n` +
                  `Betreff: ${subject}\n\n` +
                  (drafted
                    ? `📝 Antwort-Entwurf liegt im Postfach — nur noch senden.`
                    : `➡️ Sequenz gestoppt — bitte persönlich antworten.`),
              );
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

  return NextResponse.json({ ok: true, scanned, replies, bounces });
}
