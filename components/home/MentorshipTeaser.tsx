"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MentorshipTeaser() {
    return (
        <section className="py-32 md:py-40">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 border-t border-b border-[#27272a]"
                >
                    <div>
                        <p className="text-[11px] font-medium text-[#71717a] uppercase tracking-wider mb-2">
                            Mentorship
                        </p>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-[#fafafa]">
                            Capital · Business · Communication
                        </h3>
                        <p className="text-sm text-[#71717a] mt-2 max-w-lg">
                            Tailored 1-on-1 sessions for digital nomads and entrepreneurs.
                            Investment strategies, idea packaging, and English practice.
                        </p>
                    </div>

                    <Link
                        href="/mentorship"
                        className="group flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] text-sm font-medium transition-colors flex-shrink-0"
                    >
                        Learn more
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
