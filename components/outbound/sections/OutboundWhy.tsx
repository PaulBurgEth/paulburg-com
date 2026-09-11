"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, T, itemVariants } from "../shared";

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
      k: "Who it reaches",
      v: [
        "Whoever they get through this week",
        "Whoever their template was pointed at",
        "Whoever is already searching",
        "Companies you named, each with a reason on public record",
      ],
    },
    {
      k: "Time to the first real reply",
      v: [
        "Three months of ramp, paid throughout",
        "A month or two, on domains that are not yours",
        "Immediately, but only against active demand",
        "Letters go out in week one; replies build across the six",
      ],
    },
    {
      k: "Whose domain and data",
      v: [
        "Yours, and theirs to learn on",
        "Theirs. It leaves when they do",
        "Not applicable",
        "Yours, on your accounts from day one",
      ],
    },
    {
      k: "What is left if you stop",
      v: [
        "Nothing. The person left",
        "Nothing",
        "Nothing. Traffic ends with the budget",
        "The list, the stop-list, the copy, the warmed domains",
      ],
    },
    {
      k: "Cost of being wrong",
      v: [
        "A year of salary and a rehire",
        "A spent quarter",
        "A spent budget",
        "Six weeks at a fixed fee",
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
      k: "До кого доходит",
      v: [
        "До тех, кого успел набрать за неделю",
        "До тех, на кого был нацелен их шаблон",
        "До тех, кто уже ищет",
        "До названных вами компаний, у каждой повод в открытом источнике",
      ],
    },
    {
      k: "Когда первый живой ответ",
      v: [
        "Три месяца разгона, зарплата всё это время",
        "Месяц-два, на чужих доменах",
        "Сразу, но только по активному спросу",
        "Письма уходят с первой недели, ответы набираются за шесть",
      ],
    },
    {
      k: "Чьи домены и данные",
      v: [
        "Ваши, и учиться будут на них",
        "Их. Уйдут вместе с ними",
        "Не применимо",
        "Ваши, на ваших аккаунтах с первого дня",
      ],
    },
    {
      k: "Что остаётся, если остановить",
      v: [
        "Ничего. Человек ушёл",
        "Ничего",
        "Ничего. Трафик кончается вместе с бюджетом",
        "База, стоп-лист, тексты, прогретые домены",
      ],
    },
    {
      k: "Цена ошибки",
      v: [
        "Год зарплаты и наём заново",
        "Потраченный квартал",
        "Потраченный бюджет",
        "Шесть недель по фиксированной цене",
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
                letterSpacing: "0.14em",
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
                letterSpacing: "0.14em",
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
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 10 }}>
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
