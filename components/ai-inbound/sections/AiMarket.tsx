"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SANS, T } from "@/components/outbound/shared";
import { ProofCard, SOURCES } from "../shared";

const en = {
  eyebrow: "AI answers · the market",
  h2: "Your buyers already ask AI who to use",
  sub: "Before they open your site, many of them have asked ChatGPT or Google for a shortlist.",
  cards: [
    { n: "900M", d: "people use ChatGPT every week.", s: SOURCES.openai },
    { n: "2B", d: "people a month see an AI answer on top of Google search.", s: SOURCES.alphabet },
    { n: "45%", d: "of consumers use ChatGPT or other AI tools to get a local business recommended.", s: SOURCES.brightlocal },
    { n: "33%", d: "of business software buyers bought from a company they had never heard of until an AI chat suggested it. For 54%, AI chats are the main source of their shortlist.", s: SOURCES.g2 },
  ],
  foot: "A buyer who gets a shortlist from an answer writes to the names on it.",
};

const ru = {
  eyebrow: "AI-ответы · рынок",
  h2: "Ваши покупатели уже спрашивают нейросети, к кому обратиться",
  sub: "Многие из них, ещё не открыв ваш сайт, попросили у ChatGPT или Google короткий список.",
  cards: [
    { n: "900 млн", d: "человек пользуются ChatGPT каждую неделю.", s: SOURCES.openai },
    { n: "2 млрд", d: "человек в месяц видят AI-ответ над выдачей Google.", s: SOURCES.alphabet },
    { n: "45%", d: "потребителей используют ChatGPT или другие AI-инструменты, чтобы им порекомендовали местный бизнес.", s: SOURCES.brightlocal },
    { n: "33%", d: "покупателей B2B-софта купили у компании, о которой не слышали, пока её не предложил AI-чат. Для 54% AI-чаты главный источник короткого списка.", s: SOURCES.g2 },
  ],
  foot: "Покупатель, получивший короткий список из ответа, пишет тем, кто в нём есть.",
};

export default function AiMarket() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="02">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.cards.map((c) => (
          <ProofCard key={c.n} n={c.n} d={c.d} source={c.s} />
        ))}
      </div>
      <motion.p
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        style={{ fontFamily: SANS, fontSize: T.lede, color: "var(--c-heading)", lineHeight: 1.55, marginTop: 28, maxWidth: "52ch" }}
      >
        {t.foot}
      </motion.p>
    </SectionShell>
  );
}
