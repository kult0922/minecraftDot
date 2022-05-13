/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";

const TopToolBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { replaceFromJavaId, replaceToJavaId, setMode } = useEditorContext();
  const { blockDB, getBlockBasic } = useBlockDBContext();
  const { replace, undo, redo } = useEditorCanvasContext();
  const handleReplace = () => {
    replace(replaceFromJavaId, replaceToJavaId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMode("neutral");
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleUndo = () => {
    undo();
  };
  const handleRedo = () => {
    redo();
  };

  return (
    <>
      <button onClick={handleModalOpen}>ブロック置換</button>

      {/* replace modal */}
      <div className="relative">
        {isModalOpen && (
          <div className="bg-white w-32 border-2 absolute top-0 left-0 block z-[100]">
            <div className="flex justify-end">
              <button onClick={closeModal}>x</button>
            </div>
            <div className="flex justify-center items-center">
              <div className="cursor-pointer" onClick={() => setMode("replaceFromPicker")}>
                <img
                  className="rendering-pixelated"
                  width={32}
                  height={32}
                  src={getBlockBasic(replaceFromJavaId).imagePath}
                  alt="from"
                />
              </div>
              <span className="material-symbols-outlined">arrow_right_alt</span>
              <div className="cursor-pointer" onClick={() => setMode("replaceToPicker")}>
                <img
                  className="rendering-pixelated"
                  width={32}
                  height={32}
                  src={getBlockBasic(replaceToJavaId).imagePath}
                  alt="from"
                />
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button onClick={handleReplace}>置き換え</button>
            </div>
          </div>
        )}
        <button onClick={handleUndo}>undo</button>
        <button onClick={handleRedo}>redo</button>
      </div>
    </>
  );
};

export default TopToolBar;
