"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ship, Gavel, Building2, BadgeCheck, ShieldAlert, Store } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, MidCTA, SERIF, SANS, MONO, T, itemVariants } from "../shared";

const ICONS = [Ship, Gavel, Building2, BadgeCheck, ShieldAlert, Store];

/**
 * The centrepiece.
 *
 * The email used to be a single metals-adjacent sample, which told four readers
 * out of five that this was not their industry. It is now one artifact per
 * market, switched by the reader. The four annotations stay constant across all
 * five on purpose: the market changes, the anatomy of the email does not, and
 * that is the actual argument.
 */

type Variant = { label: string; meta: string[]; subject: string; body: string[] };

const en = {
  eyebrow: "The mechanism",
  h2: "Every email has a reason attached to that company",
  sub: "Nothing goes out as a template. Something happened at that company, it is on public record, and the email is about that. Pick your market and read the actual email.",
  pick: "Pick your market",
  variants: [
    {
      label: "Metals & industrial supply",
      meta: ["To: head of procurement, machine-building plant", "Reason: won a state contract in May, steel not yet booked"],
      subject: "Subject: Your May contract, before the steel is booked",
      body: [
        "Saw [Plant] won the [tender] in May — delivery falls on you by autumn, and the rolled steel is not booked yet.",
        "We hold that grade in stock and can fix the price for the whole run, not per shipment.",
        "Mill certificates go out with the first delivery, so acceptance does not stall.",
        "Worth a price on your volume?",
      ],
    },
    {
      label: "Sourcing & logistics",
      meta: ["To: founder, home goods brand", "Reason: new supplier since April, two shipments"],
      subject: "Subject: New supplier since April",
      body: [
        "Saw [Company] switched to a new [supplier] around April — first two shipments already landed.",
        "We are on the ground where your factories are. Inspection is live: you join by video and watch the cartons opened.",
        "Then the same team moves the shipment door to door, customs included. One chain, one invoice.",
        "Worth a look at your next order?",
      ],
    },
    {
      label: "Equipment & components",
      meta: ["To: chief engineer, food production", "Reason: new line commissioned in March"],
      subject: "Subject: Spares for the line you commissioned in March",
      body: [
        "Saw [Company] commissioned a new [line] in March — the first service interval lands around now.",
        "We stock the wear parts for it, so a stoppage does not wait three weeks on the manufacturer.",
        "One list, one supplier, and your kit sits with us instead of being ordered from scratch each time.",
        "Want the parts list for your configuration?",
      ],
    },
    {
      label: "Contract manufacturing",
      meta: ["To: founder, cosmetics brand", "Reason: trademark filed in February, nothing in production"],
      subject: "Subject: Your February filing, before you pick a factory",
      body: [
        "Saw [Brand] filed a [trademark] in February — the line is named but not made anywhere yet.",
        "We run that category at small batch, so the first run does not have to be a container.",
        "Formulation, packaging and the certification pack come from one contract, not three.",
        "Worth costing your first batch?",
      ],
    },
    {
      label: "Named-account B2B services",
      meta: ["To: operations director, distribution company", "Reason: opened a second warehouse in June"],
      subject: "Subject: The second warehouse you opened in June",
      body: [
        "Saw [Company] opened a second [warehouse] in June — two sites usually means two sets of numbers that stop agreeing.",
        "We put both on one view of stock and orders, without replacing the system you already run.",
        "Two weeks to the first working dashboard, on your data, not on a demo set.",
        "Worth a look before the season?",
      ],
    },
  ] as Variant[],
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
    "Trade & shipping records",
    "Procurement & tender boards",
    "Company & seller registries",
    "Trademark & brand filings",
    "Recall & safety registries",
    "Catalogs & storefronts",
  ],
  sourceNote: "Registries refresh at different speeds, so a reason that appears on Monday is written to the same week. All of it is public record — nothing is bought from a list broker, and nothing comes from a scraped inbox.",
  ctaNote: "Want the trigger list for your segment?",
  cta: "Ask for it →",
};

