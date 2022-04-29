import { createContext, useState, useContext, ReactNode } from "react";
import loadImage from "src/functions/utils/loadImage";
import { t } from "src/functions/utils/t";
import wool from "src/json/wool.json" assert { type: "json" };

const BlockImageContext = createContext(
  {} as {
    blockImageDataDict: Map<string, BlockImageData>;
    initBlockImageDataDict: () => void;
  }
);

export function useBlockImageContext() {
  return useContext(BlockImageContext);
}

export function BlockImageProvider({ children }: { children?: ReactNode }) {
  const [blockImageDataDict, setBlockImageDataDict] = useState<Map<string, BlockImageData>>(new Map());

  const initBlockImageDataDict = async () => {
    const size = 16;
    const blockImageDataDict: Map<string, BlockImageData> = new Map();

    // image load
    for (const block of wool.blocks) {
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
    blockImageDataDict,
    initBlockImageDataDict,
  };

  return <BlockImageContext.Provider value={value}>{children}</BlockImageContext.Provider>;
}
