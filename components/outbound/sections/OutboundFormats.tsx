"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, cardHover, itemVariants } from "../shared";

type Stage = { num: string; title: string; input: string; output: string };

const en = {
  eyebrow: "What you get",
  h2: "Two formats, nine stages",
  sub: "The only difference is where I hand the client over: at the first real conversation, or at agreed price and lead time.",
  formats: [
    {
      range: "01 — 06",
      name: "Leads",
      body: "Selection, contact finding, emails, correspondence, qualification. You get a client who has confirmed a need and is ready to talk, together with the whole thread. Your manager takes it from there.",
    },
    {
      range: "01 — 09",
      name: "Leads + deal",
      body: "All of the above plus the deal itself: pinning down the specification, requesting terms from your suppliers and partners, assembling the quote, and running the correspondence up to agreed price and lead time. Your account manager receives a finished order.",
    },
  ],
  formatNote: "The second format is for when your managers are already buried in current orders and one more inbound only gets in the way. The client does not wait to be handed over and re-explained.",
  dealBadge: "Deal only",
  colInput: "In",
  colOutput: "Out",
  stages: [
    { num: "01", title: "Selection", input: "Open registries and segment criteria", output: "Companies with a confirmed signal of need" },
    { num: "02", title: "Contact", input: "Company and its domain", output: "Name, role, verified working address" },
    { num: "03", title: "Email", input: "The company's trigger and your price list", output: "An email written for that company, approved by you" },
    { num: "04", title: "Correspondence", input: "Queue of approved emails", output: "Delivered email and a follow-up a week later" },
    { num: "05", title: "Reply triage", input: "The client's reply", output: "Clear what they need, in what volume, and when" },
    { num: "06", title: "Handover", input: "Qualified client", output: "Your manager gets the client and the whole thread" },
    { num: "07", title: "Specification", input: "Initial interest", output: "What, how much, where, by when" },
    { num: "08", title: "Terms", input: "Spec and your suppliers", output: "Collected prices and lead times, a quote ready to send" },
    { num: "09", title: "Agreement", input: "Quote in the client's hands", output: "Agreed price and lead time, a finished order" },
  ] as Stage[],
  note: "Stages 07-09 are work on the deal itself. In the Leads format they stay on your side; in the full format I take them.",
};

const ru = {
  eyebrow: "Что вы получаете",
  h2: "Два формата, девять этапов",
  sub: "Разница только в том, где я передаю клиента: на первом предметном разговоре или на согласованных цене и сроках.",
  formats: [
    {
      range: "01 — 06",
      name: "Лиды",
      body: "Отбор, поиск контактов, письма, переписка, квалификация. Вы получаете клиента, который подтвердил потребность и готов обсуждать, вместе со всей историей переписки. Дальше работает ваш менеджер.",
    },
    {
      range: "01 — 09",
      name: "Лиды и сделка",
      body: "Всё то же плюс работа по самой сделке: уточнение спецификации, запрос условий у ваших поставщиков и партнёров, сбор расчёта и переписка до согласованных цены и сроков. Аккаунт-менеджер получает готовый заказ.",
    },
  ],
  formatNote: "Второй формат — если менеджеры и так завалены текущими заказами и лишний входящий им только мешает. Клиент при этом не ждёт, пока его передадут и перечитают переписку.",
  dealBadge: "Только сделка",
  colInput: "Вход",
  colOutput: "Выход",
  stages: [
    { num: "01", title: "Отбор", input: "Открытые реестры и критерии сегмента", output: "Компании с подтверждённым признаком потребности" },
    { num: "02", title: "Контакт", input: "Компания и её домен", output: "Имя, роль, проверенный рабочий адрес" },
    { num: "03", title: "Письмо", input: "Повод компании и ваш прайс", output: "Письмо под неё, согласованное с вами" },
    { num: "04", title: "Переписка", input: "Очередь согласованных писем", output: "Доставленное письмо и повторное касание через неделю" },
    { num: "05", title: "Разбор ответов", input: "Ответ клиента", output: "Понятно, что нужно, в каком объёме и когда" },
    { num: "06", title: "Передача", input: "Квалифицированный клиент", output: "Ваш менеджер получает клиента и всю переписку" },
    { num: "07", title: "Уточнение", input: "Первичный интерес", output: "Что, сколько, куда, к какому сроку" },
    { num: "08", title: "Условия", input: "Спецификация и ваши поставщики", output: "Собранные цены и сроки, готовый расчёт" },
    { num: "09", title: "Согласование", input: "Расчёт у клиента", output: "Согласованные цена и сроки, готовый заказ" },
  ] as Stage[],
  note: "Участки 07-09 — работа по самой сделке. В формате «Лиды» они остаются на вашей стороне, в полном формате их беру я.",
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
            key={i}
            variants={itemVariants}
            whileHover={cardHover}
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderTop: i === 1 ? "2px solid var(--c-gold)" : "1px solid var(--c-border)",
              borderRadius: 10,
              padding: 22,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "var(--c-gold)" }}>
              {f.range}
            </span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 20, color: "var(--c-heading)", margin: "8px 0 10px" }}>
              {f.name}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.7 }}>{f.body}</p>
          </motion.div>
        ))}
      </div>

      <Note>{t.formatNote}</Note>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" style={{ marginTop: 32 }}>
        {t.stages.map((s, i) => {
          const isDeal = i >= 6;
          return (
            <motion.div
              key={s.num}
              variants={itemVariants}
              whileHover={cardHover}
              style={{
                background: isDeal ? "var(--c-card2)" : "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderRadius: 10,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, letterSpacing: "0.15em", color: "var(--c-gold)" }}>
                  {s.num}
                </span>
                {isDeal && (
                  <span
                    style={{
                      fontFamily: MONO, fontSize: 8, fontWeight: 600, letterSpacing: "0.14em",
                      textTransform: "uppercase", color: "var(--c-muted)",
                      border: "1px solid var(--c-border2)", borderRadius: 3, padding: "2px 6px",
                    }}
                  >
                    {t.dealBadge}
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)" }}>{s.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  { k: t.colInput, v: s.input, dim: true },
                  { k: t.colOutput, v: s.output, dim: false },
                ].map((row) => (
                  <div key={row.k} className="flex gap-2">
                    <span
                      style={{
                        fontFamily: MONO, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase",
                        color: "var(--c-muted)", paddingTop: 3, minWidth: 34, flexShrink: 0,
                      }}
                    >
                      {row.k}
                    </span>
                    <span
                      style={{
                        fontFamily: SANS, fontSize: 12, lineHeight: 1.55,
                        color: row.dim ? "var(--c-text2)" : "var(--c-body)",
                      }}
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
