"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Section rail — the map for long pages.
 *
 * /outbound runs 16 screens and 2 600 words, and the only thing telling a reader
 * where they are was the progress strip, which reports distance travelled and
 * nothing about what is ahead. Someone who wants the price or the form has to
 * scroll the whole thing to discover either exists.
 *
 * Sections are found by content rather than by class on purpose: the § marker is
 * written three different ways across the site — a `.section-number` span on the
 * home page, an inline-styled span in SectionShell, another inline one on
 * /services — and a rail keyed to any one of them would silently cover a third
 * of the site. Matching "§ NN" text inside a <section> catches all three, so
 * this can be mounted once in the layout and simply renders nothing on pages
 * that have no numbered sections (the blog).
 */

type Item = { num: string; label: string; el: HTMLElement };

const MARKER = /^§\s*(\d+)\s*$/;

/** First clause, capped. Section headings are sentences; rail entries are not. */
function shorten(text: string, max = 42): string {
  const clause = text.split(/[.:—]/)[0].trim() || text.trim();
  if (clause.length <= max) return clause;
  const cut = clause.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return (space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd() + "…";
}

export default function SectionRail() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scanned = useRef(0);

  // Re-scan on language change: the labels come from each section's heading.
  const scan = useCallback(() => {
    const found: Item[] = [];
    // Not "main section": the home page has no <main> at all, so scoping to it
    // silently excluded a third of the site. Sections are taken wherever they
    // are, minus the ones that belong to page furniture.
    document.querySelectorAll<HTMLElement>("section").forEach((section) => {
      if (section.closest("nav, header, footer")) return;
      let num = "";
      section.querySelectorAll<HTMLElement>("span").forEach((span) => {
        if (num || span.children.length) return;
        const m = MARKER.exec((span.textContent || "").trim());
        if (m) num = m[1];
      });
      if (!num) return;
      // Explicit label wins: some sections are bands with no heading at all.
      // Then h2, then h3. Headings here are full sentences, so the rail keeps
      // the first clause and caps it — a rail entry is a signpost, not a title.
      const explicit = section.dataset.railLabel;
      const heading = section.querySelector("h2") || section.querySelector("h3");
      const raw = (explicit || heading?.textContent || "").trim();
      const label = shorten(raw);
      found.push({ num, label, el: section });
    });
    setItems(found.length >= 3 ? found : []);
  }, []);

  useEffect(() => {
    scan();
    // Sections can mount a tick after the page does; one delayed re-scan covers
    // it without leaving an observer running for the life of the page.
    const t = window.setTimeout(scan, 600);
    return () => window.clearTimeout(t);
  }, [scan, language]);

  useEffect(() => {
    if (!items.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = items.findIndex((it) => it.el === entry.target);
          if (i >= 0) setActive(i);
        });
      },
      // A band across the upper middle: the section occupying it is the one
      // being read, which a plain "is visible" test gets wrong on tall sections.
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );
    items.forEach((it) => io.observe(it.el));
    scanned.current = items.length;
    return () => io.disconnect();
  }, [items]);

  const go = (item: Item) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setOpen(false);
  };

  if (!items.length) return null;

  const expanded = hovered || open;

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label={language === "ru" ? "Разделы страницы" : "Page sections"}
        className="hidden lg:flex"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          right: 4,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 55,
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-end",
          padding: expanded ? "10px 12px" : "10px 3px",
          borderRadius: 10,
          background: expanded ? "var(--c-nav-bg)" : "transparent",
          backdropFilter: expanded ? "saturate(140%) blur(14px)" : "none",
          border: `1px solid ${expanded ? "var(--c-border)" : "transparent"}`,
          transition: "background 200ms, border-color 200ms",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={`${item.num}-${i}`}
              type="button"
              onClick={() => go(item)}
              aria-current={on ? "true" : undefined}
              title={item.label}
              className="flex items-center justify-end gap-2.5"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: expanded ? "5px 2px" : "5px 0px",
                width: "100%",
                color: on ? "var(--c-gold)" : "var(--c-text2)",
                transition: "color 160ms",
              }}
            >
              {expanded && (
                <>
                  <span
                    style={{
                      fontFamily: "var(--font-instrument-sans), sans-serif",
                      fontSize: 14,
                      lineHeight: 1.3,
                      maxWidth: 210,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      textAlign: "right",
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inconsolata), monospace",
                      fontSize: 14,
                      letterSpacing: "0.08em",
                      fontWeight: on ? 700 : 400,
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </span>
                </>
              )}
              <span
                aria-hidden="true"
                style={{
                  width: on ? 16 : 8,
                  height: on ? 2 : 1,
                  background: on ? "var(--c-gold)" : "var(--c-border2)",
                  flexShrink: 0,
                  transition: "width 180ms, height 180ms, background 160ms",
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* Mobile: a button that opens the same list as a sheet. */}
      <button
        type="button"
        className="lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={language === "ru" ? "Разделы страницы" : "Page sections"}
        style={{
          position: "fixed",
          right: 14,
          bottom: "calc(74px + env(safe-area-inset-bottom))",
          zIndex: 58,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "var(--c-nav-bg)",
          backdropFilter: "saturate(140%) blur(14px)",
          border: "1px solid var(--c-border2)",
          color: "var(--c-gold)",
          fontFamily: "var(--font-inconsolata), monospace",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {open ? "✕" : `§${items[active]?.num ?? ""}`}
      </button>

      {open && (
        <div
          className="lg:hidden"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 57,
            background: "rgba(7,8,10,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-end",
            padding: "0 12px calc(130px + env(safe-area-inset-bottom))",
          }}
        >
          <nav
            aria-label={language === "ru" ? "Разделы страницы" : "Page sections"}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxHeight: "60vh",
              overflowY: "auto",
              background: "var(--c-bg)",
              border: "1px solid var(--c-border)",
              borderRadius: 12,
              padding: 8,
            }}
          >
            {items.map((item, i) => (
              <button
                key={`m-${item.num}-${i}`}
                type="button"
                onClick={() => go(item)}
                className="flex items-baseline gap-3 w-full"
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: i < items.length - 1 ? "1px solid var(--c-border)" : "none",
                  padding: "12px 10px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: i === active ? "var(--c-gold)" : "var(--c-text)",
                }}
              >
                <span style={{ fontFamily: "var(--font-inconsolata), monospace", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                  {item.num}
                </span>
                <span style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 16, lineHeight: 1.35 }}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
