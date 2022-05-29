import { useState } from "react";
import createCsv from "src/functions/createCsv";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import CommandModal from "../CommandModal";
import EditorPreviewModal from "../EditorPreviewModal";
import ReplaceModal from "../ReplaceMenu";
import ToolButton from "./ToolButton.tsx";

const TopToolBar = () => {
  const [isReplaceMenuOpen, setIsReplaceMenuOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const { undo, redo, getBlueprint, getMinecraftImage } = useEditorCanvasContext();
  const { blockDB, javaId2index } = useBlockDBContext();

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
  const handleCSVDownload = () => {
    const csv = createCsv(getBlueprint(), blockDB, javaId2index);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "minecraftDot.csv";
    link.click();
  };

  const handleImageDownload = () => {
    const link = document.createElement("a");
    const image = getMinecraftImage();
    link.href = image.toDataURL("image/png");
    link.download = "minecraftDot.png";
    link.click();
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
          <ToolButton onClick={handleReplaceMenuOpen} text="置き換え" />
          <div className="absolute top-7 left-0">
            <ReplaceModal isOpen={isReplaceMenuOpen} setIsOpen={setIsReplaceMenuOpen} />
          </div>
        </div>
        <ToolButton onClick={handleImageDownload} text="画像ダウンロード" />
        <ToolButton onClick={handleCSVDownload} text="CSVダウンロード" />
        <ToolButton onClick={handleCommandModalOpen} text="コマンド生成" />
        <ToolButton onClick={handlePreviewModalOpen} text="プレビュー" />

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
