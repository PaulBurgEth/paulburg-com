"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, MidCTA, SERIF, SANS, MONO, T, itemVariants } from "../shared";

/**
 * The page had no objection handling at all, which meant every reader who
 * reached the form was still holding at least one of these unanswered. Set as a
 * two-column editorial Q&A on hairlines — no cards, deliberately, because this
 * is the one block on the page that should read as plain text.
 *
 * "Is this legal?" was dropped on 2026-08-19: asking it on the buyer's behalf
 * plants a doubt most of them did not arrive with. The facts that answered it
 * — public registries, business addresses, domain-wide unsubscribe — moved into
 * §06, where they read as rules that protect the client rather than as a
 * defence.
 */

type QA = { q: string; a: string };

const en = {
  eyebrow: "Straight answers",
  h2: "The seven things people ask before they say yes",
  sub: "Asked in these words, more or less, by everyone who got this far. Answered here so you can decide on the substance.",
  qa: [
    {
      q: "Cold email does not work any more. Everyone gets two hundred of these.",
      a: "Everyone gets two hundred templates. What is described on this page is one email per company, built on something that company actually did, sent from your domain under your signature. Nobody replies to a campaign. People do reply to someone who clearly looked.",
    },
    {
      q: "We tried an agency once. It burned a quarter and delivered nothing.",
      a: "Usually because the domains were theirs, the database was shared across their whole client list, and the copy was a template with your name dropped into it. Here the domains and mailboxes are yours, the list is built for you alone, and you approve every line before the first send. If we part ways, all of it stays with you.",
    },
    {
      q: "Our product is too complex to sell over email.",
      a: "The email does not sell it. Its job is to get an answer from the person who owns the budget. What follows is an ordinary conversation, in whichever format suits the two of you.",
    },
    {
      q: "Why not just hire an SDR?",
      a: "Then you are paying three months of ramp with the salary running throughout, you are managing them yourself, and when they leave, their read on the market leaves with them. This is six weeks at a fixed fee, and the list, the domains and the copy stay on your side either way.",
    },
    {
      q: "What if the pilot brings no clients at all?",
      a: "Then you keep the list, the domains, the copy, the stop-list and a number for every step of the funnel — enough to see exactly where it broke: the segment, the trigger, or the offer. That is an answer too, and it costs less than a year of finding out slowly.",
    },
    {
      q: "How much is it?",
      a: "Three parts, all of them in the next section: a fixed fee for the pilot, a monthly retainer after it, and a share of the result on clients I brought. Two things move the number — how many segments you want running, and how many languages they run in. One segment in one language sits at the floor of the range; four segments across three languages sits at the top. I put the figure in writing as soon as I know which of those you need.",
    },
    {
      q: "Is this you, or a team?",
      a: "Me. The selection, the copy and the correspondence are mine personally. That is also what limits how many clients I take at once, and I would rather say so now than after you have signed.",
    },
  ] as QA[],
  ctaNote: "Still holding a question that is not on this list?",
  cta: "Ask it →",
};

const ru = {
  eyebrow: "Прямые ответы",
  h2: "Семь вопросов, которые задают до того, как согласиться",
  sub: "Примерно в этих формулировках их задаёт каждый, кто дочитал до сюда. Отвечено здесь, чтобы вы решали по существу.",
  qa: [
    {
      q: "Холодные письма больше не работают. Всем приходит по двести таких.",
      a: "Приходит по двести шаблонов. На этой странице описано другое: одно письмо на одну компанию, построенное на том, что эта компания действительно сделала, с вашего домена и за вашей подписью. На рассылку не отвечают. Отвечают тому, кто явно посмотрел.",
    },
    {
      q: "Мы уже пробовали агентство. Ушёл квартал, результата нет.",
      a: "Обычно потому, что домены были их, база — общая на всех их клиентов, а текст — шаблон с подставленным названием. Здесь домены и ящики ваши, список собирается только под вас, и каждую строку вы согласуете до первой отправки. Если расходимся, всё это остаётся у вас.",
    },
    {
      q: "Наш продукт слишком сложный, чтобы продавать его письмом.",
      a: "Письмо его и не продаёт. Его задача — получить ответ от того, у кого бюджет. Дальше идёт обычный разговор, в том формате, который удобен вам обоим.",
    },
    {
      q: "Почему просто не нанять SDR?",
      a: "Тогда вы платите три месяца разгона вместе с зарплатой, управляете им сами, и когда он уйдёт, его понимание рынка уйдёт вместе с ним. Здесь шесть недель по фиксированной цене, а база, домены и тексты в любом случае остаются на вашей стороне.",
    },
    {
      q: "А если за пилот не будет ни одного клиента?",
      a: "Тогда у вас остаются база, домены, тексты, стоп-лист и цифра по каждому шагу воронки — этого хватает, чтобы увидеть, где именно сломалось: сегмент, повод или предложение. Это тоже ответ, и он дешевле, чем выяснять то же самое медленно, весь год.",
    },
    {
      q: "Сколько это стоит?",
      a: "Три части, все в следующей секции: фиксированная стоимость пилота, месячный фикс после него и доля с результата по клиентам, которых привёл я. Сумму двигают две вещи — сколько сегментов вы хотите запустить и на скольких языках. Один сегмент на одном языке — нижняя граница диапазона, четыре сегмента на трёх языках — верхняя. Цифру называю письмом, как только понимаю, что именно из этого вам нужно.",
    },
    {
      q: "Это вы или команда?",
      a: "Я. Отбор, тексты и переписка — лично. Это же и ограничивает, сколько клиентов я беру одновременно, и лучше сказать это сейчас, а не после подписания.",
    },
  ] as QA[],
  ctaNote: "Остался вопрос, которого нет в списке?",
  cta: "Задать →",
};

export default function OutboundObjections() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="09" id="objections">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div>
        {t.qa.map((item, i) => (
          <motion.div
            key={item.q}
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-x-12 gap-y-3"
            style={{
              borderTop: "1px solid var(--c-border)",
              paddingTop: 22,
              paddingBottom: 22,
            }}
          >
            <div className="flex gap-4">
              <span
                style={{
                  fontFamily: MONO, fontSize: T.caption, fontWeight: 700, letterSpacing: "0.14em",
                  color: "var(--c-gold)", flexShrink: 0, paddingTop: 6,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                style={{
                  fontFamily: SERIF, fontWeight: 700, fontSize: T.h3, lineHeight: 1.35,
                  color: "var(--c-heading)", letterSpacing: "-0.01em",
                }}
              >
                {item.q}
              </h3>
            </div>
            <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.7 }}>
              {item.a}
            </p>
          </motion.div>
        ))}
        <div style={{ borderTop: "1px solid var(--c-border)" }} />
      </div>

      <div style={{ marginTop: 34 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
