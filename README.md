# ruanvitorino.dev

My portfolio site: [ruanvitorino.dev](https://ruanvitorino.dev). The product repositories I work on are private, so this repo is the public sample of how I write code.

Next.js 15 (App Router), React 19 and TypeScript, deployed on Vercel. No UI library or CSS framework: plain CSS with custom properties for the light and dark themes.

## What's in it

- **Three languages (English, Spanish, Portuguese)** without route duplication. All copy lives in typed objects (`app/content.ts`, `app/person.ts`, `app/more-copy.ts`), and an inline script picks the language and theme before first paint, so there's no flash of the wrong one.
- **Project pages** generated statically from the same data (`app/work/[id]`), each with an interactive "how it works" diagram and a simulated demo with fictional data.
- **A live status badge** for products that run in production (`app/api/status`), cached at the edge for a minute so visitors never hit the product directly.
- **"Ask my agent"**: a chat that answers recruiters' questions about my experience, described below.
- **Readable by AI agents.** Every page URL also answers in Markdown when requested with `Accept: text/markdown` (`middleware.ts`, `app/negotiate.ts`, `app/markdown.ts`). Markdown responses carry `Vary: Accept`, and unknown paths get a Markdown 404. The homepage carries schema.org `Person` JSON-LD, and `/llms.txt` tells agents when to use the site. All three are generated from the same data the pages render.

## Tests

```bash
npm test                                         # unit tests (Vitest)
SITE_URL=http://localhost:4400 npm test          # plus end-to-end checks against a running server
```

## The agent

`app/api/agent/route.ts` and `app/agent-prompt.ts`.

- **Grounded on the CV only.** The system prompt is built at module load from the same data the page renders, so the agent can't drift from what the site says. It answers in the language of the question, cites its sources ("CV · Skills", "Project · SmileIA") and says it doesn't know instead of guessing. It never guesses salary, visa status or availability.
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
