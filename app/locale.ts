import type { Metadata } from "next";
import { copy, extras, type Lang } from "./content";
import { more } from "./more-copy";
import { person } from "./person";
import { localePath } from "./paths";

const ogLocale: Record<Lang, string> = { en: "en_US", es: "es_ES", pt: "pt_BR" };

// Shared by the layout (English default) and the pages of each language.
export const siteDescription: Record<Lang, string> = {
  en: "Full-stack developer in Santa Catarina, Brazil. Co-founder of Temp.IA, where I build AI products that talk to customers on WhatsApp and Instagram.",
  es: "Desarrollador full-stack en Santa Catarina, Brasil. Cofundador de Temp.IA, donde construyo productos de IA que hablan con clientes por WhatsApp e Instagram.",
  pt: "Desenvolvedor full-stack em Santa Catarina, Brasil. Cofundador da Temp.IA, onde construo produtos de IA que conversam com clientes no WhatsApp e no Instagram.",
};

// Canonical points at the page itself, so each language is indexed on its own; the language map links the three.
function alternates(lang: Lang, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(lang, path),
    languages: {
      en: localePath("en", path),
      es: localePath("es", path),
      "pt-BR": localePath("pt", path),
      "x-default": localePath("en", path),
    },
  };
}

function social(lang: Lang, path: string, title: string, description: string, type: "website" | "article", image: { url: string; alt?: string; width?: number; height?: number }): Metadata["openGraph"] {
  return { type, siteName: "Ruan Vitorino", url: localePath(lang, path), locale: ogLocale[lang], title, description, images: [image] };
}

const card = { url: "/og.png", width: 1200, height: 630 };

export function homeMetadata(lang: Lang): Metadata {
  const p = person[lang];
  const title = `Ruan Vitorino · ${p.role}`;
  const description = siteDescription[lang];
  return {
    // The root layout's title is the English one; this one is the page's own.
    title: { absolute: title },
    description,
    alternates: alternates(lang, "/"),
    openGraph: social(lang, "/", title, description, "website", card),
  };
}

export function nowMetadata(lang: Lang): Metadata {
  const n = more[lang].nowPage;
  const title = `${n.title} · Ruan Vitorino`;
  const description = nowDescription[lang];
  return { title, description, alternates: alternates(lang, "/now"), openGraph: social(lang, "/now", title, description, "website", card) };
}

const nowDescription: Record<Lang, string> = {
  en: "What Ruan Vitorino is building and learning right now, and how he uses AI to build.",
  es: "Lo que Ruan Vitorino está construyendo y aprendiendo ahora, y cómo usa la IA para construir.",
  pt: "O que Ruan Vitorino está construindo e aprendendo agora, e como ele usa IA para construir.",
};

export function projectMetadata(lang: Lang, id: string): Metadata {
  const p = copy[lang].projects.find((x) => x.id === id);
  if (!p) return {};
  const title = `${p.name} · Ruan Vitorino`;
  // The project's first screenshot when it has one; the site card otherwise.
  const shot = extras[lang].shots[id]?.[0];
  const path = `/work/${id}`;
  return {
    title,
    description: p.summary,
    alternates: alternates(lang, path),
    openGraph: social(lang, path, title, p.summary, "article", shot ? { url: shot.src, alt: shot.alt } : card),
  };
}

export const projectIds = copy.en.projects.map((p) => p.id);
