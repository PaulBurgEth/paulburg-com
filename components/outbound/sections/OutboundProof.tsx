"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, tagStyle, itemVariants } from "../shared";

const TOTAL = 3854;

type Step = { n: number; value: string; label: string; conv?: string };
type Bench = { metric: string; mine: string; market: string; best: string; good?: boolean };

const en = {
  eyebrow: "Proof",
  h2: "Two pilots. One measured, one running.",
  sub: "Numbers below are from a working journal, not an estimate. The second pilot has no numbers yet and is not presented as proof.",
  cmpTitle: "Same mechanic, two industries",
  cmpCols: ["", "Pilot A", "Pilot B"],
  cmpRows: [
    { k: "Industry", a: "Metals trading, B2B", b: "Sourcing & logistics, e-commerce" },
    { k: "Trigger", a: "Announced procurement need", b: "Supplier or volume change" },
    { k: "Main source", a: "Tender boards + company registries", b: "Shipping records + brand filings" },
  ],
  cmpShared: "What transfers between them: selection, contact finding, copy, correspondence, and deliverability discipline.",
  caseATitle: "Pilot A — measured",
  caseATags: ["Metals trading", "B2B", "Russia", "19 working days", "From zero — no list, no domain, no copy"],
  funnel: [
    { n: 3854, value: "3 854", label: "companies collected" },
    { n: 1320, value: "1 320", label: "passed selection", conv: "34%" },
    { n: 1373, value: "1 373", label: "received an email" },
    { n: 27, value: "27", label: "replied", conv: "2.0%" },
    { n: 18, value: "18", label: "taken through to a quote", conv: "67% of replies" },
  ] as Step[],
  funnelFootnote: "More emails than companies that passed selection: some contacts came from procurement boards where the need was already announced. 1 556 emails went to 1 373 companies, follow-ups included.",
  workTitle: "What that took",
  work: [
    "1 373 working addresses found and verified",
    "1 556 emails, each written for one company",
    "61 inbound replies handled",
    "20 quotes assembled and agreed",
    "3 requests for terms sent to suppliers",
    "612 companies rejected into a stop-list",
  ],
  repliedTitle: "Who replied",
  replied: ["Large metallurgical holding", "Lift equipment maker", "Electrical engineering plant", "Regional gas and heating utilities", "Leaf-spring maker", "Toolmaking plant"],
  benchTitle: "Against the market",
  benchCols: ["Metric", "This pilot", "Market", "Best practice"],
  bench: [
    { metric: "Bounces, recent batches", mine: "1.4-2.9%", market: "7-8%", best: "< 3%", good: true },
    { metric: "Bounces, whole project", mine: "4.2%", market: "7-8%", best: "< 3%" },
    { metric: "Unsubscribes", mine: "0.3%", market: "~2%", best: "—", good: true },
    { metric: "Reply rate", mine: "2.0%", market: "3.4%", best: "5.5%+" },
    { metric: "Reply taken to a quote", mine: "67%", market: "—", best: "—", good: true },
  ] as Bench[],
  benchNote: "Market figures are 2025 industry email-deliverability benchmarks, not my measurements.",
  caveatTitle: "What is not in these numbers",
  caveats: [
    "No closed deals. The project was a month old at the time of measurement and the sales cycle in metals runs two to four months — the money had not arrived yet.",
    "The reply rate is below market. The sender had neither a name nor a brand, and the segment is one of the most closed there is.",
    "Everything shown here is what can be measured at one month: deliverability, reply rate, and how far replies were taken.",
  ],
  transferTitle: "What carries over to you",
  transfer: [
    { head: "Transfers fully", items: ["Selection mechanics", "Contact finding", "Writing and correspondence", "Deliverability and pacing rules"] },
    { head: "Transfers with adjustment", items: ["Reply-to-quote conversion — your cycle is a different length"] },
    { head: "Does not transfer", items: ["Reply rate. It depends on the market and the trigger. Measuring it is exactly what the pilot is for"] },
  ],
  caseBTitle: "Pilot B — running",
  caseBBadge: "Running",
  caseB: [
    "Segment: sourcing and logistics for e-commerce sellers, worldwide.",
    "Triggers: supplier changes, moves to a new manufacturing country, recalls, and first-time importers.",
    "Sources: shipping records, marketplace seller disclosure, trademark filings.",
  ],
  caseBNote: "No numbers yet. This is not presented as proof — it is here so you can see the same mechanic pointed at a different industry.",
};

