import React, { useEffect, useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Grid, { GridOwnProps } from "@mui/material/Grid/Grid";
import { Controller, useFormContext } from "react-hook-form";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";

type IProps = {
  name: string;
  label?: string;
  casasDecimais?: number;
  loading?: boolean;
  gridProps?: GridOwnProps;
  maxValue?: number;
  tamanhoMaximo?: number;
  noNegative?: true;
};

export type Props = IProps & TextFieldProps;

const MyMoneyInput = ({
  name,
  label,
  loading,
  casasDecimais = 2,
  gridProps,
  maxValue = 999999999999999,
  tamanhoMaximo = 12,
  noNegative = true,
  ...other
}: Props) => {
  const [amount, setAmount] = useState("");
  const { control, setValue, getValues } = useFormContext();

  const handleAmountChange = (event: any) => {
    let inputValue = event.target.value;
    if (inputValue === "" || inputValue == undefined) {
      inputValue = "0";
    }
    let numericValue =
      parseFloat(inputValue.replace(/[^\d-]/g, "")) / 10 ** casasDecimais;
    if (numericValue > maxValue) {
      numericValue = maxValue;
    }
    if (numericValue.toFixed(0).toString().length > tamanhoMaximo) {
      return;
    }
    if (noNegative && numericValue < 0) {
      return;
    }
    if (Number.isNaN(numericValue)) {
      numericValue = 0;
    }
    setValue(name, numericValue);

    const formattedAmount = numericValue?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: casasDecimais,
    });
    setAmount(formattedAmount);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const numericValue = getValues(name);
    if (numericValue === undefined) return;
    const formattedAmount = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: casasDecimais,
    });
    setAmount(formattedAmount);
  }, [getValues(name)]);

  return (
    <Grid item {...gridProps}>
      <Controller
        name={name}
        control={control}
        defaultValue={0}
        render={({ field, fieldState: { error } }) => (
          <TextField
            id={"inputMoney_" + name}
            value={amount}
            label={label}
            onChange={handleAmountChange}
            variant="outlined"
            inputProps={error}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
          />
        )}
      />
      {loading && <LinearProgress />}
    </Grid>
  );
};

export default MyMoneyInput;
