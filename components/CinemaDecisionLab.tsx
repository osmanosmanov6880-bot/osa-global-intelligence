"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShieldCheck } from "lucide-react";

const cases = [
  { title: "ИИ предлагает уверенный ответ, но не даёт источников.", prompt: "Ты готовишь решение, которое повлияет на команду. Что делаешь?", options: [
    { title: "Использую ответ как есть", text: "Быстро, но риск незаметной ошибки остаётся высоким.", lesson: "Гладкий ответ — не доказательство. Чем выше цена ошибки, тем строже проверка." },
    { title: "Прошу объяснить шаги", text: "Контекст становится яснее, но объяснение тоже может содержать ошибки.", lesson: "Объяснение помогает сформировать гипотезы. Проверяй факты независимо." },
    { title: "Определяю критерии и сверяю первоисточники", text: "Это требует времени, зато сохраняет независимую точку отсчёта.", lesson: "Для важных решений сначала задай критерии, затем проверь критические утверждения." }
  ]},
  { title: "Команда хочет автоматизировать весь процесс.", prompt: "Что разумнее сделать первым?", options: [
    { title: "Сразу передать ИИ весь процесс", text: "Потенциальный выигрыш велик, но ошибка может распространиться на всё.", lesson: "Не автоматизируй вслепую: сначала измерь базовое качество и добавь откат." },
    { title: "Проверить одну повторяющуюся задачу", text: "Маленький эксперимент показывает реальную пользу и цену ошибки.", lesson: "Сравни время, качество, исправления и безопасность до масштабирования." },
    { title: "Запретить любые AI-инструменты", text: "Риск внедрения уменьшается, но теряется возможность безопасно научиться.", lesson: "Вместо крайностей выбирай контролируемый эксперимент с низкой ценой ошибки." }
  ]},
  { title: "Рекомендательная система показывает один популярный взгляд.", prompt: "Как сохранить независимость суждения?", options: [
    { title: "Считать популярность подтверждением", text: "Популярность показывает внимание, но не достоверность.", lesson: "Охват и истинность — разные характеристики." },
    { title: "Искать первоисточник и альтернативные объяснения", text: "Ты проверяешь основания и то, что могло остаться за рамкой.", lesson: "Сравни первоисточники, дату, независимость подтверждений и ограничения данных." },
    { title: "Полностью отказаться от алгоритмов", text: "Это снижает влияние рекомендаций, но не заменяет собственную проверку.", lesson: "Полезнее понимать ограничения системы и сохранять альтернативные пути поиска." }
  ]}
];

