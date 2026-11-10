import type { MetadataRoute } from "next";
import { copy } from "./content";

const base = "https://ruanvitorino.dev";

// The pages are static and all copy lives in the repo, so every page changes when the site is built.
const built = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified: built, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/now`, lastModified: built, changeFrequency: "monthly", priority: 0.5 },
    ...copy.en.projects.map((p) => ({
      url: `${base}/work/${p.id}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
