// Public health check for products that run in production. Cached for a minute at the edge.
const targets: Record<string, string> = {
  smileia: "https://app.smile.ia.br",
};

export const revalidate = 60;

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const url = targets[id];
  if (!url) return Response.json({ up: false, error: "unknown" }, { status: 404 });
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(4000), cache: "no-store" });
    const up = res.status < 500;
    return Response.json({ up }, { headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=120" } });
  } catch {
    return Response.json({ up: false }, { headers: { "cache-control": "public, s-maxage=30" } });
  }
}
