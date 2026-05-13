"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import BlogList from "@/components/blog/BlogList";
import type { Post } from "@/lib/posts";
import Link from "next/link";
import BurgMark from "@/components/BurgMark";
import { useRevealObserver } from "@/lib/useStageReveal";

const SUBSTACK = "https://paulburg.substack.com";

interface Props {
  enPosts: Post[];
  ruPosts: Post[];
}

export default function BlogPageClient({ enPosts, ruPosts }: Props) {
  const { language } = useLanguage();
  const posts = language === "ru" ? ruPosts : enPosts;
  useRevealObserver();

  const copy = {
    en: {
      h1: "Blog",
      subtitle: "Thoughts on AI, building, and life as a nomad founder.",
      substackNote: "All posts also live on Substack.",
      substackCta: "Subscribe →",
    },
    ru: {
      h1: "Блог",
      subtitle: "Мысли об AI, строительстве продуктов и жизни фаундера-номада.",
      substackNote: "Все статьи также публикуются на Substack.",
      substackCta: "Подписаться →",
    },
  }[language];

  return (
    <main style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: 56, background: "var(--c-bg)" }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-3"
          >
            <h1
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 56px)",
                letterSpacing: "-0.02em",
                color: "var(--c-heading)",
                marginTop: 8,
              }}
            >
              <BurgMark weight={1.2}>{copy.h1}</BurgMark>
              <span
                className="pb-cursor-blink"
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 40,
                  marginLeft: 10,
                  background: "var(--c-gold)",
                  boxShadow: "0 0 14px rgba(200,169,110,0.5)",
                  verticalAlign: "middle",
                }}
              />
            </h1>
            <p
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontStyle: "italic",
                fontSize: 19,
                color: "var(--c-body)",
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              {copy.subtitle}
            </p>
            <p
              style={{
                fontFamily: "var(--font-instrument-sans), sans-serif",
                fontSize: 13,
                color: "var(--c-muted)",
                marginTop: 4,
              }}
            >
              {copy.substackNote}{" "}
              <Link
                href={SUBSTACK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--c-gold)", textDecoration: "none" }}
              >
                {copy.substackCta}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="pb-reveal" style={{ paddingBottom: 80, background: "var(--c-bg)", position: "relative" }}>
        <span aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-inconsolata), monospace", fontSize: 11, letterSpacing: "0.18em", color: "var(--c-muted)" }}>§ 01</span>
        <div className="container-custom">
          <BlogList posts={posts} lang={language} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
