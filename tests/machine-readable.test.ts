import { describe, expect, it } from "vitest";
import { copy } from "../app/content";
import { llmsTxt } from "../app/llms";
import { jsonLdScript, personJsonLd } from "../app/structured-data";

describe("llms.txt", () => {
  const txt = llmsTxt();
  const lines = txt.split("\n");

  it("follows the llmstxt.org layout: H1, blockquote, prose, then H2 link lists", () => {
    expect(lines[0]).toBe("# Ruan Vitorino");
    expect(lines[2].startsWith("> ")).toBe(true);
    const firstH2 = lines.findIndex((l) => l.startsWith("## "));
    // No headings in the prose between the summary and the first H2.
    expect(lines.slice(1, firstH2).some((l) => l.startsWith("#"))).toBe(false);
    expect(lines.filter((l) => l.startsWith("# "))).toHaveLength(1);
  });

  it("has a 'When to use this' section whose items carry links", () => {
    const start = lines.indexOf("## When to use this");
    expect(start).toBeGreaterThan(0);
    const end = lines.findIndex((l, i) => i > start && l.startsWith("## "));
    const items = lines.slice(start + 1, end).filter((l) => l.startsWith("- "));
    expect(items.length).toBeGreaterThanOrEqual(4);
    expect(items.filter((l) => /^- \[[^\]]+\]\(https:\/\/ruanvitorino\.dev[^)]*\): /.test(l)).length).toBeGreaterThanOrEqual(4);
  });

  it("lists every project and explains Markdown negotiation", () => {
    for (const p of copy.en.projects) expect(txt).toContain(`(https://ruanvitorino.dev/work/${p.id})`);
    expect(txt).toContain("Accept: text/markdown");
  });

  it("does not advertise the paid chat API", () => {
    expect(txt).not.toContain("/api/");
  });
});

describe("JSON-LD", () => {
  const data = personJsonLd();
  const person = data["@graph"][0] as Record<string, unknown>;

  it("describes a Person with name, url, description, sameAs and knowsAbout", () => {
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Ruan Vitorino");
    expect(person.url).toBe("https://ruanvitorino.dev/");
    expect(typeof person.description).toBe("string");
    expect(person.sameAs).toEqual(["https://www.linkedin.com/in/ruan-vitorino/", "https://github.com/RuanVitorino"]);
    expect((person.knowsAbout as string[])[0]).toBe("Next.js");
    expect(person.worksFor).toEqual([
      { "@type": "Organization", name: "Temp.IA" },
      { "@type": "Organization", name: "aFill Inovação em Sistemas" },
    ]);
  });

  it("serializes to JSON that cannot close the script tag", () => {
    const s = jsonLdScript({ x: "</script><b>" });
    expect(s).not.toContain("<");
    expect(JSON.parse(s)).toEqual({ x: "</script><b>" });
  });
});
