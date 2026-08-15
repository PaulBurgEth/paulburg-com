"use client";

import { motion } from "framer-motion";
import { Ship, Gavel, Building2, BadgeCheck, ShieldAlert, Store, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, tagStyle, cardHover, itemVariants } from "../shared";

const ICONS = [Ship, Gavel, Building2, BadgeCheck, ShieldAlert, Store];

const en = {
  eyebrow: "Data",
  h2: "Where the list comes from",
  sub: "No single registry covers everyone, so the sources deliberately overlap. Companies that show up in several at once go to the top of the queue.",
  fitTitle: "Does this fit your business?",
  fitLede: "Five conditions. The last one is the real filter.",
  fit: [
    "You sell to businesses, not consumers",
    "The purchase is considered, not impulsive",
    "The buyer is an identifiable legal entity",
    "The deal is large enough to justify a month of correspondence",
    "The buying event leaves a public trace",
  ],
  fitNote: "If the fifth is not true for your market, say so early — that is the condition this channel cannot work around.",
  segTitle: "Segments already worked",
  segments: ["Metals & industrial supply", "Sourcing & logistics", "Equipment & components", "Contract manufacturing", "Named-account B2B services"],
  sourcesTitle: "Six kinds of source",
  sources: [
    { name: "Trade & shipping records", cadence: "2-4 wk lag", desc: "US ocean import manifests are open by law: consignee, shipper, volume, frequency. Who buys, from whom, and how often — visible before you write." },
    { name: "Procurement & tender boards", cadence: "Daily", desc: "The need is announced in advance, by the buyer, in writing. The rarest thing in cold outreach: a stated requirement with a date on it." },
    { name: "Company & seller registries", cadence: "Weekly", desc: "Above a turnover threshold the legal entity and address are disclosed by law. Turns a storefront into a company you can address by name." },
    { name: "Trademark & brand filings", cadence: "Weekly", desc: "New brands from the last 90 days, before any activity. The earliest possible window — nothing has been chosen yet." },
    { name: "Recall & safety registries", cadence: "Daily", desc: "A defect on record is a dated, verifiable event. It says quality control failed, and when." },
    { name: "Catalogs, storefronts & reviews", cadence: "2-4 wk lag", desc: "Turnover, carriers, defect complaints. Works in any country, including where customs data is closed." },
  ],
  combTitle: "How the sources combine",
  combCols: ["What is visible", "What it means"],
  combinations: [
    { a: "New supplier plus rising volume", b: "The company both changed supplier and is growing. Needs an audit and a rebuilt supply chain at the same time" },
    { a: "The consignee is an intermediary", b: "The chain is outsourced whole. Either a competitor to displace, or a partner candidate" },
    { a: "Trademark filed, no activity", b: "The brand exists, the supplier has not been chosen. The earliest window there is" },
    { a: "Storefront exists, no shipment records", b: "Buying in small batches or through an aggregator. A candidate for first consolidation" },
    { a: "A recall plus regular purchasing", b: "An active buyer whose quality control has just failed publicly" },
  ],
  note: "Update cadences differ, and that decides the queue: recall registries refresh daily, trademark filings weekly, shipping manifests run two to four weeks behind. A reason that appears on Monday is written to the same week — the list is not exported once, it is topped up continuously.",
};

const ru = {
  eyebrow: "Данные",
  h2: "Откуда берётся список",
  sub: "Ни один реестр не покрывает всех, поэтому источники намеренно пересекаются. Компании, которые видны сразу в нескольких, идут в начало очереди.",
  fitTitle: "Подходит ли это вашему бизнесу?",
  fitLede: "Пять условий. Последнее — настоящий фильтр.",
  fit: [
    "Вы продаёте бизнесу, а не потребителю",
    "Покупка обдуманная, а не импульсная",
    "Покупатель — идентифицируемое юридическое лицо",
    "Сделка достаточно крупная, чтобы окупить месяц переписки",
    "Событие покупки оставляет публичный след",
  ],
  fitNote: "Если пятое про ваш рынок неверно, скажите сразу — это единственное условие, которое канал обойти не может.",
  segTitle: "Отработанные сегменты",
  segments: ["Металлы и промснабжение", "Сорсинг и логистика", "Оборудование и комплектующие", "Контрактное производство", "B2B-услуги с поимённым таргетом"],
  sourcesTitle: "Шесть типов источников",
  sources: [
    { name: "Таможенные и грузовые записи", cadence: "Задержка 2-4 нед", desc: "Морские импортные манифесты США открыты по закону: грузополучатель, отправитель, объём, частота. Кто покупает, у кого и как часто — видно до письма." },
    { name: "Закупочные и тендерные площадки", cadence: "Ежедневно", desc: "Потребность объявлена заранее, самим покупателем, письменно. Самая редкая вещь в холодном канале: заявленное требование со сроком." },
    { name: "Реестры компаний и продавцов", cadence: "Еженедельно", desc: "При обороте выше порога юрлицо и адрес раскрываются по закону. Превращает витрину в компанию, к которой можно обратиться по имени." },
    { name: "Реестры товарных знаков", cadence: "Еженедельно", desc: "Новые бренды за последние 90 дней, до какой-либо активности. Самое раннее окно: ещё ничего не выбрано." },
    { name: "Реестры отзывов и брака", cadence: "Ежедневно", desc: "Запись об отзыве партии — датированное проверяемое событие. Она говорит, что контроль качества не сработал, и когда именно." },
    { name: "Каталоги, витрины и отзывы", cadence: "Задержка 2-4 нед", desc: "Оборот, перевозчики, жалобы на брак. Работает по любой стране, в том числе там, где таможенные данные закрыты." },
  ],
  combTitle: "Как источники дополняют друг друга",
  combCols: ["Что видно", "Что это значит"],
  combinations: [
    { a: "Новый поставщик плюс рост объёма", b: "Компания и поставщика сменила, и растёт. Нужны одновременно аудит и перестройка цепочки" },
    { a: "Грузополучатель — посредник", b: "Цепочка отдана целиком. Либо конкурент, которого можно подвинуть, либо кандидат в партнёры" },
    { a: "Знак зарегистрирован, активности нет", b: "Бренд создан, поставщик не выбран. Самое раннее окно из возможных" },
    { a: "Витрина есть, отгрузок в реестрах нет", b: "Возит мелкими партиями или через агрегатора. Кандидат на первую консолидацию" },
    { a: "Отзыв партии плюс регулярные закупки", b: "Действующий покупатель, у которого только что публично провалился контроль качества" },
  ],
  note: "Источники обновляются по-разному, и это определяет очередь: реестры отзывов — ежедневно, товарные знаки — раз в неделю, грузовые манифесты отстают на две-четыре недели. Повод, появившийся в понедельник, отрабатывается на той же неделе: база не выгружается один раз, она пополняется постоянно.",
};

