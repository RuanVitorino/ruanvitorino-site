import { NextResponse, type NextRequest } from "next/server";
import { notFoundMarkdown, pageMarkdown } from "./app/markdown";
import { negotiate } from "./app/negotiate";

// Same URL, two representations: HTML for browsers, Markdown for clients that ask for text/markdown.
// Next's own traffic (RSC payloads, prefetches, server actions) is never negotiated. Next already strips the
// flight headers before middleware on the Node runtime and its router sends Accept: */*; these checks cover the rest.
function isNextInternal(req: NextRequest) {
  const h = req.headers;
  return (
    h.has("rsc") ||
    h.has("next-router-prefetch") ||
    h.has("next-router-state-tree") ||
    h.has("next-action") ||
    req.nextUrl.searchParams.has("_rsc")
  );
}

export function middleware(req: NextRequest) {
  if ((req.method !== "GET" && req.method !== "HEAD") || isNextInternal(req)) return NextResponse.next();

  const rep = negotiate(req.headers.get("accept"));

  if (rep === "md") {
    const { pathname } = req.nextUrl;
    const body = pageMarkdown(pathname);
    return new NextResponse(body ?? notFoundMarkdown(pathname), {
      status: body ? 200 : 404,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        vary: "Accept",
        "cache-control": body ? "public, max-age=0, must-revalidate" : "no-store",
        link: '<https://ruanvitorino.dev/llms.txt>; rel="describedby"; type="text/plain"',
      },
    });
  }

  if (rep === null) {
    return new NextResponse("This resource is available in:\n- text/html\n- text/markdown\n", {
      status: 406,
      headers: { "content-type": "text/plain; charset=utf-8", vary: "Accept", "cache-control": "no-store" },
    });
  }

  // HTML goes through untouched: Next sets its own Vary on rendered pages, and on Vercel this middleware runs
  // before the edge cache, so a Markdown request never receives the cached HTML.
  return NextResponse.next();
}

export const config = {
  // Pages only: no Next assets, no API routes, no files with an extension (llms.txt, sitemap.xml, PDFs, images).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
