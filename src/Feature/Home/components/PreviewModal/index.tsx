import { useRef, useState } from "react";
import geenrateImageFromBlueprint from "../../functions/generateImageFromBlueprint";
import { useBlockDBContext } from "src/context/useBlockDB";
import Modal from "react-modal";
import Link from "next/link";
import { useBlueprintContext } from "src/context/useBlueprint";
import getContext from "src/functions/getContext";
import getBufferCanvas from "src/functions/getBufferCanvas";
import CrossButton from "src/components/CrossButton.tsx";
import createCsv from "src/functions/createCsv";
import { useLocale } from "src/hooks/useLocale";
import { ProgressBar } from "./ProgressBar";
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

const PreviewModal = ({
  blueprint,
  isModalOpen,
  setIsModalOpen,
  showCommandModal,
}: Props) => {
  const { locale, t } = useLocale();
  const { blockDB, javaId2index } = useBlockDBContext();
  const { setInitBlueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockDBContext();
  const mainCanvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const afterOpenModal = async () => {
    setIsProcessing(true);
    const myWorker = new Worker(new URL("./worker", import.meta.url));

    myWorker.onmessage = function (e) {
      if (e.data.type == "progress") {
        setProgress(e.data.payload);
        console.log(e.data.payload);
        return;
      }

      console.log("get from worker");
      console.log(e.data);

      const minecraftImage = e.data.payload;

      console.log("変換完了");

      /* set minecraftImage to buffer canvs */
      const bufferCanvas = getBufferCanvas(
        minecraftImage,
        minecraftImage.width,
        minecraftImage.height
      );

      /* output image */
      const mainCanvasContext = getContext(
        mainCanvas.current,
        minecraftImage.width,
        minecraftImage.height
      );
      mainCanvasContext.drawImage(
        bufferCanvas,
        0,
        0,
        minecraftImage.width,
        minecraftImage.height
      );
      setInitBlueprint(blueprint);
      setIsProcessing(false);
    };

    myWorker.postMessage({ blueprint, blockImageDataDict });
  };

  const handleImageDownload = () => {
    const link = document.createElement("a");
    const image = mainCanvas.current!;
    link.href = image.toDataURL("image/png");
    link.download = "minecraftDot.png";
    link.click();
  };

  const handleCSVDownload = () => {
    const csv = createCsv(
      blueprint,
      blockDB,
      javaId2index,
      locale as Locale,
      t.USE_BLOCK
    );
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
        <>
          <div className="flex justify-end mb-3">
            <button onClick={closeModal}>
              <CrossButton />
            </button>
          </div>
          <div className="flex justify-center">
            <canvas
              id="canvas-out"
              ref={mainCanvas}
              className="h-auto w-auto max-h-[80vh] max-w-[90vw] border-4 border-neutral-700"
              width={0}
              height={0}
            ></canvas>
          </div>
          <div className="flex justify-center">
            {isProcessing ? (
              <div className="w-64">
                <ProgressBar progress={progress} />
              </div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td className="text-center px-4 py-2">
                      <button onClick={handleImageDownload}>
                        {" "}
                        {t.IMAGE_DOWNLOAD}{" "}
                      </button>
                    </td>
                    <td className="text-center px-4 py-2">
                      <button onClick={handleCSVDownload}>
                        {" "}
                        {t.CSV_DOWNLOAD}{" "}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center px-4 py-2">
                      <button onClick={handleCommandGeneration}>
                        {" "}
                        {t.COMMAND_GENERATION}
                      </button>
                    </td>
                    <td className="text-center px-4 py-2">
                      <Link href="/editor">
                        <a>{t.EDIT}</a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </>
      </Modal>
    </>
  );
};

export default PreviewModal;
