"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import CountUp from "@/components/CountUp";
import { SERIF, SANS, MONO, T, sectionVariants } from "../shared";

type Metric = { count?: number; value: string; suffix?: string; label: string };

const en: { metrics: Metric[]; caption: string } = {
  metrics: [
    { count: 3854, value: "3 854", label: "companies sourced" },
    { count: 1556, value: "1 556", label: "emails, each written for one company" },
    { value: "67%", label: "of replies taken through to a quote" },
    { value: "0.3%", label: "unsubscribes, against ~2% market" },
  ],
  caption: "From zero to the first agreed quotes — 19 working days. No list, no domain and no copy at the start.",
};

const ru: { metrics: Metric[]; caption: string } = {
  metrics: [
    { count: 3854, value: "3 854", label: "компании собрано" },
    { count: 1556, value: "1 556", label: "писем, каждое под одну компанию" },
    { value: "67%", label: "ответов доведено до расчёта" },
    { value: "0,3%", label: "отписок против ~2% по рынку" },
  ],
  caption: "От нуля до первых согласованных расчётов — 19 рабочих дней. На старте не было ни базы, ни домена, ни текстов.",
};

// Space-separated thousands, matching the static strings above. Written by
// hand rather than toLocaleString so server and client always agree.
const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function OutboundNumbers() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      style={{
        background: "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
        borderBottom: "1px solid var(--c-border)",
        position: "relative",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute", top: 24, right: 28, fontFamily: MONO,
          fontSize: T.caption, letterSpacing: "0.18em", color: "var(--c-muted)",
        }}
      >
        § 01
      </span>
      <div className="container-custom">
        <div className="flex flex-wrap">
          {t.metrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 flex-1 min-w-[140px]"
              style={{ borderRight: i < t.metrics.length - 1 ? "1px solid var(--c-border)" : "none" }}
            >
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: "var(--c-gold)", lineHeight: 1.2 }}>
                {m.count ? <CountUp target={m.count} format={group} /> : m.value}
              </span>
              <span
                style={{
                  fontFamily: SANS, fontWeight: 400, fontSize: T.bodySm,
                  color: "var(--c-text2)", marginTop: 8, textAlign: "center",
                  maxWidth: 210, lineHeight: 1.5,
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em",
            color: "var(--c-text2)", textAlign: "center", paddingBottom: 22,
          }}
        >
          {t.caption}
        </p>
      </div>
    </motion.section>
  );
}
