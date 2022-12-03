import { useCallback, useRef, useState } from "react";
import generateBlueprint from "src/Feature/Home/functions/generateBluePrint";
import { useBlockDBContext } from "src/context/useBlockDB";
import PreviewModal from "src/Feature/Home/components/PreviewModal";
import resizeImageData from "resize-image-data";
import CommandModal from "src/components/CommandModal";
import { useLocale } from "src/hooks/useLocale";
import SizeInput from "./SizeInput";
import OriginalImageViewer from "./OriginalImageViewer";
import BlockSelect from "./BlockSelect";
import { useConvertSettings } from "./hooks/useConverteSettings";

const ImageConverter = () => {
  const { t } = useLocale();
  const {
    size,
    blockGroupMap,
    blockUseFlag,
    groupButtonFlag,
    changeSize,
    setBlockUseFlag,
    setGroupButtonFlag,
  } = useConvertSettings();
  const { blockImageDataDict } = useBlockDBContext();

  // 画像処理データ
  const [originalImageData, setOriginalImageData] = useState<ImageData>();
  const [blueprint, setBlueprint] = useState<string[][]>([]);

  // モーダル表示制御
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);

  const changeOriginalImageData = useCallback(
    (imageData: ImageData) => {
      setOriginalImageData(imageData);
    },
    [setOriginalImageData]
  );

  const handleTransform = async () => {
    if (originalImageData === undefined) return;
    const useBlockImageDataDict = new Map<string, BlockImageData>();
    for (let [jabaId, blockImageData] of blockImageDataDict) {
      if (blockUseFlag.get(jabaId)) useBlockImageDataDict.set(jabaId, blockImageData);
    }

    // need to refactor
    const height = Math.floor(originalImageData.height * (size / originalImageData.width));
    const resizedImage = resizeImageData(originalImageData, size, height, "nearest-neighbor");

    setBlueprint(generateBlueprint(resizedImage, size, height, useBlockImageDataDict));
    setIsModalOpen(true);
  };

  const changeGroupButtonFlag = (group: string) => {
    const beforeState = groupButtonFlag.get(group);
    changeUseFlagByGroup(group, !beforeState);
    setGroupButtonFlag((map) => new Map(map.set(group, !beforeState)));
  };

  const changeUseBlockFlag = (javaId: string) => {
    const beforeState = blockUseFlag.get(javaId);
    setBlockUseFlag((map) => new Map(map.set(javaId, !beforeState)));
  };

  const changeUseFlagByGroup = (group: string, state: boolean) => {
    for (const blockBasic of blockGroupMap.get(group)!) {
      setBlockUseFlag((map) => new Map(map.set(blockBasic.javaId, state)));
    }
  };

  return (
    <>
      <OriginalImageViewer setOriginalImageData={changeOriginalImageData} />
      <div className=" m-4">
        <div className="text-center">
          <span className="m-2">{t.WIDTH_BLOCK}:</span>
          <SizeInput changeSize={changeSize} />
        </div>
      </div>
      <BlockSelect
        blockGroupMap={blockGroupMap}
        blockUseFlag={blockUseFlag}
        groupButtonFlag={groupButtonFlag}
        changeUseBlockFlag={changeUseBlockFlag}
        changeGroupButtonFlag={changeGroupButtonFlag}
      ></BlockSelect>
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
