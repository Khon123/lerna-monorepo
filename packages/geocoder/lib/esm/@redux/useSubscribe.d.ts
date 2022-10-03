import { TData } from "../types";
declare type TSelector = (state: TData) => TData;
declare type TListener = (state: TData) => void;
export declare const useSubscribe: (selector: TSelector, onChange: TListener) => any;
export {};
