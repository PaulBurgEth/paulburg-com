"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionShell, SectionHead, Note, MidCTA, SERIF, DISPLAY_AXES, SANS, MONO, T, tagStyle, itemVariants } from "../shared";

/**
 * Two things on this page are shown rather than claimed. The numbers come first,
 * as percentages against the market; absolute counts sit only in the note. The letters are real
 * first letters from Paul's own campaign (28.09–07.10.2026), company name hidden;
 * each got a reply asking for more. The RU instrument letter has one sentence
 * removed ("не закупаю и не перепродаю", banned by SDR B2B decision 471). The numbers are the two pilots set against
 * the market on one measure — the share of companies written to that reached a
 * commercial step — with the same sources and caveat as the approved offers
 * (SDR B2B, Профиль_Павла.md §5, own campaign cut of 03.10.2026, counted by decision 477; market rows from
 * Бенчмарки_и_источники.md §17). The bare reply rate is not shown: it is not
 * the strong number, reaching a price or terms is.
 */

type Letter = { meta: string; body: string[]; note: string };
type Bar = { n: string; l: string; pct: number; ours: boolean };

const en = {
  eyebrow: "In practice",
  h2: "Two and a half to five times above the market",
  sub: "One measure, set against the market average: the share of companies written to that took the next commercial step, a price or terms. Below it, two letters that show how it is done.",
  lettersTitle: "Two letters, exactly as they were sent",
  lettersNote: "First letters from my own campaign, company name hidden. Letters for you are built the same way, in your name, from your domain.",
  letters: [
    {
      meta: "To a Turkish maker of roll-forming lines · replied: “We are interested in exploring cooperation with you”",
      body: [
        "Hello team at [company],",
        "[Company] builds a cable lug production line alongside its gypsum board profile lines, and I haven't seen that from the other Turkish roll forming makers I looked at.",
        "Your dealers page lists Romania and Ukraine, but not Kazakhstan.",
        "I find distributors and trade buyers abroad for manufacturers. I write to each company separately, after looking at what it sells, and bring you those who reply that they want your products.",
        "In Kazakhstan I would look for buyers of your cornerbead and gypsumboard lines among plants that roll ceiling and wall profiles, drywall system producers and metal building product makers.",
        "If someone else looks after export sales, could you point me to them?",
      ],
      note: "What in it is theirs: a line the other makers in their market do not build, and a country missing from their own dealers page.",
    },
    {
      meta: "To a software company · replied: “please feel free to send over the list of companies you're thinking of targeting”",
      body: [
        "Hello team at [company],",
        "[Company] puts no cap on how many inboxes a team can add, and I didn't see that on the other response-time tool sites I read.",
        "I'm an outside sales rep who works week by week on contract. I choose the companies, write each one its own letter, handle the replies, and hand over those ready to buy.",
        "For [company] I would look among property management, legal and accounting firms, and inside sales and order desks that answer clients through shared mailboxes like support@.",
        "Would it help to see which companies I would start with, before anything is agreed?",
      ],
      note: "What in it is theirs: the one product detail their competitors' sites do not offer, and the firms that live in shared inboxes.",
    },
  ] as Letter[],
  compareTitle: "Companies that reached a commercial step",
  compareLead: "Two and a half to five times more companies reach a price or terms than the market gets positive replies. And a commercial step sits deeper than a positive reply, so the comparison is a conservative one.",
  bars: [
    { n: "2.3%", l: "My own campaign: reached terms", pct: 2.3, ours: true },
    { n: "1.2%", l: "Metals supplier: asked for a price", pct: 1.2, ours: true },
    { n: "0.5–1.5%", l: "Market: email to meeting", pct: 1.5, ours: false },
    { n: "≈0.5%", l: "Market: positive reply", pct: 0.48, ours: false },
  ] as Bar[],
  compareNote: "Own campaign: 103 of 4,498 companies written to, cut of 3 October 2026. Metals supplier: 55 of 4,531. Market, email to meeting: 0.5–1.5% of emails sent, LeadHaste, Cold email conversion rate benchmarks 2026. Market, positive reply: about 0.48% of recipients (3.43% average reply rate, Instantly, × 14.1% of replies that are genuinely positive, Sales.co, 2026). Market figures come mostly from sequences combining email, LinkedIn and calls; the pilots were email only. For the pilots the step is the company's next commercial move, for the market a meeting or a positive reply.",
  afterTitle: "Where you come in",
  after: "Not at the first email, and not at the tenth. You come in when a company has agreed on the substance and wants to talk terms. Everything before that point is mine.",
  repliedTitle: "The kind of company that answers",
  repliedNote: "Metals trading, B2B, from a cold start:",
  replied: ["Large metallurgical holding", "Lift equipment maker", "Electrical engineering plant", "Regional gas and heating utilities", "Leaf-spring maker", "Toolmaking plant"],
  numbersLine: "Want the rest of it — the funnel stage by stage, deliverability, cost per client, and which segments returned what? I send the full breakdown in writing on request, before you commit to anything.",
  ctaNote: "Your segment gets its own list and its own copy in the first week.",
  cta: "Tell me about your market →",
};

