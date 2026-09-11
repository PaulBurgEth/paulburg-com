"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const en = {
  sectionLabel: "Track record",
  h2: "Real systems in production",
  subtitle: "Not demos, not prototypes. Every one of these was taken all the way to production.",
  cases: [
    {
      flagship: true,
      badges: ["Flagship", "AI Matching Engine"],
      title: "HelpRent Phangan — Property Rental",
      desc: "Vertical AI matching engine for property rental — search site in 4 languages, AI intake agent (full brief in one conversation), smart ranking that matches tenant requirements to listings, CRM with dual roles (account manager + sales), manager BI dashboard, property database, full client history, real-time Telegram notifications.",
      result:
        "→ The visitor reaches the manager already qualified. Zero manual data entry.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "DeepSeek", "Telegram"],
      metricValue: "EN · RU · DE · HE",
      metricLabel: "search interface",
    },
    {
      flagship: false,
      badges: ["Search + Agent Layer"],
      title: "HelpRent Da Nang — Rental Market",
      desc: "A city's scattered rental listings pulled into one normalised search layer in EN, VI and RU. Mai, an AI assistant, searches by plain sentence or by a screenshot of a map with an area circled, read by a vision model. Median rates by size and district, recalculated overnight. Buildings mapped with direct manager contacts.",
      result: "→ One search layer over the whole city, on three languages.",
      stack: ["Next.js", "Python", "PostgreSQL", "Vision models"],
      metricValue: "EN · VI · RU",
      metricLabel: "search and listings",
    },
    {
      flagship: false,
      badges: ["Workflow Automation"],
      title: "Candidate Screening — Handed Over",
      desc: "A bot takes applications, asks the follow-up questions, collects files including PDFs and reads what is inside them. Scoring on two sets of criteria per role: the ones constant for the company, and the ones specific to the position. Integral score, ranking, a board with three lanes.",
      result: "→ Built end to end and handed to the team, which runs it themselves.",
      stack: ["Python", "PostgreSQL", "Telegram", "LLM scoring"],
      metricValue: "End to end",
      metricLabel: "built, then handed over",
    },
  ],
};

const ru = {
  sectionLabel: "Портфолио",
  h2: "Системы в продакшене",
  subtitle: "Не демо и не прототипы. Каждая доведена до продакшена.",
  cases: [
    {
      flagship: true,
      badges: ["Flagship", "AI Matching Engine"],
      title: "HelpRent Phangan — Аренда недвижимости",
      desc: "Вертикальный AI matching-движок под аренду недвижимости — сайт с поиском на 4 языках, AI intake agent (полный бриф за один разговор), умный ранкинг под требования арендатора, CRM с двумя ролями (account manager + sales), менеджерский BI-дашборд, база объектов, история клиента, уведомления в Telegram.",
      result:
        "→ Посетитель приходит менеджеру уже квалифицированным. Без ручного ввода.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "DeepSeek", "Telegram"],
      metricValue: "EN · RU · DE · HE",
      metricLabel: "интерфейс поиска",
    },
    {
      flagship: false,
      badges: ["Поиск + агентский слой"],
      title: "HelpRent Da Nang — Рынок аренды",
      desc: "Разрозненные объявления города сведены в один нормализованный слой поиска на EN, VI и RU. Mai, AI-ассистент, ищет фразой или по скриншоту карты с обведённой областью — его читает vision-модель. Медианные ставки по размеру и району, пересчёт ночью. Здания на карте с прямыми контактами менеджеров.",
      result: "→ Один слой поиска на весь город, на трёх языках.",
      stack: ["Next.js", "Python", "PostgreSQL", "Vision-модели"],
      metricValue: "EN · VI · RU",
      metricLabel: "поиск и объявления",
    },
    {
      flagship: false,
      badges: ["Автоматизация процесса"],
      title: "Отбор кандидатов — передан команде",
      desc: "Бот принимает отклики, задаёт уточняющие вопросы, собирает файлы вместе с PDF и разбирает их содержимое. Оценка по двум наборам критериев на каждую вакансию: постоянные для компании и специфические под позицию. Интегральная оценка, ранжирование, доска на три категории.",
      result: "→ Собран end-to-end и передан команде, которая ведёт его сама.",
      stack: ["Python", "PostgreSQL", "Telegram", "LLM-скоринг"],
      metricValue: "End to end",
      metricLabel: "построено и передано",
    },
  ],
};

export default function ServicesCases() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section id="cases" className="pb-reveal" style={{ background: "var(--c-bg2)", padding: "72px 0", position: "relative" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 04</span>
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
              viewport={{ once: true, amount: 0.1 }}
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
                        fontSize: 14,
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
                    fontFamily: "var(--font-display)",
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                        fontSize: 14,
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
                    fontFamily: "var(--font-display)",
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
                    fontSize: 16,
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
