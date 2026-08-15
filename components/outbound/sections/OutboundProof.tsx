"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, MidCTA, SERIF, SANS, MONO, T, tagStyle, itemVariants } from "../shared";

const TOTAL = 3854;

type Step = { n: number; value: string; label: string; conv?: string };
type Bench = { metric: string; mine: string; market: string };

const en = {
  eyebrow: "Result",
  h2: "From a cold list to agreed quotes",
  sub: "3 854 companies in, eighteen quotes agreed with buyers out. Every step in between is below.",
  tags: ["Metals trading", "B2B", "Cold start"],
  funnel: [
    { n: 3854, value: "3 854", label: "companies sourced" },
    { n: 1320, value: "1 320", label: "passed selection", conv: "34%" },
    { n: 1373, value: "1 373", label: "received an email" },
    { n: 27, value: "27", label: "replied" },
    { n: 18, value: "18", label: "taken to an agreed quote", conv: "67% of replies" },
  ] as Step[],
  workTitle: "What that took",
  work: [
    "1 373 working addresses found and verified",
    "1 556 emails, each written for one company",
    "61 inbound replies handled",
    "20 quotes assembled and agreed",
    "612 companies screened out into a stop-list",
  ],
  repliedTitle: "Who replied",
  replied: ["Large metallurgical holding", "Lift equipment maker", "Electrical engineering plant", "Regional gas and heating utilities", "Leaf-spring maker", "Toolmaking plant"],
  benchTitle: "What it did to the sending domain",
  benchCols: ["", "This channel", "Market"],
  bench: [
    { metric: "Delivery bounces", mine: "1,4–2,9%", market: "7–8%" },
    { metric: "Unsubscribes", mine: "0,3%", market: "~2%" },
    { metric: "Spam complaints", mine: "0", market: "—" },
    { metric: "Replies taken to a quote", mine: "67%", market: "—" },
  ] as Bench[],
  benchNote: "Market figures are 2025 industry email-deliverability benchmarks.",
  ctaNote: "Your segment gets its own list and its own copy in the first week.",
  cta: "Tell me about your market →",
};

const ru = {
  eyebrow: "Результат",
  h2: "От холодного списка до согласованных расчётов",
  sub: "3 854 компании на входе, восемнадцать расчётов, согласованных с покупателями, на выходе. Ниже — каждый шаг между ними.",
  tags: ["Металлопрокат", "B2B", "Холодный старт"],
  funnel: [
    { n: 3854, value: "3 854", label: "компании собрано" },
    { n: 1320, value: "1 320", label: "прошли отбор", conv: "34%" },
    { n: 1373, value: "1 373", label: "получили письмо" },
    { n: 27, value: "27", label: "ответили" },
    { n: 18, value: "18", label: "доведены до согласованного расчёта", conv: "67% от ответов" },
  ] as Step[],
  workTitle: "Чего это стоило",
  work: [
    "1 373 рабочих адреса найдено и проверено",
    "1 556 писем, каждое под одну компанию",
    "61 входящий ответ разобран",
    "20 расчётов собрано и согласовано",
    "612 компаний отсеяно в стоп-лист",
  ],
  repliedTitle: "Кто отвечал",
  replied: ["Крупный металлургический холдинг", "Производитель лифтового оборудования", "Завод электротехники", "Региональные газовые и тепловые сети", "Производитель рессор", "Инструментальный завод"],
  benchTitle: "Что это сделало с отправляющим доменом",
  benchCols: ["", "Этот канал", "Рынок"],
  bench: [
    { metric: "Отказы доставки", mine: "1,4–2,9%", market: "7–8%" },
    { metric: "Отписки", mine: "0,3%", market: "~2%" },
    { metric: "Жалобы на спам", mine: "0", market: "—" },
    { metric: "Ответов доведено до расчёта", mine: "67%", market: "—" },
  ] as Bench[],
  benchNote: "Рыночные цифры — отраслевые бенчмарки доставляемости за 2025 год.",
  ctaNote: "Для вашего сегмента список и тексты составляются в первую неделю.",
  cta: "Расскажите о вашем рынке →",
};

export default function OutboundProof() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="05" id="proof" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="flex flex-wrap gap-2" style={{ marginBottom: 28 }}>
        {t.tags.map((tag) => (
          <span key={tag} style={tagStyle}>{tag}</span>
        ))}
      </div>

      {/* Funnel — linear scale, so the last two steps really are slivers. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {t.funnel.map((s, i) => {
          const pct = (s.n / TOTAL) * 100;
          return (
            <motion.div key={i} variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
              <div className="w-full sm:w-[38%] sm:shrink-0">
                <div
                  style={{
                    width: `max(${pct}%, 3px)`,
                    height: 32,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, rgba(200,169,110,0.4), rgba(200,169,110,0.08))",
                    border: "1px solid rgba(200,169,110,0.22)",
                  }}
                />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 20, color: "var(--c-gold)" }}>{s.value}</span>
                <span style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)" }}>{s.label}</span>
                {s.conv && (
                  <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-text2)" }}>
                    · {s.conv}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 32 }}>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 14 }}>
            {t.workTitle}
          </h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.work.map((w) => (
              <li key={w} className="flex gap-2.5 items-start">
                <Check size={15} color="var(--c-sage)" style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.55 }}>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 14 }}>
            {t.repliedTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {t.replied.map((r) => (
              <span key={r} style={tagStyle}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Domain health — every row here is a strength, and reply rate is absent
          because it belongs to the funnel above, not to deliverability. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.benchTitle}
      </h3>
      <div role="table" style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}>
        <div role="row" className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr]" style={{ background: "var(--c-card2)", borderBottom: "1px solid var(--c-border)" }}>
          {t.benchCols.map((c, i) => (
            <div key={i} role="columnheader" style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-text2)", padding: "11px 16px" }}>
              {c}
            </div>
          ))}
        </div>
        {t.bench.map((row, i) => (
          <div key={row.metric} role="row" className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr]" style={{ background: i % 2 ? "var(--c-card2)" : "var(--c-card)", borderTop: i ? "1px solid var(--c-border)" : "none", padding: "13px 0" }}>
            <div role="cell" style={{ padding: "2px 16px", fontFamily: SANS, fontSize: T.body, fontWeight: 600, color: "var(--c-heading)" }}>
              {row.metric}
            </div>
            <div role="cell" className="flex gap-6 sm:contents" style={{ padding: "6px 16px 0" }}>
              {[
                { cap: t.benchCols[1], v: row.mine, color: "var(--c-sage)", weight: 700 },
                { cap: t.benchCols[2], v: row.market, color: "var(--c-text2)", weight: 400 },
              ].map((cell) => (
                <div key={cell.cap} className="sm:px-4 sm:py-[2px]">
                  <span className="block sm:hidden" style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-muted)", marginBottom: 1 }}>
                    {cell.cap}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: T.body, fontWeight: cell.weight, color: cell.color }}>{cell.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Note>{t.benchNote}</Note>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
