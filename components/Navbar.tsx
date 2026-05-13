"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import BurgMark from "@/components/BurgMark";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    // Order matches the redesign mockup: Services → Mentorship → Blog → Projects.
    const navLinks = [
        { name: language === "ru" ? "Услуги" : "Services", href: "/services" },
        { name: language === "ru" ? "Менторство" : "Mentorship", href: "/mentorship" },
        { name: language === "ru" ? "Блог" : "Blog", href: "/blog" },
        { name: language === "ru" ? "Проекты" : "Projects", href: "/#projects" },
    ];

    const isActiveLink = (href: string) => {
        if (href.startsWith("/#")) return false;
        return pathname === href;
    };

    const toggleLanguage = () => {
        setLanguage(language === "ru" ? "en" : "ru");
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            const hash = href.slice(1); // "#projects"
            if (pathname === "/") {
                e.preventDefault();
                document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
            } else {
                // Off-home: let Next navigate to "/", then scroll after mount.
                e.preventDefault();
                router.push(href);
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: isScrolled || isMobileMenuOpen ? "rgba(7,8,10,0.78)" : "transparent",
                    backdropFilter: isScrolled || isMobileMenuOpen ? "saturate(140%) blur(14px)" : "none",
                    WebkitBackdropFilter: isScrolled || isMobileMenuOpen ? "saturate(140%) blur(14px)" : "none",
                    borderBottom: `1px solid ${isScrolled || isMobileMenuOpen ? "var(--c-border)" : "transparent"}`,
                }}
            >
                <div
                    className="mx-auto flex items-center justify-between"
                    style={{ maxWidth: 940, padding: "16px 28px" }}
                >
                    <Link
                        href="/"
                        className="font-serif font-bold leading-none transition-colors inline-flex items-baseline gap-1"
                        style={{
                            color: "var(--c-text)",
                            fontFamily: "var(--font-fraunces), serif",
                            fontSize: 18,
                            letterSpacing: "-0.01em",
                            textDecoration: "none",
                        }}
                    >
                        Paul <BurgMark weight={1.1}>Burg</BurgMark>
                    </Link>

                    {/* Desktop nav */}
                    <nav
                        className="hidden md:flex items-center"
                        style={{ gap: 26, fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`nav-link transition-colors${isActiveLink(link.href) ? " nav-active" : ""}`}
                                style={{
                                    color: isActiveLink(link.href) ? "var(--c-gold)" : "var(--c-text2)",
                                    textDecoration: "none",
                                }}
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Vertical 1px separator */}
                        <span
                            aria-hidden="true"
                            style={{
                                width: 1,
                                height: 14,
                                background: "var(--c-border2)",
                                display: "inline-block",
                            }}
                        />

                        {/* Mono language toggle */}
                        <button
                            onClick={toggleLanguage}
                            aria-label={language === "ru" ? "Switch to English" : "Переключить на русский"}
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--c-text2)",
                                fontFamily: "var(--font-inconsolata), monospace",
                                fontSize: 11,
                                letterSpacing: "0.1em",
                                padding: 0,
                            }}
                        >
                            {language === "ru" ? "EN" : "RU"}
                        </button>

                        {/* Theme toggle — round 26px button per mockup */}
                        <span
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                border: "1px solid var(--c-border2)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ThemeToggle />
                        </span>
                    </nav>

                    {/* Mobile: theme + lang toggle + hamburger */}
                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={toggleLanguage}
                            className="font-medium uppercase"
                            style={{
                                color: "var(--c-text2)",
                                fontFamily: "var(--font-inconsolata), monospace",
                                fontSize: 11,
                                letterSpacing: "0.1em",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                            aria-label={language === "ru" ? "Switch to English" : "Переключить на русский"}
                        >
                            {language === "ru" ? "EN" : "RU"}
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

            {/* Side drawer */}
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
                                    onClick={(e) => handleNavClick(e, link.href)}
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
