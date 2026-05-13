"use client";

import { motion } from "framer-motion";
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
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
                        {h1Head}<BurgMark weight={1.2}>{h1Tail}</BurgMark>
                        <span
                            className="pb-cursor-blink"
                            aria-hidden="true"
                            style={{
                                display: "inline-block",
                                width: 5,
                                height: 48,
                                marginLeft: 10,
                                background: "var(--c-gold)",
                                boxShadow: "0 0 14px rgba(200,169,110,0.5)",
                                verticalAlign: "middle",
                            }}
                        />
                    </h1>

                    <p
                        className="mb-12 max-w-4xl leading-relaxed"
                        style={{
                            fontFamily: "var(--font-newsreader), serif",
                            fontStyle: "italic",
                            fontSize: 21,
                            color: "var(--c-body-lede)",
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
                                fontFamily: "var(--font-inconsolata), monospace",
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
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
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
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
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
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
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
                        </motion.div>
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
                </motion.div>
            </div>
        </section>
    );
}
