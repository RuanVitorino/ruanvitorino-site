export type Lang = "en" | "es" | "pt";

export const langs: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
];

export type Project = {
  id: string;
  name: string;
  meta: string;
  summary: string;
  points: string[];
  stack: string[];
  architecture: { title: string; text: string }[];
};

export type Job = { org: string; role: string; when: string; text: string };

// Public address of the products a visitor can open. Projects without one have no public page.
export const productUrl: Record<string, string> = {
  smileia: "https://smile.ia.br",
  appmulti: "https://appmult.temp.ia.br",
};

export type Copy = {
  nav: { projects: string; experience: string; stack: string; contact: string };
  cvFile: string;
  projects: Project[];
  stack: { group: string; items: string[] }[];
  expTitle: string;
  jobs: Job[];
  edu: { title: string; detail: string }[];
  spoken: string[];
  footer: string;
};

const archSmile = {
  en: [
    { title: "Web app", text: "Next.js on Vercel for the clinic: schedule, patients, dental charts, finance and team." },
    { title: "Messaging workers", text: "Fastify services on Railway receive WhatsApp, Instagram and Messenger events and run queues." },
    { title: "Data", text: "Supabase Postgres with row-level security, so each clinic only ever sees its own records." },
    { title: "Assistant", text: "OpenAI and Anthropic models with tools to look up availability, book, reschedule and confirm." },
  ],
  es: [
    { title: "App web", text: "Next.js en Vercel para la clínica: agenda, pacientes, odontograma, finanzas y equipo." },
    { title: "Workers de mensajería", text: "Servicios Fastify en Railway reciben eventos de WhatsApp, Instagram y Messenger y gestionan colas." },
    { title: "Datos", text: "Supabase Postgres con seguridad a nivel de fila: cada clínica solo ve sus propios registros." },
    { title: "Asistente", text: "Modelos de OpenAI y Anthropic con herramientas para consultar huecos, reservar, reprogramar y confirmar." },
  ],
  pt: [
    { title: "App web", text: "Next.js na Vercel para a clínica: agenda, pacientes, odontograma, financeiro e equipe." },
    { title: "Workers de mensageria", text: "Serviços Fastify na Railway recebem eventos de WhatsApp, Instagram e Messenger e processam filas." },
    { title: "Dados", text: "Supabase Postgres com segurança por linha: cada clínica só enxerga os próprios registros." },
    { title: "Assistente", text: "Modelos da OpenAI e da Anthropic com ferramentas para consultar horários, agendar, remarcar e confirmar." },
  ],
};

