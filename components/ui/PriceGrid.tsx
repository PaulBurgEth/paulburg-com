"use client";

import { MONO, SANS, T } from "@/lib/type";

/**
 * The two axes that move the price.
 *
 * The answer to "how much is it?" is the longest single block of copy on the
 * site — 86 words — and inside it sits a complete matrix with both corner cells
 * named: "Two things move the number: how many segments you want running, and
 * how many languages they run in. One segment in one language sits at the
 * floor; four segments across three languages sits at the top."
 *
 * A reader looking for a price has to parse that sentence to learn that the
 * price is a function of two variables. The grid says it at a glance, and it
 * says something the prose cannot: that the cells in between exist, so their
 * own combination has a place on it.
 *
 * No figures, because there are none on the site. That is a decision for the
 * owner, and the grid is honest without them: it shows what moves the number,
 * which is exactly what the copy claims to be answering.
 */
export default function PriceGrid({
  segmentsLabel,
  languagesLabel,
  floorLabel,
  topLabel,
  segments = [1, 2, 3, 4],
  languages = [1, 2, 3],
}: {
  segmentsLabel: string;
  languagesLabel: string;
  floorLabel: string;
  topLabel: string;
  segments?: number[];
  languages?: number[];
}) {
  return (
    <div style={{ marginTop: 18 }}>
      <div
        aria-hidden="true"
        style={{
          display: "grid",
          gridTemplateColumns: `auto repeat(${segments.length}, minmax(34px, 58px))`,
          gap: 0,
          width: "fit-content",
          maxWidth: "100%",
        }}
      >
        {/* Column header: the segment axis. */}
        <div />
        {segments.map((s) => (
          <div
            key={`h${s}`}
            style={{
              fontFamily: MONO,
              fontSize: T.caption,
              color: "var(--c-text2)",
              textAlign: "center",
              paddingBottom: 7,
            }}
          >
            {s}
          </div>
        ))}

        {languages.map((l) => (
          <div key={`row${l}`} style={{ display: "contents" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: T.caption,
                color: "var(--c-text2)",
                paddingRight: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {l}
            </div>
            {segments.map((s) => {
              const isFloor = s === segments[0] && l === languages[0];
              const isTop = s === segments[segments.length - 1] && l === languages[languages.length - 1];
              // The cells between the corners are drawn, unfilled: the point is
              // that they exist and the reader's own combination is one of them.
              const weight = (s / segments.length + l / languages.length) / 2;
              return (
                <div
                  key={`${l}-${s}`}
                  style={{
                    height: 34,
                    border: "1px solid var(--c-border)",
                    borderLeftWidth: s === segments[0] ? 1 : 0,
                    borderTopWidth: l === languages[0] ? 1 : 0,
                    background:
                      isFloor || isTop
                        ? "var(--c-gold)"
                        : `color-mix(in srgb, var(--c-gold) ${Math.round(weight * 22)}%, transparent)`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* The axes named, and the two corners the copy already names. */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 20px",
          marginTop: 12,
          fontFamily: SANS,
          fontSize: T.caption,
          color: "var(--c-text2)",
        }}
      >
        <span>
          <span style={{ fontFamily: MONO, color: "var(--c-text)" }}>→</span> {segmentsLabel}
        </span>
        <span>
          <span style={{ fontFamily: MONO, color: "var(--c-text)" }}>↓</span> {languagesLabel}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 20px",
          marginTop: 6,
          fontFamily: SANS,
          fontSize: T.caption,
          color: "var(--c-text2)",
        }}
      >
        <span>
          <span
            aria-hidden="true"
            style={{ display: "inline-block", width: 9, height: 9, background: "var(--c-gold)", marginRight: 7 }}
          />
          {floorLabel}
        </span>
        <span>
          <span
            aria-hidden="true"
            style={{ display: "inline-block", width: 9, height: 9, background: "var(--c-gold)", marginRight: 7 }}
          />
          {topLabel}
        </span>
      </div>
    </div>
  );
}
