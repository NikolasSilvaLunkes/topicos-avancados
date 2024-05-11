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
  MenuItem,
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
  saveCaixa,
} from "@/redux/slices/modules/caixa";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import MyPercentInput from "@/components/Inputs/MyPercentInput";
import MyMoneyInput from "@/components/Inputs/MyMoneyInput";
import MyDatePicker from "@/components/Inputs/MyDatePicker";
import MySelect from "@/components/Inputs/MySelect";
let renders = 1;

function ValorCaixaComponent({
  baseName,
  label,
  watch,
}: {
  baseName: string;
  label: string;
  watch: (a: string) => any;
}) {
  const valorPV = watch(`${baseName}.porcentagemValor`);
  const InputIndice = valorPV === "PORCENTAGEM" ? MyPercentInput : MyMoneyInput;
  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: "100%", p: 1 }}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={label} />
          </Grid>
          <MySelect
            name={`${baseName}.porcentagemValor`}
            gridProps={{ xs: 12 }}
            label="Porcentagem/Valor"
            requerido
          >
            <MenuItem value={"PORCENTAGEM"}>Porcentagem</MenuItem>
            <MenuItem value={"VALOR"}>Valor</MenuItem>
          </MySelect>
          <InputIndice
            name={`${baseName}.indice`}
            gridProps={{ xs: 12 }}
            label="Índice"
          />
        </Grid>
      </Card>
    </Grid>
  );
}

export default function ParametrosForm({
  params,
}: {
  params?: { id?: number };
}) {
  const schema = z.object({});

  const defaultValues = {
    data: new Date(),
    vencimento: new Date(new Date().setDate(new Date().getDate() + 7)),
  };

  useEffect(() => {
    dispatch(getCaixa());
  }, []);

  const caixa: Caixa = useSelector((state) => state.caixa.caixa);

  useEffect(() => {
    if (caixa) {
      reset(caixa);
    }
  }, [caixa]);

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
    dispatch(saveCaixa(d));
  };
  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={11} md={9} lg={6} xl={4} my={10}>
          <Card>
            <CardContent>
              <Grid
                container
                item
                xs={12}
                spacing={2}
                rowSpacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <ValorCaixaComponent
                  baseName="multa"
                  label="Multa"
                  watch={watch}
                />
                <ValorCaixaComponent
                  baseName="juros"
                  label="Juros"
                  watch={watch}
                />
                <ValorCaixaComponent
                  baseName="descontos"
                  label="Descontos"
                  watch={watch}
                />
                <ValorCaixaComponent
                  baseName="acrescimos"
                  label="Acrescimos"
                  watch={watch}
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
