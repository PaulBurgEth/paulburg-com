"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import BurgMark from "@/components/BurgMark";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: language === "ru" ? "Блог" : "Blog", href: "/blog" },
        { name: language === "ru" ? "Менторство" : "Mentorship", href: "/mentorship" },
        { name: language === "ru" ? "Услуги" : "Services", href: "/services" },
    ];

    const isActiveLink = (href: string) => {
        if (href.startsWith("/#")) return false;
        return pathname === href;
    };

    const toggleLanguage = () => {
        setLanguage(language === 'ru' ? 'en' : 'ru');
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        } else if (href.startsWith('/#')) {
            if (pathname === '/') {
                e.preventDefault();
                const hash = href.replace('/', '');
                document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMobileMenuOpen(false);
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4`}
                style={isScrolled || isMobileMenuOpen
                    ? { background: "var(--c-bg)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--c-border)" }
                    : { background: "transparent" }
                }
            >
                <div className="container-custom flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-2xl font-serif font-bold tracking-tight leading-none transition-colors"
                        style={{ color: "var(--c-text)" }}
                    >
                        Paul<br /><BurgMark weight={1.2}>Burg</BurgMark>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`nav-link text-sm font-medium transition-colors${isActiveLink(link.href) ? " nav-active" : ""}`}
                                style={{ color: isActiveLink(link.href) ? "var(--c-gold)" : "var(--c-text2)" }}
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <ThemeToggle />

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 text-sm font-medium transition-colors uppercase"
                            style={{ color: "var(--c-text2)" }}
                        >
                            <Globe size={16} />
                            {language === 'ru' ? 'EN' : 'RU'}
                        </button>
                    </nav>

                    {/* Mobile: theme + lang toggle + hamburger */}
                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 text-sm font-medium uppercase"
                            style={{ color: "var(--c-text2)" }}
                        >
                            <Globe size={16} />
                            {language === 'ru' ? 'EN' : 'RU'}
                        </button>
                        <button
                            className="p-2"
                            style={{ color: "var(--c-text3)" }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[45] bg-black/50 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Side Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-[72px] right-0 bottom-0 w-[280px] sm:w-[320px] z-[49] flex flex-col pt-4 px-6 md:hidden"
                        style={{ background: "var(--c-bg)" }}
                    >
                        <button
                            className="absolute top-5 right-5 p-2"
                            style={{ color: "var(--c-text3)" }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Toggle menu"
                        >
                            <X size={24} />
                        </button>

                        <nav className="flex flex-col mt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center min-h-[48px] text-lg font-medium"
                                    style={{
                                        color: isActiveLink(link.href) ? "var(--c-gold)" : "var(--c-text)",
                                        borderBottom: "1px solid var(--c-border)",
                                    }}
                                    onClick={(e) => {
                                        if (link.href.startsWith("#")) {
                                            e.preventDefault();
                                            document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                                        } else if (link.href.startsWith("/#") && pathname === "/") {
                                            e.preventDefault();
                                            document.querySelector(link.href.replace("/", ""))?.scrollIntoView({ behavior: "smooth" });
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
