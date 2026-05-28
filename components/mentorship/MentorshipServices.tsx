"use client";

import { useLanguage } from "@/context/LanguageContext";
import ServiceCard from "@/components/ServiceCard";

export default function MentorshipServices() {
    const { language, t } = useLanguage();
    const s = t.mentorship.services;

    const services = [
        { ...s.card1, color: "var(--c-gold)", buttonText: s.card1.button },
        { ...s.card2, color: "var(--c-gold)", buttonText: s.card2.button },
        { ...s.card3, color: "var(--c-gold)", buttonText: s.card3.button },
    ];

    return (
        <section id="services" className="scroll-mt-20" style={{ background: "var(--c-bg)", padding: "72px 0", position: "relative" }}>
            <div className="container-custom">
                <div style={{ marginBottom: 48 }}>
                    <div style={{
                        fontFamily: "var(--font-instrument-sans), sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--c-muted)",
                        marginBottom: 10,
                    }}>
                        {language === "ru" ? "Что я предлагаю" : "What I Offer"}
                    </div>
                    <h2 style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontWeight: 700,
                        fontSize: "clamp(26px, 4vw, 38px)",
                        letterSpacing: "-0.02em",
                        color: "var(--c-heading)",
                    }}>
                        {s.title}
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
