import JSZip from "jszip";

const generateMcMeta = () => {
  const mcmeta = {
    pack: {
      pack_format: 1,
      description: "datapack",
    },
  };
  const mcmetaBlob = new Blob([JSON.stringify(mcmeta, null, "  ")], { type: "application/json" });
  return mcmetaBlob;
};

const generateManifest = (name: string, discription: string, uuid1: string, uuid2: string) => {
  const manifest = {
    format_version: 1,
    header: {
      description: discription,
      name: name,
      uuid: uuid1,
      version: [0, 0, 1],
    },
    modules: [
      {
        description: discription,
        type: "data",
        uuid: uuid2,
        version: [0, 0, 1],
      },
    ],
  };
  const manifestBlob = new Blob([JSON.stringify(manifest, null, "  ")], { type: "application/json" });
  return manifestBlob;
};

const generateUuid = (): string => {
  // FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  const chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
};
const generatePackZip = (commandScripts: string[], edition: Edition) => {
  // zip化のためのライブラリ
  const zip = new JSZip();
  // functionのフォルダパス
  let functionsPath = "";

  if (edition === "bedrock") {
    // Bedrock Edition
    // uudiの作成
    const uuid1 = generateUuid();
    const uuid2 = generateUuid();
    // manifest.jsonの作成
    const manifest = generateManifest("dot_pack", "discription", uuid1, uuid2);
    // フォルダの作成
    zip.folder("dot_pack")?.file("manifest.json", manifest);
    zip.folder("dot_pack")?.folder("functions");
    functionsPath = "dot_pack/functions/";
  } else {
    // Japa Edition
    // pack.mcmetaの作成
    const mcmeta = generateMcMeta();
    // フォルダの作成
    zip.folder("dot")?.file("pack.mcmeta", mcmeta);
    // the folder name is renamed to 'functions' from 'function' since v1.21 jave edition
    zip.folder("dot")?.folder("data")?.folder("dot_pack")?.folder("function");
    functionsPath = "dot/data/dot_pack/functions/";
  }
  // functionsの作成
  commandScripts.forEach(function (commandScript, index) {
    if (commandScripts.length === 1) {
      const fileName = "cmd.mcfunction";
      zip.file(functionsPath + fileName, commandScript);
    } else {
      const fileName = "cmd" + String(index + 1) + ".mcfunction";
      zip.file(functionsPath + fileName, commandScript);
    }
  });
  return zip;
};

export default generatePackZip;
