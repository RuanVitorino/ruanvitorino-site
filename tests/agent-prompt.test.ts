import { describe, expect, it } from "vitest";
import { SYSTEM } from "../app/agent-prompt";
import { person } from "../app/person";

describe("agent system prompt", () => {
  it("carries the availability facts the site publishes", () => {
    expect(SYSTEM).toContain("# Availability");
    for (const it of person.en.seeking.items) expect(SYSTEM).toContain(`- ${it.k}: ${it.v}`);
    expect(SYSTEM).toContain("Work authorization, visa and salary: not stated on the site; discussed by email.");
  });

  it("no longer refuses availability questions outright, and keeps salary off limits", () => {
    expect(SYSTEM).not.toContain("Never guess salaries, visas");
    expect(SYSTEM).toContain("say those are discussed by email and never guess them");
  });

  it("offers the Europe question in every language, not the English-level one", () => {
    for (const lang of ["en", "es", "pt"] as const) {
      const qs = person[lang].agent.suggestions.map((s) => s.q);
      expect(qs.some((q) => /Europ/.test(q))).toBe(true);
      expect(qs.some((q) => /English level|nivel de inglés|nível de inglês/.test(q))).toBe(false);
    }
  });
});
