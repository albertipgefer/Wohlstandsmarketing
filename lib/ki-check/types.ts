// Datenstrukturen für den erweiterten KI-Sichtbarkeits-Check.
// Multi-Page-Crawl mit Error-Aggregation und Per-Seite-Analyse.

export type CheckStatus = "pass" | "warn" | "fail";

export interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  fix?: string;
}

export interface PillarResult {
  id: "crawler" | "schema" | "seo" | "performance";
  title: string;
  score: number;
  status: CheckStatus;
  summary: string;
  items: CheckItem[];
}

export interface PageIssue {
  category: "title" | "description" | "h1" | "og" | "schema" | "canonical" | "alt";
  status: CheckStatus;
  message: string;
}

export interface PageReport {
  url: string;
  status: "ok" | "error" | "timeout";
  errorMessage?: string;
  /** Score 0–100 für diese Seite (nur wenn status=ok) */
  pageScore?: number;
  title?: string;
  metaDescription?: string;
  h1?: string;
  h1Count?: number;
  schemaTypes?: string[];
  hasOgImage?: boolean;
  hasCanonical?: boolean;
  imagesTotal?: number;
  imagesWithAlt?: number;
  /** Wenn PageSpeed gelaufen ist */
  performance?: number | null;
  issues: PageIssue[];
}

export interface CrawlError {
  context: string;
  message: string;
}

export interface UserAnswers {
  url: string;
  city?: string;
  goal?: "leads" | "lokal" | "ki" | "alle";
}

export interface KiCheckResult {
  id: string;
  inputUrl: string;
  normalizedUrl: string;
  fetchedAt: string;
  answers: UserAnswers;
  score: number;
  scoreLabel: "kritisch" | "ausbaufaehig" | "solide" | "stark";
  pillars: PillarResult[];
  topRecommendations: Array<{ title: string; body: string }>;
  meta: {
    title: string | null;
    description: string | null;
  };
  /** Multi-Page-Erweiterung */
  pages: PageReport[];
  stats: {
    pagesScanned: number;
    pagesOk: number;
    pagesFailed: number;
    totalCheckpoints: number;
    pagesWithIssues: number;
  };
  /** Errors die während des Crawls aufgetreten sind, aber nicht fatal waren */
  errors: CrawlError[];
  reportEmailSent?: boolean;
}

export interface ReportRequest {
  resultId: string;
  email: string;
  consent: boolean;
}
