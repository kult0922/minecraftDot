import { useRef, useState } from "react";
import generateBlueprint from "src/components/Pages/Home/functions/generateBluePrint";
import { useBlockDBContext } from "src/store/useBlockDB";
import getContext from "src/functions/getContext";
import PreviewModal from "src/components/Pages/Home/components/PreviewModal";
import BlockButton from "src/components/Common/BlockButton";
import resizeImageData from "resize-image-data";
import loadImageFromFile from "src/components/Pages/Home/functions/loadImageFromFile";
import CommandModal from "src/components/Common/CommandModal";
import { useLocale } from "src/i18n/useLocale";

const ImageConverter = () => {
  const { t } = useLocale();
  const defaultUseBlockGroup = ["wool", "concrete", "terracotta", "stone", "soil", "wood", "jewel"];

  const initBlockUseFlag = (defaultUseBlockGroup: string[]) => {
    const blockUseFlag = new Map<string, Boolean>();
    for (const blockBasic of blockDB) {
      if (blockBasic.blockGroup == "air") continue;
      blockUseFlag.set(blockBasic.javaId, defaultUseBlockGroup.includes(blockBasic.blockGroup));
      const array = blockGroupMap.get(blockBasic.blockGroup);
      if (array == undefined) {
        blockGroupMap.set(blockBasic.blockGroup, [blockBasic]);
      } else {
        array.push(blockBasic);
      }
    }
    return blockUseFlag;
  };

  const initGroupButtonFlag = (defaultUseBlockGroup: string[]) => {
    const groupButtonFlag = new Map<string, Boolean>();
    for (const blockBasic of blockDB) {
      if (blockBasic.blockGroup == "air") continue;
      groupButtonFlag.set(blockBasic.blockGroup, defaultUseBlockGroup.includes(blockBasic.blockGroup));
    }
    return groupButtonFlag;
  };

  const blockGroupMap = new Map<string, Array<BlockBasic>>();
  const canvasInRef = useRef<HTMLCanvasElement>(null);
  const { blockDB } = useBlockDBContext();
  const { blockImageDataDict } = useBlockDBContext();

  const [srcImage, setSrc] = useState<ImageData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [outSize, setOutSize] = useState(128);
  const [blueprint, setBlueprint] = useState<string[][]>([]);
  const [blockUseFlag, setBlockUseFlag] = useState(initBlockUseFlag(defaultUseBlockGroup));
  const [groupButtonFlag, setGroupButtonFlag] = useState(initGroupButtonFlag(defaultUseBlockGroup));

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const imageFile = (target.files as FileList)[0];
    const image = await loadImageFromFile(imageFile);
    const ctxIn = getContext(canvasInRef.current, image.width, image.height);
    ctxIn.drawImage(image, 0, 0);
    setSrc(ctxIn.getImageData(0, 0, image.width, image.height));
    setIsImageUpload(true);
  };

  return (
    <>
      <div className="flex justify-center">
        <canvas
          id="canvas-in"
          className={
            isImageUpload
              ? "w-auto h-auto max-h-[50vh] max-w-[80vw] border-dashed border-white border-2"
              : "hidden"
          }
          ref={canvasInRef}
        ></canvas>
        <div
          className={
            isImageUpload
              ? "hidden"
              : "sm:w-[40vw] w-[80vw] sm:h-[30vw] h-[70vw] bg-neutral-900 border-dashed border-2 border-white flex items-center justify-center"
          }
        >
          {t.IMAGE_SELECT}
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <label className="block">
          <span className="sr-only">{t.IMAGE_SELECT_BUTTON}</span>
          <input
            type="file"
            className="block text-sm file:mr-4 file:py-2 file:px-4 cursor-pointer
            file:border-0 file:text-sm file:font-semibold file:bg-m-green file:text-white hover:file:bg-m-green-light"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div className=" m-4">
        <div className="text-center">
          <span className="m-2">{t.WIDTH_BLOCK}:</span>
          <input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setOutSize(Number(event.target.value));
            }}
            defaultValue={outSize}
            type="number"
            className="text-center w-24 bg-neutral-900"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-fit bg-neutral-900 p-10 rounded-md">
          {Array.from(blockGroupMap).map((blockGroup) => (
            <div key={"select-block-row-" + blockGroup[0]}>
              <div>
                <label htmlFor={blockGroup[0]} className="">
                  <input
                    type="checkbox"
                    id={blockGroup[0]}
                    onChange={() => handleGroupButtonClick(blockGroup[0])}
                    checked={(groupButtonFlag.get(blockGroup[0]) as boolean) || false}
                    className="peer"
                  />
                </label>
              </div>

              <div className="flex justify-start flex-wrap items-center">
                {blockGroup[1].map((blockBasic) => (
                  <BlockButton
                    key={"select-block-button-" + blockBasic.javaId}
                    checked={(blockUseFlag.get(blockBasic.javaId) as boolean) || false}
                    handleBlockClick={handleBlockClick}
                    blockBasic={blockBasic}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12 mb-12">
        <button onClick={handleTransform} className="bg-m-green hover:bg-m-green-light p-2 pr-4 pl-4">
          <div className="flex items-center">
            {t.CONVERT_BUTTON}
            <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
          </div>
        </button>
      </div>
      <PreviewModal
        blueprint={blueprint}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        showCommandModal={() => setIsCommandModalOpen(true)}
      />
      <CommandModal
        isModalOpen={isCommandModalOpen}
        setIsModalOpen={setIsCommandModalOpen}
        blueprint={blueprint}
      />
    </>
  );
};

export default ImageConverter;
