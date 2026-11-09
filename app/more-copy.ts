import type { Lang } from "./content";

// Strings for the interactive pieces (clock, status badge, diagrams, demos, agent extras) and the /now page.

export type More = {
  local: string; // "{time} in Santa Catarina" style label
  vsEurope: (madrid: number, lisbon: number) => string;
  status: { online: string; checking: string; offline: string };
  arch: string;
  before: { title: string; off: string; on: string; without: string[]; with: string[]; note: string };
  appmulti: { title: string; sub: string; raw: string; clean: string; next: string; events: string[]; note: string };
  tax: {
    title: string;
    sub: string;
    value: string;
    rates: string;
    ii: string;
    ipi: string;
    pis: string;
    cofins: string;
    icms: string;
    fee: string;
    total: string;
    landed: string;
    note: string;
  };
  agent: { listen: string; stop: string; share: string; copied: string; asked: string };
  nowPage: {
    title: string;
    updated: string;
    sections: { title: string; items: string[] }[];
    back: string;
  };
};

export const more: Record<Lang, More> = {
  en: {
    local: "in Santa Catarina",
    vsEurope: (m, l) => `${m} h behind Madrid, ${l} h behind Lisbon`,
    status: { online: "online now", checking: "checking…", offline: "status unavailable" },
    arch: "Tap a part to see what it does.",
    before: {
      title: "Before and after",
      off: "Without SmileIA",
      on: "With SmileIA",
      without: ["21:47 · patient asks about whitening", "The message waits until the front desk opens", "Next morning: someone replies and tries to find a slot", "No reminder the day before unless someone remembers"],
      with: ["21:47 · patient asks about whitening", "The assistant answers in seconds with price and options", "Appointment booked on Tuesday at 10:00", "Reminder the day before; attendance confirmed"],
      note: "Illustrative example with fictional data.",
    },
    appmulti: {
      title: "From Meta's webhook to one clean event",
      sub: "Each Meta event type arrives in its own shape. AppMulti turns all 19 into one format and signs it for the customer's system.",
      raw: "What Meta sends",
      clean: "What the customer receives",
      next: "Next event",
      events: ["WhatsApp message", "Delivery status", "Instagram comment"],
      note: "Fictional IDs and data.",
    },
    tax: {
      title: "Import taxes, step by step",
      sub: "A simplified version of what the foreign-trade module calculates for each item of an import declaration.",
      value: "Customs value (R$)",
      rates: "Rates",
      ii: "Import duty (II)",
      ipi: "IPI",
      pis: "PIS",
      cofins: "COFINS",
      icms: "ICMS",
      fee: "Siscomex fee (example)",
      total: "Total taxes",
      landed: "Landed cost",
      note: "Educational example: real calculations depend on the product's NCM code, the state and special regimes.",
    },
    agent: { listen: "Listen", stop: "Stop", share: "Copy link to this question", copied: "Link copied", asked: "Questions recruiters asked" },
    nowPage: {
      title: "Now",
      updated: "Updated November 2026",
      sections: [
        { title: "Building", items: ["Protocolos: a system for clinics that sell 3 to 12 month care programs. The prototype is being shaped with the first clinic.", "SmileIA keeps running for dental clinics; I keep improving the assistant and the clinic app."] },
        { title: "Learning", items: ["English every week (now A2).", "B.Sc. in Software Engineering at UniCesumar (2026 to 2029)."] },
        { title: "How I use AI to build", items: ["I use AI coding assistants such as Claude to write, review and test code faster.", "Architecture, data model and security decisions are mine, and I review every change before it ships.", "That is how a small team ships several products: AI speeds up the typing, not the thinking."] },
        { title: "Tools", items: ["TypeScript, React, Next.js, Node.js (Fastify, Hono)", "PostgreSQL and Supabase, SQL Server, Cloudflare D1", "Vercel, Railway, Cloudflare Workers", "WhatsApp Cloud API, Instagram Graph API, OpenAI and Anthropic APIs"] },
      ],
      back: "Back to the home page",
    },
  },
  es: {
    local: "en Santa Catarina",
    vsEurope: (m, l) => `${m} h menos que Madrid, ${l} h menos que Lisboa`,
    status: { online: "en línea ahora", checking: "comprobando…", offline: "estado no disponible" },
    arch: "Toca una parte para ver qué hace.",
    before: {
      title: "Antes y después",
      off: "Sin SmileIA",
      on: "Con SmileIA",
      without: ["21:47 · una paciente pregunta por el blanqueamiento", "El mensaje espera hasta que abre la recepción", "A la mañana siguiente alguien responde y busca hueco", "Sin recordatorio el día antes, salvo que alguien se acuerde"],
      with: ["21:47 · una paciente pregunta por el blanqueamiento", "El asistente responde en segundos con precio y opciones", "Cita reservada el martes a las 10:00", "Recordatorio el día antes; asistencia confirmada"],
      note: "Ejemplo ilustrativo con datos ficticios.",
    },
    appmulti: {
      title: "Del webhook de Meta a un evento limpio",
      sub: "Cada tipo de evento de Meta llega con su propio formato. AppMulti convierte los 19 en uno solo y lo firma para el sistema del cliente.",
      raw: "Lo que envía Meta",
      clean: "Lo que recibe el cliente",
      next: "Siguiente evento",
      events: ["Mensaje de WhatsApp", "Estado de entrega", "Comentario de Instagram"],
      note: "IDs y datos ficticios.",
    },
    tax: {
      title: "Impuestos de importación, paso a paso",
      sub: "Una versión simplificada de lo que calcula el módulo de comercio exterior para cada ítem de una declaración de importación.",
      value: "Valor aduanero (R$)",
      rates: "Tipos",
      ii: "Arancel (II)",
      ipi: "IPI",
      pis: "PIS",
      cofins: "COFINS",
      icms: "ICMS",
      fee: "Tasa Siscomex (ejemplo)",
      total: "Total de impuestos",
      landed: "Coste final",
      note: "Ejemplo didáctico: el cálculo real depende del código NCM del producto, del estado y de regímenes especiales.",
    },
    agent: { listen: "Escuchar", stop: "Parar", share: "Copiar enlace a esta pregunta", copied: "Enlace copiado", asked: "Preguntas de reclutadores" },
    nowPage: {
      title: "Ahora",
      updated: "Actualizado en noviembre de 2026",
      sections: [
        { title: "Construyendo", items: ["Protocolos: un sistema para clínicas que venden programas de seguimiento de 3 a 12 meses. El prototipo se está definiendo con la primera clínica.", "SmileIA sigue funcionando para clínicas dentales; sigo mejorando el asistente y la app de la clínica."] },
        { title: "Aprendiendo", items: ["Inglés cada semana (ahora A2).", "Grado en Ingeniería de Software en UniCesumar (2026 a 2029)."] },
        { title: "Cómo uso la IA para construir", items: ["Uso asistentes de código con IA, como Claude, para escribir, revisar y probar código más rápido.", "Las decisiones de arquitectura, modelo de datos y seguridad son mías, y reviso cada cambio antes de publicarlo.", "Así un equipo pequeño saca varios productos: la IA acelera la escritura, no el pensamiento."] },
        { title: "Herramientas", items: ["TypeScript, React, Next.js, Node.js (Fastify, Hono)", "PostgreSQL y Supabase, SQL Server, Cloudflare D1", "Vercel, Railway, Cloudflare Workers", "WhatsApp Cloud API, Instagram Graph API, APIs de OpenAI y Anthropic"] },
      ],
      back: "Volver al inicio",
    },
  },
  pt: {
    local: "em Santa Catarina",
    vsEurope: (m, l) => `${m} h a menos que Madri, ${l} h a menos que Lisboa`,
    status: { online: "online agora", checking: "verificando…", offline: "status indisponível" },
    arch: "Toque numa parte para ver o que ela faz.",
    before: {
      title: "Antes e depois",
      off: "Sem SmileIA",
      on: "Com SmileIA",
      without: ["21:47 · paciente pergunta sobre clareamento", "A mensagem espera até a recepção abrir", "Na manhã seguinte alguém responde e procura horário", "Sem lembrete na véspera, a não ser que alguém lembre"],
      with: ["21:47 · paciente pergunta sobre clareamento", "O assistente responde em segundos com preço e opções", "Consulta marcada na terça às 10:00", "Lembrete na véspera; presença confirmada"],
      note: "Exemplo ilustrativo com dados fictícios.",
    },
    appmulti: {
      title: "Do webhook da Meta a um evento limpo",
      sub: "Cada tipo de evento da Meta chega num formato. O AppMulti transforma os 19 em um só e assina para o sistema do cliente.",
      raw: "O que a Meta envia",
      clean: "O que o cliente recebe",
      next: "Próximo evento",
      events: ["Mensagem do WhatsApp", "Status de entrega", "Comentário do Instagram"],
      note: "IDs e dados fictícios.",
    },
    tax: {
      title: "Impostos de importação, passo a passo",
      sub: "Uma versão simplificada do que o módulo de comércio exterior calcula para cada item de uma declaração de importação.",
      value: "Valor aduaneiro (R$)",
      rates: "Alíquotas",
      ii: "Imposto de Importação (II)",
      ipi: "IPI",
      pis: "PIS",
      cofins: "COFINS",
      icms: "ICMS",
      fee: "Taxa Siscomex (exemplo)",
      total: "Total de impostos",
      landed: "Custo final",
      note: "Exemplo didático: o cálculo real depende da NCM do produto, do estado e de regimes especiais.",
    },
    agent: { listen: "Ouvir", stop: "Parar", share: "Copiar link desta pergunta", copied: "Link copiado", asked: "Perguntas de recrutadores" },
    nowPage: {
      title: "Agora",
      updated: "Atualizado em novembro de 2026",
      sections: [
        { title: "Construindo", items: ["Protocolos: um sistema para clínicas que vendem acompanhamento de 3 a 12 meses. O protótipo está sendo moldado com a primeira clínica.", "O SmileIA segue rodando para clínicas odontológicas; continuo melhorando o assistente e o app da clínica."] },
        { title: "Aprendendo", items: ["Inglês toda semana (hoje A2).", "Bacharelado em Engenharia de Software na UniCesumar (2026 a 2029)."] },
        { title: "Como uso IA para construir", items: ["Uso assistentes de código com IA, como o Claude, para escrever, revisar e testar código mais rápido.", "As decisões de arquitetura, modelo de dados e segurança são minhas, e reviso cada mudança antes de ir para produção.", "É assim que um time pequeno lança vários produtos: a IA acelera a digitação, não o raciocínio."] },
        { title: "Ferramentas", items: ["TypeScript, React, Next.js, Node.js (Fastify, Hono)", "PostgreSQL e Supabase, SQL Server, Cloudflare D1", "Vercel, Railway, Cloudflare Workers", "WhatsApp Cloud API, Instagram Graph API, APIs da OpenAI e da Anthropic"] },
      ],
      back: "Voltar para o início",
    },
  },
};

