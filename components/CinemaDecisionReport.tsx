"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDownToLine, Compass, ShieldCheck, Target } from "lucide-react";

const KEY = "osa-cinema-progress-v1";
type Saved = { chapterNo?: number; sceneNo?: number; answers?: Record<string, number>; done?: string[] };
const choiceSets = [
  ["Доверюсь быстрому ответу", "Попрошу объяснить решение", "Сначала определю критерий проверки"],
  ["Максимальная открытость", "Контроль одной организации", "Открытые стандарты и надзор"],
  ["Подожду полной ясности", "Автоматизирую всё сразу", "Выберу одну задачу и измерю"],
];
const prompts = ["Как вы реагируете на уверенный ответ ИИ?", "Как распределять технологическую власть?", "Как начать применять ИИ?"];
const recommendations = [
  [
    {title:"Поставьте критерии до запроса",body:"Запишите, что будет считаться хорошим ответом, какие факты нужно проверить и какова цена ошибки."},
    {title:"Проверяйте объяснение независимо",body:"Попросите модель объяснить логику, но сверяйте ключевые утверждения с первоисточниками и контрпримером."},
    {title:"Сохраните привычку независимой проверки",body:"Это сильная основа: сначала критерии, затем генерация, затем проверка результата."}
  ],
  [
    {title:"Добавьте риск-анализ к открытости",body:"Открытость полезна, когда она сочетается с безопасным доступом, документацией и ответственностью за последствия."},
    {title:"Сделайте контроль оспоримым",body:"Назначьте независимый аудит, публикуйте критерии и предусмотрите апелляцию и переносимость данных."},
    {title:"Зафиксируйте правила подотчётности",body:"Определите, кто отвечает за систему, что раскрывается пользователю и как обнаруживаются ошибки."}
  ],
  [
    {title:"Начните с безопасного эксперимента",body:"Выберите небольшую обратимую задачу и сравните результат с исходным способом."},
    {title:"Не масштабируйте без контроля",body:"Перед автоматизацией всего процесса измерьте ошибки, предусмотрите ручной откат и владельца решения."},
    {title:"Измеряйте до масштабирования",body:"Сравните время, качество, число исправлений и проверяемость на нескольких примерах."}
  ]
];

