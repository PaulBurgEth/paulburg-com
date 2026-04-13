"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const articles = [
    {
        title: "Taking Notes on the Development of a Global Impact Market",
        publisher: "EcoSynthesisX",
        link: "https://paragraph.com/@ecosynthesisx-2/taking-notes-on-the-development-of-a-global-impact-market",
    },
    {
        title: "Clean Phangan Impact Product: Converting Cleanups into Capital",
        publisher: "EcoSynthesisX",
        link: "https://paragraph.com/@ecosynthesisx-2/clean-phangan-impact-product-converting-cleanups-into-capital",
    },
    {
        title: "EcoSynthesisX: From Crisis to Innovation",
        publisher: "Paul Burg",
        link: "https://paragraph.com/@paulburg/ecosynthesisx-from-crisis-to-innovation",
    },
];

export default function WritingSection() {
    return (
        <section id="writing" className="py-24 scroll-mt-20">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#fafafa] mb-1 section-title-accent block">
                        Writing
                    </h2>
                    <p className="text-[#a1a1aa] text-base font-light">
                        Articles on impact markets, Web3 for good, and building in public
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bento-card group flex flex-col p-6 cursor-pointer h-full min-h-[220px] hover:border-l-4 hover:border-l-[#2dd4bf]"
                        >
                            <Link
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-10"
                            >
                                <span className="sr-only">Read {article.title}</span>
                            </Link>

                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen size={16} className="text-zinc-500" />
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                                    {article.publisher}
                                </span>
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors leading-snug">
                                {article.title}
                            </h3>

                            <div className="mt-auto flex items-center text-[#2dd4bf] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                <span className="text-sm font-semibold mr-1">Read Article</span>
                                <ArrowUpRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
