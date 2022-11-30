import { createContext, useState, useContext, ReactNode, useCallback } from "react";
import copy2DArray from "src/functions/copy2DArray";

const HistoryContext = createContext(
  {} as {
    backward: () => Array<Array<string>> | undefined;
    forward: () => Array<Array<string>> | undefined;
    addHistory: (blueprint: Array<Array<string>>) => void;
  }
);

export function useHistoryContext() {
  return useContext(HistoryContext);
}

export function HistoryProvider({ children }: { children?: ReactNode }) {
  const history: Array<Array<Array<string>>> = [];
  let current = -1;

  const addHistory = (blueprint: Array<Array<string>>) => {
    while (current < history.length - 1) {
      history.pop();
    }

    history.push(copy2DArray(blueprint));
    current++;
  };

  const backward = () => {
    if (current === 0) return;
    current--;
    return copy2DArray(history[current]);
  };

  const forward = () => {
    if (current === history.length - 1) return;
    current++;
    return copy2DArray(history[current]);
  };

  const value = {
    backward,
    forward,
    addHistory,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
