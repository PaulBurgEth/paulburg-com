"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, itemVariants } from "../shared";

const en = {
  eyebrow: "The email",
  h2: "The trigger writes the email",
  sub: "Nothing is sent without a reason attached to that specific company. The reason also decides who inside the company receives it.",
  disclaimer: "These six come from one segment — sourcing and logistics. Your segment gets its own list in week one: the mechanic is the same, the events are not.",
  cols: ["Event", "Where I see it", "What the email is about", "Who gets it"],
  rows: [
    { a: "Changed supplier", b: "A new shipper against the same buyer. Window of 30-60 days", c: "An audit of the new supplier before the first large order", d: "Whoever owns quality" },
    { a: "Moved sourcing to another country", b: "A shipper from a country that never appeared before", c: "Sourcing in the new market and a rebuilt shipping scheme", d: "Whoever owns procurement" },
    { a: "Outgrew small parcels", b: "Direct-shipping signals on the storefront, 10-20 day delivery times", c: "Consolidation, freight, customs, warehousing", d: "Whoever owns logistics" },
    { a: "Lost a batch to defects", b: "A fresh entry in the recall registry", c: "An acceptance protocol that catches that class of defect", d: "Whoever owns quality" },
    { a: "Returns are rising", b: "Rating drop and breakage complaints on one product", c: "A pre-shipment conformity check against the listing", d: "Whoever owns the product" },
    { a: "First purchase ever", b: "Trademark filed, no activity on record", c: "Sourcing from zero — arriving before competitors", d: "The founder" },
  ],
  sampleTitle: "What one of these emails looks like",
  sampleMeta: ["To: founder, home goods brand", "Reason: new supplier since April, two shipments"],
  subject: "Subject: New supplier since April",
  body: [
    "Saw [Company] switched to a new [supplier] around April — first two shipments already landed.",
    "We are on the ground where your factories are. Inspection is live: you join by video and watch the cartons opened.",
    "Then the same team moves the shipment door to door, customs included. One chain, one invoice, instead of four vendors who blame each other.",
    "Worth a look at your next order?",
  ],
  annotations: ["One fact they can verify", "One specific offer", "One question, no pitch", "No attachment, no deck"],
  note: "Sources update at different speeds, so a reason is written to while it is still fresh. The addressee changes with the trigger: a supplier change goes to quality, a jump in volume goes to logistics.",
};

const ru = {
  eyebrow: "Письмо",
  h2: "Письмо пишет триггер",
  sub: "Ничего не отправляется без повода, привязанного к конкретной компании. Повод определяет и то, кто внутри компании получит письмо.",
  disclaimer: "Эти шесть — из одного сегмента, сорсинг и логистика. Для вашего сегмента список составляется в первую неделю: механика та же, события другие.",
  cols: ["Событие", "Где я его вижу", "О чём письмо", "Кому"],
  rows: [
    { a: "Сменили поставщика", b: "Новый отправитель при том же покупателе. Окно 30-60 дней", c: "Аудит нового поставщика до первой крупной партии", d: "Кто отвечает за качество" },
    { a: "Перенесли закупку в другую страну", b: "Впервые появился отправитель из страны, которой раньше не было", c: "Поиск поставщика на новом рынке и новая схема отгрузки", d: "Кто отвечает за закупки" },
    { a: "Переросли мелкие отправления", b: "Признаки прямой отгрузки на витрине, сроки доставки 10-20 дней", c: "Консолидация, фрахт, таможня, склад", d: "Кто отвечает за логистику" },
    { a: "Потеряли партию на браке", b: "Свежая запись в реестре отзывов", c: "Протокол приёмки, который ловит этот класс дефектов", d: "Кто отвечает за качество" },
    { a: "Растут возвраты", b: "Падение рейтинга и жалобы на поломки по одному товару", c: "Проверка соответствия партии карточке до отгрузки", d: "Кто отвечает за продукт" },
    { a: "Первая закупка вообще", b: "Товарный знак зарегистрирован, активности нет", c: "Сорсинг с нуля — заходим раньше конкурентов", d: "Основатель" },
  ],
  sampleTitle: "Как выглядит одно из таких писем",
  sampleMeta: ["Кому: основатель, бренд товаров для дома", "Повод: новый поставщик с апреля, две отгрузки"],
  subject: "Тема: Новый поставщик с апреля",
  body: [
    "Увидел, что [Компания] с апреля перешла на нового [поставщика] — первые две отгрузки уже пришли.",
    "Мы находимся там же, где ваши фабрики. Инспекция идёт в прямом эфире: вы подключаетесь по видео и смотрите, как вскрывают коробки.",
    "Дальше та же команда везёт партию от двери до двери, вместе с таможней. Одна цепочка и один счёт вместо четырёх подрядчиков, которые кивают друг на друга.",
    "Посмотрим на вашем следующем заказе?",
  ],
  annotations: ["Один проверяемый факт", "Одно конкретное предложение", "Один вопрос, без питча", "Ни вложений, ни презентаций"],
  note: "Источники обновляются с разной скоростью, поэтому письмо уходит, пока повод свежий. Адресат меняется вместе с триггером: смена поставщика идёт тому, кто отвечает за качество, рост объёмов — тому, кто считает логистику.",
};

