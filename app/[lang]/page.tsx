import type { Metadata } from "next";
import type { Lang } from "../content";
import { HomePage } from "../home-page";
import { homeMetadata } from "../locale";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return homeMetadata(lang as Lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return <HomePage lang={lang as Lang} />;
}
