const getBufferCanvas = (image: ImageData, width: number, height: number): HTMLCanvasElement => {
  const bufferCanvas = document.createElement("canvas");
  bufferCanvas.width = width;
  bufferCanvas.height = height;
  const bufferCanvasContext = bufferCanvas.getContext("2d")!;
  bufferCanvasContext?.putImageData(image, 0, 0);

  return bufferCanvas;
};

export default getBufferCanvas;
