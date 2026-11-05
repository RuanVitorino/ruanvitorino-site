import Anthropic from "@anthropic-ai/sdk";
import { MODEL, SYSTEM } from "../../agent-prompt";

export const runtime = "nodejs";

// Per-instance limits: enough to stop casual abuse; the prepaid API credits are the real cap.
const perIp = new Map<string, { n: number; reset: number }>();
const HOUR = 60 * 60 * 1000;
const PER_IP = 15;

function allowed(ip: string) {
  const now = Date.now();
  const cur = perIp.get(ip);
  if (!cur || cur.reset < now) {
    perIp.set(ip, { n: 1, reset: now + HOUR });
    return true;
  }
  if (cur.n >= PER_IP) return false;
  cur.n++;
  return true;
}

type Turn = { role: "user" | "assistant"; text: string };

function parse(body: unknown): { question: string; history: Turn[] } | null {
  if (!body || typeof body !== "object") return null;
  const { question, history } = body as { question?: unknown; history?: unknown };
  if (typeof question !== "string" || !question.trim() || question.length > 400) return null;
  const turns: Turn[] = [];
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      if (h && (h.role === "user" || h.role === "assistant") && typeof h.text === "string" && h.text.length <= 1500) {
        turns.push({ role: h.role, text: h.text });
      }
    }
  }
  // The API needs alternating turns that start with the user.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (turns.length % 2 === 1) turns.pop();
  return { question: question.trim(), history: turns };
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: "offline" }, { status: 503 });

  const input = parse(await req.json().catch(() => null));
  if (!input) return Response.json({ error: "bad_request" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowed(ip)) return Response.json({ error: "limit" }, { status: 429 });

  // Only the question text, so Ruan can see what recruiters ask (Vercel logs). No IP or other data.
  console.log("agent question", JSON.stringify({ q: input.question.slice(0, 300) }));

  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = [
    ...input.history.map((t) => ({ role: t.role, content: t.text })),
    { role: "user", content: input.question },
  ];

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 1024,
    output_config: { effort: "low" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    cache_control: { type: "ephemeral" },
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("agent stream failed", err);
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
