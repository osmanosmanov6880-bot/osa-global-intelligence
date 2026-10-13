import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "OSA — Beyond the Model", template: "%s · OSA" },
  description: "An interactive journey through AI, the power of knowledge, and human agency.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://osa.global"),
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}