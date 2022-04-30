import { createContext, useState, useContext, ReactNode } from "react";
import wool from "src/json/wool.json" assert { type: "json" };

const BlockDBContext = createContext(
  {} as {
    blockDB: Array<BlockBasic>;
    javaId2index: Map<string, number>;
    getBlockBasic: (javaId: string) => BlockBasic;
  }
);

export function useBlockDBContext() {
  return useContext(BlockDBContext);
}

export function BlockDBProvider({ children }: { children?: ReactNode }) {
  const javaId2index: Map<string, number> = new Map();
  const blockDB: Array<BlockBasic> = [];
  const initBlockDB = () => {
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
  };

  const getBlockBasic = (javaId: string): BlockBasic => {
    return blockDB[javaId2index.get(javaId)!];
  };

  initBlockDB();
  const value = {
    blockDB,
    javaId2index,
    getBlockBasic,
  };

  return <BlockDBContext.Provider value={value}>{children}</BlockDBContext.Provider>;
}
