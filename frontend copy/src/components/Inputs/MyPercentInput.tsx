import React, { useEffect, useRef, useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Grid, { GridOwnProps } from "@mui/material/Grid/Grid";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Tooltip,
  IconButton,
  Divider,
  LinearProgress,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

type IProps = {
  name: string;
  label?: string;
  casasDecimais?: number;
  limit100?: boolean;
  loading?: boolean;
  gridProps?: GridOwnProps;
  maxValue?: number;
  tamanhoMaximo?: number;
  noNegative?: true;
  helper?: boolean;
  helperLabel?: string;
  helperArrowBoxProp?: string;
  helperPlacement?: any;
};

export type Props = IProps & TextFieldProps;

const MyPercentInput = ({
  name,
  loading,
  label,
  gridProps,
  limit100 = false,
  casasDecimais = 2,
  maxValue = 999999999999999,
  tamanhoMaximo = 99,
  noNegative = true,
  ...other
}: Props) => {
  const [amount, setAmount] = useState("");
  const { control, setValue, resetField, watch, getValues, trigger } =
    useFormContext();

  const handleAmountChange = (event: any) => {
    let inputValue = event.target.value;
    if (inputValue === "" || inputValue == undefined) {
      inputValue = "0";
    }
    let numericValue = Math.min(
      parseFloat(inputValue.replace(/[^\d-]/g, "")) / 100 / 10 ** casasDecimais,
      limit100 ? 1 : Infinity
    );
    if (!inputValue.includes("%")) {
      numericValue /= 10;
    }
    if (numericValue > maxValue) {
      numericValue = maxValue;
    }
    if ((numericValue * 100).toFixed(0).toString().length > tamanhoMaximo) {
      return;
    }
    if (noNegative && numericValue < 0) {
      return;
    }
    if (Number.isNaN(numericValue)) {
      numericValue = 0;
    }
    setValue(name, parseFloat((numericValue * 100).toFixed(casasDecimais)));
    if (!isNaN(numericValue)) {
      const formattedAmount = numericValue.toLocaleString("pt-BR", {
        style: "percent",
        minimumFractionDigits: casasDecimais,
      });
      setAmount(formattedAmount);
    } else {
      setAmount("");
    }
    trigger(name);
  };
  useEffect(() => {
    const numericValue = getValues(name);
    if (numericValue === undefined) return;
    const formattedAmount = (numericValue / 100).toLocaleString("pt-BR", {
      style: "percent",
      minimumFractionDigits: casasDecimais,
    });
    setAmount(formattedAmount);
  }, [getValues(name)]);

  return (
    <Grid item {...gridProps}>
      <Controller
        name={name}
        defaultValue={0}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            id={"inputPorcentagem" + name}
            {...field}
            label={label}
            value={amount}
            onChange={handleAmountChange}
            onBlur={() => {
              trigger(name);
            }}
            variant="outlined"
            fullWidth
            {...other}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      {loading && <LinearProgress />}
    </Grid>
  );
};

export default MyPercentInput;
