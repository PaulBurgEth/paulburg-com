"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, SANS, MONO, T, itemVariants } from "../shared";

/**
 * Qualification, both ways.
 *
 * The fit list used to sit at the bottom of the mechanism section with no
 * counterpart. A page that only says who it is for reads like it is for
 * everyone. Two plain columns, no cards — the one section on the page that is
 * nothing but text.
 */

const en = {
  eyebrow: "Fit",
  h2: "Who this works for, and who it does not",
  sub: "It is a narrow channel on purpose. Below is the honest version of both lists — if the right column describes you, say so and I will tell you straight.",
  yesTitle: "This works when",
  yes: [
    "You sell to businesses",
    "The purchase is considered, not impulsive",
    "The buyer is an identifiable legal entity",
    "The deal justifies a month of correspondence",
    "The buying event leaves a public trace",
  ],
  noTitle: "This is not for you if",
  no: [
    "You sell to consumers, or the decision is made by a person rather than a company",
    "The average deal is small enough that a month of correspondence costs more than it returns",
    "You need volume this week — the first emails go out in week three",
    "You want everyone who clicked. This channel is narrow by design and stays narrow",
    "A decision-maker's answer takes weeks to approve on your side. The company moves on before you reply",
  ],
  note: "If you are not sure which column you are in, that is a two-message conversation, not a project. Write and I will tell you if it does not fit.",
};

const ru = {
  eyebrow: "Кому подходит",
  h2: "Кому это работает, а кому нет",
  sub: "Канал узкий намеренно. Ниже честная версия обоих списков — если про вас правая колонка, напишите, и я скажу прямо.",
  yesTitle: "Это работает, если",
  yes: [
    "Вы продаёте бизнесу",
    "Покупка обдуманная, а не импульсная",
    "Покупатель — определяемое юридическое лицо",
    "Сделка оправдывает месяц переписки",
    "Событие покупки оставляет публичный след",
  ],
  noTitle: "Это не для вас, если",
  no: [
    "Вы продаёте физлицам или решение принимает человек, а не компания",
    "Средний чек такой, что месяц переписки стоит дороже, чем приносит",
    "Объём нужен на этой неделе — первые письма уходят на третьей",
    "Нужны все, кто кликнул. Этот канал узкий по устройству и таким остаётся",
    "Ответ ЛПР согласуется у вас неделями. Компания уйдёт раньше, чем вы ответите",
  ],
  note: "Если непонятно, в какой вы колонке — это разговор на два сообщения, а не проект. Напишите, и я скажу, если не подходит.",
};

export default function OutboundFit() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  const colTitle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: T.caption,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 16,
  };

  return (
    <SectionShell num="07">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
        <div>
          <span style={{ ...colTitle, color: "var(--c-sage)" }}>{t.yesTitle}</span>
          <ul className="flex flex-col gap-3.5">
            {t.yes.map((f) => (
              <motion.li key={f} variants={itemVariants} className="flex gap-3">
                <Check size={16} color="var(--c-sage)" style={{ flexShrink: 0, marginTop: 4 }} />
                <span style={{ fontFamily: SANS, fontSize: T.body, lineHeight: 1.55, color: "var(--c-body-lede)" }}>{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="md:pl-12 md:border-l" style={{ borderColor: "var(--c-border)" }}>
          <span style={{ ...colTitle, color: "var(--c-muted)" }}>{t.noTitle}</span>
          <ul className="flex flex-col gap-3.5">
            {t.no.map((f) => (
              <motion.li key={f} variants={itemVariants} className="flex gap-3">
                <Minus size={16} color="var(--c-muted)" style={{ flexShrink: 0, marginTop: 4 }} />
                <span style={{ fontFamily: SANS, fontSize: T.body, lineHeight: 1.55, color: "var(--c-text2)" }}>{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: T.lede, color: "var(--c-body-lede)", lineHeight: 1.6, marginTop: 34, maxWidth: 780 }}>
        {t.note}
      </p>
    </SectionShell>
  );
}
