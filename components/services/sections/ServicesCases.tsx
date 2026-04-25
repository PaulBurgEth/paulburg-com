"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const en = {
  sectionLabel: "Track record",
  h2: "Real systems in production",
  subtitle: "Not demos, not prototypes. These are live systems serving real businesses right now.",
  cases: [
    {
      flagship: true,
      badges: ["Flagship", "Website + Bot + CRM"],
      title: "HelpRent Phangan — Property Rental",
      desc: "Search site in 4 languages, AI intake agent (full brief in one conversation), CRM with dual roles (account manager + sales), property database, full client history, real-time Telegram notifications.",
      result:
        "→ Visitor to structured lead in under 2 minutes. Zero manual data entry.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "DeepSeek", "Telegram"],
      metricValue: "<2m",
      metricLabel: "visitor to lead",
    },
    {
      flagship: false,
      badges: ["Lead Bot + CRM + Site"],
      title: "Guide Phangan — Visa Service",
      desc: "AI bot qualifies applicants, collects documents, classifies by visa type. 4-language site, Telegram notifications, mini-CRM.",
      result: "→ 200+ visas processed. Bot runs 24/7 in EN, RU, DE, HE.",
      stack: ["Python", "Django", "PostgreSQL", "Telegram"],
      metricValue: "24/7",
      metricLabel: "in 4 languages",
    },
    {
      flagship: false,
      badges: ["Lead Bot + Site"],
      title: "EU Digital Nomad Visa — Consulting",
      desc: "AI bot matches visitors to best-fit country from 5 EU programs. First consultant message is a recommendation, not discovery.",
      result: '→ First message: recommendation. Not: "Tell me about yourself."',
      stack: ["Python", "Next.js", "DeepSeek", "Telegram"],
      metricValue: "Cold → Warm → Hot",
      metricLabel: "auto lead segmentation",
    },
  ],
};

const ru = {
  sectionLabel: "Портфолио",
  h2: "Системы в продакшене",
  subtitle: "Не демо и не прототипы. Это живые системы, которые прямо сейчас работают у клиентов.",
  cases: [
    {
      flagship: true,
      badges: ["Flagship", "Сайт + Бот + CRM"],
      title: "HelpRent Phangan — Аренда недвижимости",
      desc: "Сайт с поиском на 4 языках, AI intake agent (полный бриф за один разговор), CRM с двумя ролями (account manager + sales), база объектов, история клиента, уведомления в Telegram.",
      result:
        "→ От захода на сайт до структурированной заявки — меньше 2 минут. Без ручного ввода.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "DeepSeek", "Telegram"],
      metricValue: "<2m",
      metricLabel: "посетитель → лид",
    },
    {
      flagship: false,
      badges: ["Lead Bot + CRM + Сайт"],
      title: "Guide Phangan — Визовый сервис",
      desc: "AI-бот квалифицирует заявителей, собирает документы, классифицирует по типу визы. Мультиязычный сайт, уведомления в Telegram, мини-CRM.",
      result: "→ 200+ виз обработано. Бот работает 24/7 на EN, RU, DE, HE.",
      stack: ["Python", "Django", "PostgreSQL", "Telegram"],
      metricValue: "24/7",
      metricLabel: "на 4 языках",
    },
    {
      flagship: false,
      badges: ["Lead Bot + Сайт"],
      title: "EU Digital Nomad Visa — Консалтинг",
      desc: "AI-бот подбирает подходящую страну из 5 EU-программ. Первое сообщение консультанта — рекомендация, а не расспросы.",
      result:
        '→ Первое сообщение: рекомендация. Не: "Расскажите о себе."',
      stack: ["Python", "Next.js", "DeepSeek", "Telegram"],
      metricValue: "Холодный → Тёплый → Горячий",
      metricLabel: "авто-сегментация лидов",
    },
  ],
};

export default function ServicesCases() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section id="cases" style={{ background: "var(--c-bg2)", padding: "72px 0" }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div
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
          </div>
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
              lineHeight: 1.6,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Cases */}
        <div className="flex flex-col gap-4">
          {t.cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: c.flagship
                  ? "linear-gradient(135deg, rgba(200,169,110,0.05) 0%, rgba(200,169,110,0.01) 100%)"
                  : "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderLeft: c.flagship
                  ? "2px solid var(--c-gold)"
                  : "1px solid var(--c-border)",
                borderRadius: c.flagship ? "0 10px 10px 0" : 10,
                padding: 22,
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 16,
                alignItems: "start",
              }}
            >
              {/* Content */}
              <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {c.badges.map((b, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: "var(--font-inconsolata), monospace",
                        fontSize: 10,
                        fontWeight: 600,
                        background:
                          j === 0 && c.flagship
                            ? "rgba(200,169,110,0.1)"
                            : "rgba(255,255,255,0.03)",
                        color: j === 0 && c.flagship ? "var(--c-gold)" : "var(--c-muted)",
                        border:
                          j === 0 && c.flagship
                            ? "1px solid rgba(200,169,110,0.25)"
                            : "1px solid var(--c-border)",
                        borderRadius: 4,
                        padding: "2px 7px",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--c-text)",
                    marginBottom: 6,
                  }}
                >
                  {c.title}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontSize: 13,
                    color: "var(--c-body)",
                    lineHeight: 1.6,
                    marginBottom: 8,
                  }}
                >
                  {c.desc}
                </p>

                {/* Result */}
                <p
                  style={{
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontSize: 13,
                    color: "var(--c-sage)",
                    marginBottom: 10,
                  }}
                >
                  {c.result}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map((s, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: "var(--font-inconsolata), monospace",
                        fontSize: 10,
                        background: "rgba(255,255,255,0.03)",
                        color: "var(--c-muted)",
                        border: "1px solid var(--c-border)",
                        borderRadius: 4,
                        padding: "2px 6px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric */}
              <div
                className="flex flex-col items-center justify-start pt-1"
                style={{ minWidth: 64, maxWidth: 180 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 700,
                    fontSize: c.metricValue.length > 8 ? 14 : 26,
                    color: "var(--c-gold)",
                    lineHeight: 1.15,
                    textAlign: "center",
                  }}
                >
                  {c.metricValue}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontSize: 10,
                    color: "var(--c-muted)",
                    textAlign: "center",
                    marginTop: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {c.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
