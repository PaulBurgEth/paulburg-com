"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BurgMark from "@/components/BurgMark";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";

// Real check: research/2026-10-14/pages/<bali agency>.md, name removed on purpose.
// Matrix: pool csv, priority != C → 110; geo_group 1/2/3 → 56/49/5.
const COUNTS = { never: 56, some: 49, regular: 5 };

const en = {
  eyebrow: "AI answers · the problem",
  h2: "An answer has no second page",
  sub: "A search gives ten links and the buyer scrolls. An AI answer names a few companies, and that is the list.",
  checkLabel: "A real check, October 2026, name removed",
  checkWho: "A villa rental agency in Bali",
  checkQ: "Bali long term villa rental agency",
  checkHow: "ChatGPT, a fresh chat each time, asked three times",
  named: "Named: four other agencies",
  you: "You: 0 of 3",
  dataLead: "We asked ChatGPT and Google AI Mode what buyers ask about agencies in Phuket, Bali and Da Nang. 110 agencies:",
  legend: { never: "never named", some: "named on some questions", regular: "named regularly" },
  own: "Our check, October 2026",
  foot: "Every agency missing from the answer keeps paying for its site while the buyer is sent to someone else.",
};

const ru = {
  eyebrow: "AI-ответы · проблема",
  h2: "У ответа нет второй страницы",
  sub: "Поиск даёт десять ссылок, и покупатель листает. Ответ нейросети называет несколько компаний, и это весь список.",
  checkLabel: "Настоящая проверка, октябрь 2026, без названия",
  checkWho: "Агентство аренды вилл на Бали",
  // The check was run in English; the question stays as asked.
  checkQ: "Bali long term villa rental agency",
  checkHow: "ChatGPT, на английском, каждый раз новый чат, три раза",
  named: "Названы: четыре других агентства",
  you: "Вы: 0 из 3",
  dataLead: "Мы задали ChatGPT и Google AI Mode вопросы, которые покупатели задают об агентствах на Пхукете, Бали и в Дананге. 110 агентств:",
  legend: { never: "не названы ни разу", some: "названы по части вопросов", regular: "называют регулярно" },
  own: "Наша проверка, октябрь 2026",
  foot: "Каждое агентство, которого нет в ответе, продолжает платить за сайт, а покупателя отправляют к другому.",
};

function Dot({ kind }: { kind: "never" | "some" | "regular" }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 12, height: 12, borderRadius: "50%", display: "inline-block",
        background: kind === "regular" ? "var(--c-gold)" : kind === "some" ? "var(--c-muted)" : "transparent",
        border: kind === "never" ? "1px solid var(--c-border2)" : "1px solid transparent",
      }}
    />
  );
}

export default function AiProblem() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const dots = [
    ...Array(COUNTS.regular).fill("regular"),
    ...Array(COUNTS.some).fill("some"),
    ...Array(COUNTS.never).fill("never"),
  ] as ("never" | "some" | "regular")[];

  return (
    <SectionShell num="03" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* The answer as the buyer sees it: a short list, and the company not on it. */}
        <motion.div variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid rgba(200,169,110,0.45)", borderRadius: 10, padding: 24 }}>
          <div style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-gold)", marginBottom: 14 }}>{t.checkLabel}</div>
          <div style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", marginBottom: 6 }}>{t.checkWho}</div>
          <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", lineHeight: 1.3, marginBottom: 6 }}>
            «{t.checkQ}»
          </div>
          <div style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-muted)", marginBottom: 18 }}>{t.checkHow}</div>
          <div className="flex flex-col gap-2" style={{ borderTop: "1px solid var(--c-border)", paddingTop: 14 }}>
            {["A", "B", "C", "D"].map((l) => (
              <div key={l} className="flex items-center gap-3" style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)" }}>
                <span style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-muted)" }}>✓</span>
                {language === "ru" ? `Агентство ${l}` : `Agency ${l}`}
              </div>
            ))}
          </div>
          <div style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", marginTop: 10 }}>{t.named}</div>
          <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.figureSm, marginTop: 14, lineHeight: 1.1 }}>
            <BurgMark weight={1}>{t.you}</BurgMark>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.6, marginBottom: 16 }}>{t.dataLead}</p>
          <div role="img" aria-label={`110: ${COUNTS.never} ${t.legend.never}, ${COUNTS.some} ${t.legend.some}, ${COUNTS.regular} ${t.legend.regular}`} className="flex flex-wrap" style={{ gap: 6, maxWidth: 420 }}>
            {dots.map((k, i) => <Dot key={i} kind={k} />)}
          </div>
          <div className="flex flex-col gap-2" style={{ marginTop: 18 }}>
            {(["never", "some", "regular"] as const).map((k) => (
              <div key={k} className="flex items-center gap-3">
                <Dot kind={k} />
                <span style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: 24, color: k === "regular" ? "var(--c-gold)" : "var(--c-heading)", minWidth: 44 }}>{COUNTS[k]}</span>
                <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)" }}>{t.legend[k]}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-gold)", marginTop: 12 }}>{t.own}</div>
        </motion.div>
      </div>

      <p style={{ fontFamily: SANS, fontSize: T.lede, color: "var(--c-heading)", lineHeight: 1.55, marginTop: 32, maxWidth: "56ch" }}>{t.foot}</p>
    </SectionShell>
  );
}
