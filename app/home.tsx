"use client";

import Link from "next/link";
import { copy, extras } from "./content";
import Agent from "./agent";
import { person } from "./person";
import { Controls, usePrefs } from "./prefs";
import { localePath } from "./paths";
import type { Lang } from "./content";
import { LocalTime, Status, TransitionLink } from "./bits";
import { hero } from "./hero-copy";
import { HeroChat } from "./hero-chat";
import { ai } from "./ai-copy";

// The screenshot each card shows. Its description comes from the same entry the project page uses.
const thumbs: Record<string, string> = {
  smileia: "/shots/smile-hero.jpg",
  appmulti: "/shots/appmulti-insights.jpg",
  protocolos: "/shots/protocolos-ficha.jpg",
};

const photoAlt = { en: "Photo of Ruan Vitorino", es: "Foto de Ruan Vitorino", pt: "Foto de Ruan Vitorino" } as const;

const live = new Set(["smileia"]);

// Lucide paths, drawn at one size and stroke across the page.
const paths = {
  check2: (
    <>
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-7.5 7.5L13 16" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  out: (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  down: (
    <>
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </>
  ),
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  plug: (
    <>
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </>
  ),
};

export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg className="hm-i" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const wayIcons: (keyof typeof paths)[] = ["code", "plug", "user"];
const current = /hoje|now|hoy/;

