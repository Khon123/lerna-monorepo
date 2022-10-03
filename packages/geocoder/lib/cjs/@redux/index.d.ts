import { ThunkAction, Action } from "@reduxjs/toolkit";
export * from "./useSubscribe";
export declare const store: any;
export declare type AppDispatch = typeof store.dispatch;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
