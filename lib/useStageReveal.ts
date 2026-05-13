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
 * useRevealObserver — attaches a single IntersectionObserver on mount
 * that adds `.is-visible` to every `.pb-reveal` element as it scrolls
 * into view. Used by every page that ships scroll-reveal sections.
 *
 * Under reduced-motion, immediately marks every `.pb-reveal` as visible.
 */
export function useRevealObserver(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = document.querySelectorAll<HTMLElement>(".pb-reveal");
    if (els.length === 0) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      // Mockup observer params: ~8% rootMargin top/bottom, 5% threshold.
      { threshold: 0.05, rootMargin: "-8% 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}
