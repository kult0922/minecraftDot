const coordinate2string = (coordinate: Coordinate3D) => {
  return String(coordinate.x) + "_" + String(coordinate.y) + "_" + String(coordinate.z);
};

const executeCommand = (commandScript: string): Map<string, string> => {
  /*
    fill command like this
    fill 0 127 0 127 127 0 minecraft:air
   */

  const result = new Map<string, string>();
  const commands = commandScript.split("\n");
  for (const command of commands) {
    const startCoordinate: Coordinate3D = {
      x: Number(command.split(" ")[1]),
      y: Number(command.split(" ")[2]),
      z: Number(command.split(" ")[3]),
    };
    const endCoordinate: Coordinate3D = {
      x: Number(command.split(" ")[4]),
      y: Number(command.split(" ")[5]),
      z: Number(command.split(" ")[6]),
    };

    const blockId = command.split(" ")[7];

    const minX = Math.min(startCoordinate.x, endCoordinate.x);
    const minY = Math.min(startCoordinate.y, endCoordinate.y);
    const minZ = Math.min(startCoordinate.z, endCoordinate.z);
    const xDiff = Math.abs(startCoordinate.x - endCoordinate.x);
    const yDiff = Math.abs(startCoordinate.y - endCoordinate.y);
    const zDiff = Math.abs(startCoordinate.z - endCoordinate.z);

    for (let i = 0; i <= xDiff; i++) {
      for (let j = 0; j <= yDiff; j++) {
        for (let k = 0; k <= zDiff; k++) {
          const stringCoordinate = coordinate2string({ x: minX + i, y: minY + j, z: minZ + k });
          result.set(stringCoordinate, blockId);
        }
      }
    }
  }

  return result;
};

export default executeCommand;
