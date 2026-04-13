"use client";

import { motion } from "framer-motion";
import { Video, MapPin, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MentorshipFormats() {
    const { language, t } = useLanguage();
    const f = t.mentorship.formats;

    const formats = [
        { icon: Video, text: f.online },
        { icon: MapPin, text: f.offline },
        { icon: CreditCard, text: f.payment },
    ];

    return (
        <section id="formats" className="scroll-mt-20" style={{ background: "var(--c-bg)", padding: "72px 0" }}>
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: "var(--c-card)",
                        border: "1px solid var(--c-border)",
                        borderRadius: 10,
                        padding: "40px 40px 44px",
                    }}
                >
                    <div style={{
                        fontFamily: "var(--font-inconsolata), monospace",
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--c-gold)",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 10,
                    }}>
                        {language === "ru" ? "Форматы" : "Formats"}
                        <span style={{ flex: 1, height: 1, background: "var(--c-border)", display: "block" }} />
                    </div>

                    <h2
                        className="mb-10"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontWeight: 700,
                            fontSize: "clamp(22px, 3vw, 32px)",
                            letterSpacing: "-0.02em",
                            color: "var(--c-heading)",
                        }}
                    >
                        {f.title}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {formats.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center"
                                        style={{
                                            background: "rgba(200,169,110,0.05)",
                                            border: "1px solid var(--c-border)",
                                        }}
                                    >
                                        <Icon size={26} style={{ color: "var(--c-gold)" }} />
                                    </div>
                                    <p
                                        style={{
                                            fontFamily: "var(--font-instrument-sans), sans-serif",
                                            fontSize: 14,
                                            color: "var(--c-text2)",
                                            fontWeight: 500,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
