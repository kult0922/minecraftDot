import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "src/i18n/locales/en";
import ja from "src/i18n/locales/ja";

type Locale = "en" | "ja";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof en;
}

const LocaleContext = createContext<LocaleContextValue>({} as LocaleContextValue);

export function useLocaleContext() {
  return useContext(LocaleContext);
}

function detectInitialLocale(): Locale {
  const stored = localStorage.getItem("locale");
  if (stored === "en" || stored === "ja") return stored;

  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === "ja") return "ja";

  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = locale === "en" ? en : ja;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}
