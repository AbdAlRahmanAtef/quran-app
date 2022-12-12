import searchSlice from "./slices/searchSlice";
import surahSlice from "./slices/surahSlilce";
import audioReducer from "./slices/audioSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    audio: audioReducer,
    surahReducer: surahSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
