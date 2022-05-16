import { getAxis } from "../coordinate/cornerCoordinate";
import get2DArray from "../utils/get2DArray";

const generateFillCommand = (blockId: string, coordinate1: Coordinate3D, coordinate2: Coordinate3D) => {
  const fullCommand =
    "fill" +
    " " +
    String(coordinate1.x) +
    " " +
    String(coordinate1.y) +
    " " +
    String(coordinate1.z) +
    " " +
    String(coordinate2.x) +
    " " +
    String(coordinate2.y) +
    " " +
    String(coordinate2.z) +
    " " +
    blockId +
    "\n";
  return fullCommand;
};

const toMinecraftCoordinate = (
  coordinate: Coordinate,
  LT: Coordinate3D,
  minecraftAxiosOfX: Axios,
  minecraftAxiosOfY: Axios
) => {
  const C = { x: LT.x, y: LT.y, z: LT.z };
  C[minecraftAxiosOfX] = LT[minecraftAxiosOfX] + coordinate.x;
  C[minecraftAxiosOfY] = LT[minecraftAxiosOfY] + coordinate.y;
  return C;
};

const fillVisit = (start: Coordinate, end: Coordinate, visit: Array<Array<boolean>>) => {
  for (let i = start.y; i <= end.y; i++) {
    for (let j = start.x; j <= end.x; j++) {
      visit[i][j] = true;
    }
  }
};

const generateCommand = (blueprint: string[][], LT: Coordinate3D, RT: Coordinate3D, LB: Coordinate3D) => {
  const h = blueprint.length;
  const w = blueprint[0].length;
  const visit: boolean[][] = get2DArray(h, w);
  let commandScript = "";

  const minecraftAxiosOfX = getAxis(LT, RT);
  const minecraftAxiosOfY = getAxis(LT, LB);

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (visit[i][j]) continue;
      const javaId = blueprint[i][j];
      let horizonBlockNumber = 0;
      let verticalBlockNumber = 0;
      let rectBlockNumber = 0;
      /* horizon */
      for (let k = j; k < w; k++) {
        if (javaId === blueprint[i][k]) horizonBlockNumber++;
      }
      /* vertical */
      for (let k = i; k < h; k++) {
        if (javaId === blueprint[k][j]) verticalBlockNumber++;
      }
      /* rect */
      const edgeLength = Math.min(horizonBlockNumber, verticalBlockNumber);
      let isValidRect = true;
      for (let k = j; k < edgeLength; k++) {
        for (let l = j; l < edgeLength; l++) {
          if (javaId === blueprint[i + k][j + l]) {
            rectBlockNumber++;
          } else {
            isValidRect = false;
          }
        }
      }

      if (!isValidRect) rectBlockNumber = -1;
      const startBlueprint = { x: j, y: i };
      let endBlueprint = { x: j, y: i };
      if (rectBlockNumber > verticalBlockNumber && rectBlockNumber > horizonBlockNumber) {
        /* rect is max */
        endBlueprint = { x: j + horizonBlockNumber - 1, y: i + verticalBlockNumber - 1 };
      } else if (verticalBlockNumber > horizonBlockNumber && verticalBlockNumber > rectBlockNumber) {
        /* vertical is max */
        endBlueprint = { x: j, y: i + verticalBlockNumber - 1 };
      } else {
        /* horizon is max */
        endBlueprint = { x: j + horizonBlockNumber - 1, y: i };
      }
      const start = toMinecraftCoordinate(startBlueprint, LT, minecraftAxiosOfX!, minecraftAxiosOfY!);
      const end = toMinecraftCoordinate(endBlueprint, LT, minecraftAxiosOfX!, minecraftAxiosOfY!);
      fillVisit(startBlueprint, endBlueprint, visit);
      commandScript += generateFillCommand(javaId, start, end);
    }
  }
  return commandScript;
};

export default generateCommand;
