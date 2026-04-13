"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Leaf,
    Store,
    Recycle,
    ShieldCheck,
    Home,
    Compass,
} from "lucide-react";

// Project data with new layout spans
const projects = [
    {
        id: "ecosynthesisx",
        name: "EcoSynthesisX",
        description: "A Web3 public good studio pioneering the tokenization of real-world impact.",
        url: "https://ecosynthesisx.com",
        icon: Leaf,
        status: "Active",
        className: "col-span-1 md:col-span-2 row-span-1",
        largeTypo: true
    },
    {
        id: "regenbazaar",
        name: "Regen Bazaar",
        description: "Decentralized marketplace for tokenized public goods.",
        url: "https://regenbazaar.com",
        icon: Store,
        status: "Active",
        tags: ["EcoThailand", "Clean Phangan"],
        className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2"
    },
    {
        id: "decleanup",
        name: "DeCleanup",
        description: "Web3 dApp converting physical cleanups into capital.",
        url: "https://decleanup.net",
        icon: Recycle,
        status: "Active",
        className: "col-span-1 row-span-1"
    },
    {
        id: "helprent",
        name: "HelpRent Phangan",
        description: "Real estate ecosystem for digital nomads — long-term rentals, tours, and local guides.",
        url: "https://helprentphangan.com",
        icon: Home,
        status: "In Development",
        className: "col-span-1 row-span-1"
    },
    {
        id: "vitacrypt",
        name: "VitaCrypt",
        description: "Personal health intelligence with Fully Homomorphic Encryption.",
        url: "https://vitacrypt.xyz",
        icon: ShieldCheck,
        status: "In Development",
        className: "col-span-1 md:col-span-2 row-span-1",
        horizontal: true
    },
    {
        id: "guidephangan",
        name: "Guide Phangan",
        description: "Authentic local guide for nomads and expats navigating island life.",
        url: "https://guidephngan.com",
        icon: Compass,
        status: "In Development",
        className: "col-span-1 row-span-1"
    },
];

export default function ProjectsGrid() {
    return (
        <section id="projects" className="py-24 scroll-mt-20">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#fafafa] mb-1 section-title-accent block">
                        Projects
                    </h2>
                    <p className="text-[#A1A1AA] text-base font-light">
                        Startups and initiatives I&apos;m building
                    </p>
                </motion.div>

                {/* Ecosystem Label */}
                <div className="mb-6 mt-12">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-widest border-l-[1px] border-teal-400 pl-3 py-1">
                        Impact & Public Goods Ecosystem
                    </span>
                </div>

                {/* True Asymmetrical Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
                    {projects.slice(0, 4).map((project, index) => {
                        const Icon = project.icon;
                        
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`bento-card group flex flex-col p-6 cursor-pointer ${project.className}`}
                            >
                                <Link href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                                    <span className="sr-only">Visit {project.name}</span>
                                </Link>

                                <div className={`flex items-start justify-between ${project.largeTypo ? 'mb-4' : 'mb-auto'}`}>
                                    <div className="flex items-center justify-center p-2 rounded-xl bg-white/5">
                                        <Icon size={project.largeTypo ? 28 : 20} className="text-zinc-300" />
                                    </div>
                                    <span className={`status-badge ${project.status === 'Active' ? 'status-active' : 'status-dev'}`}>
                                        {project.status === 'In Development' ? 'Dev' : project.status}
                                    </span>
                                </div>

                                <div className={`mt-auto ${project.className.includes('row-span-2') ? 'flex flex-col h-full justify-end' : ''}`}>
                                    {project.tags && (
                                        <div className="flex flex-col gap-2 mb-3">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <h3 className={`${project.largeTypo ? 'text-2xl' : 'text-lg'} font-bold text-white mb-2 group-hover:text-[#2dd4bf] transition-colors`}>
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-[#A1A1AA] line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Second Ecosystem Label */}
                <div className="mb-6 mt-12">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-widest border-l-[1px] border-teal-400 pl-3 py-1">
                        Web3 & Additional Projects
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
                    {projects.slice(4).map((project, index) => {
                        const Icon = project.icon;
                        
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`bento-card group flex p-6 cursor-pointer ${project.horizontal ? 'flex-row items-center gap-6' : 'flex-col'} ${project.className}`}
                            >
                                <Link href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                                    <span className="sr-only">Visit {project.name}</span>
                                </Link>

                                {project.horizontal ? (
                                    <>
                                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 h-24 w-24 shrink-0">
                                            <Icon size={32} className="text-zinc-300 mb-2" />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                             <div className="flex justify-between items-start w-full mb-1">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#2dd4bf] transition-colors">
                                                    {project.name}
                                                </h3>
                                                <span className={`status-badge shrink-0 status-dev`}>
                                                    Dev
                                                </span>
                                             </div>
                                            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
                                                {project.description}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={`flex items-start justify-between mb-auto`}>
                                            <div className="flex items-center justify-center p-2 rounded-xl bg-white/5">
                                                <Icon size={20} className="text-zinc-300" />
                                            </div>
                                            <span className={`status-badge ${project.status === 'Active' ? 'status-active' : 'status-dev'}`}>
                                                {project.status === 'In Development' ? 'Dev' : project.status}
                                            </span>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2dd4bf] transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-sm text-[#A1A1AA] line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
