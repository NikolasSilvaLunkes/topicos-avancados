"use client";

import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from "@mui/material";
import MyFormProvider from "@/components/MyFormProvider";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setBearerToken } from "@/resources/axios/axios";
import MyTextField from "@/components/Inputs/MyTextInput";
import {
  buildRequest,
  buildRequestAuth,
} from "@/resources/axios/requestBuilder";
import axiosInstance from "@/resources/axios/axiosInstance";
import { dispatch, useSelector } from "@/redux/store";
import MyAutocomplete from "@/components/Inputs/MyAutocomplete";
import {
  Caixa,
  getCaixa,
  getLancamento,
  Lancamento,
} from "@/redux/slices/modules/caixa";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import MyPercentInput from "@/components/Inputs/MyPercentInput";
import MyMoneyInput from "@/components/Inputs/MyMoneyInput";
import MyDatePicker from "@/components/Inputs/MyDatePicker";
import {
  getUsuario,
  saveUsuario,
  Usuario,
} from "@/redux/slices/modules/usuario";
import MyPasswordTextInput from "@/components/Inputs/MyPasswordTextInput";
let renders = 1;
export default function UsuarioForm({ params }: { params?: { id?: number } }) {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    nome: z
      .string({
        invalid_type_error: "Nome obrigatório",
        required_error: "Nome obrigatório",
      })
      .min(1, { message: "Nome obrigatório" }),
    senha: z
      .string({
        invalid_type_error: "Senha obrigatória",
        required_error: "Senha obrigatória",
      })
      .min(8, { message: "Minimo de 8 caractéres para senha" }),
  });

  const defaultValues = {
    data: new Date(),
    vencimento: new Date(new Date().setDate(new Date().getDate() + 7)),
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(getUsuario(params.id));
    }
  }, []);

  const usuario: Usuario = useSelector((state) => state.usuario.usuario);

  useEffect(() => {
    if (!params?.id) {
      setValue("nome", params?.nome || "");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [usuario]);

  const methods = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    reset,
    setValue,
    getValues,
    setError,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  obterAutenticacao();

  const onSubmit = async (data: any) => {
    const d = getValues();
    console.log("data", d);
    dispatch(saveUsuario(d, router));
  };

  const disabled = !!(params?.id && !usuario);

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={11} md={9} lg={6} xl={4}>
          <Card>
            <CardContent>
              <Grid
                container
                item
                xs={12}
                spacing={2}
                p={2}
                justifyContent="center"
                alignItems="center"
              >
                <MyTextField
                  gridProps={{ xs: 12 }}
                  name="nome"
                  label="nome"
                  disabled={disabled}
                  autoComplete="new-password"
                  required
                />
                <MyPasswordTextInput
                  gridProps={{ xs: 12 }}
                  name="senha"
                  label="senha"
                  disabled={disabled}
                  autoComplete="new-password"
                  required
                />
                <Grid item xs={12} container justifyContent="flex-end">
                  <Grid item xs={5}>
                    <Button
                      sx={{ alignSelf: "flex-end" }}
                      fullWidth
                      variant={"contained"}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MyFormProvider>
  );
}
