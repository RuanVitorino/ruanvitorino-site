import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectIds, projectMetadata } from "../../locale";
import Project from "./project";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return projectMetadata("en", id);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!projectIds.includes(id)) notFound();
  return <Project id={id} lang="en" />;
}
