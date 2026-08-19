"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TELEGRAM_URL, WHATSAPP_URL, INTAKE_ANCHOR } from "@/lib/constants";
import BurgMark from "@/components/BurgMark";
import { SERIF, SANS, MONO, LEDE } from "../shared";
import ChannelDiagram from "../ChannelDiagram";

const en = {
  badge: "Cold outbound · B2B",
  h1a: "New clients, found by name — ",
  h1gold: "before they start looking",
  lede: "Right now your pipeline is referrals plus whoever happens to find you. This is the third source: companies that just had a reason to buy what you sell, reached by name, in their own language, in an email that comes from your domain and carries your signature.",
  ctaPrimary: "Tell me about your market",
  ctaTelegram: "Text me on Telegram",
  ctaWhatsApp: "Text me on WhatsApp",
  strip: ["RU · EN · ES", "Email, LinkedIn, Telegram", "Your domains, your data"],
};

const ru = {
  badge: "Холодный аутбаунд · B2B",
  // RU runs 15-25% longer: the English headline is three lines here and the
  // buttons drop below the fold, so this one is cut to the same line count.
  h1a: "Клиенты, найденные поимённо — ",
  h1gold: "до того, как начнут искать",
  lede: "Сейчас ваш поток — рекомендации плюс те, кто сам вас нашёл. Третий источник: компании, у которых только что появился повод покупать то, что вы продаёте. Поимённо, на их языке, письмом с вашего домена и за вашей подписью.",
  ctaPrimary: "Расскажите о вашем рынке",
  ctaTelegram: "Написать в Telegram",
  ctaWhatsApp: "Написать в WhatsApp",
  strip: ["RU · EN · ES", "Почта, LinkedIn, Telegram", "Ваши домены, ваши данные"],
};

const btnBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  color: "var(--c-text)",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: 15,
  letterSpacing: "0.04em",
  padding: "12px 24px",
  borderRadius: 5,
  textDecoration: "none",
};

export default function OutboundHero() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section
      id="outbound-top"
      className="w-full flex items-center justify-center"
      style={{ background: "var(--c-bg)", paddingTop: 80, paddingBottom: 56 }}
    >
      <div className="container-custom grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontFamily: MONO,
              fontWeight: 600,
              fontSize: 15,
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
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "clamp(34px, 5.2vw, 62px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "var(--c-heading)",
            }}
          >
            {t.h1a}
            <BurgMark weight={1.2}>{t.h1gold}</BurgMark>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: LEDE,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 21,
              color: "var(--c-body-lede)",
              maxWidth: 720,
              lineHeight: 1.7,
            }}
          >
            {t.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <Link href={INTAKE_ANCHOR} style={{ ...btnBase, border: "1px solid var(--c-gold)" }}>
              {t.ctaPrimary}
            </Link>
            <Link
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnBase, border: "1px solid var(--c-border2)" }}
            >
              {t.ctaTelegram}
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnBase, border: "1px solid var(--c-border2)" }}
            >
              {t.ctaWhatsApp}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-x-5 gap-y-2"
            style={{ marginTop: 4 }}
          >
            {t.strip.map((s, i) => (
              <span
                key={i}
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--c-muted)",
                }}
              >
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="hidden lg:flex justify-end"
        >
          <ChannelDiagram />
        </motion.div>
      </div>
    </section>
  );
}
