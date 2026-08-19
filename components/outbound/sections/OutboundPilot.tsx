"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, T, itemVariants } from "../shared";

/**
 * The pilot is the strongest instrument on the page, so it stops reading like a
 * spec sheet. The four commitment figures that used to open it were vendor-side
 * units of work — companies selected, emails sent, bounce ceiling; what a buyer
 * weighs is what they are left holding if it does not work.
 * The six weeks now run on a rail rather than four cards, matching the stage
 * conveyor in the formats section.
 */

const en = {
  eyebrow: "The pilot",
  h2: "Six weeks, a fixed fee, and an end date you can hold me to",
  sub: "Not a retainer that quietly renews. A fixed scope with a fixed price and a decision at the end — and everything built along the way is on your accounts from day one.",
  holdTitle: "What you hold at week six",
  hold: [
    "Your list of companies, every address found and verified",
    "Your domains and mailboxes, warmed and clean",
    "The copy you approved, and the stop-list built underneath it",
    "Your own numbers for every step, and a go or no-go you can defend",
  ],
  weeksTitle: "How the six weeks run",
  weeks: [
    { w: "1–2", t: "Setup", d: "Your current flow, segments, sources, first extract, filtering rules." },
    { w: "2–3", t: "First wave", d: "Selection, address verification. Copy goes to you for approval." },
    { w: "3–6", t: "Sending", d: "Stepped sending with bounce control, inbound triage, follow-ups." },
    { w: "6", t: "Report", d: "Funnel by segment, cost per client, what to change next." },
  ],
  deliverTitle: "And if it does not work?",
  deliver: "Then you have a documented answer for why not — which segment, which trigger, which offer failed to earn a reply — plus the list, the domains, the copy and the stop-list, all of which keep working for whatever you do next. That is a cheaper way to find out than a year of guessing.",
};

const ru = {
  eyebrow: "Пилот",
  h2: "Шесть недель, фиксированная цена и дата конца, за которую можно спросить",
  sub: "Не абонентка, которая тихо продлевается. Фиксированный объём с фиксированной ценой и решение в конце — а всё, что построено по дороге, лежит на ваших аккаунтах с первого дня.",
  holdTitle: "Что у вас на руках к шестой неделе",
  hold: [
    "Ваш список компаний, у каждой найден и проверен адрес",
    "Ваши домены и ящики, прогретые и чистые",
    "Согласованные вами тексты и собранный под ними стоп-лист",
    "Ваши собственные цифры по каждому шагу и решение, которое можно обосновать",
  ],
  weeksTitle: "Как идут шесть недель",
  weeks: [
    { w: "1–2", t: "Настройка", d: "Ваш текущий поток, сегменты, источники, первая выгрузка, правила отсева." },
    { w: "2–3", t: "Первая волна", d: "Отбор, проверка адресов. Тексты уходят вам на согласование." },
    { w: "3–6", t: "Отправка", d: "Переписка ступенями с контролем отказов, разбор входящих, повторные касания." },
    { w: "6", t: "Отчёт", d: "Воронка по сегментам, стоимость клиента, что менять дальше." },
  ],
  deliverTitle: "А если не сработает?",
  deliver: "Тогда у вас есть задокументированный ответ почему — какой сегмент, какой повод, какое предложение не получило ответа — плюс база, домены, тексты и стоп-лист, которые продолжат работать на всё, что вы сделаете дальше. Это дешевле, чем выяснять то же самое год.",
};

export default function OutboundPilot() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="08" id="pilot" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 16 }}>
        {t.holdTitle}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: 38 }}>
        {t.hold.map((h, i) => (
          <motion.div
            key={h}
            variants={itemVariants}
            className="flex gap-4"
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderLeft: "2px solid var(--c-gold)",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.14em", color: "var(--c-gold)", flexShrink: 0, paddingTop: 3 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body-lede)", lineHeight: 1.55 }}>{h}</span>
          </motion.div>
        ))}
      </div>

      {/* Six weeks on a rail — same device as the nine-stage conveyor, so the
          two schedules on the page read as one visual language. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 18 }}>
        {t.weeksTitle}
      </h3>
      <div style={{ position: "relative" }}>
        <div
          aria-hidden="true"
          className="hidden md:block"
          style={{ position: "absolute", left: 0, right: 0, top: 17, height: 1, background: "var(--c-border2)" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-7" style={{ position: "relative" }}>
          {t.weeks.map((w, i) => {
            const last = i === t.weeks.length - 1;
            return (
              <motion.div key={w.w} variants={itemVariants} className="flex flex-col items-start">
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: last ? "var(--c-gold)" : "var(--c-bg2)",
                    border: `1px solid ${last ? "var(--c-gold)" : "var(--c-border2)"}`,
                    color: last ? "var(--c-bg)" : "var(--c-text2)",
                    fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.04em",
                    flexShrink: 0, position: "relative", zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-gold)", marginTop: 13 }}>
                  {language === "ru" ? "Недели " : "Weeks "}{w.w}
                </span>
                <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "5px 0 7px" }}>{w.t}</h4>
                <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{w.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 34, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-sage)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 9 }}>{t.deliverTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: 820 }}>{t.deliver}</p>
      </div>
    </SectionShell>
  );
}
