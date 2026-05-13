"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mic, Video, ArrowUpRight } from "lucide-react";

const media = [
    {
        title: "Crypto Altruism Podcast Ep. 138 — ReFi Phangan: Regenerative Finance, Quadratic Funding, and Local Impact",
        link: "https://www.cryptoaltruism.org/blog/crypto-altruism-podcast-episode-138-refi-phangan-regenerative-finance-quadratic-funding-and-local-impact",
        type: "audio" as const,
    },
    {
        title: "Crypto Altruism Podcast Ep. 201 — Web3 Localism for Global Climate Action",
        link: "https://www.cryptoaltruists.com/blog/crypto-altruists-episode-201-web3-localism-for-global-climate-action-from-decentralized-cleanups-to-regenerative-local-economies",
        type: "audio" as const,
    },
    {
        title: "Impact Products & Impact Marketplace — Paul Burg @ Regen Hub Devcon 7 SEA Bangkok",
        link: "https://youtu.be/40KkjjSW3C8?si=UyItTaLZgIbQm8YM",
        type: "video" as const,
    },
    {
        title: "Super dApp Builders EP01 — Paul Burg from DeCleanup Network",
        link: "https://youtu.be/zVgZX1Nj48E?si=UGF09-fS0DVuJTCb",
        type: "video" as const,
    },
];

export default function MediaSection() {
    return (
        <section id="media" className="py-32 md:py-40 scroll-mt-20">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-2"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#fafafa] mb-3">
                        Podcasts & Talks
                    </h2>
                    <p className="text-[#71717a] text-base font-light">
                        Conversations on ReFi, impact markets, and building in public
                    </p>
                </motion.div>

                {/* Minimalist list */}
                <div className="mt-8">
                    {media.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="media-list-item group"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {item.type === "video" ? (
                                        <Video size={16} className="text-[#71717a] flex-shrink-0" />
                                    ) : (
                                        <Mic size={16} className="text-[#71717a] flex-shrink-0" />
                                    )}
                                    <span className="text-sm md:text-base text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors truncate">
                                        {item.title}
                                    </span>
                                </div>
                                <ArrowUpRight size={16} className="media-arrow text-[#71717a]" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
