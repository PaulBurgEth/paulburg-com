"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CALENDLY_URL } from "@/lib/constants";

interface ServiceProps {
    title: string;
    description: string;
    lists: {
        howItWorks: string[];
        whatYouGet: string[];
        whoIsThisFor: string[];
    };
    prices: string[];
    buttonText: string;
    delay?: number;
    color: string;
}

export default function ServiceCard({ title, description, lists, prices, buttonText, delay = 0 }: ServiceProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t, language } = useLanguage();
    const s = t.mentorship.services;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -3, boxShadow: "0 10px 36px rgba(0,0,0,0.3)", borderColor: "rgba(200,169,110,0.22)" }}
            className="flex flex-col overflow-hidden relative cursor-pointer"
            style={{
                background: "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderRadius: 10,
            }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="p-8 flex flex-col items-center text-center">
                <h3
                    className="mb-5 flex items-center justify-center"
                    style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontWeight: 700,
                        fontSize: 20,
                        color: "var(--c-gold)",
                        minHeight: 56,
                    }}
                >
                    {title}
                </h3>

                <p
                    className="mb-6"
                    style={{
                        fontFamily: "var(--font-instrument-sans), sans-serif",
                        fontSize: 14,
                        color: "var(--c-body)",
                        lineHeight: 1.6,
                        minHeight: 64,
                    }}
                >
                    {description}
                </p>

                <div className="w-full">
                    <div
                        className="mb-6 pt-5 text-left"
                        style={{ borderTop: "1px solid var(--c-border)" }}
                    >
                        <h4
                            className="mb-3 uppercase"
                            style={{
                                fontFamily: "var(--font-inconsolata), monospace",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                color: "var(--c-muted)",
                            }}
                        >{s.priceTitle}</h4>
                        <div className="space-y-1">
                            {prices.map((price, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        fontFamily: "var(--font-instrument-sans), sans-serif",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        color: "var(--c-text)",
                                    }}
                                >
                                    {price}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            document.querySelector('#start')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-3 rounded-[5px] font-bold transition-all mb-2"
                        style={{
                            background: "var(--c-gold)",
                            color: "var(--c-bg)",
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontWeight: 600,
                            fontSize: 13,
                            letterSpacing: "0.04em",
                        }}
                    >
                        {buttonText}
                    </button>

                    <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3 rounded-[5px] text-center transition-all mb-5 block"
                        style={{
                            background: "transparent",
                            color: "var(--c-gold)",
                            border: "1px solid var(--c-gold)",
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontWeight: 600,
                            fontSize: 13,
                            letterSpacing: "0.04em",
                            textDecoration: "none",
                        }}
                    >
                        {language === "ru" ? "Записаться на звонок →" : "Book a free call →"}
                    </a>

                    <div
                        className="flex items-center justify-center gap-2 font-medium transition-colors"
                        style={{ color: "var(--c-muted)", fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13 }}
                    >
                        <span>{s.more}</span>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown size={18} />
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full overflow-hidden text-left pt-6 space-y-6"
                        >
                            {[
                                { heading: s.howTitle, items: lists.howItWorks },
                                { heading: s.getTitle, items: lists.whatYouGet },
                                { heading: s.forTitle, items: lists.whoIsThisFor },
                            ].map((section, sIdx) => (
                                <div key={sIdx}>
                                    <h4
                                        className="mb-3"
                                        style={{
                                            fontFamily: "var(--font-inconsolata), monospace",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color: "var(--c-text)",
                                        }}
                                    >{section.heading}</h4>
                                    <ul className="space-y-2">
                                        {section.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "var(--c-gold)" }} />
                                                <span
                                                    style={{
                                                        fontFamily: "var(--font-instrument-sans), sans-serif",
                                                        fontSize: 13,
                                                        color: "var(--c-body)",
                                                        lineHeight: 1.5,
                                                    }}
                                                >{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {!isExpanded && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                    style={{ background: "linear-gradient(to top, var(--c-card), transparent)" }}
                />
            )}
        </motion.div>
    );
}
