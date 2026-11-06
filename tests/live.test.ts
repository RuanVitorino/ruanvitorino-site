import { describe, expect, it } from "vitest";
import { copy } from "../app/content";
import { KNOWS_ABOUT } from "../app/structured-data";

// End-to-end checks against a running server. Skipped unless SITE_URL is set:
//   SITE_URL=http://localhost:4401 npx vitest run tests/live.test.ts
//   SITE_URL=https://ruanvitorino.dev npx vitest run tests/live.test.ts
const BASE = process.env.SITE_URL?.replace(/\/$/, "");

const get = (path: string, accept?: string) => fetch(`${BASE}${path}`, { headers: accept ? { accept } : {}, redirect: "follow" });
const varies = (res: Response) => /(^|,)\s*accept\s*(,|$)/i.test(res.headers.get("vary") ?? "");

describe.skipIf(!BASE)(`live: ${BASE}`, () => {
  it("homepage: Markdown for Accept: text/markdown, with Vary: Accept", async () => {
    const res = await get("/", "text/markdown");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/^text\/markdown/);
    expect(varies(res)).toBe(true);
    expect(await res.text()).toMatch(/^# Ruan Vitorino\n/);
  });

  it("homepage: HTML for browsers, with the Person JSON-LD", async () => {
    for (const accept of ["text/html", undefined, "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"]) {
      const res = await get("/", accept);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toMatch(/^text\/html/);
      const html = await res.text();
      const m = /<script type="application\/ld\+json">(.*?)<\/script>/s.exec(html);
      expect(m).not.toBeNull();
      const person = JSON.parse(m![1])["@graph"][0];
      expect(person["@type"]).toBe("Person");
      const text = html.split("<body")[1].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
      for (const term of KNOWS_ABOUT) expect(text, term).toContain(term);
    }
  });

  it("every page in the sitemap answers in Markdown", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(urls.length).toBe(2 + copy.en.projects.length);
    for (const path of urls) {
      const res = await get(path, "text/markdown");
      expect(res.status, path).toBe(200);
      expect(res.headers.get("content-type"), path).toMatch(/^text\/markdown/);
      expect((await res.text()).startsWith("# "), path).toBe(true);
    }
  });

  it("unknown paths: 404 in both representations, Markdown body links to llms.txt", async () => {
    const md = await get("/__ora-404-probe-test", "text/markdown");
    expect(md.status).toBe(404);
    expect(md.headers.get("content-type")).toMatch(/^text\/markdown/);
    expect(varies(md)).toBe(true);
    const body = await md.text();
    expect(body.length).toBeGreaterThan(20);
    expect(body).toContain("/llms.txt");
    const html = await get("/__ora-404-probe-test", "text/html");
    expect(html.status).toBe(404);
    expect(html.headers.get("content-type")).toMatch(/^text\/html/);
  });

  it("llms.txt, robots.txt and sitemap.xml are served unchanged", async () => {
    const llms = await get("/llms.txt", "text/markdown");
    expect(llms.status).toBe(200);
    expect(await llms.text()).toContain("## When to use this");
    expect((await get("/robots.txt")).status).toBe(200);
    expect((await get("/sitemap.xml")).headers.get("content-type")).toMatch(/xml/);
  });
});
