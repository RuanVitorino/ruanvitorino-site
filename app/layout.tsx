import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./home.css";

// One family for the interface and the headlines, a mono for dates and meta.
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description =
  "Full-stack developer in Santa Catarina, Brazil. Co-founder of Temp.IA, where I build AI products that talk to customers on WhatsApp and Instagram.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ruanvitorino.dev"),
  title: "Ruan Vitorino",
  description,
  openGraph: {
    type: "website",
    url: "/",
    title: "Ruan Vitorino, full-stack developer",
    description,
    images: [{ url: "/og.png", width: 1200, height: 627 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
  ],
};

// Runs before paint so the saved theme never flashes the other one.
const langScript = `(function(){try{var d=document.documentElement,ok=function(v){return v==='en'||v==='es'||v==='pt'},l=new URLSearchParams(location.search).get('lang');if(!ok(l)){l=localStorage.getItem('lang')}if(!ok(l)){var n=navigator.language.toLowerCase();l=n.indexOf('es')===0?'es':n.indexOf('pt')===0?'pt':'en'}if(l!=='en'){d.dataset.wait=l}}catch(e){}})()`;

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){t='dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

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
