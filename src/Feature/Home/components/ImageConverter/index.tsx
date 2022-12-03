import { useState } from "react";
import PreviewModal from "src/Feature/Home/components/PreviewModal";
import CommandModal from "src/components/CommandModal";
import { useLocale } from "src/hooks/useLocale";
import SizeInput from "./SizeInput";
import OriginalImageViewer from "./OriginalImageViewer";
import BlockSelect from "./BlockSelect";
import { useConverter } from "./hooks/useConverter";

const ImageConverter = () => {
  const { t } = useLocale();
  const {
    blueprint,
    blockGroupMap,
    blockUseFlag,
    groupButtonFlag,
    changeSize,
    changeGroupButtonFlag,
    changeOriginalImageData,
    changeUseBlockFlag,
    convert,
  } = useConverter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);

  const handleConvert = () => {
    convert();
    setIsModalOpen(true);
  };

  return (
    <>
      <OriginalImageViewer setOriginalImageData={changeOriginalImageData} />
      <div className=" m-4">
        <div className="text-center">
          <span className="m-2">{t.WIDTH_BLOCK}:</span>
          <SizeInput changeSize={changeSize} />
        </div>
      </div>
      <BlockSelect
        blockGroupMap={blockGroupMap}
        blockUseFlag={blockUseFlag}
        groupButtonFlag={groupButtonFlag}
        changeUseBlockFlag={changeUseBlockFlag}
        changeGroupButtonFlag={changeGroupButtonFlag}
      ></BlockSelect>
      <div className="flex justify-center mt-12 mb-12">
        <button onClick={handleConvert} className="bg-m-green hover:bg-m-green-light p-2 pr-4 pl-4">
          <div className="flex items-center">
            {t.CONVERT_BUTTON}
            <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
          </div>
        </button>
      </div>
      <PreviewModal
        blueprint={blueprint}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        showCommandModal={() => setIsCommandModalOpen(true)}
      />
      <CommandModal
        isModalOpen={isCommandModalOpen}
        setIsModalOpen={setIsCommandModalOpen}
        blueprint={blueprint}
      />
    </>
  );
};

export default ImageConverter;
