"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Compass, Play, RotateCcw, Sparkles } from "lucide-react";

type Option = { title: string; consequence: string; lesson: string };
type Scene = { tag: string; title: string; copy: string; visual: string; question?: string; options?: Option[]; insight: string };
type Chapter = { n: string; title: string; subtitle: string; scenes: Scene[] };

const chapters: Chapter[] = [
  { n: "01", title: "Машина, которая продолжает мысль", subtitle: "ИИ меняет правила игры", scenes: [
    { tag: "ПРОЛОГ · 00:00", title: "У тебя десять минут. И задача, которую нельзя провалить.", copy: "На столе — сложная задача. Рядом — инструмент, который предлагает ответ за секунды. Он звучит уверенно. Но кто отвечает, если ответ окажется неверным?", visual: "signal", question: "Что ты сделаешь первым?", options: [
      { title: "Доверюсь быстрому ответу", consequence: "Ты выигрываешь время, но принимаешь риск незамеченной ошибки.", lesson: "Беглость ответа — не доказательство истины. Проверка должна зависеть от цены ошибки." },
      { title: "Попрошу объяснить решение", consequence: "Ты получишь контекст, но объяснение тоже может быть убедительным и ошибочным.", lesson: "Объяснение — полезная гипотеза для проверки, а не гарантия правильности." },
      { title: "Сначала определю критерий проверки", consequence: "Ты тратишь немного времени на критерии, зато оцениваешь результат независимо.", lesson: "Сильный процесс начинается не с промпта, а с определения успеха." }
    ], insight: "ИИ — не оракул. Его полезность зависит от задачи, данных, проверки и человеческого контекста." },
    { tag: "СЦЕНА 02 · ВНУТРИ МОДЕЛИ", title: "Не цифровой разум в коробке. Модель закономерностей.", copy: "Языковая модель учится продолжать последовательности на основе закономерностей в данных. Масштаб обучения позволяет ей решать неожиданные задачи, но не гарантирует истину, актуальность или понимание контекста.", visual: "signal", insight: "Представь очень мощный механизм продолжения мысли, который научился выполнять широкий круг задач. Аналогия помогает начать — но не объясняет всю систему." },
    { tag: "СЦЕНА 03 · ПОВОРОТ", title: "Способность — не то же самое, что надёжность.", copy: "Одна модель может помочь написать программу и одновременно ошибиться в источнике, вычислении или деталях события. Качество нужно измерять на конкретной задаче.", visual: "signal", insight: "Вопрос не «умён ли ИИ?», а «насколько надёжно он решает именно эту задачу и как мы это проверили?»" }
  ]},
  { n: "02", title: "Кто управляет дверями знания", subtitle: "Информация, инфраструктура и власть", scenes: [
    { tag: "АКТ II · СМЕНА МАСШТАБА", title: "Знание важно. Но важен и доступ.", copy: "Представь библиотеку, где книги доступны всем, но ключи, каталог и правила выдачи контролирует небольшая группа. Цифровой мир добавляет ещё один уровень: вычислительные мощности, данные, модели и каналы распространения.", visual: "power", question: "Какое правило выбрать для общественно важной AI-системы?", options: [
      { title: "Максимальная открытость", consequence: "Больше людей могут проверять и адаптировать систему, но открытый доступ может облегчить злоупотребления.", lesson: "Открытость не абсолютное благо и не абсолютный риск: важны тип системы и контекст." },
      { title: "Контроль одной организации", consequence: "Проще назначить ответственного, но растёт риск зависимости и непрозрачности.", lesson: "Централизация упрощает управление, но требует независимого аудита и права на апелляцию." },
      { title: "Открытые стандарты и надзор", consequence: "Сложнее координировать, зато полномочия и проверяемость можно распределить.", lesson: "Важнее лозунга «открыть или закрыть» — правила доступа, ответственности и контроля." }
    ], insight: "Власть над технологией складывается из контроля над данными, вычислениями, интерфейсом и правилами доступа." },
    { tag: "СЦЕНА 05 · ИНФОРМАЦИОННАЯ СРЕДА", title: "То, что ты видишь, влияет на то, что считаешь важным.", copy: "Рекомендательные системы помогают находить нужное, но формируют видимую часть мира. Популярность не равна достоверности; повторение не равно независимому подтверждению.", visual: "power", insight: "Проверяй первоисточник, дату, независимые подтверждения и то, что осталось за рамкой выдачи." },
    { tag: "СЦЕНА 06 · КУЛЬМИНАЦИЯ", title: "Кто может задать вопрос — и проверить ответ?", copy: "Доступ к знаниям становится силой, когда человек способен не только получить ответ, но и проверить его, оспорить решение и использовать результат для собственных целей.", visual: "power", insight: "Справедливый доступ — это навыки, прозрачность, возможность проверки и право на возражение." }
  ]},
  { n: "03", title: "Человек за пультом", subtitle: "Практическая стратегия в эпоху ИИ", scenes: [
    { tag: "АКТ III · ТВОЙ ВЫБОР", title: "Будущее не выдаётся готовым. Его проектируют.", copy: "У тебя есть задача на следующей неделе. Можно отложить знакомство с ИИ, передать ему всё или построить небольшой проверяемый эксперимент.", visual: "horizon", question: "Как начнёшь?", options: [
      { title: "Подожду полной ясности", consequence: "Ты избежишь ранних ошибок, но можешь упустить безопасную возможность учиться.", lesson: "Не нужны необратимые решения. Начни с малого эксперимента с низкой ценой ошибки." },
      { title: "Автоматизирую всё сразу", consequence: "Потенциальная выгода велика, но ошибки могут распространиться на весь процесс.", lesson: "Автоматизация требует измерений, контроля исключений и возможности отката." },
      { title: "Выберу одну задачу и измерю", consequence: "Ты сравнишь время, качество и ошибки с исходным процессом до масштабирования.", lesson: "Надёжный старт: одна задача, исходная метрика, проверка результата, решение по данным." }
    ], insight: "Не нужно знать всё об ИИ. Нужно выбирать задачу, ставить критерии, проверять результат и учиться на обратной связи." },
    { tag: "СЦЕНА 08 · ПРАКТИКА", title: "Эксперимент на двадцать минут.", copy: "Выбери задачу с низкой ценой ошибки: превратить заметки в план, объяснить сложное понятие или найти слабые места черновика. Сохрани исходный результат, проверь факты и сравни качество.", visual: "horizon", insight: "Измеряй не впечатление, а изменение результата: время, качество, проверяемость и число исправлений." },
    { tag: "ФИНАЛ · НЕ ТОЧКА", title: "Оставь за собой право решать.", copy: "ИИ может расширить возможности человека. Но направление задают цели, ограничения и решения людей — тех, кто выбирает данные, проверяет выводы и несёт ответственность.", visual: "horizon", insight: "Не соревнуйся с машиной в скорости генерации. Учись выбирать вопросы, проверять ответы и решать, что действительно имеет значение." }
  ]}
];

