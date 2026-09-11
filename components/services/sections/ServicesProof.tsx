"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import CountUp from "@/components/CountUp";

const en = {
  metrics: [
    // One wording for one number. ServicesOutbound described the same six
    // weeks as "quotes agreed with buyers"; two different promises behind the
    // same figure on the same page.
    { value: "6 weeks", label: "from a cold list to quotes agreed with buyers" },
    { value: "3–14 days", label: "from call to production" },
    { value: "EN · VI · RU · DE · HE", label: "languages the systems already run in" },
  ],
};

const ru = {
  metrics: [
    { value: "6 недель", label: "от холодного списка до согласованных расчётов" },
    { value: "3–14 дней", label: "от звонка до продакшена" },
    { value: "EN · VI · RU · DE · HE", label: "языки, на которых системы уже работают" },
  ],
};

export default function ServicesProof() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <motion.section
      className="pb-reveal"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
        borderBottom: "1px solid var(--c-border)",
        position: "relative",
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 01</span>
      <div className="container-custom">
        <div className="flex flex-wrap">
          {t.metrics.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 flex-1 min-w-[120px]"
              style={{
                borderRight:
                  i < t.metrics.length - 1 ? "1px solid var(--c-border)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: item.value.length > 12 ? 16 : 21,
                  color: "var(--c-gold)",
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                {i === 0 ? <CountUp target={6} suffix={language === "ru" ? " недель" : " weeks"} /> : item.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "var(--c-muted)",
                  marginTop: 4,
                  textAlign: "center",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
