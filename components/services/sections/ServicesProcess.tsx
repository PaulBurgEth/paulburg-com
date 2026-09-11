"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import StepRail from "@/components/ui/StepRail";

const en = {
  sectionLabel: "Process",
  h2: "How we work",
  subtitle:
    "You do not write code, configure platforms or chase leads. I handle everything.",
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
    <section className="pb-reveal" style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 07</span>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ marginBottom: 36 }}
        >
          {/* Driven by the parent variant, not its own whileInView: a nested
              observer can miss on a fast scroll and leave this at opacity 0
              while the parent is already visible. */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
            style={{
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 14,
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
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 4vw, 44px)",
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
              fontSize: 16,
              color: "var(--c-muted)",
              maxWidth: 440,
              lineHeight: 1.6,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* The same step rail /outbound draws three times — numbered circles on
            a hairline — instead of four unrelated cards. This was a sequence
            with a duration on every step and nothing connecting them: the order
            existed only in the numbers inside the text. The copy is unchanged. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <StepRail
            steps={t.steps.map((step) => ({
              // The number is the circle's job now, so the label drops it and
              // keeps the duration, which is the part a reader is scanning for.
              meta: step.num.split("—")[1]?.trim(),
              label: step.title,
              body: step.desc,
            }))}
          />
        </motion.div>
      </div>
    </section>
  );
}
