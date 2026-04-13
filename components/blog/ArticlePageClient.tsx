"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import type { ReactNode } from "react";

interface Frontmatter {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
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

export default function ArticlePageClient({
  slug,
  lang,
  frontmatter,
  children,
}: Props) {
  const { language } = useLanguage();
  const router = useRouter();

  // Sync language context with URL param
  useEffect(() => {
    if (language !== lang) {
      router.replace(`/blog/${slug}?lang=${language}`);
    }
  }, [language, lang, slug, router]);

  const backLabel = lang === "ru" ? "← Все заметки" : "← All writing";

  return (
    <main style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Article header */}
      <section style={{ paddingTop: 96, paddingBottom: 40, background: "var(--c-bg)" }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-inconsolata), monospace",
              fontSize: 12,
              color: "var(--c-muted)",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 28,
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
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--c-gold)",
                background: "var(--c-gold-dim)",
                border: "1px solid var(--c-gold-glow)",
                borderRadius: 4,
                padding: "2px 8px",
              }}
            >
              {frontmatter.tag}
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
            <span
              style={{
                fontFamily: "var(--font-inconsolata), monospace",
                fontSize: 11,
                color: "var(--c-muted)",
              }}
            >
              · {formatDate(frontmatter.date, lang)}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 44px)",
              letterSpacing: "-0.02em",
              color: "var(--c-heading)",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {frontmatter.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontSize: 16,
              color: "var(--c-text2)",
              lineHeight: 1.6,
              marginBottom: 40,
              borderBottom: "1px solid var(--c-border)",
              paddingBottom: 32,
            }}
          >
            {frontmatter.excerpt}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section style={{ paddingBottom: 80, background: "var(--c-bg)" }}>
        <div
          className="container-custom prose-blog"
          style={{ maxWidth: 720 }}
        >
          {children}
        </div>
      </section>

      <style>{`
        .prose-blog h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: clamp(20px, 2.5vw, 26px);
          letter-spacing: -0.02em;
          color: var(--c-heading);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .prose-blog p {
          font-family: var(--font-instrument-sans), sans-serif;
          font-size: 16px;
          color: var(--c-text2);
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .prose-blog ul, .prose-blog ol {
          font-family: var(--font-instrument-sans), sans-serif;
          font-size: 16px;
          color: var(--c-text2);
          line-height: 1.75;
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .prose-blog li { margin-bottom: 0.4rem; }
        .prose-blog strong { color: var(--c-text); font-weight: 600; }
        .prose-blog a { color: var(--c-gold); text-decoration: none; }
        .prose-blog a:hover { text-decoration: underline; }
        .prose-blog code {
          font-family: var(--font-inconsolata), monospace;
          font-size: 13px;
          background: var(--c-card);
          border: 1px solid var(--c-border);
          border-radius: 4px;
          padding: 1px 6px;
          color: var(--c-gold);
        }
        .prose-blog blockquote {
          border-left: 3px solid var(--c-gold);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: var(--c-text2);
          font-style: italic;
        }
      `}</style>

      <Footer />
    </main>
  );
}
