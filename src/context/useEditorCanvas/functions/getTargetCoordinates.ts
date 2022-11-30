const getTargetCoordinates = (targetJavaId: string, blueprint: Array<Array<string>>) => {
  const coordinates: Array<Coordinate> = [];
  for (let i = 0; i < blueprint.length; i++) {
    for (let j = 0; j < blueprint[0].length; j++) {
      if (blueprint[i][j] == targetJavaId) coordinates.push({ x: j, y: i });
    }
  }

  return coordinates;
};

export default getTargetCoordinates;
