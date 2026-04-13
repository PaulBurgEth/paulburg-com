"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";
import { TELEGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

const en = {
  h2: "Ready to automate?",
  subtitle:
    "Tell me about your business — I'll say what can be automated in 5 minutes.",
  ctaPrimary: "Tell me about your project",
  ctaTelegram: "Text me on Telegram",
  ctaWhatsApp: "Text me on WhatsApp",
};

const ru = {
  h2: "Готовы к автоматизации?",
  subtitle:
    "Расскажите о бизнесе — скажу что можно автоматизировать за 5 минут.",
  ctaPrimary: "Расскажите о проекте",
  ctaTelegram: "Написать в Telegram",
  ctaWhatsApp: "Написать в WhatsApp",
};

export default function ServicesCTA() {
  const { language } = useLanguage();
  const { open } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  return (
    <section
      style={{
        borderTop: "1px solid var(--c-border)",
        padding: "72px 32px",
        background: "var(--c-bg)",
      }}
    >
      <div className="container-custom flex flex-col items-center text-center gap-5">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 44px)",
            letterSpacing: "-0.02em",
            color: "var(--c-heading)",
          }}
        >
          {t.h2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-instrument-sans), sans-serif",
            fontSize: 15,
            color: "var(--c-text2)",
            maxWidth: 420,
            lineHeight: 1.6,
          }}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
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
      </div>
    </section>
  );
}
