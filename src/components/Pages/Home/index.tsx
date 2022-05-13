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

const HomeComponent = () => {
  // 入力画像用のキャンバス
  const canvasInRef = useRef(null);
  const mainCanvas = useRef(null);
  const [srcImage, setSrc] = useState<ImageData>();
  // let src: ImageData;
  const { blockImageDataDict } = useBlockDBContext();
  const { setInitBlueprint } = useBlueprintContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outSize, setOutSize] = useState(16);
  const srcImageWidth = 256;
  const srcImageHeight = 256;
  const mainCanvasWidth = 1000;
  const mainCanvasHeight = 1000;

  /* src image load */
  useEffect(() => {
    const ctxIn = getContext(canvasInRef.current, srcImageWidth, srcImageHeight);
    ctxIn.imageSmoothingEnabled = false;
    (async () => {
      const image = await loadImage("/assets/sample1_256.png");
      ctxIn.drawImage(image, 0, 0);
      setSrc(ctxIn.getImageData(0, 0, srcImageWidth, srcImageHeight));
    })();
  }, []);

  const handleTrans = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const afterOpenModal = () => {
    if (srcImage == null) return;
    const blueprint = generateBlueprint(srcImage, outSize, outSize, blockImageDataDict);
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
      <div className="flex justify-center m-4">
        <button onClick={handleTrans}>transform</button>
      </div>
      <div className="flex justify-center m-4">
        size:
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setOutSize(Number(event.target.value));
          }}
          type="text"
          className="border-2"
        />
      </div>
      <div className="flex justify-center">
        <div className="border-2">
          <canvas id="canvas-in" ref={canvasInRef}></canvas>
        </div>
      </div>
      <div className="p-40 mt-4 border text-center">ブロック選択 view</div>

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

export default HomeComponent;
