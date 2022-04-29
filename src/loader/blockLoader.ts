import wool from "src/json/wool.json" assert { type: "json" };

const blocks: Array<BlockBasic> = [];

for (const block of wool.blocks) {
  blocks.push({
    imagePath: block.imagePath,
    javaId: block.javaId,
    bedrockId: block.bedrockId,
    jname: block.jname,
    colorGroup: block.colorGroup,
    blockGroup: block.blockGroup,
  });
}

export default blocks;
