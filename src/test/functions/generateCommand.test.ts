import executeCommand from "../simulator/executeCommand";
import wool from "src/json/wool.json";
import terracotta from "src/json/terracotta.json";
import glazedTerracotta from "src/json/glazedTerracotta.json";
import ore from "src/json/ore.json";
import concrete from "src/json/concrete.json";
import stone from "src/json/stone.json";
import soil from "src/json/soil.json";
import jewel from "src/json/jewel.json";
import wood from "src/json/wood.json";
import light from "src/json/light.json";
import air from "src/json/air.json";
import glass from "src/json/glass.json";
import generateCommand from "src/components/Feature/Editor/functions/generateCommand";

describe.each([
  {
    id: 1,
    blueprint: [
      ["minecraft:white_wool", "minecraft:black_wool", "minecraft:white_wool"],
      ["minecraft:black_wool", "minecraft:white_wool", "minecraft:black_wool"],
      ["minecraft:white_wool", "minecraft:black_wool", "minecraft:white_wool"],
    ],
    LT: { x: 0, y: 0, z: 0 },
    RT: { x: -2, y: 0, z: 0 },
    LB: { x: 0, y: -2, z: 0 },
    expected: new Map<string, string>([
      ["0_0_0", "minecraft:white_wool"],
      ["-1_0_0", "minecraft:black_wool"],
      ["-2_0_0", "minecraft:white_wool"],
      ["0_-1_0", "minecraft:black_wool"],
      ["-1_-1_0", "minecraft:white_wool"],
      ["-2_-1_0", "minecraft:black_wool"],
      ["0_-2_0", "minecraft:white_wool"],
      ["-1_-2_0", "minecraft:black_wool"],
      ["-2_-2_0", "minecraft:white_wool"],
    ]),
  },
  {
    id: 2,
    blueprint: [
      ["minecraft:white_wool", "minecraft:black_wool", "minecraft:white_wool"],
      ["minecraft:black_wool", "minecraft:white_wool", "minecraft:black_wool"],
      ["minecraft:white_wool", "minecraft:black_wool", "minecraft:white_wool"],
    ],
    LT: { x: 0, y: 0, z: 0 },
    RT: { x: 2, y: 0, z: 0 },
    LB: { x: 0, y: 2, z: 0 },
    expected: new Map<string, string>([
      ["0_0_0", "minecraft:white_wool"],
      ["1_0_0", "minecraft:black_wool"],
      ["2_0_0", "minecraft:white_wool"],
      ["0_1_0", "minecraft:black_wool"],
      ["1_1_0", "minecraft:white_wool"],
      ["2_1_0", "minecraft:black_wool"],
      ["0_2_0", "minecraft:white_wool"],
      ["1_2_0", "minecraft:black_wool"],
      ["2_2_0", "minecraft:white_wool"],
    ]),
  },
  {
    id: 3,
    blueprint: [
      ["minecraft:white_wool", "minecraft:white_wool", "minecraft:white_wool"],
      ["minecraft:black_wool", "minecraft:black_wool", "minecraft:black_wool"],
      ["minecraft:white_wool", "minecraft:white_wool", "minecraft:white_wool"],
    ],
    LT: { x: 0, y: 0, z: 0 },
    RT: { x: 2, y: 0, z: 0 },
    LB: { x: 0, y: 2, z: 0 },
    expected: new Map<string, string>([
      ["0_0_0", "minecraft:white_wool"],
      ["1_0_0", "minecraft:white_wool"],
      ["2_0_0", "minecraft:white_wool"],
      ["0_1_0", "minecraft:black_wool"],
      ["1_1_0", "minecraft:black_wool"],
      ["2_1_0", "minecraft:black_wool"],
      ["0_2_0", "minecraft:white_wool"],
      ["1_2_0", "minecraft:white_wool"],
      ["2_2_0", "minecraft:white_wool"],
    ]),
  },
])("command simulate", ({ id, blueprint, LT, RT, LB, expected }) => {
  test(`test case: ${id}`, () => {
    const javaId2index: Map<string, number> = new Map();
    const blockDB: Array<BlockBasic> = air.blocks.concat(
      wool.blocks,
      concrete.blocks,
      terracotta.blocks,
      glass.blocks,
      glazedTerracotta.blocks,
      ore.blocks,
      stone.blocks,
      soil.blocks,
      wood.blocks,
      jewel.blocks,
      light.blocks
    );

    for (let index = 0; index < blockDB.length; index++) {
      javaId2index.set(blockDB[index].javaId, index);
    }
    const edition: Edition = "java";
    const commandScript = generateCommand(blueprint, javaId2index, blockDB, edition, LT, RT, LB)[0];
    const result = executeCommand(commandScript);
    expect(result).toEqual(expected);
  });
});
