import Home from "./home";

// Read at build time: the free-text box only appears once the API key is set (env change + redeploy).
export default function Page() {
  return <Home live={Boolean(process.env.ANTHROPIC_API_KEY)} />;
}
