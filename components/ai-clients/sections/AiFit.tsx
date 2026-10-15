"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";

const en = {
  eyebrow: "Who it fits",
  h2: "The example is real estate. The work is not limited to it.",
  cols: ["Business", "AI answers", "AI Sales Manager", "Why"],
  rows: [
    ["Real estate for foreigners", "Yes", "Strong", "Buyer in another time zone, writes in the evening, large deal"],
    ["Clinics with high-value treatments", "Yes", "Strong", "The patient chooses today; replaces a chat that waits for an operator"],
    ["Lawyers, schools, tours, yacht charters", "Yes", "Yes", "Buyers ask for «the best in town», inquiries in the evening"],
    ["Prep centres and 3PL", "Yes", "Weaker", "B2B, inquiries in working hours, decided over days"],
  ],
  test: "The AI Sales Manager pays off when one client is expensive, inquiries come outside working hours, and buyers need sorting before the call.",
  notFit: "Not a fit: every client comes by referral and nobody asks around, or the site gets no visitors.",
};

const ru = {
  eyebrow: "Кому подходит",
  h2: "Пример из недвижимости. Работа не только в ней.",
  cols: ["Бизнес", "AI-ответы", "AI-продавец", "Почему"],
  rows: [
    ["Недвижимость для иностранцев", "Да", "Сильно", "Покупатель в другом часовом поясе, пишет вечером, крупная сделка"],
    ["Клиники с дорогой услугой", "Да", "Сильно", "Пациент выбирает сегодня; заменяет чат, который ждёт оператора"],
    ["Юристы, школы, туры, яхты", "Да", "Да", "Ищут «лучших в городе», заявки вечером"],
    ["Prep-центры и 3PL", "Да", "Слабее", "B2B, заявки в рабочее время, решают за дни"],
  ],
  test: "AI-продавец окупается, когда один клиент дорогой, заявки приходят вне рабочих часов и покупателей нужно отсеивать до разговора.",
  notFit: "Не подходит: все клиенты по рекомендации и никто не ищет, или на сайт никто не приходит.",
};

const strong = new Set(["Strong", "Сильно"]);

export default function AiFit() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const cell = { fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", padding: "14px 12px", borderTop: "1px solid var(--c-border)", verticalAlign: "top" as const, lineHeight: 1.5 };

  return (
    <SectionShell num="08">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} />

      {/* Desktop: the page's one real table. Mobile: one stacked card per row. */}
      <motion.div variants={itemVariants} className="hidden md:block">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {t.cols.map((c) => (
                <th key={c} scope="col" style={{ textAlign: "left", fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-muted)", fontWeight: 400, padding: "0 12px 10px" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => (
              <tr key={r[0]}>
                <th scope="row" style={{ ...cell, textAlign: "left", color: "var(--c-heading)", fontWeight: 600 }}>{r[0]}</th>
                <td style={cell}>{r[1]}</td>
                <td style={{ ...cell, color: strong.has(r[2]) ? "var(--c-gold)" : cell.color, fontWeight: strong.has(r[2]) ? 600 : 400 }}>{r[2]}</td>
                <td style={{ ...cell, color: "var(--c-text2)" }}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <div className="md:hidden flex flex-col gap-3">
        {t.rows.map((r) => (
          <motion.div key={r[0]} variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: T.body, color: "var(--c-heading)", marginBottom: 8 }}>{r[0]}</div>
            <div style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-text2)", marginBottom: 6 }}>
              {t.cols[1]}: {r[1]} · {t.cols[2]}: <span style={{ color: strong.has(r[2]) ? "var(--c-gold)" : undefined }}>{r[2]}</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{r[3]}</div>
          </motion.div>
        ))}
      </div>

      <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, marginTop: 24, maxWidth: "68ch" }}>{t.test}</p>
      <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-text2)", lineHeight: 1.65, marginTop: 10, maxWidth: "68ch", borderLeft: "2px solid var(--c-border2)", paddingLeft: 14 }}>{t.notFit}</p>
    </SectionShell>
  );
}
