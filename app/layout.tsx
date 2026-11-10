import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./home.css";
import { siteDescription } from "./locale";

// One family for the interface and the headlines, a mono for dates and meta.
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description = siteDescription.en;

export const metadata: Metadata = {
  metadataBase: new URL("https://ruanvitorino.dev"),
  title: "Ruan Vitorino · Full-stack developer",
  description,
  openGraph: {
    type: "website",
    siteName: "Ruan Vitorino",
    url: "/",
    title: "Ruan Vitorino, full-stack developer",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
  ],
};

// Both run before paint. Language: /es and /pt are server-rendered in their language, so the script only sets <html lang>
// (the layout is shared with English). On a bare path (English) it sends a visitor whose saved or browser language is
// Spanish or Portuguese to that page, unless they chose English themselves; <html data-wait> hides the English page
// meanwhile (see globals.css). Old ?lang=xx links are redirected by the middleware. Theme: the saved choice, else the system preference.
const langScript = `(function(){try{var d=document.documentElement,p=location.pathname,m=/^\\/(es|pt)(\\/|$)/.exec(p);if(m){d.lang=m[1]==='pt'?'pt-BR':m[1];return}var l=null;try{l=localStorage.getItem('lang')}catch(e){}if(l!=='en'&&l!=='es'&&l!=='pt'){var n=navigator.language.toLowerCase();l=n.indexOf('es')===0?'es':n.indexOf('pt')===0?'pt':'en'}if(l==='en')return;d.dataset.wait=l;location.replace('/'+l+(p==='/'?'':p)+location.search+location.hash)}catch(e){}})()`;

const themeScript = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
