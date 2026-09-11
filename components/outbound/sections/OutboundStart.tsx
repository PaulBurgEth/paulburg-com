"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, LEDE, T, itemVariants } from "../shared";

const en = {
  eyebrow: "Start",
  h2: "Three moves to the first email",
  sub: "You can start in writing today.",
  steps: [
    { n: "01", t: "Ten questions", d: "Which services are the priority, who your best client is, which markets are closed. You answer in writing." },
    { n: "02", t: "A six-week plan", d: "Concrete segments with volume estimates, launch order, correspondence language, and the first email drafts for approval." },
    { n: "03", t: "We start", d: "The first letters go out inside week one — not after a month of preparation. Your own numbers land in week six." },
  ],
  whoTitle: "Who you would be working with",
  whoRole: "Cold outbound for B2B · RU, EN, ES",
  about: "I do cold client acquisition for B2B companies, in Russian, English and Spanish. Before this: my own projects since 2011 and contract development — bots, CRMs, dashboards, automation. That background is why this is built as a system you own rather than a service you rent.",
};

const ru = {
  eyebrow: "Старт",
  h2: "Три шага до первого письма",
  sub: "Начать можно письмом, сегодня.",
  steps: [
    { n: "01", t: "Десять вопросов", d: "Какие услуги приоритетны, кто ваш лучший клиент, какие рынки закрыты. Отвечаете письменно." },
    { n: "02", t: "План на шесть недель", d: "Конкретные сегменты с оценкой объёма, порядок запуска, язык переписки и тексты первых писем на согласование." },
    { n: "03", t: "Стартуем", d: "Первые письма уходят внутри первой недели, а не после месяца подготовки. Ваши собственные цифры — на шестой." },
  ],
  whoTitle: "С кем вы будете работать",
  whoRole: "Холодный аутбаунд для B2B · RU, EN, ES",
  about: "Занимаюсь холодным поиском клиентов для B2B на русском, английском и испанском. До этого: свои проекты с 2011 года и разработка на заказ — боты, CRM, дашборды, автоматизация. Из-за этого фона канал и построен как система, которая принадлежит вам, а не услуга в аренду.",
};

export default function OutboundStart() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="11">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Three steps on a rail, matching the six-week schedule above. */}
      <div style={{ position: "relative" }}>
        <div
          aria-hidden="true"
          className="hidden md:block"
          style={{ position: "absolute", left: 0, right: 0, top: 17, height: 1, background: "var(--c-border2)" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-7" style={{ position: "relative" }}>
          {t.steps.map((s, i) => (
            <motion.div key={s.n} variants={itemVariants} className="flex flex-col items-start">
              <span
                className="flex items-center justify-center"
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: i === 2 ? "var(--c-gold)" : "var(--c-bg)",
                  border: `1px solid ${i === 2 ? "var(--c-gold)" : "var(--c-border2)"}`,
                  color: i === 2 ? "var(--c-on-gold)" : "var(--c-text2)",
                  fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.04em",
                  flexShrink: 0, position: "relative", zIndex: 1,
                }}
              >
                {s.n}
              </span>
              <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "13px 0 8px", lineHeight: 1.3 }}>{s.t}</h3>
              <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.65 }}>{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* A face. Everything above this line is a method; a reader arriving from
          a cold link still has no idea who is on the other end of it. */}
      <div
        className="flex flex-col sm:flex-row gap-6 sm:gap-7 sm:items-start"
        style={{ marginTop: 40, background: "var(--c-card)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-gold)", borderRadius: 10, padding: 24 }}
      >
        <span
          style={{
            width: 84, height: 84, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: "1px solid var(--c-gold)", boxShadow: "0 0 0 4px var(--c-gold-dim)",
          }}
        >
          <Image src="/about.webp" alt="Paul Burg" width={168} height={168} sizes="168px" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%" }} />
        </span>
        <div className="min-w-0">
          <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-text2)", display: "block", marginBottom: 7 }}>
            {t.whoTitle}
          </span>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 21, color: "var(--c-heading)", lineHeight: 1.2 }}>Paul Burg</h3>
          <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-gold)", display: "block", margin: "6px 0 13px" }}>
            {t.whoRole}
          </span>
          <p style={{ fontFamily: LEDE, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.7, maxWidth: "58ch" }}>
            {t.about}
          </p>
        </div>
      </div>

    </SectionShell>
  );
}