export default function OutboundTriggers() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const GRID = "grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr_1.2fr_0.8fr]";

  return (
    <SectionShell num="05">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <p
        style={{
          fontFamily: SANS, fontSize: 13, lineHeight: 1.7, color: "var(--c-text2)",
          background: "var(--c-card2)", border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-gold)", borderRadius: 8,
          padding: "12px 16px", marginBottom: 24, maxWidth: 760,
        }}
      >
        {t.disclaimer}
      </p>

      <div role="table" style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}>
        <div
          role="row"
          className={`hidden sm:grid sm:grid-cols-[0.9fr_1.1fr_1.2fr_0.8fr]`}
          style={{ background: "var(--c-card2)", borderBottom: "1px solid var(--c-border)" }}
        >
          {t.cols.map((c) => (
            <div
              key={c}
              role="columnheader"
              style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--c-muted)", padding: "10px 14px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        {t.rows.map((row, i) => (
          <motion.div
            key={i}
            role="row"
            variants={itemVariants}
            className={GRID}
            style={{
              background: i % 2 ? "var(--c-card2)" : "var(--c-card)",
              borderTop: i ? "1px solid var(--c-border)" : "none",
              padding: "14px 0",
            }}
          >
            {[
              { k: t.cols[0], v: row.a, strong: true },
              { k: t.cols[1], v: row.b, strong: false },
              { k: t.cols[2], v: row.c, strong: false },
              { k: t.cols[3], v: row.d, strong: false, mono: true },
            ].map((cell) => (
              <div key={cell.k} role="cell" style={{ padding: "4px 14px" }}>
                <span
                  // block/sm:hidden must be classes, not an inline display:
                  // an inline style would beat the sm: breakpoint rule.
                  className="block sm:hidden"
                  style={{
                    fontFamily: MONO, fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--c-muted)", marginBottom: 2,
                  }}
                >
                  {cell.k}
                </span>
                <span
                  style={{
                    fontFamily: cell.mono ? MONO : SANS,
                    fontSize: cell.mono ? 11.5 : 12.5,
                    fontWeight: cell.strong ? 600 : 400,
                    color: cell.strong ? "var(--c-heading)" : cell.mono ? "var(--c-text2)" : "var(--c-body)",
                    lineHeight: 1.6,
                  }}
                >
                  {cell.v}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Sample email */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.sampleTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-4">
        <div style={{ background: "var(--c-card2)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 14 }}>
            {t.sampleMeta.map((m) => (
              <span key={m} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "var(--c-muted)" }}>
                {m}
              </span>
            ))}
          </div>
          <p
            style={{
              fontFamily: MONO, fontSize: 12, fontWeight: 600, color: "var(--c-heading)",
              paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid var(--c-border)",
            }}
          >
            {t.subject}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.body.map((line, i) => (
              <p key={i} style={{ fontFamily: SANS, fontSize: 13.5, color: "var(--c-body)", lineHeight: 1.7 }}>
                {line.split(/(\[[^\]]+\])/g).map((part, j) =>
                  part.startsWith("[") ? (
                    <span key={j} style={{ color: "var(--c-gold)", fontWeight: 600 }}>{part}</span>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {t.annotations.map((a, i) => (
            <li
              key={i}
              className="flex gap-3 items-start"
              style={{
                background: "var(--c-card)", border: "1px solid var(--c-border)",
                borderRadius: 8, padding: "12px 14px",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--c-gold)", letterSpacing: "0.12em", flexShrink: 0, paddingTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.55 }}>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
