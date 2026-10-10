"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ship, Gavel, Building2, BadgeCheck, Handshake, Store } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { INTAKE_ANCHOR } from "@/lib/constants";
import { SectionShell, SectionHead, MidCTA, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "../shared";

const ICONS = [Ship, Gavel, Building2, BadgeCheck, Handshake, Store];

/**
 * The centrepiece.
 *
 * One example letter per market, switched by the reader. Built to the letter
 * canon in SDR B2B (05_Письма/Правила_и_структура.md, decisions 64, 395, 424):
 * the first line is about that company's business, taken from its own site and
 * compared with its neighbours; an event is an amplifier, never a condition;
 * letters go to the company, no promise of reaching a named person. The four
 * annotations stay constant across all five on purpose: the market changes,
 * the anatomy of the letter does not, and that is the actual argument.
 */

type Variant = { label: string; meta: string[]; subject: string; body: string[] };

const en = {
  eyebrow: "The mechanism",
  h2: "Every letter is about that company's business",
  sub: "Nothing goes out as a template. The letter starts from what that company does and what sets it apart from its neighbours, checked on its own site. Read one for any of these markets, or ask for the one written for yours.",
  pick: "Five examples. Yours works the same way",
  openLabel: "Your market",
  openTitle: "Your market is not on that list",
  openBody: "Those five are examples, not the boundary. The mechanism needs one thing: that your buyers can be found and read before they are written to. In most of B2B they can: a catalogue, a dealer page, an exhibitor list, their own site. Tell me what you sell and I will write the example letter for your market before you commit to anything.",
  openCta: "Write the example for my market →",
  variants: [
    {
      label: "Metals & industrial supply",
      meta: ["To: a machine-building plant", "First line from: their product range"],
      subject: "Subject: Steel for your made-to-order [crane girders]",
      body: [
        "[Plant] builds [crane girders] to order next to its standard range, and I haven't seen that from the other machine builders I looked at.",
        "Orders like that are what we keep stock for: the grade is on hand the day your order lands.",
        "We fix the price for the whole run, not per shipment, and the mill certificates travel with the first delivery.",
        "Worth a price on your next order?",
      ],
    },
    {
      label: "Sourcing & logistics",
      meta: ["To: a home goods brand", "First line from: their catalogue and about page"],
      subject: "Subject: Inspection for your [stoneware] line",
      body: [
        "[Company] makes its [stoneware] at two factories and says so on its own site, which the other home goods brands I looked at do not.",
        "Two factories means two sets of cartons to check before anything ships.",
        "We are on the ground where your factories are: you join the inspection by video, and the same team moves the goods door to door, customs included.",
        "Worth a look at your next order?",
      ],
    },
    {
      label: "Equipment & components",
      meta: ["To: a food production plant", "First line from: their product pages"],
      subject: "Subject: Wear parts for your [bottling line]",
      body: [
        "[Company] bottles its [juices] on its own line instead of using a co-packer, and I haven't seen that from the other producers I looked at.",
        "A line you run yourself stops when a wear part is three weeks away.",
        "We stock the wear parts for it and keep your kit with us, so it is not ordered from scratch each time.",
        "Want the parts list for your configuration?",
      ],
    },
    {
      label: "Contract manufacturing",
      meta: ["To: a cosmetics brand", "First line from: their shop and ingredient pages"],
      subject: "Subject: Small batches for your [solid shampoo] range",
      body: [
        "[Brand] sells [solid shampoos] in five scents with the full ingredient list on every page, which the other small brands I looked at do not publish.",
        "A range that wide usually wants a small run per scent, not one container.",
        "We make that category in small batches, with formulation, packaging and the certification pack under one contract.",
        "Worth costing your next batch?",
      ],
    },
    {
      label: "Named-account B2B services",
      meta: ["To: a distribution company", "First line from: their locations page"],
      subject: "Subject: One view of stock across your [two warehouses]",
      body: [
        "[Company] ships from [two warehouses] and promises next-day delivery from both, and I haven't seen that from the other distributors in your region.",
        "Two sites with one promise means two sets of stock numbers that have to agree.",
        "We put both on one view of stock and orders without replacing the system you already run, and the first working dashboard is on your data within two weeks.",
        "Worth a look before the season?",
      ],
    },
  ] as Variant[],
  annotations: ["What sets them apart, from their own site", "Why we write, in one sentence", "One specific offer", "One question, answered by email"],
  triggerTitle: "What the first line is built from",
  triggerCols: ["What", "What the line says", "Checked on"],
  triggers: [
    { a: "A product their neighbours don't have", b: "One line: what they have that others in their market don't", c: "their catalogue and 3–5 competitor sites" },
    { a: "A gap on their own site", b: "What they do not offer or do not do themselves, which is what you sell", c: "their own site" },
    { a: "How they sell", b: "Price per project, small batches, own production: the detail that shows who buys from them", c: "their own site" },
    { a: "Something that just happened", b: "A new line, a new market, a trade show: makes the letter sharper, never required", c: "news, exhibitor lists, registries" },
  ],
  sourceTitle: "Where the companies come from",
  sources: [
    "Trade & shipping records",
    "Procurement & tender boards",
    "The company's own site",
    "Trade show exhibitor lists",
    "Dealer & distributor pages",
    "Catalogs & storefronts",
  ],
  sourceNote: "Every first line is traceable to a page you could open yourself, most often the company's own site: what it sells, how it describes itself, where it is listed. The line comparing it with its neighbours is checked against three to five competitor sites. An event, when there is one, makes the letter sharper, but a letter never depends on one. All of it is public: nothing is bought from a list broker, and nothing comes from a scraped inbox.",
  ctaNote: "Want to see which companies I would start with in your segment?",
  cta: "Ask for it →",
};

const ru = {
  eyebrow: "Механика",
  h2: "Каждое письмо про дело этой компании",
  sub: "Ничего не уходит шаблоном. Письмо начинается с того, что делает эта компания и чем она отличается от соседей, по её же сайту. Прочитайте письмо по любому из этих рынков или запросите то, что написано под ваш.",
  pick: "Пять примеров. Ваш работает так же",
  openLabel: "Ваша ниша",
  openTitle: "Вашего рынка в этом списке нет",
  openBody: "Эти пять — примеры, а не граница. Механике нужно одно: чтобы ваших покупателей можно было найти и прочитать до письма. В большинстве B2B это так: каталог, страница дилеров, список экспонентов, их собственный сайт. Напишите, что вы продаёте, и я соберу пример письма под ваш рынок до любых обязательств.",
  openCta: "Собрать пример под мой рынок →",
  variants: [
    {
      label: "Металлопрокат и промснабжение",
      meta: ["Кому: машиностроительный завод", "Первая строка: их линейка на сайте"],
      subject: "Тема: Прокат под ваши [крановые балки] на заказ",
      body: [
        "[Завод] делает [крановые балки] под заказ рядом со стандартной линейкой, а у других машиностроителей, которых я смотрел, такого не видел.",
        "Под такие заказы мы и держим склад: нужная марка есть в день, когда приходит ваш заказ.",
        "Цену фиксируем на весь объём, а не на каждую партию, а сертификаты качества идут с первой поставкой.",
        "Посчитать под ваш следующий заказ?",
      ],
    },
    {
      label: "Сорсинг и логистика",
      meta: ["Кому: бренд товаров для дома", "Первая строка: их каталог и страница «о нас»"],
      subject: "Тема: Инспекция для вашей [керамики]",
      body: [
        "[Компания] делает [керамику] на двух фабриках и прямо пишет об этом на сайте, а у других брендов товаров для дома, которых я смотрел, такого не видел.",
        "Две фабрики — это две партии коробок, которые нужно проверить до отгрузки.",
        "Мы на месте там, где ваши фабрики: вы подключаетесь к инспекции по видео, и та же команда везёт партию от двери до двери, вместе с таможней.",
        "Посмотрим на следующем заказе?",
      ],
    },
    {
      label: "Оборудование и комплектующие",
      meta: ["Кому: пищевое производство", "Первая строка: страницы их продукции"],
      subject: "Тема: Изнашиваемые части для вашей [линии розлива]",
      body: [
        "[Компания] разливает [соки] на своей линии, а не отдаёт на контрактный розлив, а у других производителей, которых я смотрел, такого не видел.",
        "Своя линия встаёт, когда изнашиваемая деталь едет три недели.",
        "Изнашиваемые части к ней у нас на складе, и комплект под вас лежит у нас, а не заказывается каждый раз заново.",
        "Прислать перечень под вашу конфигурацию?",
      ],
    },
    {
      label: "Контрактное производство",
      meta: ["Кому: косметический бренд", "Первая строка: их магазин и страницы составов"],
      subject: "Тема: Малые партии для ваших [твёрдых шампуней]",
      body: [
        "[Бренд] продаёт [твёрдые шампуни] в пяти ароматах и публикует полный состав на каждой странице, а у других небольших брендов, которых я смотрел, такого не видел.",
        "Такой линейке обычно нужны малые партии под каждый аромат, а не контейнер.",
        "Мы делаем эту категорию малыми партиями, а рецептура, упаковка и пакет сертификации идут одним договором.",
        "Посчитать следующую партию?",
      ],
    },
    {
      label: "B2B-услуги под именованных клиентов",
      meta: ["Кому: дистрибьютор", "Первая строка: страница их складов"],
      subject: "Тема: Единый учёт остатков на ваших [двух складах]",
      body: [
        "[Компания] отгружает с [двух складов] и обещает доставку на следующий день с обоих, а у других дистрибьюторов в вашем регионе я такого не видел.",
        "Два склада с одним обещанием — это два набора остатков, которые должны сходиться.",
        "Мы сводим оба в один вид по остаткам и заказам, не заменяя вашу систему, и первый рабочий дашборд на ваших данных готов через две недели.",
        "Посмотрим до сезона?",
      ],
    },
  ] as Variant[],
  annotations: ["Чем они отличаются, по их же сайту", "Зачем пишем, одной фразой", "Одно конкретное предложение", "Один вопрос, ответ письмом"],
  triggerTitle: "Из чего строится первая строка",
  triggerCols: ["Что", "О чём строка", "Где проверяется"],
  triggers: [
    { a: "Товар, которого нет у соседей", b: "Одна фраза: что есть у них и нет у других на их рынке", c: "их каталог и 3–5 сайтов конкурентов" },
    { a: "Пробел на их же сайте", b: "Чего они не предлагают или не делают сами, а вы продаёте именно это", c: "их собственный сайт" },
    { a: "Как они продают", b: "Цена под проект, малые партии, своё производство: деталь, по которой видно, кто у них покупает", c: "их собственный сайт" },
    { a: "Что у них только что произошло", b: "Новая линия, новый рынок, выставка: делает письмо острее, но не обязательно", c: "новости, списки экспонентов, реестры" },
  ],
  sourceTitle: "Откуда берутся компании",
  sources: [
    "Торговые и отгрузочные записи",
    "Закупочные и тендерные площадки",
    "Сайт самой компании",
    "Списки экспонентов выставок",
    "Страницы дилеров и дистрибьюторов",
    "Каталоги и витрины",
  ],
  sourceNote: "Каждая первая строка прослеживается до страницы, которую вы можете открыть сами, чаще всего до сайта самой компании: что она продаёт, как себя описывает, где числится. Строка сравнения с соседями проверяется по трём–пяти сайтам конкурентов. Событие, если оно есть, делает письмо острее, но письмо от него не зависит. Всё это открытые данные: ничего не покупается у продавцов баз и не собирается из чужих почтовых ящиков.",
  ctaNote: "Показать, с каких компаний я бы начал в вашем сегменте?",
  cta: "Запросить →",
};

export default function OutboundHow() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const [active, setActive] = useState(0);
  // The last chip is not a market, it is the way out of the list: five examples
  // read as five limits unless the reader is told their own market fits too.
  const openIndex = t.variants.length;
  const isOpen = active === openIndex;
  const v = t.variants[Math.min(active, openIndex - 1)];

  return (
    <SectionShell num="03" id="how">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Market switcher — the segment list used to be a passive tag row at the
          bottom of the section; here it selects the artifact instead. */}
      <div style={{ marginBottom: 18 }}>
        <span
          style={{
            fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--c-text2)", display: "block", marginBottom: 11,
          }}
        >
          {t.pick}
        </span>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.pick}>
          {[...t.variants.map((x) => x.label), t.openLabel].map((label, i) => {
            const on = i === active;
            const isOpenChip = i === openIndex;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: MONO,
                  fontSize: T.caption,
                  fontWeight: on || isOpenChip ? 700 : 400,
                  letterSpacing: "0.1em",
                  color: on ? "var(--c-on-gold)" : isOpenChip ? "var(--c-gold)" : "var(--c-text2)",
                  background: on ? "var(--c-gold)" : "var(--c-card2)",
                  // Longhands only: React warns when a shorthand and a longhand
                  // for the same value are both updated on a rerender, and the
                  // winner is not guaranteed.
                  borderWidth: 1,
                  borderStyle: isOpenChip && !on ? "dashed" : "solid",
                  // --c-border-control, not --c-border: these are controls, and
                  // 1.4.11 holds a control's boundary to 3:1. The hairline
                  // token measured 1.19:1 behind these tabs.
                  borderColor: on || isOpenChip ? "var(--c-gold)" : "var(--c-border-control)",
                  borderRadius: 4,
                  padding: "6px 12px",
                  cursor: "pointer",
                  transition: "background 160ms, color 160ms, border-color 160ms",
                }}
              >
                {isOpenChip ? `+ ${label}` : label}
              </button>
            );
          })}
        </div>
      </div>

      {isOpen ? (
        /* Not a sixth email — the answer to "my market is not on that list". */
        <div
          style={{
            background: "var(--c-card)",
            border: "1px solid var(--c-gold)",
            borderLeft: "2px solid var(--c-gold)",
            borderRadius: 10,
            padding: 28,
          }}
        >
          <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: 21, color: "var(--c-heading)", marginBottom: 12, lineHeight: 1.25 }}>
            {t.openTitle}
          </h3>
          <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.7, maxWidth: "58ch", marginBottom: 20 }}>
            {t.openBody}
          </p>
          <a
            href={INTAKE_ANCHOR}
            style={{
              display: "inline-block",
              background: "var(--c-gold)",
              color: "var(--c-on-gold)",
              border: "1px solid var(--c-gold)",
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: T.bodySm,
              letterSpacing: "0.02em",
              padding: "13px 26px",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            {t.openCta}
          </a>
        </div>
      ) : (
        <>
      {/* The marked-up document.
            Email paragraphs and their annotations share one grid, so each note
            sits on the same row as the line it refers to and the 1px gold leader
            between them is always aligned — no measuring, no SVG overlay. The
            card background is a single element spanning column 1 across all rows.
            Below lg the annotations fall under the email, as they did before. */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] lg:gap-x-0"
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
                maxWidth: "58ch",
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
                <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.12em", color: "var(--c-gold)", flexShrink: 0 }}>
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
              style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: "12px 14px" }}
            >
              <span style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-gold)", letterSpacing: "0.1em", flexShrink: 0, paddingTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{a}</span>
            </li>
          ))}
        </ul>
        </>
      )}

      {/* What the first line is built from — four rows; the event is the last and optional one. */}
      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 14px" }}>
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
              <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.12em", color: "var(--c-gold)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontSize: T.h3, fontWeight: 700, color: "var(--c-heading)", lineHeight: 1.3 }}>
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
      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 14px" }}>
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
      <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", lineHeight: 1.6, marginTop: 16, maxWidth: "58ch" }}>
        {t.sourceNote}
      </p>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
