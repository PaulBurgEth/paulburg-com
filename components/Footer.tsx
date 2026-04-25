"use client";

import Link from "next/link";
import { Twitter, Mail, Send, Linkedin, BookOpen } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/constants";
import BurgMark from "@/components/BurgMark";

const linkClass = "flex items-center gap-2 transition-colors";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)", color: "var(--c-text2)" }}>
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--c-heading)", fontFamily: "var(--font-fraunces), serif" }}>
                            Paul <BurgMark weight={1}>Burg</BurgMark>
                        </Link>
                        <p className="text-sm mt-2" style={{ color: "var(--c-text3)" }}>
                            © {currentYear} Paul Burg. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <Link
                            href={TELEGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            <Send size={16} />
                            <span className="text-sm">Telegram</span>
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/paul-burg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            <Linkedin size={16} />
                            <span className="text-sm">LinkedIn</span>
                        </Link>

                        <Link
                            href="https://x.com/PaulBurg_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            <Twitter size={18} />
                            <span className="text-sm font-medium">@PaulBurg_</span>
                        </Link>

                        <Link
                            href="https://substack.com/@paulburg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            <BookOpen size={16} />
                            <span className="text-sm">Substack</span>
                        </Link>

                        <Link
                            href="https://t.me/nomadglobalview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            <span className="text-sm">Channel <span className="text-xs opacity-60">(RU)</span></span>
                        </Link>

                        <Link
                            href="mailto:office@paulburg.com"
                            className={linkClass}
                        >
                            <Mail size={16} />
                            <span className="text-sm">Email</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
