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
import BlockButton from "src/components/Atoms/BlockButton";
import { group } from "console";
// import resizeImageData from "src/functions/ImageTrans/resizeImageData";
import resizeImageData from "resize-image-data";

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

  const initGroupButtonFlag = () => {
    const groupButtonFlag = new Map<string, Boolean>();
    for (const blockBasic of blockDB) {
      if (blockBasic.blockGroup == "air") continue;
      groupButtonFlag.set(blockBasic.blockGroup, true);
    }
    return groupButtonFlag;
  };

  const srcImageWidth = 256;
  const srcImageHeight = 366;
  const blockGroupMap = new Map<string, Array<BlockBasic>>();
  const canvasInRef = useRef(null);
  const { blockDB } = useBlockDBContext();
  const { blockImageDataDict } = useBlockDBContext();

  const [srcImage, setSrc] = useState<ImageData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outSize, setOutSize] = useState(64);
  const [blueprint, setBlueprint] = useState<string[][]>([]);
  const [blockUseFlag, setBlockUseFlag] = useState(initBlockUseFlag());
  const [groupButtonFlag, setGroupButtonFlag] = useState(initGroupButtonFlag);

  /* src image load */
  useEffect(() => {
    const ctxIn = getContext(canvasInRef.current, srcImageWidth, srcImageHeight);
    ctxIn.imageSmoothingEnabled = false;
    (async () => {
      const image = await loadImage("/assets/shinju_256.jpeg");
      ctxIn.drawImage(image, 0, 0);
      setSrc(ctxIn.getImageData(0, 0, srcImageWidth, srcImageHeight));
    })();
  }, []);

  const handleTransform = async () => {
    if (srcImage === undefined) return;
    const useBlockImageDataDict = new Map<string, BlockImageData>();
    for (let [jabaId, blockImageData] of blockImageDataDict) {
      if (blockUseFlag.get(jabaId)) useBlockImageDataDict.set(jabaId, blockImageData);
    }

    // need to refactor
    const height = Math.floor(srcImage.height * (outSize / srcImage.width));
    const resizedImage = resizeImageData(srcImage, outSize, height, "nearest-neighbor");

    setBlueprint(generateBlueprint(resizedImage!, outSize, height, useBlockImageDataDict));
    setIsModalOpen(true);
  };

  const handleBlockClick = (javaId: string) => {
    const beforeState = blockUseFlag.get(javaId);
    setBlockUseFlag((map) => new Map(map.set(javaId, !beforeState)));
  };

  const changeUseFlagByGroup = (group: string, state: boolean) => {
    for (const blockBasic of blockGroupMap.get(group)!) {
      setBlockUseFlag((map) => new Map(map.set(blockBasic.javaId, state)));
    }
  };

  const handleGroupButtonClick = (group: string) => {
    const beforeState = groupButtonFlag.get(group);
    changeUseFlagByGroup(group, !beforeState);
    setGroupButtonFlag((map) => new Map(map.set(group, !beforeState)));
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
          defaultValue={64}
          type="number"
          className="border-2"
        />
      </div>
      <div className="flex justify-center">
        <div className="border-2">
          <canvas id="canvas-in" ref={canvasInRef}></canvas>
        </div>
      </div>
      <div className="flex justify-center m-2">ブロックを選択</div>
      <div className="flex justify-center">
        <div className="">
          {Array.from(blockGroupMap).map((blockGroup) => (
            <div className="flex justify-start items-center" key={"select-block-row-" + blockGroup[0]}>
              <label htmlFor={blockGroup[0]} className="">
                <input
                  type="checkbox"
                  id={blockGroup[0]}
                  onChange={() => handleGroupButtonClick(blockGroup[0])}
                  checked={(groupButtonFlag.get(blockGroup[0]) as boolean) || false}
                  // className="hidden peer"
                  className="peer"
                />
              </label>
              {blockGroup[1].map((blockBasic) => (
                <BlockButton
                  key={"select-block-button-" + blockBasic.javaId}
                  checked={(blockUseFlag.get(blockBasic.javaId) as boolean) || false}
                  handleBlockClick={handleBlockClick}
                  blockBasic={blockBasic}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <PreviewModal blueprint={blueprint} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default HomeComponent;
