import type { MetadataRoute } from "next";
import { copy, langs } from "./content";
import { localePath } from "./paths";

const base = "https://ruanvitorino.dev";

// The pages are static and all copy lives in the repo, so every page changes when the site is built.
const built = new Date();

const pages = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/now", changeFrequency: "monthly" as const, priority: 0.5 },
  ...copy.en.projects.map((p) => ({ path: `/work/${p.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
];

// One entry per page and language; each lists all the language versions, as hreflang needs it.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, ...rest }) => {
    const languages = {
      ...Object.fromEntries(langs.map((l) => [l.code === "pt" ? "pt-BR" : l.code, `${base}${localePath(l.code, path)}`])),
      "x-default": `${base}${localePath("en", path)}`,
    };
    return langs.map((l) => ({ url: `${base}${localePath(l.code, path)}`, lastModified: built, ...rest, alternates: { languages } }));
  });
}
