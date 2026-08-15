"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Crosshair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const en = {
  sectionLabel: "Also available",
  h2: "Not a system — a stream of clients",
  subtitle:
    "Everything above builds the machine. This fills it: I find the companies, reach the decision-maker, and write in your name until a client is ready to talk terms.",
  points: [
    "Companies found in open registries, each with a reason to be written to",
    "Emails in the recipient's own language — Russian, English, Spanish",
    "Correspondence only, no calls. Your domains, your data, from day one",
  ],
  metric: "2.0%",
  metricLabel: "reply rate on the first pilot, 67% of replies taken to a quote",
  cta: "How the channel works →",
};

const ru = {
  sectionLabel: "Ещё есть",
  h2: "Не система, а поток клиентов",
  subtitle:
    "Всё выше собирает машину. Это её наполняет: нахожу компании, выхожу на ЛПР и пишу от вашего имени, пока клиент не будет готов обсуждать условия.",
  points: [
    "Компании из открытых реестров, у каждой — повод для письма",
    "Письма на языке получателя: русский, английский, испанский",
    "Только переписка, без звонков. Ваши домены и данные с первого дня",
  ],
  metric: "2,0%",
  metricLabel: "отклик на первом пилоте, 67% ответов доведено до расчёта",
  cta: "Как устроен канал →",
};

export default function ServicesOutbound() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section
      id="outbound"
      className="scroll-mt-20 pb-reveal"
      style={{ background: "var(--c-bg2)", borderTop: "1px solid var(--c-border)", padding: "72px 0", position: "relative" }}
    >
      <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 11, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 07</span>
      <div className="container-custom">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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

          <div
            className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 items-start"
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderLeft: "2px solid var(--c-gold)",
              borderRadius: 10,
              padding: 26,
            }}
          >
            <div>
              <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.15)",
                    flexShrink: 0,
                  }}
                >
                  <Crosshair size={16} color="var(--c-gold)" />
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-fraunces), var(--font-source-serif), serif",
                    fontWeight: 700,
                    fontSize: "clamp(22px, 3vw, 30px)",
                    letterSpacing: "-0.02em",
                    color: "var(--c-heading)",
                  }}
                >
                  {t.h2}
                </h2>
              </div>

              <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13.5, color: "var(--c-body)", lineHeight: 1.7, marginBottom: 16, maxWidth: 620 }}>
                {t.subtitle}
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                {t.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" style={{ fontFamily: "var(--font-inconsolata), monospace", fontSize: 10, color: "var(--c-gold)", paddingTop: 3, flexShrink: 0, letterSpacing: "0.1em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13, color: "var(--c-body)", lineHeight: 1.6 }}>{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/outbound"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  border: "1px solid var(--c-gold)",
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
                {t.cta}
              </Link>
            </div>

            <div
              style={{
                background: "var(--c-card2)",
                border: "1px solid var(--c-border)",
                borderRadius: 8,
                padding: 20,
              }}
            >
              <div style={{ fontFamily: "var(--font-fraunces), var(--font-source-serif), serif", fontWeight: 700, fontSize: 34, color: "var(--c-gold)", lineHeight: 1, marginBottom: 8 }}>
                {t.metric}
              </div>
              <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 12.5, color: "var(--c-text2)", lineHeight: 1.6 }}>
                {t.metricLabel}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
