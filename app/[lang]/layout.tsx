import { prefixed } from "../paths";

// Spanish and Portuguese pages: /es, /pt, /es/now, /pt/work/smileia ... Any other first segment is a 404.
// English has no prefix (it lives at /, /now, /work/x), so "en" is not generated here either.
export const dynamicParams = false;

export function generateStaticParams() {
  return prefixed.map((lang) => ({ lang }));
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return children;
}
