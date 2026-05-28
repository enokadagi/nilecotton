"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translationMap } from "@/lib/translate";

type SiteLocale = "en" | "am";

type TranslateContextValue = {
  locale: SiteLocale;
  t: (key: string, fallback: string) => string;
};

const TranslateContext = createContext<TranslateContextValue>({
  locale: "en",
  t: (_, fallback) => fallback,
});

export function AutoTranslateProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<SiteLocale>("en");

  useEffect(() => {
    const browserLocale = typeof navigator !== "undefined" ? navigator.language || navigator.languages?.[0] : "en";
    const nextLocale = browserLocale?.toLowerCase().startsWith("am") ? "am" : "en";
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: (key: string, fallback: string) => (locale === "am" ? translationMap[key] ?? fallback : fallback),
    }),
    [locale],
  );

  return <TranslateContext.Provider value={value}>{children}</TranslateContext.Provider>;
}

export function useTranslate() {
  return useContext(TranslateContext);
}
