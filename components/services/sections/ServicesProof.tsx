"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const en = {
  metrics: [
    { value: "10+", label: "systems built & shipped" },
    { value: "24/7", label: "autonomous operation" },
    { value: "3–14 days", label: "from call to launch" },
  ],
};

const ru = {
  metrics: [
    { value: "10+", label: "систем в продакшене" },
    { value: "24/7", label: "автономная работа" },
    { value: "3–14 дней", label: "от звонка до запуска" },
  ],
};

export default function ServicesProof() {
  const { language } = useLanguage();
  const t = language === "ru" ? ru : en;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
        borderBottom: "1px solid var(--c-border)",
      }}
    >
      <div className="container-custom">
        <div className="flex flex-wrap">
          {t.metrics.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 flex-1 min-w-[120px]"
              style={{
                borderRight:
                  i < t.metrics.length - 1 ? "1px solid var(--c-border)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--c-gold)",
                  lineHeight: 1.2,
                }}
              >
                {i === 0 ? <CountUp target={10} suffix="+" /> : item.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-instrument-sans), sans-serif",
                  fontWeight: 400,
                  fontSize: 11,
                  color: "var(--c-muted)",
                  marginTop: 4,
                  textAlign: "center",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
