"use client";

import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
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
import { Caixa, getCaixa } from "@/redux/slices/modules/caixa";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import MyPercentInput from "@/components/Inputs/MyPercentInput";
import MyMoneyInput from "@/components/Inputs/MyMoneyInput";
let renders = 1;
export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({});

  const defaultValues = {};

  useEffect(() => {
    dispatch(getCaixa());
  }, []);

  const caixa: Caixa = useSelector((state) => state.caixa.caixa);

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  type FormValuesProps = {
    username: string;
    password: string;
  };
  obterAutenticacao();
  const ComponenteJuros =
    caixa?.juros?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const ComponenteMulta =
    caixa?.multa?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const ComponenteAcreascimos =
    caixa?.juros?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const ComponenteDescontos =
    caixa?.descontos?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const onSubmit = async (data: FormValuesProps) => {};
  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        {JSON.stringify(caixa)}
        <Button
          onClick={() => {
            const request = buildRequestAuth({
              method: "GET",
              path: "usuario",
            }).then(async (r: any) => {
              console.log("arrrequest", r);
              axiosInstance.request(r);
            });
          }}
        >
          Test
        </Button>
        {getAuth().token}
        <MyTextField
          gridProps={{ xs: 12 }}
          name="historico"
          label="historico"
          required
        />
        <ComponenteMulta
          gridProps={{ xs: 6 }}
          name="multa"
          label="multa"
          required
        />
        <ComponenteJuros
          gridProps={{ xs: 6 }}
          name="juros"
          label="juros"
          required
        />
        <ComponenteDescontos
          gridProps={{ xs: 6 }}
          name="descontos"
          label="descontos"
          required
        />
        <ComponenteAcreascimos
          gridProps={{ xs: 6 }}
          name="acrescimos"
          label="acrescimos"
          required
        />

        {/* <MyAutocomplete
        gridProps={{ xs: 4 }}
        name="historico2"
        camposFiltros={["nome"]}
        body={{}}
        method="GET"
        pathApiRest=""
        label="historico2"
        required/> */}
      </Grid>
    </MyFormProvider>
  );
}
