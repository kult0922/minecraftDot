import { useState } from "react";
import getBufferCanvas from "src/functions/getBufferCanvas";
import getContext from "src/functions/getContext";

export function useImageGeneratorWorker() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const run = (
    blueprint: string[][],
    blockImageDataDict: Map<string, BlockImageData>,
    canvas: HTMLCanvasElement
  ) => {
    setLoading(true);
    setProgress(0);
    const worker = new Worker(
      new URL("../worker/imageGeneratorWorker", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = function (e) {
      if (e.data.type == "loading") {
        setProgress(e.data.payload);
        return;
      }

      const minecraftImage = e.data.payload;
      const bufferCanvas = getBufferCanvas(
        minecraftImage,
        minecraftImage.width,
        minecraftImage.height
      );

      const mainCanvasContext = getContext(
        canvas,
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

      setLoading(false);
    };

    worker.postMessage({ blueprint, blockImageDataDict });
  };

  return { progress, loading, run };
}
