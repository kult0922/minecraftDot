import "./styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import generateBlueprint from "src/functions/ImageTrans/generateBluePrint";
import { BlueprintProvider } from "src/store/useBlueprint";
import { BlockDBProvider, useBlockDBContext } from "src/store/useBlockDB";

function AppInit() {
  const { initBlockImageDataDict } = useBlockDBContext();

  useEffect(() => {
    initBlockImageDataDict();
  }, []);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlockDBProvider>
      <BlueprintProvider>
        <Component {...pageProps} />
        <AppInit />
      </BlueprintProvider>
    </BlockDBProvider>
  );
}

export default MyApp;
