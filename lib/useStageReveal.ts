"use client";

import { useEffect, useState } from "react";

/**
 * useStageReveal — sequential reveal state machine for hero cascades.
 *
 * Accepts EITHER:
 *   - a number of `stages` (with optional `perStage` + `initialDelay`),
 *     OR
 *   - an explicit array of absolute delays (ms from mount) — one per stage.
 *
 * Returns a `stage` integer 0..N. Callers gate visibility with
 * `stage >= 1`, `stage >= 2`, etc.
 *
 * Honors `prefers-reduced-motion`: jumps straight to the final stage
 * on mount, no timers.
 */
export function useStageReveal(
  stagesOrDelays: number | number[] = 4,
  perStage = 240,
  initialDelay = 380,
): number {
  const [stage, setStage] = useState(0);

  // Resolve once to a stable array key for the effect dependency.
  const delaysKey = Array.isArray(stagesOrDelays) ? stagesOrDelays.join(",") : "";
  const finalStage = Array.isArray(stagesOrDelays) ? stagesOrDelays.length : stagesOrDelays;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setStage(finalStage);
      return;
    }

    if (Array.isArray(stagesOrDelays)) {
      // Schedule each stage at its absolute delay from mount.
      const timers = stagesOrDelays.map((d, i) =>
        setTimeout(() => setStage(i + 1), d),
      );
      return () => timers.forEach((t) => clearTimeout(t));
    }

    // Chained cadence: initialDelay, then perStage each tick.
    let i = 0;
    let stepTimer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      i += 1;
      setStage(i);
      if (i < stagesOrDelays) stepTimer = setTimeout(tick, perStage);
    };
    const startTimer = setTimeout(tick, initialDelay);
    return () => {
      clearTimeout(startTimer);
      if (stepTimer) clearTimeout(stepTimer);
    };
    // delaysKey forces re-run when array contents change; finalStage cached.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delaysKey, finalStage, perStage, initialDelay]);

  return stage;
}

/**
 * useRevealObserver — attaches a single IntersectionObserver on mount that adds
 * `.is-in` to every `.pb-reveal` element as it scrolls into view. Used by every
 * page that ships scroll-reveal sections.
 *
 * Two things this has to survive, both of which used to break it:
 *
 * 1. Sections imported via `dynamic(..., { ssr: false })` mount AFTER this
 *    effect runs. A one-shot querySelectorAll never sees them, so they keep
 *    `.pb-reveal`'s `opacity: 0` forever. A MutationObserver picks them up as
 *    they arrive.
 * 2. Such a chunk can also land after the user has already scrolled past its
 *    slot. The IntersectionObserver would then never fire for it, so anything
 *    already above the viewport is revealed immediately instead of observed.
 *
 * Under reduced-motion, everything is marked visible at once — now and later.
 */
export function useRevealObserver(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveal = (el: Element) => el.classList.add("is-in");
    const watchLateArrivals = (handle: (el: Element) => void) => {
      const mo = new MutationObserver((records) => {
        for (const record of records) {
          record.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (node.classList.contains("pb-reveal")) handle(node);
            node.querySelectorAll(".pb-reveal").forEach(handle);
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      return mo;
    };

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".pb-reveal").forEach(reveal);
      const mo = watchLateArrivals(reveal);
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      // Mockup observer params: ~8% rootMargin top/bottom, 5% threshold.
      { threshold: 0.05, rootMargin: "-8% 0px -8% 0px" },
    );

    const track = (el: Element) => {
      if (el.classList.contains("is-in")) return;
      // Entirely above the viewport already — the observer would never fire.
      if (el.getBoundingClientRect().bottom < 0) {
        reveal(el);
        return;
      }
      io.observe(el);
    };

    // No early return on an empty list: a page whose only .pb-reveal sections
    // are dynamically imported would otherwise never get an observer at all.
    document.querySelectorAll(".pb-reveal").forEach(track);
    const mo = watchLateArrivals(track);

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
