"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, SERIF, SANS, MONO, T, cardHover, itemVariants } from "../shared";

const en = {
  eyebrow: "What you get",
  h2: "Two formats. Pick by who is going to work the replies.",
  sub: "The work is the same up to the handover. The only question is whether you have someone free to take the conversation from there.",
  formats: [
    { range: "01 — 06", situation: "You have someone to work the replies", name: "Leads", body: "Selection, contact finding, emails, correspondence, qualification. You get a client who confirmed a need and is ready to talk terms. Your manager picks up a conversation that is already running." },
    { range: "01 — 09", situation: "You do not, and one more inbound only gets in the way", name: "Leads + deal", body: "All of the above plus the deal: pinning the specification, requesting terms from your suppliers, assembling the quote, and running the correspondence to an agreed price and lead time. Your account manager receives a finished order." },
  ],
  stagesTitle: "Nine stages, every company goes through them in order",
  stages: ["Selection", "Contact", "Email", "Correspondence", "Reply triage", "Handover", "Specification", "Terms", "Agreement"],
  dealBadge: "Deal format only",
  note: "Both formats include the correspondence with everyone who replies, and a weekly report on what went out, what came back and what I am changing because of it. Nothing is skipped in either — the second simply does not stop at the handover. Full stage-by-stage breakdown on request.",
};

const ru = {
  eyebrow: "Что вы получаете",
  h2: "Два формата. Выбирают по тому, кто будет разбирать ответы.",
  sub: "До передачи работа одинаковая. Вопрос только в том, есть ли у вас свободный человек, чтобы вести разговор дальше.",
  formats: [
    { range: "01 — 06", situation: "Есть кому разбирать ответы", name: "Лиды", body: "Отбор, поиск контактов, письма, переписка, квалификация. Вы получаете клиента, который подтвердил потребность и готов обсуждать условия. Ваш менеджер продолжает разговор, который уже идёт." },
    { range: "01 — 09", situation: "Некому, и лишний входящий только мешает", name: "Лиды и сделка", body: "Всё то же плюс работа по сделке: уточнение спецификации, запрос условий у ваших поставщиков, сбор расчёта и переписка до согласованных цены и сроков. Аккаунт-менеджер получает готовый заказ." },
  ],
  stagesTitle: "Девять этапов, каждая компания проходит их по порядку",
  stages: ["Отбор", "Контакт", "Письмо", "Переписка", "Разбор ответов", "Передача", "Уточнение", "Условия", "Согласование"],
  dealBadge: "Только формат со сделкой",
  note: "В оба формата входит дальнейшая переписка со всеми, кто ответил, и еженедельный отчёт: что ушло, что вернулось и что я по этому меняю. Ни один этап не пропускается ни в одном из них — второй просто не останавливается на передаче. Подробная раскладка по этапам — по запросу.",
};

export default function OutboundFormats() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="04" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-4">
        {t.formats.map((f, i) => (
          <motion.div
            key={f.name}
            variants={itemVariants}
            whileHover={cardHover}
            style={{
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderTop: i === 1 ? "2px solid var(--c-gold)" : "1px solid var(--c-border)",
              borderRadius: 10,
              padding: 24,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.16em", color: "var(--c-gold)" }}>{f.range}</span>
            {/* The situation first, the product name second: the reader picks by
                which sentence describes their office, not by a handover point. */}
            <p style={{ fontFamily: SANS, fontSize: T.body, fontWeight: 600, color: "var(--c-heading)", margin: "11px 0 4px", lineHeight: 1.4 }}>
              {f.situation}
            </p>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 21, color: "var(--c-gold)", margin: "0 0 11px" }}>{f.name}</h3>
            <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>{f.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline strip — replaces a 3x3 grid of nine In/Out prose cards. */}
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "38px 0 16px" }}>
        {t.stagesTitle}
      </h3>
      {/* A conveyor, not a chip cloud: a rail runs behind the numbers so the
          nine stages read as one sequence, and 07-09 sit visibly past the
          handover point where the second format begins. */}
      <div style={{ position: "relative" }}>
        <div
          aria-hidden="true"
          className="hidden md:block"
          style={{ position: "absolute", left: 0, right: 0, top: 17, height: 1, background: "var(--c-border2)" }}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-x-2 gap-y-6" style={{ position: "relative" }}>
          {t.stages.map((stage, i) => {
            const isDeal = i >= 6;
            return (
              <motion.div key={stage} variants={itemVariants} className="flex flex-col items-start">
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: isDeal ? "var(--c-gold)" : "var(--c-bg)",
                    border: `1px solid ${isDeal ? "var(--c-gold)" : "var(--c-border2)"}`,
                    color: isDeal ? "var(--c-bg)" : "var(--c-text2)",
                    fontFamily: MONO, fontWeight: 700, fontSize: T.caption, letterSpacing: "0.06em",
                    flexShrink: 0, position: "relative", zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: SANS, fontSize: T.bodySm, fontWeight: 600,
                    color: "var(--c-heading)", marginTop: 11, lineHeight: 1.3,
                  }}
                >
                  {stage}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
        <span style={{ width: 13, height: 13, borderRadius: "50%", background: "var(--c-gold)", display: "inline-block" }} />
        <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text2)" }}>{t.dealBadge}</span>
      </div>

      <Note>{t.note}</Note>
    </SectionShell>
  );
}
