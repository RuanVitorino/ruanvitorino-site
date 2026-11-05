import type { Lang } from "./content";

// Copy for the person-first page, the agent and the project pages.
// Project, job, education and language data stay in content.ts.

export type Suggestion = { q: string; a: string; src: string[] };

export type Person = {
  role: string;
  bio: [string, string];
  location: string;
  relocate: string;
  featured: string[];
  agent: {
    title: string;
    sub: string;
    hint: string;
    hintPick: string;
    placeholder: string;
    label: string;
    ask: string;
    foot: string;
    offline: string;
    limit: string;
    suggestions: Suggestion[];
  };
  workTitle: string;
  othersTitle: string;
  alsoNote: string;
  howItWorks: string;
  contactText: string;
  cv: string;
  langLabel: string;
  page: { role: string; period: string; stack: string; what: string; how: string; back: string; more: string };
};

export const person: Record<Lang, Person> = {
  en: {
    role: "Full-stack developer",
    bio: [
      "I co-founded Temp.IA and work on all of its products: AI assistants that answer customers on WhatsApp and Instagram. The main one, SmileIA, books appointments for dental clinics.",
      "I've also worked for more than four years at aFill, which builds a foreign-trade add-on for TOTVS Protheus, the business software most Brazilian companies run on. I develop the import and export side: taxes and the link to Brazil's customs system.",
    ],
    location: "Santa Catarina, Brazil",
    relocate: "Open to relocating to Europe",
    featured: ["smileia", "protocolos", "appmulti", "protheus"],
    agent: {
      title: "Ask my agent",
      sub: "It answers in English, español or português, using only my CV and project notes.",
      hint: "Pick a question or write your own.",
      hintPick: "Pick a question.",
      placeholder: "e.g. has he worked with Postgres?",
      label: "Your question",
      ask: "Ask",
      foot: "It can make mistakes. The CV is the official source.",
      offline: "The agent can't answer that right now. Email me and I'll reply myself.",
      limit: "That's enough questions for now. Email me and I'll reply myself.",
      suggestions: [
        {
          q: "Has he used React and Next.js in production?",
          a: "Yes. SmileIA, a system for dental clinics, runs on Next.js on Vercel and Ruan is its main developer. The AppMulti panel is also built with Next.js.",
          src: ["CV · Temp.IA", "Project · SmileIA", "Project · AppMulti"],
        },
        {
          q: "What's his English level?",
          a: "Basic (A2), and he studies every week. He reads technical documentation comfortably but is still more at ease speaking Portuguese. His Spanish is basic too.",
          src: ["CV · Languages"],
        },
        {
          q: "What has he done with databases?",
          a: "Postgres on Supabase with row-level security, so each clinic only sees its own data; SQL Server databases for aFill's clients, including creating them and applying Protheus releases; Cloudflare D1 on AppMulti and SQLite on Garimpeiro.",
          src: ["CV · Skills", "Project · SmileIA", "CV · aFill"],
        },
      ],
    },
    workTitle: "Selected work",
    othersTitle: "Other projects",
    alsoNote: "Also at Temp.IA: I worked on Navalha, a barbershop system with an AI that answers on WhatsApp, in its early stage, before the team took it forward.",
    howItWorks: "How it works",
    contactText: "Email is the fastest way to reach me. I answer within a day.",
    cv: "CV (PDF)",
    langLabel: "Language",
    page: { role: "My role", period: "Period", stack: "Stack", what: "What it does", how: "How it works", back: "Back to the home page", more: "More projects" },
  },
  es: {
    role: "Desarrollador full-stack",
    bio: [
      "Soy cofundador de Temp.IA y participo en todos sus productos: asistentes de IA que atienden a clientes por WhatsApp e Instagram. El principal, SmileIA, reserva citas para clínicas dentales.",
      "Además, llevo más de cuatro años en aFill, que desarrolla un módulo de comercio exterior para TOTVS Protheus, el sistema de gestión que usan la mayoría de las empresas brasileñas. Allí desarrollo la parte de importación y exportación: impuestos y la conexión con la aduana de Brasil.",
    ],
    location: "Santa Catarina, Brasil",
    relocate: "Disponible para trasladarme a Europa",
    featured: ["smileia", "protocolos", "appmulti", "protheus"],
    agent: {
      title: "Pregunta a mi agente",
      sub: "Responde en español, English o português, solo con lo que está en mi CV y en mis proyectos.",
      hint: "Elige una pregunta o escribe la tuya.",
      hintPick: "Elige una pregunta.",
      placeholder: "Ej.: ¿ha trabajado con Postgres?",
      label: "Tu pregunta",
      ask: "Preguntar",
      foot: "Puede equivocarse. El CV es la fuente oficial.",
      offline: "El agente no puede responder a eso ahora. Escríbeme y te respondo yo.",
      limit: "Por ahora son suficientes preguntas. Escríbeme y te respondo yo.",
      suggestions: [
        {
          q: "¿Ha usado React y Next.js en producción?",
          a: "Sí. SmileIA, un sistema para clínicas dentales, funciona con Next.js en Vercel y Ruan es su desarrollador principal. El panel de AppMulti también está hecho con Next.js.",
          src: ["CV · Temp.IA", "Proyecto · SmileIA", "Proyecto · AppMulti"],
        },
        {
          q: "¿Qué nivel de inglés tiene?",
          a: "Básico (A2), y estudia cada semana. Lee documentación técnica sin problema, pero todavía se siente más cómodo hablando en portugués. Su español también es básico.",
          src: ["CV · Idiomas"],
        },
        {
          q: "¿Qué experiencia tiene con bases de datos?",
          a: "Postgres en Supabase con seguridad por fila, para que cada clínica vea solo sus datos; bases SQL Server de clientes de aFill, incluida su creación y la actualización de versiones de Protheus; Cloudflare D1 en AppMulti y SQLite en Garimpeiro.",
          src: ["CV · Habilidades", "Proyecto · SmileIA", "CV · aFill"],
        },
      ],
    },
    workTitle: "Trabajo destacado",
    othersTitle: "Otros proyectos",
    alsoNote: "También en Temp.IA: trabajé en la primera etapa de Navalha, un sistema para barberías con una IA que atiende por WhatsApp, antes de que el equipo lo llevara adelante.",
    howItWorks: "Cómo funciona",
    contactText: "El email es la forma más rápida de hablar conmigo. Respondo en menos de un día.",
    cv: "CV (PDF)",
    langLabel: "Idioma",
    page: { role: "Mi papel", period: "Periodo", stack: "Stack", what: "Qué hace", how: "Cómo funciona", back: "Volver al inicio", more: "Más proyectos" },
  },
  pt: {
    role: "Desenvolvedor full-stack",
    bio: [
      "Sou cofundador da Temp.IA e participo de todos os produtos: assistentes de IA que atendem clientes pelo WhatsApp e pelo Instagram. O principal, o SmileIA, marca consultas para clínicas odontológicas.",
      "Também trabalho há mais de quatro anos na aFill, que desenvolve um módulo de comércio exterior para o TOTVS Protheus, o sistema de gestão mais usado pelas empresas brasileiras. Lá cuido da importação e exportação: impostos e a ligação com o Portal Único da Receita.",
    ],
    location: "Santa Catarina, Brasil",
    relocate: "Disponível para me mudar para a Europa",
    featured: ["smileia", "protocolos", "appmulti", "protheus"],
    agent: {
      title: "Pergunte ao meu agente",
      sub: "Responde em português, español ou English, só com o que está no meu CV e nos meus projetos.",
      hint: "Escolha uma pergunta ou escreva a sua.",
      hintPick: "Escolha uma pergunta.",
      placeholder: "Ex.: ele já trabalhou com Postgres?",
      label: "Sua pergunta",
      ask: "Perguntar",
      foot: "Pode errar. O CV é a fonte oficial.",
      offline: "O agente não consegue responder isso agora. Me mande um e-mail que eu respondo.",
      limit: "Por enquanto já foram perguntas suficientes. Me mande um e-mail que eu respondo.",
      suggestions: [
        {
          q: "Ele já usou React e Next.js em produção?",
          a: "Sim. O SmileIA, sistema para clínicas odontológicas, roda em Next.js na Vercel e o Ruan é o principal desenvolvedor. O painel do AppMulti também é feito em Next.js.",
          src: ["CV · Temp.IA", "Projeto · SmileIA", "Projeto · AppMulti"],
        },
        {
          q: "Qual o nível de inglês dele?",
          a: "Básico (A2), e ele estuda toda semana. Lê documentação técnica sem dificuldade, mas ainda se sente mais à vontade conversando em português. O espanhol também é básico.",
          src: ["CV · Idiomas"],
        },
        {
          q: "Que experiência ele tem com bancos de dados?",
          a: "Postgres no Supabase com segurança por linha, para que cada clínica veja só os próprios dados; bases SQL Server de clientes da aFill, incluindo criação e atualização de releases do Protheus; Cloudflare D1 no AppMulti e SQLite no Garimpeiro.",
          src: ["CV · Habilidades", "Projeto · SmileIA", "CV · aFill"],
        },
      ],
    },
    workTitle: "Trabalho selecionado",
    othersTitle: "Outros projetos",
    alsoNote: "Também na Temp.IA: trabalhei no começo da Navalha, um sistema para barbearias com uma IA que atende no WhatsApp, antes de a equipe seguir com ela.",
    howItWorks: "Como funciona",
    contactText: "O e-mail é o jeito mais rápido de falar comigo. Respondo em até um dia.",
    cv: "CV (PDF)",
    langLabel: "Idioma",
    page: { role: "Meu papel", period: "Período", stack: "Stack", what: "O que faz", how: "Como funciona", back: "Voltar para o início", more: "Mais projetos" },
  },
};
