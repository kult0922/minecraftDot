import { useRef } from "react";
import geenrateImageFromBlueprint from "../../functions/generateImageFromBlueprint";
import { useBlockDBContext } from "src/store/useBlockDB";
import Modal from "react-modal";
import Link from "next/link";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/getContext";
import getBufferCanvas from "src/functions/getBufferCanvas";
import CrossButton from "src/components/Common/CrossButton.tsx";
import createCsv from "src/functions/createCsv";
import { useLocale } from "src/i18n/useLocale";

interface Props {
  blueprint: string[][];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  showCommandModal: () => void;
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

const PreviewModal = ({ blueprint, isModalOpen, setIsModalOpen, showCommandModal }: Props) => {
  const { locale, t } = useLocale();
  const { blockDB, javaId2index } = useBlockDBContext();
  const { setInitBlueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockDBContext();
  const mainCanvas = useRef<HTMLCanvasElement>(null);

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

  const handleImageDownload = () => {
    const link = document.createElement("a");
    const image = mainCanvas.current!;
    link.href = image.toDataURL("image/png");
    link.download = "minecraftDot.png";
    link.click();
  };

  const handleCSVDownload = () => {
    const csv = createCsv(blueprint, blockDB, javaId2index, locale as Locale);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "minecraftDot.csv";
    link.click();
  };

  const handleCommandGeneration = () => {
    showCommandModal();
    closeModal();
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
        <div className="sm:h-[70vh] h-[80vh] flex justify-center">
          <canvas id="canvas-out" ref={mainCanvas} className="h-[95%] border-4 border-neutral-700"></canvas>
        </div>

        <div className="flex flex-wrap mt-4 justify-around">
          <div className="m-2">
            <button onClick={handleImageDownload}> {t.IMAGE_DOWNLOAD} </button>
          </div>
          <div className="m-2">
            <button onClick={handleCSVDownload}> {t.CSV_DOWNLOAD} </button>
          </div>
          <div className="m-2">
            <button onClick={handleCommandGeneration}> {t.COMMAND_GENERATION}</button>
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
