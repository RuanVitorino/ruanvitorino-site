import { describe, expect, it } from "vitest";
import { copy } from "../app/content";
import { notFoundMarkdown, pageMarkdown } from "../app/markdown";

describe("pageMarkdown", () => {
  it("renders the homepage with the profile, every project and the contact", () => {
    const md = pageMarkdown("/")!;
    expect(md.startsWith("# Ruan Vitorino\n")).toBe(true);
    expect(md).toContain("ruanrvitorino@gmail.com");
    expect(md).toContain("https://ruanvitorino.dev/llms.txt");
    for (const p of copy.en.projects) expect(md).toContain(`(https://ruanvitorino.dev/work/${p.id})`);
    expect(md).not.toMatch(/<[a-z][^>]*>/i);
  });

  it("states what he is looking for, before the projects", () => {
    const md = pageMarkdown("/")!;
    const seek = md.indexOf("## What I'm looking for");
    expect(seek).toBeGreaterThan(0);
    expect(seek).toBeLessThan(md.indexOf("## Selected work"));
    expect(md).toContain("relocating to Spain or Portugal");
    expect(md).not.toMatch(/visa/i);
    expect(md).toContain("UTC-3");
  });

  it("renders /now and ignores a trailing slash", () => {
    expect(pageMarkdown("/now")).toMatch(/^# Now\n/);
    expect(pageMarkdown("/now/")).toBe(pageMarkdown("/now"));
  });

  it("renders one page per project, the same list generateStaticParams uses", () => {
    for (const p of copy.en.projects) {
      const md = pageMarkdown(`/work/${p.id}`)!;
      expect(md.startsWith(`# ${p.name}\n`)).toBe(true);
      expect(md).toContain(p.summary);
    }
  });

  it("answers the Spanish and Portuguese pages with the English Markdown", () => {
    expect(pageMarkdown("/pt")).toBe(pageMarkdown("/"));
    expect(pageMarkdown("/es/now")).toBe(pageMarkdown("/now"));
    expect(pageMarkdown("/pt/work/smileia/")).toBe(pageMarkdown("/work/smileia"));
    for (const path of ["/en", "/en/now", "/xx/now", "/pt/foo", "/pt/work/nope"]) expect(pageMarkdown(path), path).toBeNull();
  });

  it("returns null for paths that are not pages", () => {
    expect(pageMarkdown("/work/nope")).toBeNull();
    expect(pageMarkdown("/__ora-404-probe")).toBeNull();
    expect(pageMarkdown("/work")).toBeNull();
  });
});

describe("notFoundMarkdown", () => {
  it("explains the error and links to llms.txt and the sitemap", () => {
    const md = notFoundMarkdown("/missing");
    expect(md.length).toBeGreaterThan(20);
    expect(md).toContain("404");
    expect(md).toContain("`/missing`");
    expect(md).toContain("https://ruanvitorino.dev/llms.txt");
    expect(md).toContain("https://ruanvitorino.dev/sitemap.xml");
  });

  it("cannot be broken out of the inline code span by the path", () => {
    expect(notFoundMarkdown("/a`b\nc")).toContain("`/abc`");
  });
});
