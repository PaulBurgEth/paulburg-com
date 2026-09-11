"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";

const en = {
  sectionLabel: "Pricing",
  h2: "How the price is put together",
  subtitle: "Three scopes below. The figure is assembled per task after a short call — what it covers, what it touches, and what it has to integrate with. The outbound channel is priced separately: one fixed price for a six-week pilot, paid in thirds, with a decision point before each.",
  plans: [
    {
      name: "Starter",
      amount: "A bot",
      timeline: "3 days delivery",
      features: [
        "AI lead bot on your site",
        "Hot/warm/cold qualification",
        "Telegram notifications",
        "Auto language detection",
        "1 revision",
      ],
      cta: "Get started",
      sub: "priced per task · support quoted with it",
      popular: false,
    },
    {
      name: "Business",
      amount: "Bot + CRM",
      timeline: "5 days delivery",
      features: [
        "Everything in Starter",
        "Installed on your site",
        "CRM + BI dashboards + lead database",
        "System integrations",
        "2 revisions",
      ],
      cta: "Get started",
      sub: "priced per task · support quoted with it",
      popular: true,
    },
    {
      name: "Full System",
      amount: "All of it",
      // 3–14, matching the four other places on this page and the home page.
      // Full System is the Turnkey bundle, and one product cannot carry two
      // delivery promises.
      timeline: "3–14 days delivery",
      features: [
        "Everything in Business",
        "Website from scratch",
        "RAG — bot trained on your docs",
        "Source code delivered",
        "3 revisions",
      ],
      cta: "Discuss scope",
      sub: "priced per task · support quoted with it",
      popular: false,
    },
  ],
};

const ru = {
  sectionLabel: "Цены",
  h2: "Как считается цена",
  subtitle: "Ниже — три объёма. Сумма собирается под задачу после короткого разговора: что входит, чего касается и с чем должно связаться. Холодный канал считается отдельно: одна фиксированная цена за пилот на шесть недель, оплата третями, перед каждой — точка решения.",
  plans: [
    {
      name: "Стартер",
      amount: "Бот",
      timeline: "Срок: 3 дня",
      features: [
        "AI-бот на вашем сайте",
        "Квалификация горячий/тёплый/холодный",
        "Уведомления в Telegram",
        "Автоопределение языка",
        "1 правка",
      ],
      cta: "Начать",
      sub: "цена под задачу · поддержка в смете",
      popular: false,
    },
    {
      name: "Бизнес",
      amount: "Бот и CRM",
      timeline: "Срок: 5 дней",
      features: [
        "Всё из Стартера",
        "Установка на ваш сайт",
        "CRM + BI-дашборды + база лидов",
        "Интеграции с системами",
        "2 правки",
      ],
      cta: "Начать",
      sub: "цена под задачу · поддержка в смете",
      popular: true,
    },
    {
      name: "Полная система",
      amount: "Всё сразу",
      timeline: "Срок: 3–14 дней",
      features: [
        "Всё из Бизнеса",
        "Сайт с нуля",
        "RAG — бот обучен на ваших документах",
        "Исходный код передаётся",
        "3 правки",
      ],
      cta: "Обсудить объём",
      sub: "цена под задачу · поддержка в смете",
      popular: false,
    },
  ],
};

export default function ServicesPricing() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section id="pricing" className="pb-reveal" style={{ background: "var(--c-bg2)", padding: "72px 0", position: "relative" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 08</span>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div
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
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
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
              fontSize: 16,
              color: "var(--c-muted)",
              lineHeight: 1.6,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col"
              style={{
                background: plan.popular
                  ? "linear-gradient(135deg, rgba(200,169,110,0.06) 0%, rgba(200,169,110,0.01) 100%)"
                  : "var(--c-card)",
                border: `1px solid ${plan.popular ? "rgba(200,169,110,0.22)" : "var(--c-border)"}`,
                borderRadius: 10,
                padding: 22,
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <span
                  className="absolute top-3 right-3"
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontWeight: 700,
                    fontSize: 14,
                    background: "rgba(200,169,110,0.15)",
                    color: "var(--c-gold)",
                    border: "1px solid rgba(200,169,110,0.3)",
                    padding: "2px 7px",
                    borderRadius: 4,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {language === "ru" ? "ПОПУЛЯРНЫЙ" : "MOST POPULAR"}
                </span>
              )}

              {/* Plan name */}
              <span
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--c-muted)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </span>

              {/* Amount */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 4vw, 32px)",
                  letterSpacing: "-0.02em",
                  color: "var(--c-text)",
                  marginBottom: 4,
                }}
              >
                {plan.amount}
              </div>

              {/* Timeline */}
              <span
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 14,
                  color: "var(--c-muted)",
                  marginBottom: 16,
                  display: "block",
                }}
              >
                {plan.timeline}
              </span>

              {/* Features */}
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check
                      style={{
                        width: 13,
                        height: 13,
                        color: "var(--c-sage)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-instrument-sans), sans-serif",
                        fontSize: 16,
                        color: "var(--c-body)",
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={open}
                style={
                  plan.popular
                    ? {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--c-gold)",
                        color: "var(--c-on-gold)",
                        fontFamily: "var(--font-instrument-sans), sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        letterSpacing: "0.04em",
                        padding: "11px 20px",
                        borderRadius: 5,
                        border: "none",
                        cursor: "pointer",
                      }
                    : {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        border: "1px solid var(--c-border2)",
                        color: "var(--c-text)",
                        fontFamily: "var(--font-instrument-sans), sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        letterSpacing: "0.04em",
                        padding: "11px 20px",
                        borderRadius: 5,
                        cursor: "pointer",
                      }
                }
              >
                {plan.cta}
              </button>

              {/* Sub */}
              <p
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 14,
                  color: "var(--c-muted)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {plan.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
