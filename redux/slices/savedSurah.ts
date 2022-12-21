import { SurahProps } from "./../../utils/constents";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedItemKey = "CURRENT_SAVED_SURAH";

const storedItemValue = (): any => {
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem(storedItemKey)) {
      return JSON.parse(`${localStorage.getItem(storedItemKey)}`);
    } else {
      return 1;
    }
  }
};

interface IProps {
  currentSurah: string | number;
  currentSurahId: string | number;
}

const InitialState: IProps = {
  currentSurah: storedItemValue() || 1,
  currentSurahId: "",
};

const saveJson = (number: string | number) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(storedItemKey, JSON.stringify(number));
  }
};

export const saveSurahSlice = createSlice({
  name: "savedSurah",
  initialState: InitialState,
  reducers: {
    saveSurah: (state, action: PayloadAction<any>) => {
      saveJson(action.payload);
      state.currentSurah = action.payload;
    },
    handleCurrentSurah: (state, action: PayloadAction<string | number>) => {
      state.currentSurahId = action.payload;
    },
  },
});

export const { saveSurah, handleCurrentSurah } = saveSurahSlice.actions;

export default saveSurahSlice.reducer;
