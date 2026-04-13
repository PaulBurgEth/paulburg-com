"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";
import { TELEGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

const en = {
  badge: "Built for your process",
  h1a: "I build ",
  h1gold: "AI systems",
  h1b: " that run your business",
  subtitle:
    "Custom chatbots, AI agents, CRMs, websites — built from scratch around your process. Not a template. Not a no-code tool. Ready in days.",
  ctaPrimary: "Tell me about your project",
  ctaTelegram: "Text me on Telegram",
  ctaWhatsApp: "Text me on WhatsApp",
};

const ru = {
  badge: "Создано под ваш процесс",
  h1a: "Я строю ",
  h1gold: "AI-системы",
  h1b: ", которые работают за вас",
  subtitle:
    "Чат-боты, AI-агенты, CRM, сайты — с нуля под ваш процесс. Не шаблон. Не конструктор. Готово за дни.",
  ctaPrimary: "Расскажите о проекте",
  ctaTelegram: "Написать в Telegram",
  ctaWhatsApp: "Написать в WhatsApp",
};

export default function ServicesHero() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section
      className="w-full flex items-center justify-center"
      style={{ background: "var(--c-bg)", paddingTop: 80, paddingBottom: 64 }}
    >
      <div
        className="container-custom flex flex-col items-center text-center"
        style={{ maxWidth: 720 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span
              style={{
                fontFamily: "var(--font-inconsolata), monospace",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "rgba(200,169,110,0.08)",
                border: "1px solid rgba(200,169,110,0.22)",
                color: "var(--c-gold)",
                padding: "4px 12px",
                borderRadius: 4,
                display: "inline-block",
              }}
            >
              {t.badge}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(30px, 5vw, 52px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--c-heading)",
            }}
          >
            {t.h1a}
            <span style={{ color: "var(--c-gold)" }}>{t.h1gold}</span>
            {t.h1b}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "var(--c-text2)",
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 w-full justify-center"
          >
            <button
              type="button"
              onClick={open}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--c-gold)",
                color: "var(--c-text)",
                fontFamily: "var(--font-instrument-sans), sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.04em",
                padding: "12px 24px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              {t.ctaPrimary}
            </button>
            <Link
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--c-border2)",
                color: "var(--c-text)",
                fontFamily: "var(--font-instrument-sans), sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.04em",
                padding: "12px 24px",
                borderRadius: 5,
                textDecoration: "none",
              }}
            >
              {t.ctaTelegram}
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--c-border2)",
                color: "var(--c-text)",
                fontFamily: "var(--font-instrument-sans), sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.04em",
                padding: "12px 24px",
                borderRadius: 5,
                textDecoration: "none",
              }}
            >
              {t.ctaWhatsApp}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
