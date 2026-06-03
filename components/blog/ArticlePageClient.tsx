"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import type { ReactNode } from "react";
import { splitLastWord } from "@/lib/text";
import { useRevealObserver } from "@/lib/useStageReveal";

interface Frontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface Props {
  slug: string;
  lang: "en" | "ru";
  frontmatter: Frontmatter;
  toc?: TocItem[];
  sources?: ReactNode;
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
  toc,
  sources,
  children,
}: Props) {
  const { language } = useLanguage();
  const router = useRouter();
  const backLinkRef = useRef<HTMLAnchorElement>(null);
  useRevealObserver();

  // Sync language context with URL param
  useEffect(() => {
    if (language !== lang) {
      router.replace(`/blog/${slug}?lang=${language}`);
    }
  }, [language, lang, slug, router]);

  // Inject section numerals into H2s
  useEffect(() => {
    const h2s = document.querySelectorAll(".prose-blog h2");
    h2s.forEach((h, i) => {
      if (h.querySelector(".h2-numeral")) return;
      const span = document.createElement("span");
      span.className = "h2-numeral";
      span.textContent = String(i + 1).padStart(2, "0");
      h.prepend(span);
    });
  }, [slug]);

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

            {(() => {
              const { head, tail } = splitLastWord(frontmatter.title);
              return (
                <h1
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 600,
                    fontSize: "clamp(34px, 5.5vw, 52px)",
                    letterSpacing: "-0.022em",
                    color: "var(--c-heading)",
                    lineHeight: 1.15,
                    margin: "0 0 16px",
                  }}
                >
                  {head}
                  <em style={{
                    fontStyle: "italic",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(200,169,110,0.7)",
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 600,
                  }}>{tail}</em>
                </h1>
              );
            })()}

            <p
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontStyle: "italic",
                fontSize: 21,
                lineHeight: 1.45,
                color: "var(--c-body-lede)",
                fontWeight: 400,
                margin: "0 0 24px",
              }}
            >
              {frontmatter.excerpt}
            </p>

            <div style={{
              display: "flex", gap: 18, flexWrap: "wrap", alignItems: "baseline",
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "var(--c-text2)",
              marginBottom: 32,
            }}>
              <span>{formatDate(frontmatter.date, lang)}</span>
              <span style={{color: "var(--c-gold)"}}>·</span>
              <span>{frontmatter.readingTime}</span>
              <span style={{color: "var(--c-gold)"}}>·</span>
              <span>{frontmatter.tags.join(" · ")}</span>
            </div>
          </div>
        </section>

        {/* Table of contents */}
        {toc && toc.length > 1 && (
          <section style={{ paddingBottom: 0, background: "var(--c-bg)" }}>
            <div className="container-custom" style={{ maxWidth: 680 }}>
              <nav
                style={{
                  border: "1px solid var(--c-border)",
                  borderRadius: 8,
                  padding: "20px 24px",
                  marginBottom: 48,
                  background: "var(--c-card)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--c-muted)",
                    margin: "0 0 12px",
                  }}
                >
                  {lang === "ru" ? "Содержание" : "Contents"}
                </p>
                <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {toc.map((item, i) => (
                    <li key={item.id} style={{ padding: "3px 0", paddingLeft: item.level === 3 ? 16 : 0 }}>
                      <a
                        href={`#${item.id}`}
                        style={{
                          fontFamily: "var(--font-instrument-sans), sans-serif",
                          fontSize: item.level === 3 ? 13 : 14,
                          color: "var(--c-text2)",
                          textDecoration: "none",
                          display: "flex",
                          gap: 10,
                          alignItems: "baseline",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--c-gold)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--c-text2)"; }}
                      >
                        <span style={{ color: "var(--c-gold)", fontFamily: "var(--font-inconsolata), monospace", fontSize: 11, flexShrink: 0 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </section>
        )}

        {/* Article body */}
        <section style={{ paddingBottom: sources ? 40 : 80, background: "var(--c-bg)" }}>
          <div
            className="container-custom prose-blog"
            style={{ maxWidth: 680 }}
          >
            {children}
          </div>
        </section>

        {/* Sources */}
        {sources && (
          <section style={{ paddingBottom: 80, background: "var(--c-bg)" }}>
            <div className="container-custom article-sources" style={{ maxWidth: 680 }}>
              {sources}
            </div>
          </section>
        )}

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
          font-family: var(--font-newsreader), Georgia, serif;
          font-size: 19.5px;
          line-height: 1.65;
          color: var(--c-body);
          font-feature-settings: "ss01", "kern";
        }

        .prose-blog p {
          margin: 0 0 22px;
        }

        .prose-blog > p:first-of-type {
          font-size: 21px !important;
          color: var(--c-body-lede);
          line-height: 1.55;
          margin-bottom: 28px;
        }

        .prose-blog > p:first-of-type::first-letter {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 700;
          font-style: normal;
          font-size: 76px;
          line-height: 0.85;
          float: left;
          padding: 6px 14px 0 0;
          color: var(--c-gold);
          font-feature-settings: "ss01";
        }

        .prose-blog h1 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 30px;
          color: var(--c-heading);
          margin: 56px 0 18px;
          line-height: 1.2;
          letter-spacing: -0.015em;
        }

        .prose-blog h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: clamp(24px, 3vw, 30px);
          letter-spacing: -0.015em;
          color: var(--c-heading);
          margin: 56px 0 18px;
          line-height: 1.2;
          position: relative;
        }

        .prose-blog h2 .h2-numeral {
          display: block;
          font-family: var(--font-inconsolata), monospace;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--c-gold);
          margin-bottom: 8px;
        }

        .prose-blog h3 {
          font-family: var(--font-newsreader), serif;
          font-weight: 600;
          font-style: italic;
          font-size: 19px;
          color: var(--c-gold);
          margin: 36px 0 10px;
          text-transform: none;
          letter-spacing: 0;
          line-height: 1.35;
        }

        .prose-blog ul {
          list-style: none;
          padding-left: 0;
          margin: 0 0 24px;
        }

        .prose-blog ul li {
          padding: 6px 0 6px 22px;
          position: relative;
          color: var(--c-body);
        }

        .prose-blog ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--c-gold);
        }

        .prose-blog ol {
          margin: 0 0 24px;
          padding-left: 28px;
          color: var(--c-body);
        }

        .prose-blog ol li {
          padding: 4px 0;
        }

        .prose-blog ol li::marker {
          color: var(--c-gold);
          font-family: var(--font-inconsolata), monospace;
          font-weight: 600;
        }

        .prose-blog blockquote {
          border: none;
          margin: 40px 0;
          padding: 24px 0;
          position: relative;
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-weight: 500;
          font-size: 26px;
          line-height: 1.35;
          color: var(--c-body-lede);
          letter-spacing: -0.005em;
        }

        .prose-blog blockquote::before,
        .prose-blog blockquote::after {
          content: '';
          position: absolute;
          left: 0;
          width: 48px;
          height: 1px;
          background: var(--c-gold);
        }

        .prose-blog blockquote::before { top: 0; }
        .prose-blog blockquote::after  { bottom: 0; }

        .prose-blog blockquote p { margin: 0; }

        .prose-blog code {
          font-family: var(--font-inconsolata), monospace;
          font-size: 0.85em;
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
          margin: 28px 0;
        }

        .prose-blog pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 14px;
          color: var(--c-body);
        }

        .prose-blog strong {
          color: var(--c-heading);
          font-weight: 600;
        }

        .prose-blog a {
          color: var(--c-gold);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          text-decoration-color: var(--c-gold-glow);
          transition: text-decoration-color 0.2s;
        }

        .prose-blog a:hover {
          text-decoration-color: var(--c-gold);
        }

        .prose-blog hr.ornament {
          border: none;
          text-align: center;
          margin: 48px 0;
          height: auto;
          overflow: visible;
        }

        .prose-blog hr.ornament::before {
          content: '· · ·';
          color: var(--c-gold);
          letter-spacing: 0.8em;
          font-size: 14px;
        }

        .prose-blog hr:not(.ornament) {
          border: none;
          border-top: 1px solid var(--c-border);
          margin: 32px 0;
        }

        :root:not(.dark) .prose-blog > p:first-of-type::first-letter {
          color: #8a6432;
        }

        @media (max-width: 640px) {
          .prose-blog { font-size: 18px; line-height: 1.7; }
          .prose-blog > p:first-of-type { font-size: 19px !important; }
          .prose-blog > p:first-of-type::first-letter { font-size: 60px; padding: 4px 10px 0 0; }
          .prose-blog h2 { font-size: 24px; margin-top: 44px; }
          .prose-blog blockquote { font-size: 22px; }
        }

        .article-sources {
          padding-top: 32px;
          border-top: 1px solid var(--c-border);
        }
        .article-sources h2,
        .article-sources h3 {
          font-family: var(--font-inconsolata), monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--c-muted);
          margin: 0 0 24px;
        }
        .article-sources p {
          font-family: var(--font-instrument-sans), sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: var(--c-body);
          margin: 0 0 12px;
        }
        .article-sources a {
          color: var(--c-gold);
          text-decoration: none;
          word-break: break-word;
        }
        .article-sources a:hover {
          text-decoration: underline;
        }
        .article-sources ol,
        .article-sources ul {
          padding-left: 20px;
          margin: 0 0 12px;
        }
        .article-sources li {
          font-size: 13px;
          line-height: 1.6;
          color: var(--c-body);
          margin-bottom: 8px;
        }
      `}</style>

      <Footer />
    </main>
  );
}
