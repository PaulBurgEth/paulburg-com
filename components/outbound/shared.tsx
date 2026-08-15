"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared shell for /outbound sections.
 *
 * Every section animates itself via `whileInView` rather than the global
 * `.pb-reveal` class: `useRevealObserver` queries the DOM once on mount, so
 * a dynamically imported section would never be observed and would stay at
 * opacity 0 forever. Self-contained motion has no such ordering dependency.
 */

// Headings add Source Serif as a Cyrillic fallback — the global
// html[lang="ru"] rule is overridden by the inline fontFamily below.
export const SERIF = "var(--font-fraunces), var(--font-source-serif), serif";
export const SANS = "var(--font-instrument-sans), sans-serif";
export const MONO = "var(--font-inconsolata), monospace";
export const LEDE = "var(--font-newsreader), var(--font-source-serif), serif";

export const cardStyle: CSSProperties = {
  background: "var(--c-card)",
  border: "1px solid var(--c-border)",
  borderRadius: 10,
  padding: 20,
};

export const cardHover = {
  y: -3,
  boxShadow: "0 10px 36px rgba(0,0,0,0.3)",
  borderColor: "rgba(200,169,110,0.22)",
};

export const monoChipStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 9,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--c-gold)",
  background: "rgba(200,169,110,0.08)",
  border: "1px solid rgba(200,169,110,0.18)",
  borderRadius: 4,
  padding: "3px 8px",
  display: "inline-block",
  whiteSpace: "nowrap",
};

export const tagStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: "0.1em",
  color: "var(--c-text2)",
  background: "var(--c-card2)",
  border: "1px solid var(--c-border)",
  borderRadius: 4,
  padding: "4px 9px",
  display: "inline-block",
};

/**
 * One observer per section, never per card.
 *
 * Children must NOT carry their own `whileInView`: each one would spin up its
 * own IntersectionObserver, and on a fast scroll some of them never fire, so
 * the card stays stuck at its initial opacity 0. Instead the section drives the
 * animation and children inherit the state through `variants` — framer
 * propagates the active variant down the tree, through plain DOM nodes too.
 */
export const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.3, 1] as const },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.7, 0.3, 1] as const },
  },
};

export function SectionShell({
  id,
  num,
  alt = false,
  children,
}: {
  id?: string;
  num: string;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={id ? "scroll-mt-20" : undefined}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      // amount must stay small: several of these sections are taller than the
      // viewport, and a section taller than the root never reaches a high ratio.
      viewport={{ once: true, amount: 0.05 }}
      style={{
        background: alt ? "var(--c-bg2)" : "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
        padding: "72px 0",
        position: "relative",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--c-muted)",
        }}
      >
        § {num}
      </span>
      <div className="container-custom">{children}</div>
    </motion.section>
  );
}

export function SectionHead({
  eyebrow,
  h2,
  sub,
}: {
  eyebrow: string;
  h2: string;
  sub?: string;
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--c-gold)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 10,
        }}
      >
        {eyebrow}
        <span style={{ flex: 1, height: 1, background: "var(--c-border)", display: "block" }} />
      </div>
      <h2
        style={{
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: "clamp(26px, 4vw, 38px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "var(--c-heading)",
          marginBottom: sub ? 10 : 0,
          maxWidth: 780,
        }}
      >
        {h2}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: SANS,
            fontSize: 14,
            color: "var(--c-text2)",
            maxWidth: 640,
            lineHeight: 1.65,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: 11,
        lineHeight: 1.7,
        color: "var(--c-muted)",
        marginTop: 16,
        maxWidth: 720,
      }}
    >
      {children}
    </p>
  );
}