const KEY = "osa-cinema-progress-v1";

export function InteractiveCinema() {
  const [chapterNo, setChapterNo] = useState(0);
  const [sceneNo, setSceneNo] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState<string[]>([]);
  const [reveal, setReveal] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const chapter = chapters[chapterNo];
  const scene = chapter.scenes[sceneNo];
  const key = chapterNo + ":" + sceneNo;
  const total = useMemo(() => chapters.reduce((n, c) => n + c.scenes.length, 0), []);
  const finished = Math.round(done.length / total * 100);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as { chapterNo?: number; sceneNo?: number; answers?: Record<string, number>; done?: string[] };
      const validChapter = Number.isInteger(data.chapterNo) && data.chapterNo! >= 0 && data.chapterNo! < chapters.length ? data.chapterNo! : 0;
      const validScene = Number.isInteger(data.sceneNo) && data.sceneNo! >= 0 && data.sceneNo! < chapters[validChapter].scenes.length ? data.sceneNo! : 0;
      setChapterNo(validChapter);
      setSceneNo(validScene);
      if (data.answers && typeof data.answers === "object" && !Array.isArray(data.answers)) {
        const validAnswers: Record<string, number> = {};
        for (const [answerKey, answerValue] of Object.entries(data.answers)) {
          const [c, s] = answerKey.split(":").map(Number);
          if (Number.isInteger(c) && Number.isInteger(s) && chapters[c]?.scenes[s] && Number.isInteger(answerValue) && answerValue >= 0 && answerValue < (chapters[c].scenes[s].options?.length ?? 0)) validAnswers[answerKey] = answerValue;
        }
        setAnswers(validAnswers);
      }
      if (Array.isArray(data.done)) {
        const validKeys = new Set(chapters.flatMap((c, ci) => c.scenes.map((_, si) => `${ci}:${si}`)));
        setDone([...new Set(data.done.filter((v): v is string => typeof v === "string" && validKeys.has(v)))]);
      }
    } catch { /* corrupted local progress is safely ignored */ }
    finally { setHydrated(true); }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify({ chapterNo, sceneNo, answers, done })); } catch { /* storage may be disabled */ }
  }, [hydrated, chapterNo, sceneNo, answers, done]);

  function go(c: number, s: number) {
    setDone((old) => old.includes(key) ? old : [...old, key]);
    setChapterNo(c); setSceneNo(s); setReveal(false); setTranscript(false);
  }
  function previous() {
    if (sceneNo > 0) go(chapterNo, sceneNo - 1);
    else if (chapterNo > 0) go(chapterNo - 1, chapters[chapterNo - 1].scenes.length - 1);
  }
  function next() {
    if (sceneNo < chapter.scenes.length - 1) go(chapterNo, sceneNo + 1);
    else if (chapterNo < chapters.length - 1) go(chapterNo + 1, 0);
    else setDone((old) => old.includes(key) ? old : [...old, key]);
  }
  function reset() {
    setChapterNo(0); setSceneNo(0); setAnswers({}); setDone([]); setReveal(false); setTranscript(false);
    try { localStorage.removeItem(KEY); } catch { /* no-op */ }
  }
  const chosen = answers[key];

  return <main className="cinema">
    <header className="cinema-nav">
      <a className="osa-mark" href="/" aria-label="OSA — главная"><b>OSA</b><span>THINK BEYOND THE MODEL</span></a>
      <div className="nav-center"><i /> ИНТЕРАКТИВНЫЙ КИНООПЫТ <span> / </span> ТРИ ЧАСТИ</div>
      <button className="quiet-button" onClick={reset} type="button"><RotateCcw size={15}/> Сначала</button>
    </header>

    <section className={`film-frame film-${scene.visual}`} aria-labelledby="scene-title">
      <div className="film-grid" /><div className="film-glow" /><div className="film-orbit orbit-a" /><div className="film-orbit orbit-b" />
      <div className="film-stamp">OSA / FIELD NOTES <span>№ {String(chapters.slice(0, chapterNo).reduce((n,c)=>n+c.scenes.length,0)+sceneNo+1).padStart(2,"0")}</span></div>
      <div className="film-copy"><p className="eyebrow">{scene.tag}</p><h1 id="scene-title">{scene.title}</h1><p className="film-lede">{scene.copy}</p>
        <div className="film-buttons"><button className="button-primary" onClick={() => setTranscript(!transcript)} type="button"><Play size={15}/>{transcript ? "Скрыть текст сцены" : "Открыть повествование"}</button><span className="film-caption">ТЕКСТОВАЯ ВЕРСИЯ · БЕЗ ЗАПИСАННОГО ВИДЕО</span></div>
      </div>
      <div className="film-bottom"><span>THINK BEYOND THE MODEL</span><span>{chapter.n} — {chapter.title.toUpperCase()}</span></div>
    </section>

    <div className="cinema-layout">
      <aside className="chapter-rail"><div className="rail-label"><Compass size={14}/> МАРШРУТ</div>
        {chapters.map((c,i)=><button key={c.n} type="button" className={`chapter-item ${i===chapterNo?"active":""}`} onClick={()=>go(i,0)} aria-current={i===chapterNo?"step":undefined}><span className="chapter-number">{c.n}</span><span className="chapter-copy"><strong>{c.title}</strong><small>{c.subtitle}</small></span>{i<chapterNo&&<Check size={15}/>}</button>)}
        <div className="progress-box"><div className="progress-heading"><span>ТВОЙ ПРОГРЕСС</span><b>{finished}%</b></div><div className="progress-track"><i style={{width:`${finished}%`}}/></div><small>{done.length} из {total} сцен отмечены пройденными</small></div>
      </aside>

      <section className="scene-workspace">
        <div className="workspace-heading"><div><p className="eyebrow">СЕЙЧАС В ИСТОРИИ</p><h2>{chapter.title}</h2><p>{chapter.subtitle}</p></div><span className="scene-number">СЦЕНА {String(sceneNo+1).padStart(2,"0")} / {String(chapter.scenes.length).padStart(2,"0")}</span></div>
        {scene.question && scene.options && <div className="decision"><div className="decision-heading"><Sparkles size={18}/><div><p className="eyebrow">ТВОЁ РЕШЕНИЕ МЕНЯЕТ РАЗБОР</p><h3>{scene.question}</h3></div></div><div className="option-list">{scene.options.map((option,i)=><button type="button" key={option.title} className={`option ${chosen===i?"selected":""}`} aria-pressed={chosen===i} onClick={()=>{setAnswers(a=>({...a,[key]:i}));setReveal(true)}}><span>0{i+1}</span><strong>{option.title}</strong><ArrowRight size={16}/></button>)}</div>
          {reveal && chosen!==undefined && <div className="consequence" role="status"><b>ПОСЛЕДСТВИЕ ВЫБОРА</b><p>{scene.options[chosen].consequence}</p><b>ЧТО СТОИТ ПОНЯТЬ</b><p>{scene.options[chosen].lesson}</p></div>}
        </div>}
        <div className="takeaway"><span>КЛЮЧЕВАЯ МЫСЛЬ</span><p>{scene.insight}</p></div>
        {transcript&&<div className="transcript" role="region" aria-label="Текст повествования"><p className="eyebrow">ПОВЕСТВОВАНИЕ / ТЕКСТ СЦЕНЫ</p><p>{scene.copy}</p><small>В этой версии нет записанного дикторского голоса, музыки или MP4-файла.</small></div>}
        <div className="scene-actions"><button type="button" className="button-secondary" onClick={previous} disabled={chapterNo===0&&sceneNo===0}><ArrowLeft size={15}/> Назад</button><span>ЧИТАЙ · ВЫБИРАЙ · ПРОВЕРЯЙ</span><button type="button" className="button-primary" onClick={next}>{chapterNo===2&&sceneNo===chapter.scenes.length-1?"Завершить путешествие":"Следующая сцена"} <ArrowRight size={15}/></button></div>
      </section>
    </div>
    <section className="source-library" aria-labelledby="source-library-title">
      <div><p className="eyebrow">ПРОДОЛЖИТЬ ИССЛЕДОВАНИЕ</p><h2 id="source-library-title">Не верь на слово. Проверь.</h2><p className="source-intro">Курс объясняет идеи, но не заменяет первоисточники. Начни с этих открытых материалов.</p></div>
      <div className="source-links">
        <a href="https://hai.stanford.edu/ai-index" target="_blank" rel="noreferrer"><span>01 / ИНДЕКС И ДАННЫЕ</span><strong>Stanford HAI · AI Index</strong><small>Ежегодный обзор исследований, внедрения и общественного влияния ИИ ↗</small></a>
        <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer"><span>02 / ОЦЕНКА РИСКА</span><strong>NIST · AI Risk Management Framework</strong><small>Практическая структура для оценки и управления рисками AI-систем ↗</small></a>
        <a href="https://www.ilo.org/publications/generative-ai-and-jobs-global-analysis-potential-effects-job-quantity-and" target="_blank" rel="noreferrer"><span>03 / РАБОТА И НАВЫКИ</span><strong>ILO · Generative AI and Jobs</strong><small>Исследование возможных эффектов генеративного ИИ на занятость ↗</small></a>
      </div>
      <p className="source-disclaimer">Источники приведены для самостоятельной проверки. Прогнозы и интерпретации не следует считать установленными фактами; проверяй дату, методику и ограничения каждого исследования.</p>
    </section>
    <footer className="cinema-footer"><div><b>OSA</b><p>Технологии меняются. Способность мыслить остаётся твоей ответственностью.</p></div><span>ПРОГРЕСС СОХРАНЯЕТСЯ ЛОКАЛЬНО В ЭТОМ БРАУЗЕРЕ</span></footer>
  </main>;
}
