import { isEqual } from "lodash";
import { TData } from "../types";
import { store } from "./index";

type TSelector = (state: TData) => TData;
type TListener = (state: TData) => void;

let prevState = {};
export const useSubscribe = (selector: TSelector, onChange: TListener) => {
  const unsubscribe = store.subscribe(() => {
    const currState = selector(store.getState());
    if (!isEqual(currState, prevState)) {
      onChange(currState);
    }
    prevState = currState;
  });
  return unsubscribe;
};
