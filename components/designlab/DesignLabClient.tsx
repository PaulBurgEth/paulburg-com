"use client";

import { useState } from "react";
import { Literata, Onest, Golos_Text, PT_Serif, JetBrains_Mono } from "next/font/google";
import { SYSTEMS, CURRENT, type System } from "./systems";

// Every face here ships Cyrillic — the constraint that rules out Fraunces.
const literata = Literata({ variable: "--lab-literata", subsets: ["latin", "cyrillic"], weight: ["400", "600", "700"] });
const onest = Onest({ variable: "--lab-onest", subsets: ["latin", "cyrillic"], weight: ["400", "500", "700"] });
const golos = Golos_Text({ variable: "--lab-golos", subsets: ["latin", "cyrillic"], weight: ["400", "500", "600"] });
const ptSerif = PT_Serif({ variable: "--lab-ptserif", subsets: ["latin", "cyrillic"], weight: ["400", "700"] });
const mono = JetBrains_Mono({ variable: "--lab-mono", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });

const COPY = {
  ru: {
    heroTitle: "Нахожу компании, выхожу на ЛПР и пишу от вашего имени",
    heroLede:
      "Открытые реестры показывают, у каких компаний только что появился повод покупать. Я собираю список, проверяю адреса и веду переписку до клиента, готового обсуждать условия.",
    cta: "Расскажите о вашем рынке",
    ctaGhost: "Написать в Telegram",
    metrics: [
      { v: "3 854", l: "компании собрано" },
      { v: "1 556", l: "писем под одну компанию" },
      { v: "67%", l: "ответов доведено до расчёта" },
      { v: "0,3%", l: "отписок против ~2% по рынку" },
    ],
    cardsTitle: "Что я строю",
    cards: [
      { t: "AI-боты", d: "Чат-боты и агенты: квалификация лидов, ответы 24/7, запуск процессов. Многоязычны по умолчанию." },
      { t: "Кастомная CRM и BI", d: "Не Notion, не HubSpot. Своя CRM, BI-дашборды и панели под ваш pipeline: роли, сделки, история клиента." },
      { t: "Аутбаунд-канал", d: "Поиск компаний, выход на ЛПР, переписка от вашего имени до готового к разговору клиента." },
    ],
    tableTitle: "Рядом с рынком",
    tableCols: ["Показатель", "Этот пилот", "Рынок"],
    rows: [
      { m: "Отказы доставки, последние партии", a: "1,4-2,9%", b: "7-8%", good: true },
      { m: "Отказы доставки, весь проект", a: "4,2%", b: "7-8%", good: false },
      { m: "Отписки", a: "0,3%", b: "~2%", good: true },
      { m: "Отклик", a: "2,0%", b: "3,4%", good: false },
    ],
    eyebrowServices: "Услуги",
    eyebrowProof: "Доказательства",
  },
  en: {
    heroTitle: "I find the companies, reach the decision-maker, and write in your name",
    heroLede:
      "Open registries say which companies just had a reason to buy. I build the list, verify the addresses, and run the correspondence until a client is ready to talk terms.",
    cta: "Tell me about your market",
    ctaGhost: "Text me on Telegram",
    metrics: [
      { v: "3 854", l: "companies sourced" },
      { v: "1 556", l: "emails, each for one company" },
      { v: "67%", l: "of replies taken to a quote" },
      { v: "0.3%", l: "unsubscribes, against ~2% market" },
    ],
    cardsTitle: "What I build",
    cards: [
      { t: "AI-powered bots", d: "Chatbots and agents that qualify leads, answer 24/7 and trigger workflows. Multilingual by default." },
      { t: "Custom CRM & BI", d: "Not Notion, not HubSpot. Your own CRM, BI dashboards and manager panels built around your pipeline." },
      { t: "Outbound channel", d: "Finding companies, reaching the decision-maker, and writing in your name until a client is ready to talk." },
    ],
    tableTitle: "Against the market",
    tableCols: ["Metric", "This pilot", "Market"],
    rows: [
      { m: "Bounces, recent batches", a: "1.4-2.9%", b: "7-8%", good: true },
      { m: "Bounces, whole project", a: "4.2%", b: "7-8%", good: false },
      { m: "Unsubscribes", a: "0.3%", b: "~2%", good: true },
      { m: "Reply rate", a: "2.0%", b: "3.4%", good: false },
    ],
    eyebrowServices: "Services",
    eyebrowProof: "Proof",
  },
};

