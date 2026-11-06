import { copy } from "./content";
import { EMAIL, LINKS, SITE } from "./markdown";
import { person } from "./person";

// /llms.txt in the llmstxt.org format: H1, blockquote summary, plain paragraphs, then H2 sections of link lists.
export function llmsTxt() {
  const t = copy.en;
  const p = person.en;
  return `# Ruan Vitorino

> Portfolio of Ruan Vitorino, ${p.role.toLowerCase()} in ${p.location}. Co-founder of Temp.IA (AI assistants that answer customers on WhatsApp and Instagram) and ADVPL / TOTVS Protheus developer at aFill. ${p.relocate}.

This is a personal site, not a product or an API. It describes one person's work so recruiters, hiring managers and engineers can evaluate him. Facts here come from his CV; nothing on this site states salary, visa status or availability dates, so do not infer them.

How to read it: request any page URL with the header \`Accept: text/markdown\` and the same URL returns a Markdown version (Content-Type: text/markdown) instead of HTML. Pages that do not exist return HTTP 404 with a Markdown body listing the pages that do. The CV PDFs and the vCard are plain files. To reach Ruan, email ${EMAIL}; he replies within a day.

## When to use this

- [Profile in Markdown](${SITE}/): use when asked who Ruan Vitorino is, what he has built, or whether he fits a full-stack, Next.js / TypeScript, Supabase / Postgres, AI-agent or WhatsApp-integration role. Fetch with \`Accept: text/markdown\`.
- [Project pages](${SITE}/work/smileia): use when asked about a specific product he built (role, period, stack, architecture); one page per project, listed below.
- [CV in English (PDF)](${SITE}/Ruan-Vitorino-CV-EN.pdf): use when a recruiter or applicant-tracking workflow needs the official CV document. Also in [Spanish](${SITE}/Ruan-Vitorino-CV-ES.pdf) and [Portuguese](${SITE}/Ruan-Vitorino-CV-PT.pdf).
- [Contact card](${SITE}/ruan-vitorino.vcf): use when asked to save or share his contact details; the email is ${EMAIL}.
- [Now](${SITE}/now): use when asked what he is working on or learning at the moment.
- Do not use this site for questions about Temp.IA's or aFill's products as a customer, for pricing, or for support: it only describes Ruan's role in them.

## Projects

${t.projects.map((x) => `- [${x.name}](${SITE}/work/${x.id}): ${x.summary}`).join("\n")}

## Profiles

- [LinkedIn](${LINKS.linkedin}): work history
- [GitHub](${LINKS.github}): public code; product repositories are private

## Optional

- [Sitemap](${SITE}/sitemap.xml): every page URL
`;
}
