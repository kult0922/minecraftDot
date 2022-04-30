import { createContext, useState, useContext, ReactNode } from "react";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";
import { useBlockImageContext } from "../useBlockImage";

const EditorCanvasContext = createContext(
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
    putBlock: (x: number, y: number, javaId: string) => void;
    render: () => void;
  }
);

export function useEditorCanvasContext() {
  return useContext(EditorCanvasContext);
}

export function EditorCanvasProvider({ children }: { children?: ReactNode }) {
  const canvasSize = 1000;
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
  let minecraftImageContext: CanvasRenderingContext2D;
  const { blockImageDataDict } = useBlockImageContext();

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
    naviCanvasContext.lineWidth = 4;

    /* iamge set */
    minecraftImage = getBufferCanvas(image, image.width, image.height);
    minecraftImageContext = minecraftImage.getContext("2d")!;
    /* block number */
    widthBlockNumber = widthBlockNumber_;
    heightBlockNumber = heightBlockNumber_;
  };

  const toPixelCoordinate = (x: number, y: number) => {
    const px = x * canvasSize;
    const py = y * canvasSize;
    return { px, py };
  };

  const getBlockCoordinate = (x: number, y: number) => {
    const { px, py } = toPixelCoordinate(x, y);
    const blockSize = minecraftImageWidth / widthBlockNumber;
    const dx = px - minecraftImageX;
    const dy = py - minecraftImageY;
    const blockX = Math.floor(dx / blockSize);
    const blockY = Math.floor(dy / blockSize);
    const rectX = minecraftImageX + blockX * blockSize;
    const rectY = minecraftImageY + blockY * blockSize;

    return { rectX, rectY, blockSize };
  };

  const showNaviBox = (x: number, y: number) => {
    naviCanvasContext.clearRect(0, 0, canvasSize, canvasSize);
    const { rectX, rectY, blockSize } = getBlockCoordinate(x, y);
    naviCanvasContext.strokeStyle = "#000";
    naviCanvasContext.strokeRect(rectX, rectY, blockSize, blockSize);
    naviCanvasContext.strokeStyle = "#fff";
    naviCanvasContext.strokeRect(rectX - 5, rectY - 5, blockSize + 10, blockSize + 10);
  };

  const translate = (x: number, y: number) => {
    const { px, py } = toPixelCoordinate(x, y);
    minecraftImageX += px;
    minecraftImageY += py;
    render();
  };

  const putBlock = (x: number, y: number, javaId: string) => {
    const { px, py } = toPixelCoordinate(x, y);
    const blockSize = minecraftImageWidth / widthBlockNumber;
    const dx = px - minecraftImageX;
    const dy = py - minecraftImageY;
    const blockX = Math.floor(dx / blockSize);
    const blockY = Math.floor(dy / blockSize);
    const rectX = blockX * 16;
    const rectY = blockY * 16;

    minecraftImageContext.clearRect(rectX, rectY, 16, 16);
    minecraftImageContext.putImageData(blockImageDataDict.get(javaId)?.imageData!, rectX, rectY);
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
    putBlock,
  };

  return <EditorCanvasContext.Provider value={value}>{children}</EditorCanvasContext.Provider>;
}
