"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
    /** Lets the row know a card opened, so the grid can stop stretching. */
    onToggle?: (isExpanded: boolean) => void;
}

export default function ServiceCard({ title, description, lists, prices, buttonText, delay = 0, onToggle }: ServiceProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [panelHeight, setPanelHeight] = useState(0);
    const panelRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();
    const s = t.mentorship.services;

    // Measured in the handler: refs must not be read during render, and an
    // effect that only calls setState is the other thing to avoid. scrollHeight
    // is the full content height even while max-height holds the panel at 0.
    const toggle = () => {
        const next = !isExpanded;
        setPanelHeight(next ? panelRef.current?.scrollHeight ?? 0 : 0);
        setIsExpanded(next);
        onToggle?.(next);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -3, boxShadow: "0 10px 36px rgba(0,0,0,0.3)", borderColor: "rgba(200,169,110,0.22)" }}
            className="flex flex-col overflow-hidden relative cursor-pointer"
            style={{
                background: "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderRadius: 10,
            }}
            onClick={toggle}
        >
            <div className="p-8 flex flex-col items-center text-center flex-1 w-full">
                <h3
                    className="mb-5 flex items-center justify-center"
                    style={{
                        fontFamily: "var(--font-display)",
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
                        fontSize: 16,
                        color: "var(--c-body)",
                        lineHeight: 1.6,
                        minHeight: 64,
                    }}
                >
                    {description}
                </p>

                {/* mt-auto rather than flex-1 on the description above. An auto margin
                    soaks up the leftover height so the price block and CTA sit on a
                    common line across the row, but it collapses to zero the moment the
                    card is expanded — flex-1 kept its claim on the space instead and
                    squeezed the panel that opens below down to its padding. */}
                <div className="w-full mt-auto">
                    <div
                        className="mb-6 pt-5 text-left"
                        style={{ borderTop: "1px solid var(--c-border)" }}
                    >
                        <h4
                            className="mb-3 uppercase"
                            style={{
                                fontFamily: "var(--font-inconsolata), monospace",
                                fontSize: 14,
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
                                        fontSize: 16,
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
                        className="w-full py-3 rounded-[5px] font-bold transition-all mb-5"
                        style={{
                            background: "var(--c-gold)",
                            color: "var(--c-on-gold)",
                            fontFamily: "var(--font-instrument-sans), sans-serif",
                            fontWeight: 600,
                            fontSize: 16,
                            letterSpacing: "0.04em",
                        }}
                    >
                        {buttonText}
                    </button>

                    <div
                        className="flex items-center justify-center gap-2 font-medium transition-colors"
                        style={{ color: "var(--c-muted)", fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 16 }}
                    >
                        <span>{s.more}</span>
                        {/* CSS for the same reason as the panel: the framer rotate wrote
                            no inline style in production, so the chevron never turned. */}
                        <div
                            className="transition-transform duration-300"
                            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </div>

                {/* CSS, not framer. The old panel animated height 0 → "auto" through
                    framer, and in production that animation never ran: the element sat
                    at its initial `height: 0px` for good, so "Узнать больше" opened onto
                    nothing and all three detail sections — 755px of the actual offer —
                    were unreachable.

                    max-height off the measured scrollHeight rather than the usual
                    grid-template-rows 0fr → 1fr trick: this panel is a flex child inside
                    a flex column, and there `1fr` resolved against zero free space and
                    computed to 0px, which is the same failure in a new costume. A
                    measured pixel value has no such dependency. shrink-0 because flex
                    children shrink by default. */}
                <div
                    ref={panelRef}
                    className="w-full shrink-0 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    style={{ maxHeight: panelHeight }}
                    aria-hidden={!isExpanded}
                >
                    <div className="text-left">
                        <div className="pt-6 space-y-6">
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
                                            fontSize: 14,
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
                                                        fontSize: 16,
                                                        color: "var(--c-body)",
                                                        lineHeight: 1.5,
                                                    }}
                                                >{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
