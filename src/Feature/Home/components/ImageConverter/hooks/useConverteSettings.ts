import { useCallback, useState } from "react";
import { useBlockDBContext } from "src/context/useBlockDB";

export const useConvertSettings = () => {
  const { blockDB } = useBlockDBContext();
  const defaultUseBlockGroup = ["wool", "concrete", "terracotta", "stone", "soil", "wood", "jewel"];

  const defaultImageSize = 128;

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

  return {
    size,
    blockGroupMap,
    blockUseFlag,
    groupButtonFlag,
    changeSize,
    setBlockUseFlag,
    setGroupButtonFlag,
  };
};
