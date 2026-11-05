"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "../../content";

// A scripted, fictional conversation that shows what SmileIA's assistant does:
// qualify the lead, book the appointment, confirm attendance the day before.

type Step =
  | { kind: "patient" | "ai"; text: string; time: string }
  | { kind: "day"; text: string }
  | { kind: "event"; text: string; detail: string };

type Demo = {
  title: string;
  sub: string;
  clinic: string;
  status: string;
  panel: string;
  panelEmpty: string;
  replay: string;
  play: string;
  note: string;
  steps: Step[];
};

const demo: Record<Lang, Demo> = {
  pt: {
    title: "Veja funcionando",
    sub: "Uma paciente escreve fora do horário. A IA responde, marca a consulta e confirma a presença na véspera.",
    clinic: "Clínica Sorriso",
    status: "Assistente SmileIA",
    panel: "O que a clínica vê no sistema",
    panelEmpty: "Nada ainda. A conversa vai preencher isto.",
    replay: "Ver de novo",
    play: "Ver a conversa",
    note: "Simulação com dados fictícios. No SmileIA, a IA responde pelo WhatsApp da própria clínica.",
    steps: [
      { kind: "patient", text: "Oi! Quero clarear os dentes. Quanto fica?", time: "21:47" },
      { kind: "ai", text: "Oi, Juliana! O clareamento fica R$ 900, em até 3x. Quer marcar uma avaliação?", time: "21:47" },
      { kind: "event", text: "Novo lead", detail: "Juliana · Clareamento · R$ 900" },
      { kind: "patient", text: "Quero sim. Tem horário essa semana?", time: "21:48" },
      { kind: "ai", text: "Tenho terça às 10h ou quinta às 15h. Qual fica melhor?", time: "21:48" },
      { kind: "patient", text: "Terça às 10h", time: "21:49" },
      { kind: "ai", text: "Pronto! Terça às 10h com a Dra. Paula. Eu te lembro na véspera.", time: "21:49" },
      { kind: "event", text: "Consulta marcada", detail: "Ter 10:00 · Dra. Paula · Avaliação" },
      { kind: "day", text: "Segunda, 18:00" },
      { kind: "ai", text: "Oi, Juliana! Amanhã às 10h é sua avaliação. Você confirma?", time: "18:00" },
      { kind: "patient", text: "Confirmo!", time: "18:03" },
      { kind: "event", text: "Presença confirmada", detail: "Ter 10:00 · Juliana" },
    ],
  },
  en: {
    title: "See it work",
    sub: "A patient writes after hours. The AI answers, books the appointment and confirms attendance the day before.",
    clinic: "Sorriso Dental Clinic",
    status: "SmileIA assistant",
    panel: "What the clinic sees in the system",
    panelEmpty: "Nothing yet. The conversation will fill this in.",
    replay: "Play again",
    play: "Play the conversation",
    note: "Simulation with fictional data. In SmileIA, the AI answers from the clinic's own WhatsApp number.",
    steps: [
      { kind: "patient", text: "Hi! I'd like my teeth whitened. How much is it?", time: "21:47" },
      { kind: "ai", text: "Hi, Juliana! Whitening is R$ 900, up to 3 instalments. Would you like to book an assessment?", time: "21:47" },
      { kind: "event", text: "New lead", detail: "Juliana · Whitening · R$ 900" },
      { kind: "patient", text: "Yes please. Any time this week?", time: "21:48" },
      { kind: "ai", text: "I have Tuesday at 10am or Thursday at 3pm. Which works better?", time: "21:48" },
      { kind: "patient", text: "Tuesday at 10", time: "21:49" },
      { kind: "ai", text: "Done! Tuesday at 10am with Dr Paula. I'll remind you the day before.", time: "21:49" },
      { kind: "event", text: "Appointment booked", detail: "Tue 10:00 · Dr Paula · Assessment" },
      { kind: "day", text: "Monday, 18:00" },
      { kind: "ai", text: "Hi, Juliana! Your assessment is tomorrow at 10am. Can you confirm?", time: "18:00" },
      { kind: "patient", text: "Confirmed!", time: "18:03" },
      { kind: "event", text: "Attendance confirmed", detail: "Tue 10:00 · Juliana" },
    ],
  },
  es: {
    title: "Míralo funcionar",
    sub: "Una paciente escribe fuera de horario. La IA responde, reserva la cita y confirma la asistencia el día antes.",
    clinic: "Clínica Sorriso",
    status: "Asistente SmileIA",
    panel: "Lo que la clínica ve en el sistema",
    panelEmpty: "Nada todavía. La conversación lo irá rellenando.",
    replay: "Ver otra vez",
    play: "Ver la conversación",
    note: "Simulación con datos ficticios. En SmileIA, la IA responde desde el WhatsApp de la propia clínica.",
    steps: [
      { kind: "patient", text: "¡Hola! Quiero blanquearme los dientes. ¿Cuánto cuesta?", time: "21:47" },
      { kind: "ai", text: "¡Hola, Juliana! El blanqueamiento cuesta R$ 900, hasta en 3 pagos. ¿Quieres reservar una valoración?", time: "21:47" },
      { kind: "event", text: "Nuevo contacto", detail: "Juliana · Blanqueamiento · R$ 900" },
      { kind: "patient", text: "Sí. ¿Hay hueco esta semana?", time: "21:48" },
      { kind: "ai", text: "Tengo el martes a las 10h o el jueves a las 15h. ¿Cuál te va mejor?", time: "21:48" },
      { kind: "patient", text: "El martes a las 10", time: "21:49" },
      { kind: "ai", text: "¡Listo! Martes a las 10h con la Dra. Paula. Te lo recuerdo el día antes.", time: "21:49" },
      { kind: "event", text: "Cita reservada", detail: "Mar 10:00 · Dra. Paula · Valoración" },
      { kind: "day", text: "Lunes, 18:00" },
      { kind: "ai", text: "¡Hola, Juliana! Mañana a las 10h es tu valoración. ¿Lo confirmas?", time: "18:00" },
      { kind: "patient", text: "¡Confirmo!", time: "18:03" },
      { kind: "event", text: "Asistencia confirmada", detail: "Mar 10:00 · Juliana" },
    ],
  },
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function SmileDemo({ lang }: { lang: Lang }) {
  const d = demo[lang];
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "done">("idle");
  const run = useRef(0);
  const root = useRef<HTMLElement>(null);
  const log = useRef<HTMLDivElement>(null);

  const play = useCallback(async () => {
    const id = ++run.current;
    const alive = () => run.current === id;
    setShown(0);
    setTyping(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(d.steps.length);
      setState("done");
      return;
    }
    setState("playing");
    for (let i = 0; i < d.steps.length; i++) {
      const s = d.steps[i];
      if (s.kind === "ai") {
        setTyping(true);
        await wait(1100);
        if (!alive()) return;
        setTyping(false);
      } else {
        await wait(s.kind === "event" ? 450 : s.kind === "day" ? 900 : 1000);
        if (!alive()) return;
      }
      setShown(i + 1);
    }
    setState("done");
  }, [d]);

  // Start once, the first time the demo scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      run.current++;
    };
  }, [play]);

  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  const visible = d.steps.slice(0, shown);
  const events = visible.filter((s): s is Extract<Step, { kind: "event" }> => s.kind === "event");

  return (
    <section className="demo" aria-labelledby="demo-title" ref={root}>
      <h2 id="demo-title">{d.title}</h2>
      <p className="demo-sub">{d.sub}</p>

      <div className="demo-grid">
        <div className="demo-chat">
          <div className="demo-head">
            <span className="demo-avatar" aria-hidden="true">
              S
            </span>
            <div>
              <strong>{d.clinic}</strong>
              <span>{d.status}</span>
            </div>
          </div>
          <div className="demo-log" ref={log}>
            {visible.map((s, i) =>
              s.kind === "day" ? (
                <p key={i} className="demo-day">
                  {s.text}
                </p>
              ) : s.kind === "event" ? null : (
                <p key={i} className={`demo-msg ${s.kind}`}>
                  {s.text}
                  <time>{s.time}</time>
                </p>
              ),
            )}
            {typing && (
              <p className="demo-msg ai demo-typing" aria-label="…">
                <span />
                <span />
                <span />
              </p>
            )}
          </div>
        </div>

        <div className="demo-side">
          <h3>{d.panel}</h3>
          {events.length === 0 ? (
            <p className="demo-empty">{d.panelEmpty}</p>
          ) : (
            <ol className="demo-events">
              {events.map((e) => (
                <li key={e.text}>
                  <strong>{e.text}</strong>
                  <span>{e.detail}</span>
                </li>
              ))}
            </ol>
          )}
          <button type="button" className="btn" onClick={play} disabled={state === "playing"}>
            {state === "idle" ? d.play : d.replay}
          </button>
        </div>
      </div>
      <p className="demo-note">{d.note}</p>
    </section>
  );
}
