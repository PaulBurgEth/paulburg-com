"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — animates 0 → target once the element scrolls into view.
 *
 * Safety rule: the number must never be left showing a wrong value. The count
 * is driven by requestAnimationFrame, which browsers throttle to a standstill
 * in hidden or backgrounded tabs — a metric frozen at "0" reads as a claim, not
 * as a pending animation. So the target is applied immediately when motion is
 * unavailable, and a watchdog snaps to it if a started animation stalls.
 *
 * Starts at 0 on both server and client, so it stays hydration-safe.
 */
export default function CountUp({
  target,
  suffix = "",
  duration = 1200,
  format,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const snap = () => {
      started.current = true;
      setCount(target);
    };

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || document.visibilityState !== "visible" || !("IntersectionObserver" in window)) {
      snap();
      return;
    }

    let raf = 0;
    let watchdog: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      // If rAF is throttled mid-flight the count would freeze part-way; land on
      // the real figure shortly after the animation should have finished.
      watchdog = setTimeout(() => setCount(target), duration + 600);
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setCount(Math.floor(p * target));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setCount(target);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);

    // A tab hidden before the observer fires would otherwise never animate.
    const onVisibility = () => {
      if (document.visibilityState !== "visible" && !started.current) snap();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      clearTimeout(watchdog);
    };
  }, [target, duration]);

  return <span ref={ref}>{format ? format(count) : count}{suffix}</span>;
}
