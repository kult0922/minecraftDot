import "./styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import generateBlueprint from "src/functions/ImageTrans/generateBluePrint";
import { BlueprintProvider } from "src/store/useBlueprint";
import { BlockDBProvider, useBlockDBContext } from "src/store/useBlockDB";
import { BlockImageProvider, useBlockImageContext } from "src/store/useBlockImage";

function AppInit() {
  const { initBlockImageDataDict } = useBlockImageContext();

  useEffect(() => {
    initBlockImageDataDict();
  }, []);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlockDBProvider>
      <BlockImageProvider>
        <BlueprintProvider>
          <Component {...pageProps} />
          <AppInit />
        </BlueprintProvider>
      </BlockImageProvider>
    </BlockDBProvider>
  );
}

export default MyApp;
