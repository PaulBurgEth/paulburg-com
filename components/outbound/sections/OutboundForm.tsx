"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TELEGRAM_HANDLE, TELEGRAM_URL, WHATSAPP_URL } from "@/lib/constants";
import { SectionShell, SectionHead, SERIF, SANS, MONO } from "../shared";

const en = {
  eyebrow: "Talk to me",
  h2: "Tell me who your best client is",
  sub: "Two minutes. I answer personally, usually within a few hours.",
  labels: {
    name: "Your name",
    business: "Company or product",
    sdrFormat: "What you're after",
    markets: "Which markets",
    cycle: "Typical sales cycle",
    channel: "How clients find you now",
    bestClient: "Who is your best client, and how are they different from average?",
    contactMethod: "How to reach you",
    contactInfo: "Contact",
  },
  placeholders: {
    business: "Industrial fasteners, contract manufacturing, freight…",
    bestClient: "The more concrete the better — this is the question the whole segment list is built from.",
    telegram: "@username",
    whatsapp: "+1 234 567 8900",
    email: "you@example.com",
  },
  optional: "optional",
  sdrFormatOptions: [
    { v: "leads", l: "Leads — qualified prospects" },
    { v: "deal", l: "Leads + deal — up to agreed terms" },
    { v: "not-sure", l: "Not sure yet" },
  ],
  marketOptions: [
    { v: "ru", l: "Russia & CIS" },
    { v: "eu", l: "Europe" },
    { v: "us", l: "North America" },
    { v: "latam", l: "Latin America" },
    { v: "mena", l: "Middle East & Africa" },
    { v: "apac", l: "Asia-Pacific" },
    { v: "global", l: "No restriction" },
  ],
  cycleOptions: [
    { v: "", l: "—" },
    { v: "lt1m", l: "Under a month" },
    { v: "1-3m", l: "1–3 months" },
    { v: "3-6m", l: "3–6 months" },
    { v: "6m+", l: "Over 6 months" },
  ],
  channelOptions: [
    { v: "", l: "—" },
    { v: "inbound", l: "Inbound / SEO" },
    { v: "ads", l: "Paid ads" },
    { v: "referrals", l: "Referrals" },
    { v: "ownsales", l: "Our own sales team" },
    { v: "none", l: "No steady channel" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  submit: "Send →",
  sending: "Sending…",
  success: "Got it.",
  successSub: "I'll come back in writing, usually within a few hours.",
  error: `Something went wrong. Message me directly: @${TELEGRAM_HANDLE} on Telegram.`,
  ratelimited: "You just sent one — give it a minute and try again.",
  orWrite: "Or write to me directly:",
  nextTitle: "What happens after you send",
  next: [
    "I read it and answer in writing, usually within a few hours.",
    "If it does not fit, I say so in that first reply, and tell you what would.",
    "If it does, you get the ten questions and a six-week plan with segments and volumes.",
  ],
  nextNote: "You are answered by me, not by an assistant or a sequence.",
};

const ru = {
  eyebrow: "Связаться",
  h2: "Расскажите, кто ваш лучший клиент",
  sub: "Две минуты. Отвечаю лично, обычно в течение нескольких часов.",
  labels: {
    name: "Ваше имя",
    business: "Компания или продукт",
    sdrFormat: "Что нужно",
    markets: "Какие рынки",
    cycle: "Типичный цикл сделки",
    channel: "Как клиенты находят вас сейчас",
    bestClient: "Кто ваш лучший клиент и чем он отличается от среднего?",
    contactMethod: "Как с вами связаться",
    contactInfo: "Контакт",
  },
  placeholders: {
    business: "Метизы, контрактное производство, перевозки…",
    bestClient: "Чем конкретнее, тем лучше — именно из этого ответа строится список сегментов.",
    telegram: "@username",
    whatsapp: "+7 900 000 0000",
    email: "you@example.com",
  },
  optional: "необязательно",
  sdrFormatOptions: [
    { v: "leads", l: "Лиды — квалифицированные клиенты" },
    { v: "deal", l: "Лиды и сделка — до согласованных условий" },
    { v: "not-sure", l: "Пока не знаю" },
  ],
  marketOptions: [
    { v: "ru", l: "Россия и СНГ" },
    { v: "eu", l: "Европа" },
    { v: "us", l: "Северная Америка" },
    { v: "latam", l: "Латинская Америка" },
    { v: "mena", l: "Ближний Восток и Африка" },
    { v: "apac", l: "Азия и Тихий океан" },
    { v: "global", l: "Без ограничений" },
  ],
  cycleOptions: [
    { v: "", l: "—" },
    { v: "lt1m", l: "Меньше месяца" },
    { v: "1-3m", l: "1–3 месяца" },
    { v: "3-6m", l: "3–6 месяцев" },
    { v: "6m+", l: "Больше 6 месяцев" },
  ],
  channelOptions: [
    { v: "", l: "—" },
    { v: "inbound", l: "Входящие / SEO" },
    { v: "ads", l: "Платная реклама" },
    { v: "referrals", l: "Рекомендации" },
    { v: "ownsales", l: "Свой отдел продаж" },
    { v: "none", l: "Нет стабильного канала" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  submit: "Отправить →",
  sending: "Отправка…",
  success: "Принято.",
  successSub: "Вернусь письменно, обычно в течение нескольких часов.",
  error: `Что-то пошло не так. Напишите напрямую: @${TELEGRAM_HANDLE} в Telegram.`,
  ratelimited: "Только что уже отправляли — подождите минуту и попробуйте снова.",
  orWrite: "Или напишите напрямую:",
  nextTitle: "Что будет после отправки",
  next: [
    "Читаю и отвечаю письмом, обычно в течение нескольких часов.",
    "Если не подходит — скажу это в первом же ответе и скажу, что подошло бы.",
    "Если подходит — присылаю десять вопросов и план на шесть недель с сегментами и объёмами.",
  ],
  nextNote: "Отвечаю я, а не ассистент и не автоворонка.",
};

type Status = "idle" | "pending" | "success" | "error" | "ratelimited";
type ContactMethod = "telegram" | "whatsapp" | "email";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid var(--c-border)",
  borderRadius: 6,
  padding: "10px 12px",
  fontFamily: SANS,
  fontSize: 16,
  color: "var(--c-text)",
  // No `outline: "none"` here: an inline style beats the focus-visible rule in
  // globals.css, and killing it left a keyboard user with no way to tell which
  // field was live on the page's only conversion form.
};

const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: 96, resize: "vertical" };

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: MONO,
  fontSize: 14,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--c-muted)",
  marginBottom: 6,
};

