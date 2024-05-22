import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { buildRequestAuth, doRequest } from "@/resources/axios/requestBuilder";
import { set } from "date-fns";
import { toast } from "react-toastify";
import axiosInstance from "@/resources/axios/axiosInstance";

export type valorCaixa = {
  indice: number;
  porcentagemValor: "PORCENTAGEM" | "VALOR";
};

export type Caixa = {
  id: number;
  juros: valorCaixa;
  multa: valorCaixa;
  descontos: valorCaixa;
  acrescimos: valorCaixa;
};

export type Lancamento = {
  id: number;
  caixa: Caixa;
  juros: number;
  multa: number;
  acrescimos: number;
  descontos: number;
  historico: string;
  data: string;
  valor: number;
  vencimento: string;
  baixa: string;
  debitoCredito: string;
  recebimento: string;
};

export type CaixaSlice = {
  caixa?: Caixa | null;
  lancamentos?: Lancamento[] | null;
  lancamento?: Lancamento | null;
};

export const initialState: CaixaSlice = {
  caixa: null,
  lancamentos: [],
  lancamento: null,
};

const slice: any = createSlice({
  name: "caixa",
  initialState,
  reducers: {
    setCaixa(state: CaixaSlice, action: PayloadAction<Caixa>) {
      state.caixa = action.payload;
    },
    setLancamentos(state: CaixaSlice, action: PayloadAction<Lancamento[]>) {
      state.lancamentos = action.payload;
    },
    setLancamento(state: CaixaSlice, action: PayloadAction<Lancamento>) {
      state.lancamento = action.payload;
    },
  },
});

export default slice.reducer;
export const { setCaixa, setLancamentos, setLancamento } = slice.actions;

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

export function saveLancamento(
  d: Lancamento
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    const r = await buildRequestAuth({
      method: d?.id ? "PUT" : "POST",
      path: "lancamento",
      body: d,
    });

    const data = await axiosInstance.request(r);
    return data;
  };
}

export function getLancamentos(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch, getState) => {
    doRequest({
      method: "GET",
      path: "lancamento",
    }).then((response) => {
      dispatch(setLancamentos(response.data));
    });
  };
}

export function getLancamento(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    doRequest({
      method: "GET",
      path: "lancamento/" + id,
    }).then((response) => {
      dispatch(setLancamento(response.data));
    });
  };
}

export function deleteLancamento(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    doRequest({
      method: "DELETE",
      path: "lancamento",
      body: { id },
    }).then((response) => {
      toast.success("Lançamento excluído com sucesso");
      dispatch(getLancamentos());
    });
  };
}

export function saveCaixa(
  body: Caixa
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    doRequest({
      method: "PUT",
      path: "caixa",
      body: body,
    }).then((response) => {
      toast.success("Parametros salvos com sucesso");
    });
  };
}

export function downloadPdf(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch, getState) => {
    const request = await buildRequestAuth({
      method: "GET",
      path: "lancamento/report/pdf",
    });
    const response = await fetch(request?.url, { ...request, Accept: "*/*" });
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    console.log(base64);
    const blob = new Blob([arrayBuffer], {
      type: response.headers.get("content-type") || undefined,
    });
  };
}
