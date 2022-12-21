import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  reciter: string;
  server: string;
  rewayat: string;
  isLoading: boolean;
}

const initialState: InitialState = {
  reciter: "yasser",
  rewayat: "",
  server: "11",
  isLoading: false,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState: initialState,
  reducers: {
    changeReciter: (state, action: PayloadAction<string>) => {
      state.reciter = action.payload;
    },
    changeServer: (state, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    changeRewayat: (state, action: PayloadAction<string>) => {
      state.rewayat = action.payload;
    },
    handleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeReciter, changeServer, changeRewayat, handleIsLoading } =
  audioSlice.actions;

export default audioSlice.reducer;
