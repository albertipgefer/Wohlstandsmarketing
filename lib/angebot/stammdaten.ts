/**
 * Anbieter-Stammdaten für den internen Angebots-Generator (/angebot).
 * Single Source of Truth — bei Änderung (IBAN, Adresse …) nur hier anpassen.
 * Quelle: Sales/Templates/angebot-template.html + bestehende Angebote.
 */
export const ANBIETER = {
  name: "Albert Ipgefer",
  firma: "Wohlstandsmarketing",
  strasse: "Vor der Loos 4e",
  plzOrt: "56130 Bad Ems",
  land: "Deutschland",
  steuernummer: "30/075/43765",
  ustIdNr: "DE364378389",
  email: "info@wohlstandsmarketing.de",
  telefon: "+49 176 227 87 559",
  website: "wohlstandsmarketing.de",
  iban: "DE75 1001 1001 2283 0827 11",
  bic: "NTSB DE B1XXX",
  kontoinhaber: "Albert Ipgefer",
} as const;

export const UST_SATZ = 19;

/** Vorbelegte Standard-Bedingungen (eine Zeile = ein Punkt, editierbar). */
export const STANDARD_BEDINGUNGEN = [
  "Mit Annahme dieses Angebots gelten die hier festgehaltenen Bedingungen. Es gilt das Recht der Bundesrepublik Deutschland.",
  "Bild- & Videomaterial sowie alle benötigten Inhalte sind durch den Auftraggeber zeitnah bereitzustellen.",
  "Bei verspäteter Inhaltslieferung durch den Auftraggeber verschiebt sich die vereinbarte Deadline entsprechend.",
  "Änderungen am Leistungsumfang werden gesondert abgestimmt und abgerechnet.",
  "Alle Absprachen und Änderungswünsche erfolgen schriftlich (WhatsApp oder E-Mail).",
  "Der Auftraggeber stellt sicher, dass alle bereitgestellten Inhalte rechtlich unbedenklich sind (z. B. Bildrechte, Impressum, Datenschutz) — der Auftragnehmer übernimmt hierfür keine Haftung.",
  "Domain- und Tool-Lizenzen werden vom Auftraggeber getragen.",
];

/** Vorbelegte Anmerkungen / Zahlungshinweise (editierbar). */
export const STANDARD_ANMERKUNGEN =
  "Zahlung per Überweisung auf das unten angegebene Konto. Einmalige Leistungen: 50 % bei Auftragserteilung, 50 % nach Live-Schaltung. Laufende Leistungen: monatlich im Voraus.";
