import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { BlockDBProvider, useBlockDBContext } from "src/context/useBlockDB";
import { BlueprintProvider } from "src/context/useBlueprint";
import { LocaleProvider } from "src/context/useLocaleContext";
import usePageView from "src/hooks/usePageView";
import { pageview, existsGaId, GA_ID } from "src/functions/gtag";
import "src/styles/globals.css";

function AppInit() {
  const { initBlockImageDataDict } = useBlockDBContext();

  useEffect(() => {
    initBlockImageDataDict();
    pageview("/");
  }, []);

  return null;
}

function PageViewTracker() {
  usePageView();
  return null;
}

function RootComponent() {
  return (
    <html lang="ja-JP">
      <head>
        <HeadContent />
      </head>
      <body>
        <LocaleProvider>
          <BlockDBProvider>
            <BlueprintProvider>
              <Outlet />
              <AppInit />
              <PageViewTracker />
            </BlueprintProvider>
          </BlockDBProvider>
        </LocaleProvider>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no",
      },
      { title: "Minecraft Dot" },
      {
        name: "description",
        content: "An application that can convert photos into Minecraft dots.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Minecraft Dot" },
      {
        property: "og:description",
        content: "An application that can convert photos into Minecraft dots.",
      },
      { property: "og:site_name", content: "Minecraft Dot" },
      { property: "og:url", content: "https://www.minecraft-dot.pictures/" },
    ],
    links: [
      { rel: "canonical", href: "https://www.minecraft-dot.pictures/" },
      { rel: "shortcut icon", href: "/assets/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
      },
    ],
    scripts: existsGaId
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
            defer: true,
          },
          {
            children: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          },
        ]
      : [],
  }),
});
