import { useRef, useState } from "react";
import ToolButton from "src/components/Atoms/toolButton";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";
import PenSizeChange from "../PenSIzeChange";

const TopToolBar = () => {
  const Pref = useRef(null);
  const handleReplace = () => {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleModalOpen}>replace</button>

      {/* replace modal */}
      <div className="relative flex">
        {isModalOpen && (
          <div className="border-2 absolute top-0 left-0 block z-[100]">
            <div>
              <button onClick={handleReplace}>replace</button>
            </div>
            <div>
              <button onClick={closeModal}>close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopToolBar;
