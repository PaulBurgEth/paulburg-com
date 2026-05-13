"use client";

import Link from "next/link";
import { Twitter, Mail, Send, Linkedin, BookOpen } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/constants";
import BurgMark from "@/components/BurgMark";
import { useLanguage } from "@/context/LanguageContext";

const linkRowClass = "flex items-center gap-2 text-sm transition-colors";

export default function Footer() {
    const { language } = useLanguage();
    const currentYear = new Date().getFullYear();

    const t = {
        tagline: language === "ru"
            ? "Строю AI-системы из Дананга."
            : "Building AI-powered systems from Da Nang.",
        copyright: language === "ru"
            ? `© ${currentYear} Paul Burg. Все права защищены.`
            : `© ${currentYear} Paul Burg. All rights reserved.`,
        pagesHeading: language === "ru" ? "Страницы" : "Pages",
        connectHeading: language === "ru" ? "Контакты" : "Connect",
        services: language === "ru" ? "Услуги" : "Services",
        mentorship: language === "ru" ? "Менторство" : "Mentorship",
        blog: language === "ru" ? "Блог" : "Blog",
        projects: language === "ru" ? "Проекты" : "Projects",
        channelLabel: language === "ru" ? "Канал" : "Channel",
    };

    const eyebrowStyle: React.CSSProperties = {
        fontFamily: "var(--font-inconsolata), monospace",
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--c-text2)",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
    };

    return (
        <footer
            style={{
                background: "var(--c-bg)",
                borderTop: "1px solid var(--c-border)",
                color: "var(--c-text2)",
                paddingTop: 56,
                paddingBottom: 40,
            }}
        >
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left — Brand + tagline */}
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-serif font-bold tracking-tight inline-flex items-baseline gap-1"
                            style={{
                                color: "var(--c-heading)",
                                fontFamily: "var(--font-fraunces), serif",
                                textDecoration: "none",
                            }}
                        >
                            Paul <BurgMark weight={1.2}>Burg</BurgMark>
                            <span
                                className="pb-cursor-blink"
                                aria-hidden="true"
                                style={{
                                    display: "inline-block",
                                    width: 3,
                                    height: 16,
                                    marginLeft: 6,
                                    background: "var(--c-gold)",
                                    boxShadow: "0 0 14px rgba(200,169,110,0.5)",
                                    verticalAlign: "middle",
                                }}
                            />
                        </Link>

                        <p
                            style={{
                                marginTop: 14,
                                fontFamily: "var(--font-newsreader), serif",
                                fontStyle: "italic",
                                fontSize: 15,
                                lineHeight: 1.55,
                                color: "var(--c-text2)",
                                maxWidth: 280,
                            }}
                        >
                            {t.tagline}
                        </p>

                        <p
                            style={{
                                marginTop: 18,
                                fontSize: 12,
                                color: "var(--c-text3)",
                            }}
                        >
                            {t.copyright}
                        </p>
                    </div>

                    {/* Middle — Pages */}
                    <div>
                        <div style={eyebrowStyle} aria-hidden="true">
                            <span style={{ width: 24, height: 1, background: "var(--c-gold)", display: "inline-block" }} />
                            {t.pagesHeading}
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href="/services" className={linkRowClass} style={{ color: "var(--c-text2)" }}>
                                    {t.services}
                                </Link>
                            </li>
                            <li>
                                <Link href="/mentorship" className={linkRowClass} style={{ color: "var(--c-text2)" }}>
                                    {t.mentorship}
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className={linkRowClass} style={{ color: "var(--c-text2)" }}>
                                    {t.blog}
                                </Link>
                            </li>
                            <li>
                                <Link href="/#projects" className={linkRowClass} style={{ color: "var(--c-text2)" }}>
                                    {t.projects}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right — Connect */}
                    <div>
                        <div style={eyebrowStyle} aria-hidden="true">
                            <span style={{ width: 24, height: 1, background: "var(--c-gold)", display: "inline-block" }} />
                            {t.connectHeading}
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link
                                    href={TELEGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkRowClass}
                                    style={{ color: "var(--c-text2)" }}
                                >
                                    <Send size={14} />
                                    <span>Telegram</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/paul-burg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkRowClass}
                                    style={{ color: "var(--c-text2)" }}
                                >
                                    <Linkedin size={14} />
                                    <span>LinkedIn</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://x.com/PaulBurg_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkRowClass}
                                    style={{ color: "var(--c-text2)" }}
                                >
                                    <Twitter size={14} />
                                    <span>@PaulBurg_</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://substack.com/@paulburg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkRowClass}
                                    style={{ color: "var(--c-text2)" }}
                                >
                                    <BookOpen size={14} />
                                    <span>Substack</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://t.me/nomadglobalview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkRowClass}
                                    style={{ color: "var(--c-text2)" }}
                                >
                                    <Send size={14} />
                                    <span>{t.channelLabel} <span className="opacity-60" style={{ fontSize: 11 }}>(RU)</span></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="mailto:office@paulburg.com"
                                    className={linkRowClass}
                                    style={{ color: "var(--c-text2)" }}
                                >
                                    <Mail size={14} />
                                    <span>Email</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
