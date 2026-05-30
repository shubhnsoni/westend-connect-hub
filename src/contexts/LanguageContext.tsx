import React, { createContext, useState, useCallback, useRef, useEffect } from "react";

export type Language = "en" | "es" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
  isTranslating: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (text) => text,
  isTranslating: false,
});

const CACHE_PREFIX = "weca-i18n-v2-";

function getCached(lang: Language, text: string): string | null {
  try {
    return localStorage.getItem(`${CACHE_PREFIX}${lang}-${text}`);
  } catch {
    return null;
  }
}

function setCache(lang: Language, text: string, translation: string) {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${lang}-${text}`, translation);
  } catch {
    // localStorage full — ignore
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return (localStorage.getItem("weca-lang") as Language) || "en";
    } catch {
      return "en";
    }
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const pendingRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRequests = useRef(0);
  const inFlightRef = useRef<Set<string>>(new Set());
  const languageRef = useRef<Language>(language);

  // Keep languageRef in sync
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  // Update html lang attribute
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-Hans" : language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("weca-lang", lang);
    } catch {}
    // Always clear in-memory translations when switching language
    setTranslations({});
    pendingRef.current.clear();
    inFlightRef.current.clear();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const flushBatch = useCallback(async () => {
    const lang = languageRef.current;
    if (lang === "en") return;

    const batch = Array.from(pendingRef.current).filter(t => !inFlightRef.current.has(t));
    pendingRef.current.clear();

    if (batch.length === 0) return;

    activeRequests.current++;
    setIsTranslating(true);
    batch.forEach(t => inFlightRef.current.add(t));

    // Split into chunks of 50
    const chunks: string[][] = [];
    for (let i = 0; i < batch.length; i += 50) {
      chunks.push(batch.slice(i, i + 50));
    }

    for (const chunk of chunks) {
      try {
        const baseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!baseUrl) {
          console.error("[i18n] VITE_SUPABASE_URL not set");
          chunk.forEach(t => inFlightRef.current.delete(t));
          continue;
        }
        const url = `${baseUrl}/functions/v1/translate`;
        console.log(`[i18n] Translating ${chunk.length} texts to ${lang}`);

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ texts: chunk, targetLang: lang }),
        });

        if (!res.ok) {
          console.warn("[i18n] Translation failed:", res.status, await res.text().catch(() => ""));
          // Re-queue failed texts for retry
          chunk.forEach(t => {
            inFlightRef.current.delete(t);
            pendingRef.current.add(t);
          });
          continue;
        }

        const data = await res.json();
        
        // Check if language changed while we were fetching
        if (languageRef.current !== lang) {
          chunk.forEach(t => inFlightRef.current.delete(t));
          return;
        }

        const newTranslations: Record<string, string> = {};

        chunk.forEach((text, i) => {
          const translated = data.translations?.[i];
          if (translated) {
            newTranslations[text] = translated;
            setCache(lang, text, translated);
          }
          inFlightRef.current.delete(text);
        });

        setTranslations(prev => ({ ...prev, ...newTranslations }));
      } catch (err) {
        console.error("[i18n] Translation error:", err);
        // Re-queue failed texts for retry
        chunk.forEach(t => {
          inFlightRef.current.delete(t);
          pendingRef.current.add(t);
        });
      }
    }

    // Schedule retry if there are re-queued texts
    if (pendingRef.current.size > 0 && languageRef.current === lang) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => flushBatch(), 2000);
    }

    activeRequests.current--;
    if (activeRequests.current <= 0) {
      activeRequests.current = 0;
      setIsTranslating(false);
    }
  }, []);

  const t = useCallback(
    (text: string): string => {
      if (language === "en" || !text || text.trim() === "") return text;

      // Check in-memory state
      if (translations[text]) return translations[text];

      // Check localStorage cache
      const cached = getCached(language, text);
      if (cached) {
        // Populate in-memory too (avoid repeated localStorage reads)
        setTranslations(prev => {
          if (prev[text]) return prev;
          return { ...prev, [text]: cached };
        });
        return cached;
      }

      // Queue for batch translation
      if (!pendingRef.current.has(text) && !inFlightRef.current.has(text)) {
        pendingRef.current.add(text);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          flushBatch();
        }, 150);
      }

      return text; // Return original while translating
    },
    [language, translations, flushBatch]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};
