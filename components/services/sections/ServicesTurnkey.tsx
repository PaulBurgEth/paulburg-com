"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";

const en = {
  sectionLabel: "Flagship",
  badge: "TURNKEY",
  h2: "Website + Bot + CRM",
  subtitle:
    "One package. One contact. A complete AI-powered business presence ready to sell on day one.",
  bullets: [
    "Custom multilingual website (Next.js, SEO-ready, mobile-first)",
    "AI lead bot plugged into the site from launch, trained on your data",
    "Custom CRM on your own server — roles, pipelines, Telegram alerts",
    "Full integration: form submissions → bot → CRM → your phone",
    "AI-assisted development: ready in 3–14 days",
  ],
  price: "$3,000",
  priceNote: "complete bundle",
};

const ru = {
  sectionLabel: "Флагман",
  badge: "TURNKEY",
  h2: "Сайт + Бот + CRM",
  subtitle:
    "Один пакет. Один контакт. Полноценное AI-присутствие бизнеса, готовое продавать с первого дня.",
  bullets: [
    "Кастомный многоязычный сайт (Next.js, SEO-готов, mobile-first)",
    "AI-бот для лидов, встроенный в сайт с запуска, обученный на ваших данных",
    "Кастомная CRM на вашем сервере — роли, pipeline, уведомления в Telegram",
    "Полная интеграция: заявка с формы → бот → CRM → ваш телефон",
    "AI-assisted разработка: готово за 3–14 дней",
  ],
  price: "$3,000",
  priceNote: "весь пакет",
};

export default function ServicesTurnkey() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section style={{ background: "var(--c-bg)", padding: "72px 0" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              fontFamily: "var(--font-playfair), serif",
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
              color: "var(--c-text2)",
              lineHeight: 1.6,
              maxWidth: 620,
              marginBottom: 22,
            }}
          >
            {t.subtitle}
          </p>

          {/* Bullets */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginBottom: 24,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {t.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontSize: 13,
                  color: "var(--c-text2)",
                  lineHeight: 1.5,
                  display: "flex",
                  gap: 10,
                }}
              >
                <span style={{ color: "var(--c-gold)", flexShrink: 0 }}>
                  →
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
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
