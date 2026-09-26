"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "../shared";

/**
 * The only table on the page.
 *
 * This section used to compare the channel to advertising, which is the buyer's
 * least likely alternative. The real choice is: hire an SDR, retain a lead-gen
 * agency, buy ads, or do nothing — so those are the columns. The last column is
 * the offer, and it is the only one that leaves an asset behind.
 */

const en = {
  eyebrow: "Your alternatives",
  h2: "Four ways to get new clients. One of them leaves something behind.",
  sub: "Every row below is a question you would ask a vendor anyway. Here they are answered side by side.",
  cols: ["An SDR in-house", "A lead-gen agency", "Ads", "This channel"],
  rows: [
    {
      k: "Who gets a letter",
      v: [
        "Whoever they get through this week",
        "A list from a data vendor, everyone in the sector",
        "Whoever is already searching",
        "Each company read before the letter: its site shows it needs what you sell",
      ],
    },
    {
      k: "What the letter says",
      v: [
        "Their script, adjusted as they learn",
        "One template, a name merged in",
        "The same banner for everyone",
        "What that company sells and how it differs from its neighbours",
      ],
    },
    {
      k: "Time to the first real reply",
      v: [
        "Three months of ramp, paid throughout",
        "A month or two of setup first",
        "Immediately, but only against active demand",
        "Letters go out in week one; replies build across the four",
      ],
    },
    {
      k: "What you are promised",
      v: [
        "Activity targets",
        "Guaranteed meetings",
        "Clicks and impressions",
        "A weekly report: companies, letters, replies",
      ],
    },
    {
      k: "What you sign up for",
      v: [
        "A salary and a notice period",
        "A 3–13-month contract",
        "A monthly budget",
        "Four weeks, stop before any week",
      ],
    },
    {
      k: "What is left if you stop",
      v: [
        "Nothing. The person left",
        "Nothing. The list was theirs",
        "Nothing. Traffic ends with the budget",
        "The list of companies, the stop-list, the letters, the funnel stage by stage",
      ],
    },
  ],
  shortTitle: "Why the timing matters more than the pitch",
  shortBody:
    "By the time a company starts searching for a vendor, the shortlist is already written — mostly from names the buyer knew before the search began, and research on B2B buying keeps finding that the vendor who made contact first wins most of the time. Advertising cannot get you onto that list; it only appears after the search starts. This can, because it starts from the event that causes the search.",
  source: "6sense, 2025 B2B Buyer Experience Report",
};

const ru = {
  eyebrow: "Ваши альтернативы",
  h2: "Четыре способа получить новых клиентов. После одного что-то остаётся.",
  sub: "Каждая строка ниже — вопрос, который вы и так зададите подрядчику. Здесь на них отвечено рядом.",
  cols: ["Свой SDR", "Агентство лидгена", "Реклама", "Этот канал"],
  rows: [
    {
      k: "Кому уходит письмо",
      v: [
        "Тем, кого успел набрать за неделю",
        "Выгрузке из базы, всем в отрасли подряд",
        "Тем, кто уже ищет",
        "Каждой компании, прочитанной до письма: по её сайту видно, что ей нужен ваш товар",
      ],
    },
    {
      k: "Что в письме",
      v: [
        "Его скрипт, который он правит по ходу",
        "Один шаблон, подставлено название",
        "Один баннер на всех",
        "Что продаёт эта компания и чем она непохожа на соседей",
      ],
    },
    {
      k: "Когда первый живой ответ",
      v: [
        "Три месяца разгона, зарплата всё это время",
        "Месяц-два настройки до первого письма",
        "Сразу, но только по активному спросу",
        "Письма уходят с первой недели, ответы набираются за четыре",
      ],
    },
    {
      k: "Что вам обещают",
      v: [
        "План по звонкам и письмам",
        "Гарантию встреч",
        "Клики и показы",
        "Отчёт каждую неделю: компании, письма, ответы",
      ],
    },
    {
      k: "На что подписываетесь",
      v: [
        "Зарплата и срок увольнения",
        "Договор на 3–13 месяцев",
        "Бюджет на месяц",
        "Четыре недели, остановиться можно перед любой",
      ],
    },
    {
      k: "Что остаётся, если остановить",
      v: [
        "Ничего. Человек ушёл",
        "Ничего. База была их",
        "Ничего. Трафик кончается вместе с бюджетом",
        "Список компаний, стоп-лист, тексты писем, воронка по этапам",
      ],
    },
  ],
  shortTitle: "Почему момент важнее формулировок",
  shortBody:
    "К тому моменту, когда компания начинает искать поставщика, шорт-лист уже составлен — в основном из имён, которые покупатель знал до начала поиска, и исследования B2B-закупок раз за разом показывают, что чаще всего выигрывает тот, кто вышел на связь первым. Реклама в этот список не заводит: она появляется уже после начала поиска. Этот канал заводит, потому что стартует от события, которое поиск и вызовет.",
  source: "6sense, 2025 B2B Buyer Experience Report",
};

