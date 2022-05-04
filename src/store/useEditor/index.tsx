import { createContext, useState, useContext, ReactNode, useCallback } from "react";

const EditorContext = createContext(
  {} as {
    mode: Mode;
    inkBlockJavaId: string;
    pressing: boolean;
    mouseX: number;
    mouseY: number;
    penSizeIndex: number;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    setInkBlockJavaId: React.Dispatch<React.SetStateAction<string>>;
    setPressing: React.Dispatch<React.SetStateAction<boolean>>;
    updateMouseX: (x: number) => void;
    updateMouseY: (y: number) => void;
    upPenSize: () => void;
    downPenSize: () => void;
    getPenSize: () => number;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  const [mode, setMode] = useState<Mode>("pen");
  const [inkBlockJavaId, setInkBlockJavaId] = useState("minecraft:white_wool");
  const [penSizeIndex, setPenSizeIndex] = useState(1);
  const [pressing, setPressing] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

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

  const updateMouseX = useCallback((x: number) => setMouseX(x), []);
  const updateMouseY = useCallback((y: number) => setMouseY(y), []);

  const value = {
    mode,
    inkBlockJavaId,
    pressing,
    mouseX,
    mouseY,
    penSizeIndex,
    setMode,
    setInkBlockJavaId,
    setPressing,
    updateMouseX,
    updateMouseY,
    upPenSize,
    downPenSize,
    getPenSize,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
