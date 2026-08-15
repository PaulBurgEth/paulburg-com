"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import CountUp from "@/components/CountUp";

const en = {
  metrics: [
    { value: "10+", label: "systems built & shipped" },
    { value: "24/7", label: "autonomous operation" },
    { value: "3–14 days", label: "from call to launch" },
  ],
};

const ru = {
  metrics: [
    { value: "10+", label: "систем в продакшене" },
    { value: "24/7", label: "автономная работа" },
    { value: "3–14 дней", label: "от звонка до запуска" },
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
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 11, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 01</span>
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
                  fontSize: 22,
                  color: "var(--c-gold)",
                  lineHeight: 1.2,
                }}
              >
                {i === 0 ? <CountUp target={10} suffix="+" /> : item.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontWeight: 400,
                  fontSize: 11,
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