const ru = {
  eyebrow: "Доказательства",
  h2: "Два пилота. Один измерен, второй идёт.",
  sub: "Цифры ниже — из рабочего журнала, а не оценка. У второго пилота цифр пока нет, и как доказательство он не подаётся.",
  cmpTitle: "Одна механика, две отрасли",
  cmpCols: ["", "Пилот A", "Пилот B"],
  cmpRows: [
    { k: "Отрасль", a: "Металлотрейдинг, B2B", b: "Сорсинг и логистика, e-commerce" },
    { k: "Триггер", a: "Объявленная потребность в закупке", b: "Смена поставщика или объёма" },
    { k: "Основной источник", a: "Тендерные площадки и реестры компаний", b: "Грузовые записи и реестры знаков" },
  ],
  cmpShared: "Что переносится между ними: отбор, поиск контактов, тексты, переписка и дисциплина доставляемости.",
  caseATitle: "Пилот A — измерен",
  caseATags: ["Металлопрокат", "B2B", "Россия", "19 рабочих дней", "С нуля — ни базы, ни домена, ни текстов"],
  funnel: [
    { n: 3854, value: "3 854", label: "компаний собрано" },
    { n: 1320, value: "1 320", label: "прошли отбор", conv: "34%" },
    { n: 1373, value: "1 373", label: "получили письмо" },
    { n: 27, value: "27", label: "ответили", conv: "2,0%" },
    { n: 18, value: "18", label: "доведены до расчёта", conv: "67% от ответов" },
  ] as Step[],
  funnelFootnote: "Писем ушло больше, чем компаний прошло отбор: часть контактов пришла с закупочных площадок, где потребность объявлена заранее. 1 556 писем на 1 373 компании, включая повторные касания.",
  workTitle: "Чего это стоило",
  work: [
    "1 373 рабочих адреса найдено и проверено",
    "1 556 писем, каждое под одну компанию",
    "61 входящий ответ разобран",
    "20 расчётов собрано и согласовано",
    "3 запроса условий отправлено поставщикам",
    "612 компаний отсеяно в стоп-лист",
  ],
  repliedTitle: "Кто отвечал",
  replied: ["Крупный металлургический холдинг", "Производитель лифтового оборудования", "Завод электротехники", "Региональные газовые и тепловые сети", "Производитель рессор", "Инструментальный завод"],
  benchTitle: "Рядом с рынком",
  benchCols: ["Показатель", "Этот пилот", "Рынок", "Бенчмарк"],
  bench: [
    { metric: "Отказы доставки, последние партии", mine: "1,4-2,9%", market: "7-8%", best: "< 3%", good: true },
    { metric: "Отказы доставки, весь проект", mine: "4,2%", market: "7-8%", best: "< 3%" },
    { metric: "Отписки", mine: "0,3%", market: "~2%", best: "—", good: true },
    { metric: "Отклик", mine: "2,0%", market: "3,4%", best: "5,5%+" },
    { metric: "Ответ доведён до расчёта", mine: "67%", market: "—", best: "—", good: true },
  ] as Bench[],
  benchNote: "Рыночные цифры — отраслевые бенчмарки доставляемости за 2025 год, а не мои замеры.",
  caveatTitle: "Чего в этих цифрах нет",
  caveats: [
    "Закрытых сделок. На момент замера проекту был месяц, а цикл в металле — два-четыре месяца: деньги ещё не дошли.",
    "Отклик ниже среднего по рынку. У отправителя не было ни имени, ни бренда, а сегмент один из самых закрытых.",
    "Показано только то, что можно померить через месяц: доставляемость, отклик и доведение ответов.",
  ],
  transferTitle: "Что из этого переносится на вас",
  transfer: [
    { head: "Переносится целиком", items: ["Механика отбора", "Поиск контактов", "Написание и ведение переписки", "Требования к доставляемости и темпу"] },
    { head: "Переносится с поправкой", items: ["Доведение ответа до расчёта — у вас другой по длине цикл"] },
    { head: "Не переносится", items: ["Отклик. Он зависит от рынка и повода. Ради его замера пилот и нужен"] },
  ],
  caseBTitle: "Пилот B — идёт",
  caseBBadge: "Идёт",
  caseB: [
    "Сегмент: сорсинг и логистика для продавцов e-commerce, по всему миру.",
    "Триггеры: смена поставщика, перенос производства в другую страну, отзывы партий, первые импортёры.",
    "Источники: грузовые записи, раскрытие продавцов площадок, реестры товарных знаков.",
  ],
  caseBNote: "Цифр пока нет. Как доказательство это не подаётся — кейс здесь, чтобы видеть ту же механику, наведённую на другую отрасль.",
};

