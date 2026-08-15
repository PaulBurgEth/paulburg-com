"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, T, itemVariants } from "../shared";

const en = {
  eyebrow: "Why this channel",
  h2: "Ads buy a click. This buys a place on the shortlist.",
  sub: "Advertising reaches whoever is already searching. It cannot be aimed at named companies, and it runs in one or two languages, so entire markets never see it.",
  stat: [
    { v: "95%", l: "of buyers choose from a shortlist that already existed on day one" },
    { v: "80%", l: "of deals go to the vendor who made contact first" },
  ],
  source: "6sense, 2025 B2B Buyer Experience Report",
  kicker: "By the time someone searches for a vendor, the shortlist is set. This channel reaches them before that — by name, in their own language, while the reason is still fresh.",
};

const ru = {
  eyebrow: "Почему этот канал",
  h2: "Реклама покупает клик. Это покупает место в шорт-листе.",
  sub: "Реклама доходит до тех, кто уже ищет. Её нельзя навести на конкретные компании, и ведётся она на одном-двух языках, поэтому целые рынки её не видят.",
  stat: [
    { v: "95%", l: "покупателей выбирают из шорт-листа, который был у них в первый же день" },
    { v: "80%", l: "сделок достаётся тому, кто связался первым" },
  ],
  source: "6sense, 2025 B2B Buyer Experience Report",
  kicker: "Когда человек начинает искать подрядчика, шорт-лист уже собран. Этот канал доходит до него раньше — поимённо, на его языке, пока повод свежий.",
};

export default function OutboundWhy() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="02" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-7"
        style={{ background: "var(--c-card)", border: "1px solid rgba(200,169,110,0.22)", borderRadius: 10, padding: 26 }}
      >
        {t.stat.map((s) => (
          <div key={s.v} className="flex items-baseline gap-4">
            <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 40, color: "var(--c-gold)", lineHeight: 1, flexShrink: 0 }}>{s.v}</span>
            <span style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.55 }}>{s.l}</span>
          </div>
        ))}
        <p className="sm:col-span-2" style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-text2)" }}>
          {t.source}
        </p>
      </motion.div>

      <p style={{ fontFamily: SANS, fontSize: T.lede, color: "var(--c-body)", lineHeight: 1.65, marginTop: 24, maxWidth: 780 }}>
        {t.kicker}
      </p>
    </SectionShell>
  );
}
