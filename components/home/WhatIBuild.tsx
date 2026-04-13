"use client";

import { motion } from "framer-motion";
import { Bot, Link, Building2 } from "lucide-react";

export default function WhatIBuild() {
    return (
        <section id="capabilities" className="py-24 scroll-mt-20">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-2"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#fafafa] mb-3 section-title-accent">
                        What I Build
                    </h2>
                    <p className="text-[#a1a1aa] text-base font-light">
                        Core capabilities and domains of expertise
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* AI Agents */}
                    <motion.div
                        className="bento-card group flex flex-col p-6 h-full cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500/40 to-blue-500/5" />
                        
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 mb-4">
                            <Bot size={20} className="text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                            AI Agents
                        </h3>
                        <p className="text-sm text-[#A1A1AA] leading-relaxed">
                            Designing and deploying autonomous agents that automate complex workflows and create scalable business value.
                        </p>
                    </motion.div>

                    {/* Web3 Products */}
                    <motion.div
                        className="bento-card group flex flex-col p-6 h-full cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500/40 to-blue-500/5" />
                        
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 mb-4">
                            <Link size={20} className="text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                            Web3 Infrastructure
                        </h3>
                        <p className="text-sm text-[#A1A1AA] leading-relaxed">
                            Building decentralized infrastructure, marketplaces, and ReFi solutions that merge blockchain technology with real-world assets.
                        </p>
                    </motion.div>

                    {/* Real Estate */}
                    <motion.div
                        className="bento-card group flex flex-col p-6 h-full cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 mb-4">
                            <Building2 size={20} className="text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                            Real Estate
                        </h3>
                        <p className="text-sm text-[#A1A1AA] leading-relaxed">
                            Developing ecosystems for digital nomads, bridging local property markets with global access.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
