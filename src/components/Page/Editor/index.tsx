import { useContext, useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockImageContext } from "src/store/useBlockImage";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import { useBlockDBContext } from "src/store/useBlockDB";

type Mode = "translate" | "pen";

const EditorComponent = () => {
  // 入力画像用のキャンバス
  const { init, translate, zoomIn, zoomOut, showNaviBox, putBlock, render } = useEditorCanvasContext();
  const mainCanvas = useRef<HTMLCanvasElement>(null!);
  const naviCanvas = useRef<HTMLCanvasElement>(null!);
  const canvasContainer = useRef<HTMLDivElement>(null!);
  const { blueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockImageContext();
  const { getBlockBasic } = useBlockDBContext();
  /* tool */
  const [mode, setMode] = useState<Mode>("pen");
  const [inkBlockJavaId, setInkBlockJavaId] = useState("minecraft:white_wool");
  const [penSize, setPenSize] = useState(3);
  /* translate prameter */
  /* can't use useState() for these parameters */
  let pressing = false;
  let mouseX = 0;
  let mouseY = 0;

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
    if (mode == "translate" && pressing) {
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
    mouseX = x;
    mouseY = y;
  };
  const handleMouseDown = (event: React.MouseEvent) => {
    const { x, y } = getCoordiante(event);
    if (mode == "pen") {
      putBlock(x, y, penSize, inkBlockJavaId);
    }
    mouseX = x;
    mouseY = y;
    pressing = true;
  };
  const handleMouseUp = (event: React.MouseEvent) => {
    pressing = false;
  };

  return (
    <>
      <div className="text-xl text-center">Editor</div>
      img <img src={getBlockBasic(inkBlockJavaId).imagePath}></img>
      mode: {mode}
      <label>
        <input
          type="radio"
          value="pen"
          onChange={(e) => setMode(e.target.value as Mode)}
          checked={mode === "pen"}
        />
        pen
      </label>
      <label>
        <input
          type="radio"
          value="translate"
          onChange={(e) => setMode(e.target.value as Mode)}
          checked={mode === "translate"}
        />
        move
      </label>
      <div className="flex justify-center">
        <div
          ref={canvasContainer}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => handleMouseUp(e)}
          onWheel={(e) => handleWheel(e)}
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
