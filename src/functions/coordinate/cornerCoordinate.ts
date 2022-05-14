// ２点の座標が乗っている軸を返す
const getAxis = (c1: Coordinate3D, c2: Coordinate3D): Axios | undefined => {
  const matchPoints = [c1.x === c2.x, c1.y === c2.y, c1.z === c2.z];
  const matchPointsNumber = matchPoints.filter(function (x) {
    return x;
  }).length;
  if (matchPointsNumber !== 2) {
    throw new Error("coordinates do not show straight line");
  }

  if (!matchPoints[0]) {
    return "x";
  }
  if (!matchPoints[1]) {
    return "y";
  }
  if (!matchPoints[2]) {
    return "z";
  }

  return undefined;
};

const calcLinerPointDistance = (c1: Coordinate3D, c2: Coordinate3D) => {
  return c1.x - c2.x + c1.y - c2.y + c1.z - c2.z;
};

const AnotherAxis = (axis1: Axios, axis2: Axios): Axios => {
  const axisList = [axis1, axis2];
  if (!axisList.includes("x")) {
    return "x";
  }
  if (!axisList.includes("y")) {
    return "y";
  }
  if (!axisList.includes("z")) {
    return "z";
  }
  return "x";
};

const calcRBCoordinate = (c1: Coordinate3D, c2: Coordinate3D, c3: Coordinate3D) => {
  // 座標から軸を特定
  const LTRTAxis = getAxis(c1, c2);
  const LTLBAxis = getAxis(c1, c3);
  const normalAxis = AnotherAxis(LTRTAxis!, LTLBAxis!);
  // 補完する右下の座標
  const RBCoordinate = { x: 0, y: 0, z: 0 };
  // 辺の長さを求める
  const LTRTDist = calcLinerPointDistance(c2, c1);
  const LTLBDist = calcLinerPointDistance(c3, c1);
  // 右下の座標を求める
  RBCoordinate[normalAxis] = c1[normalAxis];
  RBCoordinate[LTRTAxis!] += c1[LTRTAxis!] + LTRTDist;
  RBCoordinate[LTLBAxis!] += c1[LTLBAxis!] + LTLBDist;

  return RBCoordinate;
};

// 2点がxyz軸上にあるか判定
const validAxisLine = (c1: Coordinate3D, c2: Coordinate3D) => {
  const matchPoints = [c1.x === c2.x, c1.y === c2.y, c1.z === c2.z];
  const matchPointsNumber = matchPoints.filter(function (x) {
    return x;
  }).length;
  if (matchPointsNumber !== 2) {
    return false;
  }
  return true;
};

// ３点がxyz軸に沿った平面にあるか判定
const validPlane = (c1: Coordinate3D, c2: Coordinate3D, c3: Coordinate3D) => {
  // 軸上の直線であることの確認
  if (!validAxisLine(c1, c2)) {
    return false;
  }
  if (!validAxisLine(c1, c3)) {
    return false;
  }

  // 座標から軸を特定
  const LTRTAxis = getAxis(c1, c2);
  const LTLBAxis = getAxis(c1, c3);

  // 軸が異なることを確認
  if (LTRTAxis === LTLBAxis) {
    return false;
  }

  return true;
};

const validInput = (c1: Coordinate3D, c2: Coordinate3D, c3: Coordinate3D, width: number, height: number) => {
  // 同一平面上にいるか確認
  if (!validPlane(c1, c2, c3)) {
    return false;
  }
  const LTRTAxis = getAxis(c1, c2);
  const LTLBAxis = getAxis(c1, c3);
  if (LTRTAxis === undefined) return false;
  if (LTLBAxis === undefined) return false;

  // サイズチェック
  if (width !== Math.abs(c1[LTRTAxis] - c2[LTRTAxis]) + 1) {
    return false;
  }
  if (height !== Math.abs(c1[LTLBAxis] - c3[LTLBAxis]) + 1) {
    return false;
  }

  return true;
};

function getNormalAxis(c1: Coordinate3D, c2: Coordinate3D) {
  if (c1.x === c2.x) {
    return "x";
  }
  if (c1.y === c2.y) {
    return "y";
  }
  if (c1.z === c2.z) {
    return "z";
  }
}

export { validInput, calcRBCoordinate, getNormalAxis };
