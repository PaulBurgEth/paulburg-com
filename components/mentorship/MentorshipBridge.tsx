"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function MentorshipBridge() {
    const { t } = useLanguage();
    const b = t.mentorship.bridge;

    return (
        <section
            className="py-24 pb-reveal"
            style={{ background: "var(--c-card)", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", position: "relative" }}
        >
            <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 01</span>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="max-w-4xl mx-auto text-center relative"
                >
                    <span
                        aria-hidden="true"
                        className="absolute -top-12 -left-4 text-9xl font-serif leading-none select-none"
                        style={{ color: "rgba(200,169,110,0.08)" }}
                    >&ldquo;</span>
                    <span
                        aria-hidden="true"
                        className="absolute -bottom-16 -right-4 text-9xl font-serif leading-none select-none"
                        style={{ color: "rgba(200,169,110,0.08)" }}
                    >&rdquo;</span>

                    <h2
                        className="leading-relaxed mb-8"
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontSize: "clamp(17px, 2vw, 20px)",
                            color: "var(--c-text2)",
                            fontWeight: 400,
                        }}
                    >
                        {b.intro}
                    </h2>

                    {/* Three pillars as three columns, not one centred
                        paragraph broken by <br>. Each pillar already had its own
                        payoff clause — a set of three with a consequence each,
                        which the prose ran together into a single sentence. The
                        copy is unchanged, and §02 of this same page already
                        renders a three-item grid, so this is the page's own
                        vocabulary rather than a new one. */}
                    <ul
                        className="grid grid-cols-1 md:grid-cols-3 text-left"
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "0 0 8px",
                            borderTop: "1px solid var(--c-border)",
                            borderBottom: "1px solid var(--c-border)",
                        }}
                    >
                        {[
                            { k: b.p1, v: b.p1_text },
                            { k: b.p2, v: b.p2_text },
                            { k: b.p3, v: b.p3_text },
                        ].map((pillar, i) => (
                            <li
                                key={pillar.k}
                                style={{
                                    padding: "18px 20px",
                                    borderLeft: i > 0 ? "1px solid var(--c-border)" : undefined,
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        display: "block",
                                        width: 22,
                                        height: 1,
                                        background: "var(--c-gold)",
                                        marginBottom: 12,
                                    }}
                                />
                                <span
                                    style={{
                                        display: "block",
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 700,
                                        fontSize: 21,
                                        color: "var(--c-gold)",
                                        lineHeight: 1.25,
                                        marginBottom: 8,
                                    }}
                                >
                                    {pillar.k}
                                </span>
                                <span
                                    style={{
                                        display: "block",
                                        fontFamily: "var(--font-instrument-sans), sans-serif",
                                        fontSize: 16,
                                        color: "var(--c-text2)",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {pillar.v}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-6 md:space-y-8">
                        <div className="pt-8">
                            <p
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontStyle: "italic",
                                    fontSize: "clamp(17px, 2vw, 20px)",
                                    color: "var(--c-gold)",
                                }}
                            >
                                {b.outro}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
