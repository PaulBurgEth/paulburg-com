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
  h2: "Six weeks, one fixed price, and three points where you can stop",
  sub: "Not a retainer that quietly renews. You pay in thirds, each one two weeks ahead of the work it covers, so what you have at risk at any moment is a third. Everything built along the way is on your accounts from day one.",
  scheduleTitle: "How the six weeks are paid",
  schedule: [
    { w: "Weeks 1–2", pay: "You pay the first third", gate: "You decide to start" },
    { w: "Weeks 3–4", pay: "You pay the second third", gate: "You decide again" },
    { w: "Weeks 5–6", pay: "You pay the last third", gate: "You decide again" },
  ],
  scheduleNote: "Each third is paid two weeks ahead of the work it covers, so there is a decision in front of every one of them. Stop after any block and the work stops there — what you had at risk was a third.",
  holdTitle: "What you hold at week six",
  hold: [
    "Your list of companies, every address found and verified",
    "Your domains and mailboxes, warmed and clean",
    "The copy you approved, and the stop-list built underneath it",
    "Your own numbers for every step, and a go or no-go you can defend",
  ],
  rhythmTitle: "What you see, and when",
  rhythm: [
    { w: "Week one", t: "Letters start going out", d: "Not a month of preparation with nothing to show for it. The mailboxes are configured and the first letters leave inside the first week." },
    { w: "Every week", t: "A report", d: "What went out, what came back, the numbers under both, and what I am changing because of them. Part of the service, not something you have to ask for." },
    { w: "Week six", t: "The whole funnel", d: "Your conversion at every step, the cost of a new client from this channel, and which segments returned what." },
  ],
  exclusiveTitle: "While we work, nobody with your profile does",
  exclusive: "One business per niche. For as long as this is running I do not take another company that sells what you sell — and a niche, counted honestly, has room for about one client anyway. That is a limit on how much of this I can sell, and it is the reason it is worth buying.",
  deliverTitle: "And if it does not work?",
  deliver: "Then you have a documented answer for why not — which segment, which trigger, which offer failed to earn a reply — plus the list, the domains, the copy and the stop-list, all of which keep working for whatever you do next. That is a cheaper way to find out than a year of guessing.",
};

const ru = {
  eyebrow: "Пилот",
  h2: "Шесть недель, одна фиксированная цена и три точки, где можно остановиться",
  sub: "Не абонентка, которая тихо продлевается. Оплата третями, каждая — за две недели вперёд той работы, которую покрывает, поэтому под риском у вас в любой момент треть. Всё, что построено по дороге, лежит на ваших аккаунтах с первого дня.",
  scheduleTitle: "Как оплачиваются шесть недель",
  schedule: [
    { w: "Недели 1–2", pay: "Платите первую треть", gate: "Решаете начать" },
    { w: "Недели 3–4", pay: "Платите вторую треть", gate: "Решаете снова" },
    { w: "Недели 5–6", pay: "Платите последнюю треть", gate: "Решаете снова" },
  ],
  scheduleNote: "Каждая треть платится за две недели вперёд той работы, которую покрывает, поэтому перед каждой стоит решение. Остановитесь после любого блока — работа на этом прекращается, а под риском была треть.",
  holdTitle: "Что у вас на руках к шестой неделе",
  hold: [
    "Ваш список компаний, у каждой найден и проверен адрес",
    "Ваши домены и ящики, прогретые и чистые",
    "Согласованные вами тексты и собранный под ними стоп-лист",
    "Ваши собственные цифры по каждому шагу и решение, которое можно обосновать",
  ],
  rhythmTitle: "Что вы видите и когда",
  rhythm: [
    { w: "Первая неделя", t: "Письма начинают уходить", d: "Не месяц подготовки, за который нечего показать. Ящики настраиваются, и первые письма уходят внутри первой недели." },
    { w: "Каждую неделю", t: "Отчёт", d: "Что ушло, что вернулось, цифры под тем и другим и что я меняю по ним. Входит в услугу, а не выпрашивается." },
    { w: "Шестая неделя", t: "Вся воронка", d: "Ваша конверсия на каждом шаге, стоимость нового клиента из этого канала и что принёс каждый сегмент." },
  ],
  exclusiveTitle: "Пока мы работаем, никто с вашим профилем не работает",
  exclusive: "Один бизнес на нишу. Пока это идёт, я не беру другую компанию, которая продаёт то же, что и вы — а в нише, если считать честно, и так помещается примерно один заказчик. Это ограничение на то, сколько я могу этого продать, и ровно поэтому это стоит покупать.",
  deliverTitle: "А если не сработает?",
  deliver: "Тогда у вас есть задокументированный ответ почему — какой сегмент, какой повод, какое предложение не получило ответа — плюс база, домены, тексты и стоп-лист, которые продолжат работать на всё, что вы сделаете дальше. Это дешевле, чем выяснять то же самое год.",
};

export default function OutboundPilot() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="08" id="pilot" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Оплата третями — сильнейший механизм секции, и до этого он был одним
          предложением. Три блока по две недели, перед каждым точка решения. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 18 }}>
        {t.scheduleTitle}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginBottom: 14 }}>
        {t.schedule.map((b, i) => (
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
                borderRadius: 8,
                background: "var(--c-card)",
                padding: "14px 16px",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-text2)", display: "block", marginBottom: 6 }}>
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
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-gold)", marginTop: 13 }}>
                  {w.w}
                </span>
                <h4 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "5px 0 7px" }}>{w.t}</h4>
                <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{w.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 34, background: "var(--c-card)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-gold)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 9 }}>{t.exclusiveTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>{t.exclusive}</p>
      </div>

      <div style={{ marginTop: 12, background: "var(--c-card2)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-sage)", borderRadius: 10, padding: 22 }}>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 9 }}>{t.deliverTitle}</h3>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>{t.deliver}</p>
      </div>
    </SectionShell>
  );
}
