import { useState } from "react";
import createCsv from "src/functions/createCsv";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";
import CommandModal from "../../../../Common/CommandModal";
import EditorPreviewModal from "../EditorPreviewModal";
import ReplaceModal from "../ReplaceMenu";
import ToolButton from "./ToolButton.tsx";
import { useLocale } from "src/hooks/useLocale";

const TopToolBar = () => {
  const { t, locale } = useLocale();
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
    const csv = createCsv(getBlueprint(), blockDB, javaId2index, locale as Locale);
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
      <div className="flex items-center bg-neutral-600 py-1 w-[100vw]">
        <div className="mx-3 flex items-center">
          <button onClick={handleUndo} className="mx-1">
            <span className="material-symbols-outlined flex items-center">undo</span>
          </button>
          <button onClick={handleRedo} className="mx-1">
            <span className="material-symbols-outlined flex items-center">redo</span>
          </button>
        </div>

        <div className="flex flex-wrap">
          <div className="relative">
            <ToolButton onClick={handleReplaceMenuOpen} text={t.REPLACE} />
            <div className="absolute top-8 left-2">
              <ReplaceModal isOpen={isReplaceMenuOpen} setIsOpen={setIsReplaceMenuOpen} />
            </div>
          </div>
          <ToolButton onClick={handleImageDownload} text={t.IMAGE_DOWNLOAD} />
          <ToolButton onClick={handleCSVDownload} text={t.CSV_DOWNLOAD} />
          <ToolButton onClick={handleCommandModalOpen} text={t.COMMAND_GENERATION} />
          <ToolButton onClick={handlePreviewModalOpen} text={t.PREVIEW} />

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
      </div>
    </>
  );
};

export default TopToolBar;
