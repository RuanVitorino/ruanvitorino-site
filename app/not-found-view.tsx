"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { copy, type Lang } from "./content";
import { person } from "./person";
import { Controls, usePrefs } from "./prefs";
import { HoverList, Reveal } from "./bits";
import { isLang, localePath, splitPath } from "./paths";

const text = {
  en: { title: "Page not found", lead: "There is no page at this address. The projects, the CV and the contact are on the home page." },
  es: { title: "Página no encontrada", lead: "No hay ninguna página en esta dirección. Los proyectos, el CV y el contacto están en la página de inicio." },
  pt: { title: "Página não encontrada", lead: "Não existe página neste endereço. Os projetos, o CV e o contato estão na página inicial." },
} as const;

// The 404 keeps the site's header, language and theme, and points to what the visitor was probably after.
export default function NotFoundView() {
  // The 404 is prerendered once, in English, whatever the address; the visitor's language is resolved after mount.
  const [where, setWhere] = useState<{ lang: Lang; path: string }>({ lang: "en", path: "/" });
  useEffect(() => {
    const here = splitPath(location.pathname);
    let lang = here.lang;
    // /es/... and /pt/... say their language; on a bare path, use the visitor's saved or browser language.
    if (lang === "en") {
      let l: string | null = null;
      try {
        l = localStorage.getItem("lang");
      } catch {}
      if (!isLang(l)) {
        const n = navigator.language.toLowerCase();
        l = n.startsWith("es") ? "es" : n.startsWith("pt") ? "pt" : "en";
      }
      lang = l as Lang;
    }
    setWhere({ lang, path: here.path });
  }, []);
  const prefs = usePrefs(where.lang);
  const { lang } = prefs;
  const t = text[lang];
  const c = copy[lang];
  const p = person[lang];
  return (
    <main className="page" key={lang}>
      <div className="band slim">
        <header className="top">
          <Link className="back" href={localePath(lang, "/")}>
            Ruan Vitorino
          </Link>
          <Controls {...prefs} page={where.path} label={p.langLabel} />
        </header>
        <h1 className="title">
          <Reveal text={t.title} />
        </h1>
        <p className="lead">{t.lead}</p>
      </div>
      <section aria-labelledby="nf-projects">
        <h2 id="nf-projects" className="label">
          {c.nav.projects}
        </h2>
        <HoverList items={c.projects.map((x) => ({ href: localePath(lang, `/work/${x.id}`), title: x.name, text: x.summary }))} />
        <p className="home-link">
          <Link href={localePath(lang, "/")}>{p.page.back}</Link>
        </p>
      </section>
    </main>
  );
}
