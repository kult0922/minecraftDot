import { createContext, useContext, ReactNode } from "react";
import geenrateImageFromBlueprint from "src/components/Pages/Home/functions/generateImageFromBlueprint";
import getSameBlockCoordinates from "src/hooks/useEditorCanvas/functions/getSameBlockCoordinates";
import getTargetCoordinates from "src/hooks/useEditorCanvas/functions/getTargetCoordinates";
import getBufferCanvas from "src/functions/getBufferCanvas";
import { useBlockDBContext } from "../useBlockDB";
import { useHistoryContext } from "../useHistory";

const EditorCanvasContext = createContext(
  {} as {
    init: (
      mainCanvas_: HTMLCanvasElement,
      naviCanvas_: HTMLCanvasElement,
      canvas: ImageData,
      widthBlockNumber_: number,
      heightBlockNumber_: number,
      blueprint_: string[][]
    ) => void;
    getBlueprint: () => string[][];
    getMinecraftImage: () => HTMLCanvasElement;
    translate: (x: number, y: number) => void;
    zoomIn: (x: number, y: number, isWheel: boolean) => void;
    zoomOut: (x: number, y: number, isWheel: boolean) => void;
    showNaviBox: (x: number, y: number, size: number) => void;
    putBlock: (x: number, y: number, size: number, javaId: string) => void;
    bucket: (x: number, y: number, javaId: string) => void;
    replace: (from: string, to: string) => void;
    pickBlock: (x: number, y: number) => string | undefined;
    undo: () => void;
    redo: () => void;
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
  let longerEdge = 0;
  let magnification = 0.5;
  let widthBlockNumber = 0;
  let heightBlockNumber = 0;
  let mainCanvas: HTMLCanvasElement;
  let naviCanvas: HTMLCanvasElement;
  let mainCanvasContext: CanvasRenderingContext2D;
  let naviCanvasContext: CanvasRenderingContext2D;
  let minecraftImage: HTMLCanvasElement;
  let minecraftImageContext: CanvasRenderingContext2D;
  const { blockImageDataDict } = useBlockDBContext();
  const { backward, forward, addHistory } = useHistoryContext();
  let blueprint: Array<Array<string>> = [];

  console.log("EditorCanvasProvider render");

  const init = (
    mainCanvas_: HTMLCanvasElement,
    naviCanvas_: HTMLCanvasElement,
    image: ImageData,
    widthBlockNumber_: number,
    heightBlockNumber_: number,
    blueprint_: Array<Array<string>>
  ) => {
    console.log("EditorCanvasProvider init");
    blueprint = blueprint_;
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

    /* minecraft image initial size and position */
    longerEdge = minecraftImage.width > minecraftImage.height ? minecraftImage.width : minecraftImage.height;
    minecraftImageX = canvasSize / 6;
    minecraftImageY = canvasSize / 6;
    magnification = ((canvasSize / longerEdge) * 2) / 3;

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

  const insideBlueprint = (i: number, j: number, blueprint: string[][]) => {
    if (i < 0 || i >= blueprint.length) return false;
    if (j < 0 || j >= blueprint[0].length) return false;

    return true;
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

    for (let i = beginY; i <= endY; i++) {
      for (let j = beginX; j <= endX; j++) {
        if (insideBlueprint(i, j, blueprint)) {
          /* change canvas data */
          minecraftImageContext.putImageData(blockImageDataDict.get(javaId)?.imageData!, j * 16, i * 16);
          /* change blueprint */
          blueprint[i][j] = javaId;
        }
      }
    }

    render();
  };

  const pickBlock = (x: number, y: number): string | undefined => {
    const { blockX, blockY } = getBlockCoordinate(x, y);
    if (!insideBlueprint(blockY, blockX, blueprint)) return;
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
    if (!insideBlueprint(blockY, blockX, blueprint)) return;
    const coordinates = getSameBlockCoordinates(blockX, blockY, blueprint);
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

  const replace = (from: string, to: string) => {
    const coordinates = getTargetCoordinates(from, blueprint);

    for (const coordinate of coordinates) {
      /* change canvas data */
      minecraftImageContext.putImageData(
        blockImageDataDict.get(to)?.imageData!,
        coordinate.x * 16,
        coordinate.y * 16
      );
      /* change blueprint */
      blueprint[coordinate.y][coordinate.x] = to;
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
    if ((magnification - zoomStep) * longerEdge < canvasSize / 2) return;

    const { px, py } = toPixelCoordinate(x, y);
    zoom(px, py, zoomStep, true);
  };

  const getBlueprint = () => {
    return blueprint;
  };

  const getMinecraftImage = () => {
    return minecraftImage;
  };

  const undo = () => {
    const b = backward();
    if (b === undefined) return;
    const image = geenrateImageFromBlueprint(b, blockImageDataDict);
    minecraftImageContext.putImageData(image, 0, 0);
    blueprint = b;
    render();
  };

  const redo = () => {
    const b = forward();
    if (b === undefined) return;
    const image = geenrateImageFromBlueprint(b, blockImageDataDict);
    minecraftImageContext.putImageData(image, 0, 0);
    blueprint = b;
    render();
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
    getMinecraftImage,
    getBlueprint,
    init,
    translate,
    bucket,
    replace,
    render,
    zoomIn,
    zoomOut,
    pickBlock,
    showNaviBox,
    putBlock,
    clearNaviCanvas,
    undo,
    redo,
  };

  return <EditorCanvasContext.Provider value={value}>{children}</EditorCanvasContext.Provider>;
}
