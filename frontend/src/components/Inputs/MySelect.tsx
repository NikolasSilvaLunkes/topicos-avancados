"use client";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Grid,
  GridOwnProps,
  InputLabel,
  LinearProgress,
  Select,
  SelectProps,
} from "@mui/material";

type IProps = {
  name: string;
  label?: string;
  loading?: boolean;
  gridProps?: GridOwnProps;
  requerido?: boolean;
  maxHeightCombo?: number;
};
export type Props = IProps & SelectProps;
export default function MySelect({
  name,
  label,
  loading,
  gridProps,
  children,
  requerido = false,
  maxHeightCombo,
  ...other
}: Props) {
  const { control, getFieldState } = useFormContext();
  return (
    <Grid item {...gridProps}>
      <FormControl focused={requerido} sx={{ width: "100%" }}>
        <Controller
          name={name}
          defaultValue={null}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <InputLabel error={!!error}>{label}</InputLabel>
              <Select
                label={label}
                sx={{ width: "100" }}
                {...field}
                fullWidth
                {...(loading && { disabled: true })}
                error={!!error}
                {...other}
                MenuProps={{
                  ...other.MenuProps,
                  PaperProps: {
                    ...other.MenuProps?.PaperProps,
                    style: {
                      ...other.MenuProps?.PaperProps?.style,
                      maxHeight: (maxHeightCombo ? maxHeightCombo : 48) * 4.5,
                      width: "20ch",
                    },
                  },
                }}
              >
                {children}
              </Select>
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
              {loading && <LinearProgress />}
            </>
          )}
        />
      </FormControl>
    </Grid>
  );
}
