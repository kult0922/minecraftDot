/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";

const BlockPalette = () => {
  const { blockDB, blockImageDataDict } = useBlockDBContext();
  console.log(blockImageDataDict);
  const blockPalette: Array<Array<BlockBasic>> = [[], [], [], [], [], [], [], [], [], []];
  const blockGroupMap = new Map<string, Array<BlockBasic>>();
  const { setInkBlockJavaId } = useEditorContext();
  /*
  for (const blockbasic of blockDB) {
    const idx = Math.floor((blockImageDataDict.get(blockbasic.javaId)?.H! / 360) * blockPalette.length);
    blockPalette[idx].push(blockbasic);
  }
  for (const row of blockPalette) {
    row.sort(
      (elm1, elm2) => blockImageDataDict.get(elm1.javaId)?.V! - blockImageDataDict.get(elm2.javaId)?.V!
    );
  }
  */
  for (const blockBasic of blockDB) {
    const array = blockGroupMap.get(blockBasic.blockGroup);
    if (array == undefined) {
      blockGroupMap.set(blockBasic.blockGroup, [blockBasic]);
    } else {
      array.push(blockBasic);
    }
  }

  console.log(Array.from(blockGroupMap));

  return (
    <>
      <div className="border-4 p-2">
        <span className="material-symbols-outlined text-slate-400">palette</span>
        {Array.from(blockGroupMap).map((row) => (
          <div key={"palatte-row-" + row[0]}>
            {row[1].map((column) => (
              <img
                className="inline cursor-pointer"
                src={column.imagePath}
                alt="paletteBlock"
                key={column.javaId}
                onClick={() => setInkBlockJavaId(column.javaId)}
              ></img>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BlockPalette;
