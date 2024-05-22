"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ConfiguracaoTema = {
  indiceDaCor: number;
  temaEscuro: boolean;
  modoContraste: boolean;
};

export const initialState: ConfiguracaoTema = {
  indiceDaCor: 0,
  temaEscuro: false,
  modoContraste: false,
};

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    mudarTemaEscuro: (state, action: PayloadAction<boolean>) => {
      state.temaEscuro = action.payload;
    },
    mudarCorTemaNumero: (state, action: PayloadAction<number>) => {
      state.indiceDaCor = action.payload;
    },
    resetar: (state) => {
      state = initialState;
      return state;
    },
  },
});

export default slice.reducer;
export const { mudarTemaEscuro, mudarCorTemaNumero, resetar } = slice.actions;
