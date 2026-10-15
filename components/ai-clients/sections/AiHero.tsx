"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { INTAKE_ANCHOR } from "@/lib/constants";
import BurgMark from "@/components/BurgMark";
import { SERIF, DISPLAY_AXES, SANS, MONO, LEDE, T } from "@/components/outbound/shared";
import { SourceLink, SOURCES } from "../shared";

const en = {
  badge: "AI answers · AI Sales Manager",
  h1a: "Your next client asks ChatGPT who to call, then writes to the names it gives. Will one of them be ",
  h1mark: "yours?",
  lede: "Two moments decide whose client they become: whether the answer names you, and who replies first. I cover both.",
  products: [
    { t: "AI answers", d: "Your company named when buyers ask ChatGPT and Google AI Mode who to use." },
    { t: "AI Sales Manager", d: "Every inquiry on your site answered in about a minute, day and night, and handed to your manager as a buyer ready to talk." },
  ],
  cta: "Send me your site",
  ctaNote: "I'll show you what ChatGPT tells your buyer, and what happens to an inquiry on your site at night.",
  rail: ["Question", "AI answer", "Your site", "Your reply", "Deal"],
  railMarks: { 1: "AI answers: you are named", 3: "AI Sales Manager: nobody waits until morning" } as Record<number, string>,
  proof: [
    { n: "900M", d: "people use ChatGPT every week", s: SOURCES.openai },
    { n: "45%", d: "of consumers ask AI to recommend a local business", s: SOURCES.brightlocal },
    { n: "×7", d: "more conversations with the person who decides when you answer within an hour", s: SOURCES.hbr },
  ],
};

const ru = {
  badge: "AI-ответы · AI-продавец",
  h1a: "Ваш следующий клиент спрашивает ChatGPT, к кому обратиться, и пишет тем, кого он назвал. Будете ли среди них ",
  h1mark: "вы?",
  lede: "Чьим клиентом он станет, решают два момента: назовёт ли вас ответ и кто ответит первым. Закрываю оба.",
  products: [
    { t: "AI-ответы", d: "Вашу компанию называют, когда покупатель спрашивает ChatGPT и Google AI Mode, к кому обратиться." },
    { t: "AI-продавец", d: "Каждая заявка на вашем сайте получает ответ примерно за минуту, днём и ночью, и попадает к менеджеру покупателем, готовым к разговору." },
  ],
  cta: "Пришлите сайт",
  ctaNote: "Покажу, что ChatGPT отвечает вашему покупателю и что происходит с заявкой на вашем сайте ночью.",
  rail: ["Вопрос", "Ответ нейросети", "Ваш сайт", "Ваш ответ", "Сделка"],
  railMarks: { 1: "AI-ответы: вас называют", 3: "AI-продавец: никто не ждёт до утра" } as Record<number, string>,
  proof: [
    { n: "900 млн", d: "человек пользуются ChatGPT каждую неделю", s: SOURCES.openai },
    { n: "45%", d: "потребителей просят AI порекомендовать местный бизнес", s: SOURCES.brightlocal },
    { n: "×7", d: "больше разговоров с тем, кто решает, если ответить в течение часа", s: SOURCES.hbr },
  ],
};

export default function AiHero() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section id="ai-top" style={{ background: "var(--c-bg)", paddingTop: 80, paddingBottom: 56 }}>
      <div className="container-custom flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6"
        >
          <span
            style={{
              fontFamily: MONO, fontWeight: 600, fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase",
              background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.22)", color: "var(--c-gold)",
              padding: "4px 12px", borderRadius: 4, display: "inline-block",
            }}
          >
            {t.badge}
          </span>

          <h1 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: "clamp(30px, 4vw, 50px)", lineHeight: 1.15, color: "var(--c-heading)", maxWidth: "32ch" }}>
            {t.h1a}
            <BurgMark weight={1.2}>{t.h1mark}</BurgMark>
            <span
              className="pb-cursor-blink"
              aria-hidden="true"
              style={{ width: 5, height: "0.85em", marginLeft: 10, background: "var(--c-gold)", boxShadow: "0 0 14px rgba(200,169,110,0.5)", verticalAlign: "middle" }}
            />
          </h1>

          <p style={{ fontFamily: LEDE, fontSize: 21, color: "var(--c-body-lede)", maxWidth: "58ch", lineHeight: 1.7 }}>
            {t.lede}
          </p>
        </motion.div>

        {/* The whole page in one line: the two gold points are the two products. */}
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-5 gap-y-4"
          style={{ position: "relative" }}
        >
          <span aria-hidden="true" className="hidden sm:block" style={{ position: "absolute", left: 0, right: 0, top: 8, height: 1, background: "var(--c-border2)" }} />
          {t.rail.map((label, i) => {
            const mark = t.railMarks[i];
            return (
              <li key={label} className="flex sm:flex-col gap-3 sm:gap-2 items-start" style={{ position: "relative" }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 17, height: 17, borderRadius: "50%", flexShrink: 0,
                    background: mark ? "var(--c-gold)" : "var(--c-bg)",
                    border: `1px solid ${mark ? "var(--c-gold)" : "var(--c-border2)"}`,
                  }}
                />
                <span>
                  <span style={{ display: "block", fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.1em", textTransform: "uppercase", color: mark ? "var(--c-gold)" : "var(--c-text2)" }}>
                    {label}
                  </span>
                  {mark && (
                    <span style={{ display: "block", fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.45, marginTop: 4, maxWidth: "22ch" }}>
                      {mark}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </motion.ol>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {t.products.map((p) => (
            <div key={p.t} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderTop: "2px solid var(--c-gold)", borderRadius: 10, padding: 20 }}>
              <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 6 }}>{p.t}</div>
              <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.6 }}>{p.d}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <Link
            href={INTAKE_ANCHOR}
            style={{
              display: "inline-flex", justifyContent: "center", background: "var(--c-gold)", color: "var(--c-on-gold)",
              border: "1px solid var(--c-gold)", fontFamily: SANS, fontWeight: 600, fontSize: T.button, letterSpacing: "0.04em",
              padding: "13px 28px", borderRadius: 5, textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            {t.cta}
          </Link>
          <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", lineHeight: 1.55, maxWidth: "60ch" }}>{t.ctaNote}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ borderTop: "1px solid var(--c-border)", paddingTop: 24 }}
        >
          {t.proof.map((p) => (
            <div key={p.n}>
              <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.figureSm, color: "var(--c-heading)", lineHeight: 1.05 }}>{p.n}</div>
              <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5, margin: "6px 0" }}>{p.d}</p>
              <SourceLink source={p.s} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
