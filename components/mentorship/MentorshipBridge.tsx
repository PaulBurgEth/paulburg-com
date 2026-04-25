"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function MentorshipBridge() {
    const { t } = useLanguage();
    const b = t.mentorship.bridge;

    return (
        <section
            className="py-24"
            style={{ background: "var(--c-card)", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}
        >
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center relative"
                >
                    <span
                        className="absolute -top-12 -left-4 text-9xl font-serif leading-none select-none"
                        style={{ color: "rgba(200,169,110,0.08)" }}
                    >&ldquo;</span>
                    <span
                        className="absolute -bottom-16 -right-4 text-9xl font-serif leading-none select-none"
                        style={{ color: "rgba(200,169,110,0.08)" }}
                    >&rdquo;</span>

                    <h2
                        className="leading-relaxed mb-8"
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontSize: "clamp(16px, 2vw, 20px)",
                            color: "var(--c-text2)",
                            fontWeight: 400,
                        }}
                    >
                        {b.intro}
                    </h2>

                    <div className="space-y-6 md:space-y-8">
                        <p
                            className="leading-relaxed"
                            style={{
                                fontFamily: "var(--font-instrument-sans), sans-serif",
                                fontSize: "clamp(16px, 2vw, 20px)",
                                color: "var(--c-text)",
                                fontWeight: 400,
                            }}
                        >
                            <span
                                className="font-bold hover:scale-105 inline-block transition-transform duration-300"
                                style={{ color: "var(--c-gold)" }}
                            >{b.p1}</span> {b.p1_text},
                            <br className="hidden md:block" />
                            <span
                                className="font-bold hover:scale-105 inline-block transition-transform duration-300"
                                style={{ color: "var(--c-gold)" }}
                            >{b.p2}</span> {b.p2_text},
                            <br className="hidden md:block" />
                            <span
                                className="font-bold hover:scale-105 inline-block transition-transform duration-300"
                                style={{ color: "var(--c-gold)" }}
                            >{b.p3}</span> {b.p3_text}.
                        </p>

                        <div className="pt-8">
                            <p
                                style={{
                                    fontFamily: "var(--font-fraunces), serif",
                                    fontStyle: "italic",
                                    fontSize: "clamp(16px, 2vw, 20px)",
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
