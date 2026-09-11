"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * A styled error boundary.
 *
 * Without one, any render-time throw showed Next's default screen — in
 * production a bare "Application error: a client-side exception has occurred"
 * with no site chrome and no way back. This is a client component, so it
 * cannot read the middleware header; it takes the language from <html lang>,
 * which the server already set correctly.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Errors are read in the Vercel logs — Sentry was measured and rejected in
    // September for adding 244 KB to the first screen.
    console.error("[error boundary]", error.digest ?? "", error.message);
  }, [error]);

  const ru = typeof document !== "undefined" && document.documentElement.lang === "ru";
  const t = ru
    ? {
        title: "Что-то сломалось",
        body: "Ошибка на нашей стороне, не на вашей. Можно попробовать снова или вернуться на главную.",
        retry: "Попробовать снова",
        home: "На главную",
      }
    : {
        title: "Something broke",
        body: "This is on our side, not yours. You can try again, or head back to the front page.",
        retry: "Try again",
        home: "Home",
      };

  return (
    <main
      id="content"
      style={{
        background: "var(--c-bg)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-inconsolata), monospace",
            fontSize: 14,
            letterSpacing: "0.22em",
            color: "var(--c-gold)",
            marginBottom: 18,
          }}
        >
          § 500
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: "var(--c-heading)",
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}
        >
          {t.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--c-text2)",
            maxWidth: "58ch",
            marginBottom: 28,
          }}
        >
          {t.body}
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "10px 18px",
              borderRadius: 6,
              background: "var(--c-gold)",
              color: "var(--c-on-gold)",
              border: "1px solid var(--c-gold)",
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t.retry}
          </button>
          <Link
            href="/"
            style={{
              padding: "10px 18px",
              borderRadius: 6,
              border: "1px solid var(--c-border-control)",
              color: "var(--c-text)",
              fontFamily: "var(--font-instrument-sans), sans-serif",
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
