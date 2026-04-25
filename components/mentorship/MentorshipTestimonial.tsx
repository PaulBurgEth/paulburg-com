"use client";

import { motion } from "framer-motion";

export default function MentorshipTestimonial() {
    return (
        <section style={{ background: "var(--c-bg)", padding: "72px 0" }}>
            <div className="container-custom max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div style={{ width: 48, height: 1, background: "var(--c-gold)", marginBottom: 32 }} />

                    <blockquote
                        className="leading-relaxed mb-8"
                        style={{
                            fontFamily: "var(--font-fraunces), serif",
                            fontSize: "clamp(18px, 2vw, 24px)",
                            color: "var(--c-body-lede)",
                            fontStyle: "italic",
                        }}
                    >
                        &ldquo;I experienced Pavel as a highly driven and efficient individual. A joyful character, always willing to help, cogitate, and carry out on ideas.&rdquo;
                    </blockquote>

                    <div style={{ width: 48, height: 1, background: "var(--c-gold)", marginBottom: 24 }} />

                    <p
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontWeight: 600,
                            fontSize: 15,
                            color: "var(--c-text)",
                        }}
                    >
                        Abbygaëlle Devriese
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontSize: 13,
                            color: "var(--c-text2)",
                            marginTop: 4,
                        }}
                    >
                        Worked with Pavel on the same team · October 2020
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
