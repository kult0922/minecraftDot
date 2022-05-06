import { useCallback, useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlueprintContext } from "src/store/useBlueprint";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";
import BlockNameLabel from "src/components/Atoms/BlockNameLabel";

const EditorBoard = () => {
  const {
    init,
    translate,
    bucket,
    zoomIn,
    zoomOut,
    showNaviBox,
    putBlock,
    clearNaviCanvas,
    pickBlock,
    render,
  } = useEditorCanvasContext();
  const {
    mode,
    inkBlockJavaId,
    hoverBlockJavaId,
    pressing,
    insideCanvas,
    mouseX,
    mouseY,
    updateMouseX,
    updateMouseY,
    setPressing,
    setInsideCanvas,
    setInkBlockJavaId,
    setHoverBlockJavaId,
    getPenSize,
  } = useEditorContext();
  const { blueprint } = useBlueprintContext();
  const { getBlockBasic, blockImageDataDict } = useBlockDBContext();

  const mainCanvas = useRef<HTMLCanvasElement>(null!);
  const naviCanvas = useRef<HTMLCanvasElement>(null!);
  const canvasContainer = useRef<HTMLDivElement>(null!);
  const blockNameLabel = useRef<HTMLDivElement>(null);

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
      zoomOut(x, y, true);
    } else {
      zoomIn(x, y, true);
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
      putBlock(x, y, getPenSize(), inkBlockJavaId);
    }
    /* show navi box by hover & drag */
    if (mode == "pen") {
      showNaviBox(x, y, getPenSize());
    }
    /* show picker preview */
    if (mode == "picker") {
      showNaviBox(x, y, 1);
      setHoverBlockJavaId(pickBlock(x, y));

      if (blockNameLabel.current != null) {
        const rect = mainCanvas.current.getBoundingClientRect();
        blockNameLabel.current.style.left = String(event.clientX - rect.left) + "px";
        blockNameLabel.current.style.top = String(event.clientY - rect.top) + "px";
      }
    }
    updateMouseX(x);
    updateMouseY(y);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const { x, y } = getCoordiante(event);
    if (mode == "hand") canvasContainer.current.style.cursor = "grabbing";
    if (mode == "pen") putBlock(x, y, getPenSize(), inkBlockJavaId);
    if (mode == "picker") setInkBlockJavaId(pickBlock(x, y));
    if (mode == "zoomIn") zoomIn(x, y, false);
    if (mode == "zoomOut") zoomOut(x, y, false);
    if (mode == "bucket") bucket(x, y, inkBlockJavaId);
    /* common processign when mouse click */
    setPressing(true);
    updateMouseX(x);
    updateMouseY(y);
  };
  const handleMouseUp = (event: React.MouseEvent) => {
    if (mode == "hand") canvasContainer.current.style.cursor = "grab";
    setPressing(false);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    clearNaviCanvas();
    setPressing(false);
    setInsideCanvas(false);
  };
  const handleMouseEnter = (event: React.MouseEvent) => {
    if (mode == "hand") canvasContainer.current.style.cursor = "grab";
    if (mode == "pen") canvasContainer.current.style.cursor = "crosshair";
    if (mode == "bucket") canvasContainer.current.style.cursor = "cell";
    if (mode == "picker") canvasContainer.current.style.cursor = "nw-resize";
    if (mode == "zoomIn") canvasContainer.current.style.cursor = "zoom-in";
    if (mode == "zoomOut") canvasContainer.current.style.cursor = "zoom-out";
    setInsideCanvas(true);
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

          {/* picker preview */}
          {mode === "picker" && insideCanvas && (
            <div ref={blockNameLabel} className="z-[100] absolute">
              <BlockNameLabel blockBasic={getBlockBasic(hoverBlockJavaId)}></BlockNameLabel>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditorBoard;
