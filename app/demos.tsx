"use client";

import { useEffect, useRef, useState } from "react";

const still = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smoothly moves a number toward its target (used for tax amounts).
function useTween(target: number, ms = 600) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (still()) {
      setV(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      const val = a + (target - a) * e;
      setV(val);
      from.current = val;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

import type { Lang } from "./content";
import { more } from "./more-copy";

// AppMulti: three raw Meta webhook shapes, each turned into the same normalized event. IDs are fictional.
const raw = [
  {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "1029384756",
        changes: [
          {
            field: "messages",
            value: {
              messaging_product: "whatsapp",
              metadata: { display_phone_number: "5547900000000", phone_number_id: "1122334455" },
              contacts: [{ profile: { name: "Juliana" }, wa_id: "5547911112222" }],
              messages: [{ from: "5547911112222", id: "wamid.HBgN…", timestamp: "1793480820", type: "text", text: { body: "Tem horário amanhã?" } }],
            },
          },
        ],
      },
    ],
  },
  {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "1029384756",
        changes: [
          {
            field: "messages",
            value: {
              messaging_product: "whatsapp",
              metadata: { phone_number_id: "1122334455" },
              statuses: [{ id: "wamid.HBgN…", status: "read", timestamp: "1793480901", recipient_id: "5547911112222" }],
            },
          },
        ],
      },
    ],
  },
  {
    object: "instagram",
    entry: [
      {
        id: "17841400000000000",
        time: 1793481000,
        changes: [{ field: "comments", value: { id: "18012345678901234", text: "Qual o preço?", from: { id: "17841499999999999", username: "cliente.demo" }, media: { id: "18098765432109876" } } }],
      },
    ],
  },
];

const clean = [
  { type: "message.received", channel: "whatsapp", tenant: "clinica-sorriso", from: { id: "5547911112222", name: "Juliana" }, text: "Tem horário amanhã?", at: "2026-11-02T21:47:00Z" },
  { type: "message.status", channel: "whatsapp", tenant: "clinica-sorriso", message: "wamid.HBgN…", status: "read", at: "2026-11-02T21:48:21Z" },
  { type: "comment.created", channel: "instagram", tenant: "clinica-sorriso", from: { id: "17841499999999999", name: "cliente.demo" }, text: "Qual o preço?", post: "18098765432109876", at: "2026-11-02T21:50:00Z" },
];

export function AppMultiDemo({ lang }: { lang: Lang }) {
  const t = more[lang].appmulti;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [typed, setTyped] = useState("");
  const box = useRef<HTMLElement>(null);
  const full = JSON.stringify(clean[i], null, 2);

  // Type the normalized event out, then move to the next one while the demo is on screen.
  useEffect(() => {
    if (still()) {
      setTyped(full);
      return;
    }
    let n = 0;
    setTyped("");
    const id = setInterval(() => {
      n += 3;
      setTyped(full.slice(0, n));
      if (n >= full.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [full]);

  useEffect(() => {
    if (!auto || still()) return;
    let visible = false;
    const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
    if (box.current) io.observe(box.current);
    const id = setInterval(() => visible && setI((k) => (k + 1) % raw.length), 5200);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [auto]);
  return (
    <section className="am" aria-labelledby="am-title" ref={box}>
      <h2 id="am-title">{t.title}</h2>
      <p className="demo-sub">{t.sub}</p>
      <div className="am-grid">
        <figure>
          <figcaption>
            {t.raw} · <b key={i} className="am-ev">{t.events[i]}</b>
          </figcaption>
          <pre key={`r${i}`}>{JSON.stringify(raw[i], null, 2)}</pre>
        </figure>
        <span className="am-arrow" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <figure>
          <figcaption>
            {t.clean} · <code>X-Signature: sha256=…</code>
          </figcaption>
          <pre key={`c${i}`} className="am-clean" aria-label={full}>
            {typed}
            <span className="caret" aria-hidden="true" />
          </pre>
        </figure>
      </div>
      <div className="am-foot">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setAuto(false);
            setI((i + 1) % raw.length);
          }}
        >
          {t.next}
        </button>
        <span className="demo-note">{t.note}</span>
      </div>
    </section>
  );
}

// Protheus: a simplified import-tax calculation for one declaration item.
const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function TaxCalc({ lang }: { lang: Lang }) {
  const t = more[lang].tax;
  const [value, setValue] = useState(10000);
  const [r, setR] = useState({ ii: 14, ipi: 10, pis: 2.1, cofins: 9.65, icms: 17 });
  const fee = 154.23;
  const [shown, setShown] = useState(false);
  useEffect(() => setShown(true), []);

  const ii = value * (r.ii / 100);
  const ipi = (value + ii) * (r.ipi / 100);
  const pis = value * (r.pis / 100);
  const cofins = value * (r.cofins / 100);
  // ICMS is charged "por dentro": it is part of its own base.
  const base = (value + ii + ipi + pis + cofins + fee) / (1 - r.icms / 100);
  const icms = base * (r.icms / 100);
  const total = ii + ipi + pis + cofins + icms + fee;
  const tTotal = useTween(total);
  const tLanded = useTween(value + total);
  const parts = [
    { k: "II", v: ii },
    { k: "IPI", v: ipi },
    { k: "PIS", v: pis },
    { k: "COFINS", v: cofins },
    { k: "ICMS", v: icms },
    { k: "Siscomex", v: fee },
  ];
  const rows: [string, keyof typeof r | null, number][] = [
    [t.ii, "ii", ii],
    [t.ipi, "ipi", ipi],
    [t.pis, "pis", pis],
    [t.cofins, "cofins", cofins],
    [t.icms, "icms", icms],
    [t.fee, null, fee],
  ];

  return (
    <section className="tax" aria-labelledby="tax-title">
      <h2 id="tax-title">{t.title}</h2>
      <p className="demo-sub">{t.sub}</p>
      <div className="tax-card">
        <label className="tax-value">
          <span>{t.value}</span>
          <input type="number" min={0} step={100} value={value} onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))} inputMode="decimal" />
        </label>
        <table>
          <tbody>
            {rows.map(([name, key, amount]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td className="rate">
                  {key ? (
                    <label>
                      <input
                        type="number"
                        min={0}
                        max={99}
                        step={0.05}
                        value={r[key]}
                        aria-label={`${name} %`}
                        onChange={(e) => setR({ ...r, [key]: Math.min(99, Math.max(0, Number(e.target.value) || 0)) })}
                      />
                      %
                    </label>
                  ) : null}
                </td>
                <td className="amt">{shown ? brl(amount) : ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">{t.total}</th>
              <td />
              <td className="amt">{brl(tTotal)}</td>
            </tr>
            <tr className="landed">
              <th scope="row">{t.landed}</th>
              <td />
              <td className="amt">{brl(tLanded)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="tax-bar" aria-hidden="true">
          {parts.map((x, k) => (
            <span key={x.k} style={{ flexGrow: Math.max(0.001, x.v), ["--k" as string]: k }} title={`${x.k}: ${brl(x.v)}`}>
              <em>{x.k}</em>
            </span>
          ))}
        </div>
      </div>
      <p className="demo-note">{t.note}</p>
    </section>
  );
}
