/**
 * GET /api/cron/lead-magnet-drip
 *
 * Vercel-Cron-Job für die 7-Mail-Drip-Sequenz "11 teuerste Marketing-Fehler".
 * Läuft 1x täglich (Schedule in vercel.json: "0 9 * * *" = 09:00 UTC).
 *
 * Logik pro Contact in der Audience:
 *   - berechne ganze Tage seit `created_at`
 *   - wenn elapsedDays in [1, 3, 5, 7, 10, 14] → schick passende Mail (Tag 0
 *     ist Welcome — geht bereits sofort beim Submit via /api/lead-magnet)
 *   - Resend hat keine Contact-Tags → Dedup via Mail-Tag mit
 *     `idempotency-key`-Header pro (email, step) — Resend dedupliziert das
 *     server-seitig, sodass derselbe Step nie 2x rausgeht.
 *
 * Auth:
 *   Vercel-Cron-Header `Authorization: Bearer ${CRON_SECRET}` wird geprüft.
 *   Manuelle Aufrufe ohne Secret → 401.
 *
 * Required ENV:
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL
 *   RESEND_AUDIENCE_ID
 *   CRON_SECRET — generieren mit `openssl rand -hex 32`, in Vercel hinterlegen.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://wohlstandsmarketing.de";
const PDF_LINK = `${SITE}/lead-magnet/11-marketing-fehler-mittelstand.pdf`;
const BOOK_LINK =
  "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";
const WHATSAPP_LINK = "https://wa.me/4917622787559";

interface ResendContact {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  unsubscribed?: boolean;
  created_at: string;
}

interface DripMail {
  day: number;
  subject: string;
  preview: string;
  htmlBody: (vars: Vars) => string;
}

interface Vars {
  firstName: string;
}

const DRIP: DripMail[] = [
  {
    day: 1,
    subject: "Welcher der 11 Fehler kostet dich am meisten?",
    preview: "Eine Frage, die du dir heute ehrlich beantworten solltest.",
    htmlBody: ({ firstName }) =>
      mailFrame(
        firstName,
        `Hast du gestern reingeschaut?`,
        `<p>Falls ja: gut. Falls nicht — kein Drama. Aber dann nimm dir heute 15 Minuten und geh die 11 Fehler einmal durch. <a href="${PDF_LINK}">Hier nochmal die PDF →</a></p>
         <p>Ich sage dir vorab, was du sehen wirst:</p>
         <p>Du wirst nicken bei einigen. Du wirst innerlich seufzen bei anderen. Und du wirst bei mindestens <strong>drei</strong> Fehlern wissen: <em>„Das ist genau mein Problem."</em></p>
         <p>Das ist gut. Genau dort liegt dein Hebel.</p>
         <p>Die meisten Mittelstand-Unternehmer, die ich begleite, kommen zu mir mit dem Gefühl, dass „im Marketing irgendwas nicht passt". Aber sie können nicht greifen, <strong>was genau</strong>. Sie haben das Gefühl, an drei Stellen gleichzeitig schrauben zu müssen.</p>
         <p>Die Wahrheit: in 80 % der Fälle reicht <strong>eine einzige große Korrektur</strong>, um in 90 Tagen einen spürbaren Unterschied zu sehen.</p>
         <p>Welche das bei dir ist, weiß ich noch nicht. Aber <strong>du</strong> weißt es schon. Du hast es nur noch nicht aufgeschrieben.</p>
         <p>Mach genau das jetzt: such dir den Fehler aus der PDF, der dich am meisten getroffen hat. Schreib ihn dir auf einen Zettel. Heft ihn an deinen Monitor.</p>
         <p>Morgen schreibe ich dir mit einem konkreten Beispiel, wie einer meiner Kunden genau diesen Hebel umgesetzt hat — und was passiert ist.</p>`,
        "Bis morgen,",
        `PS: Falls du das Gefühl hast, du brauchst direkt einen Sparringspartner, um den richtigen Hebel zu finden — <a href="${BOOK_LINK}">hier kannst du ein 15-Min-Erstgespräch buchen</a>. Kostet dich nichts, außer einer ehrlichen Einschätzung.`,
      ),
  },
  {
    day: 3,
    subject: "Wie ein Caterer aus Bayern seine Anfragen verdoppelt hat",
    preview: "Ein konkretes Beispiel — keine Zaubertricks, keine Hacks.",
    htmlBody: ({ firstName }) =>
      mailFrame(
        firstName,
        `Ich erzähle dir heute von Markus*.`,
        `<p>Markus betreibt ein Catering-Unternehmen im Süden Deutschlands. 14 Mitarbeiter, solider Ruf, gute Empfehlungen, gute Kunden — aber: jeden Monat das gleiche Bauchgefühl. <em>„Wir wissen nie, ob nächsten Monat genug rein­kommt."</em></p>
         <p>Klassischer Fall von <strong>Fehler #6</strong>: kein System, nur Bauchgefühl.</p>
         <p>Als wir angefangen haben, hat er mir das hier gezeigt:</p>
         <ul>
           <li>Instagram: alle 2 Wochen ein Post (wenn er Zeit hatte)</li>
           <li>Facebook: hier und da eine Anzeige für 5 € am Tag</li>
           <li>Google Ads: war mal an, aber er wusste nicht mehr, ob aktuell</li>
           <li>E-Mail-Marketing: gab es nicht</li>
           <li>Empfehlungen: 80 % seines Umsatzes</li>
         </ul>
         <p>Mit anderen Worten: er hat <strong>fünf Kanäle</strong> halbherzig bedient. Wir haben <strong>vier davon abgeschaltet</strong>.</p>
         <p>Übrig blieb: Meta Ads. Eine einzige Kampagne. Eine einzige Landingpage. Ein klares Angebot („Buchungsanfrage Hochzeit 2026 — Antwort innerhalb 24 h").</p>
         <p>In den ersten 4 Wochen: chaotisch. CPL bei 38 €, viel zu hoch. Woche 5–7: wir haben die Anzeigen ausgetauscht, die Landingpage präzisiert. Woche 8: CPL stabil bei 14 €. Woche 11: über doppelt so viele qualifizierte Anfragen wie im Vorjahresmonat.</p>
         <p><strong>Das Mindset:</strong> weniger Kanäle, mehr Tiefe.<br/>
         <strong>Der Hebel:</strong> einen Funnel sauber zum Laufen bringen, statt fünf halbe Funnel parallel zu halten.</p>
         <p>Schau dir an, an wie vielen Kanälen du gleichzeitig arbeitest. Wenn es mehr als zwei sind, ist da dein Hebel.</p>
         <p style="color:#a1a1aa;font-size:12px">* Name geändert.</p>`,
        "Bis übermorgen,",
        `PS: Falls du wissen willst, wie das konkret für dich aussehen würde — <a href="${BOOK_LINK}">hier ein 15-Min-Erstgespräch</a>.`,
      ),
  },
  {
    day: 5,
    subject: "Niemand spricht darüber — aber 2027 wird es alles entscheiden",
    preview: "Die unbequeme Realität für Mittelständler, die noch auf Google fixiert sind.",
    htmlBody: ({ firstName }) =>
      mailFrame(
        firstName,
        `Eine Frage, die in den letzten 12 Monaten kaum jemand stellt — die aber in 24 Monaten <strong>alles entscheiden</strong> wird:`,
        `<blockquote>Wird dein Unternehmen von ChatGPT, Perplexity und Google AI Overviews empfohlen?</blockquote>
         <p>Falls deine Antwort „keine Ahnung" ist, bist du in guter Gesellschaft. 95 % der Mittelständler, mit denen ich spreche, haben darüber noch nie nachgedacht.</p>
         <p>Und genau deshalb ist es die größte Chance der nächsten 36 Monate.</p>
         <p>Hier ist die Wahrheit:</p>
         <p><strong>1. KI-Suche ist nicht „die Zukunft" — sie ist gerade jetzt.</strong><br/>
         30–40 % aller B2B-Recherchen starten heute schon in ChatGPT oder Perplexity, nicht mehr in Google.</p>
         <p><strong>2. KI-Suchen sind anders.</strong><br/>
         Google zeigt dir 10 blaue Links. ChatGPT zeigt dir <strong>eine</strong> Empfehlung.</p>
         <p><strong>3. KI-Sichtbarkeit ist machbar.</strong><br/>
         Aber sie braucht andere Bausteine: strukturierte Daten, Quotability, AEO-Content, Crawler-Hinweise.</p>
         <p>Wir haben dafür einen <strong>kostenlosen KI-Sichtbarkeits-Check</strong> gebaut. Du gibst deine Domain rein, bekommst 20+ Prüfpunkte plus Score plus drei konkrete Hebel — alles in 60 Sekunden, ohne Anmeldung.</p>
         <p><a href="${SITE}/sichtbarkeits-check"><strong>Hier den Check machen →</strong></a></p>
         <p>Allein der Score wird dich überraschen. Bei den meisten Mittelständlern liegt er bei 30–50 von 100.</p>`,
        "Bis übermorgen,",
      ),
  },
  {
    day: 7,
    subject: "Wir sind eine Woche durch — wo stehst du?",
    preview: "Eine ehrliche Selbsteinschätzung, die nicht weh tut.",
    htmlBody: ({ firstName }) =>
      mailFrame(
        firstName,
        `Eine Woche ist vorbei seit du die PDF heruntergeladen hast.`,
        `<p>Frage: hast du in dieser Woche <strong>eine konkrete Sache</strong> in deinem Marketing verändert? Eine. Nicht fünf.</p>
         <p>Falls ja: respektiere ich. Mach weiter.<br/>
         Falls nein: kein Drama — aber lies bitte den nächsten Absatz.</p>
         <p>Die meisten Marketing-Probleme im Mittelstand sind nicht Wissens-Probleme. Sie sind <strong>Umsetzungs-Probleme</strong>.</p>
         <p>Du weißt vermutlich seit Monaten, dass dein Lead-Formular zu kompliziert ist. Du weißt, dass deine Webseite langsam ist. Du weißt, dass du eigentlich mal ein Follow-up-System bräuchtest.</p>
         <p>Aber zwischen Wissen und Tun liegen die wichtigsten 30 Tage deiner nächsten 12 Monate.</p>
         <p>Mein Vorschlag — und das ist die einfachste Hausaufgabe, die du diese Woche bekommen wirst:</p>
         <p><strong>Such dir EINE Sache aus der Profi-Checkliste in der PDF aus. Und setz sie diese Woche um.</strong></p>
         <p>Nicht alle 30 Punkte. <strong>Einen.</strong></p>
         <p>Wenn du danach einen zweiten machst, super. Wenn du nach dem ersten merkst, dass du Hilfe brauchst — <a href="${BOOK_LINK}">meld dich für ein 15-Min-Gespräch</a>.</p>`,
        "Bis Tag 10,",
      ),
  },
  {
    day: 10,
    subject: "Falls du dich fragst, wie wir konkret arbeiten würden",
    preview: "Kein Verkauf, nur Transparenz — damit du eine bessere Entscheidung treffen kannst.",
    htmlBody: ({ firstName }) =>
      mailFrame(
        firstName,
        `Vielleicht hast du in den letzten Mails schon herausgehört, wie ich denke. Heute will ich dir noch zeigen, wie ich konkret <strong>arbeite</strong>.`,
        `<p><strong>Mein Setup ist einfach:</strong></p>
         <ol>
           <li><strong>Erstgespräch (15 Min, kostenfrei).</strong> Du erzählst, wo du stehst. Ich frage konkret nach. Am Ende sagen wir beide entweder „ja, lass uns mal" oder „nein, passt grad nicht".</li>
           <li><strong>Strategie-Gespräch (60 Min).</strong> Wenn passt: ich bereite einen individuellen Plan auf. Du siehst, wo ich die Hebel sehe, was die Schritte sind, was es kosten würde.</li>
           <li><strong>Umsetzung (3 Monate Mindestlaufzeit).</strong> Wir starten meist mit einer Säule (Meta Ads ODER Google Ads ODER Webseite + KI-Sichtbarkeit). Du bringst 1.000 € Werbebudget pro Monat mit. Mein Honorar: 1.500 € pro Monat.</li>
           <li><strong>Ergebnis-Garantie.</strong> Wenn wir die vereinbarten Ziele nicht in 3 Monaten erreichen, arbeiten wir ohne Mehrkosten weiter.</li>
         </ol>
         <p>Das ist alles. Keine Tricks. Keine Mindestlaufzeit von 12 Monaten. Keine Zusatzgebühren.</p>
         <p>Wenn das nach was klingt, mit dem du arbeiten könntest, buch direkt ein Erstgespräch:</p>
         <p><a href="${BOOK_LINK}"><strong>15-Min-Erstgespräch buchen →</strong></a></p>
         <p>Falls nicht — auch okay. Lies meinen Blog mit, behalte die PDF im Hinterkopf, und wenn du in 6 Monaten so weit bist, ist die Tür immer noch offen.</p>`,
        "",
      ),
  },
  {
    day: 14,
    subject: "2 Wochen — was hast du gelernt?",
    preview: "Ich frage dich nicht, ob du kaufst. Ich frage dich was anderes.",
    htmlBody: ({ firstName }) =>
      mailFrame(
        firstName,
        `Das ist die letzte Mail dieser Sequenz. Versprochen.`,
        `<p>Ich frage dich nicht, ob du mit mir arbeiten willst. Das entscheidest du selbst.</p>
         <p>Was ich dich aber frage: <strong>was hast du in den letzten 2 Wochen über dein eigenes Marketing gelernt?</strong></p>
         <p>Wenn du am Anfang der PDF stehst und sie ehrlich durchgehst, fällt vielen das Gleiche auf: <em>„Wir wissen mehr über unser Marketing, als wir gedacht haben — wir haben es nur nicht aufgeschrieben."</em></p>
         <p>Das ist der erste echte Schritt. Nicht die nächste Werbeanzeige. Nicht das nächste Tool. Sondern: <strong>schreib es auf.</strong></p>
         <p>Wenn du Lust hast, antworte mir kurz auf diese Mail mit deinem <strong>einen</strong> Hebel für die nächsten 30 Tage. Ich lese jede Antwort persönlich.</p>
         <p>Und falls wir auf dem Weg eine Frage haben — ruf mich an, schreib mir auf WhatsApp, oder buch ein Gespräch:</p>
         <ul>
           <li><a href="${WHATSAPP_LINK}">WhatsApp: +49 176 227 87 559</a></li>
           <li><a href="${BOOK_LINK}">15-Min-Erstgespräch (TidyCal)</a></li>
           <li><a href="mailto:info@wohlstandsmarketing.de">info@wohlstandsmarketing.de</a></li>
         </ul>
         <p>Bleib dran. Und mach <strong>eine</strong> Sache pro Woche besser. Mehr braucht es nicht.</p>`,
        "",
      ),
  },
];

export async function GET(req: Request) {
  // Auth: Vercel-Cron schickt CRON_SECRET als Bearer-Token
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey || !audienceId) {
    return Response.json(
      { ok: false, reason: "missing_env" },
      { status: 503 }
    );
  }

  // 1) Audience-Contacts holen
  const listRes = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  if (!listRes.ok) {
    return Response.json(
      { ok: false, reason: "list_failed", detail: await listRes.text() },
      { status: 500 }
    );
  }
  const list = (await listRes.json()) as { data: ResendContact[] };
  const contacts = list.data ?? [];

  const now = Date.now();
  const sent: Array<{ email: string; day: number; status: number }> = [];

  for (const c of contacts) {
    if (c.unsubscribed) continue;
    if (!c.created_at) continue;
    const elapsedDays = Math.floor(
      (now - new Date(c.created_at).getTime()) / 86_400_000
    );
    const drip = DRIP.find((d) => d.day === elapsedDays);
    if (!drip) continue;

    const firstName = (c.first_name || "").trim() || "Hallo";
    const html = drip.htmlBody({ firstName });
    // Idempotency-Key sorgt dafür, dass Resend die gleiche Step-Mail an
    // dieselbe E-Mail nicht doppelt versendet (Server-seitige Dedup).
    const idempotencyKey = `lm-drip-${drip.day}-${c.email.toLowerCase()}`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: `Albert von Wohlstandsmarketing <${fromEmail}>`,
        to: [c.email],
        reply_to: "info@wohlstandsmarketing.de",
        subject: drip.subject,
        html,
        tags: [
          { name: "funnel", value: "lead-magnet" },
          { name: "step", value: `day-${drip.day}` },
        ],
      }),
    });
    sent.push({ email: c.email, day: drip.day, status: r.status });
  }

  return Response.json({
    ok: true,
    checked: contacts.length,
    sent: sent.length,
    details: sent,
  });
}

/* ─── Mail-Frame: einheitliches HTML-Layout für alle Drip-Mails ─────────── */
function mailFrame(
  firstName: string,
  opener: string,
  body: string,
  signOff: string,
  postscript: string = ""
) {
  return `<!DOCTYPE html>
<html lang="de"><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e4e7;border-radius:24px;overflow:hidden">
      <tr><td style="padding:32px 32px 0 32px">
        <table role="presentation" width="100%"><tr>
          <td style="vertical-align:middle">
            <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:#1663de;color:#fff;font-weight:900;font-size:22px;text-align:center;line-height:40px;position:relative">W<span style="position:absolute;right:5px;bottom:5px;width:7px;height:7px;border-radius:50%;background:#db6f16"></span></div>
          </td>
          <td style="vertical-align:middle;padding-left:10px;font-weight:700;font-size:15px">Wohlstandsmarketing</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:24px 32px 0 32px">
        <p style="margin:0;font-size:15px;line-height:1.6;color:#27272a">Hi ${escapeHtml(firstName)},</p>
        <p style="margin:18px 0 0 0;font-size:15px;line-height:1.6;color:#27272a">${opener}</p>
        <div style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:#27272a">${body}</div>
        ${signOff ? `<p style="margin:24px 0 0 0;font-size:15px;line-height:1.6;color:#27272a">${escapeHtml(signOff)}<br/><strong>Albert</strong></p>` : `<p style="margin:24px 0 0 0;font-size:15px;line-height:1.6;color:#27272a"><strong>Albert</strong></p>`}
        ${postscript ? `<p style="margin:16px 0 0 0;font-size:14px;line-height:1.55;color:#52525b">${postscript}</p>` : ""}
      </td></tr>
      <tr><td style="padding:28px 32px 32px 32px">
        <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0 16px 0"/>
        <p style="margin:0;color:#a1a1aa;font-size:11px;line-height:1.5">Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de<br/>Du erhältst diese Mail, weil du die PDF auf wohlstandsmarketing.de angefordert hast.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
