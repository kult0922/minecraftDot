import { Console } from "console";
import { createContext, useState, useContext, ReactNode } from "react";
import getSameBlockCoordinates from "src/functions/ImageTrans/getSameBlockCoordinates";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";
import { useBlockDBContext } from "../useBlockDB";
import { useBlueprintContext } from "../useBlueprint";

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
    zoomIn: (x: number, y: number, isWheel: boolean) => void;
    zoomOut: (x: number, y: number, isWheel: boolean) => void;
    showNaviBox: (x: number, y: number, size: number) => void;
    putBlock: (x: number, y: number, size: number, javaId: string) => void;
    bucket: (x: number, y: number, javaId: string) => void;
    pickBlock: (x: number, y: number) => string;
    clearNaviCanvas: () => void;
    render: () => void;
  }
);

export function useEditorCanvasContext() {
  return useContext(EditorCanvasContext);
}

export function EditorCanvasProvider({ children }: { children?: ReactNode }) {
  const canvasSize = 1000;
  const zoomStepByWheel = 0.5;
  const zoomStepByButton = 1.5;
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
  const { blueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockDBContext();

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

    return { blockX, blockY, blockSize };
  };

  const clearNaviCanvas = () => {
    naviCanvasContext.clearRect(0, 0, canvasSize, canvasSize);
  };

  const showNaviBox = (x: number, y: number, size: number) => {
    clearNaviCanvas();
    const { blockX, blockY, blockSize } = getBlockCoordinate(x, y);

    const beginBlockX = blockX - Math.floor(size / 2);
    const beginBlockY = blockY - Math.floor(size / 2);
    const rectX = minecraftImageX + beginBlockX * blockSize;
    const rectY = minecraftImageY + beginBlockY * blockSize;

    naviCanvasContext.strokeStyle = "#000";
    naviCanvasContext.strokeRect(rectX, rectY, blockSize * size, blockSize * size);
    naviCanvasContext.strokeStyle = "#fff";
    naviCanvasContext.strokeRect(rectX - 5, rectY - 5, blockSize * size + 10, blockSize * size + 10);
  };

  const putBlock = (x: number, y: number, size: number, javaId: string) => {
    const { blockX, blockY } = getBlockCoordinate(x, y);

    const beginX = blockX - Math.floor(size / 2);
    const endX = blockX + Math.floor(size / 2);
    const beginY = blockY - Math.floor(size / 2);
    const endY = blockY + Math.floor(size / 2);

    for (let i = beginX; i <= endX; i++) {
      for (let j = beginY; j <= endY; j++) {
        /* change canvas data */
        minecraftImageContext.putImageData(blockImageDataDict.get(javaId)?.imageData!, i * 16, j * 16);
        /* change blueprint */
        blueprint[j][i] = javaId;
      }
    }

    render();
  };

  const pickBlock = (x: number, y: number): string => {
    const { blockX, blockY } = getBlockCoordinate(x, y);
    if (blockX < 0 || blueprint[0].length <= blockX) return "not_found";
    if (blockY < 0 || blueprint.length <= blockY) return "not_found";
    return blueprint[blockY][blockX];
  };

  const translate = (x: number, y: number) => {
    const { px, py } = toPixelCoordinate(x, y);
    minecraftImageX += px;
    minecraftImageY += py;
    render();
  };

  const bucket = (x: number, y: number, javaId: string) => {
    const { blockX, blockY } = getBlockCoordinate(x, y);
    if (blockX < 0 || blueprint[0].length <= blockX) return;
    if (blockY < 0 || blueprint.length <= blockY) return;
    const coordinates = getSameBlockCoordinates(blockX, blockY, blueprint);
    // ここをあとで実装
    for (const coordinate of coordinates) {
      /* change canvas data */
      minecraftImageContext.putImageData(
        blockImageDataDict.get(javaId)?.imageData!,
        coordinate.x * 16,
        coordinate.y * 16
      );
      /* change blueprint */
      blueprint[coordinate.y][coordinate.x] = javaId;
    }

    render();
  };

  const zoom = (px: number, py: number, zoomStep: number, isZoomOut: boolean) => {
    if (isZoomOut) zoomStep *= -1;

    const minecraftImageTopLeftX = px - minecraftImageX;
    const minecraftImageTopLeftY = py - minecraftImageY;
    const deltaScale = (magnification + zoomStep) / magnification;
    const deltaX = (deltaScale - 1) * minecraftImageTopLeftX;
    const deltaY = (deltaScale - 1) * minecraftImageTopLeftY;
    minecraftImageX -= deltaX;
    minecraftImageY -= deltaY;
    magnification += zoomStep;
    render();
  };
  /* zoom in around (x, y) */
  const zoomIn = (x: number, y: number, isWheel: boolean) => {
    if (magnification >= 16) return;
    let zoomStep = zoomStepByButton;
    if (isWheel) zoomStep = zoomStepByWheel;
    if (magnification <= 1) zoomStep = 0.04;
    const { px, py } = toPixelCoordinate(x, y);
    zoom(px, py, zoomStep, false);
  };
  /* zoom out around (x, y) */
  const zoomOut = (x: number, y: number, isWheel: boolean) => {
    let zoomStep = zoomStepByButton;
    if (isWheel) zoomStep = zoomStepByWheel;
    /* change zoom step when magnification is small */
    if (magnification <= 1) zoomStep = 0.04;
    /* stop zoom out when image size is half of canvas */
    if ((magnification - zoomStep) * minecraftImage.width < canvasSize / 2) return;

    const { px, py } = toPixelCoordinate(x, y);
    zoom(px, py, zoomStep, true);
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
    bucket,
    render,
    zoomIn,
    zoomOut,
    pickBlock,
    showNaviBox,
    putBlock,
    clearNaviCanvas,
  };

  return <EditorCanvasContext.Provider value={value}>{children}</EditorCanvasContext.Provider>;
}
