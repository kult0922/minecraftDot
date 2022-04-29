import { createContext, useState, useContext, ReactNode } from "react";

const BlueprintContext = createContext(
  {} as {
    blueprint: Array<Array<string>>;
    setBlueprint: React.Dispatch<React.SetStateAction<Array<Array<string>>>>;
  }
);

export function useBlueprintContext() {
  return useContext(BlueprintContext);
}

export function BlueprintProvider({ children }: { children?: ReactNode }) {
  const [blueprint, setBlueprint] = useState<Array<Array<string>>>([[]]);
  const value = {
    blueprint,
    setBlueprint,
  };

  return <BlueprintContext.Provider value={value}>{children}</BlueprintContext.Provider>;
}