const ru = {
  eyebrow: "Механика",
  h2: "У каждого письма есть повод, привязанный к этой компании",
  sub: "Ничего не уходит шаблоном. В компании что-то произошло, это есть в открытом источнике, и письмо про это. Выберите ваш рынок и прочитайте само письмо.",
  pick: "Выберите ваш рынок",
  variants: [
    {
      label: "Металлопрокат и промснабжение",
      meta: ["Кому: руководителю снабжения, машиностроительный завод", "Повод: выиграл госконтракт в мае, прокат ещё не законтрактован"],
      subject: "Тема: Ваш майский контракт, пока прокат не законтрактован",
      body: [
        "Увидел, что [Завод] выиграл [тендер] в мае — отгрузка на вас к осени, а прокат ещё не законтрактован.",
        "Эта марка есть у нас на складе, и цену можно зафиксировать на весь объём, а не на каждую партию.",
        "Сертификаты качества идут с первой поставкой, чтобы приёмка не встала.",
        "Посчитать под ваш объём?",
      ],
    },
    {
      label: "Сорсинг и логистика",
      meta: ["Кому: основателю, бренд товаров для дома", "Повод: с апреля новый поставщик, две поставки"],
      subject: "Тема: Новый поставщик с апреля",
      body: [
        "Увидел, что [Компания] примерно в апреле перешла на нового [поставщика] — первые две поставки уже пришли.",
        "Мы на земле там, где ваши фабрики. Инспекция идёт вживую: вы подключаетесь по видео и смотрите, как вскрывают коробки.",
        "Дальше та же команда везёт партию от двери до двери, вместе с таможней. Одна цепочка, один счёт.",
        "Посмотрим на следующем заказе?",
      ],
    },
    {
      label: "Оборудование и комплектующие",
      meta: ["Кому: главному инженеру, пищевое производство", "Повод: в марте запущена новая линия"],
      subject: "Тема: Запчасти к линии, которую вы запустили в марте",
      body: [
        "Увидел, что [Компания] в марте запустила новую [линию] — первый сервисный интервал приходится примерно на сейчас.",
        "Изнашиваемые части к ней у нас на складе, чтобы простой не ждал три недели поставку от производителя.",
        "Один список, один поставщик, и комплект под вас лежит у нас, а не заказывается каждый раз заново.",
        "Прислать перечень под вашу конфигурацию?",
      ],
    },
    {
      label: "Контрактное производство",
      meta: ["Кому: основателю, косметический бренд", "Повод: товарный знак подан в феврале, производства ещё нет"],
      subject: "Тема: Ваша февральская заявка, пока фабрика не выбрана",
      body: [
        "Увидел, что [Бренд] подал [товарный знак] в феврале — линейка названа, но нигде ещё не производится.",
        "Мы делаем эту категорию малыми партиями, поэтому первый тираж не обязан быть контейнером.",
        "Рецептура, упаковка и пакет сертификации идут одним договором, а не тремя.",
        "Посчитать первую партию?",
      ],
    },
    {
      label: "B2B-услуги под именованных клиентов",
      meta: ["Кому: операционному директору, дистрибуция", "Повод: в июне открыт второй склад"],
      subject: "Тема: Второй склад, который вы открыли в июне",
      body: [
        "Увидел, что [Компания] в июне открыла второй [склад] — две площадки обычно означают два набора цифр, которые перестают сходиться.",
        "Мы сводим обе в один вид по остаткам и заказам, не заменяя систему, в которой вы уже работаете.",
        "Две недели до первого рабочего дашборда, на ваших данных, а не на демо.",
        "Посмотрим до сезона?",
      ],
    },
  ] as Variant[],
  annotations: ["Один факт, который можно проверить", "Одно конкретное предложение", "Один вопрос, без презентации", "Ни вложений, ни питч-дека"],
  triggerTitle: "Откуда берётся повод",
  triggerCols: ["Событие", "О чём письмо", "Кому уходит"],
  triggers: [
    { a: "Сменили поставщика", b: "Аудит перед первым крупным заказом", c: "Кто отвечает за качество" },
    { a: "Перенесли закупки за рубеж", b: "Сорсинг на новом рынке", c: "Кто отвечает за закупки" },
    { a: "Потеряли партию на браке", b: "Протокол приёмки под этот брак", c: "Кто отвечает за качество" },
    { a: "Первая закупка вообще", b: "Сорсинг с нуля, раньше конкурентов", c: "Основатель" },
  ],
  sourceTitle: "Откуда берутся компании",
  sources: [
    "Торговые и отгрузочные записи",
    "Закупочные и тендерные площадки",
    "Реестры компаний и продавцов",
    "Заявки на товарные знаки",
    "Реестры отзывов и безопасности",
    "Каталоги и витрины",
  ],
  sourceNote: "Реестры обновляются с разной скоростью, поэтому повод, появившийся в понедельник, отрабатывается на той же неделе. Всё это открытые данные — ничего не покупается у продавцов баз и не собирается из чужих почтовых ящиков.",
  ctaNote: "Нужен список триггеров под ваш сегмент?",
  cta: "Запросить →",
};

