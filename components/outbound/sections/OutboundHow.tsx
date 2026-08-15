"use client";

import { motion } from "framer-motion";
import { Ship, Gavel, Building2, BadgeCheck, ShieldAlert, Store, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, MidCTA, SERIF, SANS, MONO, T, tagStyle, itemVariants } from "../shared";

const ICONS = [Ship, Gavel, Building2, BadgeCheck, ShieldAlert, Store];

const en = {
  eyebrow: "How it works",
  h2: "Every email has a reason attached to that company",
  sub: "Nothing goes out as a template. Something happened at the company, it is on public record, and the email is about that.",
  sampleMeta: ["To: founder, home goods brand", "Reason: new supplier since April, two shipments"],
  subject: "Subject: New supplier since April",
  body: [
    "Saw [Company] switched to a new [supplier] around April — first two shipments already landed.",
    "We are on the ground where your factories are. Inspection is live: you join by video and watch the cartons opened.",
    "Then the same team moves the shipment door to door, customs included. One chain, one invoice.",
    "Worth a look at your next order?",
  ],
  annotations: ["One fact they can verify", "One specific offer", "One question, no pitch", "No attachment, no deck"],
  triggerTitle: "Where the reason comes from",
  triggerCols: ["Event", "What the email is about", "Who gets it"],
  triggers: [
    { a: "Changed supplier", b: "An audit before the first large order", c: "Whoever owns quality" },
    { a: "Moved sourcing abroad", b: "Sourcing in the new market", c: "Whoever owns procurement" },
    { a: "Lost a batch to defects", b: "An acceptance protocol for that defect", c: "Whoever owns quality" },
    { a: "First purchase ever", b: "Sourcing from zero, before competitors", c: "The founder" },
  ],
  sourceTitle: "Where the companies come from",
  sources: [
    { name: "Trade & shipping records", cadence: "2–4 wk lag" },
    { name: "Procurement & tender boards", cadence: "Daily" },
    { name: "Company & seller registries", cadence: "Weekly" },
    { name: "Trademark & brand filings", cadence: "Weekly" },
    { name: "Recall & safety registries", cadence: "Daily" },
    { name: "Catalogs & storefronts", cadence: "2–4 wk lag" },
  ],
  sourceNote: "Registries refresh at different speeds, so a reason that appears on Monday is written to the same week.",
  fitTitle: "Does this fit your business?",
  fit: [
    "You sell to businesses",
    "The purchase is considered, not impulsive",
    "The buyer is an identifiable legal entity",
    "The deal justifies a month of correspondence",
    "The buying event leaves a public trace",
  ],
  segTitle: "Where the channel applies",
  segments: ["Metals & industrial supply", "Sourcing & logistics", "Equipment & components", "Contract manufacturing", "Named-account B2B services"],
  ctaNote: "Want the trigger list for your segment?",
  cta: "Ask for it →",
};

const ru = {
  eyebrow: "Как это работает",
  h2: "У каждого письма есть повод, привязанный к этой компании",
  sub: "Ничего не уходит шаблоном. В компании что-то произошло, это есть в открытых данных, и письмо именно об этом.",
  sampleMeta: ["Кому: основатель, бренд товаров для дома", "Повод: новый поставщик с апреля, две отгрузки"],
  subject: "Тема: Новый поставщик с апреля",
  body: [
    "Увидел, что [Компания] с апреля перешла на нового [поставщика] — первые две отгрузки уже пришли.",
    "Мы находимся там же, где ваши фабрики. Инспекция идёт в прямом эфире: подключаетесь по видео и смотрите, как вскрывают коробки.",
    "Дальше та же команда везёт партию от двери до двери, вместе с таможней. Одна цепочка, один счёт.",
    "Посмотрим на вашем следующем заказе?",
  ],
  annotations: ["Один проверяемый факт", "Одно конкретное предложение", "Один вопрос, без питча", "Ни вложений, ни презентаций"],
  triggerTitle: "Откуда берётся повод",
  triggerCols: ["Событие", "О чём письмо", "Кому"],
  triggers: [
    { a: "Сменили поставщика", b: "Аудит до первой крупной партии", c: "Кто отвечает за качество" },
    { a: "Перенесли закупку в другую страну", b: "Поиск поставщика на новом рынке", c: "Кто отвечает за закупки" },
    { a: "Потеряли партию на браке", b: "Протокол приёмки под этот дефект", c: "Кто отвечает за качество" },
    { a: "Первая закупка вообще", b: "Сорсинг с нуля, раньше конкурентов", c: "Основатель" },
  ],
  sourceTitle: "Откуда берутся компании",
  sources: [
    { name: "Таможенные и грузовые записи", cadence: "Задержка 2–4 нед" },
    { name: "Закупочные и тендерные площадки", cadence: "Ежедневно" },
    { name: "Реестры компаний и продавцов", cadence: "Еженедельно" },
    { name: "Реестры товарных знаков", cadence: "Еженедельно" },
    { name: "Реестры отзывов и брака", cadence: "Ежедневно" },
    { name: "Каталоги и витрины магазинов", cadence: "Задержка 2–4 нед" },
  ],
  sourceNote: "Реестры обновляются с разной скоростью, поэтому повод, появившийся в понедельник, отрабатывается на той же неделе.",
  fitTitle: "Подходит ли это вашему бизнесу?",
  fit: [
    "Вы продаёте бизнесу",
    "Покупка обдуманная, а не импульсная",
    "Покупатель — идентифицируемое юрлицо",
    "Сделка окупает месяц переписки",
    "Событие покупки оставляет публичный след",
  ],
  segTitle: "Где канал применим",
  segments: ["Металлы и промснабжение", "Сорсинг и логистика", "Оборудование и комплектующие", "Контрактное производство", "B2B-услуги с поимённым таргетом"],
  ctaNote: "Нужен список триггеров под ваш сегмент?",
  cta: "Запросить →",
};

