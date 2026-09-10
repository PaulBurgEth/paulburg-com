"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SERIF, SANS, MONO, T, sectionVariants } from "../shared";

/**
 * Second screen. This slot used to hold four pilot metrics; the numbers came
 * from one project in one niche, invited arithmetic the funnel could not
 * survive, and never named a reason to keep reading. The band geometry is kept
 * — full-bleed, hairline top and bottom, vertical dividers — because it is the
 * page's visual anchor. Only the content changed: from what we did to what is
 * wrong on the reader's side.
 */

type Item = { k: string; d: string };

const en: { railLabel: string; items: Item[]; caption: string } = {
  railLabel: "Where clients come from now",
  items: [
    { k: "Referrals", d: "They come when they come. Two good months, then a quiet one, and neither one was something you did." },
    { k: "Inbound", d: "Reaches whoever is already searching. By then they have four quotes open and you are one of them." },
    { k: "Your sales team", d: "Works the same two hundred companies it worked three years ago. The list does not grow on its own." },
  ],
  caption: "There is a fourth source, and it is the only one you can switch on deliberately.",
};

const ru: { railLabel: string; items: Item[]; caption: string } = {
  railLabel: "Откуда клиенты приходят сейчас",
  items: [
    { k: "Рекомендации", d: "Приходят когда приходят. Два хороших месяца, потом тихий — и ни то, ни другое не вы сделали." },
    { k: "Входящие", d: "Доходят до тех, кто уже ищет. К этому моменту у них открыто четыре предложения, и вы одно из них." },
    { k: "Ваш отдел продаж", d: "Работает те же двести компаний, что и три года назад. Список сам не растёт." },
  ],
  caption: "Есть четвёртый источник, и он единственный, который можно включить намеренно.",
};

export default function OutboundProblem() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const reduced = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView || reduced ? "visible" : "hidden"}
      data-rail-label={t.railLabel}
      style={{
        background: "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
        borderBottom: "1px solid var(--c-border)",
        position: "relative",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute", top: 24, right: 28, fontFamily: MONO,
          fontSize: T.caption, letterSpacing: "0.18em", color: "var(--c-muted)",
        }}
      >
        § 01
      </span>
      <div className="container-custom">
        <div className="flex flex-wrap">
          {t.items.map((m, i) => (
            <div
              key={m.k}
              className="flex flex-col justify-start py-9 flex-1 min-w-[250px]"
              style={{
                borderRight: i < t.items.length - 1 ? "1px solid var(--c-border)" : "none",
                paddingLeft: i === 0 ? 0 : 28,
                paddingRight: 28,
              }}
            >
              <span
                style={{
                  fontFamily: SERIF, fontWeight: 700, fontSize: 21, color: "var(--c-gold)",
                  lineHeight: 1.15, letterSpacing: "-0.02em",
                }}
              >
                {m.k}
              </span>
              <span
                style={{
                  fontFamily: SANS, fontWeight: 400, fontSize: T.body,
                  color: "var(--c-body)", marginTop: 12, maxWidth: 340, lineHeight: 1.55,
                }}
              >
                {m.d}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em",
            color: "var(--c-gold)", paddingBottom: 24, paddingTop: 4, maxWidth: "68ch",
          }}
        >
          {t.caption}
        </p>
      </div>
    </motion.section>
  );
}
