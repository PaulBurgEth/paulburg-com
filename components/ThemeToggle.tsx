"use client";
import { useCallback, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * The theme lives on <html> as a class, put there by the inline script in
 * app/layout.tsx before the first paint. That makes it an external store, not
 * React state — so it is read with useSyncExternalStore rather than copied into
 * state inside an effect.
 *
 * The previous version did `useState(true)` plus a `setIsDark(...)` in an
 * effect, which React's own lint rule flags as a cascading render: the button
 * rendered the wrong glyph for one frame on every page load, then corrected
 * itself. Reading the store directly means there is never a wrong frame.
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

// The server has no <html> to read, and the inline script defaults to dark, so
// dark is the honest server answer. Any mismatch is reconciled on hydration
// without a visible flash, because the class is already correct by then.
function getServerSnapshot(): boolean {
  return true;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode or blocked storage — the theme still applies this session.
    }
    listeners.forEach((l) => l());
  }, []);

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center transition-colors"
      aria-label="Toggle theme"
      // The glyph stays 16px; the hit area does not. Measured at 375px the button
      // was 16x16 against the 24x24 floor in WCAG 2.5.8, and it is one of only two
      // persistent controls in the mobile header. Negative margin keeps the
      // header's optical spacing unchanged.
      // Was `text-gray-400 hover:text-white`: hardcoded Tailwind greys that
      // ignore the theme. Measured in the light theme, 2.24:1 at rest and
      // 1.13:1 on hover — the icon disappeared under the cursor.
      style={{ width: 28, height: 28, margin: -6, flexShrink: 0, color: "var(--c-text2)" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--c-gold)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--c-text2)"; }}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
