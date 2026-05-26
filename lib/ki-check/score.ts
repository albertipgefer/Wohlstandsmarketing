// Score-Aggregation + Top-Empfehlungen + In-Memory-Cache.

import { randomUUID } from "crypto";
import type { KiCheckResult, PillarResult, UserAnswers } from "./types";
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
  type Cand = { title: string; body: string; weight: number };
  const cands: Cand[] = [];
  for (const p of pillars) {
    for (const it of p.items) {
      if (!it.fix) continue;
      const w = (it.status === "fail" ? 2 : 1) + (p.score < 12 ? 1 : 0);
      cands.push({ title: it.label, body: it.fix, weight: w });
    }
  }
  cands.sort((a, b) => b.weight - a.weight);

  const strategicByGoal: Record<NonNullable<UserAnswers["goal"]>, Array<{ title: string; body: string }>> = {
    leads: [
      { title: "Lead-Magnet platzieren", body: "Free Tool, PDF-Guide oder Mini-Audit als Lead-Magnet auf jeder Seite anbieten — verwandelt Traffic in Anfragen." },
      { title: "Conversion-Pfade testen", body: "A/B-Tests auf Hero-CTA, Form-Position und Above-the-Fold-Botschaft starten." },
      { title: "Social Proof verstärken", body: "Mindestens 5 Google-Bewertungen + Kunden-Logos prominent platzieren." },
    ],
    lokal: [
      { title: "Stadt-Seiten skalieren", body: "Pro Region eine eigene Landingpage mit lokalem Bezug, Schema und Branchen-Fokus aufbauen." },
      { title: "Google Business Profile pflegen", body: "Wöchentliche Posts, 10+ Fotos, Reviews aktiv einsammeln — bringt sofort lokale Sichtbarkeit." },
      { title: "Lokale Backlinks aufbauen", body: "Branchenverzeichnisse, lokale Presse und Partner-Webseiten gezielt für Backlinks anfragen." },
    ],
    ki: [
      { title: "FAQ-Cluster ausbauen", body: "Pro Hauptthema 5–10 strukturierte FAQs mit FAQPage-Schema — KI liebt strukturierte Antworten." },
      { title: "Blog-Frequenz erhöhen", body: "1 Artikel/Woche zu KI-relevanten Themen — Frische signalisiert Relevanz für KI-Crawler." },
      { title: "Author-Entity stärken", body: "Person-Schema mit sameAs zu LinkedIn/Wikipedia/Branchenmedien — KI verknüpft dich als Experten." },
    ],
    alle: [
      { title: "Content-Cluster aufbauen", body: "Pro Hauptthema einen Pillar-Artikel + 5–10 Cluster-Artikel mit interner Verlinkung." },
      { title: "Newsletter-Funnel starten", body: "E-Mail-Liste aufbauen mit klarem Lead-Magnet — der einzige Kanal, den du selbst besitzt." },
      { title: "Backlink-Outreach aktivieren", body: "5–10 hochwertige Backlinks aus Branche/lokal pro Quartal — der dritte SEO-Hebel nach Content + Technik." },
    ],
  };

  const goalIntro: Record<NonNullable<UserAnswers["goal"]>, string> = {
    leads: "Für mehr Leads",
    lokal: "Für lokale Sichtbarkeit",
    ki: "Für KI-Empfehlungen",
    alle: "Für maximale Sichtbarkeit",
  };
  const intro = answers.goal ? goalIntro[answers.goal] : "Top-Empfehlung";

  const picked = cands.slice(0, 3).map((c) => ({ title: c.title, body: c.body }));
  if (picked.length < 3 && answers.goal) {
    const strategic = strategicByGoal[answers.goal];
    const existingTitles = new Set(picked.map((p) => p.title));
    for (const s of strategic) {
      if (picked.length >= 3) break;
      if (!existingTitles.has(s.title)) picked.push(s);
    }
  }
  while (picked.length < 3) {
    const fallback = [
      { title: "Content-Cluster aufbauen", body: "Pro Hauptthema einen Pillar-Artikel + Cluster-Artikel mit interner Verlinkung." },
      { title: "Backlink-Aufbau starten", body: "5–10 hochwertige Backlinks pro Quartal aus Branche/lokal." },
      { title: "Frische signalisieren", body: "Regelmäßig (mind. 1x/Woche) neuen Content veröffentlichen." },
    ];
    for (const f of fallback) {
      if (picked.length >= 3) break;
      if (!picked.some((p) => p.title === f.title)) picked.push(f);
    }
  }

  return picked.map((p, idx) => ({
    title: idx === 0 ? `${intro}: ${p.title}` : p.title,
    body: p.body,
  }));
}

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

  // Logs für Vercel — Fehler werden gesammelt, nicht-fatale Crawl-Issues
  if (raw.errors.length > 0) {
    console.warn(
      `[ki-check] ${raw.errors.length} non-fatal errors during crawl of ${raw.origin}:`,
      raw.errors.slice(0, 10),
    );
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
    pages: raw.pages,
    stats: raw.stats,
    errors: raw.errors,
  };

  cache.set(id, { data: result, expiresAt: Date.now() + TTL_MS });
  return result;
}
