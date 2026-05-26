// Datenstrukturen für den KI-Sichtbarkeits-Check.
// Bewusst klein gehalten — Result wird im In-Memory-Cache (24h) gespeichert.

export type CheckStatus = "pass" | "warn" | "fail";

export interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string; // 1-Satz, was wir gefunden haben
  fix?: string; // Was der User tun soll, wenn nicht pass
}

export interface PillarResult {
  id: "crawler" | "schema" | "seo" | "performance";
  title: string;
  score: number; // 0–25
  status: CheckStatus;
  summary: string;
  items: CheckItem[];
}

export interface UserAnswers {
  url: string;
  city?: string;
  goal?: "leads" | "lokal" | "ki" | "alle";
}

export interface KiCheckResult {
  id: string; // Result-Cache-Key
  inputUrl: string;
  normalizedUrl: string; // mit Protokoll, ohne Trailing-Slash
  fetchedAt: string; // ISO-Datum
  answers: UserAnswers;
  score: number; // 0–100
  scoreLabel: "kritisch" | "ausbaufaehig" | "solide" | "stark";
  pillars: PillarResult[];
  topRecommendations: Array<{ title: string; body: string }>;
  meta: {
    title: string | null;
    description: string | null;
  };
  reportEmailSent?: boolean;
}

export interface ReportRequest {
  resultId: string;
  email: string;
  consent: boolean;
}
