import { createContext, useState, useContext, ReactNode } from "react";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";

const EditorContext = createContext(
  {} as {
    init: (
      mainCanvas_: HTMLCanvasElement,
      naviCanvas_: HTMLCanvasElement,
      canvas: ImageData,
      widthBlockNumber_: number,
      heightBlockNumber_: number
    ) => void;
    translate: (x: number, y: number) => void;
    zoomIn: (x: number, y: number) => void;
    zoomOut: (x: number, y: number) => void;
    showNaviBox: (x: number, y: number) => void;
    render: () => void;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  const canvasSize = 2000;
  const zoomStep = 0.5;
  let minecraftImageX = 0;
  let minecraftImageY = 0;
  let minecraftImageWidth = 0;
  let minecraftImageHeight = 0;
  let magnification = 4;
  let widthBlockNumber = 0;
  let heightBlockNumber = 0;
  let mainCanvas: HTMLCanvasElement;
  let naviCanvas: HTMLCanvasElement;
  let mainCanvasContext: CanvasRenderingContext2D;
  let naviCanvasContext: CanvasRenderingContext2D;
  let minecraftImage: HTMLCanvasElement;

  const init = (
    mainCanvas_: HTMLCanvasElement,
    naviCanvas_: HTMLCanvasElement,
    image: ImageData,
    widthBlockNumber_: number,
    heightBlockNumber_: number
  ) => {
    mainCanvas = mainCanvas_;
    naviCanvas = naviCanvas_;

    mainCanvasContext = mainCanvas.getContext("2d")!;
    naviCanvasContext = naviCanvas.getContext("2d")!;

    /* canvas preference */
    mainCanvas.width = canvasSize;
    mainCanvas.height = canvasSize;
    naviCanvas.width = canvasSize;
    naviCanvas.height = canvasSize;
    mainCanvasContext.imageSmoothingEnabled = false;
    naviCanvasContext.imageSmoothingEnabled = false;
    naviCanvasContext.lineWidth = 6;

    /* iamge set */
    minecraftImage = getBufferCanvas(image, image.width, image.height);
    /* block number */
    widthBlockNumber = widthBlockNumber_;
    heightBlockNumber = heightBlockNumber_;
  };

  const toPixelCoordinate = (x: number, y: number) => {
    const px = x * canvasSize;
    const py = y * canvasSize;
    return { px, py };
  };

  const showNaviBox = (x: number, y: number) => {
    naviCanvasContext.clearRect(0, 0, canvasSize, canvasSize);
    const { px, py } = toPixelCoordinate(x, y);
    const blockSize = minecraftImageWidth / widthBlockNumber;
    const dx = px - minecraftImageX;
    const dy = py - minecraftImageY;
    const blockX = Math.floor(dx / blockSize);
    const blockY = Math.floor(dy / blockSize);
    const naviRectX = minecraftImageX + blockX * blockSize;
    const naviRectY = minecraftImageY + blockY * blockSize;
    naviCanvasContext.strokeRect(naviRectX, naviRectY, blockSize, blockSize);
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
    mainCanvasContext.clearRect(0, 0, canvasSize, canvasSize);
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
    init,
    translate,
    render,
    zoomIn,
    zoomOut,
    showNaviBox,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
