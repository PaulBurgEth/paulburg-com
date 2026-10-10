"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "../shared";

const en = {
  eyebrow: "Commercials",
  h2: "How the money works",
  sub: "One fixed price for the pilot, paid a week at a time, with a decision before every week.",
  money: [
    { k: "Pilot", h: "One fixed price", d: "Four weeks, each paid in advance. Setup, research, the letters, LinkedIn and other channels where they fit, the correspondence and the weekly report are all inside it." },
    { k: "A way out every week", h: "You decide before each week", d: "Before each week you decide whether to pay for it. If you do not, the work stops there. At any moment what you have at risk is one week, not the whole pilot." },
    { k: "After the pilot", h: "Settled at week four", d: "By then you hold your own numbers for every step and you know what a client from this channel costs you. Terms for continuing are a conversation held on those numbers, not before them." },
  ],
  keepTitle: "What stays with you",
  keep: "The list of companies, the stop-list, every letter and message, the accounts the work ran through, and the funnel stage by stage — yours from day one.",
  railsTitle: "How you pay",
  rails: "A service agreement as an independent contractor. You pay the way you already pay contractors: an invoice through a payment platform your accounting accepts, with paperwork included.",
  note: "Full contract terms — attribution, exit — on request before we start.",
};

const ru = {
  eyebrow: "Условия",
  h2: "Как устроены деньги",
  sub: "Одна фиксированная цена за пилот, оплата по неделе, решение перед каждой неделей.",
  money: [
    { k: "Пилот", h: "Одна фиксированная цена", d: "Четыре недели, каждая оплачивается вперёд. Настройка, ресёрч, письма, LinkedIn и другие каналы там, где уместно, переписка и еженедельный отчёт входят в неё." },
    { k: "Выход каждую неделю", h: "Решаете перед каждой неделей", d: "Перед каждой неделей вы решаете, платить ли за неё. Не платите — работа на этом прекращается. В любой момент под риском у вас одна неделя, а не весь пилот." },
    { k: "После пилота", h: "Решается на четвёртой неделе", d: "К этому моменту у вас на руках свои цифры по каждому шагу и понимание, во сколько обходится клиент из этого канала. Условия продолжения обсуждаются на этих цифрах, а не до них." },
  ],
  keepTitle: "Что остаётся у вас",
  keep: "Список компаний, стоп-лист, все тексты писем и сообщений, аккаунты, через которые шла работа, и воронка по этапам — ваши с первого дня.",
  railsTitle: "Чем платить",
  rails: "Договор на оказание услуг с независимым подрядчиком. Платите так же, как обычно платите подрядчикам: счёт через платёжную платформу, с документами для бухгалтерии.",
  note: "Полные условия договора — атрибуция, выход — по запросу до старта.",
};

export default function OutboundTerms() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="10" id="terms" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.money.map((m) => (
          <motion.div key={m.k} variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderTop: "2px solid var(--c-gold)", borderRadius: 10, padding: 22 }}>
            <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text2)" }}>{m.k}</span>
            <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: 21, color: "var(--c-gold)", margin: "9px 0 10px", lineHeight: 1.3 }}>{m.h}</h3>
            <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{m.d}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 20, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-sage)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 8 }}>{t.keepTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>{t.keep}</p>
      </div>

      <div style={{ marginTop: 12, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-border2)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 8 }}>{t.railsTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>{t.rails}</p>
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
