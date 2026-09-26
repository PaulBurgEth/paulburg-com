"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "../shared";

/**
 * The pilot is the strongest instrument on the page, so it stops reading like a
 * spec sheet. The four commitment figures that used to open it were vendor-side
 * units of work — companies selected, emails sent, bounce ceiling; what a buyer
 * weighs is what they are left holding if it does not work.
 * The four weeks run on a rail, matching the stage conveyor in the formats
 * section. Payment is weekly in advance with a stop before any week (SDR B2B
 * decision 325); the sum is deliberately not published.
 */

const en = {
  eyebrow: "The pilot",
  h2: "Four weeks, paid a week at a time, and you can stop before any week",
  sub: "Not a retainer that quietly renews. Each week is paid in advance, and before each one you decide whether to continue, so what you have at risk at any moment is one week of work.",
  scheduleTitle: "How the four weeks are paid",
  schedule: [
    { w: "Week 1", pay: "You pay for week one", gate: "You decide to start" },
    { w: "Week 2", pay: "You pay for week two", gate: "You decide again" },
    { w: "Week 3", pay: "You pay for week three", gate: "You decide again" },
    { w: "Week 4", pay: "You pay for week four", gate: "You decide again" },
  ],
  scheduleNote: "Each week is paid before it starts, so there is a decision in front of every one of them. Stop before any week and the work stops there.",
  holdTitle: "What you hold at week four",
  hold: [
    "Your list of companies, each one read before the letter",
    "The letters you approved, and the stop-list built underneath them",
    "Your funnel stage by stage: companies, letters, replies, handovers",
    "Your own numbers for every step, and a go or no-go you can defend",
  ],
  rhythmTitle: "What you see, and when",
  rhythm: [
    { w: "Week one", t: "Letters start going out", d: "Not a month of preparation with nothing to show for it. The first letters leave inside the first week, from your own domain." },
    { w: "Every week", t: "A report", d: "Companies found, letters sent, who replied, who was handed over, and what I am changing because of it. Part of the service, not something you have to ask for." },
    { w: "Week four", t: "The whole funnel", d: "Your conversion at every step, the cost of a new client from this channel, and which segments returned what." },
  ],
  deliverTitle: "And if it does not work?",
  deliver: "Then you have a documented answer for why not — which segment, which reason, which offer failed to earn a reply — plus the list, the letters and the stop-list, all of which keep working for whatever you do next. That is a cheaper way to find out than a year of guessing.",
};

const ru = {
  eyebrow: "Пилот",
  h2: "Четыре недели, оплата по неделе, остановиться можно перед любой",
  sub: "Не абонентка, которая тихо продлевается. Каждая неделя оплачивается вперёд, и перед каждой вы решаете, продолжать ли, поэтому под риском у вас в любой момент одна неделя работы.",
  scheduleTitle: "Как оплачиваются четыре недели",
  schedule: [
    { w: "Неделя 1", pay: "Платите первую неделю", gate: "Решаете начать" },
    { w: "Неделя 2", pay: "Платите вторую неделю", gate: "Решаете снова" },
    { w: "Неделя 3", pay: "Платите третью неделю", gate: "Решаете снова" },
    { w: "Неделя 4", pay: "Платите четвёртую неделю", gate: "Решаете снова" },
  ],
  scheduleNote: "Каждая неделя оплачивается до её начала, поэтому перед каждой стоит решение. Остановитесь перед любой неделей — работа на этом прекращается.",
  holdTitle: "Что у вас на руках к четвёртой неделе",
  hold: [
    "Ваш список компаний, каждая прочитана до письма",
    "Согласованные вами тексты и собранный под ними стоп-лист",
    "Воронка по этапам: компании, письма, ответы, передачи",
    "Ваши собственные цифры по каждому шагу и решение, которое можно обосновать",
  ],
  rhythmTitle: "Что вы видите и когда",
  rhythm: [
    { w: "Первая неделя", t: "Письма начинают уходить", d: "Не месяц подготовки, за который нечего показать. Первые письма уходят внутри первой недели, с вашего домена." },
    { w: "Каждую неделю", t: "Отчёт", d: "Сколько компаний найдено, сколько писем ушло, кто ответил, кого передал и что я меняю по итогам. Входит в услугу, а не выпрашивается." },
    { w: "Четвёртая неделя", t: "Вся воронка", d: "Ваша конверсия на каждом шаге, стоимость нового клиента из этого канала и что принёс каждый сегмент." },
  ],
  deliverTitle: "А если не сработает?",
  deliver: "Тогда у вас есть задокументированный ответ почему — какой сегмент, какой повод, какое предложение не получило ответа — плюс база, тексты и стоп-лист, которые продолжат работать на всё, что вы сделаете дальше. Это дешевле, чем выяснять то же самое год.",
};

export default function OutboundPilot() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="08" id="pilot" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Понедельная оплата — сильнейший механизм секции. Четыре недели,
          перед каждой точка решения. */}
      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 18 }}>
        {t.scheduleTitle}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" style={{ marginBottom: 14 }}>
        {t.schedule.map((b) => (
          <motion.div key={b.w} variants={itemVariants} style={{ position: "relative" }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 9 }}>
              <span
                aria-hidden="true"
                className="flex items-center justify-center"
                style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  border: "1px solid var(--c-gold)", background: "var(--c-bg2)",
                  color: "var(--c-gold)", fontFamily: MONO, fontSize: 14, fontWeight: 700, lineHeight: 1,
                }}
              >
                ✓
              </span>
              <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.1em", color: "var(--c-gold)" }}>
                {b.gate}
              </span>
            </div>
            <div
              style={{
                border: "1px solid var(--c-border2)",
                borderTop: "3px solid var(--c-gold)",
                borderRadius: 10,
                background: "var(--c-card)",
                padding: "14px 16px",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text2)", display: "block", marginBottom: 6 }}>
                {b.w}
              </span>
              <span style={{ fontFamily: SANS, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-body-lede)", lineHeight: 1.4 }}>
                {b.pay}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", lineHeight: 1.6, maxWidth: "58ch", marginBottom: 38 }}>
        {t.scheduleNote}
      </p>

      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 16 }}>
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
            <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.12em", color: "var(--c-gold)", flexShrink: 0, paddingTop: 3 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body-lede)", lineHeight: 1.55 }}>{h}</span>
          </motion.div>
        ))}
      </div>

      {/* The weeks on a rail — same device as the nine-stage conveyor, so the
          two schedules on the page read as one visual language. */}
      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 18 }}>
        {t.rhythmTitle}
      </h3>
      <div style={{ position: "relative" }}>
        <div
          aria-hidden="true"
          className="hidden sm:block"
          style={{ position: "absolute", left: 0, right: 0, top: 17, height: 1, background: "var(--c-border2)" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-7" style={{ position: "relative" }}>
          {t.rhythm.map((w, i) => {
            const last = i === t.rhythm.length - 1;
            return (
              <motion.div key={w.w} variants={itemVariants} className="flex flex-col items-start">
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: last ? "var(--c-gold)" : "var(--c-bg2)",
                    border: `1px solid ${last ? "var(--c-gold)" : "var(--c-border2)"}`,
                    color: last ? "var(--c-on-gold)" : "var(--c-text2)",
                    fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.04em",
                    flexShrink: 0, position: "relative", zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-gold)", marginTop: 13 }}>
                  {w.w}
                </span>
                <h4 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "5px 0 7px" }}>{w.t}</h4>
                <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{w.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 34, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-sage)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 9 }}>{t.deliverTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>{t.deliver}</p>
      </div>
    </SectionShell>
  );
}
