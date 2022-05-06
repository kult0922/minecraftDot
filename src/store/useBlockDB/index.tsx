import { createContext, useState, useContext, ReactNode } from "react";
import loadImage from "src/functions/utils/loadImage";
import { t } from "src/functions/utils/t";
/* block data import */
import wool from "src/json/wool.json" assert { type: "json" };
import terracotta from "src/json/terracotta.json" assert { type: "json" };

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
  const blockDB: Array<BlockBasic> = wool.blocks.concat(terracotta.blocks);

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

      blockImageDataDict.set(block.javaId, { imageData: blockImageData, R: R, G: G, B: B });
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
