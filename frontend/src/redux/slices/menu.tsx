import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export type MenuSlice = {
  open: boolean;
};

export const initialState: MenuSlice = {
  open: false,
};

const slice: any = createSlice({
  name: "agrupadorConta",
  initialState,
  reducers: {
    setOpen(state: MenuSlice, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export default slice.reducer;
export const { setOpen } = slice.actions;
