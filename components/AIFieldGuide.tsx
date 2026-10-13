"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Download, RotateCcw, ShieldCheck, Target, Zap } from "lucide-react";

type Goal = "learn" | "work" | "business";
type Task = { title: string; action: string; proof: string; risk: string };
const plans: Record<Goal, { label: string; title: string; promise: string; tasks: Task[] }> = {
  learn: {
    label: "Учиться быстрее",
    title: "Построй личную AI-систему обучения",
    promise: "За семь коротких сессий преврати ИИ из поисковой строки в проверяемого учебного партнёра.",
    tasks: [
      { title: "Определи вопрос", action: "Выбери один реальный вопрос, который хочешь понять глубоко. Попроси ИИ составить карту темы и перечислить, что он не знает.", proof: "Есть вопрос, карта темы и список неизвестного.", risk: "Не принимай структуру ответа за доказательство полноты." },
      { title: "Объяснение на трёх уровнях", action: "Попроси объяснить идею ребёнку, новичку и специалисту. Отметь, что потерялось при упрощении.", proof: "Записаны три объяснения и одно важное уточнение.", risk: "Аналогия помогает начать, но не заменяет точность." },
      { title: "Проверь первоисточник", action: "Попроси список первичных источников, открой хотя бы два и сравни утверждения с оригиналом.", proof: "Две открытые ссылки и проверенное утверждение.", risk: "Сгенерированная ссылка может быть неверной — открой её сам." },
      { title: "Сделай retrieval-практику", action: "Закрой материал и объясни тему своими словами. Затем попроси ИИ найти пробелы, а не написать ответ за тебя.", proof: "Собственное объяснение и список пробелов.", risk: "Не путай узнавание текста с умением воспроизвести знание." },
      { title: "Создай пример", action: "Придумай пример из собственной жизни и контрпример, который показывает границы правила.", proof: "Один пример и один контрпример.", risk: "Убедительный единичный пример не доказывает общее правило." },
      { title: "Обучи другого", action: "Составь короткое объяснение для коллеги или друга без жаргона и проверь, какие вопросы оно вызывает.", proof: "Объяснение на 150–250 слов.", risk: "Не скрывай неопределённость ради гладкой подачи." },
      { title: "Собери личную систему", action: "Создай шаблон: вопрос → гипотезы → источники → проверка → собственный вывод → открытые вопросы.", proof: "Шаблон, который можно использовать снова.", risk: "ИИ помогает думать; ответственность за вывод остаётся у тебя." }
    ]
  },
  work: {
    label: "Улучшить работу",
    title: "Найди один рабочий процесс для усиления",
    promise: "Не автоматизируй всё подряд. Выбери повторяемую задачу, измерь качество и оставь человеку контроль.",
    tasks: [
      { title: "Найди повторяемую задачу", action: "Запиши задачу, которую выполняешь регулярно, её входы, результат и цену ошибки.", proof: "Краткая карта процесса и исходное время.", risk: "Не начинай с решений, где ошибка может навредить человеку." },
      { title: "Определи критерии качества", action: "Создай чек-лист из 4–6 критериев хорошего результата и примеры плохого результата.", proof: "Чек-лист качества и один тестовый пример.", risk: "Если нельзя оценить результат, нельзя надёжно автоматизировать его." },
      { title: "Создай черновой прототип", action: "Попроси ИИ выполнить одну часть задачи на обезличенном примере. Сравни с ручным результатом.", proof: "Пара ручной и AI-версии с замечаниями.", risk: "Не передавай конфиденциальные данные в неразрешённый сервис." },
      { title: "Проверь крайние случаи", action: "Подготовь три сложных примера: неполные данные, противоречие и необычный случай.", proof: "Результаты трёх тестов.", risk: "Успех на одном примере не означает надёжности." },
      { title: "Добавь human-in-the-loop", action: "Определи, что ИИ может черновить, что человек обязан проверять и когда процесс должен остановиться.", proof: "Правило проверки и эскалации.", risk: "Не передавай модели окончательное решение без подходящего контроля." },
      { title: "Измерь эффект", action: "Сравни время, исправления и качество на небольшой выборке. Не используй придуманные проценты.", proof: "Небольшая таблица до/после.", risk: "Учитывай время на проверку, а не только генерацию." },
      { title: "Прими решение", action: "Выбери: продолжить пилот, изменить процесс или отказаться. Запиши основания и ограничения.", proof: "Решение с фактами и следующим шагом.", risk: "Иногда лучший результат эксперимента — отказаться от автоматизации." }
    ]
  },
  business: {
    label: "Спроектировать AI-пилот",
    title: "От бизнес-проблемы к проверяемому пилоту",
    promise: "За неделю сформулируй узкую задачу, критерии ценности, риски и решение о следующем эксперименте.",
    tasks: [
      { title: "Начни с проблемы", action: "Опиши пользователя, болезненную задачу, текущий процесс и последствия без решения.", proof: "Одно предложение о проблеме и базовый показатель.", risk: "Не начинай с выбора модели — начни с потребности." },
      { title: "Проверь ценность", action: "Поговори с двумя потенциальными пользователями или разберите два реальных случая.", proof: "Две заметки о проблеме и текущем обходном пути.", risk: "Интерес к технологии не равен готовности платить." },
      { title: "Ограничь пилот", action: "Выбери один узкий сценарий, входные данные, ожидаемый результат и исключения.", proof: "Одностраничный scope пилота.", risk: "Не используй персональные данные без правового и организационного основания." },
      { title: "Сформулируй baseline", action: "Зафиксируй текущие стоимость, время, качество и частоту ошибок — только из реальных наблюдений.", proof: "Baseline с источником каждого числа.", risk: "Не выдавай предположения за измерения." },
      { title: "Протестируй альтернативы", action: "Сравни ручной процесс, простой скрипт и AI-вариант на одном наборе примеров.", proof: "Таблица сравнения трёх вариантов.", risk: "ИИ не всегда лучший или самый дешёвый инструмент." },
      { title: "Определи контроль", action: "Запиши риски, владельца решения, проверку человеком и условия остановки.", proof: "Короткий risk register и план отката.", risk: "Не запускай автономные действия без разрешений и мониторинга." },
      { title: "Подготовь решение", action: "Составь memo: проблема, доказательства, стоимость проверки, результат пилота и следующий эксперимент.", proof: "Решение go / revise / stop с аргументами.", risk: "Пилот доказывает только то, что реально тестировалось." }
    ]
  }
};
const STORAGE_KEY = "osa-ai-field-guide-v1";

