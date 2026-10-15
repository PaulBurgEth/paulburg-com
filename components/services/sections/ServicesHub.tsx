"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DISPLAY_AXES } from "@/lib/type";

// The three service lines at one level. Two have their own landing pages; the
// third is the rest of this page (anchor #automation on ServicesGrid).
const en = {
  sectionLabel: "Three directions",
  h2: "Pick one or combine them",
  cards: [
    { k: "Outbound", t: "Clients found by name", d: "I pick the companies that need what you sell and write to each in your name, by email and, where it fits, on LinkedIn.", href: "/outbound", cta: "How the channel works →" },
    { k: "AI Inbound", t: "Named in AI answers, answered in a minute", d: "Your company named when buyers ask ChatGPT and Google AI Mode who to use, and an AI Sales Manager that answers every inquiry on your site day and night.", href: "/ai-inbound", cta: "What your buyers see →" },
    { k: "AI automation", t: "Bots, CRM, dashboards, websites", d: "The systems a business runs on, built from scratch around your process. Your data on your server.", href: "#automation", cta: "See below ↓" },
  ],
};

const ru = {
  sectionLabel: "Три направления",
  h2: "Выберите одно или сочетайте",
  cards: [
    { k: "Аутбаунд", t: "Клиенты, найденные поимённо", d: "Отбираю компании, которым нужно то, что вы продаёте, и пишу каждой от вашего имени: письмом, а где уместно, в LinkedIn.", href: "/outbound", cta: "Как устроен канал →" },
    { k: "AI-инбаунд", t: "Вас называют нейросети, заявка получает ответ за минуту", d: "Вашу компанию называют, когда покупатель спрашивает ChatGPT и Google AI Mode, к кому обратиться, а AI-продавец отвечает на каждую заявку на сайте днём и ночью.", href: "/ai-inbound", cta: "Что видят ваши покупатели →" },
    { k: "AI-автоматизация", t: "Боты, CRM, дашборды, сайты", d: "Системы, на которых держится бизнес, с нуля под ваш процесс. Ваши данные на вашем сервере.", href: "#automation", cta: "Ниже на странице ↓" },
  ],
};

export default function ServicesHub() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section className="pb-reveal" style={{ background: "var(--c-bg2)", borderBottom: "1px solid var(--c-border)", padding: "72px 0", position: "relative" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 02</span>
      <div className="container-custom">
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--c-gold)", display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
            {t.sectionLabel}
            <span style={{ flex: 1, height: 1, background: "var(--c-border)", display: "block" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", ...DISPLAY_AXES, fontWeight: 700, fontSize: "clamp(30px, 4vw, 44px)", color: "var(--c-heading)" }}>{t.h2}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.cards.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderTop: "2px solid var(--c-gold)", borderRadius: 10, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span style={{ fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-gold)" }}>{c.k}</span>
              <div style={{ fontFamily: "var(--font-display)", ...DISPLAY_AXES, fontWeight: 700, fontSize: 21, lineHeight: 1.3, color: "var(--c-heading)" }}>{c.t}</div>
              <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 16, lineHeight: 1.6, color: "var(--c-body)", flex: 1 }}>{c.d}</p>
              <Link href={c.href} style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontWeight: 600, fontSize: 15, color: "var(--c-gold)", textDecoration: "none" }}>{c.cta}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
