import { describe, expect, it } from "vitest";
import { negotiate } from "../app/negotiate";

const CHROME = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";

describe("negotiate", () => {
  // Test vectors from acceptmarkdown.com/guides/accept-parsing (server produces md and html).
  it.each([
    ["text/markdown", "md"],
    ["text/markdown, text/html;q=0.8", "md"],
    ["text/html", "html"],
    ["text/markdown;q=0, text/html", "html"],
    ["text/markdown;q=0", "html"],
    ["*/*", "html"],
  ])("%s → %s", (accept, want) => {
    expect(negotiate(accept)).toBe(want);
  });

  it("serves HTML when there is no Accept header", () => {
    expect(negotiate(null)).toBe("html");
    expect(negotiate("")).toBe("html");
  });

  it("serves HTML to a real Chrome header", () => {
    expect(negotiate(CHROME)).toBe("html");
  });

  it("ranks by q and breaks ties by specificity", () => {
    expect(negotiate("text/markdown, text/html")).toBe("md");
    expect(negotiate("text/html, text/markdown")).toBe("md");
    expect(negotiate("text/markdown;q=0.5, */*;q=0.5")).toBe("md");
    expect(negotiate("text/*, */*")).toBe("html");
    expect(negotiate("text/html;q=0.5, text/markdown;q=0.9")).toBe("md");
    expect(negotiate("text/*")).toBe("html");
  });

  it("prefers the most specific match over a wildcard", () => {
    expect(negotiate("text/html;q=0, */*;q=0.5")).toBe("md");
    expect(negotiate("text/markdown;q=0, text/*")).toBe("html");
  });

  it("is case-insensitive and tolerates whitespace and charset params", () => {
    expect(negotiate("  Text/Markdown ; charset=utf-8 ;Q=1 ")).toBe("md");
  });

  it("falls back to HTML for types it does not produce instead of 406", () => {
    expect(negotiate("application/json")).toBe("html");
    expect(negotiate("text/plain")).toBe("html");
    expect(negotiate("application/xhtml+xml")).toBe("html");
  });

  it("returns 406 (null) only when both representations are refused", () => {
    expect(negotiate("*/*;q=0")).toBeNull();
    expect(negotiate("text/markdown;q=0, text/html;q=0")).toBeNull();
  });
});
