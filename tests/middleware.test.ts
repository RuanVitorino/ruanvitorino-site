import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, middleware } from "../middleware";

const req = (path: string, headers: Record<string, string> = {}, method = "GET") =>
  new NextRequest(`https://ruanvitorino.dev${path}`, { headers, method });

const passesThrough = (res: Response) => res.headers.get("x-middleware-next") === "1";

describe("middleware", () => {
  it("serves Markdown on the homepage for Accept: text/markdown", async () => {
    const res = middleware(req("/", { accept: "text/markdown" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    expect(await res.text()).toMatch(/^# Ruan Vitorino\n/);
  });

  it("answers unknown paths with a Markdown 404", async () => {
    const res = middleware(req("/__ora-404-probe-m1xz0zmc", { accept: "text/markdown" }));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    expect(await res.text()).toContain("https://ruanvitorino.dev/llms.txt");
  });

  it("lets HTML requests through to Next untouched", () => {
    for (const accept of ["text/html", "*/*", ""]) {
      const res = middleware(req("/", accept ? { accept } : {}));
      expect(passesThrough(res)).toBe(true);
      expect(res.headers.get("content-type")).toBeNull();
    }
  });

  it("returns 406 when both representations are refused", async () => {
    const res = middleware(req("/", { accept: "*/*;q=0" }));
    expect(res.status).toBe(406);
    expect(await res.text()).toContain("text/markdown");
  });

  it("never touches Next's own traffic or non-GET methods", () => {
    const md = { accept: "text/markdown" };
    expect(passesThrough(middleware(req("/", { ...md, rsc: "1" })))).toBe(true);
    expect(passesThrough(middleware(req("/", { ...md, "next-router-prefetch": "1" })))).toBe(true);
    expect(passesThrough(middleware(req("/?_rsc=abc", md)))).toBe(true);
    expect(passesThrough(middleware(req("/", { ...md, "next-action": "x" }, "POST")))).toBe(true);
  });

  it("serves the English Markdown on /pt and /es, labelled as English", async () => {
    for (const path of ["/pt", "/es/now", "/pt/work/smileia"]) {
      const res = middleware(req(path, { accept: "text/markdown" }));
      expect(res.status, path).toBe(200);
      expect(res.headers.get("content-language"), path).toBe("en");
      expect((await res.text()).startsWith("# "), path).toBe(true);
    }
    expect(middleware(req("/pt/foo", { accept: "text/markdown" })).status).toBe(404);
  });

  it("redirects /en to the bare English paths, permanently", () => {
    for (const [from, to] of [
      ["/en", "/"],
      ["/en/now", "/now"],
      ["/en/work/smileia?x=1", "/work/smileia?x=1"],
    ]) {
      const res = middleware(req(from));
      expect(res.status, from).toBe(308);
      expect(res.headers.get("location"), from).toBe(`https://ruanvitorino.dev${to}`);
    }
    expect(passesThrough(middleware(req("/english")))).toBe(true);
  });

  it("sends old ?lang= links to the language's path and keeps the other parameters", () => {
    for (const [from, to] of [
      ["/?lang=es", "/es"],
      ["/now?lang=pt", "/pt/now"],
      ["/?lang=pt&ask=hi", "/pt?ask=hi"],
      ["/pt/now?lang=en", "/now"],
      ["/es/work/smileia?lang=pt", "/pt/work/smileia"],
    ]) {
      const res = middleware(req(from, { accept: "text/markdown" }));
      expect(res.status, from).toBe(308);
      expect(res.headers.get("location"), from).toBe(`https://ruanvitorino.dev${to}`);
    }
    expect(passesThrough(middleware(req("/?lang=fr")))).toBe(true);
  });

  it("matches pages but not assets, API routes or files", () => {
    const re = new RegExp(`^${config.matcher[0]}$`);
    for (const p of ["/", "/now", "/work/smileia", "/pt", "/pt/now", "/es/work/smileia", "/__ora-404-probe"]) expect(re.test(p)).toBe(true);
    for (const p of ["/_next/static/x.js", "/api/agent", "/llms.txt", "/sitemap.xml", "/robots.txt", "/og.png"]) expect(re.test(p)).toBe(false);
  });
});
