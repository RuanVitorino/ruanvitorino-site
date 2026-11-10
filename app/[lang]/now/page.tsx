import type { Metadata } from "next";
import type { Lang } from "../../content";
import { nowMetadata } from "../../locale";
import Now from "../../now/now";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return nowMetadata(lang as Lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return <Now lang={lang as Lang} />;
}
