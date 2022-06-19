import { useRouter } from "next/router";
import en from "../i18n/locales/en";
import ja from "../i18n/locales/ja";

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;
  return { locale, t };
};
