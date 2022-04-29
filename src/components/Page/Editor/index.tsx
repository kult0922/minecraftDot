import { useContext, useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockImageContext } from "src/store/useBlockImage";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import { useEditorContext } from "src/store/useEditor";

const EditorComponent = () => {
  // 入力画像用のキャンバス
  const { setMainCanvas, setMinecraftImage, translate, render } = useEditorContext();
  const mainCanvas = useRef(null!);
  const { blueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockImageContext();
  let minecraftImageWidth: number;
  let minecraftImageHeight: number;

  useEffect(() => {
    /* generate image from blueprint and set to canvas */
    minecraftImageWidth = blueprint[0].length * 16;
    minecraftImageHeight = blueprint.length * 16;
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);
    /* setup main canvas */
    setMainCanvas(mainCanvas.current);
    setMinecraftImage(minecraftImage);
    render();
  }, []);

  const left = () => {};
  const right = () => {};

  const zoomIn = () => {};
  const zoomOut = () => {};

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