export function AIFieldGuide() {
  const [goal, setGoal] = useState<Goal>("learn");
  const [done, setDone] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const plan = plans[goal];
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { goal?: Goal; done?: number[] };
        if (parsed.goal && plans[parsed.goal]) setGoal(parsed.goal);
        if (Array.isArray(parsed.done)) setDone(parsed.done.filter((n) => Number.isInteger(n) && n >= 0 && n < 7));
      }
    } catch { /* Storage can be disabled; the guide still works for this session. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ goal, done })); } catch { /* Private browsing may block persistence. */ }
  }, [goal, done, ready]);
  const percent = Math.round(done.length / 7 * 100);
  const exportText = useMemo(() => [
    "OSA AI FIELD GUIDE — 7 DAYS",
    plan.title,
    plan.promise,
    "",
    ...plan.tasks.map((task, i) => `${done.includes(i) ? "[x]" : "[ ]"} DAY ${i + 1}: ${task.title}\n${task.action}\nProof: ${task.proof}\nRisk: ${task.risk}`)
  ].join("\n\n"), [plan, done]);
  function downloadPlan() {
    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "osa-ai-field-guide.txt"; a.click();
    URL.revokeObjectURL(url);
  }
  return <main className="field-guide">
    <nav className="field-nav"><Link href="/cinema"><ArrowLeft size={15}/> Назад в Interactive Cinema</Link><span>OSA / APPLIED INTELLIGENCE</span></nav>
    <section className="field-hero">
      <div className="field-hero-grid" aria-hidden="true"/>
      <div className="field-hero-copy">
        <p className="field-kicker">SEVEN DAYS · REAL-WORLD PRACTICE</p>
        <h1>Не просто используй ИИ.<br/><em>Научись управлять результатом.</em></h1>
        <p className="field-lede">Семь небольших экспериментов, которые переводят идеи курса в действия. Выбери цель — и получи конкретный маршрут с доказательствами результата, проверкой качества и человеческим контролем.</p>
        <div className="field-trust"><span><ShieldCheck size={15}/> Проверка фактов</span><span><Target size={15}/> Измеримый результат</span><span><Zap size={15}/> Без новых сервисов</span></div>
      </div>
      <div className="field-hero-index"><span>FIELD GUIDE</span><b>07</b><small>DAY PROTOCOL</small></div>
    </section>
    <section className="field-choice">
      <div><p className="field-kicker">01 / YOUR OBJECTIVE</p><h2>Что ты хочешь изменить?</h2><p>План подстраивается под цель, а прогресс хранится локально на этом устройстве.</p></div>
      <div className="field-goals" role="group" aria-label="Выбери цель">
        {(Object.keys(plans) as Goal[]).map((key) => <button key={key} type="button" className={goal === key ? "field-goal active" : "field-goal"} onClick={() => { setGoal(key); setDone([]); }} aria-pressed={goal === key}>{plans[key].label}<span>{goal === key ? "SELECTED" : "CHOOSE"}</span></button>)}
      </div>
    </section>
    <section className="field-plan">
      <div className="field-plan-head"><div><p className="field-kicker">02 / YOUR SEVEN-DAY PROTOCOL</p><h2>{plan.title}</h2><p>{plan.promise}</p></div><div className="field-progress"><b>{percent}%</b><span>{done.length} / 7 complete</span><div><i style={{width: `${percent}%`}}/></div></div></div>
      <div className="field-days">{plan.tasks.map((task, i) => <article className={done.includes(i) ? "field-day complete" : "field-day"} key={`${goal}-${i}`}>
        <div className="field-day-no">{done.includes(i) ? <Check size={17}/> : String(i + 1).padStart(2, "0")}</div>
        <div className="field-day-content"><p className="field-kicker">DAY {String(i + 1).padStart(2, "0")}</p><h3>{task.title}</h3><p>{task.action}</p><div className="field-proof"><b>ДОКАЗАТЕЛЬСТВО РЕЗУЛЬТАТА</b><span>{task.proof}</span></div><div className="field-risk"><b>ОГРАНИЧЕНИЕ</b><span>{task.risk}</span></div></div>
        <button className="field-check" type="button" onClick={() => setDone((old) => old.includes(i) ? old.filter((n) => n !== i) : [...old, i].sort((a,b) => a-b))} aria-pressed={done.includes(i)}>{done.includes(i) ? "Завершено" : "Отметить"}</button>
      </article>)}</div>
      <div className="field-end"><div><p className="field-kicker">03 / TAKE IT WITH YOU</p><h2>{done.length === 7 ? "Семь дней. Теперь у тебя есть собственный метод." : "Знание становится силой, когда меняет действие."}</h2><p>{done.length === 7 ? "Не считай галочки доказательством успеха: оцени качество результатов и то, что изменилось на практике." : "Сохрани маршрут как текст, чтобы продолжить работу вне платформы или поделиться им с командой."}</p></div><div className="field-actions"><button className="field-export" type="button" onClick={downloadPlan}><Download size={15}/> Экспортировать план</button><button className="field-reset" type="button" onClick={() => { if (confirm("Сбросить прогресс этого маршрута?")) setDone([]); }}><RotateCcw size={14}/> Сбросить прогресс</button></div></div>
    </section>
    <footer className="field-footer"><span>OSA / THINK BEYOND THE MODEL</span><Link href="/cinema/lab">Продолжить в Decision Lab <ArrowRight size={14}/></Link><small>Прогресс хранится в localStorage этого браузера и не синхронизируется между устройствами.</small></footer>
    <style jsx>{`
      .field-guide{--fg:#f4f7ff;--fm:#9aa5bc;--fb:#7799ff;max-width:1400px;margin:0 auto;padding:0 clamp(15px,4vw,58px);color:var(--fg);min-height:100vh}.field-nav{height:70px;border-bottom:1px solid #ffffff17;display:flex;justify-content:space-between;align-items:center;gap:14px}.field-nav a,.field-footer a{display:inline-flex;align-items:center;gap:8px;color:#c4cde0;text-decoration:none;font-size:12px}.field-nav>span,.field-footer>span,.field-footer small{font:9px 'DM Mono',monospace;letter-spacing:1px;color:#8592ac}.field-hero{position:relative;overflow:hidden;margin-top:22px;min-height:400px;border:1px solid #ffffff16;background:linear-gradient(110deg,#101522 0%,#101827 54%,#172748 100%);display:flex;align-items:center;justify-content:space-between;padding:clamp(26px,6vw,76px);gap:28px}.field-hero-grid{position:absolute;inset:0;background-image:linear-gradient(#a3b8ff0b 1px,transparent 1px),linear-gradient(90deg,#a3b8ff0b 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(90deg,#000,transparent)}.field-hero:after{content:"";position:absolute;width:440px;aspect-ratio:1;right:8%;top:-25%;border-radius:50%;border:1px solid #7799ff32;box-shadow:0 0 0 45px #7799ff08,0 0 0 90px #7799ff05;pointer-events:none}.field-hero-copy{position:relative;max-width:760px}.field-kicker{font:9px 'DM Mono',monospace;letter-spacing:1.25px;color:#9bb2ff;margin:0 0 12px}.field-hero h1{font:500 clamp(36px,5.3vw,68px)/1.04 var(--sans,system-ui);letter-spacing:-.06em;margin:0;text-wrap:balance}.field-hero h1 em{font-style:normal;color:#91aaff}.field-lede{font-size:14px;line-height:1.85;color:#bdc7db;max-width:620px;margin:24px 0}.field-trust{display:flex;flex-wrap:wrap;gap:18px;color:#c7d1e4;font-size:11px}.field-trust span{display:flex;align-items:center;gap:7px}.field-trust svg{color:#91aaff}.field-hero-index{position:relative;display:flex;flex-direction:column;align-items:flex-end;gap:5px;white-space:nowrap}.field-hero-index span,.field-hero-index small{font:9px 'DM Mono',monospace;letter-spacing:1.2px;color:#9ca8bf}.field-hero-index b{font:500 clamp(76px,10vw,136px)/.9 var(--sans,system-ui);letter-spacing:-.09em;color:#dfe7ff}.field-choice{display:grid;grid-template-columns:minmax(220px,.8fr) 1.2fr;gap:36px;padding:48px 0;border-bottom:1px solid #ffffff18}.field-choice h2,.field-plan h2,.field-end h2{font-size:clamp(22px,3vw,32px);letter-spacing:-.045em;font-weight:600;margin:0 0 12px}.field-choice p:not(.field-kicker),.field-plan-head>div>p:not(.field-kicker),.field-end p:not(.field-kicker){font-size:13px;line-height:1.8;color:var(--fm);margin:0;max-width:620px}.field-goals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-content:center}.field-goal{border:1px solid #293145;background:#101522;color:#e5eaf5;text-align:left;padding:17px 14px;min-height:90px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;font-size:12px}.field-goal.active{border-color:#7799ff;background:#17223a}.field-goal span{font:8px 'DM Mono',monospace;color:#8e9cb8;letter-spacing:.7px}.field-goal.active span{color:#9bb2ff}.field-plan{padding:46px 0}.field-plan-head{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;margin-bottom:24px}.field-plan-head>div:first-child{max-width:720px}.field-progress{min-width:130px;text-align:right}.field-progress>b{display:block;font-size:36px;font-weight:500;letter-spacing:-.06em}.field-progress>span{font:9px 'DM Mono',monospace;color:#9aa5bc}.field-progress>div{height:3px;background:#293145;margin-top:12px}.field-progress i{display:block;height:100%;background:#7799ff;transition:width .2s}.field-days{border-top:1px solid #293145}.field-day{display:grid;grid-template-columns:42px minmax(0,1fr) 110px;gap:20px;padding:25px 0;border-bottom:1px solid #ffffff16;align-items:start}.field-day-no{width:34px;height:34px;border:1px solid #3b4660;display:grid;place-items:center;font:11px 'DM Mono',monospace;color:#9bb2ff}.field-day.complete .field-day-no{background:#203c36;border-color:#4b987e;color:#b5f2d6}.field-day-content h3{font-size:19px;margin:0 0 8px;font-weight:600;letter-spacing:-.025em}.field-day-content>p:not(.field-kicker){font-size:13px;line-height:1.8;color:#c1cbdd;margin:0;max-width:850px}.field-proof,.field-risk{display:flex;flex-direction:column;gap:5px;margin-top:14px;font-size:11px;line-height:1.7;color:#aeb9cd}.field-proof b,.field-risk b{font:8px 'DM Mono',monospace;letter-spacing:.9px;color:#9bb2ff}.field-risk b{color:#d7a7a9}.field-check{border:1px solid #3a4660;background:transparent;padding:10px 9px;font-size:10px;color:#d8e0f0}.field-day.complete .field-check{border-color:#4b987e;color:#b5f2d6}.field-end{display:flex;justify-content:space-between;align-items:center;gap:28px;margin-top:38px;padding:clamp(22px,4vw,38px);border:1px solid #293145;background:linear-gradient(110deg,#121a2a,#101522)}.field-end h2{max-width:650px}.field-actions{display:flex;flex-direction:column;gap:10px;min-width:185px}.field-export,.field-reset{display:flex;justify-content:center;align-items:center;gap:8px;padding:12px;border:1px solid #7799ff;background:#7799ff;color:#0b1220;font-size:11px;font-weight:800}.field-reset{background:transparent;color:#b3bfd5;border-color:#344059;font-weight:500}.field-footer{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;border-top:1px solid #ffffff17;padding:23px 0 35px}.field-footer small{width:100%;letter-spacing:0;line-height:1.7}.field-footer a{color:#9bb2ff}.field-day button:focus-visible,.field-goal:focus-visible,.field-export:focus-visible,.field-reset:focus-visible{outline:2px solid #b4c5ff;outline-offset:3px}@media(max-width:850px){.field-hero-index{display:none}.field-choice{grid-template-columns:1fr;gap:20px}.field-goals{grid-template-columns:1fr}.field-goal{min-height:unset;flex-direction:row;align-items:center}.field-plan-head{align-items:flex-start;flex-direction:column}.field-progress{width:100%;text-align:left}.field-progress>div{max-width:260px}.field-end{align-items:flex-start;flex-direction:column}.field-actions{width:100%}}@media(max-width:560px){.field-nav{height:60px}.field-nav>span{font-size:7px}.field-hero{margin-top:12px;min-height:unset;padding:32px 20px}.field-hero h1{font-size:39px}.field-lede{font-size:13px}.field-trust{gap:10px;flex-direction:column}.field-choice{padding:35px 0}.field-plan{padding:35px 0}.field-day{grid-template-columns:28px minmax(0,1fr);gap:12px;padding:22px 0}.field-day-no{width:27px;height:27px}.field-day-content h3{font-size:17px}.field-check{grid-column:2;justify-self:start;min-width:110px}.field-footer{align-items:flex-start;flex-direction:column}.field-footer small{width:auto}}@media(prefers-reduced-motion:reduce){.field-progress i{transition:none}}
    `}</style>
  </main>;
}