const appmulti: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "appmulti",
    name: "AppMulti",
    meta: "Creator and developer · 2026",
    summary: "One connector between Meta (WhatsApp Cloud API and Instagram Graph API) and any company's system. Its WhatsApp permissions passed Meta's App Review in July 2026.",
    points: [
      "Receives Meta webhooks, turns 19 event types into one clean JSON and delivers it, signed, to each customer.",
      "API to send WhatsApp messages and templates, answer Instagram DMs, publish posts and moderate comments.",
      "Multi-tenant by design: it stores routing and encrypted tokens, never the customer's messages.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "WhatsApp Cloud API", "Instagram Graph API"],
    architecture: [
      { title: "Webhooks worker", text: "Validates Meta's signature, finds the tenant and fans the normalized event out to its endpoints." },
      { title: "API worker", text: "Hono on Cloudflare Workers: auth, sending, publishing, templates, consents and per-tenant rate limits." },
      { title: "Storage", text: "D1 holds tenants, accounts and AES-encrypted tokens; KV handles OAuth state, retries and a dead-letter queue." },
      { title: "Panel", text: "Next.js dashboard for inbox, templates, posts, number quality, audit log and API keys." },
      { title: "Spin-offs", text: "TempWhats and TempSocial were split from it as WhatsApp-only and Instagram-only apps for new Meta reviews." },
    ],
  },
  es: {
    id: "appmulti",
    name: "AppMulti",
    meta: "Creador y desarrollador · 2026",
    summary: "Un conector entre Meta (WhatsApp Cloud API e Instagram Graph API) y el sistema de cualquier empresa. Sus permisos de WhatsApp superaron la App Review de Meta en julio de 2026.",
    points: [
      "Recibe los webhooks de Meta, convierte 19 tipos de evento en un JSON limpio y lo entrega, firmado, a cada cliente.",
      "API para enviar mensajes y plantillas de WhatsApp, responder DMs de Instagram, publicar posts y moderar comentarios.",
      "Multi-tenant desde el diseño: guarda enrutamiento y tokens cifrados, nunca los mensajes del cliente.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "WhatsApp Cloud API", "Instagram Graph API"],
    architecture: [
      { title: "Worker de webhooks", text: "Valida la firma de Meta, identifica al tenant y reparte el evento normalizado a sus endpoints." },
      { title: "Worker de API", text: "Hono en Cloudflare Workers: auth, envío, publicación, plantillas, consentimientos y límites por tenant." },
      { title: "Almacenamiento", text: "D1 guarda tenants, cuentas y tokens cifrados con AES; KV gestiona el estado OAuth, reintentos y una cola de fallos." },
      { title: "Panel", text: "Dashboard en Next.js con bandeja, plantillas, posts, calidad del número, auditoría y API keys." },
      { title: "Derivados", text: "TempWhats y TempSocial salieron de él como apps solo de WhatsApp y solo de Instagram para nuevas revisiones de Meta." },
    ],
  },
  pt: {
    id: "appmulti",
    name: "AppMulti",
    meta: "Criador e desenvolvedor · 2026",
    summary: "Um conector entre a Meta (WhatsApp Cloud API e Instagram Graph API) e o sistema de qualquer empresa. As permissões de WhatsApp foram aprovadas no App Review da Meta em julho de 2026.",
    points: [
      "Recebe os webhooks da Meta, transforma 19 tipos de evento num JSON único e entrega, assinado, para cada cliente.",
      "API para enviar mensagens e templates de WhatsApp, responder DMs do Instagram, publicar posts e moderar comentários.",
      "Multi-tenant desde o desenho: guarda roteamento e tokens criptografados, nunca as mensagens do cliente.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "WhatsApp Cloud API", "Instagram Graph API"],
    architecture: [
      { title: "Worker de webhooks", text: "Valida a assinatura da Meta, descobre o tenant e distribui o evento normalizado para os endpoints dele." },
      { title: "Worker de API", text: "Hono no Cloudflare Workers: autenticação, envio, publicação, templates, consentimentos e rate limit por tenant." },
      { title: "Armazenamento", text: "D1 guarda tenants, contas e tokens criptografados com AES; KV cuida do estado OAuth, das retentativas e de uma fila de falhas." },
      { title: "Painel", text: "Dashboard em Next.js com inbox, templates, posts, qualidade do número, auditoria e chaves de API." },
      { title: "Derivados", text: "O TempWhats e o TempSocial nasceram dele, como apps só de WhatsApp e só de Instagram para novas revisões da Meta." },
    ],
  },
};

const ads: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "tempia-ads",
    name: "Temp.IA Ads",
    meta: "Creator and developer · 2026",
    summary: "A panel where agencies follow and manage their clients' Meta ad accounts, connected through Facebook Login for Business.",
    points: [
      "Performance tab with spend, clicks, CTR, leads and cost per lead, plus a ranking of creatives.",
      "Pause and resume campaigns, ad sets and ads, and adjust daily budgets within safe limits.",
      "Organizations, clients and API keys, so the Temp.IA assistant can read ad results too.",
    ],
    stack: ["Cloudflare Workers", "Hono", "Supabase", "Next.js", "Meta Marketing API"],
    architecture: [
      { title: "Connection", text: "Each client connects their own business portfolio by OAuth; tokens are stored encrypted." },
      { title: "API", text: "Hono on Cloudflare Workers reads insights and structure from the Marketing API and writes only on a user action." },
      { title: "Panel", text: "Next.js app with organizations, clients and four tabs: connection, performance, structure and report." },
    ],
  },
  es: {
    id: "tempia-ads",
    name: "Temp.IA Ads",
    meta: "Creador y desarrollador · 2026",
    summary: "Un panel donde las agencias siguen y gestionan las cuentas publicitarias de Meta de sus clientes, conectadas con Facebook Login for Business.",
    points: [
      "Pestaña de rendimiento con gasto, clics, CTR, leads y coste por lead, más un ranking de creatividades.",
      "Pausar y reactivar campañas, conjuntos y anuncios, y ajustar presupuestos diarios con límites seguros.",
      "Organizaciones, clientes y API keys, para que el asistente de Temp.IA también lea los resultados.",
    ],
    stack: ["Cloudflare Workers", "Hono", "Supabase", "Next.js", "Meta Marketing API"],
    architecture: [
      { title: "Conexión", text: "Cada cliente conecta su propio portfolio de negocio por OAuth; los tokens se guardan cifrados." },
      { title: "API", text: "Hono en Cloudflare Workers lee métricas y estructura de la Marketing API y solo escribe ante una acción del usuario." },
      { title: "Panel", text: "App en Next.js con organizaciones, clientes y cuatro pestañas: conexión, rendimiento, estructura e informe." },
    ],
  },
  pt: {
    id: "tempia-ads",
    name: "Temp.IA Ads",
    meta: "Criador e desenvolvedor · 2026",
    summary: "Um painel onde agências acompanham e gerenciam as contas de anúncio da Meta dos clientes, conectadas pelo Facebook Login for Business.",
    points: [
      "Aba de desempenho com investimento, cliques, CTR, leads e custo por lead, mais um ranking de criativos.",
      "Pausar e reativar campanhas, conjuntos e anúncios, e ajustar o orçamento diário dentro de limites seguros.",
      "Organizações, clientes e chaves de API, para o assistente da Temp.IA também ler os resultados.",
    ],
    stack: ["Cloudflare Workers", "Hono", "Supabase", "Next.js", "Meta Marketing API"],
    architecture: [
      { title: "Conexão", text: "Cada cliente conecta o próprio portfólio de negócios por OAuth; os tokens ficam criptografados." },
      { title: "API", text: "Hono no Cloudflare Workers lê métricas e estrutura da Marketing API e só escreve quando o usuário pede." },
      { title: "Painel", text: "App em Next.js com organizações, clientes e quatro abas: conexão, desempenho, estrutura e relatório." },
    ],
  },
};

const archHosped = {
  en: [
    { title: "Same foundation", text: "Built on the SmileIA architecture: Next.js, Fastify workers and Supabase, adapted to stays and guests." },
    { title: "Tested from day one", text: "Vitest suites cover the booking rules while the product is still small." },
  ],
  es: [
    { title: "Misma base", text: "Sobre la arquitectura de SmileIA: Next.js, workers en Fastify y Supabase, adaptada a estancias y huéspedes." },
    { title: "Con tests desde el primer día", text: "Suites de Vitest cubren las reglas de reserva mientras el producto aún es pequeño." },
  ],
  pt: [
    { title: "Mesma base", text: "Sobre a arquitetura do SmileIA: Next.js, workers em Fastify e Supabase, adaptada a estadias e hóspedes." },
    { title: "Testado desde o início", text: "Suítes de Vitest cobrem as regras de reserva enquanto o produto ainda é pequeno." },
  ],
};

