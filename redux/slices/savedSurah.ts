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
  currentSurah: any;
  currentSurahId: string | number;
  showTafsir: boolean;
}

const InitialState: IProps = {
  currentSurah: storedItemValue(),
  showTafsir: false,
  currentSurahId: "",
};

const saveJson = (number: any) => {
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
    handleTafsirStatus: (state, action: PayloadAction<boolean>) => {
      state.showTafsir = action.payload;
    },
    handleCurrentSurah: (state, action: PayloadAction<string | number>) => {
      state.currentSurahId = action.payload;
    },
  },
});

export const { saveSurah, handleTafsirStatus, handleCurrentSurah } =
  saveSurahSlice.actions;

export default saveSurahSlice.reducer;
