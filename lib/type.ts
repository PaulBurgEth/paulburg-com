import type { CSSProperties } from "react";

/**
 * The site's type scale and card vocabulary.
 *
 * These existed already, as `T` and `cardStyle` in
 * components/outbound/shared.tsx, used by thirteen files — all of them under
 * /outbound. The other four pages invented their own sizes, which is how the
 * site ended up running 25 distinct font sizes: twelve on the home page,
 * fourteen on /services, twelve on /mentorship, against eleven on /outbound.
 * Steps like 22, 26, 30, 32, 42 and 52 exist on exactly one page each.
 *
 * Moving the definitions here and importing them everywhere is the cheapest
 * possible version of "one scale": nothing is redesigned, the ladder that was
 * already agreed simply stops being confined to one route.
 *
 * shared.tsx re-exports these so the thirteen /outbound files keep working
 * unchanged.
 */
export const SERIF = "var(--font-display)";
export const SANS = "var(--font-instrument-sans), sans-serif";
export const MONO = "var(--font-inconsolata), monospace";
export const LEDE = "var(--font-lede)";

export const T = {
  lede: 20,
  body: 17,
  bodySm: 16,
  button: 15,
  h3: 21,
  h2: "clamp(30px, 4vw, 44px)",
  /** Hero only. One per page, never inside a section. */
  h1: "clamp(36px, 5vw, 62px)",
  caption: 14,
  eyebrow: 14,
  /** A large number as an object, not a heading: funnels, counters, sums. */
  figure: 44,
  figureSm: 40,
} as const;

/**
 * Three card roles, and only three. An audit counted thirteen distinct
 * border/radius/background combinations on /outbound alone, with radii of 5, 6,
 * 8, 10 and 12 and four border widths — so a border had stopped meaning
 * anything, and the eye had to re-learn each section.
 */
export const cardStyle: CSSProperties = {
  background: "var(--c-card)",
  border: "1px solid var(--c-border)",
  borderRadius: 10,
  padding: 20,
};

/** The one card in a group that the section is actually arguing for. */
export const cardAccentStyle: CSSProperties = {
  ...cardStyle,
  borderTop: "2px solid var(--c-gold)",
};

/** An aside inside prose: a note, a caveat, a source. Not a card in a grid. */
export const cardQuietStyle: CSSProperties = {
  background: "var(--c-bg2)",
  border: "1px solid var(--c-border)",
  borderRadius: 10,
  padding: 18,
};

export const cardHover = {
  y: -3,
  boxShadow: "0 10px 36px rgba(0,0,0,0.3)",
  borderColor: "rgba(200,169,110,0.22)",
};
