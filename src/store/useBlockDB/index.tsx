import { createContext, useState, useContext, ReactNode } from "react";
import wool from "src/json/wool.json" assert { type: "json" };

const BlockDBContext = createContext(
  {} as {
    blockDB: Array<BlockBasic>;
    javaId2index: Map<string, number>;
  }
);

export function useBlockDBContext() {
  return useContext(BlockDBContext);
}

export function BlockDBProvider({ children }: { children?: ReactNode }) {
  const initBlockDB = () => {
    const blockDB: Array<BlockBasic> = [];
    const javaId2index: Map<string, number> = new Map();

    wool.blocks.forEach((block, index) => {
      blockDB.push({
        imagePath: block.imagePath,
        javaId: block.javaId,
        bedrockId: block.bedrockId,
        jname: block.jname,
        colorGroup: block.colorGroup,
        blockGroup: block.blockGroup,
      });

      javaId2index.set(block.javaId, index);
    });

    return { blockDB, javaId2index };
  };

  const { blockDB, javaId2index } = initBlockDB();
  const value = {
    blockDB,
    javaId2index,
  };

  return <BlockDBContext.Provider value={value}>{children}</BlockDBContext.Provider>;
}
