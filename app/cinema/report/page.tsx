import type { Metadata } from "next";
import { CinemaDecisionReport } from "@/components/CinemaDecisionReport";

export const metadata: Metadata = {
  title: "OSA Cinema — Personal Decision Report",
  description: "A private, locally generated action report based on choices made in the interactive cinema.",
  robots: { index: false, follow: false }
};

export default function CinemaReportPage() {
  return <main style={{minHeight:"100vh",background:"#080b13",paddingTop:36}}>
    <div style={{maxWidth:1120,margin:"0 auto",padding:"0 24px 18px"}}>
      <a href="/cinema" style={{fontSize:12,color:"#91aaff",textDecoration:"none"}}>← Вернуться в OSA Cinema</a>
    </div>
    <CinemaDecisionReport />
  </main>;
}
