import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthProps = {
  token: string;
};

export const initialState: AuthProps = {
  token: "",
};

const slice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthProps>) => {
      state = action.payload;
      return state;
    },
  },
});

export default slice.reducer;
export const { setAuth } = slice.actions;
