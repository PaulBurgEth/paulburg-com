"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";

interface Pillar {
  heading: string;
  body: string;
}

const en = {
  sectionLabel: "Flagship",
  badge: "TURNKEY",
  h2: "AI Bot + Custom CRM + BI",
  subtitle:
    "One package. One contact. Five production-grade systems wired end-to-end — website, AI bot & automation, custom CRM, business intelligence, and manager dashboards — that turn your business into a measurable, automated machine ready to sell on day one.",
  pillars: [
    {
      heading: "Custom multilingual website",
      body: "Next.js, SEO-ready, mobile-first, custom-designed. Your brand and content on your domain — no platform lock-in, no template fingerprint, no monthly SaaS rent.",
    },
    {
      heading: "AI bot & automation",
      body: "A lead-qualifying chatbot trained on your data: 24/7 multilingual answers, hot/warm/cold scoring, workflow triggers, document collection, structured handoff to your team via Telegram. Plus background AI agents that move data between systems and run the boring parts of operations.",
    },
    {
      heading: "Custom CRM on your server",
      body: "Your own pipeline — not Notion, not HubSpot. Roles, deals, client history, lead routing, automatic notifications. Built around how you actually sell, sized for a 2–15-person team, your data never leaves your infrastructure.",
    },
    {
      heading: "Business Intelligence",
      body: "Dashboards that aggregate signals across the stack: lead sources, conversion rates, revenue by segment, cohort retention, deal velocity. Real numbers in real time — so the next decision is based on data, not feel.",
    },
    {
      heading: "Manager dashboards",
      body: "Operational live-ops for the team: queue depth, daily activity per role, SLA alerts, exception flags, escalations. Managers see what's happening without asking, and intervene before things drop.",
    },
  ] as Pillar[],
  timing: "AI-assisted development — production-ready in 3–14 days.",
  price: "$3,000",
  priceNote: "complete bundle · base scope",
};

const ru = {
  sectionLabel: "Флагман",
  badge: "TURNKEY",
  h2: "AI-бот + Кастомная CRM + BI",
  subtitle:
    "Один пакет. Один контакт. Пять продакшен-систем, связанных в единую цепочку — сайт, AI-бот и автоматизация, кастомная CRM, business intelligence и менеджерские дашборды — превращающие бизнес в измеримую автоматизированную машину, готовую продавать с первого дня.",
  pillars: [
    {
      heading: "Кастомный многоязычный сайт",
      body: "Next.js, SEO-готов, mobile-first, дизайн с нуля. Ваш бренд и контент на вашем домене — без привязки к платформам, без шаблонного следа, без ежемесячной аренды у SaaS.",
    },
    {
      heading: "AI-бот и автоматизация",
      body: "Чат-бот для квалификации лидов, обученный на ваших данных: ответы 24/7 на разных языках, скоринг hot/warm/cold, запуск процессов, сбор документов, структурированная передача команде через Telegram. Плюс фоновые AI-агенты, которые двигают данные между системами и закрывают рутинные операции.",
    },
    {
      heading: "Кастомная CRM на вашем сервере",
      body: "Свой pipeline — не Notion, не HubSpot. Роли, сделки, история клиента, маршрутизация лидов, автоматические уведомления. Под то, как вы реально продаёте, под команду 2–15 человек, данные никогда не покидают вашу инфраструктуру.",
    },
    {
      heading: "Business Intelligence",
      body: "Дашборды, агрегирующие сигналы со всего стека: источники лидов, конверсия, выручка по сегментам, когортная retention, скорость движения сделок. Реальные цифры в реальном времени — чтобы следующее решение опиралось на данные, а не на ощущение.",
    },
    {
      heading: "Менеджерские дашборды",
      body: "Операционная live-ops для команды: глубина очереди, дневная активность по ролям, SLA-алерты, исключения, эскалации. Менеджеры видят что происходит без вопросов и вмешиваются до того, как что-то начнёт проседать.",
    },
  ] as Pillar[],
  timing: "AI-assisted разработка — продакшен-готовность за 3–14 дней.",
  price: "$3,000",
  priceNote: "весь пакет · базовый объём",
};

export default function ServicesTurnkey() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section className="pb-reveal" style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 11, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 03</span>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: "0 0 48px rgba(200,169,110,0.08)" }}
          className="turnkey-banner"
          style={{
            position: "relative",
            background:
              "linear-gradient(135deg, rgba(200,169,110,0.10) 0%, rgba(200,169,110,0.02) 100%)",
            border: "1px solid rgba(200,169,110,0.35)",
            borderRadius: 14,
            padding: "32px 28px",
            overflow: "hidden",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "var(--c-gold)",
              background: "rgba(200,169,110,0.12)",
              border: "1px solid rgba(200,169,110,0.35)",
              borderRadius: 4,
              padding: "4px 10px",
              marginBottom: 14,
            }}
          >
            {t.badge}
          </div>

          {/* Section label */}
          <div
            style={{
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--c-muted)",
              marginBottom: 6,
            }}
          >
            {t.sectionLabel}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              letterSpacing: "-0.02em",
              color: "var(--c-heading)",
              marginBottom: 10,
            }}
          >
            {t.h2}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontSize: 14,
              color: "var(--c-body)",
              lineHeight: 1.6,
              maxWidth: 620,
              marginBottom: 22,
            }}
          >
            {t.subtitle}
          </p>

          {/* 5 pillars — heading + body per pillar */}
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginBottom: 28,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 18,
              counterReset: "pillar",
            }}
          >
            {t.pillars.map((p, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 14,
                  alignItems: "start",
                  paddingTop: i > 0 ? 18 : 0,
                  borderTop: i > 0 ? "1px solid rgba(200,169,110,0.12)" : "none",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--c-gold)",
                    paddingTop: 3,
                  }}
                >
                  /0{i + 1}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--c-text)",
                      marginBottom: 6,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {p.heading}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-instrument-sans), sans-serif",
                      fontSize: 13,
                      color: "var(--c-body)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Timing line */}
          <p
            style={{
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--c-gold)",
              marginBottom: 22,
              paddingTop: 14,
              borderTop: "1px solid rgba(200,169,110,0.22)",
            }}
          >
            {t.timing}
          </p>

          {/* Price */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: "var(--c-gold)",
                  lineHeight: 1,
                }}
              >
                {t.price}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--c-muted)",
                  marginTop: 4,
                }}
              >
                {t.priceNote}
              </div>
            </div>
            <button
              type="button"
              onClick={open}
              className="btn-primary"
              style={{
                background: "var(--c-gold)",
                border: "1px solid var(--c-gold)",
                color: "#07080a",
                fontFamily: "var(--font-instrument-sans), sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.04em",
                padding: "10px 22px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              {language === "ru" ? "Запросить цену →" : "Get a quote →"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
