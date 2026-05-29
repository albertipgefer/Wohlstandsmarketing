# Lead-Magnet-Funnel — Alle Mail-Texte im Überblick

> **Status:** Entwurf zum Freigeben.
> **Stand:** Mit Double-Opt-In, DSGVO-konform, getrennt von Newsletter-Einwilligung.

---

## ÜBERSICHT — der komplette Funnel

```
1. User füllt Form aus (Vorname + E-Mail + Newsletter-Checkbox optional)
   │
   ▼
2. Mail A — Bestätigungs-Mail (sofort, IMMER, auch ohne Newsletter-Flag)
   "Bitte E-Mail bestätigen"  →  Button öffnet /api/lead-magnet/confirm?token=...
   │
   ▼
3. User klickt Bestätigen
   │
   ▼
4. Mail B — Welcome-Mail mit PDF (sofort nach Bestätigung)
   "Hier ist deine PDF"  →  Direkt-Download
   │
   ▼
5. WENN Newsletter-Checkbox = true:
   Audience-Push → Drip-Sequenz startet (Mail 1 nach 1 Tag, Mail 2 nach 3 Tagen, etc.)
   WENN Newsletter-Checkbox = false:
   Nur die PDF — keine weiteren Mails
```

---

## Mail A — Bestätigungs-Mail (Double-Opt-In)

**Geht an:** Jeden, der das Form ausfüllt — **bevor** irgendwas anderes passiert.
**Betreff:** Bitte bestätige deine E-Mail-Adresse
**Preview-Text:** Ein Klick noch, dann hast du die PDF.

---

**Betreff in der Inbox:** *Bitte bestätige deine E-Mail-Adresse*

Hi {{first_name}},

danke, dass du dir die PDF „Die 11 teuersten Marketing-Fehler im deutschen Mittelstand" geholt hast.

**Ein Schritt fehlt noch:** Bitte bestätige kurz, dass du diese Mail-Adresse wirklich bist. Damit niemand mit deiner E-Mail Schindluder treiben kann.

**[E-Mail jetzt bestätigen →]**

