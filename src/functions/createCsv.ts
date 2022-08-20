const createNmaeTable = (
  blueprint: string[][],
  blockDB: BlockBasic[],
  javaId2index: Map<string, number>,
  locale: Locale
) => {
  const nameTable = [];

  for (let y = 0; y < blueprint.length; y += 1) {
    const row = [];
    for (let x = 0; x < blueprint[0].length; x += 1) {
      const blockName =
        locale === "ja"
          ? blockDB[javaId2index.get(blueprint[y][x])!].jname
          : blockDB[javaId2index.get(blueprint[y][x])!].javaId;

      row.push(blockName);
    }
    nameTable.push(row);
  }

  return nameTable;
};

const totalUpBlock = (blueprint: string[][]) => {
  const blockAmount: Map<string, number> = new Map();
  for (let i = 0; i < blueprint.length; i++) {
    for (let j = 0; j < blueprint[0].length; j++) {
      const javaId = blueprint[i][j];
      if (blockAmount.get(javaId) !== undefined) {
        blockAmount.set(javaId, blockAmount.get(javaId)! + 1);
      } else {
        blockAmount.set(javaId, 1);
      }
    }
  }

  return blockAmount;
};

const createCsv = (
  blueprint: string[][],
  blockData: BlockBasic[],
  javaId2index: Map<string, number>,
  locale: Locale,
  useBlockTitle: string
) => {
  const nameTable = createNmaeTable(blueprint, blockData, javaId2index, locale);
  const blockAmount = totalUpBlock(blueprint);

  // top row
  let csv = "\ufeff";
  for (let i = 0; i < nameTable[0].length; i++) {
    csv += ",";
    csv += String(i + 1);
  }
  csv += "\n";

  // blueprint csv
  nameTable.forEach((row, index) => {
    let line = String(index + 1);
    row.forEach((name) => {
      line += ",";
      line += name;
    });
    line += "\n";
    csv += line;
  });

  csv += "\n";
  csv += " ";
  csv += ",";
  csv += useBlockTitle;
  csv += "\n";
  // block amount csv
  for (const [javaId, amount] of blockAmount.entries()) {
    const blockName =
      locale === "ja"
        ? blockData[javaId2index.get(javaId)!].jname
        : blockData[javaId2index.get(javaId)!].javaId;
    csv += " ";
    csv += ",";
    csv += blockName;
    csv += ",";
    csv += amount;
    csv += "\n";
  }

  return csv;
};

/*
function createUseBlockCsv (blockData) {
  let csv = '\ufeff'
  let line = 'ブロック名' + ',' + '個数'
  line += '\n'
  blockData.forEach((block, index) => {
    if (block.number > 0) {
      line += block.jname
      line += ','
      line += block.number
      line += '\n'
    }
  })
  csv += line
  return csv
}
*/

export default createCsv;
