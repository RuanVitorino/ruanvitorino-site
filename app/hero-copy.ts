import type { Lang } from "./content";

export type Hero = {
  headline: string;
  sub: string;
  proofs: { k: string; v: string }[];
  seeWork: string;
  cv: string;
  talk: string;
  talkSub: string;
};

export const hero: Record<Lang, Hero> = {
  en: {
    headline: "I build AI products that businesses use every day",
    sub: "Full-stack developer and co-founder of Temp.IA. For more than four years I've also built the import and export module of TOTVS Protheus at aFill.",
    proofs: [
      { k: "In production", v: "SmileIA serves dental clinics" },
      { k: "Approved by Meta", v: "AppMulti passed WhatsApp App Review" },
      { k: "4+ years in ERP", v: "Import taxes and Brazil's customs portal" },
    ],
    seeWork: "See the projects",
    cv: "Download CV",
    talk: "Let's talk",
    talkSub: "Email is the fastest way to reach me. I answer within a day.",
  },
  es: {
    headline: "Construyo productos de IA que las empresas usan cada día",
    sub: "Desarrollador full-stack y cofundador de Temp.IA. Desde hace más de cuatro años también desarrollo el módulo de importación y exportación de TOTVS Protheus en aFill.",
    proofs: [
      { k: "En producción", v: "SmileIA atiende a clínicas dentales" },
      { k: "Aprobado por Meta", v: "AppMulti superó la App Review de WhatsApp" },
      { k: "4+ años en ERP", v: "Impuestos de importación y la aduana de Brasil" },
    ],
    seeWork: "Ver los proyectos",
    cv: "Descargar CV",
    talk: "Hablemos",
    talkSub: "El email es la forma más rápida de hablar conmigo. Respondo en menos de un día.",
  },
  pt: {
    headline: "Construo produtos de IA que empresas usam todo dia",
    sub: "Desenvolvedor full-stack e cofundador da Temp.IA. Há mais de quatro anos também desenvolvo o módulo de importação e exportação do TOTVS Protheus na aFill.",
    proofs: [
      { k: "Em produção", v: "SmileIA atende clínicas odontológicas" },
      { k: "Aprovado pela Meta", v: "AppMulti passou no App Review do WhatsApp" },
      { k: "4+ anos em ERP", v: "Impostos de importação e Portal Único" },
    ],
    seeWork: "Ver os projetos",
    cv: "Baixar CV",
    talk: "Vamos conversar",
    talkSub: "O e-mail é o jeito mais rápido de falar comigo. Respondo em até um dia.",
  },
};
