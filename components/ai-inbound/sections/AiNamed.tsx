"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants, cardQuietStyle } from "@/components/outbound/shared";
import { ProofCard, SOURCES } from "../shared";

// checks_log.jsonl, real-estate answers with `links` (169), top-30 cited domains:
// 26 agency sites, 4 others (Google Maps, Facebook, phuket.net, ddproperty).
const OWN = 26;
const TOTAL = 30;

const en = {
  eyebrow: "AI visibility · what AI quotes",
  h2: "Answers quote the companies whose own pages answer the question",
  barLead: "In 169 answers that showed their sources, the 30 most-cited sites:",
  barOwn: "the companies' own sites",
  barRest: "Google Maps, Facebook, two property portals",
  own: "Our check, October 2026",
  bl: { n: "58%", d: "of the sources behind local answers in ChatGPT Search are business websites." },
  note: "I see it on my own rental platform, HelpRent Da Nang: asked a question its price data answers, ChatGPT cites it; asked a general question, it cites a competitor.",
  foot: "Being good is not enough. The answer needs something of yours to quote.",
};

const ru = {
  eyebrow: "AI-видимость · что цитируют нейросети",
  h2: "Ответ цитирует компании, чьи страницы отвечают на вопрос",
  barLead: "В 169 ответах с источниками, 30 самых цитируемых сайтов:",
  barOwn: "сайты самих компаний",
  barRest: "Google Maps, Facebook, два портала недвижимости",
  own: "Наша проверка, октябрь 2026",
  bl: { n: "58%", d: "источников местных ответов в ChatGPT Search это сайты компаний." },
  note: "То же видно на моей платформе аренды HelpRent Da Nang: на вопрос, на который отвечают её данные по ценам, ChatGPT ссылается на неё; на общий вопрос, на конкурента.",
  foot: "Быть хорошими мало. Ответу нужно, что процитировать у вас.",
};

export default function AiNamed() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="04">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} />

      <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", marginBottom: 12 }}>{t.barLead}</p>
        <div role="img" aria-label={`${OWN} / ${TOTAL}: ${t.barOwn}`} className="flex" style={{ gap: 3 }}>
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} aria-hidden="true" style={{ flex: 1, height: 22, background: i < OWN ? "var(--c-gold)" : "var(--c-border2)" }} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2" style={{ marginTop: 12 }}>
          <span className="flex items-baseline gap-3">
            <span style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.figureSm, color: "var(--c-gold)" }}>{OWN}</span>
            <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)" }}>{t.barOwn}</span>
          </span>
          <span className="flex items-baseline gap-3">
            <span style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: 28, color: "var(--c-text2)" }}>{TOTAL - OWN}</span>
            <span style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)" }}>{t.barRest}</span>
          </span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-gold)", marginTop: 8 }}>{t.own}</div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 items-stretch">
        <ProofCard n={t.bl.n} d={t.bl.d} source={SOURCES.brightlocal2024} />
        <motion.div variants={itemVariants} style={{ ...cardQuietStyle, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
          <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65 }}>{t.note}</p>
          <p style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", lineHeight: 1.3 }}>{t.foot}</p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
