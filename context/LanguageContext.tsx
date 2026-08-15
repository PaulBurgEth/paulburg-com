"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "pb-lang";

function isLanguage(v: string | null): v is Language {
    return v === "ru" || v === "en";
}

/**
 * The language preference lives outside React: it comes from the ?lang= query
 * param (so an emailed link can force a language) or from localStorage, and it
 * has to survive navigation between pages. useSyncExternalStore is the right
 * shape for that — the server always renders "en", and React reconciles to the
 * stored value on the client without a hydration mismatch.
 */
let current: Language | null = null;
const listeners = new Set<() => void>();

// Read-only: no writes here, so getSnapshot stays pure. Persisting happens in
// the effect below, once per resolved language.
function resolve(): Language {
    if (typeof window === "undefined") return "en";
    try {
        const fromUrl = new URLSearchParams(window.location.search).get("lang");
        if (isLanguage(fromUrl)) return fromUrl;
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (isLanguage(stored)) return stored;
    } catch {
        // Private mode / blocked storage — fall through to the default.
    }
    return "en";
}

function getSnapshot(): Language {
    if (current === null) current = resolve();
    return current;
}

function getServerSnapshot(): Language {
    return "en";
}

function subscribe(cb: () => void): () => void {
    listeners.add(cb);
    return () => {
        listeners.delete(cb);
    };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const setLanguage = useCallback((lang: Language) => {
        current = lang;
        listeners.forEach((l) => l());
    }, []);

    // Sync the two external systems that care: <html lang> so CSS selectors like
    // html[lang="ru"] can swap primary fonts, and localStorage so the choice
    // survives navigation and return visits.
    useEffect(() => {
        document.documentElement.lang = language;
        try {
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
