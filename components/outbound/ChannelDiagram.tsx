"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Line schematic of the channel, drawn in the site's own vocabulary: 1px strokes,
 * gold accent, mono labels, no fills. It sits in the hero's right half, which was
 * empty at desktop width, and explains the service faster than the lede does.
 */
const en = {
  steps: [
    { k: "01", t: "Registries", d: "customs, tenders, filings" },
    { k: "02", t: "Filter", d: "a reason to write" },
    { k: "03", t: "The email", d: "one company, its language" },
    { k: "04", t: "Reply", d: "answered same day" },
    { k: "05", t: "Handover", d: "a client ready to talk terms" },
  ],
  caption: "Open data in, a client ready to talk out",
};

const ru = {
  steps: [
    { k: "01", t: "Реестры", d: "таможня, тендеры, знаки" },
    { k: "02", t: "Отбор", d: "повод для письма" },
    { k: "03", t: "Письмо", d: "одна компания, её язык" },
    { k: "04", t: "Ответ", d: "ответ в тот же день" },
    { k: "05", t: "Передача", d: "клиент, готовый обсуждать условия" },
  ],
  caption: "На входе открытые данные, на выходе готовый к разговору клиент",
};

export default function ChannelDiagram() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <div aria-hidden="true" style={{ width: "100%", maxWidth: 460 }}>
      <ol style={{ display: "flex", flexDirection: "column", gap: 0, listStyle: "none" }}>
        {t.steps.map((s, i) => {
          const last = i === t.steps.length - 1;
          return (
            <li key={s.k} style={{ display: "flex", gap: 16 }}>
              {/* rail */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <span
                  style={{
                    width: 9, height: 9, borderRadius: "50%",
                    border: `1px solid var(--c-gold)`,
                    background: last ? "var(--c-gold)" : "transparent",
                    marginTop: 6,
                  }}
                />
                {!last && <span style={{ width: 1, flex: 1, minHeight: 34, background: "var(--c-border2)" }} />}
              </div>
              <div style={{ paddingBottom: last ? 0 : 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
                  <span style={{ fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.14em", color: "var(--c-gold)" }}>
                    {s.k}
                  </span>
                  <span style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 16, fontWeight: 600, color: "var(--c-heading)" }}>
                    {s.t}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 14, color: "var(--c-text2)", marginTop: 2 }}>
                  {s.d}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p
        style={{
          fontFamily: "var(--font-inconsolata), monospace",
          fontSize: 14, lineHeight: 1.6, color: "var(--c-muted)",
          marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--c-border)",
        }}
      >
        {t.caption}
      </p>
    </div>
  );
}
