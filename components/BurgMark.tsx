"use client";

interface BurgMarkProps {
  children: React.ReactNode;
  weight?: number;
  className?: string;
}

export default function BurgMark({ children, className }: BurgMarkProps) {
  return (
    <span
      className={`burg-mark${className ? ` ${className}` : ""}`}
      style={{
        fontStyle: "italic",
        fontFamily: "var(--font-fraunces), serif",
        display: "inline",
      }}
    >
      {children}
    </span>
  );
}
