"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, Database, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";

const en = {
  sectionLabel: "What I build",
  h2: "Four types of AI systems",
  subtitle:
    "Each built from scratch. No platform lock-in. Your data on your server.",
  getQuote: "Get a quote →",
  cards: [
    {
      title: "AI-Powered Bots",
      desc: "Chatbots and AI agents that qualify leads, answer questions 24/7, trigger workflows, send structured notifications. Trained on your data, multilingual by default.",
      tags: ["Visa", "Real estate", "Legal", "Clinics", "HR"],
      price: "from $500",
    },
    {
      title: "Process Automation",
      desc: "Replace manual operations with AI agents that move data between systems, process applications, trigger actions across your stack. Zapier/Make on steroids.",
      tags: ["Any business", "Repetitive ops"],
      price: "from $1,000",
    },
    {
      title: "Custom CRM",
      desc: "Not Notion. Not HubSpot. Your own CRM built around your exact pipeline: roles, deals, client history, automatic notifications, native Telegram integration.",
      tags: ["Sales teams", "Service businesses", "2–15 people"],
      price: "from $1,500",
    },
    {
      title: "Custom Website",
      desc: "Fast, SEO-ready, custom-designed websites. Multilingual, mobile-first, CMS if needed. Ships with an AI lead bot plugged in from day one.",
      tags: ["Services", "Retail", "Real estate"],
      price: "from $800",
    },
  ],
};

const ru = {
  sectionLabel: "Что я строю",
  h2: "Четыре типа AI-систем",
  subtitle:
    "Каждая с нуля. Без привязки к платформам. Ваши данные на вашем сервере.",
  getQuote: "Запросить цену →",
  cards: [
    {
      title: "AI-боты",
      desc: "Чат-боты и AI-агенты: квалификация лидов, ответы 24/7, запуск процессов, структурированные уведомления. Обучены на ваших данных, многоязычны по умолчанию.",
      tags: ["Визы", "Недвижимость", "Юристы", "Клиники", "HR"],
      price: "от $500",
    },
    {
      title: "Автоматизация процессов",
      desc: "Замена ручных операций на AI-агентов, которые двигают данные между системами, обрабатывают заявки, запускают действия в вашем стеке. Zapier/Make на стероидах.",
      tags: ["Любой бизнес", "Рутинные операции"],
      price: "от $1,000",
    },
    {
      title: "Кастомная CRM",
      desc: "Не Notion. Не HubSpot. Своя CRM под ваш конкретный pipeline: роли, сделки, история клиента, автоуведомления, нативная интеграция с Telegram.",
      tags: ["Отделы продаж", "Сервисный бизнес", "2–15 человек"],
      price: "от $1,500",
    },
    {
      title: "Сайт на заказ",
      desc: "Быстрые, SEO-готовые, кастомные сайты. Многоязычные, mobile-first, CMS по запросу. В комплекте — AI-бот для лидов с первого дня.",
      tags: ["Услуги", "Ритейл", "Недвижимость"],
      price: "от $800",
    },
  ],
};

const ICONS = [Bot, Workflow, Database, Globe];

export default function ServicesGrid() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section id="services" style={{ background: "var(--c-bg)", padding: "72px 0" }}>
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
              color: "var(--c-body)",
              lineHeight: 1.6,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.cards.map((card, i) => {
            const Icon = ICONS[i];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 700,
                    fontSize: 15,
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
                    fontSize: 12,
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
                        fontSize: 10,
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
                    fontSize: 13,
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
                    fontSize: 12,
                    color: "#07080a",
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
