import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useReducer,
} from "react";

interface State {
  count: number;
}

const initialState = {
  count: 100,
};

declare type Action = { type: "add"; val: number };

const ReducerExampleContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);

export function useReducerExampleContext() {
  return useContext(ReducerExampleContext);
}

export function ReducerExampleProvider({ children }: { children?: ReactNode }) {
  const reducer = (state: State, action: Action) => {
    if (action.type === "add") {
      return { count: state.count + action.val };
    } else {
      return { count: state.count };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReducerExampleContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerExampleContext.Provider>
  );
}
