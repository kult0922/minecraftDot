/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";

const BlockSelect = () => {
  const { blockDB, blockImageDataDict } = useBlockDBContext();
  const blockGroupMap = new Map<string, Array<BlockBasic>>();
  const { setInkBlockJavaId, setReplaceFromJavaId, setReplaceToJavaId, mode } = useEditorContext();

  const handleClick = (javaId: string) => {
    if (mode == "replaceFromPicker") {
      setReplaceFromJavaId(javaId);
      return;
    }
    if (mode == "replaceToPicker") {
      setReplaceToJavaId(javaId);
      return;
    }

    setInkBlockJavaId(javaId);
  };

  for (const blockBasic of blockDB) {
    if (blockBasic.blockGroup == "air") continue;
    const array = blockGroupMap.get(blockBasic.blockGroup);
    if (array == undefined) {
      blockGroupMap.set(blockBasic.blockGroup, [blockBasic]);
    } else {
      array.push(blockBasic);
    }
  }

  return (
    <>
      <div className="bg-slate-200 border-4 p-2">
        <span className="material-symbols-outlined text-slate-400">palette</span>
        <img
          className="cursor-pointer"
          src={"/blocks/air_palette.png"}
          alt="paletteBlock"
          onClick={() => handleClick("minecraft:air")}
        ></img>
        {Array.from(blockGroupMap).map((row) => (
          <div key={"palatte-row-" + row[0]}>
            {row[1].map((column) => (
              <img
                className="inline cursor-pointer"
                src={column.imagePath}
                alt="paletteBlock"
                key={column.javaId}
                onClick={() => handleClick(column.javaId)}
              ></img>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BlockSelect;
