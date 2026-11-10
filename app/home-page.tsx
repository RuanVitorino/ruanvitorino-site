import type { Lang } from "./content";
import Home from "./home";
import { jsonLdScript, personJsonLd } from "./structured-data";

// Read at build time: the free-text box only appears once the API key is set (env change + redeploy).
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd(lang)) }} />
      <Home lang={lang} live={Boolean(process.env.ANTHROPIC_API_KEY)} />
    </>
  );
}
