import type { MetadataRoute } from "next";
import { copy } from "./content";

const base = "https://ruanvitorino.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/now`, changeFrequency: "monthly", priority: 0.5 },
    ...copy.en.projects.map((p) => ({ url: `${base}/work/${p.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
