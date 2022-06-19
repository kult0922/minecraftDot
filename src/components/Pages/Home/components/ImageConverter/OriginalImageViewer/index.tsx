import { useCallback, useRef, useState, memo } from "react";
import getContext from "src/functions/getContext";
import loadImageFromFile from "src/components/Pages/Home/functions/loadImageFromFile";
import { useLocale } from "src/hooks/useLocale";

interface Props {
  setOriginalImageData: (originalImageData: ImageData) => void;
}

const OriginalImageViewer = memo(({ setOriginalImageData }: Props) => {
  console.log("OriginalImageViwer render");
  const { t } = useLocale();

  const canvasInRef = useRef<HTMLCanvasElement>(null);

  const [isImageUpload, setIsImageUpload] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const imageFile = (target.files as FileList)[0];
    const image = await loadImageFromFile(imageFile);
    const ctxIn = getContext(canvasInRef.current, image.width, image.height);
    ctxIn.drawImage(image, 0, 0);
    setOriginalImageData(ctxIn.getImageData(0, 0, image.width, image.height));
    setIsImageUpload(true);
  };

  return (
    <>
      <div className="flex justify-center">
        <canvas
          id="canvas-in"
          className={
            isImageUpload
              ? "w-auto h-auto max-h-[50vh] max-w-[80vw] border-dashed border-white border-2"
              : "hidden"
          }
          ref={canvasInRef}
        ></canvas>
        <div
          className={
            isImageUpload
              ? "hidden"
              : "sm:w-[40vw] w-[80vw] sm:h-[30vw] h-[70vw] bg-neutral-900 border-dashed border-2 border-white flex items-center justify-center"
          }
        >
          {t.IMAGE_SELECT}
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <label className="block">
          <span className="sr-only">{t.IMAGE_SELECT_BUTTON}</span>
          <input
            type="file"
            className="block text-sm file:mr-4 file:py-2 file:px-4 cursor-pointer
            file:border-0 file:text-sm file:font-semibold file:bg-m-green file:text-white hover:file:bg-m-green-light"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </>
  );
});

OriginalImageViewer.displayName = "OriginalImageViewer";

export default OriginalImageViewer;
