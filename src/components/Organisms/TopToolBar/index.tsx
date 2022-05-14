import { useState } from "react";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import CommandModal from "../CommandModal";
import EditorPreviewModal from "../EditorPreviewModal";
import ReplaceModal from "../ReplaceMenu";

const TopToolBar = () => {
  const [isReplaceMenuOpen, setIsReplaceMenuOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const { undo, redo } = useEditorCanvasContext();
  const { getBlueprint } = useEditorCanvasContext();

  /* modal managiment functions */
  const handleReplaceMenuOpen = () => {
    setIsReplaceMenuOpen(true);
  };
  const handlePreviewModalOpen = () => {
    setIsPreviewModalOpen(true);
  };
  const handleCommandModalOpen = () => {
    setIsCommandModalOpen(true);
  };

  /* hidtory managiment functions */
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
        <div className="relative">
          <button onClick={handleReplaceMenuOpen}>
            <span className="flex items-center border-2 rounded bg-slate-200">置き換え</span>
          </button>
          <div className="absolute top-7 left-0">
            <ReplaceModal isOpen={isReplaceMenuOpen} setIsOpen={setIsReplaceMenuOpen} />
          </div>
        </div>
        <button onClick={handleCommandModalOpen}>
          <span className="flex items-center border-2 rounded bg-slate-200">コマンド生成</span>
        </button>
        <button onClick={handlePreviewModalOpen}>
          <span className="flex items-center border-2 rounded bg-slate-200">プレビュー</span>
        </button>

        <EditorPreviewModal
          isModalOpen={isPreviewModalOpen}
          setIsModalOpen={setIsPreviewModalOpen}
          blueprint={getBlueprint()}
        />
        <CommandModal
          isModalOpen={isCommandModalOpen}
          setIsModalOpen={setIsCommandModalOpen}
          blueprint={getBlueprint()}
        />
      </div>
    </>
  );
};

export default TopToolBar;
