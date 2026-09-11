"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function MentorshipTestimonial() {
    const { language } = useLanguage();
    return (
        <section className="pb-reveal" style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 03</span>
            <div className="container-custom max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div style={{ width: 48, height: 1, background: "var(--c-gold)", marginBottom: 32 }} />

                    <blockquote
                        className="leading-relaxed mb-8"
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(18px, 2vw, 24px)",
                            color: "var(--c-body-lede)",
                            fontStyle: "italic",
                        }}
                    >
                        {/* The site's only testimonial was English-only and was
                            served untranslated to Russian readers, who are half
                            the audience. The quote is a real person's words, so
                            the Russian is a translation of them, not a rewrite. */}
                        {language === "ru"
                            ? "\u00ab\u041f\u0430\u0432\u0435\u043b \u0437\u0430\u043f\u043e\u043c\u043d\u0438\u043b\u0441\u044f \u043c\u043d\u0435 \u043a\u0430\u043a \u043e\u0447\u0435\u043d\u044c \u0446\u0435\u043b\u0435\u0443\u0441\u0442\u0440\u0435\u043c\u043b\u0451\u043d\u043d\u044b\u0439 \u0438 \u0441\u043e\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a. \u041b\u0435\u0433\u043a\u0438\u0439 \u0432 \u043e\u0431\u0449\u0435\u043d\u0438\u0438, \u0432\u0441\u0435\u0433\u0434\u0430 \u0433\u043e\u0442\u043e\u0432 \u043f\u043e\u043c\u043e\u0447\u044c, \u043e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u0438 \u0434\u043e\u0432\u0435\u0441\u0442\u0438 \u0438\u0434\u0435\u044e \u0434\u043e \u0434\u0435\u043b\u0430.\u00bb"
                            : "\u201cI experienced Pavel as a highly driven and efficient individual. A joyful character, always willing to help, cogitate, and carry out on ideas.\u201d"}
                    </blockquote>

                    <div style={{ width: 48, height: 1, background: "var(--c-gold)", marginBottom: 24 }} />

                    <p
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontWeight: 600,
                            fontSize: 17,
                            color: "var(--c-text)",
                        }}
                    >
                        Abbygaëlle Devriese
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontSize: 16,
                            color: "var(--c-text2)",
                            marginTop: 4,
                        }}
                    >
                        {language === "ru"
                            ? "\u0420\u0430\u0431\u043e\u0442\u0430\u043b\u0430 \u0441 \u041f\u0430\u0432\u043b\u043e\u043c \u0432 \u043e\u0434\u043d\u043e\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u0435 \u00b7 \u043e\u043a\u0442\u044f\u0431\u0440\u044c 2020"
                            : "Worked with Pavel on the same team \u00b7 October 2020"}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
