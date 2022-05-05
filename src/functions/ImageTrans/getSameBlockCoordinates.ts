const get2DArray = (h: number, w: number): Array<Array<boolean>> => {
  let array = new Array(h);
  for (let i = 0; i < h; i++) {
    array[i] = new Array<boolean>(w);
  }
  return array;
};

/*
const arounds: Array<Coordinate> = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

const dfs = (
  x: number,
  y: number,
  block: string,
  blueprint: Array<Array<string>>,
  visit: Array<Array<boolean>>
): void => {
  for (const around of arounds) {
    const next = { x: x + around.x, y: y + around.y };
    if (next.x < 0 || blueprint[0].length <= next.x) continue;
    if (next.y < 0 || blueprint.length <= next.y) continue;
    if (block != blueprint[next.y][next.x]) continue;
    if (visit[next.y][next.x]) continue;
    visit[next.y][next.x] = true;
    coordinates.push({ x: next.x, y: next.y });
    dfs(next.x, next.y, block, blueprint, visit);
  }
};
*/

const getSameBlockCoordinates = (x: number, y: number, blueprint: Array<Array<string>>) => {
  const arounds: Array<Coordinate> = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ];
  const stack: Array<Coordinate> = [];
  const coordinates: Array<Coordinate> = [];
  stack.push({ x: x, y: y });
  const visit = get2DArray(blueprint.length, blueprint[0].length);
  visit[y][x] = true;
  const block = blueprint[y][x];

  while (stack.length != 0) {
    const c = stack.pop();
    coordinates.push(c!);

    for (const around of arounds) {
      const next = { x: c!.x + around.x, y: c!.y + around.y };
      if (next.x < 0 || blueprint[0].length <= next.x) continue;
      if (next.y < 0 || blueprint.length <= next.y) continue;
      if (block != blueprint[next.y][next.x]) continue;
      if (visit[next.y][next.x]) continue;
      visit[next.y][next.x] = true;
      stack.push({ x: next.x, y: next.y });
    }
  }

  return coordinates;
};

export default getSameBlockCoordinates;
