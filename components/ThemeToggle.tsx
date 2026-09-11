"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      aria-label="Toggle theme"
      // The glyph stays 16px; the hit area does not. Measured at 375px the button
      // was 16x16 against the 24x24 floor in WCAG 2.5.8, and it is one of only two
      // persistent controls in the mobile header. Negative margin keeps the
      // header's optical spacing unchanged.
      style={{ width: 28, height: 28, margin: -6, flexShrink: 0 }}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
