"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import type { ReactNode } from "react";

interface Frontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
}

interface Props {
  slug: string;
  lang: "en" | "ru";
  frontmatter: Frontmatter;
  children: ReactNode;
}

function formatDate(dateStr: string, lang: "en" | "ru"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const ghostButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  border: "1px solid var(--c-border)",
  borderRadius: "8px",
  color: "var(--c-text)",
  fontFamily: "var(--font-instrument-sans), sans-serif",
  fontSize: "14px",
  textDecoration: "none",
  transition: "border-color 0.2s, color 0.2s",
  display: "inline-block",
};

export default function ArticlePageClient({
  slug,
  lang,
  frontmatter,
  children,
}: Props) {
  const { language } = useLanguage();
  const router = useRouter();
  const backLinkRef = useRef<HTMLAnchorElement>(null);

  // Sync language context with URL param
  useEffect(() => {
    if (language !== lang) {
      router.replace(`/blog/${slug}?lang=${language}`);
    }
  }, [language, lang, slug, router]);

  const backLabel = lang === "ru" ? "← Все заметки" : "← Blog";
  const ctaLabel = lang === "ru" ? "Хотите что-то подобное?" : "Want to build something like this?";

  return (
    <main style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Article header */}
        <section style={{ paddingTop: 96, paddingBottom: 40, background: "var(--c-bg)" }}>
          <div className="container-custom" style={{ maxWidth: 680 }}>
            <Link
              href="/blog"
              ref={backLinkRef}
              style={{
                fontFamily: "var(--font-inconsolata), monospace",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--c-muted)",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: 40,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--c-gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--c-muted)";
              }}
            >
              {backLabel}
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--c-gold)",
                  border: "1px solid rgba(200,169,110,0.3)",
                  borderRadius: 4,
                  padding: "4px 10px",
                }}
              >
                {frontmatter.tags.join(" · ")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 11,
                  color: "var(--c-muted)",
                }}
              >
                {frontmatter.readingTime}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 42px)",
                letterSpacing: "-0.02em",
                color: "var(--c-heading)",
                lineHeight: 1.2,
                margin: "16px 0 12px",
              }}
            >
              {frontmatter.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-inconsolata), monospace",
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "var(--c-muted)",
                textTransform: "uppercase",
                marginBottom: 0,
              }}
            >
              {formatDate(frontmatter.date, lang)}
            </p>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid var(--c-border)",
                margin: "32px 0",
              }}
            />
          </div>
        </section>

        {/* Article body */}
        <section style={{ paddingBottom: 80, background: "var(--c-bg)" }}>
          <div
            className="container-custom prose-blog"
            style={{ maxWidth: 680 }}
          >
            {children}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ paddingBottom: 80, background: "var(--c-bg)" }}>
          <div className="container-custom" style={{ maxWidth: 680 }}>
            <div
              style={{
                paddingTop: 40,
                borderTop: "1px solid var(--c-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--c-muted)",
                  marginBottom: 16,
                }}
              >
                {ctaLabel}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="https://t.me/paul_burg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={ghostButtonStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--c-gold)";
                    (e.currentTarget as HTMLElement).style.color = "var(--c-gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--c-text)";
                  }}
                >
                  Text me on Telegram
                </a>
                <a
                  href="https://calendly.com/paul_burg/15-minutes-free-call-clone"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={ghostButtonStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--c-gold)";
                    (e.currentTarget as HTMLElement).style.color = "var(--c-gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--c-text)";
                  }}
                >
                  Book a free call
                </a>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <style>{`
        .prose-blog {
          font-family: var(--font-instrument-sans), sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: var(--c-text2);
        }
        .prose-blog p {
          margin: 0 0 24px;
        }
        .prose-blog > p:first-of-type {
          font-size: 19px !important;
          color: var(--c-text3);
          line-height: 1.7;
        }
        .prose-blog h1 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 26px;
          color: var(--c-heading);
          margin: 48px 0 16px;
          line-height: 1.3;
        }
        .prose-blog h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: clamp(20px, 2.5vw, 24px);
          letter-spacing: -0.01em;
          color: var(--c-heading);
          margin: 48px 0 16px;
          line-height: 1.3;
        }
        .prose-blog h3 {
          font-family: var(--font-instrument-sans), sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: var(--c-gold);
          margin: 32px 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .prose-blog ul {
          list-style: none;
          padding-left: 0;
          margin: 0 0 24px;
        }
        .prose-blog ul li {
          padding: 6px 0 6px 20px;
          position: relative;
          color: var(--c-text2);
        }
        .prose-blog ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--c-gold);
        }
        .prose-blog ol {
          margin: 0 0 24px;
          padding-left: 24px;
          color: var(--c-text2);
        }
        .prose-blog ol li {
          padding: 4px 0;
        }
        .prose-blog ol li::marker {
          color: var(--c-gold);
        }
        .prose-blog blockquote {
          border-left: 2px solid var(--c-gold);
          margin: 32px 0;
          padding: 4px 0 4px 24px;
          color: var(--c-text2);
          font-style: italic;
          font-size: 18px;
        }
        .prose-blog code {
          font-family: var(--font-inconsolata), monospace;
          font-size: 14px;
          background: var(--c-card);
          border: 1px solid var(--c-border);
          border-radius: 4px;
          padding: 2px 6px;
          color: var(--c-gold);
        }
        .prose-blog pre {
          background: var(--c-card);
          border: 1px solid var(--c-border);
          border-radius: 8px;
          padding: 20px 24px;
          overflow-x: auto;
          margin: 0 0 24px;
        }
        .prose-blog pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 14px;
          color: var(--c-text);
        }
        .prose-blog strong {
          color: var(--c-text);
          font-weight: 600;
        }
        .prose-blog a {
          color: var(--c-gold);
          text-decoration: underline;
          text-decoration-color: var(--c-gold-glow);
          transition: text-decoration-color 0.2s;
        }
        .prose-blog a:hover {
          text-decoration-color: var(--c-gold);
        }
        @media (max-width: 640px) {
          .prose-blog {
            font-size: 16px;
          }
          .prose-blog > p:first-of-type {
            font-size: 17px;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}
