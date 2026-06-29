/**
 * Brücke Lead → Website-Fabrik (Event-Prototyp).
 *
 * Schreibt direkt (service_role / PostgREST) eine Projektzeile in die Fabrik-DB
 * und stösst die Build-Pipeline per GitHub repository_dispatch an. Bewusst NICHT
 * über den öffentlichen Token-Intake (`/api/intake`), denn der erwartet ein
 * vorab angelegtes Projekt mit Einladungs-Token + Pflichtfelder, die ein Lead
 * nicht hat. Muster analog `lib/angebot/db.ts` (gleiches Supabase-Projekt).
 *
 * ENV (mit Fallback auf die bereits konfigurierten Angebot-Vars — selbe DB):
 *   FABRIK_SUPABASE_URL  | ANGEBOT_SUPABASE_URL
 *   FABRIK_SUPABASE_SERVICE_KEY | ANGEBOT_SUPABASE_SERVICE_KEY
 *   GH_PAT, GH_REPO                  — für den Build-Trigger (repository_dispatch)
 *   FABRIK_ENABLE_AUTO_PROTOTYP=1    — Hauptschalter (Default: AUS)
 */

const SUPA_URL = process.env.FABRIK_SUPABASE_URL || process.env.ANGEBOT_SUPABASE_URL;
const SUPA_KEY = process.env.FABRIK_SUPABASE_SERVICE_KEY || process.env.ANGEBOT_SUPABASE_SERVICE_KEY;

export function autoPrototypeEnabled(): boolean {
  const v = (process.env.FABRIK_ENABLE_AUTO_PROTOTYP || "").toLowerCase();
  return v === "1" || v === "true";
}

export function fabrikDbReady(): boolean {
  return !!SUPA_URL && !!SUPA_KEY;
}

export function fabrikTriggerReady(): boolean {
  return !!process.env.GH_PAT && !!process.env.GH_REPO;
}

function headers(extra?: Record<string, string>) {
  return {
    apikey: SUPA_KEY || "",
    Authorization: `Bearer ${SUPA_KEY || ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export interface EventProjectInput {
  company: string;
  city?: string;
  email: string;
  phone?: string;
  goal?: string;
  idealCustomer?: string;
  logoUrl?: string;
  accentColor?: string;
  photoUrls?: string[];
  social?: Record<string, string>;
  about?: string;
  services?: string[];
  sourceUrl?: string;
  kiScore?: number;
  closeLeadId?: string;
}

/**
 * Legt ein Event-Projekt (status=intake_complete, template_type=event) an.
 * @returns die neue project-UUID oder null bei Fehler.
 */
/** Nur absolute http(s)-URLs zulassen (kein javascript:/data:/relative Müll im Build). */
function httpUrl(u?: string): string | undefined {
  return typeof u === "string" && /^https?:\/\//i.test(u.trim()) ? u.trim() : undefined;
}

export async function createEventProject(input: EventProjectInput): Promise<string | null> {
  if (!fabrikDbReady()) {
    console.warn("[fabrik] Supabase nicht konfiguriert — Event-Projekt nicht angelegt.");
    return null;
  }
  const logoUrl = httpUrl(input.logoUrl);
  const photoUrls = (input.photoUrls || []).map(httpUrl).filter((u): u is string => !!u);
  const row: Record<string, unknown> = {
    status: "intake_complete",
    template_type: "event",
    industry: "Eventlocation",
    company: input.company,
    city: input.city || null,
    contact_email: input.email,
    form_recipient_email: input.email,
    phone: input.phone || null,
    tone: "sie",
    goal: input.goal || "Mehr planbare Anfragen für Firmenfeiern, Tagungen und Firmenevents.",
    ideal_customer:
      input.idealCustomer ||
      "Unternehmen aus der Region, die ihre Firmenfeier, Weihnachtsfeier oder Tagung stilvoll und ohne Aufwand auslagern.",
    about: input.about || null,
    services: input.services && input.services.length ? input.services : null,
    logo_url: logoUrl || null,
    accent_color: input.accentColor || null,
    photo_urls: photoUrls.length ? photoUrls : null,
    social: input.social && Object.keys(input.social).length ? input.social : null,
    ki_score: typeof input.kiScore === "number" ? input.kiScore : null,
    close_lead_id: input.closeLeadId || null,
  };

  const res = await fetch(`${SUPA_URL}/rest/v1/factory_projects`, {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    console.warn(`[fabrik] createEventProject ${res.status}: ${await res.text()}`);
    return null;
  }
  const rows = (await res.json()) as Array<{ id?: string }>;
  return rows?.[0]?.id ?? null;
}

/** Liest den aktuellen Status eines Fabrik-Projekts (für Doppelklick-Schutz). */
export async function getEventProjectStatus(projectId: string): Promise<string | null> {
  if (!fabrikDbReady()) return null;
  try {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/factory_projects?id=eq.${projectId}&select=status`,
      { headers: headers() },
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{ status?: string }>;
    return rows?.[0]?.status ?? null;
  } catch {
    return null;
  }
}

/**
 * Stösst die Build-Pipeline für ein Projekt an (GitHub repository_dispatch).
 * @returns true bei erfolgreichem Dispatch.
 */
export async function triggerBuildPreview(projectId: string): Promise<boolean> {
  if (!fabrikTriggerReady()) {
    console.warn("[fabrik] GH_PAT/GH_REPO fehlen — Build nicht getriggert (Projekt liegt angelegt vor).");
    return false;
  }
  const res = await fetch(`https://api.github.com/repos/${process.env.GH_REPO}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GH_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ event_type: "build-preview", client_payload: { project_id: projectId } }),
  });
  if (!res.ok) {
    console.warn(`[fabrik] triggerBuildPreview github ${res.status}: ${await res.text()}`);
    return false;
  }
  return true;
}

/**
 * Komplette Brücke: Projekt anlegen + Build triggern. Best-effort, wirft nie.
 * @returns die project-UUID (auch wenn der Trigger scheitert) oder null.
 */
export async function spawnEventPrototype(input: EventProjectInput): Promise<string | null> {
  try {
    const projectId = await createEventProject(input);
    if (!projectId) return null;
    await triggerBuildPreview(projectId);
    return projectId;
  } catch (e) {
    console.warn("[fabrik] spawnEventPrototype fehlgeschlagen:", e instanceof Error ? e.message : e);
    return null;
  }
}
