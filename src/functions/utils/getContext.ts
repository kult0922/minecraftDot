const getContext = (canvas: any, width: number, height: number): CanvasRenderingContext2D => {
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;

  return context;
};

export default getContext;