(Falls der Button nicht funktioniert, kopier diesen Link in den Browser: https://wohlstandsmarketing.de/api/lead-magnet/confirm?token=XXX)

Nach dem Klick bekommst du die PDF direkt in dein Postfach.

{{IF newsletter_opt_in}}
Außerdem hast du angegeben, dass du in den nächsten Wochen ein paar Mails mit Vertiefungen und konkreten Beispielen bekommen möchtest. Darauf freue ich mich.
{{ENDIF}}

Bis gleich,
**Albert Ipgefer**
Gründer · Wohlstandsmarketing

---

*Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de*
*Wenn du die PDF nicht angefordert hast, ignorier diese Mail einfach — ohne Bestätigung passiert nichts.*
*Der Bestätigungs-Link ist 7 Tage gültig.*

---

## Mail B — Welcome-Mail mit PDF (nach Bestätigung)

**Geht an:** Jeden, der den Bestätigungs-Link geklickt hat.
**Betreff:** Deine PDF: Die 11 teuersten Marketing-Fehler im Mittelstand
**Preview-Text:** Hier ist sie — plus mein Vorschlag, wie du sie liest.

---

**Betreff in der Inbox:** *Deine PDF: Die 11 teuersten Marketing-Fehler im Mittelstand*

Hi {{first_name}} — danke fürs Bestätigen.

Hier ist deine PDF: **„Die 11 teuersten Marketing-Fehler im deutschen Mittelstand"** — mit konkreter Lösung pro Fehler und einer 30-Tage-Profi-Checkliste am Ende.

**[PDF jetzt herunterladen →]**

(Falls der Button nicht funktioniert, hier der direkte Link: https://wohlstandsmarketing.de/lead-magnet/11-marketing-fehler-mittelstand.pdf)

**Mein Vorschlag:** Geh die 11 Fehler einmal in Ruhe durch — und unterstreich die, die dich persönlich treffen. Erfahrungsgemäß sind es 3 bis 5. Genau diese sind dein Hebel für die nächsten 30 Tage.

{{IF newsletter_opt_in}}
In den nächsten Tagen schicke ich dir noch ein paar weitere Mails mit Vertiefungen und konkreten Beispielen — du hast den Newsletter angekreuzt, daher kommen die. Abmelden geht jederzeit per Klick am Ende jeder Mail.

Falls du danach das Gefühl hast, dass wir gut zusammenpassen — buch dir gerne ein 15-Min-Erstgespräch:

**[Termin buchen — 15-Min, kostenfrei →]**
{{ELSE}}
Du bekommst keine weiteren Mails von mir, weil du den Newsletter nicht angekreuzt hast. Falls du das später doch noch willst, ist die PDF-Anmeldung jederzeit der Weg dahin.

Falls du Lust hast, direkt mit mir zu sprechen — buch gerne ein 15-Min-Erstgespräch:

**[Termin buchen — 15-Min, kostenfrei →]**
{{ENDIF}}

Bis gleich,
**Albert Ipgefer**
Gründer · Wohlstandsmarketing

---

*Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de*

---

## Mails 1–6 — Drip-Sequenz (nur wenn Newsletter-Opt-In = true)

Volltexte in `content/lead-magnet/sequence.md` und eingebaut in den Cron-Job (`app/api/cron/lead-magnet-drip/route.ts`). Kurz die Übersicht:

| Mail | Tag | Betreff | Conversion-Ziel |
|---|---|---|---|
| **1** | +1 | Welcher der 11 Fehler kostet dich am meisten? | Aktivierung: 1 Fehler aussuchen |
| **2** | +3 | Wie ein Caterer aus Bayern seine Anfragen verdoppelt hat | Mini-Case, Beweis durch Beispiel |
| **3** | +5 | Niemand spricht darüber — 2027 wird es alles entscheiden | Cross-Sell auf KI-Sichtbarkeits-Check |
| **4** | +7 | Eine Woche durch — wo stehst du? | Re-Engagement, Soft-CTA |
| **5** | +10 | Falls du dich fragst, wie wir konkret arbeiten | **Soft-Pitch**: Setup, Preise, Garantie transparent |
| **6** | +14 | 2 Wochen — was hast du gelernt? | Last-Touch, Reply-Trigger |

Jede Mail enthält:
- WSM-Branding-Header (Logo + Wordmark)
- Persönliche Anrede mit `{{first_name}}`
- Inhalt (siehe `sequence.md`)
- CTA (variiert: Soft → Hard)
- **Abmelde-Link** am Ende (DSGVO-Pflicht)
- Impressum-Snippet (DSGVO-Pflicht)

---

## DSGVO-Konformität — Checkliste

- [x] Double-Opt-In (Bestätigungs-Mail vor PDF)
- [x] Newsletter-Einwilligung **separat** von PDF-Anfrage (Checkbox optional)
- [x] **Klare Trennung** der Einwilligungs-Zwecke in den Mails
- [x] **Datenschutz-Hinweis** unter der Form (Link zu `/datenschutz`)
- [x] **Abmelde-Link** in jeder Newsletter-Mail (Resend macht das automatisch via List-Unsubscribe-Header)
- [x] **Impressum-Snippet** am Ende jeder Mail
- [x] **Token-Gültigkeit** 7 Tage (Security-Best-Practice)
- [x] **Newsletter-Einwilligung gültig bis Widerruf** — kein Ablauf

---

## Was du noch entscheiden kannst

1. **Tonfall in den Mails** — passt der „Du-Stil" so für dich, oder lieber „Sie"?
   *Mein Vorschlag: Du-Stil, weil dein ICP (Klein-Mittelstand 10–50 MA, inhabergeführt) das hört.*
2. **Mail-Frequenz** — aktuell Tag 1, 3, 5, 7, 10, 14. Zu viel? Zu wenig?
   *Mein Vorschlag: passt — 6 Mails in 2 Wochen ist Standard-Drip.*
3. **Soft-Pitch in Mail 5** (Setup + Preise transparent zeigen) — okay oder zu früh?
   *Mein Vorschlag: passt — wer bis Tag 10 dabei ist, ist warm.*
