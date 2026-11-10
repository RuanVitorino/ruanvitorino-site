# ruanvitorino.dev

My portfolio site: [ruanvitorino.dev](https://ruanvitorino.dev). The product repositories I work on are private, so this repo is the public sample of how I write code.

Next.js 15 (App Router), React 19 and TypeScript, deployed on Vercel. No UI library or CSS framework: plain CSS with custom properties for the light and dark themes.

## What's in it

- **Three languages (English, Spanish, Portuguese)**, each on its own URL and rendered on the server: English at the bare paths (`/`, `/now`, `/work/x`), Spanish and Portuguese under `/es` and `/pt` (`app/[lang]`). All copy lives in typed objects (`app/content.ts`, `app/person.ts`, `app/more-copy.ts`), and the pages of every language share the same components. Each page names the others with `hreflang` (in the `<head>` and in `sitemap.xml`) and points its canonical at itself, so search engines index the three. The language switcher is a set of links to the same page in the other language. A visitor on a bare path whose saved or browser language is Spanish or Portuguese is sent to that page before first paint (a client-side redirect; a saved English choice stays put), and old `?lang=` links are redirected by the middleware. The theme (the saved choice, otherwise the system preference) is also resolved by an inline script before first paint. The root layout is shared, so `<html lang>` is corrected by that script rather than by the server; the language of each response is in its `Content-Language` header.
- **Project pages** generated statically from the same data (`app/work/[id]`), each with an interactive "how it works" diagram and a simulated demo with fictional data.
- **A live status badge** for products that run in production (`app/api/status`), cached at the edge for a minute so visitors never hit the product directly.
- **"Ask my agent"**: a chat that answers recruiters' questions about my experience, described below.
- **Readable by AI agents.** Every page URL also answers in Markdown (in English, also on `/es` and `/pt`) when requested with `Accept: text/markdown` (`middleware.ts`, `app/negotiate.ts`, `app/markdown.ts`). Markdown responses carry `Vary: Accept`, and unknown paths get a Markdown 404. The homepage carries schema.org `Person` JSON-LD, and `/llms.txt` tells agents when to use the site. All three are generated from the same data the pages render.
- **Security headers** on every response (`next.config.ts`): a Content-Security-Policy limited to the site's own origin, `nosniff`, a strict referrer policy and no framing.

## Tests

```bash
npm test                                         # unit tests (Vitest)
SITE_URL=http://localhost:4400 npm test          # plus end-to-end checks against a running server
```

## The agent

`app/api/agent/route.ts` and `app/agent-prompt.ts`.

- **Grounded on the CV only.** The system prompt is built at module load from the same data the page renders, so the agent can't drift from what the site says. It answers in the language of the question, cites its sources ("CV · Skills", "Project · SmileIA") and says it doesn't know instead of guessing. Where he can work, start date and dedication come from the homepage's "What I'm looking for" section; work authorization and salary are left to email, and it never guesses anything the site doesn't say.
- **Claude API with streaming.** The route streams text deltas straight to the browser as a plain-text `ReadableStream`, and aborts the upstream request when the visitor leaves.
- **Cost and abuse.** Low effort, prompt caching, a 400-character question limit, only the last six messages of history, and a per-IP rate limit. The API key stays on the server, and prepaid API credits are the hard spending cap.
- **Graceful failure.** If the API is down or out of credits, the suggested questions still get their pre-written answers, and anything else points to my email.
- **Server-side fallback** on refusals, so a false positive from a safety classifier doesn't leave the visitor without an answer.

### Testing it

`scripts/agent-eval.ts` runs the real prompt and model against a fixed set of 50 questions in five groups: facts that are in the CV, facts that aren't (it must say it doesn't know), sensitive questions (it must not guess), prompt-injection attempts, and judgement calls ("is he senior?", "why hire him?").

```bash
ANTHROPIC_API_KEY=... npx tsx scripts/agent-eval.ts > eval.json
```

## Running it locally

```bash
npm install
npm run dev   # http://localhost:4400
```

Without `ANTHROPIC_API_KEY` the site works and the agent falls back to its pre-written answers.

## Contact

ruanrvitorino@gmail.com · [LinkedIn](https://www.linkedin.com/in/ruan-vitorino/)
