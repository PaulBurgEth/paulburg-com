"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "pb-lang";
const COOKIE_KEY = "pb-lang";

function readCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
}

function writeCookie(name: string, value: string) {
    // A year, path-wide, lax — the same shape middleware.ts writes, so the two
    // never disagree.
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function isLanguage(v: string | null): v is Language {
    return v === "ru" || v === "en";
}

/**
 * The language now arrives from the server.
 *
 * This used to be a useSyncExternalStore over localStorage, and the docstring
 * explained why: "the server always renders en, and React reconciles to the
 * stored value on the client without a hydration mismatch". That was the right
 * shape for the constraint, but the constraint was the bug — it meant the
 * server never rendered Russian at all.
 *
 * middleware.ts resolves the language before the first byte and the root layout
 * passes it in, so plain state initialised from a prop is both simpler and
 * mismatch-free: the server renders Russian, the client hydrates from the same
 * value. The cookie is what carries the choice between requests.
 */

export function LanguageProvider({
    children,
    initialLanguage,
}: {
    children: ReactNode;
    initialLanguage: Language;
}) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    // Sync the two external systems that care: <html lang> so CSS selectors like
    // html[lang="ru"] can swap primary fonts, and localStorage so the choice
    // survives navigation and return visits.
    // One-time migration for visitors who chose a language before the cookie
    // existed: without it their stored choice would silently reset to whatever
    // the server guessed.
    useEffect(() => {
        if (readCookie(COOKIE_KEY)) return;
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (isLanguage(stored) && stored !== language) setLanguageState(stored);
        } catch {
            // Blocked storage — nothing to migrate.
        }
    }, [language]);

    useEffect(() => {
        document.documentElement.lang = language;
        try {
            writeCookie(COOKIE_KEY, language);
            // localStorage is kept in step as a fallback for the case where
            // cookies are blocked but storage is not.
            window.localStorage.setItem(STORAGE_KEY, language);
        } catch {
            // Storage unavailable — the language still works for this session.
        }
    }, [language]);

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
