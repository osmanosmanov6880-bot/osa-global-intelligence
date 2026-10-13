import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { InteractiveCinema } from "@/components/InteractiveCinema";

export const metadata: Metadata = {
  title: "Beyond the Model — Interactive Cinema",
  description: "Three chapters. One question: what will you do with the future?",
  robots: { index: false, follow: false }
};

export default function CinemaPage() {
  return <>
    <InteractiveCinema />
    <section style={{maxWidth: 1120, margin: "0 auto", padding: "20px 24px 64px", color: "#f4f7ff"}}>
      <div style={{border: "1px solid #293145", background: "linear-gradient(115deg,#101522,#142039)", padding: "clamp(22px,4vw,38px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap"}}>
        <div style={{maxWidth: 650}}>
          <p style={{font: "10px 'DM Mono',monospace", letterSpacing: "1.4px", color: "#91aaff", margin: "0 0 14px"}}>OSA / DECISION LAB</p>
          <h2 style={{font: "clamp(27px,4vw,40px)/1.08 Georgia,serif", fontWeight: 400, margin: "0 0 12px"}}>Не просто узнай. Проверь, как решаешь.</h2>
          <p style={{fontSize: 13, lineHeight: 1.8, color: "#aeb9ce", margin: 0}}>Пройди три сценария с последствиями решений: проверка ответов ИИ, безопасная автоматизация и независимость суждения.</p>
        </div>
        <Link href="/cinema/lab" style={{display:"inline-flex",alignItems:"center",gap:10,background:"#dce7ff",color:"#0b1220",padding:"13px 17px",fontSize:12,fontWeight:800,textDecoration:"none",borderRadius:3,whiteSpace:"nowrap"}}><Compass size={16}/> Открыть Decision Lab <ArrowUpRight size={16}/></Link>
      </div>
    </section>
  </>;
}
