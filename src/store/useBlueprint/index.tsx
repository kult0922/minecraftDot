import { createContext, useState, useContext, ReactNode } from "react";

const BlueprintContext = createContext(
  {} as {
    initBlueprint: Array<Array<string>>;
    setInitBlueprint: React.Dispatch<React.SetStateAction<Array<Array<string>>>>;
  }
);

export function useBlueprintContext() {
  return useContext(BlueprintContext);
}

export function BlueprintProvider({ children }: { children?: ReactNode }) {
  const [initBlueprint, setInitBlueprint] = useState<Array<Array<string>>>([[]]);
  const value = {
    initBlueprint,
    setInitBlueprint,
  };

  return <BlueprintContext.Provider value={value}>{children}</BlueprintContext.Provider>;
}