const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
  fontFamily: SANS,
  fontSize: 14,
  fontWeight: 600,
  padding: "10px 16px",
  borderRadius: 5,
  background: active ? "rgba(200,169,110,0.12)" : "transparent",
  border: active ? "1px solid rgba(200,169,110,0.5)" : "1px solid var(--c-border)",
  color: active ? "var(--c-gold)" : "var(--c-text2)",
  cursor: "pointer",
});

export default function OutboundForm() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [sdrFormat, setSdrFormat] = useState("");
  const [markets, setMarkets] = useState<string[]>([]);
  const [cycle, setCycle] = useState("");
  const [channel, setChannel] = useState("");
  const [bestClient, setBestClient] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("telegram");
  const [contactInfo, setContactInfo] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const contactPlaceholder =
    contactMethod === "telegram"
      ? t.placeholders.telegram
      : contactMethod === "whatsapp"
        ? t.placeholders.whatsapp
        : t.placeholders.email;

  function toggleMarket(v: string) {
    setMarkets((prev) => (prev.includes(v) ? prev.filter((m) => m !== v) : [...prev, v]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sdr",
          name,
          business,
          sdrFormat,
          markets,
          cycle,
          channel,
          bestClient,
          contactMethod,
          contactInfo,
          language,
        }),
      });
      if (res.status === 429) {
        setStatus("ratelimited");
        return;
      }
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
        "event",
        "generate_lead",
        { form: "sdr" },
      );
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionShell num="12" id="intake" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
        <div
          style={{
            background: "var(--c-card)",
            border: "1px solid var(--c-border)",
            borderRadius: 12,
            padding: 26,
          }}
        >
          {status === "success" ? (
            <div
              style={{
                background: "rgba(200,169,110,0.08)",
                border: "1px solid rgba(200,169,110,0.35)",
                borderRadius: 10,
                padding: 32,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 700, color: "var(--c-heading)", marginBottom: 6 }}>
                {t.success}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 14, color: "var(--c-text2)" }}>{t.successSub}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sdr-name" style={labelStyle}>{t.labels.name}</label>
                  <input
                    id="sdr-name" type="text" required maxLength={120}
                    value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="sdr-business" style={labelStyle}>{t.labels.business}</label>
                  <input
                    id="sdr-business" type="text" required maxLength={200}
                    value={business} onChange={(e) => setBusiness(e.target.value)}
                    placeholder={t.placeholders.business} style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sdr-best-client" style={labelStyle}>{t.labels.bestClient}</label>
                <textarea
                  id="sdr-best-client" required maxLength={1000} rows={4}
                  value={bestClient} onChange={(e) => setBestClient(e.target.value)}
                  placeholder={t.placeholders.bestClient} style={textareaStyle}
                />
              </div>

              <div>
                <span style={labelStyle}>{t.labels.sdrFormat}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {t.sdrFormatOptions.map((o) => (
                    <button
                      type="button" key={o.v}
                      onClick={() => setSdrFormat(sdrFormat === o.v ? "" : o.v)}
                      style={toggleBtnStyle(sdrFormat === o.v)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span style={labelStyle}>
                  {t.labels.markets} <span style={{ letterSpacing: "0.1em" }}>· {t.optional}</span>
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {t.marketOptions.map((o) => (
                    <button
                      type="button" key={o.v}
                      onClick={() => toggleMarket(o.v)}
                      aria-pressed={markets.includes(o.v)}
                      style={toggleBtnStyle(markets.includes(o.v))}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sdr-cycle" style={labelStyle}>{t.labels.cycle}</label>
                  <select id="sdr-cycle" value={cycle} onChange={(e) => setCycle(e.target.value)} style={inputStyle}>
                    {t.cycleOptions.map((o) => (
                      <option key={o.v} value={o.v}>{o.l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sdr-channel" style={labelStyle}>{t.labels.channel}</label>
                  <select id="sdr-channel" value={channel} onChange={(e) => setChannel(e.target.value)} style={inputStyle}>
                    {t.channelOptions.map((o) => (
                      <option key={o.v} value={o.v}>{o.l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span style={labelStyle}>{t.labels.contactMethod}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {t.contactOptions.map((o) => (
                    <button
                      type="button" key={o.v}
                      onClick={() => setContactMethod(o.v as ContactMethod)}
                      style={toggleBtnStyle(contactMethod === o.v)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="sdr-contact" style={labelStyle}>{t.labels.contactInfo}</label>
                <input
                  id="sdr-contact" type="text" required maxLength={200}
                  value={contactInfo} onChange={(e) => setContactInfo(e.target.value)}
                  placeholder={contactPlaceholder} style={inputStyle}
                />
              </div>

              {(status === "error" || status === "ratelimited") && (
                <div style={{ fontFamily: SANS, fontSize: 15, color: status === "error" ? "#e88" : "var(--c-text2)" }}>
                  {status === "error" ? t.error : t.ratelimited}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "pending"}
                style={{
                  background: "var(--c-gold)",
                  color: "var(--c-on-gold)",
                  fontFamily: SANS,
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "0.04em",
                  padding: "12px 28px",
                  borderRadius: 5,
                  border: "none",
                  cursor: status === "pending" ? "not-allowed" : "pointer",
                  opacity: status === "pending" ? 0.55 : 1,
                  alignSelf: "flex-start",
                }}
              >
                {status === "pending" ? t.sending : t.submit}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar is one grid child: the parent is a two-column grid, so a
            second card added at this level would drop into the next row under
            the form instead of stacking beside it. */}
        <div className="flex flex-col gap-4">
        <div style={{ background: "var(--c-card2)", border: "1px solid var(--c-border)", borderRadius: 12, padding: 22 }}>
          <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-muted)", display: "block", marginBottom: 14 }}>
            {t.orWrite}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { href: TELEGRAM_URL, l: `Telegram · @${TELEGRAM_HANDLE}` },
              { href: WHATSAPP_URL, l: "WhatsApp" },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "transparent", border: "1px solid var(--c-border2)",
                  color: "var(--c-text)", fontFamily: SANS, fontWeight: 600, fontSize: 15,
                  letterSpacing: "0.04em", padding: "12px 20px", borderRadius: 5, textDecoration: "none",
                }}
              >
                {c.l}
              </Link>
            ))}
          </div>
        </div>

        {/* The sidebar held only the two contact buttons and left a tall void
            beside the form on desktop. This is the slot where a reader decides
            whether sending costs them a sales call. */}
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderLeft: "2px solid var(--c-sage)", borderRadius: 12, padding: 22 }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 21, color: "var(--c-heading)", marginBottom: 13, lineHeight: 1.3 }}>
            {t.nextTitle}
          </h3>
          <ol style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {t.next.map((n, i) => (
              <li key={n} className="flex gap-3">
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", color: "var(--c-gold)", flexShrink: 0, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: SANS, fontSize: 16, color: "var(--c-body)", lineHeight: 1.55 }}>{n}</span>
              </li>
            ))}
          </ol>
          <p style={{ fontFamily: MONO, fontSize: 14, letterSpacing: "0.06em", color: "var(--c-text2)", lineHeight: 1.6, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--c-border)" }}>
            {t.nextNote}
          </p>
        </div>
        </div>
      </div>
    </SectionShell>
  );
}