export default function OutboundHow() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const [active, setActive] = useState(0);
  const v = t.variants[active];

  return (
    <SectionShell num="03" id="how">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Market switcher — the segment list used to be a passive tag row at the
          bottom of the section; here it selects the artifact instead. */}
      <div style={{ marginBottom: 18 }}>
        <span
          style={{
            fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--c-text2)", display: "block", marginBottom: 11,
          }}
        >
          {t.pick}
        </span>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.pick}>
          {t.variants.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: MONO,
                  fontSize: T.caption,
                  fontWeight: on ? 700 : 400,
                  letterSpacing: "0.1em",
                  color: on ? "var(--c-bg)" : "var(--c-text2)",
                  background: on ? "var(--c-gold)" : "var(--c-card2)",
                  border: `1px solid ${on ? "var(--c-gold)" : "var(--c-border)"}`,
                  borderRadius: 4,
                  padding: "6px 12px",
                  cursor: "pointer",
                  transition: "background 160ms, color 160ms, border-color 160ms",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* The marked-up document.
          Email paragraphs and their annotations share one grid, so each note
          sits on the same row as the line it refers to and the 1px gold leader
          between them is always aligned — no measuring, no SVG overlay. The
          card background is a single element spanning column 1 across all rows.
          Below lg the annotations fall under the email, as they did before. */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] lg:gap-x-0"
        style={{ position: "relative", alignItems: "start" }}
      >
        <div
          aria-hidden="true"
          style={{
            gridColumn: 1,
            gridRow: "1 / 7",
            // The wrapper is align-items:start, so an empty backdrop would
            // collapse to its border height. Stretch it back over the rows.
            alignSelf: "stretch",
            background: "var(--c-card2)",
            border: "1px solid var(--c-border)",
            borderLeft: "2px solid var(--c-gold)",
            borderRadius: 10,
          }}
        />

        <motion.div
          key={`meta-${active}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          style={{ gridColumn: 1, gridRow: 1, position: "relative", padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 3 }}
        >
          {v.meta.map((m) => (
            <span key={m} style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.06em", color: "var(--c-text2)" }}>
              {m}
            </span>
          ))}
        </motion.div>

        <motion.p
          key={`subj-${active}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.03 }}
          style={{
            gridColumn: 1, gridRow: 2, position: "relative",
            margin: "14px 24px 15px", paddingBottom: 13,
            borderBottom: "1px solid var(--c-border)",
            fontFamily: MONO, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-heading)",
          }}
        >
          {v.subject}
        </motion.p>

        {v.body.map((line, i) => (
          <motion.p
            key={`${active}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.05 + i * 0.03 }}
            style={{
              gridColumn: 1,
              gridRow: 3 + i,
              position: "relative",
              padding: `0 24px ${i === v.body.length - 1 ? 24 : 13}px`,
              fontFamily: SANS,
              fontSize: T.body,
              color: "var(--c-body)",
              lineHeight: 1.65,
            }}
          >
            {line.split(/(\[[^\]]+\])/g).map((part, j) =>
              part.startsWith("[")
                ? <span key={j} style={{ color: "var(--c-gold)", fontWeight: 600 }}>{part}</span>
                : <span key={j}>{part}</span>,
            )}
          </motion.p>
        ))}

        {/* Margin notes. Same grid, same row as the line they mark, so the 1px
            gold leader between the two is aligned by construction. */}
        {t.annotations.map((a, i) => (
          <div
            key={a}
            className="hidden lg:flex items-start gap-3"
            style={{ gridColumn: 2, gridRow: 3 + i, position: "relative", paddingLeft: 0, paddingBottom: 13 }}
          >
            <span
              aria-hidden="true"
              style={{ width: 34, height: 1, background: "var(--c-gold)", flexShrink: 0, marginTop: 13, opacity: 0.55 }}
            />
            <span
              aria-hidden="true"
              style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-gold)", flexShrink: 0, marginTop: 11, marginLeft: -3 }}
            />
            {/* Number and note on one line: a stacked note is taller than the
                email line it marks, and the shared grid row would stretch the
                paragraph spacing along with it. */}
            <span className="flex items-baseline gap-2 min-w-0" style={{ paddingTop: 3 }}>
              <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.14em", color: "var(--c-gold)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.45 }}>
                {a}
              </span>
            </span>
          </div>
        ))}
      </div>

      <ul className="lg:hidden flex flex-col gap-2" style={{ marginTop: 12 }}>
        {t.annotations.map((a, i) => (
          <li
            key={a}
            className="flex gap-3 items-start"
            style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 8, padding: "12px 14px" }}
          >
            <span style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-gold)", letterSpacing: "0.1em", flexShrink: 0, paddingTop: 2 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{a}</span>
          </li>
        ))}
      </ul>

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

      {/* Sources — names only. The refresh cadence used to sit here as a chip on
          every card; it is vendor-side detail and it read as a spec sheet. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 14px" }}>
        {t.sourceTitle}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {t.sources.map((name, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={name}
              variants={itemVariants}
              className="flex items-center gap-3"
              style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: "14px 16px" }}
            >
              <span
                className="flex items-center justify-center"
                style={{ width: 34, height: 34, borderRadius: 8, background: "var(--c-gold-dim)", border: "1px solid var(--c-gold-glow)", flexShrink: 0 }}
              >
                <Icon size={16} color="var(--c-gold)" />
              </span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-heading)", lineHeight: 1.35 }}>
                {name}
              </span>
            </motion.div>
          );
        })}
      </div>
      <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", lineHeight: 1.6, marginTop: 16, maxWidth: 780 }}>
        {t.sourceNote}
      </p>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
