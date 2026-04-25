"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMentorshipModal } from "@/context/MentorshipModalContext";
import { TELEGRAM_HANDLE } from "@/lib/constants";

const en = {
  h2: "Drop me a hint",
  subtitle: "Three lines is enough. I'll take it from there.",
  labels: {
    name: "Your name",
    area: "What interests you?",
    level: "Your current level",
    goal: "What do you want to achieve?",
    contactMethod: "How to reach you",
    contactInfo: "Contact info",
  },
  areaOptions: [
    { v: "capital", l: "Capital" },
    { v: "business", l: "Business" },
    { v: "ai", l: "AI & Automation" },
  ],
  levelOptions: [
    { v: "beginner", l: "Beginner — just starting out" },
    { v: "some", l: "Some experience — want to go deeper" },
    { v: "advanced", l: "Advanced — need a sparring partner" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  placeholders: {
    goal: "In 2–3 sentences is fine",
    telegram: "@username",
    whatsapp: "+1234567890",
    email: "you@example.com",
  },
  submit: "Send →",
  sending: "Sending…",
  success: "Got it.",
  successSub: "I'll reach out within a few hours.",
  error: `Something went wrong. Message me directly: @${TELEGRAM_HANDLE} on Telegram.`,
  close: "Close",
};

const ru = {
  h2: "Оставить заявку",
  subtitle: "Трёх строк достаточно. Остальное — моя работа.",
  labels: {
    name: "Ваше имя",
    area: "Что вас интересует?",
    level: "Ваш текущий уровень",
    goal: "Чего хотите достичь?",
    contactMethod: "Как с вами связаться",
    contactInfo: "Контакт",
  },
  areaOptions: [
    { v: "capital", l: "Капитал" },
    { v: "business", l: "Бизнес" },
    { v: "ai", l: "AI и Автоматизация" },
  ],
  levelOptions: [
    { v: "beginner", l: "Новичок — только начинаю" },
    { v: "some", l: "Есть опыт — хочу глубже" },
    { v: "advanced", l: "Продвинутый — нужен спарринг" },
  ],
  contactOptions: [
    { v: "telegram", l: "Telegram" },
    { v: "whatsapp", l: "WhatsApp" },
    { v: "email", l: "Email" },
  ],
  placeholders: {
    goal: "2–3 предложения — достаточно",
    telegram: "@username",
    whatsapp: "+7 900 000 0000",
    email: "you@example.com",
  },
  submit: "Отправить →",
  sending: "Отправка…",
  success: "Принято.",
  successSub: "Скоро напишу.",
  error: `Что-то пошло не так. Напишите напрямую: @${TELEGRAM_HANDLE} в Telegram.`,
  close: "Закрыть",
};

type Status = "idle" | "pending" | "success" | "error";
type ContactMethod = "telegram" | "whatsapp" | "email";

export default function MentorshipIntakeModal() {
  const { language } = useLanguage();
  const { isOpen, close } = useMentorshipModal();
  const t = language === "ru" ? ru : en;

  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");
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
    setArea("");
    setLevel("");
    setGoal("");
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
          type: "mentorship",
          name,
          area,
          level,
          achievement: goal,
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
          key="mentorship-modal"
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
                  fontFamily: "var(--font-fraunces), serif",
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
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 700, color: "var(--c-heading)", marginBottom: 6 }}>
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
                  <label style={labelStyle}>{t.labels.area}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                    {t.areaOptions.map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        onClick={() => setArea(area === o.v ? "" : o.v)}
                        style={toggleBtnStyle(area === o.v)}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.level}</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      WebkitAppearance: "none",
                      background: "var(--c-bg2)",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>—</option>
                    {t.levelOptions.map((o) => (
                      <option key={o.v} value={o.v}>{o.l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>{t.labels.goal}</label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder={t.placeholders.goal}
                    style={{ ...inputStyle, minHeight: 96, resize: "vertical" }}
                  />
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
