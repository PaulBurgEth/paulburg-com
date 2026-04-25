"use client";

interface BurgMarkProps {
  children: React.ReactNode;
  weight?: number;
  className?: string;
}

export default function BurgMark({ children, weight = 1.2, className }: BurgMarkProps) {
  return (
    <span
      className={`burg-mark${className ? ` ${className}` : ""}`}
      style={{
        color: "transparent",
        WebkitTextStroke: `${weight}px var(--c-heading)`,
        fontStyle: "italic",
        display: "inline",
      }}
    >
      {children}
    </span>
  );
}
