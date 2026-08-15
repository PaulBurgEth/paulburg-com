"use client";

import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, itemVariants } from "../shared";

const en = {
  eyebrow: "The pilot",
  h2: "Six weeks to your own numbers",
  sub: "The point of the pilot is to get funnel coefficients for your market. I would not carry another industry's numbers across to you, so we measure yours.",
  weeks: [
    { w: "Weeks 1-2", t: "Channel setup", d: "Going through your current flow: who buys, where it leaks. Segments, sources, first extract, filtering rules." },
    { w: "Weeks 2-3", t: "First wave", d: "Selection, address finding and verification. Copy goes to you for approval." },
    { w: "Weeks 3-6", t: "Sending", d: "Stepped sending with bounce control, inbound triage, follow-ups." },
    { w: "Week 6", t: "Report", d: "Funnel by segment, cost per client, what to change next." },
  ],
  commitTitle: "What I commit to",
  commitments: [
    "600-900 companies selected, each with a verified address",
    "800-1 200 emails sent: first touch plus one follow-up",
    "Bounces held under 5%",
    "Every inbound reply triaged the same working day",
    "A week-six report with the full funnel and cost per client",
  ],
  notPromisedTitle: "What the pilot measures but does not promise",
  notPromised: "Reply rate and the number of qualified clients depend on the market. I have not run your niche yet, so I will name those numbers after the pilot, not before it. For scale: pilot A came out at a 2.0% reply rate and 67% of replies taken through to a quote.",
  deliverTitle: "What you hold at week six",
  deliver: [
    "Your own conversion coefficient for every step of the funnel",
    "The cost of a new client from this channel",
    "A per-segment list showing what each one returned and what it cost",
  ],
};

const ru = {
  eyebrow: "Пилот",
  h2: "Шесть недель до ваших цифр",
  sub: "Смысл пилота — получить коэффициенты воронки на вашем рынке. Переносить на вас цифры другой отрасли я бы не стал, поэтому меряем ваши.",
  weeks: [
    { w: "Недели 1-2", t: "Настройка канала", d: "Разбор вашего потока: кто покупает, где отваливается. Сегменты, источники, первая выгрузка, правила отсева." },
    { w: "Недели 2-3", t: "Первая волна", d: "Отбор, поиск и проверка адресов. Тексты уходят вам на согласование." },
    { w: "Недели 3-6", t: "Отправка", d: "Переписка ступенями с контролем отказов, разбор входящих, повторные касания." },
    { w: "Неделя 6", t: "Отчёт", d: "Воронка по сегментам, стоимость клиента, что менять дальше." },
  ],
  commitTitle: "За что я отвечаю",
  commitments: [
    "600-900 компаний отобрано, у каждой проверенный адрес",
    "800-1 200 писем отправлено: первое касание плюс одно повторное",
    "Отказы доставки удержаны ниже 5%",
    "Каждое входящее письмо разобрано в тот же рабочий день",
    "Отчёт на шестой неделе с полной воронкой и стоимостью клиента",
  ],
  notPromisedTitle: "Что пилот измеряет, но не обещает",
  notPromised: "Отклик и число доведённых клиентов зависят от рынка. Вашу нишу я ещё не пробовал, поэтому назову эти цифры после пилота, а не до него. Для ориентира: на пилоте A вышло 2,0% отклика и 67% доведения ответа до расчёта.",
  deliverTitle: "Что у вас на руках к шестой неделе",
  deliver: [
    "Ваш собственный коэффициент по каждому шагу воронки",
    "Стоимость нового клиента из этого канала",
    "Список сегментов с отдачей по каждому: что дал и чего стоил",
  ],
};

export default function OutboundPilot() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="08" id="pilot" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {t.weeks.map((w) => (
          <motion.div
            key={w.w}
            variants={itemVariants}
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderTop: "2px solid rgba(200,169,110,0.35)",
              borderRadius: 10,
              padding: 18,
            }}
          >
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-gold)" }}>
              {w.w}
            </span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, color: "var(--c-heading)", margin: "8px 0 7px" }}>
              {w.t}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.65 }}>{w.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 24 }}>
        <div style={{ background: "var(--c-card)", border: "1px solid rgba(200,169,110,0.22)", borderRadius: 10, padding: 20 }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, color: "var(--c-heading)", marginBottom: 14 }}>
            {t.commitTitle}
          </h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.commitments.map((c) => (
              <li key={c} className="flex gap-2.5 items-start">
                <Check size={14} color="var(--c-gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.6 }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "var(--c-card2)", border: "1px solid var(--c-border2)", borderRadius: 10, padding: 20 }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: 10 }}>
              <AlertCircle size={15} color="var(--c-text2)" style={{ flexShrink: 0 }} />
              <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)" }}>
                {t.notPromisedTitle}
              </h3>
            </div>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.7 }}>{t.notPromised}</p>
          </div>

          <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 20 }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: "var(--c-heading)", marginBottom: 12 }}>
              {t.deliverTitle}
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {t.deliver.map((d) => (
                <li key={d} style={{ fontFamily: SANS, fontSize: 12.5, color: "var(--c-body)", lineHeight: 1.6 }}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
