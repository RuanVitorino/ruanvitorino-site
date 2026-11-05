"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "./content";
import { ai } from "./ai-copy";

const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Page motion, kept to one job: sections fade and rise once as they enter the viewport.
export function Motion() {
  useEffect(() => {
    const reduce = still();
    document.documentElement.classList.add("motion");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add("in");
          io.unobserve(e.target);
        }
      },
      // Threshold 0: tall sections on phones must start as soon as their top edge shows.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => (reduce ? t.classList.add("in") : io.observe(t)));
    return () => io.disconnect();
  });
  return null;
}

export function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${reverse ? "rev" : ""}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function AiSection({ lang }: { lang: Lang }) {
  const t = ai[lang];
  return (
    <section className="ai" aria-labelledby="ai-title" data-reveal>
      <h2 id="ai-title">{t.title}</h2>
      <p className="ai-sub">{t.sub}</p>

      <div className="ai-grid">
        {[t.work].map((col) => (
          <div className="ai-col" key={col.title} data-tilt>
            <ul>
              {col.items.map((it) => (
                <li key={it.k}>
                  <strong>{it.k}</strong>
                  <span>{it.v}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// Fine gold dust drifting up through the band; paused when off screen or when motion is reduced.
export function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || still()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const n = Math.round(Math.min(90, (w * h) / 9000));
    const dots = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      v: 0.15 + Math.random() * 0.45,
      d: Math.random() * Math.PI * 2,
      t: Math.random() * Math.PI * 2,
    }));
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
    io.observe(canvas);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of dots) {
        p.y -= p.v;
        p.d += 0.01;
        p.t += 0.03;
        p.x += Math.sin(p.d) * 0.25;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.t));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 200, 110, ${a})`;
        ctx.shadowColor = "rgba(232, 200, 110, 0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas className="dust" ref={ref} aria-hidden="true" />;
}

// First visit of the session: the RV monogram is drawn in gold, then the curtain lifts.
export function Intro() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".intro");
    if (!el) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro") === "1";
      sessionStorage.setItem("intro", "1");
    } catch {}
    if (seen || still()) {
      el.remove();
      return;
    }
    el.classList.add("play");
    const t = setTimeout(() => el.remove(), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox="0 0 120 80" width="160" height="107">
        <text x="6" y="64">RV</text>
      </svg>
      <span className="intro-line" />
    </div>
  );
}

// A gold ring that trails the pointer and swells over anything clickable (fine pointers only).
export function Cursor() {
  useEffect(() => {
    if (still() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ring = document.createElement("div");
    ring.className = "cursor";
    document.body.appendChild(ring);
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hot = (e.target as HTMLElement).closest("a, button, [data-tilt], input");
      ring.classList.toggle("hot", Boolean(hot));
      ring.classList.add("on");
    };
    const leave = () => ring.classList.remove("on");
    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
    };
    loop();
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    // Gold sparks burst from buttons when clicked.
    const burst = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest(".btn, .talk-mail, .chips button");
      if (!b) return;
      for (let i = 0; i < 12; i++) {
        const s = document.createElement("span");
        s.className = "spark";
        const a = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
        const d = 30 + Math.random() * 40;
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        s.style.setProperty("--sx", `${Math.cos(a) * d}px`);
        s.style.setProperty("--sy", `${Math.sin(a) * d}px`);
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 700);
      }
    };
    document.addEventListener("click", burst);
    return () => {
      cancelAnimationFrame(raf);
      ring.remove();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("click", burst);
    };
  }, []);
  return null;
}

// Compact bar that slides in once the opening band has scrolled away.
export function MiniBar({ name, cta, href }: { name: string; cta: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const band = document.querySelector<HTMLElement>(".band");
    if (!el || !band) return;
    const on = () => el.classList.toggle("show", band.getBoundingClientRect().bottom < 0);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="minibar" ref={ref} aria-hidden="true">
      <span className="mini-mark">
        R<b>V</b>
      </span>
      <span className="mini-name">{name}</span>
      <a className="btn primary" href={href} tabIndex={-1}>
        {cta}
      </a>
    </div>
  );
}

// Circular badge in the band: text on a ring that spins slowly and faster while scrolling.
export function Badge({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    let a = 0;
    let last = scrollY;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dy = scrollY - last;
      last = scrollY;
      a += 0.15 + Math.abs(dy) * 0.25;
      el.style.transform = `rotate(${a}deg)`;
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="badge" aria-hidden="true">
      <div className="badge-ring" ref={ref}>
        <svg viewBox="0 0 120 120">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#badge-circle">{text}</textPath>
          </text>
        </svg>
      </div>
      <span className="badge-core">
        R<b>V</b>
      </span>
    </div>
  );
}

// Labels "decode" from random characters into the real text when they come into view.
export function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+#*";
    let raf = 0;
    const io = new IntersectionObserver((e) => {
      if (!e.some((x) => x.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const run = (now: number) => {
        const k = Math.min(1, (now - start) / 900);
        const n = Math.floor(text.length * k);
        el.textContent = text
          .split("")
          .map((c, i) => (i < n || c === " " ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join("");
        if (k < 1) raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);
  return (
    <span ref={ref} aria-label={text}>
      {text}
    </span>
  );
}

// Signature piece: hundreds of gold particles assemble into the RV monogram, flee the pointer,
// settle back, and scatter into dust as the page scrolls. Canvas only, paused off screen.
export function GoldMark() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = still();
    const dpr = Math.min(2, devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; r: number; t: number; sx: number; sy: number };
    let ps: P[] = [];
    let mx = -9999;
    let my = -9999;

    // Sample the monogram's pixels from an offscreen canvas to get each particle's home.
    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fit the monogram in the free space right of the 712px text column; otherwise sit behind it, faded.
      const colRight = (w + 712) / 2;
      const room = w - colRight;
      const beside = room >= 300;
      canvas.dataset.behind = beside ? "0" : "1";
      const size = beside ? Math.min(h * 0.55, room * 0.78) : Math.min(h * 0.5, w * 0.3);
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d");
      if (!o) return;
      const family = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "sans-serif";
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = `800 ${size}px ${family}, sans-serif`;
      const cx = beside ? colRight + room / 2 : w * 0.5;
      o.fillText("RV", cx, h * 0.42);
      const data = o.getImageData(0, 0, w, h).data;
      const gap = Math.max(4, Math.round(size / 72));
      const homes: [number, number][] = [];
      for (let y = 0; y < h; y += gap)
        for (let x = 0; x < w; x += gap) if (data[(y * w + x) * 4 + 3] > 128) homes.push([x, y]);
      ps = homes.map(([tx, ty]) => ({
        x: Math.random() * w,
        y: h + Math.random() * h * 0.5,
        tx,
        ty,
        vx: 0,
        vy: 0,
        r: 0.8 + Math.random() * 1.2,
        t: Math.random() * Math.PI * 2,
        sx: (Math.random() - 0.5) * 2,
        sy: -Math.random(),
      }));
      // "#mark" in the URL shows it already formed (used to check the shape).
      if (reduce || location.hash === "#mark") ps.forEach((p) => ((p.x = p.tx), (p.y = p.ty)));
    };
    build();

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
    io.observe(canvas);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      // 0 at the top of the page, 1 once the band has mostly scrolled away.
      const s = Math.min(1, Math.max(0, scrollY / (h * 0.8)));
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.t += 0.04;
        const hx = p.tx + p.sx * s * w * 0.35;
        const hy = p.ty + p.sy * s * h * 0.9;
        if (!reduce) {
          let ax = (hx - p.x) * 0.045;
          let ay = (hy - p.y) * 0.045;
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const f = (9000 - d2) / 9000;
            ax += (dx / Math.sqrt(d2 + 0.01)) * f * 6;
            ay += (dy / Math.sqrt(d2 + 0.01)) * f * 6;
          }
          p.vx = (p.vx + ax) * 0.82;
          p.vy = (p.vy + ay) * 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }
        const a = (0.6 + 0.4 * Math.sin(p.t)) * (1 - s * 0.6);
        ctx.fillStyle = `rgba(${226 + Math.round(20 * Math.sin(p.t))}, ${190 + Math.round(15 * Math.sin(p.t * 0.7))}, 100, ${a})`;
        ctx.fillRect(p.x, p.y, p.r * 1.6, p.r * 1.6);
      }
    };
    draw();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(build, 200);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    // Rebuild once the display font has loaded so the monogram uses it.
    document.fonts?.ready.then(build);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(rt);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas className="goldmark" ref={ref} aria-hidden="true" />;
}
