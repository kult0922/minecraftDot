import { useRef } from "react";
import geenrateImageFromBlueprint from "../../functions/generateImageFromBlueprint";
import { useBlockDBContext } from "src/store/useBlockDB";
import Modal from "react-modal";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/getContext";
import getBufferCanvas from "src/functions/getBufferCanvas";
import CrossButton from "src/components/Common/CrossButton.tsx";
import ja from "src/i18n/locales/ja";
import en from "src/i18n/locales/en";
import { useRouter } from "next/router";

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
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;
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
        <div className="sm:w-[50vw] w-[100vw] flex justify-center">
          <canvas id="canvas-out" ref={mainCanvas} className="w-[95%] border-2"></canvas>
        </div>

        <div className="flex flex-wrap mt-4 justify-around">
          <div className="m-2">
            <button> {t.IMAGE_DOWNLOAD} </button>
          </div>
          <div className="m-2">
            <button> {t.CSV_DOWNLOAD} </button>
          </div>
          <div className="m-2">
            <button> {t.COMMAND_GENERATION}</button>
          </div>
          <div className="m-2">
            <Link href="/editor">
              <a>{t.EDIT}</a>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
