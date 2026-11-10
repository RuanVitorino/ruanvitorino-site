import type { Lang } from "./content";

export type AiCopy = {
  title: string;
  sub: string;
  work: { title: string; items: { k: string; v: string }[] };
};

export const ai: Record<Lang, AiCopy> = {
  en: {
    title: "How I work with AI",
    sub: "AI makes me faster. The decisions stay with me.",
    work: {
      title: "In my workflow",
      items: [
        { k: "Claude Code", v: "My pair programmer for writing, reviewing and testing code." },
        { k: "Agents with MCP", v: "Connected to Supabase, Vercel and Cloudflare to inspect, deploy and debug." },
        { k: "I decide", v: "Architecture, data model and security are mine; I review every change." },
      ],
    },
  },
  es: {
    title: "Cómo trabajo con IA",
    sub: "La IA me hace más rápido. Las decisiones siguen siendo mías.",
    work: {
      title: "En mi forma de trabajar",
      items: [
        { k: "Claude Code", v: "Mi compañero de programación para escribir, revisar y probar código." },
        { k: "Agentes con MCP", v: "Conectados a Supabase, Vercel y Cloudflare para inspeccionar, publicar y depurar." },
        { k: "Yo decido", v: "Arquitectura, modelo de datos y seguridad son míos; reviso cada cambio." },
      ],
    },
  },
  pt: {
    title: "Como eu trabalho com IA",
    sub: "A IA me deixa mais rápido. As decisões continuam comigo.",
    work: {
      title: "No meu jeito de trabalhar",
      items: [
        { k: "Claude Code", v: "Meu par de programação para escrever, revisar e testar código." },
        { k: "Agentes com MCP", v: "Ligados ao Supabase, à Vercel e à Cloudflare para inspecionar, publicar e depurar." },
        { k: "Eu decido", v: "Arquitetura, modelo de dados e segurança são meus; reviso cada mudança." },
      ],
    },
  },
};
