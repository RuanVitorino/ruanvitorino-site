import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy } from "../../content";
import Project from "./project";

export const dynamicParams = false;

export function generateStaticParams() {
  return copy.en.projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = copy.en.projects.find((x) => x.id === id);
  return p ? { title: `${p.name} · Ruan Vitorino`, description: p.summary } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!copy.en.projects.some((x) => x.id === id)) notFound();
  return <Project id={id} />;
}