const ru = {
  eyebrow: "В работе",
  h2: "В 2,5–5 раз выше рынка",
  sub: "Одна мера рядом со средним по рынку: доля компаний, получивших письмо и сделавших следующий коммерческий шаг, — цена или условия. Ниже два письма, которые показывают, как это сделано.",
  lettersTitle: "Два письма из моей кампании",
  lettersNote: "Первые письма моей собственной кампании, название компании скрыто. Письма для вас устроены так же, от вашего имени и с вашего домена.",
  letters: [
    {
      meta: "Производителю КИПиА · коммерческий директор: «предложение для нас интересное… давайте обсуждать условия»",
      body: [
        "Здравствуйте!",
        "У [компании] рядом с датчиками температуры и давления в каталоге есть свой запатентованный иммерсионный нагреватель для бесконтактного расплавления алюминия, а у других российских производителей КИПиА я такого не видел.",
        "Я нахожу заводам покупателей и дилеров за рубежом и веду с ними переписку до разговора о заказе, как внешний отдел продаж.",
        "В Армении я бы искал для [компании] покупателей среди литейных цехов алюминиевого литья и заводов с печами термообработки, которым нужны многозонные датчики температуры, а дилеров среди поставщиков КИПиА для промышленных предприятий.",
        "Если это не к вам, подскажите, кто у вас занимается продажами в другие страны.",
        "С уважением, Павел",
      ],
      note: "Что здесь под компанию: изделие в их каталоге, которого нет у других производителей, и те, кому оно нужно в конкретной стране.",
    },
    {
      meta: "Переработчику ягод · ответили: «Условия?»",
      body: [
        "Здравствуйте!",
        "Ягоду жимолости для соков и начинок вы берёте с собственных садов, а облепиху перерабатываете вплоть до масла и косточки. У других переработчиков ягод, чьи сайты я смотрел, своих садов жимолости я не видел.",
        "Я работаю внешним менеджером по продажам у производителей: нахожу пищевые предприятия, которым подходит ваш продукт, пишу каждому отдельно, про его производство, и передаю вам тех, кто попросил образец или цену. Договор и поставка остаются между вами и покупателем.",
        "Для [компании] я бы искал покупателей среди производителей мороженого и йогуртов, глазированных сырков, кондитерских и хлебопекарных предприятий, а также HoReCa.",
        "Интересно посмотреть, какие предприятия я бы выбрал для начала?",
        "С уважением, Павел",
      ],
      note: "Что здесь под компанию: собственные сады, которых нет у соседей по рынку, и производства, которым подходят их начинки.",
    },
  ] as Letter[],
  compareTitle: "Доля компаний, дошедших до коммерческого шага",
  compareLead: "До цены или условий доходит в 2,5–5 раз больше компаний, чем рынок получает положительных ответов. А коммерческий шаг глубже положительного ответа, поэтому сравнение консервативное.",
  bars: [
    { n: "2,3 %", l: "Собственная кампания: условия", pct: 2.3, ours: true },
    { n: "1,2 %", l: "Металлопрокат: запрос цены", pct: 1.2, ours: true },
    { n: "0,5–1,5 %", l: "Рынок: письмо → встреча", pct: 1.5, ours: false },
    { n: "≈0,5 %", l: "Рынок: положительный ответ", pct: 0.48, ours: false },
  ] as Bar[],
  compareNote: "Собственная кампания: 103 из 4 498 компаний, получивших письмо, срез 03.10.2026. Металлопрокат: 55 из 4 531 компании. Рынок, письмо → встреча: 0,5–1,5 % отправленных писем, LeadHaste, «Cold email conversion rate benchmarks 2026». Рынок, положительный ответ: ≈0,48 % адресатов (средний отклик 3,43 % по Instantly × доля по-настоящему положительных ответов 14,1 %, Sales.co, 2026). Рыночные цифры собраны в основном на многоканальных цепочках (почта, LinkedIn, звонок); пилоты шли только почтой. У пилотов считается следующий коммерческий шаг компании, у рынка — встреча и положительный ответ.",
  afterTitle: "Где вступаете вы",
  after: "Не на первом письме и не на десятом. Вы вступаете, когда компания уже согласилась по сути и хочет обсуждать условия. Всё до этой точки — на мне.",
  repliedTitle: "Кто отвечает",
  repliedNote: "Металлопрокат, B2B, с холодного старта:",
  replied: ["Крупный металлургический холдинг", "Производитель лифтового оборудования", "Завод электротехники", "Региональные газовые и тепловые сети", "Производитель рессор", "Инструментальный завод"],
  numbersLine: "Нужно остальное — воронка по этапам, доставляемость, стоимость клиента и что принёс каждый сегмент? Полную раскладку высылаю письмом по запросу, до любых обязательств.",
  ctaNote: "Для вашего сегмента список и тексты составляются в первую неделю.",
  cta: "Расскажите о вашем рынке →",
};

