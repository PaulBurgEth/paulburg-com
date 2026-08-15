"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, itemVariants } from "../shared";

const en = {
  eyebrow: "Reputation",
  h2: "Eight rules that protect your name",
  sub: "There are two ways to ruin this: write to the wrong person, or drop the mail into spam. Both damage your brand, not mine. So the rules are fixed before the first send.",
  rules: [
    { t: "Your own clients never get a cold email", d: "You set the exclusion list, by domain or by name. Anything on it drops out of every send, permanently." },
    { t: "One company, one email", d: "Deduplicated across the whole database, not within a batch. A company cannot receive two emails from two different segments." },
    { t: "Competitors and intermediaries are filtered out", d: "Before sending, by line of business. The list is agreed with you and extended as we go." },
    { t: "Every address is verified before sending", d: "Dead mailboxes are removed before the send, so they never touch your bounce rate." },
    { t: "Volume ramps in steps", d: "Each step only after bounces have been checked. Above the threshold, sending pauses automatically until it has been looked at." },
    { t: "Unsubscribe is absolute", d: "It blocks the company's whole domain, not one address. Permanently, no exceptions." },
    { t: "Every email is unique", d: "Each batch is checked against everything already sent. Near-identical texts do not go out." },
    { t: "Positioning stays yours", d: "Copy, prices and service wording are approved by you before the first send, and again at every new segment." },
  ],
  evidenceTitle: "Not theory — from pilot A",
  evidence: [
    { v: "4", l: "times sending paused in a month, each time before bounces reached the domain" },
    { v: "5", l: "unsubscribes across 1 500+ emails" },
    { v: "0", l: "spam-button complaints" },
  ],
  note: "Volume on that pilot settled at 180 emails a day. More is possible; the ceiling is how many suitable companies exist in the segment, not the technique. It goes up the same way — in steps, with bounces checked at each one.",
};

const ru = {
  eyebrow: "Репутация",
  h2: "Восемь правил, которые защищают ваше имя",
  sub: "Испортить всё можно двумя способами: написать не тому человеку или уронить почту в спам. И то и другое ударит по вашему бренду, не по моему. Поэтому правила фиксируются до первой отправки.",
  rules: [
    { t: "Ваши клиенты не получат холодное письмо", d: "Список исключений задаёте вы — доменами или названиями. Всё, что в нём, выпадает из рассылки навсегда." },
    { t: "Одна компания — одно письмо", d: "Сквозная сверка по всей базе, а не внутри партии. Компания не получит два письма из разных сегментов." },
    { t: "Конкуренты и посредники отсеиваются", d: "До отправки, по роду деятельности. Список согласуем с вами и дополняем по ходу." },
    { t: "Адрес проверяется до письма", d: "Мёртвые ящики отсеиваются до отправки, чтобы они не портили вашу статистику отказов." },
    { t: "Темп поднимается ступенями", d: "Каждая ступень — только после проверки отказов. При превышении порога отправка автоматически встаёт на паузу до разбора." },
    { t: "Отписка — закон", d: "Блокирует не адрес, а весь домен компании. Навсегда, без исключений." },
    { t: "Каждое письмо уникально", d: "Партия сверяется со всем, что уже ушло. Похожие тексты не отправляются." },
    { t: "Позиционирование за вами", d: "Тексты, цены и формулировки услуг согласуются с вами до первой отправки и при каждом новом сегменте." },
  ],
  evidenceTitle: "Не теория — из пилота A",
  evidence: [
    { v: "4", l: "раза отправка вставала на паузу за месяц, каждый раз до того, как отказы дошли до домена" },
    { v: "5", l: "отписок на 1 500+ писем" },
    { v: "0", l: "жалоб через кнопку «спам»" },
  ],
  note: "На том пилоте остановились на 180 письмах в день. Больше можно: потолок — сколько подходящих компаний есть в сегменте, а не техника. Поднимается так же, ступенями и с проверкой отказов на каждой.",
};

export default function OutboundRules() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="07">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {t.rules.map((r, i) => (
          <motion.div
            key={r.t}
            variants={itemVariants}
            className="flex gap-4"
            style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 18 }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em",
                color: "var(--c-gold)", flexShrink: 0, paddingTop: 2,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)", marginBottom: 6, lineHeight: 1.35 }}>
                {r.t}
              </h3>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.65 }}>{r.d}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24, background: "var(--c-card2)", border: "1px solid var(--c-border)",
          borderRadius: 10, padding: 22,
        }}
      >
        <span
          style={{
            fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-gold)", display: "block", marginBottom: 16,
          }}
        >
          {t.evidenceTitle}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {t.evidence.map((e) => (
            <div key={e.l} className="flex items-baseline gap-3">
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: "var(--c-gold)", lineHeight: 1, flexShrink: 0 }}>
                {e.v}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.55 }}>{e.l}</span>
            </div>
          ))}
        </div>
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
