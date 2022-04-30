import { t } from "../utils/t";

const geenrateImageFromBlueprint = (
  blueprint: Array<Array<string>>,
  blockImageDataDict: Map<string, BlockImageData>
) => {
  const blockSize = 16;
  const cols = blueprint[0].length;
  const rows = blueprint.length;
  const width = blueprint[0].length * 16;
  const height = blueprint.length * 16;
  const imageData = new ImageData(height, width);
  const image = imageData.data;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // srcImageのindex
      const ii = i * blockSize;
      const jj = j * blockSize;
      const blockImageData = blockImageDataDict.get(blueprint[i][j]);

      for (let k = 0; k < blockSize; k++) {
        for (let l = 0; l < blockSize; l++) {
          image[t(jj + k, ii + l, 0, width)] = blockImageData?.imageData.data[t(k, l, 0, 16)]!;
          image[t(jj + k, ii + l, 1, width)] = blockImageData?.imageData.data[t(k, l, 1, 16)]!;
          image[t(jj + k, ii + l, 2, width)] = blockImageData?.imageData.data[t(k, l, 2, 16)]!;
          image[t(jj + k, ii + l, 3, width)] = blockImageData?.imageData.data[t(k, l, 3, 16)]!;
        }
      }
    }
  }

  return imageData;
};

export default geenrateImageFromBlueprint;
