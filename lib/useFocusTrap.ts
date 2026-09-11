"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps keyboard focus inside an open dialog.
 *
 * Both intake modals had `role="dialog"` and `aria-modal="true"` and stopped
 * there. Measured before this hook: after opening, `document.activeElement` was
 * still the trigger button behind the overlay, and 63 focusable elements on the
 * page behind the dialog were reachable with Tab. A keyboard or screen-reader
 * user could tab straight out of the dialog into a page they could not see.
 *
 * `aria-modal` only tells assistive tech to ignore the rest of the page; it does
 * nothing for the Tab order, which is why this is needed as well.
 *
 * Returns a ref to put on the dialog element.
 */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useFocusTrap(isOpen: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const node = ref.current;
    if (!node) return;

    // Remember who opened it, so focus can go home on close. Without this the
    // caret lands back at the top of the document and a keyboard user has to
    // tab through the whole page to get back to where they were.
    const opener = document.activeElement as HTMLElement | null;

    const list = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el.getClientRects().length > 0,
      );

    // The dialog animates in; querying on the same tick can find nothing.
    // setTimeout, not requestAnimationFrame: rAF does not fire at all while the
    // tab is hidden or throttled, and a dialog opened in that state would never
    // receive focus — verified in a hidden preview pane, where rAF stayed silent
    // and the timer did not.
    const timer = window.setTimeout(() => {
      const items = list();
      // First field, not the close button: the point of opening this is to fill
      // it in. Falls back to the dialog itself when it holds no controls yet.
      const target =
        items.find((el) => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) ?? items[0] ?? node;
      target.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = list();
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      // Focus escaped the dialog entirely (browser chrome, or a stale node) —
      // pull it back rather than letting Tab wander into the page behind.
      if (!active || !node.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey, true);
      // Only reclaim focus if it is still inside the dialog we are closing.
      // The guard used to check just that `opener` was still in the document,
      // which is not the same thing: click something outside before the dialog
      // unmounts and focus was yanked back to the trigger.
      const active = document.activeElement;
      const focusEscaped = !active || active === document.body || !node.contains(active);
      if (opener && document.body.contains(opener) && !focusEscaped) opener.focus();
    };
  }, [isOpen]);

  return ref;
}
