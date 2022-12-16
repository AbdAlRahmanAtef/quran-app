import saveSurahSlice from "./slices/savedSurah";
import audioReducer from "./slices/audioSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    audio: audioReducer,
    saveSurah: saveSurahSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
