"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, T, itemVariants } from "@/components/outbound/shared";
import { SourceLink, SOURCES } from "../shared";

type QA = { q: string; a: string; source?: { label: string; href?: string } };

const en: { eyebrow: string; h2: string; items: QA[] } = {
  eyebrow: "Questions",
  h2: "Six things people ask",
  items: [
    { q: "And if they still don't name us?", a: "Then on day 60 you see it in the re-measurement, and I work one more month at my cost. What I promise is the work and two measurements, not a place in the answer." },
    { q: "We already do SEO.", a: "SEO is about Google search: where your page sits among ten links. This is about the answer ChatGPT and Google AI Mode write. One does not cover the other: fewer than half of the businesses leading Google's local results also appear in AI recommendations.", source: SOURCES.soci },
    { q: "AI makes things up anyway.", a: "Answers do vary from one ask to the next. That is why results are measured on repeated asks and twice after the work, not on one screenshot." },
    { q: "We have a form, it is enough.", a: "For a large purchase it is right. The question is what happens between the form and your manager's morning." },
    { q: "We already have a chat on the site.", a: "A chat that waits for an operator answers when the operator is there. The AI Sales Manager answers when the buyer is there." },
    { q: "Will buyers mind talking to AI?", a: "They get an answer at 10 pm instead of silence until morning, and a person takes over as soon as there is something to discuss." },
  ],
};

const ru: typeof en = {
  eyebrow: "Вопросы",
  h2: "Шесть вопросов, которые задают",
  items: [
    { q: "А если всё равно не назовут?", a: "Тогда вы увидите это в замере на 60-й день, и я работаю ещё месяц за свой счёт. Обещаю работу и два замера, а не место в ответе." },
    { q: "SEO у нас уже есть.", a: "SEO про поиск Google: где ваша страница среди десяти ссылок. Здесь речь об ответе, который пишут ChatGPT и Google AI Mode. Одно не закрывает другое: меньше половины компаний, лидирующих в местной выдаче Google, есть в рекомендациях нейросетей.", source: SOURCES.soci },
    { q: "Нейросети всё равно врут.", a: "Ответы действительно меняются от раза к разу. Поэтому результат замеряется на повторных вопросах и дважды после работы, а не по одному скриншоту." },
    { q: "У нас форма, этого хватает.", a: "Для дорогой покупки форма правильна. Вопрос в том, что происходит между формой и утром менеджера." },
    { q: "У нас уже стоит чат.", a: "Чат, который ждёт оператора, отвечает, когда на месте оператор. AI-продавец отвечает, когда на месте покупатель." },
    { q: "Покупателям не понравится говорить с AI.", a: "Они получают ответ в 22:00 вместо тишины до утра, а человек подключается, как только есть что обсуждать." },
  ],
};

export default function AiQuestions() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="09" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} />
      {/* A plain text stack, no cards: the same form /outbound uses for objections. */}
      <dl className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        {t.items.map((it) => (
          <motion.div key={it.q} variants={itemVariants} style={{ borderTop: "1px solid var(--c-border)", padding: "20px 0" }}>
            <dt style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", lineHeight: 1.35, marginBottom: 8 }}>{it.q}</dt>
            <dd style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65 }}>
              {it.a}
              {it.source && (
                <span style={{ display: "block", marginTop: 6 }}>
                  <SourceLink source={it.source} />
                </span>
              )}
            </dd>
          </motion.div>
        ))}
      </dl>
    </SectionShell>
  );
}
