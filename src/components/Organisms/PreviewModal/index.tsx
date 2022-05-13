import { useContext, useEffect, useRef, useState } from "react";
import generateBlueprint from "src/functions/ImageTrans/generateBluePrint";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import loadImage from "src/functions/utils/loadImage";
import { useBlockDBContext } from "src/store/useBlockDB";
import Modal from "react-modal";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/utils/getContext";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";

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

const PreviewModal = ({ blueprint, isModalOpen, setIsModalOpen }: Props) => {
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
            <span className="inline-block align-middle text-gray-800 bg-gray-800 leading-4 w-5 h-0.5 rounded-sm relative rotate-45 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-sm before:bg-gray-800 before:rotate-90"></span>
          </button>
        </div>
        <div className="w-[50vw] flex justify-center">
          <canvas id="canvas-out" ref={mainCanvas} className="w-[95%] border-2"></canvas>
        </div>

        <div className="flex justify-around mt-4">
          <button> 画像ダウンロード </button>
          <button> CSVダウンロード</button>
          <button> コマンド生成</button>
          <Link href="/editor">
            <a>編集する</a>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
