/* eslint-disable @next/next/no-img-element */
import ToolButton from "src/components/Pages/Editor/components/SideToolBar/ToolButton";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";
import PenSizeChange from "./PenSIzeChange";

const SideToolBar = () => {
  const { mode, inkBlockJavaId, setMode } = useEditorContext();
  const { getBlockBasic } = useBlockDBContext();

  return (
    <>
      <div className="bg-neutral-600">
        <div className="flex flex-col items-center">
          <div className="mb-2 mt-2">
            <img
              src={getBlockBasic(inkBlockJavaId).imagePath}
              alt="inkBlock"
              width="22"
              className="border-2 border-neutral-800 rendering-pixelated"
            ></img>
          </div>
          <ToolButton id="pen" onChange={() => setMode("pen")} selected={mode == "pen"}>
            <span className="material-icons text-lg">edit</span>
          </ToolButton>
          <ToolButton id="bucket" onChange={() => setMode("bucket")} selected={mode == "bucket"}>
            <span className="material-icons text-lg">format_color_fill</span>
          </ToolButton>
          <ToolButton id="dropper" onChange={() => setMode("picker")} selected={mode == "picker"}>
            <span className="material-icons text-lg">colorize</span>
          </ToolButton>
          <ToolButton id="hand" onChange={() => setMode("hand")} selected={mode == "hand"}>
            <span className="material-icons text-lg">back_hand</span>
          </ToolButton>
          <ToolButton id="zoomIn" onChange={() => setMode("zoomIn")} selected={mode == "zoomIn"}>
            <span className="material-icons text-2xl">zoom_in</span>
          </ToolButton>
          <ToolButton id="zoomOut" onChange={() => setMode("zoomOut")} selected={mode == "zoomOut"}>
            <span className="material-icons text-2xl">zoom_out</span>
          </ToolButton>
          <div className="mt-2 w-8">
            <PenSizeChange />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideToolBar;
