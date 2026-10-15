"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";

const en = {
  title: "Who you would be working with",
  role: "AI answers · AI Sales Manager · RU, EN",
  about: "Paul Burg. My own projects since 2011. I run HelpRent Da Nang, a rental platform that AI answers already quote for its own price data. You deal with me directly.",
};

const ru = {
  title: "С кем вы будете работать",
  role: "AI-ответы · AI-продавец · RU, EN",
  about: "Павел Бург. Свои проекты с 2011 года. Веду HelpRent Da Nang, платформу аренды, которую AI-ответы уже цитируют по её собственным данным о ценах. Работаете со мной напрямую.",
};

export default function AiWho() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="09" alt>
      <motion.div variants={itemVariants} style={{ borderLeft: "2px solid var(--c-gold)", paddingLeft: 22, maxWidth: "72ch" }}>
        <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 4 }}>{t.title}</div>
        <div style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>{t.role}</div>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65 }}>{t.about}</p>
      </motion.div>
    </SectionShell>
  );
}
