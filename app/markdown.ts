import { copy, type Project } from "./content";
import { more } from "./more-copy";
import { person } from "./person";

// Markdown twins of the HTML pages, served from the same URLs to clients that send Accept: text/markdown.
// Built from the same data the pages render, in English (the site's default language).

export const SITE = "https://ruanvitorino.dev";
export const EMAIL = "ruanrvitorino@gmail.com";
export const LINKS = {
  linkedin: "https://www.linkedin.com/in/ruan-vitorino/",
  github: "https://github.com/RuanVitorino",
};

const t = copy.en;
const p = person.en;

const list = (items: string[]) => items.map((s) => `- ${s}`).join("\n");

function projectLine(x: Project) {
  return `- [${x.name}](${SITE}/work/${x.id}): ${x.summary} (${x.meta})`;
}

function home() {
  const featured = p.featured.map((id) => t.projects.find((x) => x.id === id)).filter((x): x is Project => Boolean(x));
  const others = t.projects.filter((x) => !p.featured.includes(x.id));
  return `# Ruan Vitorino

> ${p.role} in ${p.location}. ${p.relocate}.

${p.bio.join("\n\n")}

## ${p.workTitle}

${featured.map(projectLine).join("\n")}

## ${p.othersTitle}

${others.map(projectLine).join("\n")}

${p.alsoNote}

## ${t.expTitle}

${list(t.jobs.map((j) => `**${j.role}**, ${j.org} (${j.when}): ${j.text}`))}

## Education

${list(t.edu.map((e) => `${e.title}, ${e.detail}`))}

## Languages

${list(t.spoken)}

## Stack

${list(t.stack.map((g) => `${g.group}: ${g.items.join(", ")}`))}

## Contact

${p.contactText}

- Email: [${EMAIL}](mailto:${EMAIL})
- [LinkedIn](${LINKS.linkedin})
- [GitHub](${LINKS.github}) (product repositories are private)
- CV (PDF): [English](${SITE}/Ruan-Vitorino-CV-EN.pdf), [Español](${SITE}/Ruan-Vitorino-CV-ES.pdf), [Português](${SITE}/Ruan-Vitorino-CV-PT.pdf)
- [Contact card (vCard)](${SITE}/ruan-vitorino.vcf)

## More

- [What I'm doing now](${SITE}/now)
- [llms.txt](${SITE}/llms.txt): when an agent should use this site
- [Sitemap](${SITE}/sitemap.xml)
`;
}

function project(x: Project) {
  const pg = p.page;
  const [role, period] = x.meta.split(" · ");
  return `# ${x.name}

> ${x.summary}

- ${pg.role}: ${role}
- ${pg.period}: ${period ?? ""}
- ${pg.stack}: ${x.stack.join(", ")}

## ${pg.what}

${list(x.points)}

## ${pg.how}

${list(x.architecture.map((a) => `**${a.title}**: ${a.text}`))}

---

A project by [Ruan Vitorino](${SITE}/), ${p.role.toLowerCase()}. ${pg.more}: [all projects](${SITE}/). Contact: [${EMAIL}](mailto:${EMAIL}).
`;
}

function now() {
  const n = more.en.nowPage;
  return `# ${n.title}

> ${n.updated}

${n.sections.map((s) => `## ${s.title}\n\n${list(s.items)}`).join("\n\n")}

---

[Ruan Vitorino](${SITE}/), ${p.role.toLowerCase()}. Contact: [${EMAIL}](mailto:${EMAIL}).
`;
}

// The Markdown for a page path, or null when the path is not a page (the caller answers 404).
export function pageMarkdown(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/") return home();
  if (path === "/now") return now();
  const m = /^\/work\/([^/]+)$/.exec(path);
  if (m) {
    const x = t.projects.find((y) => y.id === m[1]);
    return x ? project(x) : null;
  }
  return null;
}

export function notFoundMarkdown(pathname: string) {
  return `# Page not found

There is no page at \`${pathname.replace(/[`\n\r]/g, "")}\` on ruanvitorino.dev (HTTP 404).

This is the portfolio of Ruan Vitorino, ${p.role.toLowerCase()}. Pages that exist:

- [Home](${SITE}/): profile, projects, experience and contact
- [Now](${SITE}/now): what he is working on
${t.projects.map((x) => `- [${x.name}](${SITE}/work/${x.id})`).join("\n")}

Every page above also answers in Markdown when requested with \`Accept: text/markdown\`. See [llms.txt](${SITE}/llms.txt) and the [sitemap](${SITE}/sitemap.xml).
`;
}
