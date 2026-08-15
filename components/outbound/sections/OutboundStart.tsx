"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, itemVariants } from "../shared";

const en = {
  eyebrow: "Start",
  h2: "Three moves to the first email",
  sub: "No call is needed to begin. A call happens only if questions are left over after this page.",
  steps: [
    { n: "01", t: "I send ten questions", d: "Which services are the priority, who your best client is and how they differ from the average, which markets are closed, what you do not take on, and who receives the client on your side. You answer in writing, whenever it suits you." },
    { n: "02", t: "I come back with a six-week plan", d: "Concrete segments with volume estimates, the launch order, the correspondence language for each, and the first email drafts for your approval." },
    { n: "03", t: "We agree and start", d: "The first email goes out in week three, the first replies land in week four, and the report with your own coefficients arrives in week six." },
  ],
  aboutTitle: "Who you are dealing with",
  about: [
    "I do cold client acquisition for B2B companies. Correspondence only, in Russian, English and Spanish, with other languages added per market.",
    "Most recent project: metals trading in Russia — the numbers in § 06 are from it, taken out of the working journal.",
    "Before that: my own projects and contract development — bots, CRMs, dashboards, automation. That background is why the reporting and the tracking sheet exist from day one rather than as an afterthought.",
  ],
};

const ru = {
  eyebrow: "Старт",
  h2: "Три шага до первого письма",
  sub: "Чтобы начать, созвон не нужен. Он нужен только если после этой страницы остались вопросы.",
  steps: [
    { n: "01", t: "Присылаю десять вопросов", d: "Какие услуги приоритетны, кто ваш лучший клиент и чем он отличается от среднего, какие рынки закрыты, что вы не берёте и кто принимает клиента с вашей стороны. Отвечаете письменно, когда удобно." },
    { n: "02", t: "Возвращаюсь с планом на шесть недель", d: "Конкретные сегменты с оценкой объёма, порядок запуска, язык переписки по каждому и тексты первых писем на согласование." },
    { n: "03", t: "Договариваемся и стартуем", d: "Первое письмо уходит на третьей неделе, первые ответы приходят на четвёртой, отчёт с вашими коэффициентами — на шестой." },
  ],
  aboutTitle: "С кем вы имеете дело",
  about: [
    "Занимаюсь холодным поиском клиентов для B2B. Только переписка: русский, английский, испанский, другие языки добавляются под конкретный рынок.",
    "Последний проект — металлотрейдинг в России, цифры в § 06 из него, взяты из рабочего журнала.",
    "До этого — свои проекты и разработка на заказ: боты, CRM, дашборды, автоматизация. Из-за этого фона отчётность и таблица учёта появляются с первого дня, а не задним числом.",
  ],
};

export default function OutboundStart() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="10" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.steps.map((s) => (
          <motion.div
            key={s.n}
            variants={itemVariants}
            style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 20 }}
          >
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", color: "var(--c-gold)" }}>
              {s.n}
            </span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, color: "var(--c-heading)", margin: "8px 0 8px", lineHeight: 1.3 }}>
              {s.t}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.7 }}>{s.d}</p>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24, background: "var(--c-card2)", border: "1px solid var(--c-border)",
          borderRadius: 10, padding: 22,
        }}
      >
        <span
          style={{
            fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-muted)", display: "block", marginBottom: 12,
          }}
        >
          {t.aboutTitle}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, maxWidth: 760 }}>
          {t.about.map((a, i) => (
            <p key={i} style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.7 }}>{a}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
