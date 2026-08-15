"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, itemVariants } from "../shared";

const en = {
  eyebrow: "Commercials",
  h2: "How the money and the rules work",
  sub: "Three moving parts, and none of them are a surprise later. Exact figures depend on format, volume and number of languages, so we set them once the pilot shows the real load.",
  money: [
    { k: "Pilot", h: "Fixed fee, six weeks", d: "Half at the start, half on completion. Covers channel setup, segmentation, sourcing, correspondence and the final report." },
    { k: "Ongoing", h: "Monthly retainer", d: "Depends on format, volume and how many languages are in play. Sized after the pilot, when the actual workload is visible rather than guessed." },
    { k: "Result share", h: "10-20% of gross profit", d: "On clients I brought, for the first 12 months of each client relationship, then it stops. The rate depends on how far I take the deal." },
  ],
  dataNote: "Data access — customs extracts and catalog subscriptions — is billed to you directly. Trademark and recall registries are free. The set is agreed before anything is bought.",
  frameTitle: "The agreement frame",
  frameSub: "All of it fixed in writing before the pilot starts, so nothing gets worked out mid-flight.",
  frame: [
    { q: "Whose client is it", a: "Mine is the one who came from my email. If the company was already in your pipeline, you say so at handover and it does not count as mine. Anything disputed is resolved in your favour." },
    { q: "Attribution window", a: "12 months from the client's first payment, after which the share stops accruing. If we part ways, it is still paid on clients already introduced until their window closes." },
    { q: "Exclusivity", a: "One client per niche at a time. While I work with you I do not take on a directly competing business in the same niche. Fixed in the contract." },
    { q: "What is not included", a: "Signing the contract, fulfilling the order, and account work after handover. I do not run calls — this is a correspondence channel." },
    { q: "What stays with you", a: "Domains, mailboxes, the database of selected companies, the stop-list and all copy. Set up on your accounts from day one, so nothing has to be handed back." },
    { q: "Response times", a: "Inbound triaged within the working day. Holidays and travel agreed two weeks ahead." },
    { q: "Form and payment", a: "A services contract; I work as an independent contractor. Pilot is split half and half, ongoing work is prepaid monthly. Payment terms are fixed in the contract." },
    { q: "Exit", a: "Either side, 30 days' notice. Result-share obligations survive for clients already introduced; accesses are handed over within a week." },
  ],
  note: "I would rather put the uncomfortable parts in writing before the start than discover we read them differently in month three.",
};

const ru = {
  eyebrow: "Условия",
  h2: "Как устроены деньги и правила",
  sub: "Три составляющие, и ни одна не становится сюрпризом потом. Точные цифры зависят от формата, объёма и числа языков, поэтому фиксируем их, когда пилот покажет реальную нагрузку.",
  money: [
    { k: "Пилот", h: "Фиксированная стоимость, шесть недель", d: "Половина на старте, половина по завершении. Покрывает настройку канала, сегментацию, поиск, переписку и итоговый отчёт." },
    { k: "Дальше", h: "Ежемесячный фикс", d: "Зависит от формата, объёма и числа языков. Считается после пилота, когда фактическая нагрузка видна, а не предполагается." },
    { k: "Доля с результата", h: "10-20% от валовой прибыли", d: "По клиентам, которых привёл я, первые 12 месяцев работы с каждым, дальше не начисляется. Ставка зависит от того, докуда я довожу сделку." },
  ],
  dataNote: "Доступы к данным — таможенные выгрузки и подписки на каталоги — оплачиваются вами напрямую. Реестры знаков и отзывов бесплатны. Набор согласуем до покупки.",
  frameTitle: "Рамки договорённости",
  frameSub: "Всё это фиксируется письменно до старта пилота, чтобы потом не выяснять на ходу.",
  frame: [
    { q: "Чей клиент", a: "Мой — тот, кто пришёл по моему письму. Если компания уже была у вас в работе, вы говорите об этом при передаче, и моей она не считается. Спорное решается в вашу пользу." },
    { q: "Окно атрибуции", a: "12 месяцев с первой оплаты клиента, дальше доля не начисляется. Если расходимся, по уже приведённым клиентам платится до конца их окна." },
    { q: "Эксклюзивность", a: "Один клиент в нише одновременно. Пока работаю с вами, не беру прямо конкурирующий бизнес в той же нише. Фиксируется в договоре." },
    { q: "Что не входит", a: "Подписание договора, исполнение заказа и работа с клиентом после передачи. Звонки не веду — это канал переписки." },
    { q: "Что остаётся у вас", a: "Домены, ящики, база отобранных компаний, стоп-лист и все тексты. Заводятся на ваши аккаунты с первого дня, поэтому возвращать ничего не нужно." },
    { q: "Сроки реакции", a: "Разбор входящих в течение рабочего дня. Отпуск и отъезды согласуются за две недели." },
    { q: "Форма и оплата", a: "Договор оказания услуг, работаю как независимый подрядчик. Пилот — пополам, дальше предоплата за месяц. Условия оплаты фиксируются в договоре." },
    { q: "Выход", a: "Любая сторона, 30 дней уведомления. Обязательства по доле сохраняются по уже приведённым клиентам, доступы передаются в течение недели." },
  ],
  note: "Лучше положить неудобные пункты на бумагу до старта, чем на третий месяц обнаружить, что мы читали их по-разному.",
};

export default function OutboundTerms() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionShell num="09" id="terms">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.money.map((m) => (
          <motion.div
            key={m.k}
            variants={itemVariants}
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderTop: "2px solid rgba(200,169,110,0.35)",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-muted)" }}>
              {m.k}
            </span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 17, color: "var(--c-gold)", margin: "8px 0 9px", lineHeight: 1.3 }}>
              {m.h}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.65 }}>{m.d}</p>
          </motion.div>
        ))}
      </div>

      <Note>{t.dataNote}</Note>

      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", margin: "36px 0 4px" }}>
        {t.frameTitle}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-text2)", marginBottom: 16 }}>{t.frameSub}</p>

      <div style={{ border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}>
        {t.frame.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} style={{ borderTop: i ? "1px solid var(--c-border)" : "none" }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`frame-panel-${i}`}
                className="w-full flex items-center justify-between gap-4 text-left"
                style={{
                  background: isOpen ? "var(--c-card2)" : "var(--c-card)",
                  border: "none",
                  padding: "15px 18px",
                  cursor: "pointer",
                  fontFamily: SANS,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--c-heading)",
                }}
              >
                {f.q}
                <ChevronDown
                  size={16}
                  color="var(--c-muted)"
                  style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 220ms ease" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`frame-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ overflow: "hidden", background: "var(--c-card2)" }}
                  >
                    <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.7, padding: "0 18px 16px" }}>
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
