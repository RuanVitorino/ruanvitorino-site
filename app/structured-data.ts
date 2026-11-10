import { copy } from "./content";
import { EMAIL, LINKS, SITE } from "./markdown";
import type { Lang } from "./content";
import { person } from "./person";

// schema.org Person for the homepage. Every value is something the page itself says.
// knowsAbout: only terms visible in the homepage's text (checked by tests/live.test.ts), most relevant first.
export const KNOWS_ABOUT = [
  "Next.js",
  "React",
  "Supabase",
  "WhatsApp Cloud API",
  "Instagram Graph API",
  "TOTVS Protheus",
  "ADVPL",
  "SQL Server",
  "Python",
  "Vercel",
];

const LANGUAGE_CODES: Record<string, string> = { Portuguese: "pt", English: "en", Spanish: "es" };

// "English, basic (A2), studying" becomes a Language with its level, so a reader doesn't assume fluency.
function spokenLanguages(spoken: string[]) {
  return spoken.map((line) => {
    const cut = line.indexOf(", ");
    const name = cut < 0 ? line : line.slice(0, cut);
    return {
      "@type": "Language",
      name,
      ...(LANGUAGE_CODES[name] && { alternateName: LANGUAGE_CODES[name] }),
      ...(cut >= 0 && { description: line.slice(cut + 2) }),
    };
  });
}

// Facts and languages stay in English (the entity is the same on every page); the title and description follow the page.
export function personJsonLd(lang: Lang = "en") {
  const t = copy.en;
  const p = person[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "Ruan Vitorino",
        url: `${SITE}/`,
        image: `${SITE}/ruan.jpg`,
        jobTitle: p.role,
        description: p.bio[0],
        email: `mailto:${EMAIL}`,
        address: { "@type": "PostalAddress", addressRegion: "Santa Catarina", addressCountry: "BR" },
        sameAs: [LINKS.linkedin, LINKS.github],
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: spokenLanguages(t.spoken),
        // Current jobs only ("... to now").
        worksFor: t.jobs.filter((j) => /to now$/.test(j.when)).map((j) => ({ "@type": "Organization", name: j.org })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "Ruan Vitorino",
        inLanguage: ["en", "es", "pt"],
        about: { "@id": `${SITE}/#person` },
      },
    ],
  };
}

// Safe inside <script>: no "</script>" or HTML comment can be formed from the data.
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
