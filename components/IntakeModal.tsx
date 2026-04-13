"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useIntakeModal } from "@/context/IntakeModalContext";

const en = {
  h2: "Tell me about your project",
  subtitle: "A few lines is enough. I'll take it from there.",
  labels: {
    name: "Your name",
    business: "What kind of business?",
    challenge: "What do you need?",
    budget: "Budget range",
    contactMethod: "How to reach you",
    contactInfo: "Contact info",
  },
  budgetOptions: [
    { v: "<1k", l: "< $1,000" },
    { v: "1-3k", l: "$1,000–3,000" },
    { v: "3k+", l: "$3,000+" },
    { v: "not-sure", l: "Not sure yet" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  placeholders: {
    business: "Real estate, clinic, SaaS, e-commerce…",
    challenge: "Describe what you're trying to build or solve",
    telegram: "@username",
    whatsapp: "+1 234 567 8900",
    email: "you@example.com",
  },
  submit: "Send →",
  sending: "Sending…",
  success: "Got it.",
  successSub: "I'll reach out within a few hours.",
  error: "Something went wrong. Message me directly: @pasha_burg on Telegram.",
  close: "Close",
};

const ru = {
  h2: "Расскажите о проекте",
  subtitle: "Пары строк достаточно. Остальное — моя работа.",
  labels: {
    name: "Ваше имя",
    business: "Тип бизнеса?",
    challenge: "Что нужно сделать?",
    budget: "Бюджет",
    contactMethod: "Как с вами связаться",
    contactInfo: "Контакт",
  },
  budgetOptions: [
    { v: "<1k", l: "< $1,000" },
    { v: "1-3k", l: "$1,000–3,000" },
    { v: "3k+", l: "$3,000+" },
    { v: "not-sure", l: "Не знаю" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  placeholders: {
    business: "Недвижимость, клиника, SaaS, e-commerce…",
    challenge: "Опишите, что хотите построить или решить",
    telegram: "@username",
    whatsapp: "+7 900 000 0000",
    email: "you@example.com",
  },
  submit: "Отправить →",
  sending: "Отправка…",
  success: "Принято.",
  successSub: "Скоро напишу.",
  error: "Что-то пошло не так. Напишите напрямую: @pasha_burg в Telegram.",
  close: "Закрыть",
};

type Status = "idle" | "pending" | "success" | "error";
type ContactMethod = "telegram" | "whatsapp" | "email";

export default function IntakeModal() {
  const { language } = useLanguage();
  const { isOpen, close } = useIntakeModal();
  const t = language === "ru" ? ru : en;

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [challenge, setChallenge] = useState("");
  const [budget, setBudget] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("telegram");
  const [contactInfo, setContactInfo] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const contactPlaceholder =
    contactMethod === "telegram"
      ? t.placeholders.telegram
      : contactMethod === "whatsapp"
        ? t.placeholders.whatsapp
        : t.placeholders.email;

  function resetForm() {
    setName("");
    setBusiness("");
    setChallenge("");
    setBudget("");
    setContactMethod("telegram");
    setContactInfo("");
    setStatus("idle");
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
          name,
          business,
          challenge,
          budget,
          contactMethod,
          contactInfo,
          language,
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    close();
    setTimeout(resetForm, 300);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid var(--c-border)",
    borderRadius: 6,
    padding: "10px 12px",
    fontFamily: "var(--font-instrument-sans), sans-serif",
    fontSize: 13,
    color: "var(--c-text)",
    outline: "none",
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: 96,
    resize: "vertical",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inconsolata), monospace",
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--c-muted)",
    marginBottom: 6,
  };

  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-instrument-sans), sans-serif",
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 14px",
    borderRadius: 5,
    background: active ? "rgba(200,169,110,0.12)" : "transparent",
    border: active ? "1px solid rgba(200,169,110,0.5)" : "1px solid var(--c-border)",
    color: active ? "var(--c-gold)" : "var(--c-text2)",
    cursor: "pointer",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="intake-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(7,8,10,0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            overflowY: "auto",
            padding: "40px 16px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            style={{
              width: "100%",
              maxWidth: 480,
              background: "var(--c-card)",
              border: "1px solid var(--c-border)",
              borderRadius: 12,
              padding: 32,
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={t.close}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "transparent",
                border: "none",
                color: "var(--c-muted)",
                cursor: "pointer",
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: 20, paddingRight: 28 }}>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                  fontSize: "clamp(24px, 3.5vw, 28px)",
                  letterSpacing: "-0.02em",
                  color: "var(--c-heading)",
                  marginBottom: 6,
                }}
              >
                {t.h2}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontSize: 13,
                  color: "var(--c-text2)",
                  lineHeight: 1.6,
                }}
              >
                {t.subtitle}
              </p>
            </div>

            {status === "success" ? (
              <div
                style={{
                  background: "rgba(200,169,110,0.08)",
                  border: "1px solid rgba(200,169,110,0.35)",
                  borderRadius: 10,
                  padding: 28,
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 22, fontWeight: 700, color: "var(--c-heading)", marginBottom: 6 }}>
                  {t.success}
                </div>
                <div style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 14, color: "var(--c-text2)" }}>
                  {t.successSub}
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label style={labelStyle}>{t.labels.name}</label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.business}</label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder={t.placeholders.business}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.challenge}</label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder={t.placeholders.challenge}
                    style={textareaStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.budget}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                    {t.budgetOptions.map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        onClick={() => setBudget(budget === o.v ? "" : o.v)}
                        style={toggleBtnStyle(budget === o.v)}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.contactMethod}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                    {t.contactOptions.map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        onClick={() => setContactMethod(o.v as ContactMethod)}
                        style={toggleBtnStyle(contactMethod === o.v)}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.contactInfo}</label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={contactPlaceholder}
                    style={inputStyle}
                  />
                </div>

                {status === "error" && (
                  <div
                    style={{
                      fontFamily: "var(--font-instrument-sans), sans-serif",
                      fontSize: 12,
                      color: "#e88",
                    }}
                  >
                    {t.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "pending"}
                  style={{
                    background: "var(--c-gold)",
                    color: "var(--c-bg)",
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    padding: "12px 24px",
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
