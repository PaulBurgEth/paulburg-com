"use client";

import { createContext, useCallback, useContext, useState } from "react";

type IntakeModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const IntakeModalContext = createContext<IntakeModalContextValue | null>(null);

export function IntakeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <IntakeModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </IntakeModalContext.Provider>
  );
}

export function useIntakeModal(): IntakeModalContextValue {
  const ctx = useContext(IntakeModalContext);
  if (!ctx) {
    throw new Error("useIntakeModal must be used within IntakeModalProvider");
  }
  return ctx;
}
