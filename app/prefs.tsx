"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { langs, type Lang } from "./content";
import { htmlLang, localePath, splitPath } from "./paths";

type Theme = "light" | "dark";

// Theme shared by every page. The language comes from the page's URL (/es, /pt, or the bare path for English),
// so the server renders each page in its own language. The inline scripts in layout.tsx resolve the theme before paint.
export function usePrefs(lang: Lang) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    // The root layout is shared, so its <html lang> says "en" until this (or the inline script) corrects it.
    document.documentElement.lang = htmlLang[lang];
  }, [lang]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return { lang, theme, toggleTheme };
}

const themeLabels: Record<Lang, { light: string; dark: string }> = {
  en: { light: "Switch to light theme", dark: "Switch to dark theme" },
  es: { light: "Cambiar a tema claro", dark: "Cambiar a tema oscuro" },
  pt: { light: "Mudar para tema claro", dark: "Mudar para tema escuro" },
};

// `page` overrides the current page (the 404 only knows its address after it mounts).
export function Controls({ lang, theme, toggleTheme, label, page }: ReturnType<typeof usePrefs> & { label: string; page?: string }) {
  // Each language button is a link to this same page in that language.
  const here = splitPath(usePathname() ?? "/").path;
  const path = page ?? here;
  return (
    <div className="controls">
      <div className="langs" role="group" aria-label={label}>
        {langs.map((l) => (
          <Link
            key={l.code}
            href={localePath(l.code, path)}
            lang={l.code}
            hrefLang={l.code}
            aria-current={l.code === lang ? "true" : undefined}
            title={l.label}
            // An explicit choice, so a visit to the bare path doesn't send this visitor back to their browser's language.
            onClick={() => {
              try {
                localStorage.setItem("lang", l.code);
              } catch {}
            }}
          >
            {l.code.toUpperCase()}
          </Link>
        ))}
      </div>
      <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? themeLabels[lang].light : themeLabels[lang].dark}>
        {theme === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
