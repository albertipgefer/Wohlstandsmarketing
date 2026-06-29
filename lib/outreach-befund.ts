/**
 * Befund-Mail nach positiver Antwort: kurze, personalisierte Analyse aus den
 * gespeicherten Anreicherungs-Fakten (bucket/signal_fact/strength). Liefert den
 * versprochenen Mehrwert und bietet als naechsten Schritt ein kurzes Telefonat an.
 *
 * Prosa wird ohne Link und ohne Bindestrich erzeugt (Stilregel); der TidyCal-Link
 * und die Signatur werden deterministisch angehaengt (Link bleibt unveraendert).
 */
import { claudeText } from "@/lib/llm";
import type { Prospect } from "@/lib/outreach-db";
import type { InlineButton } from "@/lib/telegram";

const TERMIN = "https://tidycal.com/albertipgefer/kostenloses-strategiegespraech-immobilienbranch-30min";

const escHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Inline-Buttons für den Freigabe-Loop (Callback-Format wird im Webhook geparst). */
export function befundButtons(id: string): InlineButton[][] {
  return [[
    { text: "✅ Genehmigen", callback_data: `oappr:${id}` },
    { text: "✏️ Anpassen", callback_data: `orev:${id}` },
    { text: "🗑 Ablehnen", callback_data: `orej:${id}` },
  ]];
}

/** Telegram-Vorschautext des Entwurfs. */
export function befundPreview(company: string, subject: string, body: string): string {
  return (
    `📝 <b>Befund-Entwurf</b> für ${escHtml(company)}\n\n` +
    `<b>Betreff:</b> ${escHtml(subject)}\n\n` +
    `${escHtml(body).slice(0, 3200)}\n\n` +
    `Genehmigen, anpassen oder ablehnen?`
  );
}

/** Entfernt Binde- und Gedankenstriche aus der Prosa (Stilregel). */
function stripDashes(s: string): string {
  return s.replace(/[\-‐‑‒–—−]/g, " ").replace(/[ \t]{2,}/g, " ").replace(/ +\n/g, "\n").trim();
}

function greeting(p: Partial<Prospect>): string {
  return p.salutation ? `Hallo ${p.salutation},` : "Guten Tag,";
}

function ctaBlock(): string {
  return (
    `\n\nWollen wir gemeinsam in einem kostenlosen Strategiegespräch über Ihre Website schauen? ` +
    `In rund 30 Minuten zeige ich Ihnen konkret, wo Ihnen verkaufsbereite Eigentümer entgehen ` +
    `und wie Sie diese früher erreichen. Sie nehmen auf jeden Fall ein paar sofort umsetzbare Ansätze mit.\n` +
    `Hier können Sie direkt einen Termin wählen: ${TERMIN}\n` +
    `Oder schreiben Sie mir einfach eine Nummer, dann melde ich mich bei Ihnen.\n\n` +
    `Beste Grüße\nAlbert Ipgefer, Wohlstandsmarketing`
  );
}

function templateProse(p: Partial<Prospect>): string {
  const fact = p.signal_fact || "Der entscheidende Punkt liegt bei Ihrer Sichtbarkeit für Eigentümer, die verkaufen wollen.";
  return (
    `${greeting(p)}\n\n` +
    `danke für Ihre Rückmeldung. Hier kurz, was mir aufgefallen ist.\n\n` +
    `${fact}\n\n` +
    `Das klingt klein, kostet aber genau die Anfragen, die Sie eigentlich wollen. ` +
    `Eigentümer vergleichen kurz, entscheiden sich still für einen anderen, und Sie erfahren nie davon. ` +
    `Genau das lässt sich sauber lösen.`
  );
}

export async function buildBefund(
  p: Partial<Prospect>,
  replyText: string,
  revisionNotes?: string,
): Promise<{ subject: string; body: string }> {
  const subjectBase = (p.mail1_subject || "Ihre Anfrage").replace(/^re:\s*/i, "");
  const subject = `Re: ${subjectBase}`;

  const prompt =
    `Schreibe die KURZE, persoenliche Befund-Mail (Antwort auf eine positive Cold-Mail-Antwort) fuer Albert Ipgefer.\n\n` +
    `Fakten ueber den Empfaenger (NUR diese verwenden, nichts erfinden):\n` +
    `- Anrede: ${p.salutation || "unbekannt"}\n` +
    `- Firma: ${p.company || "unbekannt"} | Ort: ${p.city || "unbekannt"}\n` +
    `- Staerke (aus seiner Website): ${p.strength || "etablierter Immobilienmakler"}\n` +
    `- Konkreter Befund: ${p.signal_fact || "Schwerpunkt ist die Sichtbarkeit fuer verkaufsbereite Eigentuemer."}\n` +
    `- Seine Antwort war: "${(replyText || "").slice(0, 300)}"\n\n` +
    (revisionNotes ? `WICHTIG, passe den Entwurf nach diesem Wunsch von Albert an: "${revisionNotes}"\n\n` : "") +
    `Regeln: Deutsch, echte Umlaute, Anrede Sie. Beginne mit der Anrede. Kurz danken, dann den Befund konkret machen, dann die Konsequenz (lautlos verlorene Verkaeufer-Mandate). ` +
    `Hoechstens 130 Woerter. KEIN Link, KEINE URL, KEINE Signatur, KEINEN Terminhinweis (das haenge ich selbst an). ` +
    `ABSOLUT VERBOTEN: jedes Minus und jeder Binde- oder Gedankenstrich. Keine Emojis, keine Floskeln. Klinge wie ein Mensch.\n\n` +
    `Gib nur den Mailtext zurueck, ohne Anfuehrungszeichen.`;

  const llm = await claudeText(prompt, { maxTokens: 500 });
  const prose = stripDashes(llm && llm.length > 40 ? llm : templateProse(p));
  return { subject, body: prose + ctaBlock() };
}
