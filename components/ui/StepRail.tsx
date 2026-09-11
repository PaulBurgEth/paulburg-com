"use client";

import { MONO, SANS, T } from "@/lib/type";

/**
 * A sequence on a rail: numbered circles on a hairline.
 *
 * This construction already appears three times on /outbound — the nine-stage
 * conveyor in §04, the six-week rhythm in §08, the three moves in §11 — and a
 * comment in OutboundPilot says why they are identical: "so the two schedules
 * on the page read as one visual language". It was copy-pasted each time, and
 * it existed nowhere else on the site.
 *
 * /services §07 is a four-step process with a duration on every step and no
 * rail, no connector and no arrow — a sequence rendered as four unrelated
 * cards, on a site that draws sequences three times one page over.
 *
 * `aria-hidden` on the rail and the circles, with the step names as ordinary
 * text: every graphic on this site follows that rule, and the numbers are
 * restated in the adjacent copy.
 */
export type Step = {
  /** Short name. The heading of the step. */
  label: string;
  /** Optional line under the label: a duration, a note, an outcome. */
  meta?: string;
  /** Optional body copy. */
  body?: string;
};

export default function StepRail({
  steps,
  /** Steps from this index on are filled gold — the part that is extra. */
  accentFrom,
  /** Number the circles, or leave them as plain dots. */
  numbered = true,
  columns,
}: {
  steps: Step[];
  accentFrom?: number;
  numbered?: boolean;
  columns?: string;
}) {
  // Static strings, looked up by count. Tailwind generates classes by scanning
  // source text, so `md:grid-cols-${n}` produces a class that exists in the
  // markup and in no stylesheet — the first version of this fell back to two
  // columns, and a four-step rail wrapped onto a second row with the connecting
  // hairline running only along the first.
  const BY_COUNT: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
    9: "grid-cols-2 sm:grid-cols-3 md:grid-cols-9",
  };
  const cols = columns ?? BY_COUNT[steps.length] ?? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";

  return (
    <div style={{ position: "relative" }}>
      {/* The hairline runs behind the circles, which is what makes the row read
          as one sequence rather than a set. Hidden below md, where the steps
          stack and a horizontal rule would connect nothing. */}
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{ position: "absolute", left: 0, right: 0, top: 17, height: 1, background: "var(--c-border2)" }}
      />
      <div className={`grid ${cols} gap-x-4 gap-y-7`} style={{ position: "relative" }}>
        {steps.map((step, i) => {
          const on = accentFrom !== undefined && i >= accentFrom;
          return (
            <div key={step.label} className="flex flex-col items-start">
              <span
                aria-hidden="true"
                className="flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: on ? "var(--c-gold)" : "var(--c-bg)",
                  border: `1px solid ${on ? "var(--c-gold)" : "var(--c-border2)"}`,
                  color: on ? "var(--c-on-gold)" : "var(--c-text2)",
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: T.caption,
                  letterSpacing: "0.06em",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {numbered ? String(i + 1).padStart(2, "0") : ""}
              </span>
              {step.meta && (
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: T.caption,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--c-gold)",
                    marginTop: 11,
                  }}
                >
                  {step.meta}
                </span>
              )}
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: T.bodySm,
                  fontWeight: 600,
                  color: "var(--c-heading)",
                  marginTop: step.meta ? 5 : 11,
                  lineHeight: 1.3,
                }}
              >
                {step.label}
              </span>
              {step.body && (
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: T.caption,
                    color: "var(--c-text2)",
                    marginTop: 6,
                    lineHeight: 1.55,
                    maxWidth: "34ch",
                  }}
                >
                  {step.body}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