export default function OutboundHow() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="04" id="how">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* The artifact first — it convinces faster than any explanation. */}
      <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-4">
        <motion.div variants={itemVariants} style={{ background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-gold)", borderRadius: 10, padding: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 14 }}>
            {t.sampleMeta.map((m) => (
              <span key={m} style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.06em", color: "var(--c-text2)" }}>{m}</span>
            ))}
          </div>
          <p style={{ fontFamily: MONO, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-heading)", paddingBottom: 13, marginBottom: 15, borderBottom: "1px solid var(--c-border)" }}>
            {t.subject}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {t.body.map((line, i) => (
              <p key={i} style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65 }}>
                {line.split(/(\[[^\]]+\])/g).map((part, j) =>
                  part.startsWith("[") ? <span key={j} style={{ color: "var(--c-gold)", fontWeight: 600 }}>{part}</span> : <span key={j}>{part}</span>,
                )}
              </p>
            ))}
          </div>
        </motion.div>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {t.annotations.map((a, i) => (
            <li key={i} className="flex gap-3 items-start" style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 8, padding: "13px 15px" }}>
              <span style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-gold)", letterSpacing: "0.1em", flexShrink: 0, paddingTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Triggers — four, not six; the event and the addressee are the point. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 14px" }}>
        {t.triggerTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {t.triggers.map((row, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 20 }}
          >
            <div className="flex items-baseline gap-3" style={{ marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.14em", color: "var(--c-gold)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: T.h3, fontWeight: 700, color: "var(--c-heading)", lineHeight: 1.3 }}>
                {row.a}
              </span>
            </div>
            <div className="flex items-start gap-2" style={{ marginBottom: 10 }}>
              <span aria-hidden="true" style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-gold)", flexShrink: 0, paddingTop: 2 }}>→</span>
              <span style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.55 }}>{row.b}</span>
            </div>
            <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-text2)" }}>
              {t.triggerCols[2]}: {row.c}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Sources — labels and refresh cadence only; the cadence is the argument. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 14px" }}>
        {t.sourceTitle}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {t.sources.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div key={s.name} variants={itemVariants} className="flex items-center gap-3" style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: "14px 16px" }}>
              <span className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)", flexShrink: 0 }}>
                <Icon size={16} color="var(--c-gold)" />
              </span>
              <span className="min-w-0">
                <span style={{ fontFamily: SANS, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-heading)", display: "block", lineHeight: 1.35 }}>{s.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text2)" }}>{s.cadence}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
      <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", lineHeight: 1.6, marginTop: 16, maxWidth: 720 }}>
        {t.sourceNote}
      </p>

      {/* Self-qualification */}
      <div style={{ marginTop: 38, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 24 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 16 }}>{t.fitTitle}</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {t.fit.map((f, i) => {
            const last = i === t.fit.length - 1;
            return (
              <li key={f} className="flex gap-3" style={{ gridColumn: last ? "1 / -1" : undefined }}>
                <Check size={15} color={last ? "var(--c-gold)" : "var(--c-sage)"} style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontFamily: SANS, fontSize: T.body, lineHeight: 1.55, color: last ? "var(--c-heading)" : "var(--c-body)", fontWeight: last ? 600 : 400 }}>{f}</span>
              </li>
            );
          })}
        </ul>
        <div style={{ borderTop: "1px solid var(--c-border)", marginTop: 20, paddingTop: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-text2)" }}>{t.segTitle}</span>
          <div className="flex flex-wrap gap-2" style={{ marginTop: 11 }}>
            {t.segments.map((s) => <span key={s} style={tagStyle}>{s}</span>)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
