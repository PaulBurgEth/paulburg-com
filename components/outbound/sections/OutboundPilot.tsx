"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, T, itemVariants } from "../shared";

const en = {
  eyebrow: "The pilot",
  h2: "Six weeks to your own numbers",
  sub: "A fixed scope with numbers I commit to before we start, and a report that tells you what a client from this channel costs you.",
  figures: [
    { v: "600–900", l: "companies selected, each with a verified address" },
    { v: "800–1 200", l: "emails sent: first touch plus one follow-up" },
    { v: "< 5%", l: "delivery bounces, held for the whole run" },
    { v: "6", l: "weeks to a report with the full funnel and cost per client" },
  ],
  weeksTitle: "How the six weeks run",
  weeks: [
    { w: "1–2", t: "Setup", d: "Your current flow, segments, sources, first extract, filtering rules." },
    { w: "2–3", t: "First wave", d: "Selection, address verification. Copy goes to you for approval." },
    { w: "3–6", t: "Sending", d: "Stepped sending with bounce control, inbound triage, follow-ups." },
    { w: "6", t: "Report", d: "Funnel by segment, cost per client, what to change next." },
  ],
  deliverTitle: "What you hold at week six",
  deliver: "Your own conversion rate for every step of the funnel, the cost of a new client from this channel, and a per-segment list showing what each one returned.",
};

const ru = {
  eyebrow: "Пилот",
  h2: "Шесть недель до ваших цифр",
  sub: "Фиксированный объём с цифрами, под которыми я подписываюсь до старта, и отчёт, который показывает, во что вам обходится клиент из этого канала.",
  figures: [
    { v: "600–900", l: "компаний отобрано, у каждой проверенный адрес" },
    { v: "800–1 200", l: "писем: первое касание плюс одно повторное" },
    { v: "< 5%", l: "отказов доставки, удерживаются весь прогон" },
    { v: "6", l: "недель до отчёта с полной воронкой и стоимостью клиента" },
  ],
  weeksTitle: "Как идут шесть недель",
  weeks: [
    { w: "1–2", t: "Настройка", d: "Ваш текущий поток, сегменты, источники, первая выгрузка, правила отсева." },
    { w: "2–3", t: "Первая волна", d: "Отбор, проверка адресов. Тексты уходят вам на согласование." },
    { w: "3–6", t: "Отправка", d: "Переписка ступенями с контролем отказов, разбор входящих, повторные касания." },
    { w: "6", t: "Отчёт", d: "Воронка по сегментам, стоимость клиента, что менять дальше." },
  ],
  deliverTitle: "Что у вас на руках к шестой неделе",
  deliver: "Ваш собственный коэффициент по каждому шагу воронки, стоимость нового клиента из этого канала и список сегментов с отдачей по каждому.",
};

export default function OutboundPilot() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="07" id="pilot" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Commitments as figures — they were a text checklist and read as fine print. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 34 }}>
        {t.figures.map((f) => (
          <motion.div
            key={f.l}
            variants={itemVariants}
            style={{ background: "var(--c-card)", border: "1px solid rgba(200,169,110,0.22)", borderRadius: 10, padding: 20 }}
          >
            <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: "var(--c-gold)", lineHeight: 1.1, marginBottom: 9 }}>{f.v}</div>
            <div style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{f.l}</div>
          </motion.div>
        ))}
      </div>

      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 16 }}>{t.weeksTitle}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {t.weeks.map((w) => (
          <motion.div key={w.w} variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderTop: "2px solid rgba(200,169,110,0.35)", borderRadius: 10, padding: 20 }}>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-gold)" }}>
              {language === "ru" ? "Недели " : "Weeks "}{w.w}
            </span>
            <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "9px 0 8px" }}>{w.t}</h4>
            <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{w.d}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-gold)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 9 }}>{t.deliverTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: 780 }}>{t.deliver}</p>
      </div>
    </SectionShell>
  );
}
