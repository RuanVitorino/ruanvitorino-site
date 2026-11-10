import type { Metadata } from "next";
import { HomePage } from "./home-page";
import { homeMetadata } from "./locale";

export const metadata: Metadata = homeMetadata("en");

export default function Page() {
  return <HomePage lang="en" />;
}
