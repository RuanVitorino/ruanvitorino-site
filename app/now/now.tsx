"use client";

import Link from "next/link";
import { more } from "../more-copy";
import { person } from "../person";
import { Controls, usePrefs } from "../prefs";
import { Reveal } from "../bits";
import { Motion } from "../motion";
import { localePath } from "../paths";
import type { Lang } from "../content";

export default function Now({ lang: pageLang }: { lang: Lang }) {
  const prefs = usePrefs(pageLang);
  const { lang } = prefs;
  const t = more[lang].nowPage;
  const p = person[lang];
  return (
    <main className="page" key={lang}>
      <Motion />
      <div className="band slim">
      <header className="top">
        <Link className="back" href={localePath(lang, "/")}>
          Ruan Vitorino
        </Link>
        <Controls {...prefs} label={p.langLabel} />
      </header>
      <h1 className="title">
        <Reveal text={t.title} />
      </h1>
      <p className="lead">{t.updated}</p>
      </div>
      {t.sections.map((s) => (
        <section key={s.title} data-reveal>
          <h2>{s.title}</h2>
          <ul className="points checks">
            {s.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      ))}
      <p className="home-link">
        <Link href={localePath(lang, "/")}>{t.back}</Link>
      </p>
    </main>
  );
}
