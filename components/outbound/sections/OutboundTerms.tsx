"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, T, itemVariants } from "../shared";

const en = {
  eyebrow: "Commercials",
  h2: "How the money works",
  sub: "Three parts, none of them a surprise later.",
  money: [
    { k: "Pilot", h: "Fixed fee, six weeks", d: "Half at the start, half on completion. Covers setup, segmentation, sourcing, correspondence and the report." },
    { k: "Ongoing", h: "Monthly retainer", d: "Depends on format, volume and how many languages are in play." },
    { k: "Result share", h: "10–20% of gross profit", d: "On clients I brought, for the first 12 months of each relationship, then it stops." },
  ],
  keepTitle: "What stays with you",
  keep: "Domains, mailboxes, the database of selected companies, the stop-list and all copy — on your accounts from day one.",
  note: "Full contract terms — attribution, exclusivity, exit — on request before we start.",
};

const ru = {
  eyebrow: "Условия",
  h2: "Как устроены деньги",
  sub: "Три составляющие, и ни одна не становится сюрпризом потом.",
  money: [
    { k: "Пилот", h: "Фиксированная стоимость, шесть недель", d: "Половина на старте, половина по завершении. Покрывает настройку, сегментацию, поиск, переписку и отчёт." },
    { k: "Дальше", h: "Ежемесячный фикс", d: "Зависит от формата, объёма и числа языков." },
    { k: "Доля с результата", h: "10–20% от валовой прибыли", d: "По клиентам, которых привёл я, первые 12 месяцев работы с каждым, дальше не начисляется." },
  ],
  keepTitle: "Что остаётся у вас",
  keep: "Домены, ящики, база отобранных компаний, стоп-лист и все тексты — на ваших аккаунтах с первого дня.",
  note: "Полные условия договора — атрибуция, эксклюзивность, выход — по запросу до старта.",
};

export default function OutboundTerms() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="08" id="terms">
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

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
