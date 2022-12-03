import { useCallback, useState } from "react";
import { useBlockDBContext } from "src/context/useBlockDB";
import resizeImageData from "resize-image-data";
import generateBlueprint from "src/Feature/Home/functions/generateBluePrint";

export const useConverter = () => {
  const { blockDB, blockImageDataDict } = useBlockDBContext();
  const defaultUseBlockGroup = ["wool", "concrete", "terracotta", "stone", "soil", "wood", "jewel"];
  const defaultImageSize = 128;

  const [originalImageData, setOriginalImageData] = useState<ImageData>();
  const [blueprint, setBlueprint] = useState<string[][]>([]);

  const defaultBlockUseFlag = (defaultUseBlockGroup: string[]) => {
    const blockUseFlag = new Map<string, boolean>();
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

  const defaultGroupButtonFlag = (defaultUseBlockGroup: string[]) => {
    const groupButtonFlag = new Map<string, boolean>();
    for (const blockBasic of blockDB) {
      if (blockBasic.blockGroup == "air") continue;
      groupButtonFlag.set(blockBasic.blockGroup, defaultUseBlockGroup.includes(blockBasic.blockGroup));
    }
    return groupButtonFlag;
  };

  const [size, setSize] = useState(defaultImageSize);
  const blockGroupMap = new Map<string, Array<BlockBasic>>();
  const [blockUseFlag, setBlockUseFlag] = useState(defaultBlockUseFlag(defaultUseBlockGroup));
  const [groupButtonFlag, setGroupButtonFlag] = useState(defaultGroupButtonFlag(defaultUseBlockGroup));

  const changeSize = useCallback(
    (size: number) => {
      setSize(size);
    },
    [setSize]
  );

  const changeOriginalImageData = useCallback(
    (imageData: ImageData) => {
      setOriginalImageData(imageData);
    },
    [setOriginalImageData]
  );
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

  const convert = () => {
    if (originalImageData === undefined) return;
    const useBlockImageDataDict = new Map<string, BlockImageData>();
    for (let [jabaId, blockImageData] of blockImageDataDict) {
      if (blockUseFlag.get(jabaId)) useBlockImageDataDict.set(jabaId, blockImageData);
    }

    // need to refactor
    const height = Math.floor(originalImageData.height * (size / originalImageData.width));
    const resizedImage = resizeImageData(originalImageData, size, height, "nearest-neighbor");

    setBlueprint(generateBlueprint(resizedImage, size, height, useBlockImageDataDict));
  };
  return {
    size,
    blockGroupMap,
    blockUseFlag,
    groupButtonFlag,
    originalImageData,
    blueprint,
    changeSize,
    changeOriginalImageData,
    changeGroupButtonFlag,
    changeUseBlockFlag,
    setBlockUseFlag,
    setGroupButtonFlag,
    setOriginalImageData,
    setBlueprint,
    convert,
  };
};