const LAST = 3; // index of the highlighted column

export default function OutboundWhy() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  const cellText: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: T.bodySm,
    lineHeight: 1.5,
  };

  return (
    <SectionShell num="02" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Desktop: one grid, five columns. The offer column carries the gold. */}
      <div
        role="table"
        className="hidden md:block"
        style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}
      >
        <div
          role="row"
          className="grid"
          style={{
            gridTemplateColumns: "1.05fr 1fr 1fr 0.8fr 1.25fr",
            background: "var(--c-card2)",
            borderBottom: "1px solid var(--c-border)",
          }}
        >
          {/* The row-label column has no visible header, but an empty
              aria-label is not the way to say that: axe flags it as an empty
              table header, and it names nothing. presentation removes it from
              the header row instead. */}
          <div role="presentation" style={{ padding: "13px 16px" }} />
          {t.cols.map((c, i) => (
            <div
              key={c}
              role="columnheader"
              style={{
                fontFamily: MONO,
                fontSize: T.caption,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: i === LAST ? "var(--c-gold)" : "var(--c-text2)",
                fontWeight: i === LAST ? 700 : 400,
                padding: "13px 16px",
                background: i === LAST ? "var(--c-card)" : "transparent",
                borderTop: i === LAST ? "2px solid var(--c-gold)" : "2px solid transparent",
              }}
            >
              {c}
            </div>
          ))}
        </div>

        {t.rows.map((row, r) => (
          <motion.div
            key={row.k}
            role="row"
            variants={itemVariants}
            className="grid"
            style={{
              gridTemplateColumns: "1.05fr 1fr 1fr 0.8fr 1.25fr",
              borderTop: r ? "1px solid var(--c-border)" : "none",
            }}
          >
            <div
              role="rowheader"
              style={{
                ...cellText,
                fontWeight: 600,
                color: "var(--c-heading)",
                padding: "15px 16px",
                background: "var(--c-card2)",
              }}
            >
              {row.k}
            </div>
            {row.v.map((v, i) => (
              <div
                key={i}
                role="cell"
                style={{
                  ...cellText,
                  color: i === LAST ? "var(--c-body-lede)" : "var(--c-text2)",
                  fontWeight: i === LAST ? 600 : 400,
                  padding: "15px 16px",
                  background: i === LAST ? "var(--c-card)" : "transparent",
                }}
              >
                {v}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Mobile: one block per option. A five-column grid cannot survive 375px,
          and a horizontally scrolling table hides the column that matters. */}
      <div className="md:hidden flex flex-col gap-3">
        {t.cols.map((c, i) => (
          <motion.div
            key={c}
            variants={itemVariants}
            style={{
              background: i === LAST ? "var(--c-card)" : "var(--c-card2)",
              border: "1px solid var(--c-border)",
              borderTop: i === LAST ? "2px solid var(--c-gold)" : "1px solid var(--c-border)",
              borderRadius: 10,
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: T.caption,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: i === LAST ? 700 : 400,
                color: i === LAST ? "var(--c-gold)" : "var(--c-text2)",
                marginBottom: 12,
              }}
            >
              {c}
            </div>
            <dl style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {t.rows.map((row) => (
                <div key={row.k}>
                  <dt style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.06em", color: "var(--c-muted)" }}>
                    {row.k}
                  </dt>
                  <dd style={{ ...cellText, color: i === LAST ? "var(--c-body-lede)" : "var(--c-body)" }}>
                    {row.v[i]}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          background: "var(--c-card)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-gold)",
          borderRadius: 10,
          padding: 24,
        }}
      >
        <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 10 }}>
          {t.shortTitle}
        </h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.7, maxWidth: "58ch" }}>
          {t.shortBody}
        </p>
        <Note>{t.source}</Note>
      </div>
    </SectionShell>
  );
}