export function CinemaDecisionReport() {
  const [saved, setSaved] = useState<Saved>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const value = JSON.parse(raw) as Saved;
        setSaved({ answers: value.answers && typeof value.answers === "object" ? value.answers : {}, done: Array.isArray(value.done) ? value.done : [] });
      }
    } catch { /* local progress may be disabled or malformed */ }
    setReady(true);
  }, []);

  const answers = saved.answers ?? {};
  const selected = useMemo(() => [answers["0:0"], answers["1:0"], answers["2:0"]], [answers]);
  const answered = selected.filter((v) => Number.isInteger(v) && v >= 0 && v <= 2).length;
  const completed = saved.done?.length ?? 0;
  const exportReport = () => {
    const lines = ["OSA CINEMA — ЛИЧНЫЙ ОТЧЁТ", "", `Пройдено сцен: ${completed}`, "", ...prompts.map((p, i) => {
      const choice = selected[i];
      const valid = Number.isInteger(choice) && choice! >= 0 && choice! <= 2;
      return `${i + 1}. ${p}\nОтвет: ${valid ? choiceSets[i][choice as number] : "Пока не выбран"}\nПрактический следующий шаг: ${valid ? recommendations[i][choice as number].title + " — " + recommendations[i][choice as number].body : "Вернитесь к сцене и сделайте выбор."}`;
    }), "", "Примечание: это учебная рефлексия, а не психологическая диагностика или оценка компетентности."];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "osa-cinema-personal-report.txt"; anchor.click(); URL.revokeObjectURL(url);
  };

  return <section aria-labelledby="cinema-report-title" style={{maxWidth:1120,margin:"0 auto",padding:"12px 24px 42px",color:"#f4f7ff"}}>
    <div style={{border:"1px solid #293145",background:"linear-gradient(120deg,#0d121d,#111a2b 70%,#171522)",padding:"clamp(22px,4vw,36px)"}}>
      <div style={{display:"flex",alignItems:"center",gap:9,color:"#91aaff",font:"10px 'DM Mono',monospace",letterSpacing:"1.2px"}}><Compass size={15}/> OSA / YOUR DECISION PROFILE</div>
      <div style={{display:"flex",alignItems:"start",justifyContent:"space-between",gap:20,flexWrap:"wrap",marginTop:16}}>
        <div style={{maxWidth:680}}><h2 id="cinema-report-title" style={{font:"clamp(29px,4vw,43px)/1.08 Georgia,serif",fontWeight:400,letterSpacing:"-.03em",margin:"0 0 12px"}}>История заканчивается. Ваша стратегия — нет.</h2><p style={{margin:0,color:"#aeb9ce",fontSize:13,lineHeight:1.8}}>Соберите решения из трёх глав в персональный план действий. Отчёт строится только на выбранных вами ответах и остаётся на устройстве.</p></div>
        <button type="button" onClick={exportReport} style={{display:"inline-flex",alignItems:"center",gap:9,padding:"12px 14px",border:"1px solid #42506d",background:"#141e31",color:"#f4f7ff",fontSize:11,cursor:"pointer",borderRadius:3}}><ArrowDownToLine size={15}/> Экспортировать мой отчёт</button>
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:20}}><span style={metric}><Target size={14}/> {answered}/3 решений</span><span style={metric}><ShieldCheck size={14}/> {completed} сцен отмечено пройденными</span><span style={metric}>Локальное хранение · без аккаунта</span></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))",gap:10,marginTop:18}}>
        {prompts.map((prompt,i)=>{const choice=selected[i];const valid=Number.isInteger(choice)&&choice!>=0&&choice!<=2;return <article key={prompt} style={{padding:18,border:"1px solid #293145",background:"#080d18a8",minWidth:0}}><p style={{font:"9px 'DM Mono',monospace",letterSpacing:"1px",color:"#91aaff",margin:"0 0 12px"}}>ГЛАВА 0{i+1}</p><h3 style={{fontSize:13,lineHeight:1.6,margin:"0 0 11px"}}>{prompt}</h3><p style={{fontSize:11,color:"#aeb9ce",lineHeight:1.6,margin:"0 0 14px"}}>{valid?choiceSets[i][choice as number]:"Решение ещё не сохранено. Вы можете вернуться к сцене и выбрать вариант."}</p><div style={{borderTop:"1px solid #293145",paddingTop:13}}><p style={{fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:".8px",color:"#d47b89",margin:"0 0 7px"}}>СЛЕДУЮЩИЙ ШАГ</p><strong style={{fontSize:12,fontWeight:600}}>{valid?recommendations[i][choice as number].title:"Сделайте первый выбор"}</strong><p style={{fontSize:11,lineHeight:1.7,color:"#aeb9ce",margin:"7px 0 0"}}>{valid?recommendations[i][choice as number].body:"Не нужно угадывать правильный ответ — выберите подходящий вам подход и изучите его последствия."}</p></div></article>})}
      </div>
      {!ready&&<p role="status" style={{fontSize:10,color:"#91aaff",marginBottom:0}}>Загружаем локальный прогресс…</p>}
      <p style={{fontSize:10,color:"#78869e",lineHeight:1.7,margin:"18px 0 0"}}>Отчёт — инструмент рефлексии, а не диагноз. Выборы не оценивают личность и не используются для рекламы или профилирования.</p>
    </div>
  </section>;
}

const metric: CSSProperties = { display:"inline-flex",alignItems:"center",gap:7,padding:"8px 10px",border:"1px solid #293145",background:"#0a101d",color:"#aeb9ce",fontSize:10,borderRadius:3 };
