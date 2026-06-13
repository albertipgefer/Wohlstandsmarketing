/**
 * Beleg-Speicher (Supabase Storage, Bucket "belege", privat). Upload + signierte
 * URL laufen serverseitig über den Service-Role-Key. Belege sind sensibel und
 * nur über die login-geschützten Routen / signierte Links erreichbar.
 */
const URL = process.env.ANGEBOT_SUPABASE_URL;
const KEY = process.env.ANGEBOT_SUPABASE_SERVICE_KEY;
const BUCKET = "belege";

export function storageReady(): boolean {
  return !!URL && !!KEY;
}

/** Lädt eine Datei hoch und gibt den Storage-Pfad zurück (null bei Fehler). */
export async function uploadBeleg(bytes: ArrayBuffer, filename: string, contentType: string): Promise<string | null> {
  if (!storageReady()) return null;
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80) || "beleg";
  const path = `${Date.now()}-${safe}`;
  try {
    const r = await fetch(`${URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(path)}`, {
      method: "POST",
      headers: {
        apikey: KEY || "",
        Authorization: `Bearer ${KEY || ""}`,
        "Content-Type": contentType || "application/octet-stream",
        "x-upsert": "true",
      },
      body: Buffer.from(bytes),
    });
    if (!r.ok) return null;
    return path;
  } catch {
    return null;
  }
}

/** Erzeugt eine zeitlich begrenzte signierte URL zum Anzeigen/Download eines Belegs. */
export async function signedBelegUrl(path: string, expiresIn = 60 * 30): Promise<string | null> {
  if (!storageReady() || !path) return null;
  try {
    const r = await fetch(`${URL}/storage/v1/object/sign/${BUCKET}/${encodeURIComponent(path)}`, {
      method: "POST",
      headers: { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn }),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { signedURL?: string };
    return data.signedURL ? `${URL}/storage/v1${data.signedURL}` : null;
  } catch {
    return null;
  }
}

export async function deleteBeleg(path: string): Promise<boolean> {
  if (!storageReady() || !path) return false;
  try {
    const r = await fetch(`${URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(path)}`, {
      method: "DELETE",
      headers: { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}` },
    });
    return r.ok;
  } catch {
    return false;
  }
}
