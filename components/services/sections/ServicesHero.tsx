"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";
import { TELEGRAM_URL, WHATSAPP_URL } from "@/lib/constants";
import BurgMark from "@/components/BurgMark";

const en = {
  badge: "Two service lines",
  h1a: "I build the systems ",
  h1gold: "and bring",
  h1b: " the clients that fill them",
  subtitle:
    "Chatbots, AI agents, CRMs and BI dashboards, matching engines, websites — built from scratch around your process. And a cold outbound channel that finds B2B clients in open data and writes to them in your name.",
  ctaPrimary: "Tell me about your task",
  ctaTelegram: "Text me on Telegram",
  ctaWhatsApp: "Text me on WhatsApp",
};

const ru = {
  badge: "Две линии услуг",
  h1a: "Строю системы ",
  h1gold: "и привожу",
  h1b: " клиентов, которые их наполняют",
  subtitle:
    "Чат-боты, AI-агенты, CRM и BI-дашборды, matching-движки, сайты — с нуля под ваш процесс. И холодный канал, который находит B2B-клиентов в открытых данных и пишет им от вашего имени.",
  ctaPrimary: "Расскажите о задаче",
  ctaTelegram: "Написать в Telegram",
  ctaWhatsApp: "Написать в WhatsApp",
};

export default function ServicesHero() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;
  const h1bMatch = t.h1b.match(/^(.*\s)(\S+)$/);
  const h1bHead = h1bMatch ? h1bMatch[1] : t.h1b;
  const h1bTail = h1bMatch ? h1bMatch[2] : "";

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
                fontSize: 14,
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
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 62px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--c-heading)",
            }}
          >
            {t.h1a}
            <span style={{ color: "var(--c-gold)" }}>{t.h1gold}</span>
            {h1bHead}<BurgMark weight={1.2}>{h1bTail}</BurgMark>
            <span
              className="pb-cursor-blink"
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 4,
                height: 36,
                marginLeft: 8,
                background: "var(--c-gold)",
                boxShadow: "0 0 14px rgba(200,169,110,0.5)",
                verticalAlign: "middle",
              }}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-lede)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 21,
              color: "var(--c-body-lede)",
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
                fontSize: 16,
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
                fontSize: 16,
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
                fontSize: 16,
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
