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
  pilotsTitle: "Two runs, two different industries",
  pilots: [
    {
      tag: "Industrial supply",
      steps: [
        { n: "4 235", l: "companies written to" },
        { n: "75", l: "came back with a real reply" },
        { n: "68", l: "received a priced quote" },
      ],
    },
    {
      tag: "A services business, nine sectors at once",
      steps: [
        { n: "2 082", l: "companies written to" },
        { n: "62", l: "came back with a real reply" },
        { n: "25", l: "asked for terms" },
      ],
    },
  ],
  pilotsNote: "Two industries rather than one, because the first thing anyone wants to know is whether this only works where it was built. The segments are not named here because the businesses behind them are not.",
  compareTitle: "What one reply is worth here",
  // Scoped to the first run explicitly. 68 of 75 is the industrial-supply
  // pilot; the services pilot ten lines above reads 25 of 62, and a reader who
  // does that arithmetic was landing on 40% under a headline saying 91%. The
  // figure is not changed — the claim now says which run it is from, which is
  // also how the canon reports it, per pilot with an interval rather than as
  // one blended number.
  compareOurs: { n: "91%", l: "of replies reached a priced quote", sub: "68 of the 75 replies, industrial supply" },
  compareMarket: { n: "14%", l: "of replies carry any interest at all", sub: "market average, cold email" },
  compareNote: "Our bar is the higher one: not a reply that sounds interested, a company that got as far as a price. And the market figure is measured on sequences that run email together with LinkedIn and calls — this is email on its own. Market data: aggregated platform benchmarks, Growth Engineer, 2026.",
  afterTitle: "Where you come in",
  after: "Not at the first email, and not at the tenth. You come in when a company has agreed on the substance and wants to talk terms. Everything before that point is mine.",
  repliedTitle: "The kind of company that answers",
  repliedNote: "Metals trading, B2B, from a cold start:",
  replied: ["Large metallurgical holding", "Lift equipment maker", "Electrical engineering plant", "Regional gas and heating utilities", "Leaf-spring maker", "Toolmaking plant"],
  numbersLine: "Want the rest of it — the funnel stage by stage, deliverability, cost per client, and which segments returned what? I send the full breakdown in writing on request, before you commit to anything.",
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
  pilotsTitle: "Два прогона, две разные отрасли",
  pilots: [
    {
      tag: "Промышленное снабжение",
      steps: [
        { n: "4 235", l: "компаниям написали" },
        { n: "75", l: "ответили по существу" },
        { n: "68", l: "получили расчёт с ценой" },
      ],
    },
    {
      tag: "Сервисный бизнес, девять направлений сразу",
      steps: [
        { n: "2 082", l: "компаниям написали" },
        { n: "62", l: "ответили по существу" },
        { n: "25", l: "запросили условия" },
      ],
    },
  ],
  pilotsNote: "Две отрасли, а не одна, потому что первое, что хотят понять — работает ли это где-то кроме того места, где строилось. Сегменты здесь не названы, потому что не названы стоящие за ними бизнесы.",
  compareTitle: "Чего стоит здесь один ответ",
  compareOurs: { n: "91%", l: "ответов дошли до расчёта с ценой", sub: "68 из 75 ответов, металлопрокат и промснаб" },
  compareMarket: { n: "14%", l: "ответов вообще содержат интерес", sub: "среднее по рынку холодной почты" },
  compareNote: "Планка у нас выше: не ответ, который звучит заинтересованно, а компания, дошедшая до цены. И рыночная цифра снята на последовательностях, где почта идёт вместе с LinkedIn и звонками — здесь одна почта. Рыночные данные: агрегация платформенных бенчмарков, Growth Engineer, 2026.",
  afterTitle: "Где вступаете вы",
  after: "Не на первом письме и не на десятом. Вы вступаете, когда компания уже согласилась по сути и хочет обсуждать условия. Всё до этой точки — на мне.",
  repliedTitle: "Кто отвечает",
  repliedNote: "Металлопрокат, B2B, с холодного старта:",
  replied: ["Крупный металлургический холдинг", "Производитель лифтового оборудования", "Завод электротехники", "Региональные газовые и тепловые сети", "Производитель рессор", "Инструментальный завод"],
  numbersLine: "Нужно остальное — воронка по этапам, доставляемость, стоимость клиента и что принёс каждый сегмент? Полную раскладку высылаю письмом по запросу, до любых обязательств.",
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
                  <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>
                    {turn.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Note>{t.disclaimer}</Note>

      {/* Two runs, led by the end of the funnel. The volume is context under it,
          not the headline: what closes is how many companies reached a price. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.pilotsTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {t.pilots.map((pl) => (
          <motion.div
            key={pl.tag}
            variants={itemVariants}
            style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-gold)", borderRadius: 10, padding: 24 }}
          >
            <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-text2)", display: "block", marginBottom: 18 }}>
              {pl.tag}
            </span>
            {/* Шаги, а не пропорциональные полосы: 75 из 4 235 линейной шкалой
                превращается в невидимую полоску, и весь блок начинает читаться
                как провал вместо результата. */}
            {pl.steps.map((st, si) => {
              const last = si === pl.steps.length - 1;
              return (
                <div key={st.l} className="flex gap-4" style={{ position: "relative" }}>
                  <div className="flex flex-col items-center" style={{ flexShrink: 0, width: 14 }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: last ? 12 : 8, height: last ? 12 : 8, borderRadius: "50%",
                        marginTop: last ? 12 : 8,
                        background: last ? "var(--c-gold)" : "transparent",
                        border: `1px solid ${last ? "var(--c-gold)" : "var(--c-border2)"}`,
                      }}
                    />
                    {!last && (
                      <span aria-hidden="true" style={{ flex: 1, width: 1, background: "var(--c-border2)", minHeight: 26 }} />
                    )}
                  </div>
                  <div className="flex items-baseline gap-3" style={{ flexWrap: "wrap", paddingBottom: last ? 0 : 14 }}>
                    <span
                      style={{
                        fontFamily: SERIF, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em",
                        fontSize: last ? T.figureSm : T.h3,
                        color: last ? "var(--c-gold)" : "var(--c-text2)",
                      }}
                    >
                      {st.n}
                    </span>
                    <span
                      style={{
                        fontFamily: SANS, fontSize: last ? T.body : T.bodySm,
                        fontWeight: last ? 600 : 400,
                        color: last ? "var(--c-body-lede)" : "var(--c-text2)",
                        lineHeight: 1.4, maxWidth: 240,
                      }}
                    >
                      {st.l}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
      <Note>{t.pilotsNote}</Note>

      {/* Единственное место на странице, где пропорциональная полоса работает
          на нас: 91 против 14 читается мгновенно. В воронке та же полоса читалась
          бы как провал, поэтому там шаги. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "34px 0 16px" }}>
        {t.compareTitle}
      </h3>
      <div
        style={{
          background: "var(--c-card)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-gold)",
          borderRadius: 10,
          padding: 24,
        }}
      >
        {[
          { ...t.compareOurs, pct: 91, ours: true },
          { ...t.compareMarket, pct: 14, ours: false },
        ].map((row) => (
          <motion.div key={row.l} variants={itemVariants} style={{ marginBottom: row.ours ? 22 : 0 }}>
            <div className="flex items-baseline gap-3" style={{ flexWrap: "wrap", marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: SERIF, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em",
                  fontSize: row.ours ? T.figureSm : T.h3,
                  color: row.ours ? "var(--c-gold)" : "var(--c-text2)",
                }}
              >
                {row.n}
              </span>
              <span
                style={{
                  fontFamily: SANS, fontSize: T.body, lineHeight: 1.4,
                  fontWeight: row.ours ? 600 : 400,
                  color: row.ours ? "var(--c-body-lede)" : "var(--c-text2)",
                }}
              >
                {row.l}
              </span>
            </div>
            <div
              aria-hidden="true"
              style={{
                height: row.ours ? 12 : 8,
                width: `${row.pct}%`,
                borderRadius: 3,
                background: row.ours
                  ? "linear-gradient(90deg, var(--c-gold), var(--c-gold-glow))"
                  : "var(--c-border2)",
                border: row.ours ? "none" : "1px solid var(--c-border2)",
              }}
            />
            <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.06em", color: "var(--c-muted)", display: "block", marginTop: 7 }}>
              {row.sub}
            </span>
          </motion.div>
        ))}
      </div>
      <Note>{t.compareNote}</Note>

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
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>
          {t.numbersLine}
        </p>
      </div>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
