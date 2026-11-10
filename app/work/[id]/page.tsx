import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, extras } from "../../content";
import Project from "./project";

export const dynamicParams = false;

export function generateStaticParams() {
  return copy.en.projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = copy.en.projects.find((x) => x.id === id);
  if (!p) return {};
  const title = `${p.name} · Ruan Vitorino`;
  // The project's first screenshot when it has one; the site card otherwise.
  const shot = extras.en.shots[id]?.[0];
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${id}` },
    openGraph: {
      type: "article",
      siteName: "Ruan Vitorino",
      url: `/work/${id}`,
      title,
      description: p.summary,
      images: shot ? [{ url: shot.src, alt: shot.alt }] : [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!copy.en.projects.some((x) => x.id === id)) notFound();
  return <Project id={id} />;
}
