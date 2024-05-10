import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { doRequest } from "@/resources/axios/requestBuilder";

export type valorCaixa = {
  indice: number;
  porcentagemValor: "PORCENTAGEM" | "VALOR";
};

export type Caixa = {
  juros: valorCaixa;
  multa: valorCaixa;
  descontos: valorCaixa;
  acrescimos: valorCaixa;
};

export type CaixaSlice = {
  caixa?: Caixa | null;
};

export const initialState: CaixaSlice = {
  caixa: null,
};

const slice: any = createSlice({
  name: "agrupadorConta",
  initialState,
  reducers: {
    setCaixa(state: CaixaSlice, action: PayloadAction<Caixa>) {
      state.caixa = action.payload;
    },
  },
});

export default slice.reducer;
export const { setCaixa } = slice.actions;

export function getCaixa(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch, getState) => {
    doRequest({
      method: "GET",
      path: "caixa",
    }).then((response) => {
      dispatch(setCaixa(response.data[0]));
    });
  };
}
