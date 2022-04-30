import { createContext, useState, useContext, ReactNode } from "react";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";

const EditorContext = createContext(
  {} as {
    setMainCanvas: (canvas: HTMLCanvasElement) => void;
    setMinecraftImage: (canvas: ImageData) => void;
    translate: (x: number, y: number) => void;
    zoomIn: (x: number, y: number) => void;
    zoomOut: (x: number, y: number) => void;
    render: () => void;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  const mainCanvasSize = 2000;
  const zoomStep = 0.5;
  let minecraftImageX = 0;
  let minecraftImageY = 0;
  let minecraftImageWidth = 0;
  let minecraftImageHeight = 0;
  let magnification = 4;
  let mainCanvas: HTMLCanvasElement;
  let mainCanvasContext: CanvasRenderingContext2D;
  let minecraftImage: HTMLCanvasElement;

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

  const toPixelCoordinate = (x: number, y: number) => {
    const px = x * mainCanvasSize;
    const py = y * mainCanvasSize;
    return { px, py };
  };

  const translate = (x: number, y: number) => {
    const { px, py } = toPixelCoordinate(x, y);
    minecraftImageX += px;
    minecraftImageY += py;
    render();
  };

  const zoom = (px: number, py: number, isZoomOut: boolean) => {
    let zoomStep_ = zoomStep;
    if (isZoomOut) zoomStep_ *= -1;

    const minecraftImageTopLeftX = px - minecraftImageX;
    const minecraftImageTopLeftY = py - minecraftImageY;
    const deltaScale = (magnification + zoomStep_) / magnification;
    const deltaX = (deltaScale - 1) * minecraftImageTopLeftX;
    const deltaY = (deltaScale - 1) * minecraftImageTopLeftY;
    minecraftImageX -= deltaX;
    minecraftImageY -= deltaY;
    magnification += zoomStep_;
    render();
  };
  /* zoom in around (x, y) */
  const zoomIn = (x: number, y: number) => {
    if (magnification >= 16) return;
    const { px, py } = toPixelCoordinate(x, y);
    zoom(px, py, false);
  };
  /* zoom out around (x, y) */
  const zoomOut = (x: number, y: number) => {
    if (magnification <= 0.5) return;
    const { px, py } = toPixelCoordinate(x, y);
    zoom(px, py, true);
  };

  const render = () => {
    mainCanvasContext.clearRect(0, 0, mainCanvasSize, mainCanvasSize);
    minecraftImageWidth = minecraftImage.width * magnification;
    minecraftImageHeight = minecraftImage.height * magnification;
    mainCanvasContext.drawImage(
      minecraftImage,
      minecraftImageX,
      minecraftImageY,
      minecraftImageWidth,
      minecraftImageHeight
    );
  };

  const value = {
    setMainCanvas,
    setMinecraftImage,
    translate,
    render,
    zoomIn,
    zoomOut,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
