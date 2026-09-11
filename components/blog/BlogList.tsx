"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";

interface Props {
  posts: Post[];
  lang: "en" | "ru";
}

function formatDate(dateStr: string, lang: "en" | "ru"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogList({ posts, lang }: Props) {
  const readCta = lang === "ru" ? "Читать →" : "Read →";

  return (
    <div className="flex flex-col gap-4" style={{ maxWidth: 680, margin: "0 auto" }}>
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -3, boxShadow: "0 10px 36px rgba(0,0,0,0.3)" }}
        >
          {/* aria-label, because the link wraps the tag, the reading time, the
              date, the <h2>, the excerpt and the "Read" affordance — so its
              computed name was all of that concatenated. The title alone is
              what a screen reader should hear in a list of links. */}
          <Link
            href={lang === "ru" ? `/blog/${post.slug}?lang=ru` : `/blog/${post.slug}`}
            aria-label={post.title}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "var(--c-card)",
                border: "1px solid var(--c-border)",
                borderRadius: 10,
                padding: 24,
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(200,169,110,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontSize: 14,
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
                  {post.tags.join(" · ")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontSize: 14,
                    color: "var(--c-muted)",
                  }}
                >
                  {post.readingTime}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontSize: 14,
                    color: "var(--c-muted)",
                  }}
                >
                  · {formatDate(post.date, lang)}
                </span>
              </div>
              {/* h2, not h3: the page has one h1 and nothing between it and the
                  post titles, so every card was a level-3 heading under a
                  level-1 — the only heading-level skip on the site. Size is
                  unchanged; this is the outline, not the type. */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "var(--c-text)",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontSize: 16,
                  color: "var(--c-body)",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                {post.excerpt}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inconsolata), monospace",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--c-gold)",
                }}
              >
                {readCta}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
