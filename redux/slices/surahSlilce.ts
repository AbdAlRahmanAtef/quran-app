import { InitialState } from "./audioSlice";
import { ayahProps } from "./../../utils/constents";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurahProps } from "../../utils/constents";

interface IProps {
  surah: SurahProps;
}

const storeDataInLocalStorage = (surah: SurahProps) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("CURRENT_SURAH", JSON.stringify(surah));
  }
};

const initialItems: SurahProps | any =
  typeof window !== "undefined" &&
  window.localStorage.getItem("CURRENT_SURAH") !== null &&
  window.localStorage.getItem("CURRENT_SURAH");

const initialState: IProps = {
  surah: JSON.parse(initialItems),
};

export const surahSlice = createSlice({
  name: "surahSlice",
  initialState: initialState,
  reducers: {
    handleCurrentSurah: (state, action: PayloadAction<SurahProps>) => {
      storeDataInLocalStorage({ ...action.payload });
      state.surah = { ...action.payload };
    },
  },
});

export const { handleCurrentSurah } = surahSlice.actions;
export default surahSlice.reducer;
