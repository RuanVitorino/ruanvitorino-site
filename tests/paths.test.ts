import { describe, expect, it } from "vitest";
import { homeMetadata, nowMetadata, projectMetadata } from "../app/locale";
import { localePath, splitPath } from "../app/paths";

describe("localePath and splitPath", () => {
  it("leaves English at the bare path and prefixes es and pt", () => {
    expect(localePath("en", "/")).toBe("/");
    expect(localePath("es", "/")).toBe("/es");
    expect(localePath("pt", "/now")).toBe("/pt/now");
    expect(localePath("pt", "/work/smileia")).toBe("/pt/work/smileia");
  });

  it("splits a pathname back into its language and the bare page", () => {
    expect(splitPath("/")).toEqual({ lang: "en", path: "/" });
    expect(splitPath("/now")).toEqual({ lang: "en", path: "/now" });
    expect(splitPath("/es")).toEqual({ lang: "es", path: "/" });
    expect(splitPath("/pt/work/smileia")).toEqual({ lang: "pt", path: "/work/smileia" });
    // Only a whole first segment counts as a prefix.
    expect(splitPath("/portfolio")).toEqual({ lang: "en", path: "/portfolio" });
    expect(splitPath("/espana/now")).toEqual({ lang: "en", path: "/espana/now" });
  });

  it("round-trips every language and page", () => {
    for (const lang of ["en", "es", "pt"] as const)
      for (const path of ["/", "/now", "/work/appmulti"]) expect(splitPath(localePath(lang, path))).toEqual({ lang, path });
  });
});

describe("page metadata", () => {
  it("points each language's canonical at itself and lists all versions with an English x-default", () => {
    for (const [lang, canonical] of [
      ["en", "/work/smileia"],
      ["es", "/es/work/smileia"],
      ["pt", "/pt/work/smileia"],
    ] as const) {
      const alt = projectMetadata(lang, "smileia").alternates!;
      expect(alt.canonical).toBe(canonical);
      expect(alt.languages).toEqual({
        en: "/work/smileia",
        es: "/es/work/smileia",
        "pt-BR": "/pt/work/smileia",
        "x-default": "/work/smileia",
      });
    }
  });

  it("writes the title, description and locale in the page's language", () => {
    const pt = homeMetadata("pt");
    expect(pt.title).toEqual({ absolute: "Ruan Vitorino · Desenvolvedor full-stack" });
    expect(pt.description).toMatch(/^Desenvolvedor full-stack/);
    expect(pt.openGraph).toMatchObject({ locale: "pt_BR", url: "/pt" });
    expect(homeMetadata("en").openGraph).toMatchObject({ locale: "en_US", url: "/" });
    expect(nowMetadata("es").title).toBe("Ahora · Ruan Vitorino");
    expect(projectMetadata("es", "nope")).toEqual({});
  });
});
