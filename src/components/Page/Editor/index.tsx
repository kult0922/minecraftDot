import { useContext, useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockImageContext } from "src/store/useBlockImage";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import { useEditorContext } from "src/store/useEditor";

const EditorComponent = () => {
  // 入力画像用のキャンバス
  const { init, translate, zoomIn, zoomOut, showNaviBox, render } = useEditorContext();
  const mainCanvas = useRef<HTMLCanvasElement>(null!);
  const naviCanvas = useRef<HTMLCanvasElement>(null!);
  const canvasContainer = useRef<HTMLDivElement>(null!);
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
    /* setup canvas */
    init(mainCanvas.current, naviCanvas.current, minecraftImage, blueprint[0].length, blueprint.length);
    render();
    /* zoom event */
    canvasContainer.current.addEventListener("wheel", (e) => handleWheel(e), { passive: false });

    /* translate event */
    canvasContainer.current.addEventListener("mouseup", () => {
      pressing = false;
    });
    canvasContainer.current.addEventListener("mouseout", () => {
      pressing = false;
    });
    canvasContainer.current.addEventListener("mousedown", (e) => handleMouseDown(e));
    canvasContainer.current.addEventListener("mousemove", (e) => handleMouseMove(e));
  }, []);

  const getCoordiante = (event: MouseEvent | WheelEvent) => {
    const rect = mainCanvas.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / (rect.right - rect.left);
    const y = (event.clientY - rect.top) / (rect.bottom - rect.top);
    return { x, y };
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
    const { x, y } = getCoordiante(event);
    if (pressing) {
      translate(x - mouseX, y - mouseY);
      mouseX = x;
      mouseY = y;
    }
    if (!pressing) {
      showNaviBox(x, y);
    }
  };
  const handleMouseDown = (event: MouseEvent) => {
    const { x, y } = getCoordiante(event);
    mouseX = x;
    mouseY = y;
    pressing = true;
  };

  return (
    <>
      <div className="text-xl text-center">Editor</div>
      <div className="flex justify-center">
        <div
          ref={canvasContainer}
          className="w-[50vw] h-[50vw] flex justify-center items-center relative border-2"
        >
          <canvas id="main-canvas" ref={mainCanvas} className="w-[100%] absolute"></canvas>
          <canvas id="navi-canvas" ref={naviCanvas} className="w-[100%] absolute"></canvas>
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
