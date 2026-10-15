"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SERIF, DISPLAY_AXES, SANS, MONO, T, itemVariants } from "@/components/outbound/shared";

export type Source = { label: string; href?: string };

/**
 * Every figure on /ai-clients carries its source under it. External sources
 * link out; our own checks are marked "own" and drawn with a gold border, so a
 * reader never mistakes our measurement for a market study or the reverse.
 * Fact map: docs/prompts/СТРАНИЦА_GEO_АГЕНТ_черновик_20261015.md §2, §2б.
 */
export const SOURCES = {
  openai: { label: "OpenAI, 2026", href: "https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users" },
  alphabet: { label: "Alphabet, 2025", href: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q2-2025/" },
  brightlocal: { label: "BrightLocal, 2026", href: "https://www.brightlocal.com/resources/local-seo-statistics/" },
  brightlocal2024: { label: "BrightLocal, 2024", href: "https://www.brightlocal.com/resources/local-seo-statistics/" },
  g2: { label: "G2, 2026", href: "https://learn.g2.com/g2-2026-ai-search-insight-report" },
  hbr: { label: "Harvard Business Review, 2011", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
  soci: { label: "SOCi, 2026", href: "https://www.brightlocal.com/resources/local-seo-statistics/" },
} satisfies Record<string, Source>;

export function SourceLink({ source, own = false }: { source: Source; own?: boolean }) {
  const style = {
    fontFamily: MONO,
    fontSize: T.caption,
    letterSpacing: "0.04em",
    color: own ? "var(--c-gold)" : "var(--c-muted)",
  } as const;
  if (!source.href) return <span style={style}>{source.label}</span>;
  return (
    <a href={source.href} target="_blank" rel="noopener noreferrer" style={{ ...style, textDecoration: "underline", textUnderlineOffset: 3 }}>
      {source.label}
    </a>
  );
}

/** A figure as evidence: big number, one line of meaning, its source. */
export function ProofCard({ n, d, source, own = false }: { n: string; d: ReactNode; source: Source; own?: boolean }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        background: "var(--c-card)",
        border: `1px solid ${own ? "rgba(200,169,110,0.45)" : "var(--c-border)"}`,
        borderRadius: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontFamily: SERIF, ...DISPLAY_AXES, fontWeight: 700, fontSize: T.figureSm, lineHeight: 1.05, color: own ? "var(--c-gold)" : "var(--c-heading)" }}>
        {n}
      </div>
      <p style={{ fontFamily: SANS, fontSize: T.bodySm, color: "var(--c-body)", lineHeight: 1.55, flex: 1 }}>{d}</p>
      <SourceLink source={source} own={own} />
    </motion.div>
  );
}

export function Legend({ external, own }: { external: string; own: string }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontFamily: MONO, fontSize: T.caption, color: "var(--c-text2)", marginBottom: 18 }}>
      <span className="flex items-center gap-2">
        <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: 3, border: "1px solid var(--c-border2)" }} />
        {external}
      </span>
      <span className="flex items-center gap-2">
        <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: 3, border: "1px solid rgba(200,169,110,0.6)" }} />
        {own}
      </span>
    </div>
  );
}
