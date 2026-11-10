import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";
// Vercel preview deployments load the comment toolbar from vercel.live.
const preview = process.env.VERCEL_ENV === "preview";
const live = preview ? " https://vercel.live" : "";

// The site loads nothing from other origins: fonts are self-hosted by next/font and every image is local.
// 'unsafe-inline' stays because the pages are static: Next's inline bootstrap scripts and React's style
// attributes can't carry a per-request nonce without giving up static rendering.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}${live}`,
  `style-src 'self' 'unsafe-inline'${live}`,
  `img-src 'self' data: blob:${preview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${preview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${dev ? " ws:" : ""}${preview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${preview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const config: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // The pages under /es and /pt are in that language; <html lang> is set on the client (the layout is shared).
      { source: "/es/:path*", headers: [{ key: "Content-Language", value: "es" }] },
      { source: "/pt/:path*", headers: [{ key: "Content-Language", value: "pt-BR" }] },
    ];
  },
};

export default config;
