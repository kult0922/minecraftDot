import blockData from "src/loader/blockLoader";
import get2DArray from "../utils/get2DArray";

const t = (x: number, y: number, c: number) => {
  const w = 256;
  const h = 256;
  return 4 * (y * w + x) + c;
};

const getMostSimilarBlockId = (
  R: number,
  G: number,
  B: number,
  blockImageDataDict: Map<string, BlockImageData>
) => {
  let javaId = "";
  let minDiff = 100000;
  // for (const blockImageData of blockImageDatas) {
  blockImageDataDict.forEach((blockImageData, index) => {
    // ここで差異を計算
    const diff =
      Math.abs(R - blockImageData.R) + Math.abs(G - blockImageData.G) + Math.abs(B - blockImageData.B);
    if (diff < minDiff) {
      minDiff = diff;
      javaId = index;
    }
  });

  return javaId;
};

const generateBlueprint = (
  image: ImageData,
  wPix: number,
  hPix: number,
  blockImageDataDict: Map<string, BlockImageData>
) => {
  const width = image.width;
  const height = image.height;
  const srcImage = image.data;

  const ws = width / wPix;

  const blueprint: Array<Array<string>> = get2DArray(hPix, wPix);

  for (let i = 0; i < hPix; i++) {
    for (let j = 0; j < wPix; j++) {
      let R = 0;
      let G = 0;
      let B = 0;

      // srcImageのindex
      const ii = i * ws;
      const jj = j * ws;

      for (let k = 0; k < ws; k++) {
        for (let l = 0; l < ws; l++) {
          R += srcImage[t(jj + k, ii + l, 0)];
          G += srcImage[t(jj + k, ii + l, 1)];
          B += srcImage[t(jj + k, ii + l, 2)];
        }
      }

      R /= ws * ws;
      G /= ws * ws;
      B /= ws * ws;

      const mostSimilarBlockId = getMostSimilarBlockId(R, G, B, blockImageDataDict);
      blueprint[i][j] = mostSimilarBlockId;
    }
  }

  return blueprint;
};

export default generateBlueprint;
