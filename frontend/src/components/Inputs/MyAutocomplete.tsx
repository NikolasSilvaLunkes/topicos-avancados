"use client";

import {
  AutocompleteProps,
  CircularProgress,
  Grid,
  GridProps,
  IconButton,
  LinearProgress,
  ListItem,
  Paper,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { dispatch, useSelector } from "@/redux/store";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";

enum EnumTipoLabel {
  labels,
  tracos,
  barra,
}

export type IProps = {
  /**
   * O nome do campo, para o hook-form
   */
  name: string;
  //String do caminho final do request
  pathApiRest: string;
  //A chave, onde será armazenado o resultado do request no reducer
  chaveCustom?: string;
  //O body da request
  body: any;
  //Os params da request
  params: any;
  //O tipo de request
  method: "GET" | "POST" | "PUT" | "DELETE";
  // A função que acontece ao mudar o valor do input
  onInputValueChange?: (value: string) => any;
  // O tratamento da resposta
  tratamento?: (data: any) => any;
  // Função para geração de thumbnail baseado no valor da option
  funcaoThumbnail?: (option: any) => JSX.Element;
  //Os campos que serão filtrados, atualmente, apenas no tipo de filtro labels as children não são filtradas
  camposFiltros: string[];
  //Se o rest está carregando o valor do componente
  loading?: boolean;
  //O tipo de label que será renderizado, sendo com traços entre os valores, barras ou apenas os valores
  tipoLabel?: EnumTipoLabel;
  //O label do componente
  label: string;
  //Se o campo é requerido
  requerido?: boolean;
  //As props do grid. pra fazer a responsividade
  gridProps?: GridProps;
  //O tamanho máximo do input
  maxLength?: number;
  //As props do autocomplete
  autoCompleteProps?: Omit<
    AutocompleteProps<any, any, any, any>,
    "renderOption" | "options" | "renderInput"
  >;
  //Se o componente deve ser renderizado sem formatação
  defaultBeforeOnchange?: boolean;
  //Se o componente deve ser renderizado sem formatação
  semFormatacao?: boolean;
  //O tipo de autocomplete, podendo ser escrever, selecionarOnly ou combo, os dois ultimos tem opções fixas, a diferença é que só o combo tem a setinha
  tipoAutocompelte?: "escrever" | "selecionarOnly" | "combo";
  //O nome do campo que será setado o valor do input, é importante pro tipo escrever, o tipo escrever precisa dele
  textName?: string;
  //A função que acontece ao clicar no botão de adicionar, quando esse parametro é passado, o botão de adicioar aparece se nem um registro foi encontrado
  funcaoAdicionar?: (...args: any) => any;
  //O callback que será chamado ao clicar no botão de detalhes
  callBack?: (...args: any) => any;
};

export type Props = IProps & TextFieldProps;

export type responseParameters = {
  nome: string;
  nomeResumido: string;
};

const getOptionsFiltro = (opcoesFiltro: string[], option: any): string => {
  let string = "";
  opcoesFiltro.forEach((element: any) => {
    if (option[element] != "") {
      string += `${element}: ${option[element]} `;
    }
  });
  return string;
};

const getOptionsFiltroTraco = (opcoesFiltro: string[], option: any): string => {
  let string = "";
  opcoesFiltro.forEach((element: any, i: number) => {
    const elementValues = element.split(".");
    let valor: any;
    if (elementValues.length > 1) {
      valor = option;
      elementValues.forEach((elementValue: any, j: any) => {
        valor = valor[elementValue];
      });
    } else {
      valor = option[element];
    }
    if (valor && valor != "") {
      string += `${i > 0 && i < opcoesFiltro.length ? "-" : ""}${valor}`;
    }
  });
  return string;
};

const getOptionsFiltroBarra = (opcoesFiltro: string[], option: any): string => {
  let string = "";
  opcoesFiltro.forEach((element: any, i: number) => {
    const elementValues = element.split(".");
    let valor;
    if (elementValues.length > 1) {
      if (option[elementValues[0]] != undefined) {
        valor = option[elementValues[0]][elementValues[1]];
      } else {
        valor = "";
      }
    } else {
      valor = option[element];
    }
    if (valor && valor != "") {
      string += `${i > 0 && i < opcoesFiltro.length ? "/" : ""}${valor}`;
    }
  });
  return string;
};

const MyAutocomplete = ({
  name,
  pathApiRest,
  chaveCustom,
  body,
  params,
  method,
  onInputValueChange = () => {},
  tratamento = (data: any) => data,
  funcaoThumbnail,
  camposFiltros,
  loading = false,
  tipoLabel = EnumTipoLabel.tracos,
  label,
  requerido = false,
  gridProps,
  maxLength,
  autoCompleteProps = { freeSolo: true },
  semFormatacao,
  defaultBeforeOnchange,
  tipoAutocompelte = "escrever",
  textName,
  fieldsArrobaId,
  funcaoAdicionar,
  callBack = () => {},
  ...other
}: Props) => {
  const chave = chaveCustom || name;
  const [valueTextField, setValueTextField] = useState<string>("");
  const [forcarMudanca, setForcarMudanca] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);
  const { control, watch, setValue, getValues, resetField } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const textoMinimo = tipoAutocompelte == "combo" ? 0 : 2;

  const [result, setResult] = useState({ data: {} });

  useEffect(() => {
    dispatch(
      setResult({
        data: {},
        value: "",
        isLoading: true,
        error: null,
        key: chave,
      })
    );
  }, []);

  useEffect(() => {
    setCarregando(true);
    setIsLoading(true);
    onInputValueChange(valueTextField);
    const timer = setTimeout(() => {
      dispatch(
        setResult({
          data: {},
          value: "",
          isLoading: true,
          error: null,
          key: chave,
        })
      );
      valueTextField?.length >= textoMinimo
        ? dispatch(
            getCustomAutocomplete(
              chave,
              pathApiRest,
              method,
              camposFiltros,
              body,
              () => {
                setCarregando(false);
                setIsLoading(false);
              },
              tratamento
            )
          )
        : "";
    }, 10);

    return () => clearTimeout(timer);
  }, [valueTextField, forcarMudanca]);

  const resultados = useSelector((state) => state.autocomplete[chave]);
  autoCompleteProps.freeSolo = true;
  const [inputKey, setInputKey] = useState(Math.random().toString());
  const theme = useTheme();

  return (
    <Grid item {...gridProps} sx={{ width: "100%" }}>
      <Controller
        name={name}
        key={"controller" + name + inputKey}
        control={control}
        defaultValue={""}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            disabled={other.disabled}
            id={"AutoCompleteGenerico_" + name}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                focused={requerido}
                label={label}
                error={!!error}
                type="text"
                autoComplete="off"
                helperText={error?.message}
                {...(loading && { disabled: true })}
                {...other}
                onChange={(e: any) => {
                  setValueTextField(e.target.value);
                  other.onChange && other.onChange(e);
                }}
                onInput={(e: any) => {
                  let valor = e.target.value.substring(0, maxLength || 999);
                  valor = semFormatacao ? valor : valor;
                  setValueTextField(valor);
                  e.target.value = valor;
                  other.onInput && other.onInput(e);

                  if (tipoAutocompelte == "escrever" && textName) {
                    setValue(name, { [textName]: valor });
                  } else if (tipoAutocompelte == "escrever") {
                    setValue(name, valor);
                  }
                }}
                onBlur={(e: any) => {
                  other?.onBlur && other.onBlur(e);

                  if (!getValues(name)) {
                    e.target.value = "";
                    resetField(name, { defaultValue: "" });
                    setInputKey(Math.random().toString());
                  }
                }}
                InputProps={{
                  autoComplete: "new-password",
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {other?.InputProps?.startAdornment || ""}
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  endAdornment: (
                    <>
                      {valueTextField?.length >= textoMinimo &&
                      isLoading == true ? (
                        <CircularProgress color="primary" size={20} />
                      ) : (
                        <></>
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                id={"AutoCompleteGenericoTextField_" + name}
              ></TextField>
            )}
            options={resultados?.data?.length > 0 ? resultados?.data : []}
            getOptionLabel={(option: any) => {
              if (option == undefined) return "";
              if (typeof option == "string") return option;
              let string =
                tipoLabel == EnumTipoLabel.tracos
                  ? getOptionsFiltroTraco(camposFiltros, option)
                  : tipoLabel == EnumTipoLabel.barra
                  ? getOptionsFiltroBarra(camposFiltros, option)
                  : getOptionsFiltro(camposFiltros, option);
              return semFormatacao ? string : string;
            }}
            handleHomeEndKeys
            clearIcon={false}
            popupIcon={tipoAutocompelte == "combo"}
            sx={{ width: 400 }}
            loading={valueTextField?.length >= textoMinimo && isLoading}
            loadingText={"Carregando"}
            noOptionsText={"Nenhuma opção foi encontrada"}
            {...(valueTextField?.length > textoMinimo &&
              resultados?.data?.content?.length <= 0 && {
                PaperComponent: (props) =>
                  tipoAutocompelte === "escrever" ? (
                    <></>
                  ) : !funcaoAdicionar ? (
                    <Paper elevation={3}>
                      <Typography sx={{ p: 1.5 }}>
                        {autoCompleteProps.noOptionsText ||
                          "Nenhuma opção foi encontrada"}
                      </Typography>
                    </Paper>
                  ) : (
                    <Paper key={"itemPlus"} id={name + "__adicionarNovo"}>
                      <Button
                        onMouseDown={() => {
                          funcaoAdicionar && funcaoAdicionar(valueTextField);
                        }}
                        sx={{
                          border: "1px solid black",
                          width: "calc(100% - 8px)",
                          m: "4px",
                        }}
                      >
                        <Typography
                          color={theme.palette.text.primary}
                          sx={{ textTransform: "none" }}
                        >
                          <AddOutlinedIcon sx={{ mb: -0.7 }} />
                          Adicionar Novo
                        </Typography>
                      </Button>
                    </Paper>
                  ),
              })}
            renderOption={(props, option: any) => {
              let string =
                tipoLabel == EnumTipoLabel.tracos
                  ? getOptionsFiltroTraco(camposFiltros, option)
                  : tipoLabel == EnumTipoLabel.barra
                  ? getOptionsFiltroBarra(camposFiltros, option)
                  : getOptionsFiltro(camposFiltros, option);
              return (
                <li id={name + "_option_" + option.codigo} {...props}>
                  <Typography variant="body1">
                    <Grid container alignItems={"center"}>
                      <Grid item xs={3}>
                        {funcaoThumbnail && funcaoThumbnail(option)}
                      </Grid>
                      <Grid item xs={9}>
                        <span style={{ fontWeight: "bold" }}></span>
                        {semFormatacao ? string : string}
                      </Grid>
                    </Grid>
                  </Typography>
                </li>
              );
            }}
            {...autoCompleteProps}
            {...(!autoCompleteProps?.onChange && {
              onChange: (e: any, data) => {
                setValue(name, data);
              },
            })}
            {...(defaultBeforeOnchange && {
              onChange: (e: any, data) => {
                defaultBeforeOnchange && field.onChange(data);
                const acprops: any = autoCompleteProps;
                acprops?.onChange && acprops.onChange(data);
              },
            })}
            onFocus={(e) => {
              setForcarMudanca(!forcarMudanca);
            }}
          />
        )}
      />
      {loading && <LinearProgress />}
    </Grid>
  );
};

export default MyAutocomplete;

export { EnumTipoLabel };
