import type { Metadata } from "next";
import { CinemaDecisionLab } from "@/components/CinemaDecisionLab";

export const metadata: Metadata = {
  title: "OSA Decision Lab — проверь, как решаешь",
  description: "Три интерактивных сценария о проверке ИИ, автоматизации и информационном влиянии.",
  robots: { index: false, follow: true }
};

export default function CinemaLabPage() {
  return <CinemaDecisionLab />;
}
