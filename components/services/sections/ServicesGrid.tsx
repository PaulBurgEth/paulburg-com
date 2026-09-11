"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, Database, Globe, Network } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";

const en = {
  sectionLabel: "Line one — systems",
  h2: "Production AI systems I ship",
  subtitle:
    "Each built from scratch. No platform lock-in. Your data on your server.",
  getQuote: "Get a quote →",
  cards: [
    {
      title: "AI-Powered Bots",
      desc: "Chatbots and AI agents that qualify leads, answer questions 24/7, trigger workflows, send structured notifications. Trained on your data, multilingual by default.",
      tags: ["Visa", "Real estate", "Legal", "Clinics", "HR"],
      price: "scoped per project",
    },
    {
      title: "Process Automation",
      desc: "Replace manual operations with AI agents that move data between systems, process applications, trigger actions across your stack. Not a scenario builder — your own code on your own server.",
      tags: ["Any business", "Repetitive ops"],
      price: "scoped per project",
    },
    {
      title: "Custom CRM & BI Systems",
      desc: "Not Notion. Not HubSpot. Your own CRM, BI dashboards, manager dashboards built around your exact pipeline: roles, deals, client history, automatic notifications, native Telegram integration.",
      tags: ["Sales teams", "Service businesses", "2–15 people"],
      price: "scoped per project",
    },
    {
      title: "Custom Website",
      desc: "Fast, SEO-ready, custom-designed websites. Multilingual, mobile-first, CMS if needed. Ships with an AI lead bot plugged in from day one.",
      tags: ["Services", "Retail", "Real estate"],
      price: "scoped per project",
    },
    {
      title: "AI Matching Engines",
      desc: "Vertical matching infrastructure for two-sided marketplaces — real estate, accommodation, hiring, services. AI-driven scoring, smart ranking, structured intake. Built for HelpRent Phangan, and again for the Da Nang rental market with an agent-facing layer on top.",
      tags: ["Real estate", "Marketplaces", "Hiring", "Vertical SaaS"],
      price: "scoped per project",
    },
  ],
};

const ru = {
  sectionLabel: "Линия первая — системы",
  h2: "Продакшен AI-системы, которые я делаю",
  subtitle:
    "Каждая с нуля. Без привязки к платформам. Ваши данные на вашем сервере.",
  getQuote: "Запросить цену →",
  cards: [
    {
      title: "AI-боты",
      desc: "Чат-боты и AI-агенты: квалификация лидов, ответы 24/7, запуск процессов, структурированные уведомления. Обучены на ваших данных, многоязычны по умолчанию.",
      tags: ["Визы", "Недвижимость", "Юристы", "Клиники", "HR"],
      price: "по объёму задачи",
    },
    {
      title: "Автоматизация процессов",
      desc: "Замена ручных операций на AI-агентов, которые двигают данные между системами, обрабатывают заявки, запускают действия в вашем стеке. Не конструктор со сценариями, а свой код на вашем сервере.",
      tags: ["Любой бизнес", "Рутинные операции"],
      price: "по объёму задачи",
    },
    {
      title: "Кастомная CRM и BI",
      desc: "Не Notion. Не HubSpot. Своя CRM, BI-дашборды, менеджерские панели — под ваш конкретный pipeline: роли, сделки, история клиента, автоуведомления, нативная интеграция с Telegram.",
      tags: ["Отделы продаж", "Сервисный бизнес", "2–15 человек"],
      price: "по объёму задачи",
    },
    {
      title: "Сайт на заказ",
      desc: "Быстрые, SEO-готовые, кастомные сайты. Многоязычные, mobile-first, CMS по запросу. В комплекте — AI-бот для лидов с первого дня.",
      tags: ["Услуги", "Ритейл", "Недвижимость"],
      price: "по объёму задачи",
    },
    {
      title: "AI Matching Engines",
      desc: "Вертикальная matching-инфраструктура для двусторонних маркетплейсов — недвижимость, аренда жилья, найм, услуги. AI-скоринг, умный ранкинг, структурированный intake. Собран для HelpRent Phangan и ещё раз — под рынок аренды Дананга, с агентским слоем поверх.",
      tags: ["Недвижимость", "Маркетплейсы", "HR", "Vertical SaaS"],
      price: "по объёму задачи",
    },
  ],
};

const ICONS = [Bot, Workflow, Database, Globe, Network];

export default function ServicesGrid() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section id="services" className="pb-reveal" style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}>
      <span aria-hidden="true" className="section-number" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 02</span>
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
              color: "var(--c-body)",
              lineHeight: 1.6,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Grid — 5 cards: 1col mobile, 2col tablet, 3col desktop (3+2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.cards.map((card, i) => {
            const Icon = ICONS[i];

            return (
              <motion.div
                key={i}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3, boxShadow: "0 10px 36px rgba(0,0,0,0.3)", borderColor: "rgba(200,169,110,0.22)" }}
                className="relative flex flex-col"
                style={{
                  background: "var(--c-card)",
                  border: "1px solid var(--c-border)",
                  borderRadius: 10,
                  padding: 22,
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    width: 34,
                    height: 34,
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.15)",
                    borderRadius: 8,
                  }}
                >
                  <Icon size={16} color="var(--c-gold)" />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--c-text)",
                    marginBottom: 6,
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    color: "var(--c-body)",
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  {card.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {card.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: "var(--font-inconsolata), monospace",
                        fontSize: 14,
                        background: "rgba(255,255,255,0.03)",
                        color: "var(--c-text)",
                        border: "1px solid rgba(200,169,110,0.3)",
                        borderRadius: 4,
                        padding: "2px 6px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <span
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--c-gold)",
                    marginBottom: 12,
                  }}
                >
                  {card.price}
                </span>

                {/* Get a quote CTA */}
                <button
                  type="button"
                  onClick={open}
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                    color: "var(--c-on-gold)",
                    border: "1px solid var(--c-gold)",
                    background: "var(--c-gold)",
                    padding: "7px 14px",
                    borderRadius: 5,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                  }}
                >
                  {t.getQuote}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
