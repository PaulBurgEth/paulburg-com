"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ServiceCard from "@/components/ServiceCard";

export default function MentorshipServices() {
    const { language, t } = useLanguage();
    const s = t.mentorship.services;
    const [openCount, setOpenCount] = useState(0);

    const services = [
        { ...s.card1, color: "var(--c-gold)", buttonText: s.card1.button },
        { ...s.card2, color: "var(--c-gold)", buttonText: s.card2.button },
        { ...s.card3, color: "var(--c-gold)", buttonText: s.card3.button },
    ];

    return (
        <section id="services" className="scroll-mt-20 pb-reveal" style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 04</span>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    style={{ marginBottom: 48 }}
                >
                    <div style={{
                        fontFamily: "var(--font-inconsolata), monospace",
                        fontSize: 14,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--c-gold)",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 10,
                    }}>
                        {language === "ru" ? "Что я предлагаю" : "What I Offer"}
                        <span style={{ flex: 1, height: 1, background: "var(--c-border)", display: "block" }} />
                    </div>
                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(30px, 4vw, 44px)",
                        letterSpacing: "-0.02em",
                        color: "var(--c-heading)",
                    }}>
                        {s.title}
                    </h2>
                </motion.div>

                {/* The alignment has to switch, because the two things this row needs
                    are incompatible in one mode.

                    Collapsed, the descriptions wrap to different line counts — in
                    Russian the first runs 128px against 77 — so start-alignment left
                    the row ragged and the three CTAs on three different lines. Stretch
                    fixes that (with the auto margin in ServiceCard lifting the slack
                    above the CTA).

                    Expanded, stretch is fatal: the card's height is then pinned to the
                    row, the panel inside resolves `1fr` against zero free space, and it
                    opens onto nothing. So the moment any card is open the row falls back
                    to start-alignment and the cards size to their content. */}
                <div className={`grid lg:grid-cols-3 gap-8 ${openCount > 0 ? "items-start" : "items-stretch"}`}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            {...service}
                            delay={index * 0.1}
                            onToggle={(open) => setOpenCount((n) => Math.max(0, n + (open ? 1 : -1)))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
