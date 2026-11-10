import type { Metadata } from "next";
import { nowMetadata } from "../locale";
import Now from "./now";

export const metadata: Metadata = nowMetadata("en");

export default function Page() {
  return <Now lang="en" />;
}
