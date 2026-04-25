"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const en = {
  sectionLabel: "Process",
  h2: "How we work",
  subtitle:
    "You don't write code or configure platforms. I handle everything.",
  steps: [
    {
      num: "01 — 30 MIN",
      title: "Call",
      desc: "You tell me what's broken. I study your site, workflow, current process.",
    },
    {
      num: "02 — 1–2 DAYS",
      title: "Plan",
      desc: "Full plan: what gets automated, how it works, integrations. Agreed before building starts.",
    },
    {
      num: "03 — 3–14 DAYS",
      title: "Build",
      desc: "System on staging. You test, we adjust. No surprises at launch.",
    },
    {
      num: "04 — ONGOING",
      title: "Support",
      desc: "Production + training. Ongoing support available — hosting, domain, LLM costs, maintenance.",
    },
  ],
};

const ru = {
  sectionLabel: "Процесс",
  h2: "Как мы работаем",
  subtitle:
    "Вы не пишете код и не настраиваете платформы. Всё делаю я.",
  steps: [
    {
      num: "01 — 30 МИН",
      title: "Разговор",
      desc: "Вы рассказываете, что болит. Я изучаю сайт, процессы, скрипты.",
    },
    {
      num: "02 — 1–2 ДНЯ",
      title: "План",
      desc: "Полный план: что автоматизируется, как работает, какие интеграции. Согласуем до начала.",
    },
    {
      num: "03 — 3–14 ДНЕЙ",
      title: "Разработка",
      desc: "Система на тестовом стенде. Вы проверяете, корректируем.",
    },
    {
      num: "04 — ONGOING",
      title: "Поддержка",
      desc: "Продакшен + обучение. Поддержка по запросу — хостинг, домен, LLM-затраты, сопровождение.",
    },
  ],
};

export default function ServicesProcess() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section style={{ background: "var(--c-bg)", padding: "72px 0" }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--c-gold)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 10,
            }}
          >
            {t.sectionLabel}
            <span style={{ flex: 1, height: 1, background: "var(--c-border)", display: "block" }} />
          </motion.div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 4vw, 38px)",
              letterSpacing: "-0.02em",
              color: "var(--c-heading)",
              marginBottom: 6,
            }}
          >
            {t.h2}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontSize: 13,
              color: "var(--c-muted)",
              maxWidth: 440,
              lineHeight: 1.6,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3, boxShadow: "0 10px 36px rgba(0,0,0,0.3)", borderColor: "rgba(200,169,110,0.22)" }}
              style={{
                background: "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderRadius: 10,
                padding: 18,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontWeight: 700,
                  fontSize: 10,
                  color: "var(--c-gold)",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--c-text)",
                  marginBottom: 6,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontSize: 12,
                  color: "var(--c-body)",
                  lineHeight: 1.6,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
