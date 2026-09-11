"use client";

import { MONO, SANS, T } from "@/lib/type";

/**
 * A handoff chain: nodes on a rail with the thing that moves written on each
 * link.
 *
 * This is the site's existing dot-and-hairline vocabulary with one addition —
 * labelled connections — because the content needs it. The Turnkey subtitle is
 * the single most structure-dense sentence on the site: "Five production-grade
 * systems wired end to end … The enquiry lands in the CRM, the CRM lands on the
 * dashboard, and the dashboard shows you where it stalled." That is a counted
 * set of five AND a dataflow through them, told in words, for the flagship
 * offer.
 *
 * A StepRail would be wrong here: its numbers say "first, then, then", and the
 * argument is not sequence but that each system hands something to the next.
 * What travels along the link is the claim, so it is drawn on the link.
 *
 * aria-hidden on the whole graphic, with the systems and the chain restated in
 * the prose above it — the rule every graphic on this site follows.
 */
export type FlowNode = {
  label: string;
  /** What this node passes on. Rendered on the link to its right. */
  carries?: string;
};

export default function FlowChain({ nodes, outcome }: { nodes: FlowNode[]; outcome: string }) {
  return (
    <div aria-hidden="true" style={{ marginTop: 26, marginBottom: 30 }}>
      {/* Desktop: one row, links between the nodes. */}
      <div className="hidden md:flex" style={{ alignItems: "stretch", width: "100%" }}>
        {nodes.map((n, i) => (
          <div key={n.label} style={{ display: "flex", alignItems: "stretch", flex: i === nodes.length - 1 ? "0 0 auto" : "1 1 0" }}>
            <div style={{ flexShrink: 0, maxWidth: 150 }}>
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  border: `1px solid var(--c-gold)`,
                  background: i === 0 ? "var(--c-gold)" : "var(--c-bg)",
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: T.caption,
                  fontWeight: 600,
                  color: "var(--c-heading)",
                  lineHeight: 1.35,
                  // Two lines' worth, so every node name occupies the same band
                  // and the link labels below it line up on their own tier.
                  minHeight: "2.7em",
                }}
              >
                {n.label}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ flex: 1, minWidth: 40, paddingLeft: 10, paddingRight: 10 }}>
                {/* The link: a hairline with an arrowhead, and above it the
                    thing that crosses it. */}
                <div style={{ display: "flex", alignItems: "center", height: 11 }}>
                  <span style={{ flex: 1, height: 1, background: "var(--c-border2)" }} />
                  <span
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      borderLeft: "4px solid var(--c-border2)",
                      flexShrink: 0,
                    }}
                  />
                </div>
                {n.carries && (
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: T.caption,
                      letterSpacing: "0.08em",
                      color: "var(--c-gold)",
                      // Below the node-name band, centred on its own link, so
                      // it reads as what crosses the link rather than as a
                      // subtitle of the node to its left.
                      marginTop: "calc(2.7em + 12px)",
                      lineHeight: 1.3,
                      textAlign: "center",
                    }}
                  >
                    {n.carries}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Below md the chain turns vertical: five nodes side by side at phone
          width would be four characters each. */}
      <ol className="md:hidden" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {nodes.map((n, i) => (
          <li key={n.label} style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  border: "1px solid var(--c-gold)",
                  background: i === 0 ? "var(--c-gold)" : "var(--c-bg)",
                  marginTop: 5,
                }}
              />
              {i < nodes.length - 1 && <span style={{ width: 1, flex: 1, minHeight: 30, background: "var(--c-border2)" }} />}
            </div>
            <div style={{ paddingBottom: i < nodes.length - 1 ? 14 : 0 }}>
              <div style={{ fontFamily: SANS, fontSize: T.bodySm, fontWeight: 600, color: "var(--c-heading)" }}>{n.label}</div>
              {n.carries && (
                <div style={{ fontFamily: MONO, fontSize: T.caption, letterSpacing: "0.08em", color: "var(--c-gold)", marginTop: 3 }}>
                  ↓ {n.carries}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* What the chain is for. The end of the sentence, given its own line. */}
      <div
        style={{
          fontFamily: SANS,
          fontSize: T.bodySm,
          color: "var(--c-text2)",
          marginTop: 18,
          paddingTop: 14,
          borderTop: "1px solid var(--c-border)",
        }}
      >
        {outcome}
      </div>
    </div>
  );
}
