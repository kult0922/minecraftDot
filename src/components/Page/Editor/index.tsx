import { useContext, useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockImageContext } from "src/store/useBlockImage";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import { useEditorContext } from "src/store/useEditor";
import { Console } from "console";

const EditorComponent = () => {
  // 入力画像用のキャンバス
  const { setMainCanvas, setMinecraftImage, translate, zoomIn, zoomOut, render } = useEditorContext();
  const mainCanvas = useRef<HTMLCanvasElement>(null!);
  const { blueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockImageContext();
  let minecraftImageWidth: number;
  let minecraftImageHeight: number;
  /* translate prameter */
  let pressing = false;
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    /* generate image from blueprint and set to canvas */
    minecraftImageWidth = blueprint[0].length * 16;
    minecraftImageHeight = blueprint.length * 16;
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);
    /* setup main canvas */
    setMainCanvas(mainCanvas.current);
    setMinecraftImage(minecraftImage);
    render();
    /* zoom event */
    mainCanvas.current.addEventListener("wheel", (e) => handleWheel(e), { passive: false });

    /* translate event */
    mainCanvas.current.addEventListener("mouseup", () => {
      console.log("press false");
      pressing = false;
    });
    mainCanvas.current.addEventListener("mouseout", () => {
      console.log("press false");
      pressing = false;
    });
    mainCanvas.current.addEventListener("mousedown", (e) => handleMouseDown(e));
    mainCanvas.current.addEventListener("mousemove", (e) => handleMouseMove(e));
  }, []);

  const getCoordiante = (event: MouseEvent | WheelEvent) => {
    const rect = mainCanvas.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / (rect.right - rect.left);
    const y = (event.clientY - rect.top) / (rect.bottom - rect.top);
    return { x, y };
  };

  const left = () => {
    translate(-16, 0);
  };
  const right = () => {
    translate(16, 0);
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const { x, y } = getCoordiante(event);
    if (event.deltaY > 0) {
      zoomOut(x, y);
    } else {
      zoomIn(x, y);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    console.log("move", pressing);
    if (!pressing) return;
    const { x, y } = getCoordiante(event);
    console.log(x, y, mouseX, mouseY);
    translate(x - mouseX, y - mouseY);
    mouseX = x;
    mouseY = y;
  };
  const handleMouseDown = (event: MouseEvent) => {
    const { x, y } = getCoordiante(event);
    console.log("mouse down", x, y);
    mouseX = x;
    mouseY = y;
    pressing = true;
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
