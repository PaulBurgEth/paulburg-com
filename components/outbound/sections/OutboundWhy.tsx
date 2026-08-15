"use client";

import { motion } from "framer-motion";
import { Megaphone, Crosshair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, itemVariants } from "../shared";

const en = {
  eyebrow: "Why this channel",
  h2: "Ads buy a click. This buys a place on the shortlist.",
  sub: "Advertising reaches people who are already looking. Most of your buyers are not looking — they already have a supplier, or they do not know a better option exists.",
  colA: {
    title: "What advertising does",
    icon: "ads",
    points: [
      "Reaches whoever is already searching — a small share of your market",
      "Cannot be aimed at named companies. You cannot tell an ad platform to show only to firms that bought twice this quarter",
      "Runs in one or two languages, so entire markets never see it",
      "Arrives when the buyer starts looking — by then the shortlist exists",
    ],
  },
  colB: {
    title: "What this does",
    icon: "outbound",
    points: [
      "Reaches companies chosen by name, before they start looking",
      "Every company is picked because something happened that gives a reason to write",
      "Each email is in the recipient's own language",
      "Arrives while the reason is still fresh — days after the event, not months",
    ],
  },
  stat: {
    figures: ["95%", "80%"],
    labels: [
      "of buyers choose from a shortlist that already existed on day one",
      "of deals go to the vendor who made contact first",
    ],
    source: "6sense, 2025 B2B Buyer Experience Report",
  },
  note: "This is not an argument against advertising. It is an argument that advertising cannot reach a company that is not searching yet — and that is where the shortlist is decided.",
};

const ru = {
  eyebrow: "Почему этот канал",
  h2: "Реклама покупает клик. Это покупает место в шорт-листе.",
  sub: "Реклама доходит до тех, кто уже ищет. Большинство ваших покупателей не ищут: у кого-то уже есть поставщик, кто-то просто не знает, что бывает иначе.",
  colA: {
    title: "Что делает реклама",
    icon: "ads",
    points: [
      "Доходит до тех, кто уже ищет, — до небольшой доли вашего рынка",
      "Её нельзя навести на конкретные компании. Сказать рекламной системе «показывай только тем, кто закупал дважды за квартал» нельзя",
      "Ведётся на одном-двух языках, поэтому целые рынки её не видят",
      "Приходит, когда покупатель начал искать, — а шорт-лист к этому моменту уже собран",
    ],
  },
  colB: {
    title: "Что делает этот канал",
    icon: "outbound",
    points: [
      "Доходит до компаний, выбранных поимённо, до того как они начали искать",
      "Каждая компания взята потому, что у неё произошло событие, дающее повод написать",
      "Каждое письмо — на языке получателя",
      "Приходит, пока повод свежий: через дни после события, а не через месяцы",
    ],
  },
  stat: {
    figures: ["95%", "80%"],
    labels: [
      "покупателей выбирают из шорт-листа, который был у них в первый же день",
      "сделок достаётся тому, кто связался первым",
    ],
    source: "6sense, 2025 B2B Buyer Experience Report",
  },
  note: "Это не аргумент против рекламы. Это аргумент о том, что реклама не достаёт компанию, которая ещё не ищет, — а именно там и решается шорт-лист.",
};

export default function OutboundWhy() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;
  const cols = [t.colA, t.colB];

  return (
    <SectionShell num="02" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cols.map((col, ci) => {
          const isOutbound = col.icon === "outbound";
          const Icon = isOutbound ? Crosshair : Megaphone;
          return (
            <motion.div
              key={ci}
              variants={itemVariants}
              style={{
                background: isOutbound ? "var(--c-card2)" : "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderLeft: isOutbound ? "2px solid var(--c-gold)" : "1px solid var(--c-border)",
                borderRadius: 10,
                padding: 22,
              }}
            >
              <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.15)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} color="var(--c-gold)" />
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, color: "var(--c-heading)" }}>
                  {col.title}
                </h3>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: MONO, fontSize: 10, color: "var(--c-muted)",
                        paddingTop: 3, flexShrink: 0, letterSpacing: "0.1em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.65 }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        style={{
          marginTop: 20,
          background: "var(--c-card)",
          border: "1px solid rgba(200,169,110,0.22)",
          borderRadius: 10,
          padding: 24,
        }}
      >
        {t.stat.figures.map((fig, i) => (
          <div key={i} className="flex items-baseline gap-4">
            <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, color: "var(--c-gold)", lineHeight: 1, flexShrink: 0 }}>
              {fig}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 13, color: "var(--c-body)", lineHeight: 1.6 }}>
              {t.stat.labels[i]}
            </span>
          </div>
        ))}
        <p
          className="sm:col-span-2"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "var(--c-muted)" }}
        >
          {t.stat.source}
        </p>
      </motion.div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
