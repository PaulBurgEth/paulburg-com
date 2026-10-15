"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";

const en = {
  eyebrow: "AI answers · what you get",
  h2: "AI can see your company, and you can check it",
  items: [
    "You know where you lose buyers: the questions where you are missing and who is named instead.",
    "Your site is open to ChatGPT, Google and other AI crawlers, and your pages carry your own prices and facts, with markup, so the answers have something of yours to read and quote.",
    "Measured before the work, on day 30 and day 60: whether AI describes your company correctly, whether your site shows up among the sources of the answers, and visits from ChatGPT and other AI in your analytics.",
  ],
  promiseT: "What I promise",
  promise: "The work, done and shown: AI can reach and read your site, your pages and data are in place, and three measurements. If on day 60 none of the measurements has moved, I work one more month at my cost.",
  notT: "What I do not promise",
  not: "A place in a specific answer. No one controls it, and anyone who sells one is selling the promise. If you get named, the measurements will show it.",
};

const ru = {
  eyebrow: "AI-ответы · что вы получаете",
  h2: "Нейросети видят вашу компанию, и это можно проверить",
  items: [
    "Вы знаете, где теряете покупателей: вопросы, где вас нет, и кого называют вместо вас.",
    "Сайт открыт для ботов ChatGPT, Google и других нейросетей, на ваших страницах ваши цены и факты с разметкой: ответам есть что о вас прочитать и процитировать.",
    "Замер до работы, на 30-й и 60-й день: верно ли нейросеть описывает компанию, есть ли ваш сайт среди источников ответов, сколько заходов из ChatGPT и других нейросетей в вашей аналитике.",
  ],
  promiseT: "Что обещаю",
  promise: "Работу, сделанную и показанную: нейросети могут зайти на сайт и прочитать его, страницы и данные на месте, три замера. Если на 60-й день ни один замер не сдвинулся, работаю ещё месяц за свой счёт.",
  notT: "Чего не обещаю",
  not: "Места в конкретном ответе. Им не управляет никто, и тот, кто его продаёт, продаёт обещание. Если вас начнут называть, это покажут замеры.",
};

const corner = (pos: Record<string, number>) => ({
  position: "absolute" as const, width: 14, height: 14, ...pos,
  borderColor: "var(--c-gold)", borderStyle: "solid", borderWidth: 0,
});

export default function AiGet() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="05" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} />
      <ol className="flex flex-col" style={{ gap: 22, marginBottom: 36 }}>
        {t.items.map((s, i) => (
          <motion.li key={s} variants={itemVariants} className="flex gap-5 items-baseline">
            <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.12em", color: "var(--c-gold)", flexShrink: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", lineHeight: 1.4, maxWidth: "52ch" }}>{s}</span>
          </motion.li>
        ))}
      </ol>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* L-brackets from the turnkey banner: the one promise on the page. */}
        <motion.div variants={itemVariants} style={{ position: "relative", background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.35)", borderRadius: 10, padding: 24 }}>
          <span aria-hidden="true" style={{ ...corner({ top: 8, left: 8 }), borderTopWidth: 2, borderLeftWidth: 2 }} />
          <span aria-hidden="true" style={{ ...corner({ bottom: 8, right: 8 }), borderBottomWidth: 2, borderRightWidth: 2 }} />
          <div style={{ fontFamily: MONO, fontSize: T.eyebrow, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 10 }}>{t.promiseT}</div>
          <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-heading)", lineHeight: 1.6 }}>{t.promise}</p>
        </motion.div>
        <motion.div variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 24 }}>
          <div style={{ fontFamily: MONO, fontSize: T.eyebrow, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-muted)", marginBottom: 10 }}>{t.notT}</div>
          <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.6 }}>{t.not}</p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
