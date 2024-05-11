import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { doRequest } from "@/resources/axios/requestBuilder";
import { set } from "date-fns";
import { toast } from "react-toastify";

export type Usuario = {
  id: number;
  nome: string;
  senha: string;
  showPassword?: boolean;
};

export type UsuarioSlice = {
  usuario: Usuario | null;
  usuarios: Usuario[];
};

export const initialState: UsuarioSlice = {
  usuario: null,
  usuarios: [],
};

const slice: any = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUsuario(state: UsuarioSlice, action: PayloadAction<Usuario>) {
      state.usuario = action.payload;
    },
    setUsuarios(state: UsuarioSlice, action: PayloadAction<Usuario[]>) {
      state.usuarios = action.payload;
    },
    setShowPassword(
      state: UsuarioSlice,
      action: PayloadAction<[boolean, number]>
    ) {
      console.log("arrrrindex", action.payload[1]);
      state.usuarios[action.payload[1]].showPassword = action.payload[0];
    },
  },
});

export default slice.reducer;
export const { setUsuario, setUsuarios, setShowPassword } = slice.actions;

export function getUsuarios(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch, getState) => {
    doRequest({
      method: "GET",
      path: "usuario",
    }).then((response) => {
      dispatch(setUsuarios(response.data));
    });
  };
}

export function getUsuario(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    doRequest({
      method: "GET",
      path: "usuario/" + id,
    }).then((response) => {
      dispatch(setUsuario(response.data));
    });
  };
}

export function deleteUsuario(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    doRequest({
      method: "DELETE",
      path: "usuario",
      body: { id },
    }).then((response) => {
      toast.success("Usuário excluído com sucesso");
    });
  };
}

export function saveUsuario(
  usuario: Usuario,
  router: any
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    doRequest({
      method: "POST",
      path: "usuario",
      body: usuario,
    }).then((response) => {
      toast.success("Usuário salvo com sucesso");
      if (router) {
        router.push("/usuarios");
      }
    });
  };
}
