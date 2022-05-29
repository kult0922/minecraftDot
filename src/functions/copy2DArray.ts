const copy2DArray = <T>(twoDArray: Array<Array<T>>): Array<Array<T>> => {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < twoDArray.length; i++) {
    result.push([]);
    for (let j = 0; j < twoDArray[0].length; j++) {
      result[i].push(twoDArray[i][j]);
    }
  }

  return result;
};

export default copy2DArray;