export default function OutboundProof() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <SectionShell num="05" id="proof">
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      {/* Percentages against the market lead the section (SDR B2B decision 462):
          absolute counts live only in the note under it. A proportional bar works here: every row is the same
          measure, companies written to that reached a commercial step, scaled
          to the largest. Ours in gold, the market in the hairline colour. */}
      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "0 0 16px" }}>
        {t.compareTitle}
      </h3>
      <div
        style={{
          background: "var(--c-card)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-gold)",
          borderRadius: 10,
          padding: 24,
        }}
      >
        <p style={{ fontFamily: SANS, fontSize: T.body, fontWeight: 600, color: "var(--c-body-lede)", lineHeight: 1.55, maxWidth: "58ch", marginBottom: 24 }}>
          {t.compareLead}
        </p>
        {t.bars.map((row, ri) => (
          <motion.div key={row.l} variants={itemVariants} style={{ marginBottom: ri === t.bars.length - 1 ? 0 : 18 }}>
            <div className="flex items-baseline gap-3" style={{ flexWrap: "wrap", marginBottom: 7 }}>
              <span
                style={{
                  fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, lineHeight: 1,
                  fontSize: row.ours ? T.figureSm : T.h3,
                  color: row.ours ? "var(--c-gold)" : "var(--c-text2)",
                  minWidth: "4.2em",
                }}
              >
                {row.n}
              </span>
              <span
                style={{
                  fontFamily: SANS, fontSize: T.bodySm, lineHeight: 1.4,
                  fontWeight: row.ours ? 600 : 400,
                  color: row.ours ? "var(--c-body-lede)" : "var(--c-text2)",
                }}
              >
                {row.l}
              </span>
            </div>
            <div
              aria-hidden="true"
              style={{
                height: row.ours ? 12 : 8,
                width: `${(row.pct / 2.3) * 100}%`,
                borderRadius: 3,
                background: row.ours
                  ? "linear-gradient(90deg, var(--c-gold), var(--c-gold-glow))"
                  : "var(--c-border2)",
              }}
            />
          </motion.div>
        ))}
      </div>
      <Note>{t.compareNote}</Note>

      {/* Letters as documents: a mono header line, then the body paragraph by
          paragraph, then one line naming what in it belongs to that company. */}
      <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", margin: "36px 0 14px" }}>
        {t.lettersTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {t.letters.map((lt) => (
          <motion.div
            key={lt.meta}
            variants={itemVariants}
            className="flex flex-col"
            style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-gold)", borderRadius: 10, padding: "18px 20px" }}
          >
            <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.06em", color: "var(--c-gold)", display: "block", marginBottom: 14, lineHeight: 1.5 }}>
              {lt.meta}
            </span>
            <div className="flex flex-col gap-3" style={{ flex: 1 }}>
              {lt.body.map((para, pi) => (
                <p key={pi} style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>
                  {para}
                </p>
              ))}
            </div>
            <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-text2)", lineHeight: 1.55, marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--c-border)" }}>
              {lt.note}
            </p>
          </motion.div>
        ))}
      </div>
      <Note>{t.lettersNote}</Note>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 32 }}>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 10 }}>
            {t.afterTitle}
          </h3>
          <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.6 }}>{t.after}</p>
        </div>
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.h3, color: "var(--c-heading)", marginBottom: 6 }}>
            {t.repliedTitle}
          </h3>
          <span style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-muted)", display: "block", marginBottom: 12 }}>
            {t.repliedNote}
          </span>
          <div className="flex flex-wrap gap-2">
            {t.replied.map((r) => (
              <span key={r} style={tagStyle}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* The numbers are not hidden, they are moved off the sales page and into
          the conversation, where their one-niche origin can be stated. */}
      <div
        style={{
          marginTop: 24,
          background: "var(--c-card2)",
          border: "1px solid var(--c-border)",
          borderLeft: "2px solid var(--c-sage)",
          borderRadius: 10,
          padding: 22,
        }}
      >
        <p style={{ fontFamily: SANS, fontSize: T.body, color: "var(--c-body)", lineHeight: 1.65, maxWidth: "58ch" }}>
          {t.numbersLine}
        </p>
      </div>

      <div style={{ marginTop: 36 }}>
        <MidCTA label={t.cta} note={t.ctaNote} />
      </div>
    </SectionShell>
  );
}
