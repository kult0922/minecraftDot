import { createContext, useState, useContext, ReactNode } from "react";

const StateExampleContext = createContext(
  {} as {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  }
);

export function useStateExampleContext() {
  return useContext(StateExampleContext);
}

export function StateExampleProvider({ children }: { children?: ReactNode }) {
  const [count, setCount] = useState(100);

  const value = {
    count,
    setCount,
  };

  return (
    <StateExampleContext.Provider value={value}>
      {children}
    </StateExampleContext.Provider>
  );
}
