"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function MentorshipTestimonial() {
    return (
        <section style={{ background: "var(--c-bg)", padding: "72px 0" }}>
            <div className="container-custom max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                    style={{
                        background: "var(--c-card)",
                        border: "1px solid var(--c-border)",
                        borderRadius: 10,
                        padding: "40px 40px 40px",
                    }}
                >
                    <div className="absolute -top-5 left-8">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                            style={{ background: "var(--c-gold)" }}
                        >
                            <Quote size={22} style={{ color: "var(--c-bg)" }} />
                        </div>
                    </div>

                    <blockquote
                        className="leading-relaxed mb-8 mt-4"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(16px, 2vw, 20px)",
                            color: "var(--c-text)",
                            fontStyle: "italic",
                        }}
                    >
                        &ldquo;I experienced Pavel as a highly driven and efficient individual. A joyful character, always willing to help, cogitate, and carry out on ideas.&rdquo;
                    </blockquote>

                    <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: 20 }}>
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
