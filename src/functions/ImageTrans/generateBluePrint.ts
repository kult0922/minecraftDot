import get2DArray from "../utils/get2DArray";
import { t } from "../utils/t";

/*
const t = (x: number, y: number, c: number) => {
  const w = 256;
  const h = 256;
  return 4 * (y * w + x) + c;
};
*/

const getMostSimilarBlockId = (
  R: number,
  G: number,
  B: number,
  blockImageDataDict: Map<string, BlockImageData>
) => {
  let javaId = "";
  let minDiff = 100000;
  for (const [index, blockImageData] of blockImageDataDict.entries()) {
    if (index == "minecraft:air") continue;
    // ここで差異を計算
    const diff =
      Math.abs(R - blockImageData.R) + Math.abs(G - blockImageData.G) + Math.abs(B - blockImageData.B);
    if (diff < minDiff) {
      minDiff = diff;
      javaId = index;
    }
  }

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

  // const ws = Math.round(width / wPix);
  const ws = 1;

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
          R += srcImage[t(jj + k, ii + l, 0, width)];
          G += srcImage[t(jj + k, ii + l, 1, width)];
          B += srcImage[t(jj + k, ii + l, 2, width)];
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
