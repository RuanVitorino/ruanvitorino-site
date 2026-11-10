import type { Lang } from "./content";

// English lives at the bare paths (/, /now, /work/x) and stays the default; Spanish and Portuguese live under a
// prefix (/es, /pt/now, /es/work/x). Pure string helpers, so the middleware and client components can share them.

export const prefixed: Lang[] = ["es", "pt"];

// <html lang> for each language.
export const htmlLang: Record<Lang, string> = { en: "en", es: "es", pt: "pt-BR" };

export const isLang = (v: string | null | undefined): v is Lang => v === "en" || v === "es" || v === "pt";

// "/now" in Portuguese is "/pt/now"; the home page is "/pt", not "/pt/".
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// The language a pathname belongs to and the same page without its prefix. "/en" is not a language path here:
// English has no prefix, so "/en/now" is handled (redirected) by the middleware before it reaches this.
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const m = /^\/(es|pt)(\/.*)?$/.exec(pathname);
  if (!m) return { lang: "en", path: pathname };
  return { lang: m[1] as Lang, path: m[2] ?? "/" };
}
