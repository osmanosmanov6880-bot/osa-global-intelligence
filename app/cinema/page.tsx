import type { Metadata } from "next";
import { InteractiveCinema } from "@/components/InteractiveCinema";

export const metadata: Metadata = {
  title: "Beyond the Model — Interactive Cinema",
  description: "Three chapters. One question: what will you do with the future?",
  robots: { index: false, follow: false }
};

export default function CinemaPage() {
  return <InteractiveCinema />;
}