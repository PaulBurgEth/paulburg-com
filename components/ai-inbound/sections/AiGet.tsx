"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";

const en = {
  eyebrow: "AI answers · what you get",
  h2: "AI can see your company, and you can check it",
  items: [
    "You know where you lose buyers: the questions where you are missing and who is named instead.",
    "ChatGPT and Google read your site and find your own prices and facts there, so the answers have something of yours to quote.",
    "Measured before the work, on day 30 and day 60: whether AI describes your company correctly, whether your site shows up among the sources of the answers, and visits from ChatGPT and other AI in your analytics.",
  ],
  riskT: "The risk is on me",
  risk: "If on day 60 none of the three measurements has moved, I keep working for another month at my cost.",
};

const ru = {
  eyebrow: "AI-ответы · что вы получаете",
  h2: "Нейросети видят вашу компанию, и это можно проверить",
  items: [
    "Вы знаете, где теряете покупателей: вопросы, где вас нет, и кого называют вместо вас.",
    "ChatGPT и Google читают ваш сайт и находят на нём ваши цены и факты: ответам есть что о вас процитировать.",
    "Замер до работы, на 30-й и 60-й день: верно ли нейросеть описывает компанию, есть ли ваш сайт среди источников ответов, сколько заходов из ChatGPT и других нейросетей в вашей аналитике.",
  ],
  riskT: "Риск на мне",
  risk: "Если на 60-й день ни один из трёх замеров не сдвинулся, продолжаю работать ещё месяц за свой счёт.",
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

      {/* Risk reversal, the turnkey banner's L-brackets. A sales page carries
          honesty as risk reversal and a fit section, not as a disclaimer list. */}
      <motion.div variants={itemVariants} style={{ position: "relative", background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.35)", borderRadius: 10, padding: "24px 28px", maxWidth: 760 }}>
        <span aria-hidden="true" style={{ ...corner({ top: 8, left: 8 }), borderTopWidth: 2, borderLeftWidth: 2 }} />
        <span aria-hidden="true" style={{ ...corner({ bottom: 8, right: 8 }), borderBottomWidth: 2, borderRightWidth: 2 }} />
        <div style={{ fontFamily: MONO, fontSize: T.eyebrow, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 10 }}>{t.riskT}</div>
        <p style={{ fontFamily: SANS, fontSize: T.lede, color: "var(--c-heading)", lineHeight: 1.55 }}>{t.risk}</p>
      </motion.div>
    </SectionShell>
  );
}
