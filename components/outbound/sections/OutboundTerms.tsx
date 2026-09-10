"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, T, itemVariants } from "../shared";

const en = {
  eyebrow: "Commercials",
  h2: "How the money works",
  sub: "One fixed price for the pilot, and three chances to stop paying it.",
  money: [
    { k: "Pilot", h: "One fixed price", d: "Paid in thirds, each one two weeks ahead of the work it covers. Setup, segmentation, sourcing, the correspondence and the report are all inside it." },
    { k: "Three exit points", h: "You decide twice more", d: "After each two weeks you decide whether to pay the next third. If you do not, the work stops there. At any moment what you have at risk is a third, not the whole thing." },
    { k: "After the pilot", h: "Settled at week six", d: "By then you hold your own numbers for every step and you know what a client from this channel costs you. Terms for continuing are a conversation held on those numbers, not before them." },
  ],
  keepTitle: "What stays with you",
  keep: "Domains, mailboxes, the database of selected companies, the stop-list and all copy — on your accounts from day one.",
  railsTitle: "How you pay",
  rails: "Bank transfer, USDT or USDC, or a proper invoice through an invoicing service if your accounting needs the paperwork. Contractor agreement either way. \"We need an invoice\" has never been the reason this did not happen.",
  note: "Full contract terms — attribution, exclusivity, exit — on request before we start.",
};

const ru = {
  eyebrow: "Условия",
  h2: "Как устроены деньги",
  sub: "Одна фиксированная цена за пилот и три возможности перестать её платить.",
  money: [
    { k: "Пилот", h: "Одна фиксированная цена", d: "Оплата третями, каждая — за две недели вперёд той работы, которую покрывает. Настройка, сегментация, поиск, переписка и отчёт входят в неё." },
    { k: "Три точки выхода", h: "Решаете ещё дважды", d: "После каждых двух недель вы решаете, платить ли следующую треть. Не платите — работа на этом прекращается. В любой момент под риском у вас треть, а не вся сумма." },
    { k: "После пилота", h: "Решается на шестой неделе", d: "К этому моменту у вас на руках свои цифры по каждому шагу и понимание, во сколько обходится клиент из этого канала. Условия продолжения обсуждаются на этих цифрах, а не до них." },
  ],
  keepTitle: "Что остаётся у вас",
  keep: "Домены, ящики, база отобранных компаний, стоп-лист и все тексты — на ваших аккаунтах с первого дня.",
  railsTitle: "Чем платить",
  rails: "Банковский перевод, USDT или USDC, либо счёт через сервис выставления, если вашей бухгалтерии нужен документ. Договор подряда в любом случае. «Нам нужен инвойс» ещё ни разу не было причиной, по которой это не состоялось.",
  note: "Полные условия договора — атрибуция, эксклюзивность, выход — по запросу до старта.",
};

export default function OutboundTerms() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="10" id="terms" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.money.map((m) => (
          <motion.div key={m.k} variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderTop: "2px solid rgba(200,169,110,0.35)", borderRadius: 10, padding: 22 }}>
            <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-text2)" }}>{m.k}</span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 19, color: "var(--c-gold)", margin: "9px 0 10px", lineHeight: 1.3 }}>{m.h}</h3>
            <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{m.d}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 20, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-sage)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 8 }}>{t.keepTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: 780 }}>{t.keep}</p>
      </div>

      <div style={{ marginTop: 12, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-border2)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 8 }}>{t.railsTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: 780 }}>{t.rails}</p>
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