const protheus: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "protheus",
    name: "TOTVS Protheus at aFill",
    meta: "ADVPL developer · since April 2022",
    summary: "More than four years developing aFill's foreign-trade add-on for TOTVS Protheus, Brazil's most used ERP: the import, export and DUIMP processes its client companies run every day.",
    points: [
      "Routines, screens, reports and integrations in ADVPL and TL++ with the MVC framework, with 200+ commits of mine since 2022.",
      "Integrated DUIMP and the product catalogue with Portal Único, Brazil's government trade portal, including digital-certificate authentication and clear error messages.",
      "Fixed import tax calculations (II, IPI, PIS/COFINS, ICMS, Siscomex fee) for DUIMP and drawback processes, and support clients on SQL Server and Oracle.",
    ],
    stack: ["ADVPL", "TL++", "Protheus MVC", "SQL Server", "Oracle", "TOTVS Protheus"],
    architecture: [
      { title: "Routines", text: "ADVPL/TL++ sources on MVC models and views for import, export and DUIMP processes." },
      { title: "Government portal", text: "Integrations with Portal Único for DUIMP, product catalogue and foreign operators, authenticated with the client's digital certificate." },
      { title: "Taxes", text: "Import duties and taxes are calculated per declaration item, including drawback and special regimes." },
      { title: "Releases", text: "Each release ships with its parameters and is applied per client environment, on SQL Server or Oracle." },
    ],
  },
  es: {
    id: "protheus",
    name: "TOTVS Protheus en aFill",
    meta: "Desarrollador ADVPL · desde abril de 2022",
    summary: "Más de cuatro años desarrollando el módulo de comercio exterior de aFill para TOTVS Protheus, el ERP más usado en Brasil: los procesos de importación, exportación y DUIMP que sus empresas cliente usan cada día.",
    points: [
      "Rutinas, pantallas, informes e integraciones en ADVPL y TL++ con el framework MVC, con más de 200 commits míos desde 2022.",
      "Integré la DUIMP y el catálogo de productos con el Portal Único, el portal de comercio exterior del Gobierno de Brasil, con autenticación por certificado digital y mensajes de error claros.",
      "Corregí cálculos de impuestos de importación (II, IPI, PIS/COFINS, ICMS, tasa Siscomex) en procesos DUIMP y de drawback, y doy soporte a clientes en SQL Server y Oracle.",
    ],
    stack: ["ADVPL", "TL++", "Protheus MVC", "SQL Server", "Oracle", "TOTVS Protheus"],
    architecture: [
      { title: "Rutinas", text: "Fuentes ADVPL/TL++ sobre modelos y vistas MVC para los procesos de importación, exportación y DUIMP." },
      { title: "Portal del Gobierno", text: "Integraciones con el Portal Único para DUIMP, catálogo de productos y operadores extranjeros, autenticadas con el certificado digital del cliente." },
      { title: "Impuestos", text: "Los aranceles e impuestos de importación se calculan por ítem de la declaración, incluidos drawback y regímenes especiales." },
      { title: "Versiones", text: "Cada versión sale con sus parámetros y se aplica en el entorno de cada cliente, sobre SQL Server u Oracle." },
    ],
  },
  pt: {
    id: "protheus",
    name: "TOTVS Protheus na aFill",
    meta: "Desenvolvedor ADVPL · desde abril de 2022",
    summary: "Mais de quatro anos desenvolvendo o módulo de comércio exterior da aFill para o TOTVS Protheus, o ERP mais usado do Brasil: os processos de importação, exportação e DUIMP que as empresas clientes usam todo dia.",
    points: [
      "Rotinas, telas, relatórios e integrações em ADVPL e TL++ com o framework MVC, com mais de 200 commits meus desde 2022.",
      "Integrei a DUIMP e o catálogo de produtos ao Portal Único de Comércio Exterior, com autenticação por certificado digital e mensagens de erro claras.",
      "Corrigi cálculos de impostos de importação (II, IPI, PIS/COFINS, ICMS, taxa Siscomex) em processos DUIMP e de drawback, e dou suporte a clientes em SQL Server e Oracle.",
    ],
    stack: ["ADVPL", "TL++", "Protheus MVC", "SQL Server", "Oracle", "TOTVS Protheus"],
    architecture: [
      { title: "Rotinas", text: "Fontes ADVPL/TL++ sobre modelos e views MVC para os processos de importação, exportação e DUIMP." },
      { title: "Portal do governo", text: "Integrações com o Portal Único para DUIMP, catálogo de produtos e operador estrangeiro, autenticadas com o certificado digital do cliente." },
      { title: "Impostos", text: "Tributos de importação calculados por item da declaração, incluindo drawback e regimes especiais." },
      { title: "Releases", text: "Cada release sai com seus parâmetros e é aplicado no ambiente de cada cliente, em SQL Server ou Oracle." },
    ],
  },
};

