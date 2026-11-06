import { copy } from "./content";
import { EMAIL, LINKS, SITE } from "./markdown";
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

export function personJsonLd() {
  const t = copy.en;
  const p = person.en;
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
        knowsLanguage: ["pt", "en", "es"],
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
