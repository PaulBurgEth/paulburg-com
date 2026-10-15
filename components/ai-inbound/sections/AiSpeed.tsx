"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";
import { ProofCard, SOURCES } from "../shared";

// HBR 2011: 37% within an hour, 24% over a day, 23% never → 47% "nearly half".
// Pool csv: ai_bot != '?' → 97 readable sites; ai_bot != 'нет' → 3.
const en = {
  eyebrow: "AI Sales Manager · the problem",
  h2: "The buyer found you. Now they write at 10 pm, to you and two others.",
  sub: "The deal goes to whoever replies with something useful first. Nearly half of companies reply the next day, or never.",
  cards: [
    { n: "×7", d: "Companies that answered a web inquiry within an hour were about 7 times as likely to reach the person who decides as those that answered later. 2,241 US companies.", s: SOURCES.hbr },
    { n: "37%", d: "answered within an hour.", s: SOURCES.hbr },
    { n: "23%", d: "never answered at all.", s: SOURCES.hbr },
  ],
  own: { n: "3 of 97", d: "agency sites in Phuket, Bali and Da Nang have anything that answers on its own. Everywhere else the inquiry waits for a person.", l: "Our check, October 2026" },
  example: "Example",
  now: { t: "Now", rows: [["22:04", "the message lands in WhatsApp"], ["09:30", "a manager opens it"], ["", "the buyer is already viewing with someone else"]] },
  ai: { t: "With an AI Sales Manager", rows: [["22:05", "a reply"], ["22:08", "three matching listings"], ["09:00", "your manager starts with a buyer who has a budget and a viewing date"]] },
};

const ru = {
  eyebrow: "AI-продавец · проблема",
  h2: "Покупатель вас нашёл. Теперь он пишет в 22:00, вам и ещё двоим.",
  sub: "Сделка достаётся тому, кто первым ответил по делу. Почти половина компаний отвечает на следующий день или не отвечает вовсе.",
  cards: [
    { n: "×7", d: "Компании, ответившие на заявку с сайта в течение часа, примерно в 7 раз чаще доходили до того, кто решает, чем ответившие позже. 2 241 компания США.", s: SOURCES.hbr },
    { n: "37%", d: "ответили в течение часа.", s: SOURCES.hbr },
    { n: "23%", d: "не ответили вообще.", s: SOURCES.hbr },
  ],
  own: { n: "3 из 97", d: "сайтов агентств Пхукета, Бали и Дананга отвечают сами. У остальных заявка ждёт человека.", l: "Наша проверка, октябрь 2026" },
  example: "Пример",
  now: { t: "Сейчас", rows: [["22:04", "сообщение падает в WhatsApp"], ["09:30", "менеджер его открывает"], ["", "покупатель уже смотрит объект с другим агентством"]] },
  ai: { t: "С AI-продавцом", rows: [["22:05", "ответ"], ["22:08", "три подходящих объекта"], ["09:00", "менеджер начинает день с покупателем, у которого есть бюджет и дата просмотра"]] },
};

function Timeline({ title, rows, accent, label }: { title: string; rows: string[][]; accent: boolean; label: string }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "var(--c-card)", border: `1px solid ${accent ? "rgba(200,169,110,0.45)" : "var(--c-border)"}`, borderRadius: 10, padding: 22 }}
    >
      <div className="flex justify-between gap-3" style={{ marginBottom: 14 }}>
        <span style={{ fontFamily: MONO, fontSize: T.eyebrow, letterSpacing: "0.14em", textTransform: "uppercase", color: accent ? "var(--c-gold)" : "var(--c-text2)" }}>{title}</span>
        <span style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-muted)" }}>{label}</span>
      </div>
      <ol className="flex flex-col" style={{ gap: 12 }}>
        {rows.map(([time, text], i) => (
          <li key={i} className="flex gap-4">
            <span style={{ fontFamily: MONO, fontSize: T.bodySm, color: accent ? "var(--c-gold)" : "var(--c-muted)", minWidth: 52, flexShrink: 0 }}>{time || "→"}</span>
            <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: !time && !accent ? "var(--c-heading)" : "var(--c-body)", lineHeight: 1.5 }}>{text}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

export default function AiSpeed() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="06">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 28 }}>
        {t.cards.map((c) => (
          <ProofCard key={c.n} n={c.n} d={c.d} source={c.s} />
        ))}
        <ProofCard n={t.own.n} d={t.own.d} source={{ label: t.own.l }} own />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Timeline title={t.now.t} rows={t.now.rows} accent={false} label={t.example} />
        <Timeline title={t.ai.t} rows={t.ai.rows} accent label={t.example} />
      </div>
    </SectionShell>
  );
}
