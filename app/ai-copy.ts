import type { Lang } from "./content";

export type AiCopy = {
  title: string;
  sub: string;
  build: { title: string; items: { k: string; v: string }[] };
  work: { title: string; items: { k: string; v: string }[] };
  flowTitle: string;
  flow: string[];
};

export const ai: Record<Lang, AiCopy> = {
  en: {
    title: "How I work with AI",
    sub: "AI makes me faster. The decisions stay with me.",
    build: {
      title: "In the products",
      items: [
        { k: "SmileIA", v: "An assistant that answers patients, books, reschedules and confirms appointments." },
        { k: "Protocolos", v: "Records the consultation, transcribes it and fills in the patient record." },
        { k: "This site", v: "An agent that answers recruiters using only my CV, with sources." },
      ],
    },
    work: {
      title: "In my workflow",
      items: [
        { k: "Claude Code", v: "My pair programmer for writing, reviewing and testing code." },
        { k: "Agents with MCP", v: "Connected to Supabase, Vercel and Cloudflare to inspect, deploy and debug." },
        { k: "I decide", v: "Architecture, data model and security are mine; I review every change." },
      ],
    },
    flowTitle: "What SmileIA's assistant does with one message",
    flow: ["WhatsApp message", "AI understands", "Checks the schedule", "Books", "Confirms"],
  },
  es: {
    title: "Cómo trabajo con IA",
    sub: "La IA me hace más rápido. Las decisiones siguen siendo mías.",
    build: {
      title: "En los productos",
      items: [
        { k: "SmileIA", v: "Un asistente que atiende a pacientes, reserva, cambia y confirma citas." },
        { k: "Protocolos", v: "Graba la consulta, la transcribe y rellena la ficha del paciente." },
        { k: "Este sitio", v: "Un agente que responde a reclutadores solo con mi CV, con fuentes." },
      ],
    },
    work: {
      title: "En mi forma de trabajar",
      items: [
        { k: "Claude Code", v: "Mi compañero de programación para escribir, revisar y probar código." },
        { k: "Agentes con MCP", v: "Conectados a Supabase, Vercel y Cloudflare para inspeccionar, publicar y depurar." },
        { k: "Yo decido", v: "Arquitectura, modelo de datos y seguridad son míos; reviso cada cambio." },
      ],
    },
    flowTitle: "Lo que hace el asistente de SmileIA con un mensaje",
    flow: ["Mensaje de WhatsApp", "La IA entiende", "Consulta la agenda", "Reserva", "Confirma"],
  },
  pt: {
    title: "Como eu trabalho com IA",
    sub: "A IA me deixa mais rápido. As decisões continuam comigo.",
    build: {
      title: "Nos produtos",
      items: [
        { k: "SmileIA", v: "Um assistente que atende pacientes, marca, remarca e confirma consultas." },
        { k: "Protocolos", v: "Grava a consulta, transcreve e preenche a ficha do paciente." },
        { k: "Este site", v: "Um agente que responde recrutadores só com o meu CV, mostrando as fontes." },
      ],
    },
    work: {
      title: "No meu jeito de trabalhar",
      items: [
        { k: "Claude Code", v: "Meu par de programação para escrever, revisar e testar código." },
        { k: "Agentes com MCP", v: "Ligados ao Supabase, à Vercel e à Cloudflare para inspecionar, publicar e depurar." },
        { k: "Eu decido", v: "Arquitetura, modelo de dados e segurança são meus; reviso cada mudança." },
      ],
    },
    flowTitle: "O que o assistente do SmileIA faz com uma mensagem",
    flow: ["Mensagem no WhatsApp", "A IA entende", "Consulta a agenda", "Marca", "Confirma"],
  },
};
