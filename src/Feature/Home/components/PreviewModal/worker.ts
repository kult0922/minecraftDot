import { t } from "src/functions/t";
const generateImageFromBlueprint = (
  blueprint: Array<Array<string>>,
  blockImageDataDict: Map<string, BlockImageData>
) => {
  const blockSize = 16;
  const cols = blueprint[0].length;
  const rows = blueprint.length;
  const width = cols * 16;
  const height = rows * 16;
  const imageData = new ImageData(width, height);
  const image = imageData.data;
  const stepNum = 10;
  const step = Math.floor(rows / stepNum);
  let progress = 0;

  for (let i = 0; i < rows; i++) {
    if ((i + 1) % step === 0) {
      progress += stepNum;
      console.log("post progress", i / rows);
      self.postMessage({
        type: "progress",
        payload: progress,
      });
    }
    for (let j = 0; j < cols; j++) {
      const ii = i * blockSize;
      const jj = j * blockSize;
      const blockImageData = blockImageDataDict.get(blueprint[i][j]);

      for (let k = 0; k < blockSize; k++) {
        for (let l = 0; l < blockSize; l++) {
          image[t(jj + k, ii + l, 0, width)] =
            blockImageData?.imageData.data[t(k, l, 0, 16)]!;
          image[t(jj + k, ii + l, 1, width)] =
            blockImageData?.imageData.data[t(k, l, 1, 16)]!;
          image[t(jj + k, ii + l, 2, width)] =
            blockImageData?.imageData.data[t(k, l, 2, 16)]!;
          image[t(jj + k, ii + l, 3, width)] =
            blockImageData?.imageData.data[t(k, l, 3, 16)]!;
        }
      }
    }
  }

  return imageData;
};

self.addEventListener("message", (e) => {
  const res = generateImageFromBlueprint(
    e.data.blueprint,
    e.data.blockImageDataDict
  );
  self.postMessage({ type: "result", payload: res });
});
