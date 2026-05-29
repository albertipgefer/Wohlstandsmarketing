/**
 * GET /api/cron/lead-magnet-drip
 *
 * Vercel-Cron-Job für die 7-Mail-Drip-Sequenz V2 (Baulig-Stil, Mittelstand-
 * generisch, ohne Branchenbezug, ohne Werbeanzeigen-Erwähnung).
 *
 * Schedule: 09:00 UTC täglich (siehe vercel.json).
 *
 * Logik pro Contact in der Audience:
 *   - berechne ganze Tage seit `created_at`
 *   - wenn elapsedDays in [1, 3, 5, 7, 10, 14] → schick passende Mail
 *   - Dedup: Resend Idempotency-Key per (step, email)
 *
 * Auth: Header `Authorization: Bearer ${CRON_SECRET}` (von Vercel-Cron gesetzt).
 *
 * Required ENV:
 *   RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_AUDIENCE_ID, CRON_SECRET
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://wohlstandsmarketing.de";
const BOOK_LINK =
  "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";

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
  htmlBody: (vars: { firstName: string }) => string;
}

const DRIP: DripMail[] = [
  {
    day: 1,
    subject: "2026 wird brutal für alle, die so weitermachen wie bisher",
    preview: "Eine unbequeme Wahrheit über deinen Online-Auftritt.",
    htmlBody: ({ firstName }) =>
      frame({
        firstName,
        opener: `diese Mail ist für dich, wenn du wissen willst, warum dein Online-Auftritt 2026 nicht mehr funktioniert.`,
        body: `
<p>Wir sehen es jeden Tag bei mittelständischen Unternehmen, die zu uns kommen.</p>
<p>Sie haben eine Webseite.</p>
<p>Sie sind „bei Google" gelistet.</p>
<p>Sie posten ab und zu auf LinkedIn oder Instagram.</p>
<p>Und trotzdem kommen kaum Anfragen rein — und wenn, dann nicht die, die wirklich Geld bringen.</p>
<p>Vielleicht kennst du das ja auch:</p>
<p>Du hast in deinen Auftritt schon mehrfach investiert.</p>
<p>Du weißt, dass „irgendwas im Online-Marketing nicht stimmt".</p>
<p>Aber du kannst nicht greifen, was es ist.</p>
<p>Und jeden Monat fragst du dich, ob nächsten Monat wieder genug reinkommt.</p>
<p><strong>Die Wahrheit ist:</strong></p>
<p>Du machst Marketing nach den Regeln von 2018. Aber wir sind in 2026.</p>
<p>Und 2026 entscheidet <strong>eine einzige Sache</strong> darüber, ob ein mittelständisches Unternehmen gefunden wird oder nicht:</p>
<p><strong>Ob es von ChatGPT, Perplexity und Google AI Overviews empfohlen wird.</strong></p>
<p>Schon heute starten 30 bis 40 % aller B2B-Recherchen nicht mehr auf Google — sondern in einer KI.</p>
<p>Google zeigt dir 10 Links. ChatGPT zeigt dir <strong>eine Empfehlung</strong>.</p>
<p>Wer dort nicht genannt wird, existiert für diesen Nutzer schlicht nicht.</p>
<p>Während du diese Mail liest, bauen drei deiner Wettbewerber genau das.</p>
<p>Wenn du wissen willst, wie du jetzt nachziehen kannst, lies in den nächsten Tagen meine Mails mit.</p>
<p>Und wenn du nicht warten willst:</p>`,
        cta: { label: "Kostenloses 15-Min-Erstgespräch sichern →", href: BOOK_LINK },
        signoff: "Bis morgen,",
      }),
  },
  {
    day: 3,
    subject: "Warum dein Online-Auftritt aktuell keine Anfragen bringt",
    preview: "Drei Gründe, die sich jeder Mittelständler stellen sollte.",
    htmlBody: ({ firstName }) =>
      frame({
        firstName,
        opener: `eine der häufigsten Aussagen, die ich von mittelständischen Unternehmern höre:`,
        body: `
<p><em>„Unsere Webseite ist eigentlich okay — wir kriegen halt einfach zu wenige Anfragen."</em></p>
<p>Und meine Antwort ist immer dieselbe:</p>
<p>Wenn du zu wenige Anfragen bekommst, dann ist deine Webseite eben nicht okay. Sie ist das größte Problem in deinem Online-Auftritt.</p>
<p><strong>Grund 1: Deine Webseite spricht von dir, nicht von deinem Kunden.</strong></p>
<p>„Über uns" — „Unsere Leistungen" — „Unser Team". Aber dein Kunde will lesen, dass du sein Problem verstehst — und löst.</p>
<p><strong>Grund 2: Deine Webseite ist auf Google gebaut, nicht auf KI.</strong></p>
<p>Schema-Auszeichnung, Quotability für ChatGPT, AEO-Content — Fehlanzeige. Selbst wenn du bei Google rankst, empfehlen die KI-Suchmaschinen deinen Wettbewerber.</p>
<p><strong>Grund 3: Deine Webseite hat keinen Lead-Pfad für 95 % deiner Besucher.</strong></p>
<p>Nur „Kontakt" und „Termin buchen" — zu hohe Hürde. Von 100 Besuchern sind 2 bis 5 sofort kaufbereit. Die restlichen 95 verlierst du.</p>
<p>Was du brauchst, ist ein neuer Auftritt, der:</p>
<ul>
  <li>vom ersten Satz an den Kunden spricht,</li>
  <li>für KI verständlich gebaut ist,</li>
  <li>und mehrere Conversion-Pfade hat.</li>
</ul>
<p>Genau das ist die <strong>WSM-Methode</strong>.</p>
<p>Ich gehe in den nächsten Mails noch tiefer rein. Wenn du nicht warten willst:</p>`,
        cta: { label: "Kostenloses 15-Min-Erstgespräch sichern →", href: BOOK_LINK },
        signoff: "Bis übermorgen,",
      }),
  },
  {
    day: 5,
    subject: "Warum dein Monatsumsatz nicht planbar ist",
    preview: "Der eine Grund, an dem 9 von 10 Mittelständlern scheitern.",
    htmlBody: ({ firstName }) =>
      frame({
        firstName,
        opener: `hast du auch die Schnauze voll davon, dass dein Monatsumsatz schwankt?`,
        body: `
<p>Du hast Wochen, in denen 5 Anfragen reinkommen.</p>
<p>Und dann wieder Wochen, in denen einfach nichts passiert.</p>
<p>Du kannst nicht planen. Du kannst nicht investieren. Du kannst keine neuen Mitarbeiter einstellen.</p>
<p>Weil du nie weißt, was der nächste Monat bringt.</p>
<p>Vielleicht hast du in so einer Situation auch schon gedacht:</p>
<p><em>„Wir brauchen einfach mehr Empfehlungen. Wir brauchen mehr Bestandskunden. Wir brauchen mehr Sichtbarkeit."</em></p>
<p>Aber Empfehlungen sind nicht planbar. Bestandskunden sind ein Bonus, kein System. Und „mehr Sichtbarkeit" hat dir niemand erklärt, was das konkret heißt.</p>
<p><strong>Die Wahrheit ist:</strong></p>
<p>Im Mittelstand wird Umsatz <strong>nur dann planbar</strong>, wenn du einen verlässlichen Kanal hast, der dir konstant qualifizierte Anfragen liefert.</p>
<p>Und das funktioniert heute nur noch über <strong>zwei Hebel gleichzeitig</strong>:</p>
<p><strong>1.</strong> Ein neuer Online-Auftritt, der vom ersten Wort an den Kunden anspricht und konvertiert.</p>
<p><strong>2.</strong> KI-Sichtbarkeit, sodass ChatGPT, Perplexity, Claude und Google AI Overviews dich als erste Wahl empfehlen.</p>
<p>Wer nur eines von beiden hat, hat ein halbes System. Wer beides hat, hat ein <strong>planbares System</strong>.</p>
<p>Genau das setze ich für mittelständische Unternehmen um. Und genau das schauen wir uns auch in deinem Erstgespräch an:</p>`,
        cta: { label: "Kostenloses 15-Min-Erstgespräch sichern →", href: BOOK_LINK },
        signoff: "Bis übermorgen,",
      }),
  },
  {
    day: 7,
    subject: "Warum 95 % der Mittelständler den größten Trend 2026 verschlafen",
    preview: "Und wie du zu den 5 % gehörst, die in 24 Monaten dominieren.",
    htmlBody: ({ firstName }) =>
      frame({
        firstName,
        opener: `ich erzähle dir heute, was ich in den letzten 12 Monaten in fast jedem Erstgespräch sehe:`,
        body: `
<p>95 % der mittelständischen Unternehmer, mit denen ich spreche, haben <strong>noch nie</strong> darüber nachgedacht, wie sie von ChatGPT empfohlen werden.</p>
<p>Sie wissen nicht einmal, dass es einen Unterschied zwischen Google-SEO und KI-Sichtbarkeit gibt.</p>
<p>Und genau das ist die größte Chance, die du gerade hast.</p>
<p>Stell dir folgendes Szenario vor:</p>
<p>Ein Geschäftsführer aus deiner Region öffnet ChatGPT. Er tippt ein: <em>„Wer ist der beste [dein Angebot] in [deine Region]?"</em></p>
<p>ChatGPT antwortet mit <strong>einer</strong> Empfehlung.</p>
<p>Aktuell ist die Wahrscheinlichkeit, dass das dein Unternehmen ist: nahe null.</p>
<p>Aber in 24 Monaten wird genau diese Suche die häufigste B2B-Suche sein, die es gibt.</p>
<p>Wer <strong>jetzt</strong> richtig positioniert, ist dann nicht mehr „einer von vielen" — sondern <strong>der Anbieter</strong> in seiner Region.</p>
<p>Genau das ist der Unterschied zwischen Unternehmen, die in den nächsten 36 Monaten stagnieren — und denen, die sich verdoppeln oder verdreifachen.</p>
<p>Wenn du wissen willst, wie das konkret für dich funktioniert, dann komm in ein Erstgespräch:</p>`,
        cta: { label: "Kostenloses 15-Min-Erstgespräch sichern →", href: BOOK_LINK },
        signoff: "Bis Tag 10,",
      }),
  },
  {
    day: 10,
    subject: "So arbeiten wir konkret — keine Tricks",
    preview: "Vier Schritte. Keine Mindestlaufzeit von 12 Monaten. Keine Zusatzgebühren.",
    htmlBody: ({ firstName }) =>
      frame({
        firstName,
        opener: `vielleicht hast du in den letzten Mails schon herausgehört, wie ich denke. Heute will ich dir zeigen, wie ich konkret <strong>arbeite</strong>.`,
        body: `
<p><strong>Mein Setup ist einfach:</strong></p>
<p><strong>Schritt 1 — Erstgespräch (15 Min, kostenfrei).</strong> Du erzählst, wo du stehst. Ich frage konkret nach. Am Ende sagen wir beide entweder „ja, lass uns mal" oder „nein, passt grad nicht".</p>
<p><strong>Schritt 2 — Strategie-Gespräch (60 Min).</strong> Wenn es passt: ich bereite einen individuellen Plan für dich auf. Du gehst raus mit einem klaren Plan — ob mit oder ohne mich.</p>
<p><strong>Schritt 3 — Umsetzung (3 Monate Mindestlaufzeit).</strong> Wir bauen dir einen neuen Online-Auftritt nach der WSM-Methode. Ergebnis: Ein Auftritt, der vom ersten Wort an deinen Kunden anspricht. KI-Sichtbarkeit, sodass ChatGPT, Perplexity, Claude und Google AI Overviews dich empfehlen. Und ein planbares System für neue Anfragen.</p>
<p><strong>Schritt 4 — Laufende Betreuung.</strong> Wir optimieren kontinuierlich. Du hast einen festen Ansprechpartner — mich.</p>
<p>Keine Mindestlaufzeit von 12 Monaten. Keine versteckten Zusatzgebühren. Keine Verkaufs-Tricks.</p>
<p>Wenn das nach was klingt, mit dem du arbeiten könntest:</p>`,
        cta: { label: "Kostenloses 15-Min-Erstgespräch sichern →", href: BOOK_LINK },
        signoff: "Bis bald,",
        ps: `Wer wirklich verstehen will, wie die WSM-Methode bei seinem Unternehmen aussehen würde, kommt nicht drum herum, mit mir gesprochen zu haben. In der Mail kann ich dir nicht zeigen, wie ich live deinen Auftritt analysiere — im Erstgespräch schon.`,
      }),
  },
  {
    day: 14,
    subject: "Eine letzte Sache",
    preview: "Du wirst diese Mail nicht mehr lesen — falls du nicht jetzt handelst.",
    htmlBody: ({ firstName }) =>
      frame({
        firstName,
        opener: `das ist die letzte Mail dieser Sequenz.`,
        body: `
<p>Ich frage dich nicht, ob du mit mir arbeiten willst — das entscheidest du selbst.</p>
<p>Aber ich will dich auf eine Sache hinweisen, die in den letzten zwei Wochen vielleicht untergegangen ist:</p>
<p><strong>Du hast vor 14 Tagen die PDF heruntergeladen.</strong></p>
<p>Hand aufs Herz: hast du <strong>eine einzige Sache</strong> in deinem Online-Marketing wirklich verändert?</p>
<p>Falls ja: respektiere ich. Mach weiter.</p>
<p>Falls nein: dann ist es genau wie bei den meisten anderen.</p>
<p>Du hast die PDF gelesen. Du hast genickt. Du hast dir gesagt „das sollte ich mal angehen". Und dann ist der Alltag dazwischen gekommen.</p>
<p>Das ist nicht deine Schuld. Das ist menschlich.</p>
<p>Aber genau das ist der Unterschied zwischen Unternehmen, die in den nächsten 36 Monaten stagnieren — und denen, die ihre Marktposition verdoppeln.</p>
<p>Die einen lesen. Die anderen handeln.</p>
<p>Wenn du zu den Handelnden gehören willst, dann gibt es genau einen Schritt für dich heute:</p>`,
        cta: { label: "Jetzt kostenloses Erstgespräch sichern →", href: BOOK_LINK },
        signoff: "Bis dann,",
        ps: `Wer in 24 Monaten von ChatGPT als erste Wahl in seiner Region empfohlen werden will, muss heute anfangen. Nicht morgen. Nicht nächste Woche. Heute.`,
      }),
  },
];

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey || !audienceId) {
    return Response.json({ ok: false, reason: "missing_env" }, { status: 503 });
  }

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

  // catchup=1 (nur mit gültigem CRON_SECRET): sendet pro Contact die HÖCHSTE
  // fällige Stufe (day <= elapsedDays) — holt Bestandskontakte / verpasste
  // Läufe einmalig nach. Default (Vercel-Cron) bleibt exakter Tages-Match,
  // damit im Normalbetrieb pro Stufe genau eine Mail rausgeht (kein Spam).
  const params = new URL(req.url).searchParams;
  const catchup = params.get("catchup") === "1";
  const dryrun = params.get("dryrun") === "1";
  // Optional: Versand auf eine einzige E-Mail beschränken (gezielter Test)
  const only = (params.get("only") || "").trim().toLowerCase();

  const now = Date.now();
  const sent: Array<{ email: string; day: number; status: number }> = [];
  const diag: Array<{
    email: string;
    created_at: string;
    elapsedDays: number;
    matchedDay: number | null;
    unsubscribed: boolean;
  }> = [];

  for (const c of contacts) {
    const elapsedDays = c.created_at
      ? Math.floor((now - new Date(c.created_at).getTime()) / 86_400_000)
      : -1;

    const drip =
      c.unsubscribed || elapsedDays < 0
        ? undefined
        : catchup
          ? [...DRIP].reverse().find((d) => d.day <= elapsedDays)
          : DRIP.find((d) => d.day === elapsedDays);

    diag.push({
      email: c.email,
      created_at: c.created_at,
      elapsedDays,
      matchedDay: drip?.day ?? null,
      unsubscribed: !!c.unsubscribed,
    });

    if (!drip) continue;
    // Versand auf eine Adresse beschränken, falls only= gesetzt
    if (only && c.email.toLowerCase() !== only) continue;
    // Dry-Run: nur diagnostizieren, keine Mail senden
    if (dryrun) {
      sent.push({ email: c.email, day: drip.day, status: 0 });
      continue;
    }

    const firstName = (c.first_name || "").trim() || "Hallo";
    const idempotencyKey = `lm-drip-${drip.day}-${c.email.toLowerCase()}`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: `Albert Ipgefer <${fromEmail}>`,
        to: [c.email],
        reply_to: "info@wohlstandsmarketing.de",
        subject: drip.subject,
        html: drip.htmlBody({ firstName }),
        tags: [
          { name: "funnel", value: "lead-magnet" },
          { name: "step", value: `day-${drip.day}` },
        ],
      }),
    });
    sent.push({ email: c.email, day: drip.day, status: r.status });
    // Resend-Rate-Limit (2 Requests/Sek) respektieren — kleiner Abstand zwischen Sends
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  return Response.json({
    ok: true,
    mode: dryrun ? "dryrun" : catchup ? "catchup" : "daily",
    fromEmail,
    checked: contacts.length,
    sent: sent.length,
    sentDetails: sent,
    contacts: diag,
  });
}

/* ─── Einheitlicher Mail-Frame im Baulig-Stil ─────────────────────────── */
function frame({
  firstName,
  opener,
  body,
  cta,
  signoff,
  ps,
}: {
  firstName: string;
  opener: string;
  body: string;
  cta: { label: string; href: string };
  signoff: string;
  ps?: string;
}) {
  return `<!DOCTYPE html>
<html lang="de"><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e4e7;border-radius:24px;overflow:hidden">
      <tr><td style="padding:32px 36px 0 36px">
        <table role="presentation" width="100%"><tr>
          <td style="vertical-align:middle">
            <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:#1663de;color:#fff;font-weight:900;font-size:22px;text-align:center;line-height:40px;position:relative">W<span style="position:absolute;right:5px;bottom:5px;width:7px;height:7px;border-radius:50%;background:#db6f16"></span></div>
          </td>
          <td style="vertical-align:middle;padding-left:10px;font-weight:700;font-size:15px">Wohlstandsmarketing</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:24px 36px 0 36px">
        <p style="margin:0;font-size:15px;line-height:1.6;color:#27272a">Hey ${escapeHtml(firstName)},</p>
        <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:#27272a">${opener}</p>
        <div style="margin:6px 0 0 0;font-size:15px;line-height:1.6;color:#27272a">${body}</div>
      </td></tr>
      <tr><td style="padding:8px 36px 0 36px">
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0 8px 0"><tr><td>
          <a href="${cta.href}" target="_blank" style="display:inline-block;background:#0a0a0a;color:#ffffff !important;text-decoration:none;padding:16px 30px;border-radius:999px;font-weight:700;font-size:15px;">${escapeHtml(cta.label)}</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:18px 36px 0 36px">
        ${signoff ? `<p style="margin:0;font-size:15px;line-height:1.6;color:#27272a">${escapeHtml(signoff)}<br/>Dein <strong>Albert</strong></p>` : `<p style="margin:0;font-size:15px;line-height:1.6;color:#27272a">Dein <strong>Albert</strong></p>`}
        ${ps ? `<p style="margin:18px 0 0 0;font-size:14px;line-height:1.55;color:#52525b"><strong>PS:</strong> ${ps}</p>` : ""}
      </td></tr>
      <tr><td style="padding:28px 36px 32px 36px">
        <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0 16px 0"/>
        <p style="margin:0;color:#a1a1aa;font-size:11px;line-height:1.55">Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de<br/>Du erhältst diese Mail, weil du den Newsletter auf wohlstandsmarketing.de abonniert hast. Resend fügt einen Abmelde-Link automatisch hinzu.</p>
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
