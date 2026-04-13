"use client";

import { createContext, useCallback, useContext, useState } from "react";

type MentorshipModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MentorshipModalContext = createContext<MentorshipModalContextValue | null>(null);

export function MentorshipModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <MentorshipModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MentorshipModalContext.Provider>
  );
}

export function useMentorshipModal(): MentorshipModalContextValue {
  const ctx = useContext(MentorshipModalContext);
  if (!ctx) {
    throw new Error("useMentorshipModal must be used within MentorshipModalProvider");
  }
  return ctx;
}
