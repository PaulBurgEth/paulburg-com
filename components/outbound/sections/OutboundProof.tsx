"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, MidCTA, SERIF, SANS, MONO, T, tagStyle, itemVariants } from "../shared";

/**
 * This section used to be a pilot funnel plus a deliverability table with a
 * "market" column. Three problems. The reader could divide two of the rows and
 * get a reply rate that reads as weak, the funnel stopped short of any money,
 * and bounce rates are a vendor-side concern the buyer never bought on.
 * Exact figures and the reasoning are in docs/DECISIONS.md.
 * What replaces them is the artifact — the shape of a real exchange — and one
 * line offering the numbers to anyone who actually wants them.
 */

type Turn = { side: "out" | "in"; who: string; when: string; text: string };

const en = {
  eyebrow: "In practice",
  h2: "From a cold email to a company asking for a price",
  sub: "The email does not sell anything. Its whole job is to earn a reply from the person who decides — everything after that is an ordinary conversation about a deal.",
  disclaimer: "An example of how it goes.",
  turns: [
    {
      side: "out",
      who: "You",
      when: "Week 3 · first touch",
      text: "Saw you switched suppliers around April. We are on the ground where your factories are, and inspection is live — you join by video and watch the cartons opened. Worth a look at your next order?",
    },
    {
      side: "in",
      who: "Them",
      when: "Week 4 · their reply",
      text: "We do have a batch going out in about six weeks. What does inspection cost, and can you cover two factories in the same window?",
    },
    {
      side: "out",
      who: "You",
      when: "Weeks 4–5 · into the deal",
      text: "Both factories, one window, one invoice. Sending the checklist and a price for that batch today — if it fits, we book the window.",
    },
  ] as Turn[],
  afterTitle: "Where you come in",
  after: "Not at the first email, and not at the tenth. You come in when a company has agreed on the substance and wants to talk terms. Everything before that point is mine.",
  repliedTitle: "The kind of company that answers",
  repliedNote: "Metals trading, B2B, from a cold start:",
  replied: ["Large metallurgical holding", "Lift equipment maker", "Electrical engineering plant", "Regional gas and heating utilities", "Leaf-spring maker", "Toolmaking plant"],
  numbersLine: "Want the numbers — funnel by stage, deliverability, cost per client? I send them in writing on request, before you commit to anything.",
  ctaNote: "Your segment gets its own list and its own copy in the first week.",
  cta: "Tell me about your market →",
};

const ru = {
  eyebrow: "В работе",
  h2: "От холодного письма до компании, которая просит расчёт",
  sub: "Письмо ничего не продаёт. Его единственная задача — получить ответ от того, кто решает. Всё дальше — обычный разговор о сделке.",
  disclaimer: "Пример того, как это идёт.",
  turns: [
    {
      side: "out",
      who: "Вы",
      when: "Неделя 3 · первое касание",
      text: "Увидел, что примерно в апреле вы сменили поставщика. Мы на земле там, где ваши фабрики, и инспекция идёт вживую: вы подключаетесь по видео и смотрите, как вскрывают коробки. Посмотрим на следующем заказе?",
    },
    {
      side: "in",
      who: "Они",
      when: "Неделя 4 · их ответ",
      text: "Партия действительно уходит примерно через шесть недель. Сколько стоит инспекция и можете ли вы закрыть две фабрики в одно окно?",
    },
    {
      side: "out",
      who: "Вы",
      when: "Недели 4–5 · переход в сделку",
      text: "Обе фабрики, одно окно, один счёт. Сегодня отправляю чек-лист и цену под эту партию — если подходит, бронируем окно.",
    },
  ] as Turn[],
  afterTitle: "Где вступаете вы",
  after: "Не на первом письме и не на десятом. Вы вступаете, когда компания уже согласилась по сути и хочет обсуждать условия. Всё до этой точки — на мне.",
  repliedTitle: "Кто отвечает",
  repliedNote: "Металлопрокат, B2B, с холодного старта:",
  replied: ["Крупный металлургический холдинг", "Производитель лифтового оборудования", "Завод электротехники", "Региональные газовые и тепловые сети", "Производитель рессор", "Инструментальный завод"],
  numbersLine: "Нужны цифры — воронка по этапам, доставляемость, стоимость клиента? Высылаю письмом по запросу, до любых обязательств.",
  ctaNote: "Для вашего сегмента список и тексты составляются в первую неделю.",
  cta: "Расскажите о вашем рынке →",
};

export default function OutboundProof() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="05" id="proof">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Transcript, not cards: a vertical spine with the two sides indented
          against each other, so the exchange reads as correspondence. */}
      <div style={{ position: "relative", paddingLeft: 2 }}>
        <div
          aria-hidden="true"
          className="hidden sm:block"
          style={{ position: "absolute", left: 7, top: 10, bottom: 10, width: 1, background: "var(--c-border2)" }}
        />
        <div className="flex flex-col gap-3">
          {t.turns.map((turn, i) => {
            const out = turn.side === "out";
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative flex flex-col sm:pl-8"
                style={{ marginLeft: out ? 0 : undefined }}
              >
                <span
                  aria-hidden="true"
                  className="hidden sm:block"
                  style={{
                    position: "absolute", left: 0, top: 14, width: 15, height: 15, borderRadius: "50%",
                    background: out ? "var(--c-gold)" : "var(--c-bg)",
                    border: `1px solid ${out ? "var(--c-gold)" : "var(--c-border2)"}`,
                  }}
                />
                <div
                  className="sm:max-w-[86%]"
                  style={{
                    alignSelf: out ? "flex-start" : "flex-end",
                    background: out ? "var(--c-card)" : "var(--c-card2)",
                    border: "1px solid var(--c-border)",
                    borderLeft: out ? "2px solid var(--c-gold)" : "1px solid var(--c-border)",
                    borderRight: out ? "1px solid var(--c-border)" : "2px solid var(--c-sage)",
                    borderRadius: 10,
                    padding: "16px 20px",
                    width: "100%",
                  }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1" style={{ marginBottom: 9 }}>
                    <span
                      style={{
                        fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.16em",
                        textTransform: "uppercase", color: out ? "var(--c-gold)" : "var(--c-sage)",
                      }}
                    >
                      {turn.who}
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.06em", color: "var(--c-muted)" }}>
                      {turn.when}
                    </span>
                  </div>
                  <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65 }}>
                    {turn.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Note>{t.disclaimer}</Note>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 32 }}>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 10 }}>
            {t.afterTitle}
          </h3>
          <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{t.after}</p>
        </div>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 6 }}>
            {t.repliedTitle}
          </h3>
          <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-muted)", display: "block", marginBottom: 12 }}>
            {t.repliedNote}
          </span>
          <div className="flex flex-wrap gap-2">
            {t.replied.map((r) => (
              <span key={r} style={tagStyle}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* The numbers are not hidden, they are moved off the sales page and into
          the conversation, where their one-niche origin can be stated. */}
      <div
        style={{
          marginTop: 24,
          background: "var(--c-card2)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-sage)",
          borderRadius: 10,
          padding: 22,
        }}
      >
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: 820 }}>
          {t.numbersLine}
        </p>
      </div>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
