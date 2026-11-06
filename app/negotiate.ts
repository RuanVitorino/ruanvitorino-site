// Accept negotiation between the two representations every page has: HTML (the default) and Markdown.
// Follows acceptmarkdown.com: rank by q, break ties by specificity, respect q=0.

export type Representation = "html" | "md";

type Entry = { type: string; subtype: string; q: number };

function parse(accept: string): Entry[] {
  const out: Entry[] = [];
  for (const raw of accept.split(",")) {
    const [range, ...params] = raw.trim().toLowerCase().split(";");
    const [type, subtype] = range.trim().split("/");
    if (!type || !subtype) continue;
    let q = 1;
    for (const p of params) {
      const [k, v] = p.trim().split("=");
      if (k === "q") {
        const n = Number(v);
        q = Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0;
      }
    }
    out.push({ type: type.trim(), subtype: subtype.trim(), q });
  }
  return out;
}

// The q of the most specific entry that matches one of the given media types (q 0 if none matches),
// and how specific that match was: 3 exact, 2 type/*, 1 */*.
function score(entries: Entry[], mediaTypes: string[]) {
  let best = -1;
  let q = 0;
  for (const mt of mediaTypes) {
    const [type, subtype] = mt.split("/");
    for (const e of entries) {
      const spec =
        e.type === type && e.subtype === subtype ? 3 : e.type === type && e.subtype === "*" ? 2 : e.type === "*" && e.subtype === "*" ? 1 : 0;
      if (spec > best) {
        best = spec;
        q = e.q;
      } else if (spec === best && spec > 0) {
        q = Math.max(q, e.q);
      }
    }
  }
  return best > 0 ? { q, spec: best } : { q: 0, spec: 0 };
}

// "md" when Markdown has the higher q, or the same q from an explicit text/markdown entry (browsers never name
// it, agents that list both do). HTML on wildcard ties, a missing header, */* or a header naming neither.
// null (406) only when the client explicitly rules out both with q=0.
export function negotiate(accept: string | null | undefined): Representation | null {
  if (!accept || !accept.trim()) return "html";
  const entries = parse(accept);
  if (!entries.length) return "html";
  const md = score(entries, ["text/markdown"]);
  const html = score(entries, ["text/html", "application/xhtml+xml"]);
  if (md.q > html.q || (md.q > 0 && md.q === html.q && md.spec === 3)) return "md";
  if (html.q > 0) return "html";
  const refused = (mediaTypes: string[]) =>
    entries.some((e) => e.q === 0 && mediaTypes.some((mt) => {
      const [type, subtype] = mt.split("/");
      return (e.type === type || e.type === "*") && (e.subtype === subtype || e.subtype === "*");
    }));
  if (refused(["text/markdown"]) && refused(["text/html", "application/xhtml+xml"])) return null;
  return "html";
}
