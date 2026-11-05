"use client";

import Link from "next/link";
import { copy, extras } from "./content";
import Agent from "./agent";
import { person } from "./person";
import { Controls, usePrefs } from "./prefs";
import { Reveal, Status, TransitionLink } from "./bits";
import { hero } from "./hero-copy";
import { HeroChat } from "./hero-chat";
import { AiSection, Cursor, Intro, MiniBar, Motion, Scramble } from "./motion";


const thumbs: Record<string, string> = {
  smileia: "/shots/smile-hero-800.jpg",
  appmulti: "/shots/appmulti-insights-800.jpg",
  protocolos: "/shots/protocolos-ficha-800.jpg",
};

// Second screenshot shown when the card is hovered.
const thumbs2: Record<string, string> = {
  smileia: "/shots/smile-agente-800.jpg",
  protocolos: "/shots/protocolos-inicio-800.jpg",
};

const live = new Set(["smileia"]);



export default function Home({ live: agentLive }: { live: boolean }) {
  const prefs = usePrefs();
  const { lang } = prefs;
  const t = copy[lang];
  const p = person[lang];
  const h = hero[lang];
  const featured = p.featured.map((id) => t.projects.find((x) => x.id === id)!).filter(Boolean);
  const others = ["tempsocial", "tempwhats", "garimpeiro"].map((id) => t.projects.find((x) => x.id === id)!).filter(Boolean);

  return (
    <main className="page" key={lang}>
      <Motion />
      <Intro />
      <Cursor />
      <MiniBar name="Ruan Vitorino" cta={h.seeWork} href="#work" />
      <div className="band">
      <header className="top">
        <div className="me">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ruan.jpg" alt="" width={48} height={48} />
          <div>
            <p className="me-name">
              <Reveal text="Ruan Vitorino" />
            </p>
            <p>
              {p.role} · {p.location}
            </p>
          </div>
        </div>
        <Controls {...prefs} label={p.langLabel} />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
        <h1 id="hero-title">
          <Reveal text={h.headline} by="word" delay={300} goldFrom={5} />
        </h1>
        <p className="hero-sub">{h.sub}</p>
        <div className="row">
          <a className="btn primary" href="#work" data-magnetic>
            {h.seeWork}
          </a>
          <a className="btn" href={t.cvFile} download data-magnetic>
            {h.cv}
          </a>
        </div>
        </div>
        <HeroChat lang={lang} />
      </section>

      </div>

      <ul className="proofs" data-reveal>
        {h.proofs.map((x, i) => {
          const n = x.k.match(/^(\d+)(.*)$/);
          return (
          <li key={x.k} data-tilt>
            <strong>
              {i === 0 && <span className="live" aria-hidden="true" />}
              {n ? (
                <span>
                  <span data-count={n[1]}>{n[1]}</span>
                  {n[2]}
                </span>
              ) : (
                <Scramble text={x.k} />
              )}
            </strong>
            <span>{x.v}</span>
          </li>
          );
        })}
      </ul>

      <section aria-labelledby="work" id="work" data-reveal>
        <h2 className="label" id="work-title">
          {p.workTitle}
        </h2>
        <div className="work">
          {featured.map((x) => {
            const [role, period] = x.meta.split(" · ");
            return (
              <TransitionLink key={x.id} className="case" href={`/work/${x.id}`} tilt>
                <div>
                  <h3 style={{ viewTransitionName: `t-${x.id}` }}>{x.name}</h3>
                  {live.has(x.id) && <Status lang={lang} id={x.id} />}
                  <p>{x.summary}</p>
                  <p className="proof">
                    <b>{role}</b> · {period}
                  </p>
                  <span className="more">{p.howItWorks}</span>
                </div>
                {thumbs[x.id] ? (
                  <div className={`thumb ${thumbs2[x.id] ? "swap" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbs[x.id]} alt="" loading="lazy" width={800} height={500} />
                    {thumbs2[x.id] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="alt" src={thumbs2[x.id]} alt="" loading="lazy" width={800} height={500} />
                    )}
                  </div>
                ) : (
                  <div className="thumb words" aria-hidden="true">
                    {x.stack.slice(0, 4).map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                )}
              </TransitionLink>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="exp" data-reveal>
        <h2 id="exp" className="label">
          {t.expTitle}
        </h2>
        <ul className="list rows timeline">
          {t.jobs.map((j) => (
            <li key={j.org}>
              <strong>
                {j.role}, {j.org}
              </strong>
              <time>{j.when}</time>
            </li>
          ))}
          {t.edu.map((e) => (
            <li key={e.title}>
              <strong>{e.title}</strong>
              <time>{e.detail}</time>
            </li>
          ))}
        </ul>
        <p className="spoken">{t.spoken.join(" · ")}</p>
      </section>

      <AiSection lang={lang} />

      <Agent a={p.agent} lang={lang} live={agentLive} />

      <section aria-labelledby="others" data-reveal>
        <h2 id="others" className="label">
          {p.othersTitle}
        </h2>
        <ul className="list">
          {others.map((x) => (
            <li key={x.id}>
              <Link href={`/work/${x.id}`}>
                <strong>{x.name}</strong>
                <span>{x.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="also">{p.alsoNote}</p>
      </section>

      <section className="talk endband" aria-labelledby="contact" data-reveal>
        <h2 id="contact">
          <Reveal text={h.talk} by="word" onView delay={0} />
        </h2>
        <p>{h.talkSub}</p>
        <a className="talk-mail" href="mailto:ruanrvitorino@gmail.com" data-magnetic>
          ruanrvitorino@gmail.com
        </a>
        <div className="row">
          <a className="btn" href={t.cvFile} download>
            {p.cv}
          </a>
          <a className="btn" href="https://www.linkedin.com/in/ruan-vitorino/" target="_blank" rel="me noopener">
            LinkedIn
          </a>
          <a className="btn" href="https://github.com/RuanVitorino" target="_blank" rel="me noopener">
            GitHub
          </a>
          <a className="btn" href="https://www.instagram.com/ruanrvitorino/" target="_blank" rel="me noopener">
            Instagram
          </a>
          <Link className="btn" href="/now">
            /now
          </Link>
        </div>
      </section>

      <footer className="footer">{t.footer}</footer>
    </main>
  );
}