function Eyebrow({ sys, text }: { sys: System; text: string }) {
  const { rhythm, tokens, fonts, scale } = sys;
  if (rhythm.eyebrow === "none") return null;
  if (rhythm.eyebrow === "rule") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ width: 28, height: 2, background: tokens.accent, display: "block" }} />
        <span style={{ fontFamily: fonts.labelVar, fontSize: scale.label, fontWeight: 500, color: tokens.body }}>{text}</span>
      </div>
    );
  }
  return (
    <div
      style={{
        fontFamily: fonts.monoVar, fontSize: scale.label, letterSpacing: "0.18em",
        textTransform: "uppercase", color: tokens.accent, marginBottom: 12,
      }}
    >
      {text}
    </div>
  );
}

function Preview({ sys, lang }: { sys: System; lang: "ru" | "en" }) {
  const t = COPY[lang];
  const { tokens: c, fonts: f, scale: s, rhythm } = sys;

  const cardStyle: React.CSSProperties =
    rhythm.cards === "ruled"
      ? { borderTop: `1px solid ${c.borderStrong}`, paddingTop: 18, background: "transparent" }
      : rhythm.cards === "flat"
        ? { background: c.card, border: `1px solid ${c.border}`, borderRadius: 4, padding: 20 }
        : { background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20 };

  return (
    <div style={{ background: c.bg, color: c.body, fontFamily: f.bodyVar }}>
      {/* Hero */}
      <section style={{ padding: "72px 40px 56px", maxWidth: 1100, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: f.headingVar, fontWeight: 700, fontSize: s.hero,
            lineHeight: 1.1, letterSpacing: "-0.02em", color: c.heading,
            maxWidth: 900, marginBottom: 20,
          }}
        >
          {t.heroTitle}
        </h1>
        <p style={{ fontFamily: f.bodyVar, fontSize: s.lede, lineHeight: 1.6, color: c.body, maxWidth: 660, marginBottom: 28 }}>
          {t.heroLede}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <span style={{ background: c.accent, color: c.bg, fontFamily: f.labelVar, fontWeight: 600, fontSize: s.label, padding: "13px 26px", borderRadius: rhythm.cards === "bordered" ? 8 : 4 }}>
            {t.cta}
          </span>
          <span style={{ border: `1px solid ${c.borderStrong}`, color: c.body, fontFamily: f.labelVar, fontWeight: 600, fontSize: s.label, padding: "13px 26px", borderRadius: rhythm.cards === "bordered" ? 8 : 4 }}>
            {t.ctaGhost}
          </span>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ background: c.bg2, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: "34px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 28 }}>
          {t.metrics.map((m) => (
            <div key={m.l}>
              <div style={{ fontFamily: f.headingVar, fontWeight: 700, fontSize: 30, color: c.accent, lineHeight: 1.1 }}>{m.v}</div>
              <div style={{ fontFamily: f.bodyVar, fontSize: s.body, color: c.muted, marginTop: 6, lineHeight: 1.45 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section style={{ padding: "60px 40px", maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {rhythm.sectionNumbers && (
          <span style={{ position: "absolute", top: 30, right: 40, fontFamily: f.monoVar, fontSize: 11, letterSpacing: "0.18em", color: c.muted }}>§ 02</span>
        )}
        <Eyebrow sys={sys} text={t.eyebrowServices} />
        <h2 style={{ fontFamily: f.headingVar, fontWeight: 700, fontSize: s.h2, letterSpacing: "-0.02em", color: c.heading, marginBottom: 28 }}>
          {t.cardsTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: rhythm.cards === "ruled" ? 32 : 16 }}>
          {t.cards.map((card) => (
            <div key={card.t} style={cardStyle}>
              <h3 style={{ fontFamily: f.headingVar, fontWeight: 700, fontSize: s.h3, color: c.heading, marginBottom: 8 }}>{card.t}</h3>
              <p style={{ fontFamily: f.bodyVar, fontSize: s.body, lineHeight: 1.6, color: c.body }}>{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data table — the block that separates the systems most */}
      <section style={{ background: c.bg2, borderTop: `1px solid ${c.border}`, padding: "60px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          {rhythm.sectionNumbers && (
            <span style={{ position: "absolute", top: -6, right: 0, fontFamily: f.monoVar, fontSize: 11, letterSpacing: "0.18em", color: c.muted }}>§ 03</span>
          )}
          <Eyebrow sys={sys} text={t.eyebrowProof} />
          <h2 style={{ fontFamily: f.headingVar, fontWeight: 700, fontSize: s.h2, letterSpacing: "-0.02em", color: c.heading, marginBottom: 22 }}>
            {t.tableTitle}
          </h2>
          <div style={{ border: rhythm.cards === "ruled" ? "none" : `1px solid ${c.border}`, borderRadius: rhythm.cards === "bordered" ? 10 : 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: rhythm.cards === "ruled" ? "transparent" : c.card, borderBottom: `1px solid ${c.borderStrong}` }}>
              {t.tableCols.map((col) => (
                <div key={col} style={{ fontFamily: f.labelVar, fontSize: s.label, color: c.muted, padding: "12px 16px", textTransform: rhythm.eyebrow === "mono" ? "uppercase" : "none", letterSpacing: rhythm.eyebrow === "mono" ? "0.14em" : "0" }}>
                  {col}
                </div>
              ))}
            </div>
            {t.rows.map((r, i) => (
              <div key={r.m} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderTop: i ? `1px solid ${c.border}` : "none" }}>
                <div style={{ fontFamily: f.bodyVar, fontSize: s.body, color: c.heading, padding: "13px 16px" }}>{r.m}</div>
                <div style={{ fontFamily: f.monoVar, fontSize: s.body, fontWeight: 500, color: r.good ? (sys.tokens.accent2 ?? c.accent) : c.muted, padding: "13px 16px" }}>{r.a}</div>
                <div style={{ fontFamily: f.monoVar, fontSize: s.body, color: c.muted, padding: "13px 16px" }}>{r.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DesignLabClient() {
  const [active, setActive] = useState(0);
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const sys = SYSTEMS[active];

  return (
    <main className={`${literata.variable} ${onest.variable} ${golos.variable} ${ptSerif.variable} ${mono.variable}`} style={{ minHeight: "100vh", background: "#0b0b0d" }}>
      {/* Control bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#0b0b0d", borderBottom: "1px solid #24242a", padding: "12px 20px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", fontFamily: "var(--lab-golos)" }}>
        <span style={{ color: "#8b8b93", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginRight: 6 }}>Design lab</span>
        {SYSTEMS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            style={{
              background: i === active ? s.tokens.accent : "transparent",
              color: i === active ? "#fff" : "#c9c9d1",
              border: `1px solid ${i === active ? s.tokens.accent : "#33333c"}`,
              borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            {s.name}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <button
          type="button"
          onClick={() => setLang(lang === "ru" ? "en" : "ru")}
          style={{ background: "transparent", color: "#c9c9d1", border: "1px solid #33333c", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}
        >
          {lang === "ru" ? "RU → EN" : "EN → RU"}
        </button>
      </div>

      {/* Rationale */}
      <div style={{ padding: "18px 20px", borderBottom: "1px solid #24242a", fontFamily: "var(--lab-golos)", color: "#c9c9d1" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap", marginBottom: 10 }}>
            <strong style={{ color: "#fff", fontSize: 17 }}>{sys.name}</strong>
            <span style={{ color: "#8b8b93", fontSize: 14 }}>— {sys.tagline}</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 900, marginBottom: 8 }}>{sys.why}</p>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#9a8f7a", marginBottom: 12 }}><strong>Риск:</strong> {sys.risk}</p>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap", fontSize: 12, color: "#8b8b93", fontFamily: "var(--lab-mono)" }}>
            <span>Заголовки: {sys.fontNames.heading}</span>
            <span>Текст: {sys.fontNames.body} · {sys.scale.body}</span>
            <span>Акцент: {sys.tokens.accent}</span>
            <span style={{ color: "#6f6f78" }}>Было: {CURRENT.fontNames.heading} · {CURRENT.scale.body} · {CURRENT.tokens.accent}</span>
          </div>
        </div>
      </div>

      <Preview sys={sys} lang={lang} />
    </main>
  );
}
