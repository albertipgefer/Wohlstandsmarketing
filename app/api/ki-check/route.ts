import { NextRequest, NextResponse } from "next/server";
import { performKiCheck } from "@/lib/ki-check/score";
import type { UserAnswers } from "@/lib/ki-check/types";

// Multi-Page-Crawl + PageSpeed Insights — kann bis ~50 s dauern
export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const b = body as Partial<UserAnswers>;
  if (!b.url || typeof b.url !== "string" || b.url.length < 4) {
    return NextResponse.json(
      { error: "Bitte gib eine gültige URL an." },
      { status: 400 },
    );
  }

  const answers: UserAnswers = {
    url: b.url,
    city: typeof b.city === "string" ? b.city.slice(0, 80) : undefined,
    goal:
      b.goal === "leads" ||
      b.goal === "lokal" ||
      b.goal === "ki" ||
      b.goal === "alle"
        ? b.goal
        : undefined,
  };

  const result = await performKiCheck(answers);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }
  return NextResponse.json(result);
}
