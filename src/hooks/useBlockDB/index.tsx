import { createContext, useState, useContext, ReactNode } from "react";
import loadImage from "src/functions/loadImage";
import { t } from "src/functions/t";

/* block data import */
import wool from "src/json/wool.json";
import terracotta from "src/json/terracotta.json";
import glazedTerracotta from "src/json/glazedTerracotta.json";
import ore from "src/json/ore.json";
import concrete from "src/json/concrete.json";
import stone from "src/json/stone.json";
import soil from "src/json/soil.json";
import jewel from "src/json/jewel.json";
import wood from "src/json/wood.json";
import light from "src/json/light.json";
import air from "src/json/air.json";
import glass from "src/json/glass.json";
import rgb2Lab from "src/functions/rgb2lab";

const BlockDBContext = createContext(
  {} as {
    blockDB: Array<BlockBasic>;
    javaId2index: Map<string, number>;
    blockImageDataDict: Map<string, BlockImageData>;
    getBlockBasic: (javaId: string) => BlockBasic;
    initBlockImageDataDict: () => void;
  }
);

export function useBlockDBContext() {
  return useContext(BlockDBContext);
}

export function BlockDBProvider({ children }: { children?: ReactNode }) {
  const javaId2index: Map<string, number> = new Map();
  const blockDB: Array<BlockBasic> = air.blocks.concat(
    wool.blocks,
    concrete.blocks,
    terracotta.blocks,
    glass.blocks,
    glazedTerracotta.blocks,
    ore.blocks,
    stone.blocks,
    soil.blocks,
    wood.blocks,
    jewel.blocks,
    light.blocks
  );

  for (let index = 0; index < blockDB.length; index++) {
    javaId2index.set(blockDB[index].javaId, index);
  }

  const getBlockBasic = (javaId: string): BlockBasic => {
    return blockDB[javaId2index.get(javaId)!];
  };

  const [blockImageDataDict, setBlockImageDataDict] = useState<Map<string, BlockImageData>>(new Map());

  const initBlockImageDataDict = async () => {
    const size = 16;
    const blockImageDataDict: Map<string, BlockImageData> = new Map();

    // image load
    for (const block of blockDB) {
      const mem_canvas = document.createElement("canvas");
      mem_canvas.width = size;
      mem_canvas.height = size;

      const context = mem_canvas.getContext("2d");
      if (context == null) continue;
      const image = await loadImage(block.imagePath);
      context.drawImage(image, 0, 0);
      const blockImageData = context.getImageData(0, 0, size, size);

      let R = 0;
      let G = 0;
      let B = 0;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const srcImage = blockImageData.data;
          R += srcImage[t(j, i, 0, size)];
          G += srcImage[t(j, i, 1, size)];
          B += srcImage[t(j, i, 2, size)];
        }
      }
      R /= size * size;
      G /= size * size;
      B /= size * size;
      const { L, a, b } = rgb2Lab(R, G, B);

      blockImageDataDict.set(block.javaId, { imageData: blockImageData, R, G, B, L, a, b });
      setBlockImageDataDict(blockImageDataDict);
    }
  };

  const value = {
    blockDB,
    javaId2index,
    blockImageDataDict,
    getBlockBasic,
    initBlockImageDataDict,
  };

  return <BlockDBContext.Provider value={value}>{children}</BlockDBContext.Provider>;
}
