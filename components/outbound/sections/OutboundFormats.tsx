"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, T, cardHover, itemVariants } from "../shared";

const en = {
  eyebrow: "What you get",
  h2: "Two formats. The difference is where I hand the client over.",
  sub: "At the first real conversation, or at an agreed price and lead time.",
  formats: [
    { range: "01 — 06", name: "Leads", body: "Selection, contact finding, emails, correspondence, qualification. You get a client who confirmed a need and is ready to talk, with the whole thread. Your manager takes it from there." },
    { range: "01 — 09", name: "Leads + deal", body: "All of the above plus the deal: pinning the specification, requesting terms from your suppliers, assembling the quote, and running the correspondence to an agreed price and lead time. Your account manager receives a finished order." },
  ],
  stagesTitle: "Nine stages, every company goes through them in order",
  stages: ["Selection", "Contact", "Email", "Correspondence", "Reply triage", "Handover", "Specification", "Terms", "Agreement"],
  dealBadge: "Deal format only",
  note: "The second format is for when your managers are already buried and one more inbound only gets in the way. Full stage-by-stage breakdown on request.",
};

const ru = {
  eyebrow: "Что вы получаете",
  h2: "Два формата. Разница в том, где я передаю клиента.",
  sub: "На первом предметном разговоре или на согласованных цене и сроках.",
  formats: [
    { range: "01 — 06", name: "Лиды", body: "Отбор, поиск контактов, письма, переписка, квалификация. Вы получаете клиента, который подтвердил потребность и готов обсуждать, вместе со всей перепиской. Дальше работает ваш менеджер." },
    { range: "01 — 09", name: "Лиды и сделка", body: "Всё то же плюс работа по сделке: уточнение спецификации, запрос условий у ваших поставщиков, сбор расчёта и переписка до согласованных цены и сроков. Аккаунт-менеджер получает готовый заказ." },
  ],
  stagesTitle: "Девять этапов, каждая компания проходит их по порядку",
  stages: ["Отбор", "Контакт", "Письмо", "Переписка", "Разбор ответов", "Передача", "Уточнение", "Условия", "Согласование"],
  dealBadge: "Только формат со сделкой",
  note: "Второй формат — если менеджеры и так завалены и лишний входящий им только мешает. Подробная раскладка по этапам — по запросу.",
};

export default function OutboundFormats() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="03">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {t.formats.map((f, i) => (
          <motion.div
            key={f.name}
            variants={itemVariants}
            whileHover={cardHover}
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderTop: i === 1 ? "2px solid var(--c-gold)" : "1px solid var(--c-border)",
              borderRadius: 10,
              padding: 24,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.16em", color: "var(--c-gold)" }}>{f.range}</span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 22, color: "var(--c-heading)", margin: "9px 0 11px" }}>{f.name}</h3>
            <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65 }}>{f.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline strip — replaces a 3x3 grid of nine In/Out prose cards. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 16px" }}>
        {t.stagesTitle}
      </h3>
      <div className="flex flex-wrap gap-2">
        {t.stages.map((stage, i) => {
          const isDeal = i >= 6;
          return (
            <motion.div
              key={stage}
              variants={itemVariants}
              className="flex items-center gap-2.5"
              style={{
                background: isDeal ? "var(--c-card2)" : "var(--c-card)",
                border: `1px solid ${isDeal ? "rgba(200,169,110,0.28)" : "var(--c-border)"}`,
                borderRadius: 8,
                padding: "11px 15px",
                flex: "1 1 auto",
                minWidth: 150,
              }}
            >
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.1em", color: isDeal ? "var(--c-gold)" : "var(--c-text2)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-heading)" }}>{stage}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
        <span style={{ width: 11, height: 11, borderRadius: 3, background: "var(--c-card2)", border: "1px solid rgba(200,169,110,0.28)", display: "inline-block" }} />
        <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text2)" }}>{t.dealBadge}</span>
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
