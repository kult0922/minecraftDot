import { getAxis } from "./cornerCoordinate";
import get2DArray from "../../../../functions/get2DArray";

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
  RT: Coordinate3D,
  LB: Coordinate3D,
  minecraftAxiosOfX: Axios,
  minecraftAxiosOfY: Axios
) => {
  const C = { x: LT.x, y: LT.y, z: LT.z };
  let relativeX = coordinate.x;
  let relativeY = coordinate.y;
  if (RT[minecraftAxiosOfX] - LT[minecraftAxiosOfX] < 0) relativeX = -relativeX;
  if (LB[minecraftAxiosOfY] - LT[minecraftAxiosOfY] < 0) relativeY = -relativeY;

  C[minecraftAxiosOfX] = LT[minecraftAxiosOfX] + relativeX;
  C[minecraftAxiosOfY] = LT[minecraftAxiosOfY] + relativeY;
  return C;
};

const fillVisit = (start: Coordinate, end: Coordinate, visit: Array<Array<boolean>>) => {
  for (let i = start.y; i <= end.y; i++) {
    for (let j = start.x; j <= end.x; j++) {
      visit[i][j] = true;
    }
  }
};

const generateCommand = (
  blueprint: string[][],
  javaId2Index: Map<string, number>,
  blockDB: BlockBasic[],
  edition: Edition,
  LT: Coordinate3D,
  RT: Coordinate3D,
  LB: Coordinate3D
): string[] => {
  const bedrockCommandLimit = 10000;
  const h = blueprint.length;
  const w = blueprint[0].length;
  const visit: boolean[][] = get2DArray(h, w);
  const commandScripts: string[] = [];
  let commandScript = "";
  let commandLineNumber = 0;

  const minecraftAxiosOfX = getAxis(LT, RT);
  const minecraftAxiosOfY = getAxis(LT, LB);

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (visit[i][j]) continue;
      const javaId = blueprint[i][j];
      const blockId = edition === "java" ? javaId : blockDB[javaId2Index.get(javaId)!].bedrockId;

      let horizonBlockNumber = 0;
      let verticalBlockNumber = 0;
      let rectBlockNumber = 0;
      /* horizon */
      for (let k = j; k < w; k++) {
        // if (blockId === blueprint[i][k]) horizonBlockNumber++;
        if (blockId !== blueprint[i][k]) break;
        horizonBlockNumber++;
      }
      /* vertical */
      for (let k = i; k < h; k++) {
        // if (blockId === blueprint[k][j]) verticalBlockNumber++;
        if (blockId !== blueprint[k][j]) break;
        verticalBlockNumber++;
      }
      /* rect */
      const edgeLength = Math.min(horizonBlockNumber, verticalBlockNumber);
      let isValidRect = true;
      for (let k = j; k < edgeLength; k++) {
        for (let l = j; l < edgeLength; l++) {
          if (blockId === blueprint[i + l][j + k]) {
            rectBlockNumber++;
          } else {
            isValidRect = false;
          }
        }
      }

      if (!isValidRect) rectBlockNumber = -1;
      /* 32768 is limit block nummber of fill command */
      if (rectBlockNumber >= 32768) rectBlockNumber = -1;
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
      const start = toMinecraftCoordinate(startBlueprint, LT, RT, LB, minecraftAxiosOfX!, minecraftAxiosOfY!);
      const end = toMinecraftCoordinate(endBlueprint, LT, RT, LB, minecraftAxiosOfX!, minecraftAxiosOfY!);
      fillVisit(startBlueprint, endBlueprint, visit);
      commandScript += generateFillCommand(blockId, start, end);
      commandLineNumber++;
      if (commandLineNumber === bedrockCommandLimit) {
        commandScripts.push(commandScript);
        commandScript = "";
        commandLineNumber = 0;
      }
    }
  }

  commandScripts.push(commandScript);
  return commandScripts;
};

export default generateCommand;
