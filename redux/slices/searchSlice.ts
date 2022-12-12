import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface IProps {
  show: boolean;
}

const initilaState: IProps = {
  show: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initilaState,
  reducers: {
    handleShowSearch: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { handleShowSearch } = searchSlice.actions;
export default searchSlice.reducer;
