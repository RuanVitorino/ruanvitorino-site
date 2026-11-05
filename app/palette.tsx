"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { copy, type Lang } from "./content";
import { EMAIL, more } from "./more-copy";

type Item = { id: string; label: string; group: "go" | "actions"; run: () => void };

// ⌘K / Ctrl+K command menu, with a small terminal behind the "Open terminal" command.
export default function Palette({ lang, toggleTheme }: { lang: Lang; toggleTheme: () => void }) {
  const t = more[lang];
  const router = useRouter();
  const dlg = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [mode, setMode] = useState<"menu" | "term">("menu");
  const [toast, setToast] = useState("");

  const open = () => {
    setQ("");
    setSel(0);
    setMode("menu");
    dlg.current?.showModal();
    setTimeout(() => input.current?.focus(), 0);
  };
  const close = () => dlg.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dlg.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    return [
      { id: "home", label: t.palette.home, group: "go", run: go("/") },
      { id: "now", label: t.palette.now, group: "go", run: go("/now") },
      ...copy[lang].projects.map((p) => ({ id: p.id, label: p.name, group: "go" as const, run: go(`/work/${p.id}`) })),
      {
        id: "cv",
        label: t.palette.cv,
        group: "actions",
        run: () => {
          close();
          window.open(copy[lang].cvFile, "_blank");
        },
      },
      {
        id: "email",
        label: t.palette.email,
        group: "actions",
        run: () => {
          close();
          location.href = `mailto:${EMAIL}`;
        },
      },
      {
        id: "copy",
        label: t.palette.copyEmail,
        group: "actions",
        run: () => {
          navigator.clipboard?.writeText(EMAIL);
          setToast(t.palette.copied);
          setTimeout(() => setToast(""), 1600);
          close();
        },
      },
      {
        id: "theme",
        label: t.palette.theme,
        group: "actions",
        run: () => {
          toggleTheme();
          close();
        },
      },
      {
        id: "term",
        label: t.palette.terminal,
        group: "actions",
        run: () => setMode("term"),
      },
    ];
  }, [lang, router, t, toggleTheme]);

  const shown = items.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase()));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, shown.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      shown[sel]?.run();
    }
  };

  return (
    <>
      <button type="button" className="icon-btn kbd" onClick={open} aria-label={t.palette.open} title={t.palette.hint}>
        ⌘K
      </button>
      <dialog ref={dlg} className="palette" onClick={(e) => e.target === dlg.current && close()} onClose={() => setMode("menu")}>
        {mode === "menu" ? (
          <div className="pal-box">
            <input
              ref={input}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t.palette.placeholder}
              aria-label={t.palette.placeholder}
              aria-controls="pal-list"
              autoComplete="off"
            />
            <ul id="pal-list" role="listbox">
              {shown.length === 0 && <li className="pal-empty">{t.palette.empty}</li>}
              {shown.map((it, k) => (
                <li key={it.id} role="option" aria-selected={k === sel} onMouseEnter={() => setSel(k)} onClick={it.run}>
                  <span className="pal-group">{t.palette.groups[it.group]}</span>
                  {it.label}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Terminal lang={lang} onExit={close} />
        )}
      </dialog>
      {toast && (
        <p className="toast" role="status">
          {toast}
        </p>
      )}
    </>
  );
}

function Terminal({ lang, onExit }: { lang: Lang; onExit: () => void }) {
  const t = more[lang];
  const c = copy[lang];
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([`ruan@ruanvitorino.dev — ${t.terminal.welcome}`]);
  const [cmd, setCmd] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => field.current?.focus(), []);
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const k = raw.trim().toLowerCase();
    const out: string[] = [];
    if (k === "help") out.push(t.terminal.help);
    else if (k === "whoami") out.push(`Ruan Vitorino · ${c.jobs[0].role}, Temp.IA · ${c.jobs[1].role}, aFill`);
    else if (k === "projects") c.projects.forEach((p) => out.push(`${p.id.padEnd(11)} ${p.name}`));
    else if (k === "stack") c.stack.forEach((g) => out.push(`${g.group}: ${g.items.join(", ")}`));
    else if (k === "contact") out.push(`${EMAIL} · linkedin.com/in/ruan-vitorino · github.com/RuanVitorino`);
    else if (k === "cv") {
      window.open(c.cvFile, "_blank");
      out.push("opening CV…");
    } else if (k === "now") {
      onExit();
      router.push("/now");
      return;
    } else if (k === "clear") {
      setLines([]);
      return;
    } else if (k === "exit") {
      onExit();
      return;
    } else if (k.startsWith("open ")) {
      const id = k.slice(5);
      if (c.projects.some((p) => p.id === id)) {
        onExit();
        router.push(`/work/${id}`);
        return;
      }
      out.push(t.terminal.unknown(id));
    } else if (k) out.push(t.terminal.unknown(k));
    setLines((l) => [...l, `$ ${raw}`, ...out]);
  };

  return (
    <div className="term" onClick={() => field.current?.focus()}>
      <div className="term-head">
        <span />
        <span />
        <span />
        <b>{t.terminal.title}</b>
      </div>
      <div className="term-body" ref={box}>
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(cmd);
            setCmd("");
          }}
        >
          <span aria-hidden="true">$</span>
          <input ref={field} value={cmd} onChange={(e) => setCmd(e.target.value)} aria-label="terminal" autoComplete="off" spellCheck={false} />
        </form>
      </div>
    </div>
  );
}
