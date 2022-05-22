import { useContext, useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockDBContext } from "src/store/useBlockDB";
import Modal from "react-modal";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/utils/getContext";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";
import CrossButton from "src/components/Common/CrossButton.tsx";

interface Props {
  blueprint: string[][];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "7px",
    marginRight: "-50%",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
  },
};

const EditorPreviewModal = ({ blueprint, isModalOpen, setIsModalOpen }: Props) => {
  const { setInitBlueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockDBContext();
  const mainCanvas = useRef(null);
  const mainCanvasWidth = 1000;
  const mainCanvasHeight = 1000;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const afterOpenModal = () => {
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);

    /* set minecraftImage to buffer canvs */
    const bufferCanvas = getBufferCanvas(minecraftImage, minecraftImage.width, minecraftImage.height);

    /* output image */
    const mainCanvasContext = getContext(mainCanvas.current, mainCanvasWidth, mainCanvasHeight);
    mainCanvasContext.drawImage(bufferCanvas, 0, 0, mainCanvasWidth, mainCanvasHeight);
    setInitBlueprint(blueprint);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        style={modalStyles}
      >
        <div className="flex justify-end mb-3">
          <button onClick={closeModal}>
            <CrossButton />
          </button>
        </div>
        <div className="w-[90vw] flex justify-center">
          <canvas id="canvas-out" ref={mainCanvas} className="w-[95%] border-2"></canvas>
        </div>
      </Modal>
    </>
  );
};

export default EditorPreviewModal;
