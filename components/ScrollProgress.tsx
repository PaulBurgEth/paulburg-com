"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: `${width}%`, height: 2,
      background: "var(--c-gold)", zIndex: 9999,
      pointerEvents: "none", transition: "width 0.1s linear",
    }} />
  );
}
