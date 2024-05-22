import { useFormContext, Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  DatePicker,
  StaticDatePicker,
  MobileDatePicker,
  DesktopDatePicker,
  LocalizationProvider,
  DesktopDatePickerProps,
  DateValidationError,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Grid, { GridProps } from "@mui/material/Grid/Grid";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { InputAdornment, Theme, useMediaQuery } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

type IProps = {
  name: string;
  gridProps?: GridProps;
  requerido?: boolean;
  datePickerProps?: DesktopDatePickerProps<Date>;
};
export type Props = IProps & TextFieldProps;
export default function MyDatePicker({
  name,
  gridProps,
  datePickerProps,
  requerido = false,
  ...other
}: Props) {
  const { control, watch, setError, clearErrors } = useFormContext();
  const [errorMui, setErrorMui] = useState<DateValidationError | null>(null);

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const component = isXs ? MobileDatePicker : DesktopDatePicker;

  return (
    <Grid item {...gridProps}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Controller
          name={name}
          control={control}
          shouldUnregister={false}
          render={({ field, fieldState: { error } }) => (
            <DesktopDatePicker
              {...field}
              {...datePickerProps}
              slotProps={{
                textField: {
                  focused: requerido,
                  error: !!error,
                  helperText: error?.message,
                  variant: "outlined",
                  fullWidth: true,
                  ...other,
                  label: other.label,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Grid>
  );
}
