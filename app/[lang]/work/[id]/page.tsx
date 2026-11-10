import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "../../../content";
import { projectIds, projectMetadata } from "../../../locale";
import Project from "../../../work/[id]/project";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

type Props = { params: Promise<{ lang: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  return projectMetadata(lang as Lang, id);
}

export default async function Page({ params }: Props) {
  const { lang, id } = await params;
  if (!projectIds.includes(id)) notFound();
  return <Project id={id} lang={lang as Lang} />;
}