export default function OutboundSources() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="04" id="sources" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Self-qualification */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "var(--c-card2)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-gold)",
          borderRadius: 10,
          padding: 22,
          marginBottom: 32,
        }}
      >
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", marginBottom: 4 }}>
          {t.fitTitle}
        </h3>
        <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-text2)", marginBottom: 16 }}>{t.fitLede}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {t.fit.map((f, i) => {
            const last = i === t.fit.length - 1;
            return (
              <li key={i} className="flex gap-3" style={{ gridColumn: last ? "1 / -1" : undefined }}>
                <Check size={14} color={last ? "var(--c-gold)" : "var(--c-sage)"} style={{ flexShrink: 0, marginTop: 3 }} />
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: last ? "var(--c-heading)" : "var(--c-body)",
                    fontWeight: last ? 600 : 400,
                  }}
                >
                  {f}
                </span>
              </li>
            );
          })}
        </ul>
        <p style={{ fontFamily: MONO, fontSize: 11, lineHeight: 1.7, color: "var(--c-muted)", marginTop: 16 }}>
          {t.fitNote}
        </p>
        <div style={{ borderTop: "1px solid var(--c-border)", marginTop: 18, paddingTop: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-muted)" }}>
            {t.segTitle}
          </span>
          <div className="flex flex-wrap gap-2" style={{ marginTop: 10 }}>
            {t.segments.map((s) => (
              <span key={s} style={tagStyle}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sources */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", marginBottom: 16 }}>
        {t.sourcesTitle}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {t.sources.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={s.name}
              variants={itemVariants}
              whileHover={cardHover}
              style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 18 }}
            >
              <div className="flex items-start justify-between gap-2" style={{ marginBottom: 12 }}>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.15)", flexShrink: 0,
                  }}
                >
                  <Icon size={15} color="var(--c-gold)" />
                </span>
                <span
                  style={{
                    fontFamily: MONO, fontSize: 8, fontWeight: 600, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "var(--c-muted)",
                    border: "1px solid var(--c-border2)", borderRadius: 3, padding: "3px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.cadence}
                </span>
              </div>
              <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)", marginBottom: 7 }}>
                {s.name}
              </h4>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Combination logic */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.combTitle}
      </h3>
      <div role="table" style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}>
        <div
          role="row"
          className="hidden sm:grid"
          style={{
            gridTemplateColumns: "1fr 1.4fr",
            background: "var(--c-card2)",
            borderBottom: "1px solid var(--c-border)",
          }}
        >
          {t.combCols.map((c) => (
            <div
              key={c}
              role="columnheader"
              style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-muted)", padding: "10px 16px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        {t.combinations.map((row, i) => (
          <div
            key={i}
            role="row"
            className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr]"
            style={{
              background: i % 2 ? "var(--c-card2)" : "var(--c-card)",
              borderTop: i ? "1px solid var(--c-border)" : "none",
            }}
          >
            {/* Padding lives in classes, not inline: an inline `padding`
                shorthand sets padding-top and would beat the sm: override,
                knocking the two columns out of vertical alignment. */}
            <div
              role="cell"
              className="px-4 pt-3.5 pb-1.5 sm:pb-3.5"
              style={{
                fontFamily: SANS, fontSize: 13, fontWeight: 600,
                color: "var(--c-heading)", lineHeight: 1.55,
              }}
            >
              {row.a}
            </div>
            <div
              role="cell"
              className="px-4 pb-3.5 sm:pt-3.5"
              style={{
                fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.55,
              }}
            >
              {row.b}
            </div>
          </div>
        ))}
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
