"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "./content";

// The hero's live piece: a short, fictional WhatsApp conversation in which
// SmileIA's assistant books an appointment on its own. It plays in a loop while visible.

type Msg = { from: "p" | "ai"; text: string } | { from: "ok"; text: string };

const copy: Record<Lang, { clinic: string; status: string; note: string; times: string[]; event: { day: string; hour: string; title: string }; msgs: Msg[] }> = {
  pt: {
    clinic: "Clínica Sorriso",
    status: "IA respondendo · 21:47",
    note: "SmileIA no WhatsApp de uma clínica · dados fictícios",
    times: ["21:46", "21:46", "21:47", "21:47"],
    event: { day: "ter", hour: "10h", title: "Avaliação · Dra. Paula" },
    msgs: [
      { from: "p", text: "Oi! Tem horário pra avaliação essa semana?" },
      { from: "ai", text: "Oi, Juliana! Tenho terça às 10h ou quinta às 15h. Qual fica melhor?" },
      { from: "p", text: "Terça às 10h" },
      { from: "ai", text: "Pronto! Terça às 10h com a Dra. Paula. Te lembro na véspera." },
      { from: "ok", text: "Consulta marcada na agenda" },
    ],
  },
  en: {
    clinic: "Sorriso Dental Clinic",
    status: "AI replying · 9:47 pm",
    note: "SmileIA on a clinic's WhatsApp · fictional data",
    times: ["9:46 pm", "9:46 pm", "9:47 pm", "9:47 pm"],
    event: { day: "tue", hour: "10am", title: "Check-up · Dr. Paula" },
    msgs: [
      { from: "p", text: "Hi! Any slots for a check-up this week?" },
      { from: "ai", text: "Hi, Juliana! Tuesday at 10am or Thursday at 3pm. Which works better?" },
      { from: "p", text: "Tuesday at 10" },
      { from: "ai", text: "Done! Tuesday at 10am with Dr. Paula. I'll remind you the day before." },
      { from: "ok", text: "Appointment added to the calendar" },
    ],
  },
  es: {
    clinic: "Clínica Sorriso",
    status: "IA respondiendo · 21:47",
    note: "SmileIA en el WhatsApp de una clínica · datos ficticios",
    times: ["21:46", "21:46", "21:47", "21:47"],
    event: { day: "mar", hour: "10h", title: "Revisión · Dra. Paula" },
    msgs: [
      { from: "p", text: "¡Hola! ¿Hay hora para una revisión esta semana?" },
      { from: "ai", text: "¡Hola, Juliana! Martes a las 10h o jueves a las 15h. ¿Cuál te va mejor?" },
      { from: "p", text: "Martes a las 10h" },
      { from: "ai", text: "¡Listo! Martes a las 10h con la Dra. Paula. Te aviso el día antes." },
      { from: "ok", text: "Cita guardada en la agenda" },
    ],
  },
};

export function HeroChat({ lang }: { lang: Lang }) {
  const t = copy[lang];
  // Starts with the whole conversation on screen, so the card is never an empty box.
  const [shown, setShown] = useState(copy[lang].msgs.length);
  const [typing, setTyping] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(t.msgs.length);
      return;
    }
    let visible = true;
    const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
    if (box.current) io.observe(box.current);
    let n = t.msgs.length;
    setShown(n);
    let timer = 0;
    const wait = (ms: number, fn: () => void) => (timer = window.setTimeout(fn, ms));
    const step = () => {
      if (!visible) return wait(800, step);
      if (n >= t.msgs.length) {
        // Hold the finished conversation, then start over.
        return wait(4200, () => {
          n = 0;
          setShown(0);
          wait(700, step);
        });
      }
      const next = t.msgs[n];
      if (next.from === "ai") {
        setTyping(true);
        wait(1300, () => {
          setTyping(false);
          setShown(++n);
          wait(1100, step);
        });
      } else {
        setShown(++n);
        wait(next.from === "ok" ? 900 : 1000, step);
      }
    };
    step();
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [t]);

  const tick = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-7.5 7.5L13 16" />
    </svg>
  );

  return (
    <figure className="hchat" ref={box}>
      <div className="hchat-card" aria-label={t.note}>
        <div className="hchat-top" aria-hidden="true">
          <span className="hchat-av">S</span>
          <span>
            <b>{t.clinic}</b>
            <em>{t.status}</em>
          </span>
        </div>
        <ol className="hchat-body">
          {t.msgs.slice(0, shown).map((m, i) =>
            m.from === "ok" ? (
              <li key={i} className="hchat-ok">
                <span className="hchat-date" aria-hidden="true">
                  <small>{t.event.day}</small>
                  <strong>{t.event.hour}</strong>
                </span>
                <span>
                  <b>{t.event.title}</b>
                  <em>
                    {tick}
                    {m.text}
                  </em>
                </span>
              </li>
            ) : (
              <li key={i} className={`hchat-${m.from}`}>
                {m.text}
                <span className="hchat-meta">
                  {t.times[i]}
                  {m.from === "p" && tick}
                </span>
              </li>
            ),
          )}
          {typing && (
            <li className="hchat-ai hchat-typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </li>
          )}
        </ol>
      </div>
      <figcaption>{t.note}</figcaption>
    </figure>
  );
}
