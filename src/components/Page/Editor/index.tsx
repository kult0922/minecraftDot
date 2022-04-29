import { useContext, useEffect, useRef, useState } from "react";
import generateBlueprint from "src/functions/ImageTrans/generateBluePrint";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import loadImage from "src/functions/utils/loadImage";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useBlockImageContext } from "src/store/useBlockImage";
import Modal from "react-modal";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/utils/getContext";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";

/* 
useEditorをつくってそこで座標や倍率を管理する
 */

const EditorComponent = () => {
  // 入力画像用のキャンバス
  const mainCanvas = useRef(null!);
  const { blueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockImageContext();
  let bufferCanvas: HTMLCanvasElement;
  let mainCanvasContext: CanvasRenderingContext2D;
  let minecraftImageWidth: number;
  let minecraftImageHeight: number;
  const mainCanvasWidth = 2000;
  const mainCanvasHeight = 2000;
  /* image editor parameter */
  let magnification = 4;
  let minecraftImageX = 0;
  let minecraftImageY = 0;

  useEffect(() => {
    /* generate image from blueprint and set to canvas */
    minecraftImageWidth = blueprint[0].length * 16;
    minecraftImageHeight = blueprint.length * 16;
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);

    /* set image in bufferCanvas */
    bufferCanvas = getBufferCanvas(minecraftImage, minecraftImageWidth, minecraftImageHeight);

    /* set image to mainCanvas */
    mainCanvasContext = getContext(mainCanvas.current, mainCanvasWidth, mainCanvasHeight);
    mainCanvasContext.drawImage(
      bufferCanvas,
      0,
      0,
      minecraftImageWidth * magnification,
      minecraftImageHeight * magnification
    );
  }, []);

  const left = () => {
    mainCanvasContext.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
    minecraftImageX -= 16;
    mainCanvasContext.drawImage(
      bufferCanvas,
      minecraftImageX,
      0,
      minecraftImageWidth * magnification,
      minecraftImageHeight * magnification
    );
  };
  const right = () => {
    mainCanvasContext.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
    minecraftImageX += 16;
    mainCanvasContext.drawImage(
      bufferCanvas,
      minecraftImageX,
      0,
      minecraftImageWidth * magnification,
      minecraftImageHeight * magnification
    );
  };

  const zoomIn = () => {
    mainCanvasContext.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
    minecraftImageX -= 16;
    mainCanvasContext.drawImage(
      bufferCanvas,
      minecraftImageX,
      0,
      minecraftImageWidth * magnification,
      minecraftImageHeight * magnification
    );
  };
  const zoomOut = () => {
    mainCanvasContext.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
    minecraftImageX += 16;
    mainCanvasContext.drawImage(
      bufferCanvas,
      minecraftImageX,
      0,
      minecraftImageWidth * magnification,
      minecraftImageHeight * magnification
    );
  };

  return (
    <>
      <div className="flex justify-center m-4">
        <button onClick={left} className="m-2 text-xl">
          {"<"}
        </button>
        <button onClick={right} className="m-2 text-xl">
          {">"}
        </button>
      </div>

      <div className="flex justify-center m-4">
        <button onClick={zoomIn} className="m-2 text-xl">
          {"+"}
        </button>
        <button onClick={zoomOut} className="m-2 text-xl">
          {"-"}
        </button>
      </div>

      <div className="text-xl text-center">Editor</div>

      <div className="flex justify-center">
        <div className="w-[50vw] flex justify-center">
          <canvas id="main-canvas" ref={mainCanvas} className="w-[95%] border-2"></canvas>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/">
          <a>Back</a>
        </Link>
      </div>
    </>
  );
};

export default EditorComponent;
