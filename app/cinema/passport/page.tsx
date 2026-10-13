"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clipboard, Download, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";

type CinemaProgress = { chapterNo?: number; sceneNo?: number; answers?: Record<string, number>; done?: string[] };
type LabProgress = { caseNo?: number; picked?: Record<number, number> };

const answerMeaning = [
  ["Скорость прежде всего", "Объяснение прежде всего", "Проверяемые критерии прежде всего"],
  ["Максимальная открытость", "Централизованный контроль", "Открытые стандарты и надзор"],
  ["Подождать", "Автоматизировать всё", "Измерить небольшой эксперимент"]
];

function getProfile(answers: Record<string, number>, picks: Record<number, number>) {
  const values = [...Object.entries(answers).map(([k, v]) => ({ key: k, value: v })), ...Object.entries(picks).map(([k, v]) => ({ key: "lab:" + k, value: Number(v) }))];
  const verify = values.filter(({ value }) => value === 2).length;
  const explore = values.filter(({ value }) => value === 1).length;
  if (verify >= 3) return { title: "Архитектор доказательств", label: "Сначала критерии, затем решение", body: "Твоя сильная сторона — независимая проверка. Следующий шаг: научиться делать её быстрой и соразмерной риску, чтобы не превращать каждый вопрос в большое исследование.", action: "Выбери одну повторяющуюся задачу и создай короткий чек-лист проверки." };
  if (explore >= 3) return { title: "Исследователь систем", label: "Ищешь контекст и альтернативы", body: "Ты стремишься понять устройство ситуации, а не только получить ответ. Следующий шаг — отделять полезное объяснение от подтверждённого факта и фиксировать, какие данные могли бы изменить вывод.", action: "Для одного утверждения найди первоисточник и независимое подтверждение." };
  return { title: "Практик эксперимента", label: "Учишься через действие", body: "Ты готов проверять инструменты на реальных задачах. Следующий шаг — не путать впечатляющую демонстрацию с устойчивым результатом: измеряй качество, время и цену исправления.", action: "Сравни выполнение одной задачи с ИИ и без него по заранее заданным критериям." };
}

