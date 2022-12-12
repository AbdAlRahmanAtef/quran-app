import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  reciter: string;
  server: string;
  rewayat: string;
}

const initialState: InitialState = {
  reciter: "yasser",
  rewayat: "",
  server: "11",
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
  },
});

export const { changeReciter, changeServer, changeRewayat } =
  audioSlice.actions;

export default audioSlice.reducer;
