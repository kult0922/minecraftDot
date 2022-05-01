import { createContext, useState, useContext, ReactNode } from "react";

const EditorContext = createContext(
  {} as {
    mode: Mode;
    inkBlockJavaId: string;
    penSize: number;
    pressing: boolean;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    setInkBlockJavaId: React.Dispatch<React.SetStateAction<string>>;
    setPenSize: React.Dispatch<React.SetStateAction<number>>;
    setPressing: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }: { children?: ReactNode }) {
  const [mode, setMode] = useState<Mode>("pen");
  const [inkBlockJavaId, setInkBlockJavaId] = useState("minecraft:white_wool");
  const [penSize, setPenSize] = useState(3);
  const [pressing, setPressing] = useState(false);

  const value = {
    mode,
    inkBlockJavaId,
    penSize,
    pressing,
    setMode,
    setInkBlockJavaId,
    setPenSize,
    setPressing,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