export default function CinemaPassportPage() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState<CinemaProgress>({});
  const [lab, setLab] = useState<LabProgress>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const rawCinema = localStorage.getItem("osa-cinema-progress-v1");
      const rawLab = localStorage.getItem("osa-cinema-lab-v1");
      if (rawCinema) setProgress(JSON.parse(rawCinema) as CinemaProgress);
      if (rawLab) setLab(JSON.parse(rawLab) as LabProgress);
    } catch { /* local progress is optional */ }
    setLoaded(true);
  }, []);

  const profile = useMemo(() => getProfile(progress.answers ?? {}, lab.picked ?? {}), [progress.answers, lab.picked]);
  const sceneCount = (progress.done ?? []).length;
  const answerCount = Object.keys(progress.answers ?? {}).length;
  const labCount = Object.keys(lab.picked ?? {}).length;
  const report = [
    "OSA / BEYOND THE MODEL — МОЙ ПАСПОРТ МЫШЛЕНИЯ",
    "Профиль: " + profile.title,
    profile.label,
    "Пройдено сцен: " + sceneCount,
    "Ответов в Decision Lab: " + labCount,
    "Выборов в киноопыте: " + answerCount,
    "",
    profile.body,
    "Следующий шаг: " + profile.action,
    "",
    "Принцип: используй ИИ как усилитель мышления, а не замену проверке и ответственности."
  ].join("\n");

  async function shareReport() {
    try {
      if (navigator.share) await navigator.share({ title: "Мой паспорт мышления — OSA", text: report });
      else if (navigator.clipboard) { await navigator.clipboard.writeText(report); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
      else window.print();
    } catch { /* dismissed share sheet is not an error */ }
  }

  return <main className="passport">
    <header className="top"><Link href="/cinema" className="back"><ArrowLeft size={16}/> Вернуться в киноопыт</Link><span>OSA / PERSONAL FIELD REPORT</span></header>
    <section className="intro"><p className="eyebrow"><Sparkles size={14}/> ЛИЧНЫЙ РЕЗУЛЬТАТ · ЛОКАЛЬНО НА ТВОЁМ УСТРОЙСТВЕ</p><h1>Не оценка.<br/><em>Твоя карта решений.</em></h1><p>Этот отчёт собирает твои выборы в киноопыте и Decision Lab в полезную отправную точку. Это не психологический тест и не научная диагностика — только зеркало решений, которые ты выбрал в сценариях.</p></section>
    <section className="report">
      <div className="report-head"><div><span className="eyebrow">OSA / FIELD NOTES</span><h2>{loaded ? profile.title : "Собираем твой отчёт…"}</h2><p>{loaded ? profile.label : "Читаем локальный прогресс"}</p></div><div className="seal"><ShieldCheck size={24}/><span>YOUR<br/>AGENCY</span></div></div>
      <div className="metrics"><div><strong>{sceneCount}</strong><span>сцен отмечено</span></div><div><strong>{labCount}/3</strong><span>сценариев Decision Lab</span></div><div><strong>{answerCount}</strong><span>выборов в истории</span></div></div>
      <div className="body-copy"><h3>Что это говорит о твоём подходе</h3><p>{profile.body}</p><div className="next-step"><span>ТВОЙ СЛЕДУЮЩИЙ ЭКСПЕРИМЕНТ</span><p>{profile.action}</p></div></div>
      <div className="report-foot"><span>НЕ ПРОГНОЗ. НЕ ДИАГНОЗ. ПОВОД ДЛЯ ОСОЗНАННОГО ДЕЙСТВИЯ.</span><span>OSA · THINK BEYOND THE MODEL</span></div>
    </section>
    <div className="actions"><button className="primary" onClick={shareReport}><Clipboard size={16}/>{copied ? "Скопировано" : "Поделиться отчётом"}</button><button className="secondary" onClick={() => window.print()}><Download size={16}/> Сохранить в PDF</button><Link className="secondary" href="/cinema/lab"><RefreshCw size={16}/> Продолжить Decision Lab</Link></div>
    <p className="privacy">Приватность: ответы читаются только из localStorage этого браузера и не отправляются на сервер. Прогресс не синхронизируется между устройствами.</p>
    <style jsx>{`
      .passport{min-height:100vh;background:#080b13;color:#f4f7ff;padding:0 clamp(16px,4vw,52px) 70px}.top{height:68px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #283146;color:#8492ab;font:10px 'DM Mono',monospace;letter-spacing:1px}.back{display:flex;align-items:center;gap:8px;color:#c8d3e9;text-decoration:none;font:12px system-ui,sans-serif}.intro{max-width:900px;margin:0 auto;padding:clamp(44px,8vw,88px) 0 42px}.eyebrow{display:flex;align-items:center;gap:8px;color:#9bb1ff;font:10px 'DM Mono',monospace;letter-spacing:1.4px}.intro h1{font:clamp(44px,8vw,84px)/.98 Georgia,serif;font-weight:400;letter-spacing:-.055em;margin:24px 0}.intro h1 em{font-weight:400;color:#9bb1ff}.intro>p:last-child{max-width:620px;color:#aeb9ce;font-size:14px;line-height:1.9}.report{max-width:900px;margin:0 auto;border:1px solid #2b354a;background:linear-gradient(135deg,#101725,#0d121d 65%,#151a2b);padding:clamp(22px,5vw,48px);position:relative;overflow:hidden}.report:before{content:'';position:absolute;right:-100px;top:-140px;width:340px;height:340px;border:1px solid #2e3a58;border-radius:50%;box-shadow:0 0 0 34px #7799ff06,0 0 0 68px #7799ff04;pointer-events:none}.report-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;position:relative}.report-head h2{font:clamp(30px,5vw,48px)/1.1 Georgia,serif;font-weight:400;margin:16px 0 8px}.report-head p{margin:0;color:#9eacc4;font-size:13px}.seal{width:68px;height:68px;flex-shrink:0;border:1px solid #465577;color:#a8bbff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;font:8px 'DM Mono',monospace;letter-spacing:1px}.metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #29344a;border-bottom:1px solid #29344a;margin:34px 0}.metrics>div{padding:18px 12px 18px 0;display:flex;flex-direction:column;gap:7px}.metrics>div+div{border-left:1px solid #29344a;padding-left:20px}.metrics strong{font:clamp(25px,4vw,40px) Georgia,serif;font-weight:400}.metrics span{font-size:11px;color:#95a3bb}.body-copy h3{font:24px Georgia,serif;font-weight:400;margin:0 0 12px}.body-copy>p,.next-step p{font-size:13px;line-height:1.9;color:#bdc8dc;max-width:660px}.next-step{margin-top:26px;border-left:2px solid #a51c30;background:#a51c3010;padding:18px 20px}.next-step span{font:9px 'DM Mono',monospace;letter-spacing:1.2px;color:#ff9ba7}.next-step p{margin:8px 0 0;color:#edf2ff}.report-foot{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:38px;padding-top:16px;border-top:1px solid #29344a;color:#687890;font:8px 'DM Mono',monospace;letter-spacing:1px}.actions{max-width:900px;margin:20px auto 0;display:flex;gap:10px;flex-wrap:wrap}.actions button,.actions a{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 16px;border:1px solid #35425b;background:transparent;color:#e0e8f8;border-radius:3px;font-size:12px;text-decoration:none;cursor:pointer}.actions .primary{background:#e0e9ff;color:#0a1020;border-color:#e0e9ff;font-weight:700}.privacy{max-width:900px;margin:18px auto 0;color:#74839c;font-size:11px;line-height:1.7}.passport button:focus-visible,.passport a:focus-visible{outline:2px solid #91aaff;outline-offset:4px}@media(max-width:600px){.top{height:60px}.top>span{font-size:8px}.metrics span{font-size:9px}.metrics>div+div{padding-left:10px}.metrics>div{padding-right:5px}.report-head{gap:10px}.seal{width:54px;height:54px}.report-foot{font-size:7px}}@media(prefers-reduced-motion:reduce){.passport *{animation:none!important;transition:none!important}}@media print{.passport{background:#fff;color:#111;padding:0}.top,.intro,.actions,.privacy{display:none!important}.report{background:#fff;color:#111;border:1px solid #bbb;max-width:none}.report-head p,.metrics span,.body-copy>p,.next-step p{color:#333}.report-foot{color:#555}.report:before{display:none}.next-step{background:#f8f0f1}.next-step span{color:#7a1524}}
    `}</style>
  </main>;
}