export default function OutboundProof() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="06" id="proof" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Same mechanic, two industries */}
      <div
        role="table"
        style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden", marginBottom: 36 }}
      >
        <div
          role="row"
          className="hidden sm:grid sm:grid-cols-[0.8fr_1fr_1fr]"
          style={{ background: "var(--c-card2)", borderBottom: "1px solid var(--c-border)" }}
        >
          {t.cmpCols.map((c, i) => (
            <div
              key={i}
              role="columnheader"
              style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                color: i === 0 ? "var(--c-muted)" : "var(--c-gold)", padding: "10px 16px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        {t.cmpRows.map((row, i) => (
          <div
            key={row.k}
            role="row"
            className="grid grid-cols-1 sm:grid-cols-[0.8fr_1fr_1fr]"
            style={{
              background: i % 2 ? "var(--c-card2)" : "var(--c-card)",
              borderTop: i ? "1px solid var(--c-border)" : "none",
              padding: "12px 0",
            }}
          >
            <div role="cell" style={{ padding: "2px 16px", fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-muted)" }}>
              {row.k}
            </div>
            <div role="cell" style={{ padding: "2px 16px", fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.6 }}>
              {row.a}
            </div>
            <div role="cell" style={{ padding: "2px 16px", fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.6 }}>
              {row.b}
            </div>
          </div>
        ))}
        <p
          style={{
            fontFamily: SANS, fontSize: 12.5, color: "var(--c-text2)", lineHeight: 1.65,
            padding: "12px 16px", borderTop: "1px solid var(--c-border)", background: "var(--c-card)",
          }}
        >
          {t.cmpShared}
        </p>
      </div>

      {/* Case A */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 20, color: "var(--c-heading)", marginBottom: 12 }}>
        {t.caseATitle}
      </h3>
      <div className="flex flex-wrap gap-2" style={{ marginBottom: 24 }}>
        {t.caseATags.map((tag) => (
          <span key={tag} style={tagStyle}>{tag}</span>
        ))}
      </div>

      {/* Funnel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {t.funnel.map((s, i) => {
          const pct = (s.n / TOTAL) * 100;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4"
            >
              {/* The bar lives inside a fixed track, so a 100% bar cannot push
                  the labels past the viewport edge. */}
              <div className="w-full sm:w-[38%] sm:shrink-0">
                <div
                  style={{
                    // Linear scale — the last two bars really are slivers, and
                    // that is the point of the picture. 3px keeps them visible.
                    width: `max(${pct}%, 3px)`,
                    height: 30,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, rgba(200,169,110,0.35), rgba(200,169,110,0.08))",
                    border: "1px solid rgba(200,169,110,0.2)",
                  }}
                />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 17, color: "var(--c-gold)" }}>
                  {s.value}
                </span>
                <span style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)" }}>{s.label}</span>
                {s.conv && (
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "var(--c-muted)" }}>
                    · {s.conv}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <Note>{t.funnelFootnote}</Note>

      {/* Work done + who replied */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 32 }}>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 20 }}>
          <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)", marginBottom: 14 }}>
            {t.workTitle}
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {t.work.map((w) => (
              <li key={w} className="flex gap-2.5 items-start">
                <Check size={13} color="var(--c-sage)" style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.55 }}>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 20 }}>
          <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)", marginBottom: 14 }}>
            {t.repliedTitle}
          </h4>
          <div className="flex flex-wrap gap-2">
            {t.replied.map((r) => (
              <span key={r} style={tagStyle}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmarks */}
      <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.benchTitle}
      </h4>
      <div role="table" style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}>
        <div
          role="row"
          className="hidden sm:grid sm:grid-cols-[1.6fr_1fr_1fr_1fr]"
          style={{ background: "var(--c-card2)", borderBottom: "1px solid var(--c-border)" }}
        >
          {t.benchCols.map((c) => (
            <div
              key={c}
              role="columnheader"
              style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--c-muted)", padding: "10px 14px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        {t.bench.map((row, i) => (
          <div
            key={row.metric}
            role="row"
            className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr_1fr]"
            style={{
              background: i % 2 ? "var(--c-card2)" : "var(--c-card)",
              borderTop: i ? "1px solid var(--c-border)" : "none",
              padding: "12px 0",
            }}
          >
            <div
              role="cell"
              style={{ padding: "2px 14px", fontFamily: SANS, fontSize: 13, fontWeight: 600, color: "var(--c-heading)", lineHeight: 1.5 }}
            >
              {row.metric}
            </div>
            <div role="cell" className="flex gap-4 sm:contents" style={{ padding: "6px 14px 0" }}>
              {[
                { cap: t.benchCols[1], v: row.mine, color: row.good ? "var(--c-sage)" : "var(--c-text2)", weight: 700 },
                { cap: t.benchCols[2], v: row.market, color: "var(--c-muted)", weight: 400 },
                { cap: t.benchCols[3], v: row.best, color: "var(--c-muted)", weight: 400 },
              ].map((cell) => (
                <div key={cell.cap} className="sm:px-[14px] sm:py-[2px]">
                  <span
                    // block/sm:hidden must be classes, not an inline display:
                    // an inline style would beat the sm: breakpoint rule.
                    className="block sm:hidden"
                    style={{
                      fontFamily: MONO, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "var(--c-muted)", marginBottom: 1,
                    }}
                  >
                    {cell.cap}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: cell.weight, color: cell.color }}>
                    {cell.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Note>{t.benchNote}</Note>

      {/* Caveat */}
      <div
        style={{
          background: "var(--c-card2)",
          border: "1px solid var(--c-border2)",
          borderRadius: 10,
          padding: 22,
          marginTop: 32,
        }}
      >
        <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
          <AlertCircle size={17} color="var(--c-text2)" style={{ flexShrink: 0 }} />
          <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 17, color: "var(--c-heading)" }}>
            {t.caveatTitle}
          </h4>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {t.caveats.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--c-muted)", flexShrink: 0, paddingTop: 3, letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.65 }}>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Transfer */}
      <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.transferTitle}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.transfer.map((col, i) => (
          <div
            key={col.head}
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderTop: `2px solid ${i === 0 ? "var(--c-sage)" : i === 1 ? "var(--c-gold)" : "var(--c-border2)"}`,
              borderRadius: 10,
              padding: 18,
            }}
          >
            <span
              style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--c-muted)", display: "block", marginBottom: 12,
              }}
            >
              {col.head}
            </span>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {col.items.map((it) => (
                <li key={it} style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.6 }}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Case B */}
      <div
        style={{
          background: "var(--c-card)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-border2)",
          borderRadius: 10,
          padding: 20,
          marginTop: 32,
        }}
      >
        <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
          <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, color: "var(--c-text)" }}>{t.caseBTitle}</h4>
          <span
            style={{
              fontFamily: MONO, fontSize: 8, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "var(--c-muted)", border: "1px solid var(--c-border2)", borderRadius: 3, padding: "3px 7px",
            }}
          >
            {t.caseBBadge}
          </span>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {t.caseB.map((b) => (
            <li key={b} style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-text2)", lineHeight: 1.6 }}>{b}</li>
          ))}
        </ul>
        <p style={{ fontFamily: MONO, fontSize: 11, lineHeight: 1.7, color: "var(--c-muted)", marginTop: 14 }}>
          {t.caseBNote}
        </p>
      </div>
    </SectionShell>
  );
}
