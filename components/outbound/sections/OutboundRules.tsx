"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Ban, GitCompareArrows, GaugeCircle, PenLine } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, T, itemVariants } from "../shared";

const ICONS = [ShieldCheck, Ban, GitCompareArrows, GaugeCircle, PenLine];

const en = {
  eyebrow: "Your domain",
  h2: "Five rules that protect your name",
  sub: "Writing to the wrong person or dropping into spam damages your brand, not mine. So the rules are fixed before the first send.",
  rules: [
    { t: "Your own clients never get a cold email", d: "You set the exclusion list. Anything on it drops out of every send, permanently." },
    { t: "Unsubscribe is absolute", d: "It blocks the company's whole domain, not one address. No exceptions." },
    { t: "One company, one email", d: "Deduplicated across the whole database, so no one is contacted twice from two segments." },
    { t: "Volume ramps in steps", d: "Each step only after bounces are checked. Above the threshold, sending pauses automatically." },
    { t: "Positioning stays yours", d: "Copy, prices and service wording are approved by you before the first send." },
  ],
  evidenceTitle: "On the metals project",
  evidence: [
    { v: "4", l: "times sending paused, each before bounces reached the domain" },
    { v: "5", l: "unsubscribes across 1 500+ emails" },
    { v: "0", l: "spam-button complaints" },
  ],
};

const ru = {
  eyebrow: "Ваш домен",
  h2: "Пять правил, которые защищают ваше имя",
  sub: "Письмо не тому человеку или падение в спам ударят по вашему бренду, не по моему. Поэтому правила фиксируются до первой отправки.",
  rules: [
    { t: "Ваши клиенты не получат холодное письмо", d: "Список исключений задаёте вы. Всё, что в нём, выпадает из рассылки навсегда." },
    { t: "Отписка — закон", d: "Блокирует не адрес, а весь домен компании. Без исключений." },
    { t: "Одна компания — одно письмо", d: "Сквозная сверка по всей базе: никто не получит два письма из разных сегментов." },
    { t: "Темп поднимается ступенями", d: "Каждая ступень — только после проверки отказов. При превышении порога отправка встаёт на паузу." },
    { t: "Позиционирование за вами", d: "Тексты, цены и формулировки услуг согласуются с вами до первой отправки." },
  ],
  evidenceTitle: "На проекте по металлопрокату",
  evidence: [
    { v: "4", l: "раза отправка вставала на паузу, каждый раз до того, как отказы дошли до домена" },
    { v: "5", l: "отписок на 1 500+ писем" },
    { v: "0", l: "жалоб через кнопку «спам»" },
  ],
};

export default function OutboundRules() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="06">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {t.rules.map((r, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={r.t}
              variants={itemVariants}
              className="flex gap-4"
              style={{
                background: "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderRadius: 10,
                padding: 20,
                gridColumn: i === t.rules.length - 1 ? "1 / -1" : undefined,
              }}
            >
              <span className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)", flexShrink: 0 }}>
                <Icon size={16} color="var(--c-gold)" />
              </span>
              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 6, lineHeight: 1.3 }}>{r.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{r.d}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ marginTop: 24, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 24 }}>
        <span style={{ fontFamily: "var(--font-inconsolata), monospace", fontSize: T.caption, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-gold)", display: "block", marginBottom: 18 }}>
          {t.evidenceTitle}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.evidence.map((e) => (
            <div key={e.l} className="flex items-baseline gap-3">
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, color: "var(--c-gold)", lineHeight: 1, flexShrink: 0 }}>{e.v}</span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{e.l}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
