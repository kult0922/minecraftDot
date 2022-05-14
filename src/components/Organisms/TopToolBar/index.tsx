/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import { useHistoryContext } from "src/store/useHistory";

const TopToolBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { replaceFromJavaId, replaceToJavaId, setMode } = useEditorContext();
  const { blockDB, getBlockBasic } = useBlockDBContext();
  const { replace, undo, redo, getBlueprint } = useEditorCanvasContext();
  const { addHistory } = useHistoryContext();
  const handleReplace = () => {
    replace(replaceFromJavaId, replaceToJavaId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMode("neutral");
    addHistory(getBlueprint());
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
      <div className="flex items-center">
        <button onClick={handleUndo}>
          <span className="material-symbols-outlined flex items-center">undo</span>
        </button>
        <button onClick={handleRedo}>
          <span className="material-symbols-outlined flex items-center">redo</span>
        </button>
        <button onClick={handleModalOpen}>
          <span className="flex items-center border-2 rounded bg-slate-200">置き換え</span>
        </button>
      </div>

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
      </div>
    </>
  );
};

export default TopToolBar;
