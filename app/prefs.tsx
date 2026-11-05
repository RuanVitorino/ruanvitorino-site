"use client";

import { useEffect, useState } from "react";
import { langs, type Lang } from "./content";

type Theme = "light" | "dark";

const isLang = (v: string | null): v is Lang => v === "en" || v === "es" || v === "pt";

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (isLang(saved)) return saved;
  } catch {}
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("pt")) return "pt";
  return "en";
}

// Language and theme shared by every page. The inline scripts in layout.tsx resolve both before paint.
export function usePrefs() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setLang(initialLang());
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang === "pt" ? "pt-BR" : lang;
    if (!root.dataset.wait || root.dataset.wait === lang) delete root.dataset.wait;
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return { lang, setLang, theme, toggleTheme };
}

const themeLabels: Record<Lang, { light: string; dark: string }> = {
  en: { light: "Switch to light theme", dark: "Switch to dark theme" },
  es: { light: "Cambiar a tema claro", dark: "Cambiar a tema oscuro" },
  pt: { light: "Mudar para tema claro", dark: "Mudar para tema escuro" },
};

export function Controls({
  lang,
  setLang,
  theme,
  toggleTheme,
  label,
}: ReturnType<typeof usePrefs> & { label: string }) {
  return (
    <div className="controls">
      <div className="langs" role="group" aria-label={label}>
        {langs.map((l) => (
          <button key={l.code} type="button" lang={l.code} aria-pressed={l.code === lang} title={l.label} onClick={() => setLang(l.code)}>
            {l.code.toUpperCase()}
          </button>
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
