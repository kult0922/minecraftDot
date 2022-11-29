/* eslint-disable @next/next/no-img-element */
import { useBlockDBContext } from "src/hooks/useBlockDB";
import { useEditorContext } from "src/hooks/useEditor";

const BlockPalette = () => {
  const { blockDB } = useBlockDBContext();
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
      <div className="">
        <div className="bg-neutral-800 text-sm w-fit px-2 rounded-sm">palette</div>
        <div className="p-3 bg-neutral-600">
          <img
            className="cursor-pointer border-neutral-800 border-2"
            src={"/blocks/air_palette.png"}
            alt="paletteBlock"
            width={24}
            onClick={() => handleClick("minecraft:air")}
          ></img>
          {Array.from(blockGroupMap).map((row) => (
            <div key={"palatte-row-" + row[0]}>
              {row[1].map((column) => (
                <img
                  className="inline cursor-pointer rendering-pixelated border-2 border-neutral-800"
                  src={column.imagePath}
                  alt="paletteBlock"
                  width={24}
                  key={column.javaId}
                  onClick={() => handleClick(column.javaId)}
                ></img>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockPalette;
