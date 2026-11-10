import type { Metadata } from "next";
import Now from "./now";

const title = "Now · Ruan Vitorino";
const description = "What Ruan Vitorino is building and learning right now, and how he uses AI to build.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/now" },
  openGraph: { type: "website", siteName: "Ruan Vitorino", url: "/now", title, description, images: [{ url: "/og.png", width: 1200, height: 630 }] },
};

export default function Page() {
  return <Now />;
}
