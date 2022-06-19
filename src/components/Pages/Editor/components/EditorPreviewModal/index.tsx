import { useRef } from "react";
import geenrateImageFromBlueprint from "src/components/Pages/Home/functions/generateImageFromBlueprint";
import { useBlockDBContext } from "src/hooks/useBlockDB";
import Modal from "react-modal";
import { useBlueprintContext } from "src/hooks/useBlueprint";
import getContext from "src/functions/getContext";
import getBufferCanvas from "src/functions/getBufferCanvas";
import CrossButton from "src/components/CommonComponents/CrossButton.tsx";

interface Props {
  blueprint: string[][];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "7px",
    backgroundColor: "#2d2d2d",
    marginRight: "-50%",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
  },
};

const EditorPreviewModal = ({ blueprint, isModalOpen, setIsModalOpen }: Props) => {
  const { setInitBlueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockDBContext();
  const mainCanvas = useRef(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const afterOpenModal = () => {
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);

    /* set minecraftImage to buffer canvs */
    const bufferCanvas = getBufferCanvas(minecraftImage, minecraftImage.width, minecraftImage.height);

    /* output image */
    const mainCanvasContext = getContext(mainCanvas.current, minecraftImage.width, minecraftImage.height);
    mainCanvasContext.drawImage(bufferCanvas, 0, 0, minecraftImage.width, minecraftImage.height);
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
        <div className="flex justify-center">
          <canvas
            id="canvas-out"
            ref={mainCanvas}
            className="h-auto w-auto max-h-[80vh] max-w-[90vw]"
          ></canvas>
        </div>
      </Modal>
    </>
  );
};

export default EditorPreviewModal;
