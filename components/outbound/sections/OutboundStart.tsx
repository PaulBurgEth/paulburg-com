"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, T, itemVariants } from "../shared";

const en = {
  eyebrow: "Start",
  h2: "Three moves to the first email",
  sub: "No call needed to begin.",
  steps: [
    { n: "01", t: "Ten questions", d: "Which services are the priority, who your best client is, which markets are closed. You answer in writing." },
    { n: "02", t: "A six-week plan", d: "Concrete segments with volume estimates, launch order, correspondence language, and the first email drafts for approval." },
    { n: "03", t: "We start", d: "The first email goes out in week three, the first replies land in week four, your own numbers in week six." },
  ],
  about: "I do cold client acquisition for B2B companies — correspondence only, in Russian, English and Spanish. Before this: my own projects and contract development — bots, CRMs, dashboards, automation.",
};

const ru = {
  eyebrow: "Старт",
  h2: "Три шага до первого письма",
  sub: "Чтобы начать, созвон не нужен.",
  steps: [
    { n: "01", t: "Десять вопросов", d: "Какие услуги приоритетны, кто ваш лучший клиент, какие рынки закрыты. Отвечаете письменно." },
    { n: "02", t: "План на шесть недель", d: "Конкретные сегменты с оценкой объёма, порядок запуска, язык переписки и тексты первых писем на согласование." },
    { n: "03", t: "Стартуем", d: "Первое письмо уходит на третьей неделе, первые ответы — на четвёртой, ваши собственные цифры — на шестой." },
  ],
  about: "Занимаюсь холодным поиском клиентов для B2B — только переписка, на русском, английском и испанском. До этого: свои проекты и разработка на заказ — боты, CRM, дашборды, автоматизация.",
};

export default function OutboundStart() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="09" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.steps.map((s) => (
          <motion.div key={s.n} variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.14em", color: "var(--c-gold)" }}>{s.n}</span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "9px 0 9px", lineHeight: 1.3 }}>{s.t}</h3>
            <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.65 }}>{s.d}</p>
          </motion.div>
        ))}
      </div>

      <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-text2)", lineHeight: 1.7, marginTop: 24, maxWidth: 780 }}>
        {t.about}
      </p>
    </SectionShell>
  );
}
