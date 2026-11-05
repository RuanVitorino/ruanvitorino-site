import type { Metadata } from "next";
import Now from "./now";

export const metadata: Metadata = { title: "Now · Ruan Vitorino", alternates: { canonical: "/now" } };

export default function Page() {
  return <Now />;
}
