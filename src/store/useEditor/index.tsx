import { createContext, useState, useContext, ReactNode } from "react";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";

const EditorContext = createContext(
  {} as {
    setMainCanvas: (canvas: HTMLCanvasElement) => void;
    setMinecraftImage: (canvas: ImageData) => void;
    translate: (x: number, y: number) => void;
    render: () => void;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  const setMainCanvas = (canvas: HTMLCanvasElement) => {
    mainCanvas = canvas;
    mainCanvas.width = mainCanvasSize;
    mainCanvas.height = mainCanvasSize;
    mainCanvasContext = mainCanvas.getContext("2d")!;
    mainCanvasContext.imageSmoothingEnabled = false;
  };
  const setMinecraftImage = (image: ImageData) => {
    /* set image in bufferCanvas */
    minecraftImage = getBufferCanvas(image, image.width, image.height);
  };
  const mainCanvasSize = 2000;
  let minecraftImageX = 0;
  let minecraftImageY = 0;
  let magnification = 10;
  let mainCanvas: HTMLCanvasElement;
  let mainCanvasContext: CanvasRenderingContext2D;
  let minecraftImage: HTMLCanvasElement;

  const translate = (x: number, y: number) => {
    console.log("transate");
    console.log(minecraftImage);
    console.log(mainCanvas);
    minecraftImageX += x;
    minecraftImageY += y;
    render();
  };

  const render = () => {
    mainCanvasContext.clearRect(0, 0, mainCanvasSize, mainCanvasSize);
    mainCanvasContext.drawImage(
      minecraftImage,
      minecraftImageX,
      minecraftImageY,
      minecraftImage.width * magnification,
      minecraftImage.height * magnification
    );
  };

  const value = {
    setMainCanvas,
    setMinecraftImage,
    translate,
    render,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
