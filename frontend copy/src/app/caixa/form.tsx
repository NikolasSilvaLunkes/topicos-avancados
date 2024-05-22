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
  saveLancamento,
} from "@/redux/slices/modules/caixa";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import MyPercentInput from "@/components/Inputs/MyPercentInput";
import MyMoneyInput from "@/components/Inputs/MyMoneyInput";
import MyDatePicker from "@/components/Inputs/MyDatePicker";
import MySelect from "@/components/Inputs/MySelect";
let renders = 1;
export default function CaixaForm({ params }: { params?: { id?: number } }) {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    historico: z
      .string({
        invalid_type_error: "Histórico obrigatório",
        required_error: "Histórico obrigatório",
      })
      .min(1, { message: "Histórico obrigatório" }),
    valor: z
      .number({
        invalid_type_error: "Valor obrigatório",
        required_error: "Valor obrigatório",
      })
      .min(0.01, { message: "Valor obrigatório" }),
  });

  const defaultValues = {
    data: new Date(),
    vencimento: new Date(new Date().setDate(new Date().getDate() + 7)),
  };

  useEffect(() => {
    dispatch(getCaixa());
    if (params?.id) {
      dispatch(getLancamento(params.id));
    }
  }, []);

  const caixa: Caixa = useSelector((state) => state.caixa.caixa);
  const lancamento: Lancamento = useSelector((state) => state.caixa.lancamento);

  useEffect(() => {
    if (!params?.id) {
      setValue("multa", caixa?.multa?.indice);
      setValue("juros", caixa?.juros?.indice);
      setValue("descontos", caixa?.descontos?.indice);
      setValue("acrescimos", caixa?.acrescimos?.indice);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [caixa]);

  useEffect(() => {
    if (lancamento) {
      const {
        id,
        historico,
        valor,
        multa,
        juros,
        descontos,
        acrescimos,
        data,
        vencimento,
        debitoCredito,
        recebimento,
      } = lancamento;
      setValue("id", id);
      setValue("historico", historico);
      setValue("valor", valor);
      setValue("multa", multa);
      setValue("juros", juros);
      setValue("descontos", descontos);
      setValue("acrescimos", acrescimos);
      setValue("data", new Date(data));
      setValue("vencimento", new Date(vencimento));
      setValue("debitoCredito", debitoCredito);
      setValue("recebimento", recebimento);
    }
  }, [lancamento]);

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
  const ComponenteJuros =
    caixa?.juros?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const ComponenteMulta =
    caixa?.multa?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const ComponenteAcreascimos =
    caixa?.acrescimos?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const ComponenteDescontos =
    caixa?.descontos?.porcentagemValor === "PORCENTAGEM"
      ? MyPercentInput
      : MyMoneyInput;
  const onSubmit = async (data: any) => {
    const d = getValues();
    console.log("data", d);
    d.caixa = caixa;
    dispatch(saveLancamento(d))
      .then(async (r: any) => {
        toast.success("Lançamento salvo com sucesso");
        router.push("/caixa");
      })
      .catch((e) => {
        toast.error("Erro ao salvar lançamento");
      });
  };
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
                {/* <Button
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
                </Button> */}
                <MyTextField
                  gridProps={{ xs: 12 }}
                  name="historico"
                  label="historico"
                  disabled={!caixa}
                  required
                />
                <MyMoneyInput
                  gridProps={{ xs: 6 }}
                  name="valor"
                  label="valor"
                  disabled={!caixa}
                  required
                />
                <MySelect
                  gridProps={{ xs: 6 }}
                  disabled={!caixa}
                  required
                  name="debitoCredito"
                  label="Débito/Crédito"
                >
                  <MenuItem value={"D"}>Débito</MenuItem>
                  <MenuItem value={"C"}>Crédito</MenuItem>
                </MySelect>
                <ComponenteMulta
                  gridProps={{ xs: 6 }}
                  name="multa"
                  label="multa"
                  disabled={!caixa}
                  required
                />
                <ComponenteJuros
                  gridProps={{ xs: 6 }}
                  name="juros"
                  label="juros"
                  disabled={!caixa}
                  required
                />
                <ComponenteDescontos
                  gridProps={{ xs: 6 }}
                  name="descontos"
                  label="descontos"
                  disabled={!caixa}
                  required
                />
                <ComponenteAcreascimos
                  gridProps={{ xs: 6 }}
                  name="acrescimos"
                  label="acrescimos"
                  disabled={!caixa}
                  required
                />
                <MyDatePicker
                  gridProps={{ xs: 6 }}
                  name="data"
                  label="data"
                  disabled={!caixa}
                  required
                />
                <MyDatePicker
                  gridProps={{ xs: 6 }}
                  name="vencimento"
                  label="vencimento"
                  disabled={!caixa}
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
