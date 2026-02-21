import { useLocaleContext } from "src/context/useLocaleContext";

export const useLocale = () => {
  const { locale, t } = useLocaleContext();
  return { locale, t };
};
