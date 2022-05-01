import { useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockImageContext } from "src/store/useBlockImage";
import { useBlueprintContext } from "src/store/useBlueprint";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";

const EditorBoard = () => {
  const { init, translate, zoomIn, zoomOut, showNaviBox, putBlock, clearNaviCanvas, pickBlock, render } =
    useEditorCanvasContext();
  const {
    mode,
    inkBlockJavaId,
    penSize,
    pressing,
    mouseX,
    mouseY,
    setMouseX,
    setMouseY,
    setPressing,
    setInkBlockJavaId,
  } = useEditorContext();
  const mainCanvas = useRef<HTMLCanvasElement>(null!);
  const naviCanvas = useRef<HTMLCanvasElement>(null!);
  const canvasContainer = useRef<HTMLDivElement>(null!);
  const { blueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockImageContext();

  useEffect(() => {
    /* generate image from blueprint and set to canvas */
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);
    /* setup canvas */
    init(mainCanvas.current, naviCanvas.current, minecraftImage, blueprint[0].length, blueprint.length);
    render();

    /* prevent zoon and scroll when zoom canvas */
    /* need to use addEventListener bacause react event function doesn't have passive pram */
    canvasContainer.current.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);

  const getCoordiante = (event: MouseEvent | WheelEvent | React.MouseEvent) => {
    const rect = mainCanvas.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / (rect.right - rect.left);
    const y = (event.clientY - rect.top) / (rect.bottom - rect.top);
    return { x, y };
  };

  const handleWheel = (event: React.WheelEvent) => {
    const { x, y } = getCoordiante(event);
    if (event.deltaY > 0) {
      zoomOut(x, y);
    } else {
      zoomIn(x, y);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { x, y } = getCoordiante(event);
    /* translate by drag */
    if (mode == "hand" && pressing) {
      canvasContainer.current.style.cursor = "grabbing";
      translate(x - mouseX, y - mouseY);
    }
    /* pen by drag */
    if (mode == "pen" && pressing) {
      putBlock(x, y, penSize, inkBlockJavaId);
    }
    /* show navi box by hover & drag */
    if (mode == "pen") {
      showNaviBox(x, y, penSize);
    }
    setMouseX(x);
    setMouseY(y);
  };
  const handleMouseDown = (event: React.MouseEvent) => {
    const { x, y } = getCoordiante(event);
    if (mode == "hand") canvasContainer.current.style.cursor = "grabbing";
    if (mode == "pen") putBlock(x, y, penSize, inkBlockJavaId);
    if (mode == "picker") {
      setInkBlockJavaId(pickBlock(x, y));
    }
    /* common processign when mouse click */
    setPressing(true);
    setMouseX(x);
    setMouseY(y);
  };
  const handleMouseUp = (event: React.MouseEvent) => {
    if (mode == "hand") canvasContainer.current.style.cursor = "grab";
    setPressing(false);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    clearNaviCanvas();
    setPressing(false);
  };
  const handleMouseEnter = (event: React.MouseEvent) => {
    if (mode == "hand") canvasContainer.current.style.cursor = "grab";
    if (mode == "pen") canvasContainer.current.style.cursor = "crosshair";
    if (mode == "bucket") canvasContainer.current.style.cursor = "cell";
    if (mode == "picker") canvasContainer.current.style.cursor = "nw-resize";
    if (mode == "zoomIn") canvasContainer.current.style.cursor = "zoom-in";
    if (mode == "zoomOut") canvasContainer.current.style.cursor = "zoom-out";
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          ref={canvasContainer}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => handleMouseUp(e)}
          onWheel={(e) => handleWheel(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          onMouseEnter={(e) => handleMouseEnter(e)}
          className="w-[70vw] h-[70vw] flex justify-center items-center relative border-2 
          bg-[url('/assets/canvasBack24.png')]"
        >
          <canvas id="main-canvas" ref={mainCanvas} className="w-[100%] absolute"></canvas>
          <canvas id="navi-canvas" ref={naviCanvas} className="w-[100%] absolute"></canvas>
        </div>
      </div>
    </>
  );
};

export default EditorBoard;
