// Reads a JSON body as a plain object; anything else (invalid JSON, arrays,
// primitives) becomes null, so handlers can answer with 400.
export async function readJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();

    return typeof body === "object" && body !== null && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
