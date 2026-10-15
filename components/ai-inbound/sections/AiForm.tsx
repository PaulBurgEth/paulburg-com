"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TELEGRAM_HANDLE, TELEGRAM_URL, WHATSAPP_URL } from "@/lib/constants";
import { SectionShell, SectionHead, SERIF, DISPLAY_AXES, SANS, MONO } from "@/components/outbound/shared";

const en = {
  eyebrow: "Talk to me",
  h2: "Send your site. I'll show you where buyers slip away.",
  sub: "I'll reply in writing: what ChatGPT tells your buyer, whether AI can read your site, and what happens to an inquiry on your site after hours.",
  labels: {
    name: "Your name",
    website: "Company website",
    interest: "What interests you",
    contactMethod: "How to reach you",
    contactInfo: "Contact",
    question: "Your question",
  },
  optional: "optional",
  placeholders: { website: "yourcompany.com", telegram: "@username", whatsapp: "+66 00 000 0000", email: "you@example.com" },
  interestOptions: [
    { v: "answers", l: "AI answers" },
    { v: "agent", l: "AI Sales Manager" },
    { v: "both", l: "Both" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  submit: "Send →",
  sending: "Sending…",
  success: "Got it.",
  successSub: "I'll reply in writing.",
  error: `Something went wrong. Message me directly: @${TELEGRAM_HANDLE} on Telegram.`,
  ratelimited: "You just sent one. Give it a minute and try again.",
  orWrite: "Or write to me directly:",
};

const ru = {
  eyebrow: "Связаться",
  h2: "Пришлите сайт. Покажу, где уходят покупатели.",
  sub: "Отвечу лично: что ChatGPT отвечает вашему покупателю, могут ли нейросети прочитать ваш сайт и что происходит с заявкой на вашем сайте вечером.",
  labels: {
    name: "Ваше имя",
    website: "Сайт компании",
    interest: "Что интересует",
    contactMethod: "Как с вами связаться",
    contactInfo: "Контакт",
    question: "Ваш вопрос",
  },
  optional: "необязательно",
  placeholders: { website: "yourcompany.com", telegram: "@username", whatsapp: "+7 900 000 0000", email: "you@example.com" },
  interestOptions: [
    { v: "answers", l: "AI-ответы" },
    { v: "agent", l: "AI-продавец" },
    { v: "both", l: "Оба" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  submit: "Отправить →",
  sending: "Отправка…",
  success: "Получил.",
  successSub: "Отвечу лично.",
  error: `Что-то пошло не так. Напишите напрямую: @${TELEGRAM_HANDLE} в Telegram.`,
  ratelimited: "Только что уже отправляли. Подождите минуту и попробуйте снова.",
  orWrite: "Или напишите напрямую:",
};

type Status = "idle" | "pending" | "success" | "error" | "ratelimited";
type ContactMethod = "telegram" | "whatsapp" | "email";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid var(--c-border-control)",
  borderRadius: 6,
  padding: "10px 12px",
  fontFamily: SANS,
  fontSize: 16,
  color: "var(--c-text)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: MONO,
  fontSize: 14,
  letterSpacing: "0.20em",
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
  border: active ? "1px solid var(--c-gold)" : "1px solid var(--c-border-control)",
  color: active ? "var(--c-gold)" : "var(--c-text2)",
  cursor: "pointer",
});

export default function AiForm() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [interest, setInterest] = useState("");
  const [question, setQuestion] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("telegram");
  const [contactInfo, setContactInfo] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const contactPlaceholder =
    contactMethod === "telegram" ? t.placeholders.telegram : contactMethod === "whatsapp" ? t.placeholders.whatsapp : t.placeholders.email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ai", name, business: website, interest, question, contactMethod, contactInfo, language }),
      });
      if (res.status === 429) {
        setStatus("ratelimited");
        return;
      }
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "generate_lead", { form: "ai" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionShell num="11" id="intake" alt>
      <SectionHead eyebrow={t.eyebrow} h2={t.h2} sub={t.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
        <div style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 26 }}>
          {status === "success" ? (
            <div
              ref={successRef}
              role="status"
              tabIndex={-1}
              style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.35)", borderRadius: 10, padding: 32, textAlign: "center", outline: "none" }}
            >
              <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontSize: 21, fontWeight: 700, color: "var(--c-heading)", marginBottom: 6 }}>{t.success}</div>
              <div style={{ fontFamily: SANS, fontSize: 14, color: "var(--c-text2)" }}>{t.successSub}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ai-name" style={labelStyle}>{t.labels.name}</label>
                  <input id="ai-name" type="text" autoComplete="name" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="ai-website" style={labelStyle}>{t.labels.website}</label>
                  <input
                    id="ai-website" type="text" inputMode="url" autoComplete="url" required maxLength={200}
                    value={website} onChange={(e) => setWebsite(e.target.value)} placeholder={t.placeholders.website} style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <span style={labelStyle} id="ai-interest-label">{t.labels.interest}</span>
                <div role="radiogroup" aria-labelledby="ai-interest-label" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {t.interestOptions.map((o) => (
                    <button
                      type="button" key={o.v} role="radio" aria-checked={interest === o.v}
                      onClick={() => setInterest(interest === o.v ? "" : o.v)} style={toggleBtnStyle(interest === o.v)}
                    >
                      {interest === o.v && <span aria-hidden="true" style={{ marginRight: 6 }}>✓</span>}
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span style={labelStyle} id="ai-contact-method-label">{t.labels.contactMethod}</span>
                <div role="radiogroup" aria-labelledby="ai-contact-method-label" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {t.contactOptions.map((o) => (
                    <button
                      type="button" key={o.v} role="radio" aria-checked={contactMethod === o.v}
                      onClick={() => setContactMethod(o.v as ContactMethod)} style={toggleBtnStyle(contactMethod === o.v)}
                    >
                      {contactMethod === o.v && <span aria-hidden="true" style={{ marginRight: 6 }}>✓</span>}
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="ai-contact" style={labelStyle}>{t.labels.contactInfo}</label>
                <input
                  id="ai-contact"
                  type={contactMethod === "email" ? "email" : contactMethod === "whatsapp" ? "tel" : "text"}
                  autoComplete={contactMethod === "email" ? "email" : contactMethod === "whatsapp" ? "tel" : "off"}
                  inputMode={contactMethod === "whatsapp" ? "tel" : undefined}
                  required maxLength={200}
                  value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder={contactPlaceholder} style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="ai-question" style={labelStyle}>
                  {t.labels.question} <span style={{ letterSpacing: "0.1em" }}>· {t.optional}</span>
                </label>
                <textarea
                  id="ai-question" maxLength={1000} rows={3}
                  value={question} onChange={(e) => setQuestion(e.target.value)} style={{ ...inputStyle, minHeight: 84, resize: "vertical" }}
                />
              </div>

              {(status === "error" || status === "ratelimited") && (
                <div role="alert" style={{ fontFamily: SANS, fontSize: 15, color: status === "error" ? "var(--c-error)" : "var(--c-text2)" }}>
                  {status === "error" ? t.error : t.ratelimited}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "pending"}
                style={{
                  background: "var(--c-gold)", color: "var(--c-on-gold)", fontFamily: SANS, fontWeight: 600, fontSize: 15,
                  letterSpacing: "0.04em", padding: "12px 28px", borderRadius: 5, border: "none",
                  cursor: status === "pending" ? "not-allowed" : "pointer", opacity: status === "pending" ? 0.55 : 1, alignSelf: "flex-start",
                }}
              >
                {status === "pending" ? t.sending : t.submit}
              </button>
            </form>
          )}
        </div>

        <div style={{ background: "var(--c-card2)", border: "1px solid var(--c-border)", borderRadius: 10, padding: 22 }}>
          <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-muted)", display: "block", marginBottom: 14 }}>
            {t.orWrite}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { href: TELEGRAM_URL, l: `Telegram · @${TELEGRAM_HANDLE}` },
              { href: WHATSAPP_URL, l: "WhatsApp" },
            ].map((c) => (
              <Link
                key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", background: "transparent",
                  border: "1px solid var(--c-border2)", color: "var(--c-text)", fontFamily: SANS, fontWeight: 600, fontSize: 15,
                  letterSpacing: "0.04em", padding: "12px 20px", borderRadius: 5, textDecoration: "none",
                }}
              >
                {c.l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
