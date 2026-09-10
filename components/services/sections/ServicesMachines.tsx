"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * The agent-facing layer of HelpRent Da Nang.
 *
 * This is the most technically specific thing in the portfolio and it was on no
 * page of the site. It is also the honest way to answer "do you do SEO?" — the
 * classic answer would be a claim, this one is a running endpoint.
 */

const en = {
  sectionLabel: "Also built",
  h2: "Systems that machines can read",
  subtitle:
    "Search engines answer with models now, and the model has to be able to fetch the data. On HelpRent Da Nang that is not a plan, it is an endpoint.",
  rows: [
    {
      k: "MCP server",
      v: "A stateless JSON-RPC server at /mcp/ with four read-only tools: search listings, fetch one, find buildings, market stats. No handshake, no session.",
    },
    {
      k: "REST API v1",
      v: "Documented with an OpenAPI spec. No key, no account, nothing to sign up for.",
    },
    {
      k: "Paid per request",
      v: "600 calls a day free. Past that the endpoint answers HTTP 402 with an x402 challenge and settles in USDC on Base.",
    },
    {
      k: "Read-only by design",
      v: "No write tools, and contacts are never handed to an agent. It sends the person to the listing page instead.",
    },
    {
      k: "Machine-readable throughout",
      v: "llms.txt, schema.org on every listing, ItemList on the catalogues.",
    },
  ],
  note: "The same thinking goes into anything I build for you: if a model is going to be the thing reading your site, it should find structure rather than guess at it.",
};

const ru = {
  sectionLabel: "Ещё построено",
  h2: "Системы, которые читают машины",
  subtitle:
    "Поисковики теперь отвечают моделями, и модель должна суметь забрать данные. В HelpRent Da Nang это не план, а работающий эндпоинт.",
  rows: [
    {
      k: "MCP-сервер",
      v: "Stateless JSON-RPC на /mcp/ с четырьмя read-only инструментами: поиск объявлений, одно объявление, поиск зданий, статистика рынка. Без хендшейка и без сессии.",
    },
    {
      k: "REST API v1",
      v: "С OpenAPI-спецификацией. Без ключа, без аккаунта, регистрироваться не нужно.",
    },
    {
      k: "Оплата за запрос",
      v: "600 вызовов в сутки бесплатно. Дальше эндпоинт отвечает HTTP 402 с x402-челленджем и рассчитывается в USDC на Base.",
    },
    {
      k: "Сознательно read-only",
      v: "Инструментов записи нет, контакты агенту не отдаются. Вместо этого он отправляет человека на страницу объявления.",
    },
    {
      k: "Машиночитаемость насквозь",
      v: "llms.txt, schema.org на каждом объявлении, ItemList на каталогах.",
    },
  ],
  note: "Та же логика идёт в то, что я строю вам: если ваш сайт будет читать модель, пусть она находит структуру, а не догадывается о ней.",
};

export default function ServicesMachines() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <section
      id="machines"
      className="scroll-mt-20 pb-reveal"
      style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          fontFamily: "var(--font-inconsolata), monospace",
          fontSize: 14,
          letterSpacing: "0.18em",
          color: "var(--c-muted)",
        }}
      >
        § 05
      </span>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 14,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--c-gold)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 10,
            }}
          >
            {t.sectionLabel}
            <span style={{ flex: 1, height: 1, background: "var(--c-border)", display: "block" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(26px, 4vw, 38px)",
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
              fontSize: 16,
              color: "var(--c-muted)",
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "var(--c-card)",
            border: "1px solid var(--c-border)",
            borderLeft: "2px solid var(--c-gold)",
            borderRadius: 10,
            padding: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* L-bracket corner ticks — the cover-image motif used across the site. */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 12,
              height: 12,
              borderBottom: "1px solid var(--c-gold)",
              borderRight: "1px solid var(--c-gold)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span
              style={{
                width: 32,
                height: 32,
                background: "rgba(200,169,110,0.10)",
                border: "1px solid rgba(200,169,110,0.22)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Cpu size={15} color="var(--c-gold)" />
            </span>
            <span
              style={{
                fontFamily: "var(--font-inconsolata), monospace",
                fontSize: 14,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--c-text2)",
              }}
            >
              helprentdanang.com
            </span>
          </div>

          <dl style={{ display: "grid", gap: 14, margin: 0 }}>
            {t.rows.map((row, i) => (
              <div key={i} className="machines-row">
                <dt
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--c-gold)",
                  }}
                >
                  {row.k}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontSize: 16,
                    color: "var(--c-body)",
                    lineHeight: 1.6,
                  }}
                >
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>

          <p
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid var(--c-border)",
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontSize: 16,
              color: "var(--c-muted)",
              lineHeight: 1.6,
              maxWidth: 620,
            }}
          >
            {t.note}
          </p>
        </motion.div>
      </div>

      <style>{`
        .machines-row{display:grid;grid-template-columns:200px 1fr;gap:18px;align-items:baseline}
        @media(max-width:680px){.machines-row{grid-template-columns:1fr;gap:4px}}
      `}</style>
    </section>
  );
}
