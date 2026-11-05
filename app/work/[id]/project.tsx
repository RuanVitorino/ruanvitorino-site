"use client";

import Link from "next/link";
import { copy, extras } from "../../content";
import { person } from "../../person";
import { Controls, usePrefs } from "../../prefs";
import SmileDemo from "./demo";
import { Arch, BeforeAfter, Frame, HoverList, Reveal, Status, useTransitionDone } from "../../bits";
import { AppMultiDemo, TaxCalc } from "../../demos";
import { Cursor, Motion } from "../../motion";

const nextLabel = { en: "Next project", es: "Siguiente proyecto", pt: "Próximo projeto" } as const;

export default function Project({ id }: { id: string }) {
  const prefs = usePrefs();
  useTransitionDone();
  const { lang } = prefs;
  const t = copy[lang];
  const p = person[lang];
  const x = t.projects.find((y) => y.id === id);
  if (!x) return null;
  const [role, period] = x.meta.split(" · ");
  const shots = extras[lang].shots[id] ?? [];
  const others = t.projects.filter((y) => y.id !== id);
  const idx = t.projects.findIndex((y) => y.id === id);
  const next = t.projects[(idx + 1) % t.projects.length];

  return (
    <main className="page" key={lang}>
      <Motion />
      <Cursor />
      <div className="band slim">
        <header className="top">
          <Link className="back" href="/">
            Ruan Vitorino
          </Link>
          <Controls {...prefs} label={p.langLabel} />
        </header>

        <h1 className="title" style={{ viewTransitionName: `t-${x.id}` }}>
          <Reveal text={x.name} />
        </h1>
        {id === "smileia" && <Status lang={lang} id="smileia" />}
        <p className="lead">
          <Reveal text={x.summary} by="word" delay={450} />
        </p>
      </div>

      <dl className="facts" data-reveal>
        <div>
          <dt>{p.page.role}</dt>
          <dd>{role}</dd>
        </div>
        <div>
          <dt>{p.page.period}</dt>
          <dd>{period}</dd>
        </div>
        <div className="wide">
          <dt>{p.page.stack}</dt>
          <dd>{x.stack.join(", ")}</dd>
        </div>
      </dl>

      {id === "smileia" && <SmileDemo lang={lang} />}
      {id === "smileia" && <BeforeAfter lang={lang} />}
      {id === "appmulti" && <AppMultiDemo lang={lang} />}
      {id === "protheus" && <TaxCalc lang={lang} />}

      {shots.map((s) => (
        <figure key={s.src} className="shot" data-reveal>
          <Frame url={s.url} src={s.src} srcSet={`${s.src.replace(".jpg", "-800.jpg")} 800w, ${s.src} 1400w`} alt={s.alt} />
          <figcaption>{s.label}</figcaption>
        </figure>
      ))}

      <section aria-labelledby="what" data-reveal>
        <h2 id="what">{p.page.what}</h2>
        <ul className="points checks">
          {x.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" data-reveal>
        <h2 id="how">{p.page.how}</h2>
        <Arch lang={lang} parts={x.architecture} />
      </section>

      <section aria-labelledby="more" data-reveal>
        <h2 id="more" className="label">
          {p.page.more}
        </h2>
        <HoverList
          items={others.map((y) => {
            const first = extras[lang].shots[y.id]?.[0]?.src;
            return { href: `/work/${y.id}`, title: y.name, text: y.summary, img: first?.replace(".jpg", "-800.jpg") };
          })}
        />
        <p className="home-link">
          <Link href="/">{p.page.back}</Link>
        </p>
      </section>

      <Link className="nextcard" href={`/work/${next.id}`} data-reveal data-tilt>
        <span className="next-k">{nextLabel[lang]}</span>
        <strong>{next.name}</strong>
        <span className="next-v">{next.summary}</span>
        <span className="next-arrow" aria-hidden="true">
          →
        </span>
      </Link>

      <footer className="footer">{t.footer}</footer>
    </main>
  );
}
