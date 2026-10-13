import type { Metadata } from "next";
import { AIFieldGuide } from "@/components/AIFieldGuide";

export const metadata: Metadata = {
  title: "AI Field Guide — OSA",
  description: "Семидневный практический маршрут: учёба, рабочие процессы и AI-пилоты.",
  robots: { index: false, follow: true }
};

export default function AIFieldGuidePage() {
  return <AIFieldGuide />;
}
