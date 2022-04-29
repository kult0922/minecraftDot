import { createContext, useState, useContext, ReactNode } from "react";

const EditorContext = createContext(
  {} as {
    minecraftImageX: number;
    minecraftImageY: number;
    magnification: number;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  let minecraftImageX = 0;
  let minecraftImageY = 0;
  let magnification = 0;

  const translation = (x: number, y: number) => {
    minecraftImageX += x;
    minecraftImageY += y;
  };

  const render = (canvasContext: CanvasRenderingContext2D, image: HTMLCanvasElement) => {
    canvasContext.drawImage(
      image,
      minecraftImageX,
      minecraftImageY,
      image.width * magnification,
      image.height * magnification
    );
  };

  const value = {
    minecraftImageX,
    minecraftImageY,
    magnification,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
