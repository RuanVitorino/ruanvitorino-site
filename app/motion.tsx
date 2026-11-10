"use client";

import { useEffect } from "react";

const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Page motion, kept to one job: sections fade and rise once as they enter the viewport.
export function Motion() {
  useEffect(() => {
    const reduce = still();
    document.documentElement.classList.add("motion");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add("in");
          io.unobserve(e.target);
        }
      },
      // Threshold 0: tall sections on phones must start as soon as their top edge shows.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => (reduce ? t.classList.add("in") : io.observe(t)));
    return () => io.disconnect();
  });
  return null;
}
