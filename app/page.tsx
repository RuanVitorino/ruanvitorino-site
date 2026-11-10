import type { Metadata } from "next";
import Home from "./home";
import { jsonLdScript, personJsonLd } from "./structured-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Read at build time: the free-text box only appears once the API key is set (env change + redeploy).
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }} />
      <Home live={Boolean(process.env.ANTHROPIC_API_KEY)} />
    </>
  );
}
