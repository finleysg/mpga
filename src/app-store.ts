import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { mpgaApi } from "./services/MpgaApi";
import { reducers } from "./store/index";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mpgaApi.middleware),
  reducer: {
    ...reducers,
    [mpgaApi.reducerPath]: mpgaApi.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
