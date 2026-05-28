"use client";

import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMentorshipModal } from "@/context/MentorshipModalContext";
import { WHATSAPP_URL, TELEGRAM_URL } from "@/lib/constants";
import BurgMark from "@/components/BurgMark";

export default function MentorshipHero() {
    const { t } = useLanguage();
    const { open } = useMentorshipModal();
    const h = t.mentorship.hero;
    const h1Match = h.headline.match(/^(.*\s)(\S+)$/);
    const h1Head = h1Match ? h1Match[1] : h.headline;
    const h1Tail = h1Match ? h1Match[2] : "";

    return (
        <section
            className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-20"
            style={{ background: "var(--c-bg)" }}
        >
            <div className="container-custom relative z-10 text-center">
                <div className="flex flex-col items-center">
                    <h1
                        className="mb-6 leading-tight"
                        style={{
                            fontFamily: "var(--font-fraunces), serif",
                            fontWeight: 700,
                            fontSize: "clamp(36px, 7vw, 72px)",
                            letterSpacing: "-0.02em",
                            color: "var(--c-heading)",
                        }}
                    >
                        {h1Head}<BurgMark>{h1Tail}</BurgMark>
                    </h1>

                    <p
                        className="mb-12 max-w-4xl leading-relaxed"
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontSize: 18,
                            color: "var(--c-text)",
                            lineHeight: 1.6,
                        }}
                    >
                        {h.subheadline}
                    </p>

                    <div
                        className="py-2.5 px-8 rounded-full mb-16 inline-block"
                        style={{
                            background: "rgba(200,169,110,0.08)",
                            border: "1px solid rgba(200,169,110,0.2)",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "var(--font-instrument-sans), sans-serif",
                                fontWeight: 600,
                                fontSize: 13,
                                letterSpacing: "0.08em",
                                color: "var(--c-gold)",
                            }}
                        >
                            {h.pills}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full justify-center">
                        <div className="w-full sm:w-auto">
                            <Link
                                href={TELEGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full sm:w-auto"
                                style={{
                                    background: "var(--c-card)",
                                    border: "1px solid var(--c-border)",
                                    color: "var(--c-text)",
                                    fontFamily: "var(--font-instrument-sans), sans-serif",
                                    fontWeight: 700,
                                    fontSize: 18,
                                    padding: "18px 40px",
                                    borderRadius: 999,
                                    textDecoration: "none",
                                }}
                            >
                                <MessageCircle className="w-5 h-5" style={{ color: "#2AABEE" }} />
                                {h.ctaTelegram}
                            </Link>
                        </div>

                        <div className="w-full sm:w-auto">
                            <Link
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full sm:w-auto"
                                style={{
                                    background: "var(--c-card)",
                                    border: "1px solid var(--c-border)",
                                    color: "var(--c-text)",
                                    fontFamily: "var(--font-instrument-sans), sans-serif",
                                    fontWeight: 700,
                                    fontSize: 18,
                                    padding: "18px 40px",
                                    borderRadius: 999,
                                    textDecoration: "none",
                                }}
                            >
                                <MessageCircle className="w-5 h-5" style={{ color: "#25D366" }} />
                                {h.ctaWhatsApp}
                            </Link>
                        </div>

                        <div className="w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={open}
                                className="flex items-center justify-center gap-3 w-full sm:w-auto"
                                style={{
                                    background: "transparent",
                                    border: "1px solid var(--c-gold)",
                                    color: "var(--c-text)",
                                    fontFamily: "var(--font-instrument-sans), sans-serif",
                                    fontWeight: 700,
                                    fontSize: 18,
                                    padding: "18px 40px",
                                    borderRadius: 999,
                                    cursor: "pointer",
                                }}
                            >
                                <Sparkles className="w-5 h-5" />
                                {h.ctaBook}
                            </button>
                        </div>
                    </div>

                    <p
                        style={{
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontSize: 14,
                            color: "var(--c-text2)",
                            letterSpacing: "0.02em",
                        }}
                    >
                        {h.smallText}
                    </p>
                </div>
            </div>
        </section>
    );
}
