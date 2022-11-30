import { createContext, useState, useContext, ReactNode } from "react";

const EditorContext = createContext(
  {} as {
    mode: Mode;
    inkBlockJavaId: string;
    replaceFromJavaId: string;
    replaceToJavaId: string;
    hoverBlockJavaId: string;
    penSizeIndex: number;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    setInkBlockJavaId: React.Dispatch<React.SetStateAction<string>>;
    setReplaceFromJavaId: React.Dispatch<React.SetStateAction<string>>;
    setReplaceToJavaId: React.Dispatch<React.SetStateAction<string>>;
    setHoverBlockJavaId: React.Dispatch<React.SetStateAction<string>>;
    upPenSize: () => void;
    downPenSize: () => void;
    getPenSize: () => number;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  /* parameters that need to be managed by useState */
  const [mode, setMode] = useState<Mode>("pen");
  const [inkBlockJavaId, setInkBlockJavaId] = useState("minecraft:white_wool");
  const [replaceFromJavaId, setReplaceFromJavaId] = useState("minecraft:white_wool");
  const [replaceToJavaId, setReplaceToJavaId] = useState("minecraft:white_wool");
  const [hoverBlockJavaId, setHoverBlockJavaId] = useState("minecraft:white_wool");
  const [penSizeIndex, setPenSizeIndex] = useState(1);

  const penSizeList = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];

  const upPenSize = () => {
    if (penSizeIndex >= penSizeList.length - 1) return;
    setPenSizeIndex(penSizeIndex + 1);
  };
  const downPenSize = () => {
    if (penSizeIndex <= 0) return;
    setPenSizeIndex(penSizeIndex - 1);
  };

  const getPenSize = (): number => {
    return penSizeList[penSizeIndex];
  };

  const value = {
    mode,
    inkBlockJavaId,
    penSizeIndex,
    hoverBlockJavaId,
    replaceFromJavaId,
    replaceToJavaId,
    setMode,
    setInkBlockJavaId,
    setReplaceFromJavaId,
    setReplaceToJavaId,
    setHoverBlockJavaId,
    upPenSize,
    downPenSize,
    getPenSize,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
