import "./styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { BlueprintProvider } from "src/context/useBlueprint";
import { BlockDBProvider, useBlockDBContext } from "src/context/useBlockDB";
import { DefaultSeo } from "next-seo";
import { useLocale } from "src/hooks/useLocale";
import GoogleAnalytics from "src/components/GoogleAnalytics";
import usePageView from "src/hooks/usePageView";
import { pageview } from "src/functions/gtag";

function AppInit() {
  const { initBlockImageDataDict } = useBlockDBContext();

  useEffect(() => {
    initBlockImageDataDict();
    pageview("/");
  }, []);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useLocale();
  usePageView();
  return (
    <>
      <GoogleAnalytics />
      <DefaultSeo
        defaultTitle={t.SEO_TITLE}
        canonical="https://www.minecraft-dot.pictures/"
        description={t.SEO_DESCTIPTION}
        openGraph={{
          type: "website",
          title: t.SEO_TITLE,
          description: t.SEO_DESCTIPTION,
          site_name: t.SEO_TITLE,
          url: "https://www.minecraft-dot.pictures/",
        }}
      />
      <BlockDBProvider>
        <BlueprintProvider>
          <Component {...pageProps} />
          <AppInit />
        </BlueprintProvider>
      </BlockDBProvider>
    </>
  );
}

export default MyApp;