export default function Home({ lang: pageLang, live: agentLive }: { lang: Lang; live: boolean }) {
  const prefs = usePrefs(pageLang);
  const { lang } = prefs;
  const t = copy[lang];
  const p = person[lang];
  const h = hero[lang];
  const a = ai[lang];
  const featured = p.featured.map((id) => t.projects.find((x) => x.id === id)!).filter(Boolean);
  const others = ["tempsocial", "tempwhats", "garimpeiro"].map((id) => t.projects.find((x) => x.id === id)!).filter(Boolean);

  return (
    <main className="hm" key={lang}>
      <div className="hm-wrap">
        <header className="hm-top">
          <div className="hm-me">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ruan.jpg" alt={photoAlt[lang]} width={40} height={40} />
            <div>
              <p className="hm-name">Ruan Vitorino</p>
              <p>
                {p.role} · {p.location}
              </p>
            </div>
          </div>
          <Controls {...prefs} label={p.langLabel} />
        </header>

        <section className="hm-hero" aria-labelledby="hero-title">
          <div>
            <h1 id="hero-title" className="hm-rise">
              {h.headline}
            </h1>
            <p className="hm-lede hm-rise">{h.sub}</p>
            <div className="hm-actions hm-rise">
              <a className="hm-btn hm-primary" href="#work">
                {h.seeWork}
              </a>
              <a className="hm-btn hm-secondary" href={t.cvFile} download>
                <Icon name="down" />
                {h.cv}
              </a>
            </div>
          </div>
          <HeroChat lang={lang} />
        </section>

        <ul className="hm-facts">
          {h.proofs.map((x, i) => (
            <li key={x.k}>
              <b>
                {i < 2 && <Icon name="check2" />}
                {x.k}
              </b>
              <span>{x.v}</span>
            </li>
          ))}
        </ul>

        <section className="hm-block" id="seeking" aria-labelledby="seek-title">
          <h2 id="seek-title">{p.seeking.title}</h2>
          <dl className="hm-rows">
            {p.seeking.items.map((it) => (
              <div key={it.k}>
                <dt>{it.k}</dt>
                <dd>{it.v}</dd>
              </div>
            ))}
            <div>
              <dt>{p.seeking.zone.k}</dt>
              <dd>
                {p.seeking.zone.v}
                <LocalTime lang={lang} />
              </dd>
            </div>
          </dl>
        </section>

        <section className="hm-block" id="work" aria-labelledby="work-title">
          <h2 id="work-title">{p.workTitle}</h2>
          <div className="hm-work">
            {featured.map((x, i) => {
              const [role, period] = x.meta.split(" · ");
              const shot = thumbs[x.id];
              const shotAlt = extras[lang].shots[x.id]?.find((s) => s.src === shot)?.alt ?? "";
              const wide = i === 0 || !shot;
              return (
                <TransitionLink key={x.id} className={`hm-proj${wide ? " wide" : ""}${shot ? "" : " plain"}`} href={localePath(lang, `/work/${x.id}`)}>
                  {shot && (
                    <div className="hm-shot">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={shot.replace(".jpg", "-800.jpg")} alt={shotAlt} loading="lazy" width={800} height={500} />
                    </div>
                  )}
                  <div className="hm-proj-body">
                    <h3 style={{ viewTransitionName: `t-${x.id}` }}>
                      {x.name}
                      {live.has(x.id) && <Status lang={lang} id={x.id} />}
                    </h3>
                    <p>{x.summary}</p>
                    <div className="hm-tags">
                      {x.stack.slice(0, 4).map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <p className="hm-role">
                      <b>{role}</b> · {period}
                    </p>
                    <span className="hm-more">
                      {p.howItWorks} <Icon name="arrow" />
                    </span>
                  </div>
                </TransitionLink>
              );
            })}
          </div>
        </section>

        <section className="hm-block" aria-labelledby="exp">
          <h2 id="exp">{t.expTitle}</h2>
          <div>
            <ol className="hm-timeline">
              {t.jobs.map((j) => (
                <li key={j.org}>
                  <i className={current.test(j.when) ? "now" : ""} aria-hidden="true" />
                  <div>
                    <b>{j.role}</b>
                    <span>{j.org}</span>
                    <p>{j.text}</p>
                  </div>
                  <time>{j.when}</time>
                </li>
              ))}
              {t.edu.map((e) => {
                const [school, when] = e.detail.split(" · ");
                return (
                  <li key={e.title}>
                    <i aria-hidden="true" />
                    <div>
                      <b>{e.title}</b>
                      <span>{school}</span>
                    </div>
                    <time>{when}</time>
                  </li>
                );
              })}
            </ol>
            <p className="hm-note">{t.spoken.join(" · ")}</p>
          </div>
        </section>

        <section className="hm-block" aria-labelledby="stack">
          <h2 id="stack">{t.nav.stack}</h2>
          <dl className="hm-rows">
            {t.stack.map((g) => (
              <div key={g.group}>
                <dt>{g.group}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="hm-block" aria-labelledby="ai-title">
          <div>
            <h2 id="ai-title">{a.title}</h2>
            <p className="hm-block-sub">{a.sub}</p>
          </div>
          <div>
            <ul className="hm-ways">
              {a.work.items.map((it, i) => (
                <li key={it.k} className={i === 2 ? "mine" : ""}>
                  <b>
                    <Icon name={wayIcons[i] ?? "code"} />
                    {it.k}
                  </b>
                  <p>{it.v}</p>
                </li>
              ))}
            </ul>
            <div className="hm-agent">
              <Agent a={p.agent} lang={lang} live={agentLive} />
            </div>
          </div>
        </section>

        <section className="hm-block" aria-labelledby="others">
          <h2 id="others">{p.othersTitle}</h2>
          <div>
            <ul className="hm-others">
              {others.map((x) => (
                <li key={x.id}>
                  <Link href={localePath(lang, `/work/${x.id}`)}>
                    <b>{x.name}</b>
                    <p>{x.summary}</p>
                    <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="hm-note">{p.alsoNote}</p>
          </div>
        </section>
      </div>

      <section className="hm-contact" aria-labelledby="contact">
        <div className="hm-wrap">
          <h2 id="contact">{h.talk}</h2>
          <div>
            <p>{h.talkSub}</p>
            <a className="hm-mail" href="mailto:ruanrvitorino@gmail.com">
              ruanrvitorino@gmail.com
            </a>
            <div className="hm-links">
              <a className="hm-btn hm-secondary" href={t.cvFile} download>
                {p.cv}
              </a>
              <a className="hm-btn hm-secondary" href="https://www.linkedin.com/in/ruan-vitorino/" target="_blank" rel="me noopener">
                LinkedIn <Icon name="out" />
              </a>
              <a className="hm-btn hm-secondary" href="https://github.com/RuanVitorino" target="_blank" rel="me noopener">
                GitHub <Icon name="out" />
              </a>
              <a className="hm-btn hm-secondary" href="https://www.instagram.com/ruanrvitorino/" target="_blank" rel="me noopener">
                Instagram <Icon name="out" />
              </a>
              <Link className="hm-btn hm-secondary" href={localePath(lang, "/now")}>
                /now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="hm-footer">
        <div className="hm-wrap">{t.footer}</div>
      </footer>
    </main>
  );
}