const protocolos: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "protocolos",
    name: "Protocolos",
    meta: "Developer · in progress since October 2026",
    summary: "A system for clinics that sell follow-up programs of 3 to 12 months: the program, not the appointment, is the centre, from the first WhatsApp message to the renewal.",
    points: [
      "Working prototype with a separate view for each role: doctor, nursing, front desk, patient journey, finance and admin.",
      "Records the consultation: the audio is transcribed by OpenAI and the text is analysed to fill in the record, with Google as a fallback.",
      "Being shaped with the first clinic before the real back end is built.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "OpenAI", "Vitest"],
    architecture: [
      { title: "Prototype", text: "Next.js with demo data and a role switcher, so the clinic can walk through every flow before anything is stored." },
      { title: "Recording", text: "Two API routes: one transcribes the consultation audio, the other turns the transcript into structured notes." },
      { title: "Next step", text: "A multi-clinic back end, with the patient portal reached from WhatsApp." },
    ],
  },
  es: {
    id: "protocolos",
    name: "Protocolos",
    meta: "Desarrollador · en curso desde octubre de 2026",
    summary: "Un sistema para clínicas que venden programas de seguimiento de 3 a 12 meses: el centro es el programa, no la consulta, desde el primer mensaje de WhatsApp hasta la renovación.",
    points: [
      "Prototipo navegable con una vista para cada perfil: médico, enfermería, recepción, seguimiento del paciente, finanzas y administración.",
      "Graba la consulta: OpenAI transcribe el audio y el texto se analiza para rellenar la ficha, con Google como reserva.",
      "Se está definiendo con la primera clínica antes de construir el back end real.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "OpenAI", "Vitest"],
    architecture: [
      { title: "Prototipo", text: "Next.js con datos de demostración y un selector de perfil, para que la clínica recorra cada flujo antes de guardar nada." },
      { title: "Grabación", text: "Dos rutas de API: una transcribe el audio de la consulta y la otra convierte la transcripción en notas estructuradas." },
      { title: "Siguiente paso", text: "Un back end para varias clínicas, con el portal del paciente accesible desde WhatsApp." },
    ],
  },
  pt: {
    id: "protocolos",
    name: "Protocolos",
    meta: "Desenvolvedor · em andamento desde outubro de 2026",
    summary: "Um sistema para clínicas que vendem protocolos de acompanhamento de 3 a 12 meses: o centro é o protocolo, não a consulta, da primeira conversa no WhatsApp até a renovação.",
    points: [
      "Protótipo navegável com uma visão para cada perfil: médico, enfermagem, recepção, gestão de jornada, financeiro e admin.",
      "Grava o atendimento: a OpenAI transcreve o áudio e o texto é analisado para preencher a ficha, com o Google de reserva.",
      "Está sendo desenhado com a primeira clínica antes de construir o back end de verdade.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "OpenAI", "Vitest"],
    architecture: [
      { title: "Protótipo", text: "Next.js com dados de demonstração e um seletor de perfil, para a clínica percorrer cada fluxo antes de qualquer dado ser gravado." },
      { title: "Gravação", text: "Duas rotas de API: uma transcreve o áudio da consulta, a outra transforma a transcrição em anotações estruturadas." },
      { title: "Próximo passo", text: "Um back end para várias clínicas, com o portal do paciente aberto a partir do WhatsApp." },
    ],
  },
};

const tempwhats: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "tempwhats",
    name: "TempWhats",
    meta: "Creator and developer · October 2026",
    summary: "A WhatsApp-only panel and connector split from AppMulti, built for a new Meta App Review: companies connect their number with Embedded Signup and answer customers from one inbox.",
    points: [
      "Connects the WhatsApp Business number through Embedded Signup, with no manual setup in Business Manager.",
      "Inbox, message templates (create and sync) and number quality in the panel.",
      "Forwards WhatsApp events, signed, to the company's own system.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "WhatsApp Cloud API"],
    architecture: [
      { title: "Panel", text: "Next.js on Vercel for connections, inbox, templates and number quality." },
      { title: "API and webhooks", text: "Two Cloudflare Workers: one for the API, one that receives Meta's webhooks and forwards them signed." },
      { title: "Storage", text: "Cloudflare D1 holds accounts, numbers and the audit log." },
    ],
  },
  es: {
    id: "tempwhats",
    name: "TempWhats",
    meta: "Creador y desarrollador · octubre de 2026",
    summary: "Un panel y conector solo de WhatsApp, separado de AppMulti para una nueva App Review de Meta: las empresas conectan su número con Embedded Signup y atienden a los clientes desde una bandeja.",
    points: [
      "Conecta el número de WhatsApp Business con Embedded Signup, sin configuración manual en Business Manager.",
      "Bandeja de entrada, plantillas de mensaje (crear y sincronizar) y calidad del número en el panel.",
      "Reenvía los eventos de WhatsApp, firmados, al sistema de la propia empresa.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "WhatsApp Cloud API"],
    architecture: [
      { title: "Panel", text: "Next.js en Vercel para conexiones, bandeja, plantillas y calidad del número." },
      { title: "API y webhooks", text: "Dos Cloudflare Workers: uno para la API y otro que recibe los webhooks de Meta y los reenvía firmados." },
      { title: "Almacenamiento", text: "Cloudflare D1 guarda cuentas, números y el registro de auditoría." },
    ],
  },
  pt: {
    id: "tempwhats",
    name: "TempWhats",
    meta: "Criador e desenvolvedor · outubro de 2026",
    summary: "Um painel e conector só de WhatsApp, separado do AppMulti para um novo App Review da Meta: a empresa conecta o número pelo Embedded Signup e atende os clientes numa caixa de entrada.",
    points: [
      "Conecta o número do WhatsApp Business pelo Embedded Signup, sem configuração manual no Business Manager.",
      "Caixa de entrada, templates de mensagem (criar e sincronizar) e qualidade do número no painel.",
      "Repassa os eventos do WhatsApp, assinados, ao sistema da própria empresa.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "WhatsApp Cloud API"],
    architecture: [
      { title: "Painel", text: "Next.js na Vercel para conexões, caixa de entrada, templates e qualidade do número." },
      { title: "API e webhooks", text: "Dois Cloudflare Workers: um para a API, outro que recebe os webhooks da Meta e repassa assinados." },
      { title: "Armazenamento", text: "O Cloudflare D1 guarda contas, números e o log de auditoria." },
    ],
  },
};

const tempsocial: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "tempsocial",
    name: "TempSocial",
    meta: "Creator and developer · October 2026",
    summary: "An Instagram-only panel and connector split from AppMulti: companies connect their professional account with Instagram Login to answer DMs, moderate comments, publish and see insights. Submitted to Meta's App Review, waiting for approval.",
    points: [
      "Answers DMs and replies to, hides or deletes comments from the panel.",
      "Publishes feed posts, Reels, Stories and carousels, including scheduled posts.",
      "Shows account and post insights, and forwards Instagram events, signed, to the company's system.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "Instagram API"],
    architecture: [
      { title: "Panel", text: "Next.js on Vercel for connections, inbox, posts, comments and insights." },
      { title: "API and webhooks", text: "Two Cloudflare Workers: one for the API, one that receives Instagram webhooks and forwards them signed." },
      { title: "Storage", text: "Cloudflare D1 holds accounts, scheduled posts and the audit log." },
    ],
  },
  es: {
    id: "tempsocial",
    name: "TempSocial",
    meta: "Creador y desarrollador · octubre de 2026",
    summary: "Un panel y conector solo de Instagram, separado de AppMulti: las empresas conectan su cuenta profesional con Instagram Login para responder DMs, moderar comentarios, publicar y ver métricas. Enviado a la App Review de Meta, a la espera de aprobación.",
    points: [
      "Responde DMs y contesta, oculta o elimina comentarios desde el panel.",
      "Publica posts, Reels, Stories y carruseles, también programados.",
      "Muestra métricas de la cuenta y de los posts, y reenvía los eventos de Instagram, firmados, al sistema de la empresa.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "Instagram API"],
    architecture: [
      { title: "Panel", text: "Next.js en Vercel para conexiones, bandeja, posts, comentarios y métricas." },
      { title: "API y webhooks", text: "Dos Cloudflare Workers: uno para la API y otro que recibe los webhooks de Instagram y los reenvía firmados." },
      { title: "Almacenamiento", text: "Cloudflare D1 guarda cuentas, publicaciones programadas y el registro de auditoría." },
    ],
  },
  pt: {
    id: "tempsocial",
    name: "TempSocial",
    meta: "Criador e desenvolvedor · outubro de 2026",
    summary: "Um painel e conector só de Instagram, separado do AppMulti: a empresa conecta a conta profissional pelo Instagram Login para responder DMs, moderar comentários, publicar e ver insights. Enviado ao App Review da Meta, aguardando aprovação.",
    points: [
      "Responde DMs e responde, oculta ou exclui comentários pelo painel.",
      "Publica posts, Reels, Stories e carrosséis, inclusive agendados.",
      "Mostra insights da conta e dos posts, e repassa os eventos do Instagram, assinados, ao sistema da empresa.",
    ],
    stack: ["Cloudflare Workers", "Hono", "D1", "Next.js", "Instagram API"],
    architecture: [
      { title: "Painel", text: "Next.js na Vercel para conexões, caixa de entrada, posts, comentários e insights." },
      { title: "API e webhooks", text: "Dois Cloudflare Workers: um para a API, outro que recebe os webhooks do Instagram e repassa assinados." },
      { title: "Armazenamento", text: "O Cloudflare D1 guarda contas, posts agendados e o log de auditoria." },
    ],
  },
};

const garimpeiro: Record<"en" | "es" | "pt", Project> = {
  en: {
    id: "garimpeiro",
    name: "Garimpeiro de Ofertas",
    meta: "Personal project · since April 2026",
    summary: "A Python bot that hunts deals on Mercado Livre and Amazon and posts them, with affiliate links, to Telegram and WhatsApp channels on a schedule.",
    points: [
      "Keeps its own price history, so it only posts real discounts and marks the lowest price in 30 days.",
      "SQLite against duplicates, a health check endpoint, error alerts and click tracking per channel.",
      "Updates itself from Git, validates the code before restarting and rolls back if it breaks.",
    ],
    stack: ["Python", "asyncio", "Telethon", "SQLite", "Telegram", "Linux"],
    architecture: [
      { title: "Search", text: "Scheduled runs query Mercado Livre and Amazon and also watch other deal channels." },
      { title: "Filter", text: "Minimum discount, rating and the price validator decide what is worth posting." },
      { title: "Publish", text: "The post builder adds image, price and affiliate link and sends it to each channel." },
      { title: "Operate", text: "Runs as a Linux service on a free cloud server, with metrics and a self-update with rollback." },
    ],
  },
  es: {
    id: "garimpeiro",
    name: "Garimpeiro de Ofertas",
    meta: "Proyecto personal · desde abril de 2026",
    summary: "Un bot en Python que busca ofertas en Mercado Livre y Amazon y las publica, con enlaces de afiliado, en canales de Telegram y WhatsApp a horas fijas.",
    points: [
      "Guarda su propio historial de precios, así que solo publica descuentos reales y marca el precio más bajo en 30 días.",
      "SQLite contra duplicados, endpoint de salud, alertas de error y seguimiento de clics por canal.",
      "Se actualiza desde Git, valida el código antes de reiniciar y vuelve atrás si algo falla.",
    ],
    stack: ["Python", "asyncio", "Telethon", "SQLite", "Telegram", "Linux"],
    architecture: [
      { title: "Búsqueda", text: "Ejecuciones programadas consultan Mercado Livre y Amazon y vigilan otros canales de ofertas." },
      { title: "Filtro", text: "Descuento mínimo, valoración y el validador de precios deciden qué merece publicarse." },
      { title: "Publicación", text: "El generador de posts añade imagen, precio y enlace de afiliado y lo envía a cada canal." },
      { title: "Operación", text: "Corre como servicio Linux en un servidor cloud gratuito, con métricas y autoactualización con vuelta atrás." },
    ],
  },
  pt: {
    id: "garimpeiro",
    name: "Garimpeiro de Ofertas",
    meta: "Projeto pessoal · desde abril de 2026",
    summary: "Um bot em Python que garimpa ofertas no Mercado Livre e na Amazon e publica, com link de afiliado, em canais do Telegram e do WhatsApp em horários programados.",
    points: [
      "Mantém o próprio histórico de preços: só posta desconto de verdade e marca o menor preço dos últimos 30 dias.",
      "SQLite contra duplicatas, endpoint de saúde, alertas de erro e rastreio de cliques por canal.",
      "Se atualiza pelo Git, valida o código antes de reiniciar e volta a versão se algo quebrar.",
    ],
    stack: ["Python", "asyncio", "Telethon", "SQLite", "Telegram", "Linux"],
    architecture: [
      { title: "Busca", text: "Execuções agendadas consultam Mercado Livre e Amazon e também monitoram outros canais de ofertas." },
      { title: "Filtro", text: "Desconto mínimo, avaliação e o validador de preço decidem o que vale postar." },
      { title: "Publicação", text: "O montador de posts junta imagem, preço e link de afiliado e envia para cada canal." },
      { title: "Operação", text: "Roda como serviço Linux num servidor de nuvem gratuito, com métricas e auto-update com rollback." },
    ],
  },
};

const stackItems = {
  languages: ["TypeScript", "JavaScript", "Python", "ADVPL / TL++", "SQL"],
  frontend: ["React", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "Fastify", "Hono", "Webhooks", "Queues"],
  data: ["PostgreSQL", "Supabase", "SQL Server", "Cloudflare D1"],
  ai: ["OpenAI API", "Anthropic API", "AI agents", "WhatsApp Cloud API", "Instagram Graph API", "Meta Marketing API"],
  infra: ["Vercel", "Railway", "Cloudflare Workers", "Git", "GitHub", "Vitest", "Playwright"],
};

export const copy: Record<Lang, Copy> = {
  en: {
    nav: { projects: "Projects", experience: "Experience", stack: "Stack", contact: "Contact" },
    cvFile: "/Ruan-Vitorino-CV-EN.pdf",
    projects: [
      {
        id: "smileia",
        name: "SmileIA",
        meta: "Creator and main developer · since June 2026",
        summary: "Management platform for dental clinics with an AI assistant that answers patients 24/7 on WhatsApp, Instagram, Messenger and the clinic's website.",
        points: [
          "Qualifies leads, books and reschedules appointments, confirms attendance and follows up.",
          "Clinics run patients, dental charts, finance and team in the same place.",
        ],
        stack: ["Next.js", "TypeScript", "Supabase", "Fastify", "OpenAI", "Anthropic"],
        architecture: archSmile.en,
      },
      appmulti.en,
      protocolos.en,
      tempwhats.en,
      tempsocial.en,
      ads.en,
      {
        id: "hospedia",
        name: "HospedIA",
        meta: "Creator and developer · since October 2026",
        summary: "The same AI-first approach for hospitality: an assistant and back office for small accommodation businesses.",
        points: ["Started in October 2026 on the SmileIA foundation."],
        stack: ["Next.js", "Supabase", "Fastify", "Vitest"],
        architecture: archHosped.en,
      },
      garimpeiro.en,
      protheus.en,
    ],
    stack: [
      { group: "Languages", items: stackItems.languages },
      { group: "Front end", items: stackItems.frontend },
      { group: "Back end", items: stackItems.backend },
      { group: "Data", items: stackItems.data },
      { group: "AI and integrations", items: stackItems.ai },
      { group: "Infrastructure and tooling", items: stackItems.infra },
    ],
    expTitle: "Experience",
    jobs: [
      { org: "Temp.IA", role: "Co-founder and lead developer", when: "May 2025 to now", text: "aFill's AI products area: assistants that answer customers on WhatsApp and Instagram." },
      { org: "aFill Inovação em Sistemas", role: "ADVPL / TOTVS Protheus developer", when: "April 2022 to now", text: "Implementation and customization of Protheus, Brazil's most used ERP: ADVPL development, databases, release updates, support and debugging for client companies." },
      { org: "Clinitec Telecom", role: "NOC analyst", when: "January 2021 to March 2022", text: "Outage monitoring, access provisioning and real-time network troubleshooting at an internet provider." },
      { org: "Micro Solution", role: "Computer technician", when: "2020", text: "Hardware and software repair, upgrades, OS setup, backup and recovery." },
    ],
    edu: [{ title: "B.Sc. in Software Engineering", detail: "UniCesumar · February 2026 to 2029 (expected)" }],
    spoken: ["Portuguese, native", "English, basic (A2), studying; reads technical docs", "Spanish, basic and studying"],
    footer: "Ruan Vitorino · Santa Catarina, Brazil",
  },
  es: {
    nav: { projects: "Proyectos", experience: "Experiencia", stack: "Stack", contact: "Contacto" },
    cvFile: "/Ruan-Vitorino-CV-ES.pdf",
    projects: [
      {
        id: "smileia",
        name: "SmileIA",
        meta: "Creador y desarrollador principal · desde junio de 2026",
        summary: "Plataforma de gestión para clínicas dentales con un asistente de IA que atiende a los pacientes 24/7 por WhatsApp, Instagram, Messenger y la web de la clínica.",
        points: [
          "Cualifica leads, agenda y reprograma citas, confirma asistencia y hace seguimiento.",
          "La clínica gestiona pacientes, odontograma, finanzas y equipo en el mismo sitio.",
        ],
        stack: ["Next.js", "TypeScript", "Supabase", "Fastify", "OpenAI", "Anthropic"],
        architecture: archSmile.es,
      },
      appmulti.es,
      protocolos.es,
      tempwhats.es,
      tempsocial.es,
      ads.es,
      {
        id: "hospedia",
        name: "HospedIA",
        meta: "Creador y desarrollador · desde octubre de 2026",
        summary: "El mismo enfoque con IA para el alojamiento: asistente y gestión para pequeños negocios de hospedaje.",
        points: ["Iniciado en octubre de 2026 sobre la base de SmileIA."],
        stack: ["Next.js", "Supabase", "Fastify", "Vitest"],
        architecture: archHosped.es,
      },
      garimpeiro.es,
      protheus.es,
    ],
    stack: [
      { group: "Lenguajes", items: stackItems.languages },
      { group: "Front end", items: stackItems.frontend },
      { group: "Back end", items: stackItems.backend },
      { group: "Datos", items: stackItems.data },
      { group: "IA e integraciones", items: stackItems.ai },
      { group: "Infraestructura y herramientas", items: stackItems.infra },
    ],
    expTitle: "Experiencia",
    jobs: [
      { org: "Temp.IA", role: "Cofundador y desarrollador principal", when: "mayo de 2025 hasta hoy", text: "Área de productos de IA de aFill: asistentes que atienden a clientes por WhatsApp e Instagram." },
      { org: "aFill Inovação em Sistemas", role: "Desarrollador ADVPL / TOTVS Protheus", when: "abril de 2022 hasta hoy", text: "Implantación y personalización de Protheus, el ERP más usado en Brasil: desarrollo ADVPL, bases de datos, actualizaciones de versión, soporte y depuración para empresas cliente." },
      { org: "Clinitec Telecom", role: "Analista NOC", when: "enero de 2021 a marzo de 2022", text: "Monitorización de caídas, alta de accesos y resolución de incidencias de red en un proveedor de internet." },
      { org: "Micro Solution", role: "Técnico informático", when: "2020", text: "Reparación de hardware y software, mejoras, instalación de sistemas y copias de seguridad." },
    ],
    edu: [{ title: "Grado en Ingeniería de Software", detail: "UniCesumar · febrero de 2026 a 2029 (previsto)" }],
    spoken: ["Portugués, nativo", "Inglés, básico (A2), estudiando; lee documentación técnica", "Español, básico y estudiando"],
    footer: "Ruan Vitorino · Santa Catarina, Brasil",
  },
  pt: {
    nav: { projects: "Projetos", experience: "Experiência", stack: "Stack", contact: "Contato" },
    cvFile: "/Ruan-Vitorino-CV-PT.pdf",
    projects: [
      {
        id: "smileia",
        name: "SmileIA",
        meta: "Criador e desenvolvedor principal · desde junho de 2026",
        summary: "Plataforma de gestão para clínicas odontológicas com um assistente de IA que atende pacientes 24/7 no WhatsApp, Instagram, Messenger e no site da clínica.",
        points: [
          "Qualifica leads, agenda e remarca consultas, confirma presença e faz o acompanhamento.",
          "A clínica gerencia pacientes, odontograma, financeiro e equipe no mesmo lugar.",
        ],
        stack: ["Next.js", "TypeScript", "Supabase", "Fastify", "OpenAI", "Anthropic"],
        architecture: archSmile.pt,
      },
      appmulti.pt,
      protocolos.pt,
      tempwhats.pt,
      tempsocial.pt,
      ads.pt,
      {
        id: "hospedia",
        name: "HospedIA",
        meta: "Criador e desenvolvedor · desde outubro de 2026",
        summary: "A mesma abordagem com IA para hospedagem: assistente e gestão para pousadas e pequenas hospedagens.",
        points: ["Começou em outubro de 2026, sobre a base do SmileIA."],
        stack: ["Next.js", "Supabase", "Fastify", "Vitest"],
        architecture: archHosped.pt,
      },
      garimpeiro.pt,
      protheus.pt,
    ],
    stack: [
      { group: "Linguagens", items: stackItems.languages },
      { group: "Front end", items: stackItems.frontend },
      { group: "Back end", items: stackItems.backend },
      { group: "Dados", items: stackItems.data },
      { group: "IA e integrações", items: stackItems.ai },
      { group: "Infraestrutura e ferramentas", items: stackItems.infra },
    ],
    expTitle: "Experiência",
    jobs: [
      { org: "Temp.IA", role: "Cofundador e desenvolvedor principal", when: "maio de 2025 até hoje", text: "Área de produtos de IA da aFill: assistentes que atendem clientes pelo WhatsApp e pelo Instagram." },
      { org: "aFill Inovação em Sistemas", role: "Desenvolvedor ADVPL / TOTVS Protheus", when: "abril de 2022 até hoje", text: "Implantação e customização do Protheus, o ERP mais usado do Brasil: desenvolvimento ADVPL, bases de dados, atualização de releases, suporte e debug para empresas clientes." },
      { org: "Clinitec Telecom", role: "Analista de NOC", when: "janeiro de 2021 a março de 2022", text: "Monitoramento de quedas, liberação de acessos e correção de problemas de rede em tempo real num provedor." },
      { org: "Micro Solution", role: "Técnico em manutenção de computadores", when: "2020", text: "Conserto de hardware e software, upgrades, instalação de sistemas, backup e recuperação." },
    ],
    edu: [{ title: "Bacharelado em Engenharia de Software", detail: "UniCesumar · fevereiro de 2026 a 2029 (previsto)" }],
    spoken: ["Português, nativo", "Inglês, básico (A2), estudando; lê documentação técnica", "Espanhol, básico e estudando"],
    footer: "Ruan Vitorino · Santa Catarina, Brasil",
  },
};

export type Shot = { src: string; url: string; label: string; alt: string };

export type Extras = {
  shots: Record<string, Shot[]>;
};

export const extras: Record<Lang, Extras> = {
  en: {
    shots: {
      protocolos: [
        { src: "/shots/protocolos-inicio.jpg", url: "prototype", label: "Doctor's home screen (demo data)", alt: "Protocolos home screen for a doctor: active programs, today's sessions, adherence and unanswered conversations, with fictitious data" },
        { src: "/shots/protocolos-ficha.jpg", url: "prototype", label: "A patient's program (demo data)", alt: "A patient's 26-week program in Protocolos: sessions done, adherence, phases, goals and an AI summary of the journey, with fictitious data" },
        { src: "/shots/protocolos-lista.jpg", url: "prototype", label: "All programs (demo data)", alt: "Protocolos list of patient programs with status, adherence and renewal dates, with fictitious data" },
      ],
      smileia: [
        { src: "/shots/smile-hero.jpg", url: "smile.ia.br", label: "Sign in", alt: "SmileIA sign-in screen showing a WhatsApp conversation turning into a booked appointment" },
        { src: "/shots/smile-agente.jpg", url: "smile.ia.br/settings/ai-agent", label: "AI agent settings", alt: "SmileIA settings for the AI agent's voice and conversation rules" },
      ],
      appmulti: [
        { src: "/shots/appmulti-insights.jpg", url: "appmult.temp.ia.br/insights", label: "Instagram insights", alt: "AppMulti panel with live Instagram insights for a demo account" },
      ],
    },
  },
  es: {
    shots: {
      protocolos: [
        { src: "/shots/protocolos-inicio.jpg", url: "prototipo", label: "Inicio del médico (datos de demostración)", alt: "Pantalla de inicio de Protocolos para un médico: programas activos, sesiones de hoy, adherencia y conversaciones sin respuesta, con datos ficticios" },
        { src: "/shots/protocolos-ficha.jpg", url: "prototipo", label: "Programa de un paciente (datos de demostración)", alt: "Programa de 26 semanas de un paciente en Protocolos: sesiones, adherencia, fases, objetivos y un resumen del recorrido hecho por IA, con datos ficticios" },
        { src: "/shots/protocolos-lista.jpg", url: "prototipo", label: "Todos los programas (datos de demostración)", alt: "Lista de programas de pacientes en Protocolos con estado, adherencia y fechas de renovación, con datos ficticios" },
      ],
      smileia: [
        { src: "/shots/smile-hero.jpg", url: "smile.ia.br", label: "Acceso", alt: "Pantalla de acceso de SmileIA con una conversación de WhatsApp que acaba en cita reservada" },
        { src: "/shots/smile-agente.jpg", url: "smile.ia.br/ajustes/agente-ia", label: "Ajustes del agente de IA", alt: "Ajustes de voz y conversación del agente de IA en SmileIA" },
      ],
      appmulti: [
        { src: "/shots/appmulti-insights.jpg", url: "appmult.temp.ia.br/insights", label: "Métricas de Instagram", alt: "Panel de AppMulti con métricas de Instagram en vivo de una cuenta demo" },
      ],
    },
  },
  pt: {
    shots: {
      protocolos: [
        { src: "/shots/protocolos-inicio.jpg", url: "protótipo", label: "Início do médico (dados fictícios)", alt: "Tela inicial do Protocolos para o médico: protocolos em andamento, sessões do dia, adesão e conversas sem resposta, com dados fictícios" },
        { src: "/shots/protocolos-ficha.jpg", url: "protótipo", label: "Protocolo de um paciente (dados fictícios)", alt: "Protocolo de 26 semanas de um paciente: sessões, adesão, fases, objetivos e uma análise da jornada feita por IA, com dados fictícios" },
        { src: "/shots/protocolos-lista.jpg", url: "protótipo", label: "Todos os protocolos (dados fictícios)", alt: "Lista de protocolos dos pacientes com status, adesão e datas de renovação, com dados fictícios" },
      ],
      smileia: [
        { src: "/shots/smile-hero.jpg", url: "smile.ia.br", label: "Entrada", alt: "Tela de entrada do SmileIA com uma conversa de WhatsApp virando consulta marcada" },
        { src: "/shots/smile-agente.jpg", url: "smile.ia.br/configuracoes/agente-ia", label: "Configuração do agente de IA", alt: "Configurações de voz e conversa do agente de IA no SmileIA" },
      ],
      appmulti: [
        { src: "/shots/appmulti-insights.jpg", url: "appmult.temp.ia.br/insights", label: "Insights do Instagram", alt: "Painel do AppMulti com insights do Instagram ao vivo de uma conta demo" },
      ],
    },
  },
};
