"use client";

import { useEffect, useRef, useState } from "react";
import askedLog from "./asked.json";
import { more } from "./more-copy";
import type { Lang } from "./content";
import type { Person } from "./person";

type Msg = {
  role: "user" | "assistant";
  text: string;
  src: string[];
  done: boolean;
};

// The model ends each answer with a line "§ source; source"; split it off for the chips.
function split(raw: string) {
  const at = raw.indexOf("§");
  if (at === -1) return { text: raw.trim(), src: [] as string[] };
  return {
    text: raw.slice(0, at).trim(),
    src: raw
      .slice(at + 1)
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Agent({
  a,
  lang,
  live,
}: {
  a: Person["agent"];
  lang: Lang;
  live: boolean;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  // Set when the API stops answering (e.g. credits ran out): fall back to the suggested questions only.
  const [down, setDown] = useState(false);
  const open = live && !down;
  const log = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [speaking, setSpeaking] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const am = more[lang].agent;
  // Real questions from the logs, curated into asked.json (only shown once there are some).
  const recent = (askedLog as string[]).slice(0, 4);

  const speak = (i: number, text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking === i) {
      synth.cancel();
      setSpeaking(null);
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-GB";
    u.onend = () => setSpeaking(null);
    setSpeaking(i);
    synth.speak(u);
  };

  const share = async (i: number, question: string) => {
    const url = `${location.origin}/?ask=${encodeURIComponent(question)}&lang=${lang}#agent`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {}
    setCopied(i);
    setTimeout(() => setCopied(null), 1600);
  };

  const update = (fn: (m: Msg) => Msg) =>
    setMsgs((all) => {
      const next = all.slice();
      next[next.length - 1] = fn(next[next.length - 1]);
      return next;
    });

  const follow = () => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  // Used when the API is unreachable: suggested questions still get their written answer.
  const typeOut = async (text: string, src: string[]) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const words = text.split(" ");
    for (let i = 1; i <= words.length; i++) {
      update((m) => ({ ...m, text: words.slice(0, i).join(" ") }));
      follow();
      if (!reduce) await wait(26 + Math.random() * 36);
    }
    update((m) => ({ ...m, src, done: true }));
  };

  const ask = async (question: string) => {
    const q = question.trim().slice(0, 400);
    if (!q || busy) return;
    setBusy(true);
    setDraft("");
    const history = msgs
      .filter((m) => m.done)
      .slice(-6)
      .map((m) => ({ role: m.role, text: m.text }));
    setMsgs((all) => [
      ...all,
      { role: "user", text: q, src: [], done: true },
      { role: "assistant", text: "", src: [], done: false },
    ]);
    const canned = a.suggestions.find((s) => s.q === q);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang, question: q, history }),
      });
      if (res.status === 429) {
        await typeOut(a.limit, []);
      } else if (!res.ok || !res.body) {
        setDown(true);
        await typeOut(canned ? canned.a : a.offline, canned ? canned.src : []);
      } else {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let raw = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          raw += decoder.decode(value, { stream: true });
          const { text } = split(raw);
          update((m) => ({ ...m, text }));
          follow();
        }
        const { text, src } = split(raw);
        if (!text) setDown(true);
        if (!text)
          await typeOut(
            canned ? canned.a : a.offline,
            canned ? canned.src : [],
          );
        else update((m) => ({ ...m, text, src, done: true }));
      }
    } catch {
      setDown(true);
      update((m) => ({ ...m, text: "" }));
      await typeOut(canned ? canned.a : a.offline, canned ? canned.src : []);
    }
    setBusy(false);
    follow();
  };

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("ask");
    if (!q || !open) return;
    root.current?.scrollIntoView({ block: "start" });
    ask(q.slice(0, 400));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const asked = new Set(
    msgs.filter((m) => m.role === "user").map((m) => m.text),
  );
  const left = a.suggestions.filter((s) => !asked.has(s.q));

  return (
    <section className="agent" id="agent" aria-labelledby="agent-title" ref={root}>
      <div className="agent-head">
        <span className="live" aria-hidden="true" />
        <div>
          <h2 id="agent-title">{a.title}</h2>
          <p>{a.sub}</p>
        </div>
      </div>

      <div className="agent-log" ref={log} aria-live="polite">
        {msgs.length === 0 && (
          <p className="hint">{open ? a.hint : a.hintPick}</p>
        )}
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <p key={i} className="q">
              {m.text}
            </p>
          ) : (
            <div key={i} className="a">
              <p>
                {m.text}
                {!m.done && <span className="caret" aria-hidden="true" />}
              </p>
              {m.src.length > 0 && (
                <ul className="src">
                  {m.src.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
              {m.done && m.text && (
                <div className="a-tools">
                  <button type="button" onClick={() => speak(i, m.text)} aria-pressed={speaking === i}>
                    {speaking === i ? am.stop : am.listen}
                  </button>
                  {msgs[i - 1]?.role === "user" && (
                    <button type="button" onClick={() => share(i, msgs[i - 1].text)}>
                      {copied === i ? am.copied : am.share}
                    </button>
                  )}
                </div>
              )}
            </div>
          ),
        )}
        {recent.length > 0 && msgs.length === 0 && (
          <div className="chips recent">
            <span className="chips-label">{am.asked}</span>
            {recent.map((q) => (
              <button key={q} type="button" disabled={busy || !open} onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
        )}
        {left.length > 0 && (
          <div className="chips">
            {left.map((s) => (
              <button
                key={s.q}
                type="button"
                disabled={busy}
                onClick={() => ask(s.q)}
              >
                {s.q}
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <form
          className="ask"
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
        >
          <label className="sr-only" htmlFor="agent-q">
            {a.label}
          </label>
          <input
            id="agent-q"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={a.placeholder}
            maxLength={400}
            autoComplete="off"
          />
          <button type="submit" disabled={busy || !draft.trim()}>
            {a.ask}
          </button>
        </form>
      )}
      <p className="agent-foot">{a.foot}</p>
    </section>
  );
}
