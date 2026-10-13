import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, FileText } from "lucide-react";
import { InteractiveCinema } from "@/components/InteractiveCinema";
import { CinemaMission } from "@/components/CinemaMission";

export const metadata: Metadata = {
  title: "Beyond the Model — Interactive Cinema",
  description: "Three chapters. One question: what will you do with the future?",
  robots: { index: false, follow: false }
};

const panel = { border: "1px solid #293145", background: "linear-gradient(115deg,#101522,#142039)", padding: "clamp(22px,4vw,38px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" as const };
const copy = { maxWidth: 650 };
const kicker = { font: "10px 'DM Mono',monospace", letterSpacing: "1.4px", color: "#91aaff", margin: "0 0 14px" };
const heading = { font: "clamp(27px,4vw,40px)/1.08 Georgia,serif", fontWeight: 400, margin: "0 0 12px" };
const paragraph = { fontSize: 13, lineHeight: 1.8, color: "#aeb9ce", margin: 0 };
const linkStyle = { display: "inline-flex", alignItems: "center", gap: 10, background: "#dce7ff", color: "#0b1220", padding: "13px 17px", fontSize: 12, fontWeight: 800, textDecoration: "none", borderRadius: 3, whiteSpace: "nowrap" as const };

export default function CinemaPage() {
  return <>
    <InteractiveCinema />
    <section style={{maxWidth:1120,margin:"0 auto",padding:"20px 24px 30px",color:"#f4f7ff"}}>
      <div style={panel}>
        <div style={copy}>
          <p style={kicker}>OSA / YOUR DECISION PROFILE</p>
          <h2 style={heading}>История заканчивается. Ваша стратегия — нет.</h2>
          <p style={paragraph}>Соберите выборы из трёх глав в персональный отчёт с практическими следующими шагами. Отчёт формируется на устройстве и экспортируется в текстовый файл.</p>
        </div>
        <Link href="/cinema/report" style={linkStyle}><FileText size={16}/> Мой отчёт <ArrowUpRight size={16}/></Link>
      </div>
      <div style={{...panel,marginTop:14}}>
        <div style={copy}>
          <p style={kicker}>OSA / DECISION LAB</p>
          <h2 style={heading}>Не просто узнай. Проверь, как решаешь.</h2>
          <p style={paragraph}>Пройди три сценария с последствиями решений: проверка ответов ИИ, безопасная автоматизация и независимость суждения.</p>
        </div>
        <Link href="/cinema/lab" style={linkStyle}><Compass size={16}/> Открыть Decision Lab <ArrowUpRight size={16}/></Link>
      </div>
      <div style={{...panel,marginTop:14,background:"#0d121d"}}>
        <div style={{maxWidth:670}}>
          <p style={kicker}>OSA / APPLIED INTELLIGENCE · 7 DAYS</p>
          <h2 style={{...heading,fontSize:"clamp(25px,3.5vw,36px)"}}>Преврати понимание в личную практику.</h2>
          <p style={paragraph}>Выбери цель — учиться быстрее, улучшить рабочий процесс или спроектировать AI-пилот. Получи ежедневные действия и критерии проверки.</p>
        </div>
        <Link href="/cinema/field-guide" style={{...linkStyle,background:"#7799ff"}}>Открыть AI Field Guide <ArrowRight size={16}/></Link>
      </div>
    </section>
    <CinemaMission />
  </>;
}
