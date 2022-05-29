const get2DArray = (h: number, w: number) => {
  let array = new Array(h);
  for (let i = 0; i < h; i++) {
    array[i] = new Array<string>(w);
  }
  return array;
};

export default get2DArray;
