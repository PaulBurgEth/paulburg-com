"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants, MidCTA } from "@/components/outbound/shared";

const en = {
  eyebrow: "AI Sales Manager",
  h2: "A sales manager on your site who never goes home",
  sub: "It does the first hour of every sale, at any hour, and passes your team only the buyers worth their time.",
  example: "Example",
  chat: [
    { who: "buyer", time: "22:04", text: "Hi, looking for a 3-bedroom villa near the beach, can you help?" },
    { who: "ai", time: "22:05", text: "Yes. Which area, what budget, and when would you like to move in?" },
    { who: "buyer", time: "22:06", text: "Bang Tao or Layan. Budget is set, I want to buy by spring." },
    { who: "ai", time: "22:08", text: "Here are three that fit. Would Saturday morning suit you for viewings? I'll pass this to our agent." },
  ],
  buyer: "Buyer",
  ai: "AI Sales Manager",
  does: [
    { t: "Answers in about a minute.", d: "Day, night, weekends, holidays. The buyer is never the one waiting." },
    { t: "Speaks the buyer's language.", d: "Whatever language they write in." },
    { t: "Asks what your manager would ask.", d: "Budget, area, timing, ownership type for property; treatment and date for a clinic; whatever qualifies a buyer in your business." },
    { t: "Answers from your catalogue and your terms.", d: "Sends matching listings or services from your site, never invented ones." },
    { t: "Sorts before the call.", d: "The buyer with a budget gets to your manager; the browser gets answers without taking your manager's time." },
    { t: "Hands over a ready buyer.", d: "Who they are, what they want, their budget and when they can view, waiting for your manager in the morning." },
  ],
  money: "One deal is your commission. Count the inquiries that arrive in the evening and at weekends. One buyer a year who would have gone to whoever answered first is the measure.",
  form: "It does not replace your form or your team. A large purchase still closes with a person; the AI Sales Manager makes sure that person starts with a buyer, not a question. It works on its own too, with or without the AI visibility work.",
  cta: "Tell me how inquiries reach you now",
};

const ru = {
  eyebrow: "AI-продавец",
  h2: "Менеджер продаж на вашем сайте, который не уходит домой",
  sub: "Он делает первый час каждой продажи в любое время суток и передаёт команде только тех покупателей, на которых стоит тратить время.",
  example: "Пример",
  chat: [
    { who: "buyer", time: "22:04", text: "Здравствуйте, ищу виллу с тремя спальнями у моря, поможете?" },
    { who: "ai", time: "22:05", text: "Да. Какой район, какой бюджет и когда хотите заехать?" },
    { who: "buyer", time: "22:06", text: "Банг Тао или Лаян. Бюджет есть, купить хочу к весне." },
    { who: "ai", time: "22:08", text: "Вот три подходящих. Удобно посмотреть в субботу утром? Передам нашему агенту." },
  ],
  buyer: "Покупатель",
  ai: "AI-продавец",
  does: [
    { t: "Отвечает примерно за минуту.", d: "Днём, ночью, в выходные и праздники. Ждать не приходится покупателю." },
    { t: "Говорит на языке покупателя.", d: "На каком бы языке тот ни написал." },
    { t: "Спрашивает то, что спросил бы менеджер.", d: "Для недвижимости бюджет, район, сроки, тип собственности; для клиники услуга и дата; в вашем бизнесе то, что отличает покупателя от зеваки." },
    { t: "Отвечает по вашему каталогу и вашим условиям.", d: "Присылает подходящие объекты или услуги с вашего сайта и ничего не выдумывает." },
    { t: "Отсеивает до разговора.", d: "Покупатель с бюджетом попадает к менеджеру; тот, кто просто смотрит, получает ответы, не отнимая время менеджера." },
    { t: "Передаёт готового покупателя.", d: "Кто он, что ищет, какой бюджет и когда может смотреть: утром это ждёт менеджера." },
  ],
  money: "Одна сделка равна вашей комиссии. Посчитайте заявки, которые приходят вечером и в выходные. Один покупатель в год, который ушёл бы к ответившему первым, и есть мерка.",
  form: "Он не заменяет ни форму, ни команду. Дорогая сделка всё равно закрывается человеком; AI-продавец делает так, чтобы этот человек начинал с покупателя, а не с вопроса. Работает и отдельно, с AI-видимостью или без неё.",
  cta: "Расскажите, как к вам сейчас приходят заявки",
};

export default function AiAgent() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="07" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start" style={{ marginBottom: 32 }}>
        {/* A transcript, the one form this section uses: the product shown working. */}
        <motion.div variants={itemVariants} style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 20 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--c-border2)" }} />
            ))}
            <span style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-muted)", marginLeft: "auto" }}>{t.example}</span>
          </div>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {t.chat.map((m, i) => {
              const ai = m.who === "ai";
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: ai ? "flex-end" : "flex-start",
                    maxWidth: "88%",
                    background: ai ? "rgba(200,169,110,0.08)" : "var(--c-bg2)",
                    border: `1px solid ${ai ? "rgba(200,169,110,0.35)" : "var(--c-border)"}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ fontFamily: MONO, fontSize: T.caption, color: ai ? "var(--c-gold)" : "var(--c-muted)", marginBottom: 4 }}>
                    {m.time} · {ai ? t.ai : t.buyer}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.5 }}>{m.text}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {t.does.map((d) => (
            <motion.li key={d.t} variants={itemVariants} style={{ borderTop: "1px solid var(--c-border)", paddingTop: 12 }}>
              <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: 18, color: "var(--c-heading)", lineHeight: 1.35, marginBottom: 6 }}>{d.t}</div>
              <div style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.55 }}>{d.d}</div>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.p variants={itemVariants} style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", lineHeight: 1.45, maxWidth: "60ch", marginBottom: 14 }}>
        {t.money}
      </motion.p>
      <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-text2)", lineHeight: 1.65, maxWidth: "68ch", marginBottom: 28 }}>{t.form}</p>
      <MidCTA label={t.cta} />
    </SectionShell>
  );
}
