// Score-Aggregation + Top-Empfehlungen + In-Memory-Cache.

import { randomUUID } from "crypto";
import type {
  KiCheckResult,
  PillarResult,
  UserAnswers,
} from "./types";
import { runAllChecks } from "./checks";

function scoreLabelFor(score: number): KiCheckResult["scoreLabel"] {
  if (score >= 80) return "stark";
  if (score >= 60) return "solide";
  if (score >= 35) return "ausbaufaehig";
  return "kritisch";
}

function topRecommendations(
  pillars: PillarResult[],
  answers: UserAnswers,
): Array<{ title: string; body: string }> {
  // Sammle alle Fail/Warn-Items, gewichtet nach Status + Säulen-Schwäche.
  type Cand = { item: PillarResult["items"][number]; weight: number };
  const cands: Cand[] = [];
  for (const p of pillars) {
    for (const it of p.items) {
      if (!it.fix) continue;
      const w = (it.status === "fail" ? 2 : 1) + (p.score < 12 ? 1 : 0);
      cands.push({ item: it, weight: w });
    }
  }
  cands.sort((a, b) => b.weight - a.weight);
  const picked = cands.slice(0, 3);

  // Ziel-spezifischer Intro-Hint
  const goalIntro: Record<NonNullable<UserAnswers["goal"]>, string> = {
    leads: "Für mehr Leads",
    lokal: "Für lokale Sichtbarkeit",
    ki: "Für KI-Empfehlungen",
    alle: "Für maximale Sichtbarkeit",
  };
  const intro = answers.goal ? goalIntro[answers.goal] : "Top-Empfehlung";

  return picked.map((c, idx) => ({
    title: idx === 0 ? `${intro}: ${c.item.label}` : c.item.label,
    body: c.item.fix ?? c.item.detail,
  }));
}

// In-Memory-Cache mit TTL 24h.
// Reicht für ein gratis Tool — Restart leert den Cache, das ist okay.
interface CacheEntry {
  data: KiCheckResult;
  expiresAt: number;
}
const cache = new Map<string, CacheEntry>();
const TTL_MS = 24 * 60 * 60 * 1000;

function pruneCache() {
  const now = Date.now();
  for (const [k, v] of cache.entries()) {
    if (v.expiresAt < now) cache.delete(k);
  }
}

export function getResult(id: string): KiCheckResult | null {
  pruneCache();
  return cache.get(id)?.data ?? null;
}

export function updateResult(id: string, patch: Partial<KiCheckResult>) {
  const entry = cache.get(id);
  if (!entry) return;
  entry.data = { ...entry.data, ...patch };
}

export async function performKiCheck(
  answers: UserAnswers,
): Promise<KiCheckResult | { error: string }> {
  const raw = await runAllChecks(answers.url);
  if (!raw) {
    return {
      error:
        "Wir konnten die Seite nicht laden. Prüfe die URL (mit https://) und versuche es erneut.",
    };
  }

  const totalScore = raw.pillars.reduce((sum, p) => sum + p.score, 0);
  const id = randomUUID();
  const result: KiCheckResult = {
    id,
    inputUrl: answers.url,
    normalizedUrl: raw.origin,
    fetchedAt: new Date().toISOString(),
    answers,
    score: totalScore,
    scoreLabel: scoreLabelFor(totalScore),
    pillars: raw.pillars,
    topRecommendations: topRecommendations(raw.pillars, answers),
    meta: raw.meta,
  };

  cache.set(id, { data: result, expiresAt: Date.now() + TTL_MS });
  return result;
}
