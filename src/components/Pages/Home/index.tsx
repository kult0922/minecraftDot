/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import generateBlueprint from "src/functions/ImageTrans/generateBluePrint";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import loadImage from "src/functions/utils/loadImage";
import { useBlockDBContext } from "src/store/useBlockDB";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/utils/getContext";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";
import PreviewModal from "src/components/Organisms/PreviewModal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "7px",
    marginRight: "-50%",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
  },
};

const HomeComponent = () => {
  const initBlockUseFlag = () => {
    const blockUseFlag = new Map<string, Boolean>();
    for (const blockBasic of blockDB) {
      if (blockBasic.blockGroup == "air") continue;
      blockUseFlag.set(blockBasic.javaId, true);
      const array = blockGroupMap.get(blockBasic.blockGroup);
      if (array == undefined) {
        blockGroupMap.set(blockBasic.blockGroup, [blockBasic]);
      } else {
        array.push(blockBasic);
      }
    }
    return blockUseFlag;
  };
  const srcImageWidth = 256;
  const srcImageHeight = 256;
  const blockGroupMap = new Map<string, Array<BlockBasic>>();
  const canvasInRef = useRef(null);
  const { blockDB } = useBlockDBContext();
  const { blockImageDataDict } = useBlockDBContext();

  const [srcImage, setSrc] = useState<ImageData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outSize, setOutSize] = useState(16);
  const [blueprint, setBlueprint] = useState<string[][]>([]);
  const [blockUseFlag, setBlockUseFlag] = useState(initBlockUseFlag());

  /* src image load */
  useEffect(() => {
    const ctxIn = getContext(canvasInRef.current, srcImageWidth, srcImageHeight);
    ctxIn.imageSmoothingEnabled = false;
    (async () => {
      const image = await loadImage("/assets/mokuro_256.png");
      ctxIn.drawImage(image, 0, 0);
      setSrc(ctxIn.getImageData(0, 0, srcImageWidth, srcImageHeight));
    })();
  }, []);

  const handleTransform = () => {
    if (srcImage === undefined) return;
    const useBlockImageDataDict = new Map<string, BlockImageData>();
    for (let [jabaId, blockImageData] of blockImageDataDict) {
      if (blockUseFlag.get(jabaId)) useBlockImageDataDict.set(jabaId, blockImageData);
    }

    setBlueprint(generateBlueprint(srcImage, outSize, outSize, useBlockImageDataDict));
    setIsModalOpen(true);
  };

  const handleBlockClick = (javaId: string) => {
    const beforeState = blockUseFlag.get(javaId);
    setBlockUseFlag((map) => new Map(map.set(javaId, !beforeState)));
    blockUseFlag.set(javaId, false);
  };

  return (
    <>
      <div className="flex justify-center m-4">
        <button onClick={handleTransform}>transform</button>
      </div>
      <div className="flex justify-center m-4">
        size:
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setOutSize(Number(event.target.value));
          }}
          type="text"
          className="border-2"
        />
      </div>
      <div className="flex justify-center">
        <div className="border-2">
          <canvas id="canvas-in" ref={canvasInRef}></canvas>
        </div>
      </div>

      {Array.from(blockGroupMap).map((row) => (
        <div key={"palatte-row-" + row[0]}>
          {row[1].map((column) => (
            <label htmlFor={column.javaId} className="" key={column.javaId + "label"}>
              <input
                type="radio"
                id={column.javaId}
                onChange={() => {}}
                checked={(blockUseFlag.get(column.javaId) as boolean) || false}
                className="hidden peer"
              />

              <img
                className="inline cursor-pointer rendering-pixelated m-[2px] p-[0px] border-[4px] border-transparent peer-checked:border-slate-400"
                src={column.imagePath}
                alt="paletteBlock"
                width={32}
                key={column.javaId}
                onClick={() => handleBlockClick(column.javaId)}
              ></img>
            </label>
          ))}
        </div>
      ))}

      <PreviewModal blueprint={blueprint} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default HomeComponent;
