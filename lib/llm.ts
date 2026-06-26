/**
 * Schlanker Anthropic-Aufruf (Messages API) für serverseitige Textgenerierung.
 * Nutzt ANTHROPIC_API_KEY (in der Vercel-Env vorhanden). Wirft nie — gibt null
 * zurück, wenn kein Key da ist oder der Aufruf scheitert (Aufrufer nutzt Fallback).
 */
const MODEL = process.env.OUTREACH_LLM_MODEL || "claude-haiku-4-5-20251001";

export async function claudeText(
  prompt: string,
  opts?: { system?: string; maxTokens?: number },
): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: opts?.maxTokens ?? 700,
        ...(opts?.system ? { system: opts.system } : {}),
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { content?: { type: string; text?: string }[] };
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text || "").join("").trim();
    return text || null;
  } catch {
    return null;
  }
}
