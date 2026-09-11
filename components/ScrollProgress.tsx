"use client";
import { useEffect, useRef } from "react";

/**
 * The reading-progress hairline at the top of the window.
 *
 * Rewritten off React state. The previous version read
 * `document.body.scrollHeight` on every scroll event and then set state, which
 * re-rendered the component and wrote a new inline `width`. That is a
 * write-then-read cycle across the layout boundary once per event: the write
 * dirties layout, the next event's read forces the browser to redo it. Measured
 * on /outbound (15 248 px tall), that forced read costs 6.35 ms against 0.0003 ms
 * for `window.scrollY` — better than a third of a 16.7 ms frame, spent on a
 * two-pixel line.
 *
 * Now: the document height is measured once and re-measured only on resize and
 * when the document actually changes size, the scroll handler does nothing but
 * queue a frame, and the bar is written with a transform so it never touches
 * layout at all.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    let total = 0;
    let queued = false;

    const measure = () => {
      total = document.documentElement.scrollHeight - window.innerHeight;
      paint();
    };

    const paint = () => {
      queued = false;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      // scaleX on a full-width bar: compositor-only, no layout, no paint of the
      // surrounding page. `width: N%` could not say that.
      el.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    // Sections that reveal on scroll, images that load and fonts that swap all
    // change the document height after the first measurement.
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 2,
        background: "var(--c-gold)",
        zIndex: 9999,
        pointerEvents: "none",
        transform: "scaleX(0)",
        transformOrigin: "0 50%",
        willChange: "transform",
      }}
    />
  );
}
