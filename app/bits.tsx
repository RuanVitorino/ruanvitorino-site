"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import type { Lang } from "./content";
import { more } from "./more-copy";

// Hours between a time zone and Brazil (UTC-3), at this moment (handles European summer time).
function hoursAhead(zone: string) {
  const now = new Date();
  const at = (tz: string) => {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, hour: "2-digit", minute: "2-digit", day: "2-digit" }).formatToParts(now);
    const get = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
    return get("day") * 24 * 60 + (get("hour") % 24) * 60 + get("minute");
  };
  return Math.round((at(zone) - at("America/Sao_Paulo")) / 60);
}

export function LocalTime({ lang }: { lang: Lang }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  const time = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang, { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" }).format(now);
  const t = more[lang];
  return (
    <span className="clock">
      <b>{time}</b> {t.local} · {t.vsEurope(hoursAhead("Europe/Madrid"), hoursAhead("Europe/Lisbon"))}
    </span>
  );
}

// Text comes into focus piece by piece: letters for short names, words for sentences.
// Screen readers get the plain text; the animated pieces are hidden from them.
export function Reveal({ text, by = "letter", onView = false, delay = 120, goldFrom }: { text: string; by?: "letter" | "word"; onView?: boolean; delay?: number; goldFrom?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(!onView);
  useEffect(() => {
    if (!onView) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onView]);
  const parts = by === "letter" ? [...text] : text.split(" ");
  const step = by === "letter" ? 38 : 70;
  return (
    <span className={`reveal ${go ? "go" : ""}`} ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {by === "letter"
          ? // Letters animate one by one, but stay grouped per word so lines only break between words.
            (() => {
              let n = 0;
              const words = text.split(" ");
              return words.map((w, wi) => (
                <Fragment key={wi}>
                  <span className="w">
                    {[...w].map((c) => {
                      const k = n++;
                      return (
                        <span key={k} style={{ animationDelay: `${delay + k * step}ms` }}>
                          {c}
                        </span>
                      );
                    })}
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </Fragment>
              ));
            })()
          : parts.map((c, i) => (
              // A real space between words keeps normal line breaking.
              <Fragment key={i}>
                <span className={goldFrom !== undefined && i >= goldFrom ? "gold-word" : undefined} style={{ animationDelay: `${delay + i * step}ms` }}>
                  {c}
                </span>
                {i < parts.length - 1 ? " " : null}
              </Fragment>
            ))}
      </span>
    </span>
  );
}

// A list whose rows show a floating preview that follows the pointer on hover devices.
export function HoverList({ items }: { items: { href: string; title: string; text: string; img?: string }[] }) {
  const [img, setImg] = useState<string | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    const el = card.current;
    if (el) el.style.transform = `translate(${e.clientX + 18}px, ${e.clientY - 70}px)`;
  };
  return (
    <div className="hoverlist" onMouseMove={move} onMouseLeave={() => setImg(null)}>
      <ul className="list">
        {items.map((x) => (
          <li key={x.href} onMouseEnter={() => setImg(x.img ?? null)}>
            <Link href={x.href}>
              <strong>{x.title}</strong>
              <span>{x.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`float ${img ? "on" : ""}`} ref={card} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {img && <img src={img} alt="" />}
      </div>
    </div>
  );
}

// Live check of a product's public app, via our own API route.
export function Status({ lang, id }: { lang: Lang; id: string }) {
  const [state, setState] = useState<"checking" | "online" | "offline">("checking");
  useEffect(() => {
    let alive = true;
    fetch(`/api/status?id=${id}`)
      .then((r) => r.json())
      .then((j) => alive && setState(j.up ? "online" : "offline"))
      .catch(() => alive && setState("offline"));
    return () => {
      alive = false;
    };
  }, [id]);
  const t = more[lang].status;
  return (
    <span className={`status ${state}`}>
      <span className="dot" aria-hidden="true" />
      {t[state]}
    </span>
  );
}

// Clickable architecture: pick a part, read what it does.
export function Arch({ lang, parts }: { lang: Lang; parts: { title: string; text: string }[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  // Walks through the parts on its own while visible, until someone picks one.
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
    if (box.current) io.observe(box.current);
    const id = setInterval(() => visible && setI((k) => (k + 1) % parts.length), 3600);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [auto, parts.length]);
  return (
    <div className={`arch ${auto ? "auto" : ""}`} ref={box}>
      <p className="arch-hint">{more[lang].arch}</p>
      <div className="arch-nodes" role="tablist">
        {parts.map((p, k) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => {
              setAuto(false);
              setI(k);
            }}
          >
            {p.title}
            {k === i && <span className="arch-timer" key={i} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <p className="arch-text" role="tabpanel" key={i}>
        {parts[i].text}
      </p>
    </div>
  );
}

export function BeforeAfter({ lang }: { lang: Lang }) {
  const t = more[lang].before;
  const [on, setOn] = useState(false);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setOn((v) => !v), 4200);
    return () => clearInterval(id);
  }, [auto]);
  const steps = on ? t.with : t.without;
  return (
    <section className="ba" aria-labelledby="ba-title">
      <h2 id="ba-title">{t.title}</h2>
      <div className="ba-switch" role="group">
        <button
          type="button"
          aria-pressed={!on}
          onClick={() => {
            setAuto(false);
            setOn(false);
          }}
        >
          {t.off}
        </button>
        <button
          type="button"
          aria-pressed={on}
          onClick={() => {
            setAuto(false);
            setOn(true);
          }}
        >
          {t.on}
        </button>
      </div>
      <ol className={`ba-steps ${on ? "good" : "bad"}`} key={String(on)}>
        {steps.map((s, i) => (
          <li key={s} style={{ animationDelay: `${i * 70}ms` }}>
            {s}
          </li>
        ))}
      </ol>
      <p className="demo-note">{t.note}</p>
    </section>
  );
}

// Cross-fade the project title from the card into the project page (View Transitions where supported).
type VTDoc = Document & { startViewTransition?: (cb: () => Promise<void> | void) => unknown };
declare global {
  interface Window {
    __vtDone?: () => void;
  }
}

export function TransitionLink({ href, className, children, tilt }: { href: string; className?: string; children: ReactNode; tilt?: boolean }) {
  const router = useRouter();
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    const doc = document as VTDoc;
    if (!doc.startViewTransition || e.metaKey || e.ctrlKey || e.shiftKey || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          window.__vtDone = resolve;
          router.push(href);
          setTimeout(resolve, 900);
        }),
    );
  };
  return (
    <Link href={href} className={className} onClick={go} data-tilt={tilt || undefined}>
      {children}
    </Link>
  );
}

// Called by the destination page once it has rendered.
export function useTransitionDone() {
  useEffect(() => {
    window.__vtDone?.();
    window.__vtDone = undefined;
  }, []);
}

// A screenshot inside a light browser frame, with the page's address in the bar.
export function Frame({ url, src, alt, eager, srcSet }: { url: string; src: string; alt: string; eager?: boolean; srcSet?: string }) {
  return (
    <div className="frame">
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        {url && <em>{url}</em>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} srcSet={srcSet} sizes={srcSet ? "(min-width: 720px) 680px, 100vw" : undefined} alt={alt} loading={eager ? "eager" : "lazy"} />
    </div>
  );
}