export function CinemaDecisionLab() {
  const [caseNo, setCaseNo] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("osa-cinema-lab-v1");
      if (raw) { const d = JSON.parse(raw); if (d.picked && typeof d.picked === "object") setPicked(d.picked); if (Number.isInteger(d.caseNo)) setCaseNo(Math.min(2, Math.max(0, d.caseNo))); }
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("osa-cinema-lab-v1", JSON.stringify({ caseNo, picked })); } catch {} }, [caseNo, picked]);
  const current = cases[caseNo];
  const choice = picked[caseNo];
  const reset = () => { setCaseNo(0); setPicked({}); setSaved(false); try { localStorage.removeItem("osa-cinema-lab-v1"); } catch {} };
  return <main className="lab">
    <header><Link href="/cinema" className="back"><ArrowLeft size={15}/> Вернуться в киноопыт</Link><span>OSA / DECISION LAB</span></header>
    <section className="hero"><p className="eyebrow">ИНТЕРАКТИВНЫЙ ЭКСПЕРИМЕНТ · {String(caseNo + 1).padStart(2, "0")} / 03</p><h1>Не просто узнай.<br/><em>Проверь, как решаешь.</em></h1><p className="intro">Три реалистичных сценария о проверке ИИ, автоматизации и информационном влиянии. Здесь нет магического выбора — есть последствия, критерии и вопросы для размышления.</p><div className="bar"><span style={{width: ((caseNo + 1) / cases.length * 100) + "%"}}/></div></section>
    <section className="case"><div className="case-label"><ShieldCheck size={16}/> СЦЕНАРИЙ {String(caseNo + 1).padStart(2,"0")}</div><h2>{current.title}</h2><p>{current.prompt}</p><div className="options">{current.options.map((o,i)=><button key={o.title} className={choice===i?"selected":""} onClick={()=>{setPicked(p=>({...p,[caseNo]:i}));setSaved(false)}}><span>{String.fromCharCode(65+i)}</span><strong>{o.title}</strong>{choice===i&&<Check size={17}/>}</button>)}</div>
    {choice!==undefined&&<div className="feedback" role="status"><b>ЧТО ПРОИЗОШЛО</b><p>{current.options[choice].text}</p><b>ПРИНЦИП</b><p>{current.options[choice].lesson}</p></div>}
    <div className="actions"><button className="secondary" disabled={caseNo===0} onClick={()=>setCaseNo(n=>Math.max(0,n-1))}><ArrowLeft size={15}/> Назад</button>{caseNo<cases.length-1?<button className="primary" onClick={()=>{setCaseNo(n=>n+1);setSaved(false)}}>Следующий сценарий <ArrowRight size={15}/></button>:<button className="primary" onClick={()=>setSaved(true)}>Завершить эксперимент <Check size={15}/></button>}</div>
    {saved&&<div className="feedback final" role="status"><b>ЭКСПЕРИМЕНТ ЗАВЕРШЁН</b><p>Выбери одну реальную задачу на этой неделе. Определи критерии успеха до использования ИИ, проверь результат и запиши, что изменилось. Прогресс этого эксперимента сохранён локально в браузере.</p><button className="secondary" onClick={reset}><RotateCcw size={14}/> Пройти заново</button></div>}
    </section>
    <section className="sources"><p className="eyebrow">ПЕРВОИСТОЧНИКИ ДЛЯ ПРОВЕРКИ</p><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">NIST · AI Risk Management Framework ↗</a><a href="https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" target="_blank" rel="noreferrer">UNESCO · Recommendation on the Ethics of AI ↗</a><a href="https://hai.stanford.edu/ai-index" target="_blank" rel="noreferrer">Stanford HAI · AI Index ↗</a></section>
    <style jsx>{`
      .lab{max-width:1060px;margin:0 auto;padding:0 24px 70px;color:#f4f7ff;min-height:100vh}.lab header{height:70px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #293145;font:10px 'DM Mono',monospace;letter-spacing:1px;color:#8492ab}.back{display:flex;align-items:center;gap:8px;color:#c8d3e9;text-decoration:none}.hero{padding:clamp(40px,8vw,84px) 0 34px}.eyebrow{font:10px 'DM Mono',monospace;letter-spacing:1.4px;color:#91aaff}.hero h1{font:clamp(42px,7vw,76px)/.99 Georgia,serif;font-weight:400;letter-spacing:-.05em;margin:22px 0}.hero h1 em{color:#91aaff;font-weight:400}.intro{max-width:620px;font-size:14px;line-height:1.85;color:#aeb9ce}.bar{height:3px;background:#202a3d;margin-top:35px;max-width:640px}.bar span{display:block;height:100%;background:#91aaff;transition:width .25s}.case{max-width:740px;border:1px solid #293145;background:#0e1420;padding:clamp(20px,4vw,38px)}.case-label{display:flex;align-items:center;gap:9px;color:#a5baff;font:10px 'DM Mono',monospace;letter-spacing:1px}.case h2{font:clamp(27px,4vw,40px)/1.12 Georgia,serif;font-weight:400;margin:24px 0 14px}.case>p{font-size:13px;line-height:1.8;color:#aab6cb}.options{display:grid;gap:9px;margin:24px 0}.options button{display:flex;align-items:center;gap:13px;text-align:left;padding:15px;border:1px solid #2a3548;background:#111927;color:#edf2ff;border-radius:4px;cursor:pointer}.options button:hover,.options button.selected{border-color:#91aaff;background:#17223a}.options button span{display:grid;place-items:center;width:28px;height:28px;border:1px solid #42516e;border-radius:50%;font:12px Georgia,serif;color:#a5baff;flex-shrink:0}.options button strong{font-size:12px;line-height:1.6;flex:1}.options button svg{color:#9bd5b9}.feedback{margin-top:18px;padding:18px;background:#142039;border-left:2px solid #91aaff}.feedback b{font:9px 'DM Mono',monospace;letter-spacing:1px;color:#a5baff}.feedback p{font-size:13px;line-height:1.8;color:#d3dcee;margin:8px 0 16px}.feedback p:last-child{margin-bottom:0}.actions{display:flex;justify-content:space-between;gap:12px;margin-top:25px}.actions button,.secondary{display:inline-flex;align-items:center;gap:8px;padding:12px 15px;border:1px solid #344158;background:transparent;color:#dce5f5;border-radius:4px;font-size:11px;cursor:pointer}.actions button:disabled{opacity:.35;cursor:not-allowed}.actions .primary{background:#dce7ff;border-color:#dce7ff;color:#0b1220;font-weight:700}.final{margin-top:20px}.sources{display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding-top:36px}.sources a{color:#c7d5f7;font-size:12px;text-decoration:none}.sources a:hover{text-decoration:underline}.lab button:focus-visible,.lab a:focus-visible{outline:2px solid #91aaff;outline-offset:3px}@media(max-width:600px){.lab{padding:0 15px 40px}.lab header{height:60px}.lab header>span{font-size:8px}.hero{padding-top:42px}.case{padding:19px}.actions button{padding:11px 10px;font-size:10px}}@media(prefers-reduced-motion:reduce){.lab *{transition:none!important;animation:none!important}}
    `}</style>
  </main>;
}
